import { CreditCard, DollarSign, FileText, PiggyBank } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Apply for Loan",
      icon: CreditCard,
      href: "/loans/apply",
      color: "text-blue-500",
    },
    {
      title: "Make Deposit",
      icon: PiggyBank,
      href: "/savings/deposit",
      color: "text-emerald-500",
    },
    {
      title: "Request Statement",
      icon: FileText,
      href: "/statements",
      color: "text-amber-500",
    },
    {
      title: "Transfer Funds",
      icon: DollarSign,
      href: "/transfers",
      color: "text-purple-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto flex-col gap-2 p-4 justify-start items-center"
              asChild
            >
              <Link href={action.href}>
                <action.icon className={`h-5 w-5 ${action.color}`} />
                <span>{action.title}</span>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

