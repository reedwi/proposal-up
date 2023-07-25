import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ProposalCreateButton } from "@/components/proposal-create-button"
// import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"
import prismadb from "@/lib/prismadb";
import { ProposalColumn } from "./columns";
import { ProposalClient } from "./client";
import { ProposalItem } from "@/components/proposal-item";
import { format } from "date-fns";

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const { userId } = await auth();
  console.log(userId);

  if (!userId) {
    redirectToSignIn();
  }

  const proposals = await prismadb.proposal.findMany({
    where: {
      user_id: userId
    },
    orderBy: {
      created_at:'desc'
    }
  })

  const formattedProposals: ProposalColumn[] = proposals.map((item) => ({
    id: item.id ?? "",
    createdAt: format(item.created_at, "MMMM do, yyyy"),
    jobDescription: item.job_description ?? "",
    generatedProposal: item.generated_proposal ?? "",
    name: item.name ?? ""
  }))

  // const posts = await db.post.findMany({
  //   where: {
  //     authorId: user.id,
  //   },
  //   select: {
  //     id: true,
  //     title: true,
  //     published: true,
  //     createdAt: true,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  // })

  return (
    <DashboardShell>
      <DashboardHeader heading="Proposals" text="Create and view proposals.">
        <ProposalCreateButton />
      </DashboardHeader>
      {proposals?.length ? (
        <ProposalClient data={formattedProposals}/>
      ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No proposals generated</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any proposals yet. Let&apos;s get to generating!
            </EmptyPlaceholder.Description>
            <ProposalCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
    </DashboardShell>
  )
}



{/* <div>
{proposals?.length ? (
  <div className="divide-y divide-border rounded-md border">
    {proposals.map((proposal) => (
      <ProposalItem key={proposal.id} proposal={proposal} />
    ))}
  </div>
) */}