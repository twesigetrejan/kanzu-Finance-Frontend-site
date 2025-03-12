import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { DepositForm } from "@/components/savings/deposit-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default async function DepositPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/savings">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Savings</span>
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Make a Deposit</h1>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <DepositForm />
      </div>
    </div>
  )
}

