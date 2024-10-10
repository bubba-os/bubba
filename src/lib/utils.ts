import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
);

export const logger = (message: string, ...rest: string[]) => {
  console.log(message, ...rest);
};

export const log = async ({
  message,
  type,
  mention = false,
}: {
  message: string;
  type: "info" | "cron" | "links" | "error" | "trial";
  mention?: boolean;
}) => {
  /* If in development or env variable not set, log to the console */
  if (
    process.env.NODE_ENV === "development" ||
    !process.env.PPMK_SLACK_WEBHOOK_URL
  ) {
    console.log(message);
    return;
  }

  try {
    if (type === "trial" && process.env.PPMK_TRIAL_SLACK_WEBHOOK_URL) {
      return await fetch(`${process.env.PPMK_TRIAL_SLACK_WEBHOOK_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blocks: [
            {
              type: "section",
              text: {
                type: "mrkdwn",
                // prettier-ignore
                text: `${mention ? "<@U05BTDUKPLZ> " : ""}${message}`,
              },
            },
          ],
        }),
      });
    }

    return await fetch(`${process.env.PPMK_SLACK_WEBHOOK_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              // prettier-ignore
              text: `${mention ? "<@U05BTDUKPLZ> " : ""}${type === "error" ? ":rotating_light: " : ""}${message}`,
            },
          },
        ],
      }),
    });
  } catch (e) {}
};
