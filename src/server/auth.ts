import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { sendVerificationRequestEmail } from "@/lib/emails/send-email-verification";
import { track } from "@vercel/analytics/server";
import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      orgId: string | null;
      orgName: string | null;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      const currentOrgId = await orgId(user.id);

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          orgId: currentOrgId.id,
          orgName: currentOrgId.name,
        },
      };
    },
  },

  events: {
    createUser: async (user) => {
      console.log("User created", user);

      await track("user_created");
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === "development") {
          console.log("[Login URL]", url);
          return;
        } else {
          await sendVerificationRequestEmail({
            url,
            email: identifier,
          });
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
};

async function orgId(userId: string) {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      organizationMemberships: {
        select: {
          organizationId: true,
          organization: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return {
    id: user?.organizationMemberships[0]?.organizationId ?? null,
    name: user?.organizationMemberships[0]?.organization?.name ?? null,
  };
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
