import { NextResponse } from "next/server";
import middlewareAuth from "./utils/middlewareAuth";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;
  //   return NextResponse.redirect(new URL('/home', req.url))

  if (pathname.startsWith("/admin")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", req.url));
    if (user && user.role !== "ADMIN")
      return NextResponse.redirect(new URL("/", req.url));

    // console.log("Admin Page");
  }

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);
    if (!user) return NextResponse.redirect(new URL("/auth", req.url));

    // console.log(user);
    // console.log("Profile Page");
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*"],
};
