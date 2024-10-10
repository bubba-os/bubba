import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

import { type Metadata } from "next";
import PolicyChoice from "./_components/policy-choice";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Draft Policy | Bubba",
};

export default async function DraftPolicy({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();

  if (!session?.user.orgId) {
    return null;
  }

  const policy = await db.policy.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!policy) {
    return null;
  }

  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Policies",
              href: "/dashboard/policies",
            }}
            title={"Draft " + policy.title}
            subtitle={
              "Upload an existing " +
              policy.title.toLowerCase() +
              " policy, or generate one from scratch using our AI policy generator."
            }
          />
          <PolicyChoice id={params.id} />
        </PageContent>
      </PageContainer>
    </div>
  );
}
