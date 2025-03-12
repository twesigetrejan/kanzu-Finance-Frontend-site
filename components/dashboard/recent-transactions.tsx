import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function RecentTransactions() {
  const transactions = [
    {
      id: "1",
      date: "2023-05-15",
      description: "Loan Repayment",
      amount: "-$350.00",
      status: "completed",
    },
    {
      id: "2",
      date: "2023-05-12",
      description: "Savings Deposit",
      amount: "+$1,200.00",
      status: "completed",
    },
    {
      id: "3",
      date: "2023-05-10",
      description: "Dividend Payment",
      amount: "+$87.50",
      status: "completed",
    },
    {
      id: "4",
      date: "2023-05-05",
      description: "Loan Disbursement",
      amount: "+$5,000.00",
      status: "completed",
    },
    {
      id: "5",
      date: "2023-05-01",
      description: "Membership Fee",
      amount: "-$25.00",
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className={transaction.amount.startsWith("+") ? "text-emerald-500" : "text-rose-500"}>
                  {transaction.amount}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {transaction.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

