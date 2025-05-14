import { NextRequest, NextResponse } from "next/server";
 
export async function middleware(request: NextRequest) {
  const cookieName = process.env.NODE_ENV === "development" ?process.env.NEXT_PUBLIC_COOKIE_NAME_DEVELOPMENT : process.env.NEXT_PUBLIC_COOKIE_NAME_PROD
  const sessionCookie = request.cookies.get(cookieName as string);
  if (!sessionCookie) return NextResponse.redirect(new URL("/connexion", request.url));

  return NextResponse.next();
}
 
export const config = {
  //runtime: "nodejs",
  matcher: ["/creer-bilan", "/dashboard"], // Apply middleware to specific routes
};