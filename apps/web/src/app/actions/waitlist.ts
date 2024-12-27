"use server";

import { sendWaitlistEmail } from "@bubba/email/lib/waitlist";
import { createSafeActionClient } from "next-safe-action";
import { waitlistSchema } from "./schema";

export const joinWaitlist = createSafeActionClient()
  .schema(waitlistSchema)
  .action(async ({ parsedInput }) => {
    try {
      console.log("Joining waitlist", parsedInput);

      await sendWaitlistEmail({ email: parsedInput.email });

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
