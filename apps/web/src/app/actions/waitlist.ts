"use server";

import { env } from "@/env.mjs";
import { createSafeActionClient } from "next-safe-action";
import { validateTurnstileToken } from "next-turnstile";
import { Resend } from "resend";
import { v4 } from "uuid";
import { waitlistSchema } from "./schema";

const resend = new Resend(env.RESEND_API_KEY!);

export const joinWaitlist = createSafeActionClient()
  .schema(waitlistSchema)
  .action(async ({ parsedInput }) => {
    try {
      const validationResponse = await validateTurnstileToken({
        token: parsedInput.cfToken,
        secretKey: env.TURNSTILE_SECRET_KEY!,
        idempotencyKey: v4(),
      });

      if (!validationResponse.success) {
        return {
          success: false,
          error: "Turnstile verification failed",
        };
      }

      await resend.contacts.create({
        email: parsedInput.email,
        unsubscribed: false,
        audienceId: "fb41ebb2-8b89-4b27-bc4b-81f2476be454",
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Waitlist error:", error);
      return {
        success: false,
        error: "Something went wrong",
      };
    }
  });
