import { type Metadata } from "next";
import { getProviders } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import Login from "./_components/Login";

export const metadata: Metadata = {
  title: "Login | Bubba",
};

export default async function LoginPage() {
  const [session, providers] = await Promise.all([
    getServerAuthSession(),
    getProviders(),
  ]);

  if (session) {
    redirect("/dashboard");
  }

  if (!providers) {
    return (
      <div className="flex h-screen w-full flex-col">
        <p className="text-xs text-muted-foreground">
          No authentication providers found
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <Login />
    </div>
  );
}
