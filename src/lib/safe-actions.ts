import { getServerAuthSession } from "@/server/auth";
import { logger } from "@/lib/utils";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";
import { unstable_checkRateLimit as checkRateLimit } from "@vercel/firewall";

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
}).use(async ({ next }) => {
  const { rateLimited, error } = await checkRateLimit("bubba_rate_limit", {
    firewallHostForDevelopment: "bubba.ai",
    headers: headers(),
  });

  if (rateLimited) {
    throw new Error("Too many requests");
  }

  return next({
    ctx: {
      rateLimit: {
        error,
      },
    },
  });
});

export const actionClientWithMeta = createSafeActionClient({
  handleServerError(e) {
    if (e instanceof Error) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      name: z.string(),
      track: z
        .object({
          event: z.string(),
          channel: z.string(),
        })
        .optional(),
    });
  },
});

export const authActionClient = actionClientWithMeta
  .use(async ({ next, clientInput }) => {
    const result = await next({ ctx: {} });

    if (process.env.NODE_ENV === "development") {
      logger("Input ->", clientInput as string);
      logger("Result ->", result.data as string);

      return result;
    }

    return result;
  })
  .use(async ({ next, metadata }) => {
    const user = await getServerAuthSession();

    if (!user) {
      throw new Error("Unauthorized");
    }

    return next({
      ctx: {
        user,
      },
    });
  });
