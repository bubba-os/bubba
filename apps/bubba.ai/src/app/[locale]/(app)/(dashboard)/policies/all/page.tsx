import { auth } from "@/auth";
import { DataTable } from "@/components/tables/policies/data-table";
import { FilterToolbar } from "@/components/tables/policies/filter-toolbar";
import { getServerColumnHeaders } from "@/components/tables/policies/server-columns";
import { db } from "@bubba/db";
import type { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    status?: string;
    page?: string;
    per_page?: string;
  }>;
}

export default async function PoliciesPage({ searchParams }: PageProps) {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const { search, sort, status, page, per_page } = await searchParams;
  const pageNumber = Number(page) || 1;
  const perPage = Number(per_page) || 10;

  const [columnHeaders, { items, total }] = await Promise.all([
    getServerColumnHeaders(),
    getPolicies({
      organizationId: session.user.organizationId,
      search,
      sort,
      status: status || "all",
      page: pageNumber,
      perPage,
    }),
  ]);

  const pageCount = Math.ceil(total / perPage);

  return (
    <div className="space-y-4">
      <FilterToolbar />

      <DataTable
        data={items}
        columnHeaders={columnHeaders}
        pageCount={pageCount}
        currentPage={pageNumber}
      />
    </div>
  );
}

const getPolicies = unstable_cache(
  async ({
    organizationId,
    search,
    sort,
    status,
    page,
    perPage,
  }: {
    organizationId: string;
    search?: string;
    sort?: string;
    status?: string;
    page: number;
    perPage: number;
  }) => {
    const where = {
      type: "policy" as const,
      organizationId,
      ...(search && {
        OR: [{ name: { contains: search, mode: "insensitive" as const } }],
      }),
      ...(status && status !== "all" && { published: status === "published" }),
    } satisfies Prisma.ArtifactWhereInput;

    const [sortField, sortOrder] = sort?.split(":") || [];
    const orderBy = sortField
      ? {
          [sortField]: sortOrder === "desc" ? "desc" : "asc",
        }
      : { lastUpdated: "desc" as const };

    const [items, total] = await Promise.all([
      db.artifact.findMany({
        where,
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          name: true,
          published: true,
          lastUpdated: true,
          type: true,
          needsReview: true,
        },
      }),
      db.artifact.count({ where }),
    ]);

    return { items, total };
  },
  ["policies-table"],
  {
    tags: ["policies-table"],
    revalidate: 60,
  },
);
