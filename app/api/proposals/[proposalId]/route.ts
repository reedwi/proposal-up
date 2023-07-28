import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  { params }: { params: { proposalId: string } }
) {
  try {
    const body = await req.json();
    const headers = req.headers
    const { userId } = auth();
    if (!userId) { 
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const { name, jobDescription } = body;
    const proposal = await prismadb.proposal.update({
      where: {
        id: params.proposalId
      },
      data: {
        name,
        job_description: jobDescription
      }
    });

    return NextResponse.json(proposal);
  } catch (error) {
    console.log('[PROPOSAL_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  { params }: { params: { proposalId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) { 
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const proposal = await prismadb.proposal.findFirst({
      where: {
        id: params.proposalId
      }
    });

    return NextResponse.json(proposal);
  } catch (error) {
    console.log('[PROPOSAL_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { proposalId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) { 
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    const proposal = await prismadb.proposal.deleteMany({
      where: {
        id: params.proposalId
      },
    });

    return NextResponse.json(proposal);
  } catch (error) {
    console.log('[PROPOSAL_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}