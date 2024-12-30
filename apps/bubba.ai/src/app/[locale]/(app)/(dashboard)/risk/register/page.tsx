import { auth } from "@/auth";
import {
  type RiskRegisterType,
  columns,
} from "@/components/tables/risk-register/columns";
import { DataTable } from "@/components/tables/risk-register/data-table";
import {
  NoResults,
  NoRisks,
} from "@/components/tables/risk-register/empty-states";
import { FilterToolbar } from "@/components/tables/risk-register/filter-toolbar";
import { Loading } from "@/components/tables/risk-register/loading";
import { getServerColumnHeaders } from "@/components/tables/risk-register/server-columns";
import { type Departments, type RiskStatus, db } from "@bubba/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    status?: string;
    department?: string;
    sort?: string;
    page?: string;
    per_page?: string;
  }>;
}

export default async function RiskRegisterPage({ searchParams }: PageProps) {
  const session = await auth();
  const organizationId = session?.user.organizationId;
  const columnHeaders = await getServerColumnHeaders();

  if (!organizationId) {
    return redirect("/");
  }

  const {
    search,
    status,
    department,
    sort,
    page = "1",
    per_page = "10",
  } = await searchParams;

  const [column, order] = sort?.split(":") ?? [];

  const hasFilters = !!(search || status || department);

  const { risks: loadedRisks, total } = await risks({
    organizationId,
    search,
    status: status as RiskStatus,
    department: department as Departments,
    column,
    order,
    page: Number.parseInt(page),
    per_page: Number.parseInt(per_page),
  });

  const users = await db.user.findMany({
    where: {
      organizationId,
      Risk: {
        some: {},
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (loadedRisks.length === 0 && !hasFilters) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <div className="relative overflow-hidden">
          <FilterToolbar isEmpty={true} users={users} />
          <NoRisks />
          <Loading isEmpty />
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="relative">
        <FilterToolbar isEmpty={hasFilters} users={users} />
        {loadedRisks.length > 0 ? (
          <DataTable
            columnHeaders={columnHeaders}
            data={loadedRisks as RiskRegisterType[]}
            pageCount={Math.ceil(total / Number.parseInt(per_page))}
            currentPage={Number.parseInt(page)}
          />
        ) : (
          <NoResults hasFilters={hasFilters} />
        )}
      </div>
    </Suspense>
  );
}

async function risks({
  organizationId,
  search,
  status,
  department,
  column,
  order,
  page = 1,
  per_page = 10,
}: {
  organizationId: string;
  search?: string;
  status?: RiskStatus;
  department?: Departments;
  column?: string;
  order?: string;
  page?: number;
  per_page?: number;
}) {
  const skip = (page - 1) * per_page;

  const [risks, total] = await Promise.all([
    db.risk.findMany({
      where: {
        organizationId,
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
          department ? { department } : {},
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
    db.risk.count({
      where: {
        organizationId,
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
          department ? { department } : {},
        ],
      },
    }),
  ]);

  return { risks, total };
}
