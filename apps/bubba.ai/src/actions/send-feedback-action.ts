"use server";

import { LogEvents } from "@bubba-beta/events/events";
import { authActionClient } from "./safe-action";
import { sendFeedbackSchema } from "./schema";

export const sendFeebackAction = authActionClient
  .schema(sendFeedbackSchema)
  .metadata({
    name: "send-feedback",
    track: {
      event: LogEvents.SendFeedback.name,
      channel: LogEvents.SendFeedback.channel,
    },
  })
  .action(async ({ parsedInput: { feedback }, ctx: { user } }) => {
    console.log("Feedback", feedback);

    return {
      success: true,
    };
  });
