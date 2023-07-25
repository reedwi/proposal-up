interface ProposalProps {
  children?: React.ReactNode
}

export default function ProposalLayout({ children }: ProposalProps) {
  return (
    <div className="container mx-auto grid items-start gap-10 py-8">
      {children}
    </div>
  )
}