"use server";

import { createSafeActionClient } from "next-safe-action";
import { Resend } from "resend";
import { waitlistSchema } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY!);

export const joinWaitlist = createSafeActionClient()
  .schema(waitlistSchema)
  .action(async ({ parsedInput }) => {
    try {
      console.log("Joining waitlist", parsedInput);

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
