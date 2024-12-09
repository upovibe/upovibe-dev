// import { auth } from "@/auth";

// export { auth as middleware };
// export const config = {
//   matcher: ["/dashboard"],
// };



import { NextResponse, NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/uploads")) {
    // Rewrite request to an API route
    url.pathname = `/api${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard", "/uploads/:path*"],
};
