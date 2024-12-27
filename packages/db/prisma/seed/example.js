import { ArtifactType, AssessmentStatus, FrameworkAdoptionStatus, PrismaClient, RequirementStatus, } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    const org_id = "cm4ywt4x7000hql4cfhqowx08";
    const user_id = "cm4ywl6b50006ql4cdzdtur81";
    // 1. Create frameworks
    const [soc2, iso27001] = await Promise.all([
        prisma.framework.create({
            data: {
                name: "SOC 2",
                description: "Trust Service Criteria (Security, Availability, etc.)",
            },
        }),
        prisma.framework.create({
            data: {
                name: "ISO 27001",
                description: "Information Security Management System",
            },
        }),
    ]);
    // 2. Create requirement categories
    const [soc2Security, soc2Availability, isoAnnexA5] = await Promise.all([
        prisma.requirementCategory.create({
            data: {
                name: "Security",
                description: "SOC 2 Security Category",
            },
        }),
        prisma.requirementCategory.create({
            data: {
                name: "Availability",
                description: "SOC 2 Availability Category",
            },
        }),
        prisma.requirementCategory.create({
            data: {
                name: "Annex A.5",
                description: "ISO 27001 Annex A.5 (Information Security Policies)",
            },
        }),
    ]);
    // 3. Create requirements for SOC 2
    //    We'll just make a few for demonstration
    const soc2ReqsData = [
        {
            // If you want to explicitly set an ID like "CC1.1", you'd do: id: "CC1.1"
            name: "CC1.1 - Control Environment",
            description: "Demonstrate an overarching control environment for security",
            frameworkId: soc2.id,
            categoryId: soc2Security.id,
        },
        {
            name: "CC1.2 - Board Oversight",
            description: "Board oversight of internal controls",
            frameworkId: soc2.id,
            categoryId: soc2Security.id,
        },
        {
            name: "CC3.1 - Availability Controls",
            description: "Policies ensuring system availability",
            frameworkId: soc2.id,
            categoryId: soc2Availability.id,
        },
    ];
    // 3.1 Create requirements for ISO 27001
    const isoReqsData = [
        {
            name: "A.5.1 - Policies for Information Security",
            description: "Define and approve an information security policy",
            frameworkId: iso27001.id,
            categoryId: isoAnnexA5.id,
        },
    ];
    await prisma.requirement.createMany({
        data: soc2ReqsData,
    });
    await prisma.requirement.createMany({
        data: isoReqsData,
    });
    // 6. Let the organization adopt SOC 2
    const orgFrameworkSoc2 = await prisma.organizationFramework.create({
        data: {
            organizationId: org_id,
            frameworkId: soc2.id,
            status: FrameworkAdoptionStatus.in_progress,
        },
    });
    const allSoc2Reqs = await prisma.requirement.findMany({
        where: { frameworkId: soc2.id },
    });
    // 7.1 For each SOC 2 requirement, create an OrganizationRequirement
    for (const req of allSoc2Reqs) {
        await prisma.organizationRequirement.create({
            data: {
                organizationFrameworkId: orgFrameworkSoc2.id,
                requirementId: req.id,
                status: RequirementStatus.not_started,
            },
        });
    }
    // 8. Create EvidenceDefinitions for each requirement
    //    e.g., "Upload your InfoSec Policy," "Upload your training logs" ...
    for (const req of allSoc2Reqs) {
        if (req.name.includes("Control Environment")) {
            await prisma.evidenceDefinition.create({
                data: {
                    name: "Information Security Policy",
                    description: "A formal, approved InfoSec policy document",
                    requirementId: req.id,
                    isRequired: true,
                },
            });
        }
        else if (req.name.includes("Board Oversight")) {
            await prisma.evidenceDefinition.create({
                data: {
                    name: "Board Meeting Minutes",
                    description: "Proof that the board reviews internal controls regularly",
                    requirementId: req.id,
                    isRequired: true,
                },
            });
        }
        else if (req.name.includes("Availability Controls")) {
            await prisma.evidenceDefinition.create({
                data: {
                    name: "Disaster Recovery Plan",
                    description: "A formal DR plan ensuring system availability",
                    requirementId: req.id,
                    isRequired: true,
                },
            });
        }
    }
    // 9. Create some Artifacts (pdf, integrations, etc.)
    //    e.g. "Acme InfoSec Policy" fulfilling the 'Information Security Policy' evidence
    const artifactPolicy = await prisma.artifact.create({
        data: {
            name: "Acme_Infosec_Policy_v1.pdf",
            fileUrl: "s3://my-bucket/acme-infosec-policy.pdf",
            type: ArtifactType.file,
        },
    });
    const artifactBoard = await prisma.artifact.create({
        data: {
            name: "Board_Minutes_Jan2024.pdf",
            fileUrl: "s3://my-bucket/board-minutes-jan2024.pdf",
            type: ArtifactType.file,
        },
    });
    // 9.1 Find the OrganizationRequirements we just created
    const orgRequirements = await prisma.organizationRequirement.findMany({
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
            const evidenceDef = orgReq.requirement.evidenceDefinitions.find((ed) => ed.name === "Information Security Policy");
            if (evidenceDef) {
                await prisma.artifactRequirementPivot.create({
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
            const evidenceDef = orgReq.requirement.evidenceDefinitions.find((ed) => ed.name === "Board Meeting Minutes");
            if (evidenceDef) {
                await prisma.artifactRequirementPivot.create({
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
    const assessment2024 = await prisma.assessment.create({
        data: {
            organizationId: org_id,
            frameworkId: soc2.id,
            startDate: new Date("2024-01-01"),
            endDate: new Date("2024-12-31"),
            status: AssessmentStatus.draft,
            assignedOwnerId: user_id,
        },
    });
    // 10.1 For each OrganizationRequirement, create a snapshot in this Assessment
    for (const orgReq of orgRequirements) {
        await prisma.organizationRequirementAssessment.create({
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
    const cc11 = await prisma.requirement.findFirst({
        where: { name: { contains: "CC1.1" } },
    });
    const a51 = await prisma.requirement.findFirst({
        where: { name: { contains: "A.5.1" } },
    });
    if (cc11 && a51) {
        await prisma.crossFrameworkMapping.create({
            data: {
                sourceRequirementId: cc11.id,
                targetRequirementId: a51.id,
                notes: "Both require a formal InfoSec policy covering responsibilities.",
            },
        });
    }
    console.log("Seeding complete!");
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
