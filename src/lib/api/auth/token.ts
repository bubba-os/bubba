import { createHash } from "crypto";
import { env } from "@/env";

export const hashToken = (
  token: string,
  {
    noSecret = false,
  }: {
    noSecret?: boolean;
  } = {},
) => {
  return createHash("sha256")
    .update(`${token}${noSecret ? "" : env.NEXTAUTH_SECRET}`)
    .digest("hex");
};
