import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in",
  "/sign-up",
  "/api/webhooks/clerk"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }

  const { userId } = await auth();
  
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }
  
});

export const config = {
  matcher: [
   "/((?!.+\\.[\\w]+$|_next).*)", 
    "/(api|trpc)(.*)", // Protect API routes
    "/", 
  ],
};
