import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();
    const headers = req.headers
    const clerkUser = body.data;

    const user = await prismadb.user.create({
      data: {
        id: clerkUser.id,
        email: clerkUser.email_addresses[0].email_address,
        first_name: clerkUser.first_name,
        last_name:clerkUser.last_name
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USERS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}