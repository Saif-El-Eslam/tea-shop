// middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Redirect from /auth to /auth/login if no user is authenticated
  if (url.pathname === "/auth" && !request.cookies.get("auth-token")) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/auth/:path*"], // Apply to any path under /auth
// };
