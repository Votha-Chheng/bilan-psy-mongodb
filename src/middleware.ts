import { NextRequest, NextResponse } from "next/server";
 
export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get("better-auth.session_token");
  if (!sessionCookie) return NextResponse.redirect(new URL("/connexion", request.url));

  return NextResponse.next();
}
 
export const config = {
  //runtime: "nodejs",
  matcher: ["/creer-bilan", "/dashboard"], // Apply middleware to specific routes
};