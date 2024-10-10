import { Resend } from "resend";

import { log, nanoid } from "@/lib/utils";
import { env } from "@/env";

export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

export const sendEmail = async ({
  to,
  subject,
  react,
  marketing,
  system,
  test,
  cc,
  scheduledAt,
}: {
  to: string;
  subject: string;
  react: React.ReactNode;
  marketing?: boolean;
  system?: boolean;
  test?: boolean;
  cc?: string | string[];
  scheduledAt?: string;
}) => {
  if (!resend) {
    throw new Error("Resend not initialized");
  }

  try {
    const { data, error } = await resend.emails.send({
      from: marketing
        ? "Lewis from Bubba <lewis@mail.linkdr.com>"
        : system
          ? "Bubba <system@mail.linkdr.com>"
          : !!scheduledAt
            ? "Lewis Carhart <lewis@mail.linkdr.com>"
            : "Lewis from Bubba <lewis@mail.linkdr.com>",
      to: test ? "delivered@resend.dev" : to,
      cc: cc,
      replyTo: marketing ? "lewis@mail.linkdr.com" : undefined,
      subject,
      react,
      scheduledAt,
      headers: {
        "X-Entity-Ref-ID": nanoid(),
      },
    });

    if (error) {
      await log({
        message: `Resend returned error when sending email: ${error.name} \n\n ${error.message}`,
        type: "error",
        mention: true,
      });

      throw new Error(error.message);
    }

    return data;
  } catch (exception) {
    await log({
      message: `Unexpected error when sending email: ${exception as string}`,
      type: "error",
      mention: true,
    });

    throw new Error(exception as string);
  }
};
