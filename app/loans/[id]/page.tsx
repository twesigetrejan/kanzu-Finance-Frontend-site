import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LoanDetail } from "@/components/loans/loan-detail"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function LoanDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/loans">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Loans</span>
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Loan Details</h1>
      </div>

      <LoanDetail id={params.id} />
    </div>
  )
}

