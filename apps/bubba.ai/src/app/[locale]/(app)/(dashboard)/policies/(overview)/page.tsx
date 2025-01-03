import { auth } from "@/auth";
import { db } from "@bubba/db";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";

export default async function PoliciesOverview() {
  const session = await auth();

  if (!session?.user?.organizationId) {
    redirect("/onboarding");
  }

  const policies = await getPolicies(session.user.organizationId);

  return (
    <div className="space-y-4 sm:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {policies.map((policy) => (
          <div key={policy.id}>{policy.name}</div>
        ))}
      </div>
    </div>
  );
}

const getPolicies = unstable_cache(
  async (organizationId: string) => {
    return db.artifact.findMany({
      where: {
        type: "policy",
        organizationId: organizationId,
      },
    });
  },
  ["policies-cache"],
  {
    tags: ["policies-cache"],
  },
);
