import { db } from "@/server/db";

export default async function VendorPage({
  params,
}: {
  params: { id: string };
}) {
  const vendor = await Promise.all([
    db.vendor.findUnique({
      where: {
        id: params.id,
      },
    }),
  ]);

  return <pre>{JSON.stringify(vendor, null, 2)}</pre>;
}
