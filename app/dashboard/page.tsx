import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { OverviewCard } from "@/components/dashboard/overview-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { LoanSummary } from "@/components/dashboard/loan-summary"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard title="Savings Balance" value="$12,345.67" change="+2.5%" trend="up" />
        <OverviewCard title="Loan Balance" value="$5,432.10" change="-3.2%" trend="down" />
        <OverviewCard title="Shares Value" value="$8,765.43" change="+1.8%" trend="up" />
        <OverviewCard title="Dividends" value="$987.65" change="+5.4%" trend="up" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <LoanSummary />
        <QuickActions />
      </div>

      <RecentTransactions />
    </div>
  )
}

