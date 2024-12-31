import { auth } from "@/auth";

import type { RiskTaskType } from "@/components/tables/risk-tasks/columns";
import { DataTable } from "@/components/tables/risk-tasks/data-table";
import { NoTasks } from "@/components/tables/risk-tasks/empty-states";
import { NoResults } from "@/components/tables/risk-tasks/empty-states";
import { FilterToolbar } from "@/components/tables/risk-tasks/filter-toolbar";
import { Loading } from "@/components/tables/risk-tasks/loading";
import { getServerColumnHeaders } from "@/components/tables/risk-tasks/server-columns";
import { type RiskTaskStatus, db } from "@bubba/db";
import { SecondaryMenu } from "@bubba/ui/secondary-menu";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    per_page?: string;
  }>;
  params: Promise<{
    riskId: string;
  }>;
}

export default async function RiskTaskPage({
  searchParams,
  params,
}: PageProps) {
  const session = await auth();
  const organizationId = session?.user.organizationId;
  const columnHeaders = await getServerColumnHeaders();

  if (!organizationId) {
    return redirect("/");
  }

  const {
    search,
    status,
    sort,
    page = "1",
    per_page = "10",
  } = await searchParams;

  const { riskId } = await params;

  const [column, order] = sort?.split(":") ?? [];

  const hasFilters = !!(search || status);

  const { tasks: loadedTasks, total } = await tasks({
    riskId,
    search,
    status: status as RiskTaskStatus,
    column,
    order,
    page: Number.parseInt(page),
    per_page: Number.parseInt(per_page),
  });

  const users = await db.user.findMany({
    where: {
      organizationId,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (loadedTasks.length === 0 && !hasFilters) {
    return (
      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden">
          <FilterToolbar isEmpty={true} users={users} />
          <NoTasks />
          <Loading isEmpty />
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <FilterToolbar isEmpty={loadedTasks.length === 0} users={users} />
      {loadedTasks.length > 0 ? (
        <DataTable
          columnHeaders={columnHeaders}
          data={loadedTasks as RiskTaskType[]}
          pageCount={Math.ceil(total / Number.parseInt(per_page))}
          currentPage={Number.parseInt(page)}
        />
      ) : (
        <NoResults hasFilters={hasFilters} />
      )}
    </div>
  );
}

async function tasks({
  riskId,
  search,
  status,
  column,
  order,
  page = 1,
  per_page = 10,
}: {
  riskId: string;
  search?: string;
  status?: RiskTaskStatus;
  column?: string;
  order?: string;
  page?: number;
  per_page?: number;
}) {
  const skip = (page - 1) * per_page;

  const [tasks, total] = await Promise.all([
    db.riskMitigationTask.findMany({
      where: {
        riskId,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      },
      orderBy: column
        ? {
            [column]: order === "asc" ? "asc" : "desc",
          }
        : undefined,
      skip,
      take: per_page,
      include: {
        owner: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    }),
    db.riskMitigationTask.count({
      where: {
        riskId,
        AND: [
          search
            ? {
                OR: [
                  { title: { contains: search, mode: "insensitive" } },
                  { description: { contains: search, mode: "insensitive" } },
                ],
              }
            : {},
          status ? { status } : {},
        ],
      },
    }),
  ]);

  return { tasks, total };
}
