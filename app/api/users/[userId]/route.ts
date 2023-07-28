import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();
    const headers = req.headers
    const { userId } = auth();
    const { overview } = body;
    const user = await prismadb.user.update({
      where: {
        id: params.userId
      },
      data: {
        overview
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log('[USERS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}