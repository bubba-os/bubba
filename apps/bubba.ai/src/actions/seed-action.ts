"use server";

import { db } from "@bubba/db";
import {
  ArtifactType,
  AssessmentStatus,
  FrameworkAdoptionStatus,
  RequirementStatus,
} from "@bubba/db";
import {
  availabilityCriteriaData,
  commonCriteriaData,
  piCriteriaData,
} from "../utils/soc2-data";
import { authActionClient } from "./safe-action";
import { seedDataSchema } from "./schema";

type SeedDataResult = {
  success: boolean;
  message?: string;
};

export const seedDataAction = authActionClient
  .schema(seedDataSchema)
  .metadata({
    name: "seed-data",
    track: {
      event: "seed-data",
      channel: "server",
    },
  })
  .action(async ({ parsedInput, ctx }): Promise<SeedDataResult> => {
    const { organizationId } = parsedInput;
    const { user } = ctx;

    if (!organizationId || organizationId !== user.organizationId) {
      throw new Error("Invalid organization");
    }

    try {
      // 1. Create SOC 2 framework
      const soc2 = await db.framework.create({
        data: {
          name: "SOC 2",
          description:
            "Trust Service Criteria covering Security, Availability, Processing Integrity, Confidentiality, Privacy",
        },
      });

      // 2. Create requirement categories
      const [
        securityCat,
        availabilityCat,
        procIntegrityCat,
        confidentialityCat,
        privacyCat,
      ] = await Promise.all([
        db.requirementCategory.create({
          data: {
            name: "Security",
            description: "Common Criteria for Security (CC1 through CC5, etc.)",
          },
        }),
        db.requirementCategory.create({
          data: {
            name: "Availability",
            description:
              "Criteria to ensure systems are available for operation and use",
          },
        }),
        db.requirementCategory.create({
          data: {
            name: "Processing Integrity",
            description:
              "Criteria ensuring system processing is complete, accurate, timely, and authorized",
          },
        }),
        db.requirementCategory.create({
          data: {
            name: "Confidentiality",
            description:
              "Criteria to protect confidential information from unauthorized disclosure",
          },
        }),
        db.requirementCategory.create({
          data: {
            name: "Privacy",
            description:
              "Criteria for personal information collection, use, retention, disclosure, and disposal",
          },
        }),
      ]);

      // Create all requirements in bulk
      await db.requirement.createMany({
        data: [
          ...commonCriteriaData,
          ...availabilityCriteriaData,
          ...piCriteriaData,
        ].map((req) => ({
          ...req,
          frameworkId: soc2.id,
          categoryId: securityCat.id,
          description: req.description,
          name: req.name,
        })),
      });

      // 6. Let the organization adopt SOC 2
      const orgFrameworkSoc2 = await db.organizationFramework.create({
        data: {
          organizationId: organizationId,
          frameworkId: soc2.id,
          status: FrameworkAdoptionStatus.in_progress,
        },
      });

      const allSoc2Reqs = await db.requirement.findMany({
        where: { frameworkId: soc2.id },
      });

      // 7.1 For each SOC 2 requirement, create an OrganizationRequirement
      for (const req of allSoc2Reqs) {
        await db.organizationRequirement.create({
          data: {
            organizationFrameworkId: orgFrameworkSoc2.id,
            requirementId: req.id,
          },
        });
      }

      // 8. Create EvidenceDefinitions for each requirement
      //    e.g., "Upload your InfoSec Policy," "Upload your training logs" ...
      for (const req of allSoc2Reqs) {
        const evidenceDefinitions = [
          {
            name: "Policy Document",
            description: `A formal policy document addressing ${req.name}`,
            requirementId: req.id,
            isRequired: true,
          },
          {
            name: "Implementation Evidence",
            description: `Documentation showing how ${req.name} is implemented`,
            requirementId: req.id,
            isRequired: true,
          },
          {
            name: "Monitoring Evidence",
            description: `Evidence of ongoing monitoring and review for ${req.name}`,
            requirementId: req.id,
            isRequired: false,
          },
        ];

        await db.evidenceDefinition.createMany({
          data: evidenceDefinitions,
        });
      }

      // 9. Create some Artifacts (pdf, integrations, etc.)
      //    e.g. "Acme InfoSec Policy" fulfilling the 'Information Security Policy' evidence
      const artifactPolicy = await db.artifact.create({
        data: {
          name: "Acme_Infosec_Policy_v1.pdf",
          fileUrl: "s3://my-bucket/acme-infosec-policy.pdf",
          type: ArtifactType.file,
        },
      });

      const artifactBoard = await db.artifact.create({
        data: {
          name: "Board_Minutes_Jan2024.pdf",
          fileUrl: "s3://my-bucket/board-minutes-jan2024.pdf",
          type: ArtifactType.file,
        },
      });

      // 9.1 Find the OrganizationRequirements we just created
      const orgRequirements = await db.organizationRequirement.findMany({
        where: {
          organizationFrameworkId: orgFrameworkSoc2.id,
        },
        include: {
          requirement: {
            include: {
              evidenceDefinitions: true,
            },
          },
        },
      });

      // 9.2 Attach these artifacts to the relevant OrgReq via pivot
      for (const orgReq of orgRequirements) {
        // If it's the "Control Environment" requirement
        if (orgReq.requirement.name.includes("Control Environment")) {
          // Find the "Information Security Policy" evidenceDefinition
          const evidenceDef = orgReq.requirement.evidenceDefinitions.find(
            (ed) => ed.name === "Information Security Policy",
          );
          if (evidenceDef) {
            await db.artifactRequirementPivot.create({
              data: {
                artifactId: artifactPolicy.id,
                organizationRequirementId: orgReq.id,
                evidenceDefinitionId: evidenceDef.id,
              },
            });
          }
        }

        // If it's the "Board Oversight" requirement
        if (orgReq.requirement.name.includes("Board Oversight")) {
          const evidenceDef = orgReq.requirement.evidenceDefinitions.find(
            (ed) => ed.name === "Board Meeting Minutes",
          );
          if (evidenceDef) {
            await db.artifactRequirementPivot.create({
              data: {
                artifactId: artifactBoard.id,
                organizationRequirementId: orgReq.id,
                evidenceDefinitionId: evidenceDef.id,
              },
            });
          }
        }
      }

      // 10. Create an Assessment for 2024
      const assessment2024 = await db.assessment.create({
        data: {
          organizationId: organizationId,
          frameworkId: soc2.id,
          startDate: new Date("2024-01-01"),
          endDate: new Date("2024-12-31"),
          status: AssessmentStatus.draft,
          assignedOwnerId: user.id,
        },
      });

      // 10.1 For each OrganizationRequirement, create a snapshot in this Assessment
      for (const orgReq of orgRequirements) {
        await db.organizationRequirementAssessment.create({
          data: {
            organizationRequirementId: orgReq.id,
            assessmentId: assessment2024.id,
            status: orgReq.status, // snapshot at the time
            riskLevel: orgReq.riskLevel, // can copy risk or store updated risk
            dueDate: orgReq.dueDate,
            notes: `Initial snapshot for ${orgReq.requirement.name}`,
          },
        });
      }

      // 11. CrossFrameworkMapping: Suppose "CC1.1 - Control Environment" is roughly equivalent to "A.5.1"
      const cc11 = await db.requirement.findFirst({
        where: { name: { contains: "CC1.1" } },
      });
      const a51 = await db.requirement.findFirst({
        where: { name: { contains: "A.5.1" } },
      });
      if (cc11 && a51) {
        await db.crossFrameworkMapping.create({
          data: {
            sourceRequirementId: cc11.id,
            targetRequirementId: a51.id,
            notes:
              "Both require a formal InfoSec policy covering responsibilities.",
          },
        });
      }

      return {
        success: true,
        message: "SOC 2 framework and requirements seeded successfully",
      };
    } catch (error) {
      console.error("Seed error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to seed data",
      };
    }
  });
