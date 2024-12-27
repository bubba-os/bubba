import { RiskMatrix } from "@/components/charts/risk-matrix";
import { auth } from "@bubba-beta/auth";
import { db } from "@bubba-beta/db";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{
    riskId: string;
  }>;
}

export default async function RiskRegisterPage({ params }: Props) {
  const session = await auth();
  const risk = await params;
  const organizationId = session?.user.organizationId;

  if (!organizationId) {
    return redirect("/");
  }

  const riskData = await db.risk.findFirst({
    where: {
      id: risk.riskId,
      organizationId,
    },
  });

  if (!riskData) {
    return redirect("/risk/register");
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {riskData.title}
        </h1>
        <p className="text-muted-foreground mt-2">{riskData.description}</p>
      </div>

      <RiskMatrix
        probability={riskData.probability}
        impact={riskData.impact}
        className="max-w-2xl"
      />
    </div>
  );
}
