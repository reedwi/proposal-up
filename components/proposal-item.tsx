import Link from "next/link"
import { Proposal } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { ProposalOperations } from "@/components/proposal-operations"
import { format } from "date-fns"

interface ProposalItemProps {
  proposal: Pick<Proposal, "id" | "name" | "job_description" | "created_at">
}

export function ProposalItem({ proposal }: ProposalItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/dashboard/proposals/${proposal.id}`}
          className="font-semibold hover:underline"
        >
          {proposal.name}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {format(proposal.created_at, "MMMM do, yyyy")}
          </p>
        </div>
      </div>
      <ProposalOperations data={{ 
        id: proposal.id, 
        name: proposal.name}} />
    </div>
  )
}

ProposalItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}