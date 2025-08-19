import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtected = createRouteMatcher([
  // "/dashboard",
  // "/invoices/:invoiceId",
  // "/invoices/new",
]);
export default clerkMiddleware((auth, request) => {

  
  // const session = auth(); // might be null
  // //const userId = session?.userId; // safe access

  // if (isProtected(req) && !userId) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // return undefined;
  
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
