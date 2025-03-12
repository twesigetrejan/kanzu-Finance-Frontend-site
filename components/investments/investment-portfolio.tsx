import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function InvestmentPortfolio() {
  const investments = [
    {
      id: "1",
      name: "SACCO Shares",
      amount: "$5,000.00",
      currentValue: "$5,750.00",
      return: "+15%",
      status: "active",
    },
    {
      id: "2",
      name: "Fixed Income Fund",
      amount: "$2,500.00",
      currentValue: "$2,625.00",
      return: "+5%",
      status: "active",
    },
    {
      id: "3",
      name: "Property Development",
      amount: "$1,000.00",
      currentValue: "$1,120.00",
      return: "+12%",
      status: "active",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Investment</TableHead>
              <TableHead>Initial Amount</TableHead>
              <TableHead>Current Value</TableHead>
              <TableHead>Return</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.map((investment) => (
              <TableRow key={investment.id}>
                <TableCell className="font-medium">{investment.name}</TableCell>
                <TableCell>{investment.amount}</TableCell>
                <TableCell>{investment.currentValue}</TableCell>
                <TableCell className="text-emerald-500">{investment.return}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {investment.status}
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

