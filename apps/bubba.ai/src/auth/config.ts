import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@bubba/db";
import { sendMagicLinkEmail } from "@bubba/email";
import type { DefaultSession, NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { createOrganizationAndConnectUser } from "./org";

declare module "next-auth" {
  interface User {
    organizationId?: string;
    onboarded?: boolean;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      organizationId?: string;
      onboarded?: boolean;
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: "noreply@mail.bubba.ai",
      async sendVerificationRequest(params) {
        await sendMagicLinkEmail({
          email: params.identifier,
          url: params.url,
        });
      },
    }),
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        organizationId: user.organizationId,
        onboarded: user.onboarded,
      },
    }),
  },
  events: {
    signIn: async ({ user, isNewUser }) => {
      if (user?.id) {
        await db.user.update({
          where: {
            id: user.id,
            organizationId: user.organizationId,
          },
          data: {
            lastLogin: new Date(),
          },
        });
      }

      if (isNewUser && user.email && user.id) {
        if (!user.organizationId) {
          await createOrganizationAndConnectUser({
            userId: user.id,
            normalizedEmail: user.email,
          });
        }
      }
    },
  },
} satisfies NextAuthConfig;
