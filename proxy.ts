import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.flowz.dk";

// Production hosts that should not be indexed as a second copy of the site.
const REDIRECT_HOSTS = new Set(["flowz.dk", "flowz-website-ten.vercel.app"]);

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || !REDIRECT_HOSTS.has(host)) return NextResponse.next();

  const destination = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
  return NextResponse.redirect(destination, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
