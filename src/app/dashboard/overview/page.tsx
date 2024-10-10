import PageContainer from "@/components/ui/page-container";
import PageContent from "@/components/ui/page-content";
import PageTitleBar from "@/components/ui/page-titlebar";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Overview() {
  return (
    <div className="pb-12 md:pb-0">
      <PageContainer>
        <PageContent>
          <PageTitleBar
            breadcrumb={{
              label: "Home",
              href: "/dashboard/overview",
            }}
            title="Overview"
          />
        </PageContent>
      </PageContainer>
    </div>
  );
}
