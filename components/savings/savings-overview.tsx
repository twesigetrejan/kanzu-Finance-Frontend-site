import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SavingsOverview() {
  const savingsData = {
    regularSavings: "$8,750.25",
    fixedDeposit: "$3,500.00",
    savingsGoal: "$15,000.00",
    progress: 82,
    interestRate: "3.5%",
    lastDeposit: {
      amount: "$500.00",
      date: "2023-05-10",
    },
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Regular Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{savingsData.regularSavings}</div>
          <p className="text-xs text-muted-foreground mt-1">Interest Rate: {savingsData.interestRate}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Fixed Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{savingsData.fixedDeposit}</div>
          <p className="text-xs text-muted-foreground mt-1">Matures on: 2023-12-15</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Savings Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-baseline">
            <div className="text-2xl font-bold">{savingsData.progress}%</div>
            <div className="text-sm text-muted-foreground">of {savingsData.savingsGoal}</div>
          </div>
          <Progress value={savingsData.progress} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Last deposit: {savingsData.lastDeposit.amount} on {savingsData.lastDeposit.date}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

