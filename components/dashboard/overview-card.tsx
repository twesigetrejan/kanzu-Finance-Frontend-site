import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
}

export function OverviewCard({ title, value, change, trend }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 text-sm">
          {trend === "up" ? (
            <span className="text-emerald-500 flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" />
              {change}
            </span>
          ) : (
            <span className="text-rose-500 flex items-center">
              <ArrowDown className="h-4 w-4 mr-1" />
              {change}
            </span>
          )}
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

