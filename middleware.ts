import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const cookies = req.cookies;

  const sessionToken =
    cookies.get("authjs.session-token") ||
    cookies.get("__Secure-authjs.session-token") ||
    cookies.get("next-auth.session-token") ||
    cookies.get("__Secure-next-auth.session-token");

  // Belum login tapi akses dashboard
  if (!sessionToken && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
