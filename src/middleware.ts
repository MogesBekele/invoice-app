import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtected = createRouteMatcher([
  "/dashboard",
  "/invoices/:invoiceId",
  "/invoices/new",
]);

export default clerkMiddleware((auth, req) => {
  const session = auth(); // could be null if not signed in
  const userId = session?.userId; // safe access

  // If route is protected and no userId, redirect to home
  if (isProtected(req) && !userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Otherwise, continue
  return undefined;
})
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};