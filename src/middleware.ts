import { NextResponse, type NextRequest } from "next/server";
import { validateRequest } from "./lib/auth";

//doc: https://nextjs.org/docs/app/building-your-application/routing/middleware

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const { url, nextUrl } = request;
  const { host, hostname } = nextUrl;
  console.log({ url, host, hostname });
  const session = await validateRequest();
  if (!session.user && hostname != "localhost") {
    return NextResponse.rewrite(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/example/:path*", "/dashboard/:path*"],
};
