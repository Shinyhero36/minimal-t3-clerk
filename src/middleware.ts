import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes

// Please edit this to allow other routes to be public as needed.

// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
  debug: true,
  publicRoutes: ["/"],
  afterAuth: (auth, req) => {
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    if (!auth.userId) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return redirectToSignIn({
        /**
         * @see https://github.com/clerkinc/javascript/issues/1338
         */
        returnBackUrl: req.experimental_clerkUrl.href,
      });
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/(api|trpc)(.*)"],
};
