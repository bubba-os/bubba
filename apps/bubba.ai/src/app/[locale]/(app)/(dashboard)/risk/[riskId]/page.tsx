import { auth } from "@/auth";
import { RiskOverview } from "@/components/risks/risk-overview";
import { db } from "@bubba/db";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ riskId: string }>;
}

export default async function RiskPage({ params }: PageProps) {
  const session = await auth();
  const { riskId } = await params;

  if (!session) {
    redirect("/login");
  }

  if (!session.user.organizationId || !riskId) {
    redirect("/");
  }

  const risk = await getRisk(riskId, session.user.organizationId);

  if (!risk) {
    redirect("/risk");
  }

  const users = await getUsers(session.user.organizationId);

  return <RiskOverview risk={risk} users={users} />;
}

async function getRisk(riskId: string, organizationId: string) {
  "use cache";

  const risk = await db.risk.findUnique({
    where: {
      id: riskId,
      organizationId: organizationId,
    },
    include: {
      owner: true,
    },
  });

  return risk;
}

async function getUsers(organizationId: string) {
  "use cache";

  const users = await db.user.findMany({
    where: { organizationId: organizationId },
  });

  return users;
}
