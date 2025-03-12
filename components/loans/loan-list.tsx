"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { getLoans } from "@/lib/api"
import { formatCurrency, formatDate } from "@/lib/utils"

export function LoanList() {
  const router = useRouter()
  const [loans, setLoans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchLoans() {
      try {
        const data = await getLoans()
        setLoans(data)
      } catch (error) {
        console.error("Error fetching loans:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLoans()
  }, [])

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
      case "rejected":
        return (
          <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  if (loans.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No loans found. Apply for a loan to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Loan Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date Applied</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remaining Balance</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loans.map((loan) => (
              <TableRow key={loan.id}>
                <TableCell>{loan.loan_type}</TableCell>
                <TableCell>{formatCurrency(loan.amount)}</TableCell>
                <TableCell>{formatDate(loan.created_at)}</TableCell> {/* Changed from date_applied to created_at */}
                <TableCell>{getStatusBadge(loan.status)}</TableCell>
                <TableCell>{loan.remaining_balance ? formatCurrency(loan.remaining_balance) : "-"}</TableCell>
                <TableCell>{loan.next_payment_date ? formatDate(loan.next_payment_date) : "-"}</TableCell>
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

