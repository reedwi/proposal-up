import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";
import { proposalGenerator } from "@/actions/proposalGenerator";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, jobDescription, timeline, rate, jobType } = body;

    if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const user = await prismadb.user.findFirst({
      where: {
        id: userId
      }
    });

    let result;
    try {
      result = await proposalGenerator(jobDescription, user?.overview || "");
    } catch (error) {
      return new NextResponse(`Error generating proposal ${error}`, { status: 400 });
    }
    

    const proposal = await prismadb.proposal.create({
      data: {
        name,
        job_description: jobDescription,
        user_id: userId,
        rate,
        job_type: jobType,
        timeline,
        generated_proposal: result.text
      }
    });

    return NextResponse.json(proposal);
  } catch (error) {
    console.log('[PROPOSALS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}