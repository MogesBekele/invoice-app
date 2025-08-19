import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // try {
  //   const session = auth(); // might be null if not signed in
  //   const userId = session?.userId;
  //   const token = session ? await session.getToken() : null;

  //   return NextResponse.json({
  //     userId: userId || null,
  //     token: token || null,
  //   });
  // } catch (err: any) {
  //   // Catch error and return JSON instead of crashing
  //   return NextResponse.json({ error: err.message }, { status: 500 });
  // }
}
