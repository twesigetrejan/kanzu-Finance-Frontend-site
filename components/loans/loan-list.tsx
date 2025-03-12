"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoanList() {
  const router = useRouter()
  const [loans] = useState([
    {
      id: "1",
      type: "Home Improvement",
      amount: "$5,000.00",
      dateApproved: "2023-01-15",
      status: "active",
      remainingBalance: "$3,250.00",
      nextPayment: "2023-06-15",
    },
    {
      id: "2",
      type: "Education",
      amount: "$2,500.00",
      dateApproved: "2023-03-10",
      status: "active",
      remainingBalance: "$1,875.00",
      nextPayment: "2023-06-10",
    },
    {
      id: "3",
      type: "Business",
      amount: "$10,000.00",
      dateApproved: "2022-11-05",
      status: "completed",
      remainingBalance: "$0.00",
      nextPayment: "-",
    },
  ])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Active
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date Approved</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remaining Balance</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.type}</TableCell>
                <TableCell>{loan.amount}</TableCell>
                <TableCell>{loan.dateApproved}</TableCell>
                <TableCell>{getStatusBadge(loan.status)}</TableCell>
                <TableCell>{loan.remainingBalance}</TableCell>
                <TableCell>{loan.nextPayment}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => router.push(`/loans/${loan.id}`)}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

