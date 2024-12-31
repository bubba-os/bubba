import { getI18n } from "@/locales/server";

export async function getServerColumnHeaders() {
  const t = await getI18n();

  return {
    title: t("risk.tasks.table.title"),
    status: t("risk.tasks.table.status"),
    ownerId: t("risk.tasks.table.assigned_to"),
  };
}
