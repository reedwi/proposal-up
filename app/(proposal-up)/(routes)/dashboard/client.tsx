"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { ProposalColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"



interface ProposalClientProps {
  data: ProposalColumn[]
}

export const ProposalClient: React.FC<ProposalClientProps> = ({
  data
}) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <DataTable searchKey="name" columns={columns} data={data}/>
      {/* <Heading 
        title="API" description="API calls for orders"
      />
      <Separator />
      <ApiList entityName="orders" entityIdName="orderId"/> */}
    </>
  )
}