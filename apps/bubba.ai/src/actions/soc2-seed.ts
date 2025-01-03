// soc2-seed.ts

"use server";

import { type ArtifactType, db } from "@bubba/db";
import {
  soc2Categories,
  soc2Controls,
  soc2RequiredArtifacts,
} from "../lib/soc2-controls";

export const soc2Seed = async ({
  organizationId,
}: {
  organizationId: string;
}) => {
  const soc2Framework = await db.framework.findFirst({
    where: {
      name: {
        contains: "SOC 2",
      },
    },
  });

  if (!soc2Framework) {
    const framework = await db.framework.create({
      data: {
        name: "SOC 2",
        description: "SOC 2 Framework",
        version: "2022",
      },
    });

    const categoryMap = new Map();

    for (const category of soc2Categories) {
      const dbCategory = await db.frameworkCategory.create({
        data: {
          name: category.name,
          description: category.description,
          code: category.code,
          frameworkId: framework.id,
        },
      });
      categoryMap.set(category.code, dbCategory.id);
    }

    for (const control of soc2Controls) {
      const categoryId = categoryMap.get(control.categoryId);

      if (!categoryId) {
        throw new Error(`Category ${control.categoryId} not found`);
      }

      await db.control.create({
        data: {
          code: control.code,
          name: control.name,
          description: control.description,
          categoryId: categoryId,
          requiredArtifactTypes:
            control.requiredArtifactTypes as ArtifactType[],
        },
      });
    }
  }

  const framework = await db.framework.findUnique({
    where: {
      name: "SOC 2",
    },
  });

  if (!framework) {
    throw new Error("SOC 2 Framework not found");
  }

  const organizationFramework = await db.organizationFramework.create({
    data: {
      organizationId: organizationId,
      frameworkId: framework.id,
      status: "not_started",
    },
  });

  // Create a Map to track created artifacts by name
  const artifactMap = new Map<string, string>();

  // First, create all artifacts defined in soc2RequiredArtifacts
  for (const artifactDef of soc2RequiredArtifacts) {
    const artifact = await db.artifact.create({
      data: {
        name: artifactDef.name,
        type: "policy", // Default to policy since these are all policies
        organizationId: organizationId,
      },
    });
    artifactMap.set(artifactDef.name, artifact.id);
  }

  // Then create controls and link them to artifacts
  for (const control of soc2Controls) {
    const dbControl = await db.control.findUnique({
      where: {
        code: control.code,
      },
    });

    if (!dbControl) {
      throw new Error(`Control ${control.code} not found`);
    }

    const organizationControl = await db.organizationControl.create({
      data: {
        controlId: dbControl.id,
        organizationId: organizationId,
        status: "not_started",
        organizationFrameworkId: organizationFramework.id,
      },
    });

    // Find all artifacts that list this control in their controls array
    const relevantArtifacts = soc2RequiredArtifacts.filter((artifact) =>
      artifact.controls.includes(control.code),
    );

    // Create control-artifact relationships for each relevant artifact
    for (const artifact of relevantArtifacts) {
      const artifactId = artifactMap.get(artifact.name);
      if (!artifactId) {
        console.warn(`Artifact ${artifact.name} not found in map`);
        continue;
      }

      await db.controlArtifact.create({
        data: {
          organizationControlId: organizationControl.id,
          artifactId: artifactId,
        },
      });
    }
  }
};
