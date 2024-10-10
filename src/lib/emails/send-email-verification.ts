import LoginLink from "@/components/emails/verification-link";

import { sendEmail } from "@/lib/resend";

export const sendVerificationRequestEmail = async (params: {
  email: string;
  url: string;
}) => {
  const { url, email } = params;
  const emailTemplate = LoginLink({ url });
  try {
    await sendEmail({
      to: email,
      subject: "Welcome to Bubba!",
      react: emailTemplate,
      test: process.env.NODE_ENV === "development",
    });
  } catch (e) {
    console.error(e);
  }
};
