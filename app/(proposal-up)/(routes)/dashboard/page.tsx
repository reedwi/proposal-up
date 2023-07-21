import { redirect } from "next/navigation"
import { auth, redirectToSignIn } from "@clerk/nextjs";
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { ProposalCreateButton } from "@/components/proposal-create-button"
// import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const userId = await auth()

  if (!userId) {
    redirectToSignIn();
  }

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

  const proposals = [];

  return (
    <DashboardShell>
      <DashboardHeader heading="Proposals" text="Create and view proposals.">
        <ProposalCreateButton />
      </DashboardHeader>
      <div>
        {/* {proposals?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {proposals.map((proposal) => (
              <PostItem key={proposal.id} post={proposal} />
            ))}
          </div>
        ) : ( */}
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No proposals generated</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any proposals yet. Let&apos;s get to generating!
            </EmptyPlaceholder.Description>
            <ProposalCreateButton variant="outline" />
          </EmptyPlaceholder>
        {/* )} */}
      </div>
    </DashboardShell>
  )
}