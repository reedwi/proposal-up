import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { ProposalGenerationForm } from "@/components/proposal-generation-form";
import { Proposal } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { JobTypeEnum } from "@/lib/validations/proposal";

export const metadata = {
  title: "Proposal",
  description: "View and edit generated proposals",
}

export default async function ProposalPage({
  params
}: {
  params: { proposalId: string }
}) {
  const { userId } = auth()

  if (!userId) {
    redirectToSignIn();
  }

  const proposal = await prismadb.proposal.findFirst({
    where: {
      id: params.proposalId
    }
  })

  const jobType: JobTypeEnum = proposal?.job_type || null

  return (
    <DashboardShell>
      <DashboardHeader
        heading={proposal?.name || ""}
      />
      <div className="grid gap-10">
        <ProposalViewForm 
          jobDescription={ proposal?.job_description || "" } 
          jobTitle={ proposal?.name || "" } 
          rate={ proposal?.rate || null } 
          timeline={ proposal?.timeline || "" } 
          jobType={ jobType || null }
          userId={ userId }
        />
      </div>
    </DashboardShell>
  )
}