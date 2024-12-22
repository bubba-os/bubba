import { auth as authMiddleware } from "@bubba-beta/auth";
import { createI18nMiddleware } from "next-international/middleware";
import { type NextRequest, NextResponse } from "next/server";

const I18nMiddleware = createI18nMiddleware({
  locales: [""],
  defaultLocale: "",
  urlMappingStrategy: "rewrite",
});

export async function middleware(request: NextRequest) {
  const session = await authMiddleware();
  const url = new URL(request.url);
  const response = request.url;

  if (session && url.pathname === "/auth") {
    return NextResponse.redirect(request.url);
  }

  if (!session && url.pathname !== "/auth") {
    const encodedSearchParams = `${url.pathname.substring(1)}${url.search}`;
    const newUrl = new URL("/auth", request.url);

    if (encodedSearchParams) {
      newUrl.searchParams.append("return_to", encodedSearchParams);
    }

    return NextResponse.redirect(newUrl);
  }

  if (
    session &&
    (!session.user.onboarded || !session.user.organizationId) &&
    url.pathname !== "/setup"
  ) {
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api|monitoring).*)"],
};
