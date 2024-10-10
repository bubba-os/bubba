import { db } from "@/server/db";

export default async function PolicyPage({
  params,
}: {
  params: { id: string };
}) {
  const policy = await Promise.all([
    db.policy.findUnique({
      where: {
        id: params.id,
      },
    }),
  ]);

  return <pre>{JSON.stringify(policy, null, 2)}</pre>;
}
