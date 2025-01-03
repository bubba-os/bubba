import { getI18n } from "@/locales/server";

export async function getServerColumnHeaders() {
  const t = await getI18n();

  return {
    name: t("policies.table.name"),
    lastUpdated: t("policies.table.last_updated"),
    status: t("policies.table.status"),
  };
}
