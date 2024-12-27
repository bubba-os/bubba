"use server";

import { authActionClient } from "./safe-action";
import { sendFeedbackSchema } from "./schema";

export const sendFeebackAction = authActionClient
  .schema(sendFeedbackSchema)
  .metadata({
    name: "send-feedback",
  })
  .action(async ({ parsedInput: { feedback }, ctx: { user } }) => {
    console.log("Feedback", feedback);

    return {
      success: true,
    };
  });
