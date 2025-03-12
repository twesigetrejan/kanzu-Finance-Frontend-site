"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Download, FileText } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LoanDetailProps {
  id: string
}

export function LoanDetail({ id }: LoanDetailProps) {
  const [loan, setLoan] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoan({
        id,
        type: "Home Improvement",
        amount: "$5,000.00",
        dateApproved: "2023-01-15",
        status: "active",
        remainingBalance: "$3,250.00",
        nextPayment: "2023-06-15",
        term: "24 months",
        interestRate: "12%",
        monthlyPayment: "$235.12",
        purpose: "Kitchen renovation",
        progress: 35,
        payments: [
          {
            id: "1",
            date: "2023-05-15",
            amount: "$235.12",
            principal: "$185.12",
            interest: "$50.00",
            status: "completed",
          },
          {
            id: "2",
            date: "2023-04-15",
            amount: "$235.12",
            principal: "$183.28",
            interest: "$51.84",
            status: "completed",
          },
          {
            id: "3",
            date: "2023-03-15",
            amount: "$235.12",
            principal: "$181.46",
            interest: "$53.66",
            status: "completed",
          },
          {
            id: "4",
            date: "2023-02-15",
            amount: "$235.12",
            principal: "$179.66",
            interest: "$55.46",
            status: "completed",
          },
        ],
        documents: [
          {
            id: "1",
            name: "Loan Agreement",
            date: "2023-01-15",
            type: "PDF",
          },
          {
            id: "2",
            name: "Payment Schedule",
            date: "2023-01-15",
            type: "PDF",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!loan) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loan not found</p>
      </div>
    )
  }

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
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Loan Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loan.amount}</div>
            <p className="text-xs text-muted-foreground mt-1">Approved on {loan.dateApproved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loan.remainingBalance}</div>
            <div className="mt-2">
              <Progress value={loan.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">{loan.progress}% paid off</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loan.monthlyPayment}</div>
            <p className="text-xs text-muted-foreground mt-1">Due on {loan.nextPayment}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Loan Details</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Loan Type</dt>
                  <dd className="mt-1 text-sm">{loan.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Status</dt>
                  <dd className="mt-1 text-sm">{getStatusBadge(loan.status)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Term</dt>
                  <dd className="mt-1 text-sm">{loan.term}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Interest Rate</dt>
                  <dd className="mt-1 text-sm">{loan.interestRate}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Monthly Payment</dt>
                  <dd className="mt-1 text-sm">{loan.monthlyPayment}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Purpose</dt>
                  <dd className="mt-1 text-sm">{loan.purpose}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loan.payments.map((payment: any) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.principal}</TableCell>
                      <TableCell>{payment.interest}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {loan.documents.map((doc: any) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

