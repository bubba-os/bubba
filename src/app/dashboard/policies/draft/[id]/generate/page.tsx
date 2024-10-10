import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";
import { db } from "@/server/db";
import Editor from "@/components/ui/editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type JSONContent } from "novel";

export default async function PolicyGenerate({
  params,
}: {
  params: { id: string };
}) {
  const policy = await db.policy.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!policy) {
    return null;
  }

  const initialContent = policy.initialContent as JSONContent | undefined;

  console.log(initialContent);

  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Policies",
              href: "/dashboard/policies",
            }}
            title={"Generate " + policy.title}
            subtitle={
              "Generate a new " +
              policy.title.toLowerCase() +
              " policy from scratch using our AI policy generator."
            }
          />
          <div className="mt-8 overflow-hidden">
            <Card className="overflow-hidden">
              <CardContent className="overflow-hidden">
                <Editor initialContent={initialContent} />
              </CardContent>
            </Card>
          </div>
        </PageContent>
      </PageContainer>
    </div>
  );
}
