"use client"

import { ProposalOperations } from "@/components/proposal-operations"
import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"

export type ProposalColumn = {
  id: string
  name: string
  jobDescription: string
  generatedProposal: string
  createdAt: string
}

export const columns: ColumnDef<ProposalColumn>[] = [
  {
    accessorKey: "name",
    header: "Job Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ProposalOperations data={row.original}/>
  }
]