import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string(),
    TURNSTILE_SECRET_KEY: z.string(),
  },

  client: {
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  },

  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  },

  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
