"use server";

import { createSafeActionClient } from "next-safe-action";
import { headers } from "next/headers";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address"),
  cfToken: z.string().min(1, "Turnstile verification failed"),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export const joinWaitlist = createSafeActionClient()
  .schema(schema)
  .action(async ({ parsedInput }) => {
    try {
      const headersList = await headers();

      const ip =
        headersList.get("x-real-ip") || headersList.get("x-forwarded-for");
      const verifyFormData = new FormData();
      verifyFormData.append("secret", process.env.TURNSTILE_SECRET_KEY!);
      verifyFormData.append("response", parsedInput.cfToken);
      if (ip) verifyFormData.append("remoteip", ip);

      const result = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          body: verifyFormData,
        },
      );

      const outcome = await result.json();

      if (!outcome.success) {
        return {
          success: false,
          error: "Captcha verification failed",
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
