import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function SavingsHistory() {
  const transactions = [
    {
      id: "1",
      date: "2023-05-10",
      type: "Deposit",
      amount: "+$500.00",
      method: "Bank Transfer",
      status: "completed",
    },
    {
      id: "2",
      date: "2023-04-15",
      type: "Deposit",
      amount: "+$350.00",
      method: "Mobile Money",
      status: "completed",
    },
    {
      id: "3",
      date: "2023-03-20",
      type: "Withdrawal",
      amount: "-$200.00",
      method: "Bank Transfer",
      status: "completed",
    },
    {
      id: "4",
      date: "2023-03-01",
      type: "Interest",
      amount: "+$25.75",
      method: "System",
      status: "completed",
    },
    {
      id: "5",
      date: "2023-02-15",
      type: "Deposit",
      amount: "+$400.00",
      method: "Cash",
      status: "completed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell className={transaction.amount.startsWith("+") ? "text-emerald-500" : "text-rose-500"}>
                  {transaction.amount}
                </TableCell>
                <TableCell>{transaction.method}</TableCell>
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

