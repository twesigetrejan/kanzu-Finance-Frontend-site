import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { LoanApplicationForm } from "@/components/loans/loan-application-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function ApplyLoanPage() {
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
        <h1 className="text-2xl font-bold tracking-tight">Apply for Loan</h1>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <LoanApplicationForm />
      </div>
    </div>
  )
}

