import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { DashboardHeader } from "@/components/header"
import { DashboardShell } from "@/components/shell"
import { ProposalGenerationForm } from "@/components/proposal-generation-form";

export const metadata = {
  title: "Proposals",
  description: "Generate a new proposal",
}

export default async function ProposalsPage() {
  const { userId } = await auth()

  if (!userId) {
    redirectToSignIn();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Proposals"
        text="Generate a new proposal"
      />
      <div className="grid gap-10">
        <ProposalGenerationForm jobDescription={ "" } userId={ userId }/>
      </div>
    </DashboardShell>
  )
}