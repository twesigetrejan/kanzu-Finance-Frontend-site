import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { InvestmentPortfolio } from "@/components/investments/investment-portfolio"
import { InvestmentPerformance } from "@/components/investments/investment-performance"
import Link from "next/link"

export default async function InvestmentsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Investments</h1>
        <Button asChild>
          <Link href="/investments/new">New Investment</Link>
        </Button>
      </div>

      <InvestmentPortfolio />
      <InvestmentPerformance />
    </div>
  )
}

