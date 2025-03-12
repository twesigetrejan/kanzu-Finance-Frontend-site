import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function LoanSummary() {
  const loans = [
    {
      id: "1",
      name: "Home Improvement Loan",
      amount: "$5,000.00",
      remaining: "$3,250.00",
      progress: 35,
    },
    {
      id: "2",
      name: "Education Loan",
      amount: "$2,500.00",
      remaining: "$1,875.00",
      progress: 25,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Loans</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loans.map((loan) => (
            <div key={loan.id} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{loan.name}</span>
                <span className="text-muted-foreground">
                  {loan.remaining} / {loan.amount}
                </span>
              </div>
              <Progress value={loan.progress} className="h-2" />
            </div>
          ))}

          {loans.length === 0 && <div className="text-center py-4 text-muted-foreground">No active loans</div>}
        </div>
      </CardContent>
    </Card>
  )
}

