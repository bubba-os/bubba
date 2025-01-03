import { auth } from "@/auth";
import { FrameworkControls } from "@/components/frameworks/framework-controls";
import { FrameworkOverview } from "@/components/frameworks/framework-overview";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { db } from "@bubba/db";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: Promise<{
    frameworkId: string;
  }>;
}

export default async function FrameworkPage({ params }: PageProps) {
  const session = await auth();
  const { frameworkId } = await params;

  if (!session?.user?.organizationId) {
    redirect("/login");
  }

  const [framework, organizationFramework, categories] = await Promise.all([
    getFramework(frameworkId),
    getOrganizationFramework(frameworkId, session.user.organizationId),
    getFrameworkCategories(frameworkId, session.user.organizationId),
  ]);

  if (!framework || !organizationFramework) {
    redirect("/");
  }

  return (
    <div className="flex flex-col gap-6">
      <Suspense fallback={<SkeletonLoader amount={3} />}>
        <FrameworkOverview
          framework={framework}
          organizationFramework={organizationFramework}
        />
      </Suspense>

      <Suspense fallback={<SkeletonLoader amount={3} />}>
        <FrameworkControls categories={categories} frameworkId={frameworkId} />
      </Suspense>
    </div>
  );
}

const getFramework = unstable_cache(
  async (frameworkId: string) => {
    return db.framework.findFirst({
      where: {
        id: frameworkId,
      },
      include: {
        categories: {
          include: {
            controls: true,
          },
        },
      },
    });
  },
  ["framework-cache"],
  {
    tags: ["framework-cache"],
  },
);

const getOrganizationFramework = unstable_cache(
  async (frameworkId: string, organizationId: string) => {
    return db.organizationFramework.findFirst({
      where: {
        frameworkId,
        organizationId,
      },
      include: {
        organizationControl: {
          include: {
            control: true,
            artifacts: true,
          },
        },
      },
    });
  },
  ["org-framework-cache"],
  {
    tags: ["org-framework-cache"],
  },
);

const getFrameworkCategories = unstable_cache(
  async (frameworkId: string, organizationId: string) => {
    const categories = await db.frameworkCategory.findMany({
      where: {
        frameworkId,
      },
      include: {
        controls: {
          include: {
            organizationControls: {
              where: {
                organizationId,
              },
              include: {
                artifacts: true,
              },
            },
          },
        },
      },
    });

    return categories.map((category) => ({
      ...category,
      controls: category.controls.map((control) => ({
        id: control.id,
        name: control.name,
        code: control.code,
        description: control.description,
        categoryId: control.categoryId,
        requiredArtifactTypes: control.requiredArtifactTypes,
        status: control.organizationControls[0]?.status || "not_started",
        artifacts: control.organizationControls[0]?.artifacts || [],
      })),
    }));
  },
  ["framework-categories-cache"],
  {
    tags: ["framework-categories-cache"],
  },
);
