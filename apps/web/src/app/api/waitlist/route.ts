"use server";

import { resend } from "@bubba-beta/email/lib/resend";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    if (resend) {
      await resend.contacts.create({
        email,
        firstName: email.charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        audienceId: process.env.RESEND_AUDIENCE_ID as string,
      });
    }

    return NextResponse.redirect(new URL("/success", request.url));
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return NextResponse.json(
      { error: "Failed to add to waitlist" },
      { status: 500 },
    );
  }
}
