import { auth } from "@/auth";
import { logger } from "@/utils/logger";
import { client } from "@bubba/kv";
import { Ratelimit } from "@upstash/ratelimit";
import {
  DEFAULT_SERVER_ERROR_MESSAGE,
  createSafeActionClient,
} from "next-safe-action";
import { headers } from "next/headers";
import { z } from "zod";

const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(10, "10s"),
  redis: client,
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
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for");

    const { success, remaining } = await ratelimit.limit(
      `${ip}-${metadata.name}`,
    );

    if (!success) {
      throw new Error("Too many requests");
    }

    return next({
      ctx: {
        ratelimit: {
          remaining,
        },
      },
    });
  })
  .use(async ({ next, metadata }) => {
    const session = await auth();

    if (!session) {
      throw new Error("Unauthorized");
    }

    return next({
      ctx: {
        user: session.user,
      },
    });
  });
