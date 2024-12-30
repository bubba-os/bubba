import { getI18n } from "@/locales/server";

export async function getServerColumnHeaders() {
  const t = await getI18n();

  return {
    title: t("risk.register.table.risk"),
    status: t("risk.register.table.status"),
    department: t("risk.register.table.department"),
    ownerId: t("risk.register.table.assigned_to"),
  };
}
