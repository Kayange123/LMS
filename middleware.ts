import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  ignoredRoutes: [
    // "/",
    // "/teacher/courses",
    // "/teacher/analytics",
    // "/teacher/create",
    // "/teacher/courses/94b78c12-0a8c-4096-90c6-49996895cb36",
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
