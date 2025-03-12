import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LoanList } from "@/components/loans/loan-list"
import Link from "next/link"

export default async function LoansPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Loan Management</h1>
        <Button asChild>
          <Link href="/loans/apply">Apply for Loan</Link>
        </Button>
      </div>

      <LoanList />
    </div>
  )
}

