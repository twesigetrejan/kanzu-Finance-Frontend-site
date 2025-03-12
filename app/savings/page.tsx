import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { SavingsOverview } from "@/components/savings/savings-overview"
import { SavingsHistory } from "@/components/savings/savings-history"
import Link from "next/link"

export default async function SavingsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Savings</h1>
        <Button asChild>
          <Link href="/savings/deposit">Make Deposit</Link>
        </Button>
      </div>

      <SavingsOverview />
      <SavingsHistory />
    </div>
  )
}

