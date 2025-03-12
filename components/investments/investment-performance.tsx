import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function InvestmentPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-4">
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Investment performance chart would appear here</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Invested</h4>
                <p className="text-2xl font-bold">$8,500.00</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Value</h4>
                <p className="text-2xl font-bold">$9,495.00</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Return</h4>
                <p className="text-2xl font-bold text-emerald-500">+$995.00 (11.7%)</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Annual Yield</h4>
                <p className="text-2xl font-bold">8.5%</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="monthly" className="pt-4">
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Monthly performance chart would appear here</p>
            </div>
          </TabsContent>
          <TabsContent value="yearly" className="pt-4">
            <div className="h-[200px] flex items-center justify-center bg-muted/20 rounded-md">
              <p className="text-muted-foreground">Yearly performance chart would appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

