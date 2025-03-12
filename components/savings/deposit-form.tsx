"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { makeDeposit } from "@/lib/api"

const formSchema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val.replace(/,/g, ""))) && Number(val.replace(/,/g, "")) > 0, {
    message: "Please enter a valid amount greater than 0",
  }),
  accountType: z.string({
    required_error: "Please select an account type",
  }),
  method: z.string({
    required_error: "Please select a payment method",
  }),
  reference: z.string().optional(),
  notes: z.string().optional(),
})

export function DepositForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      accountType: "",
      method: "",
      reference: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      await makeDeposit(values)
      router.push("/savings")
      router.refresh()
    } catch (error) {
      console.error("Failed to make deposit:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter amount" {...field} />
                </FormControl>
                <FormDescription>Enter the amount you wish to deposit</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="regular">Regular Savings</SelectItem>
                    <SelectItem value="fixed">Fixed Deposit</SelectItem>
                    <SelectItem value="goal">Savings Goal</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Select the account to deposit into</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="mobile">Mobile Money</SelectItem>
                    <SelectItem value="cash">Cash Deposit</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>How are you making this deposit?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reference Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter reference number" {...field} />
                </FormControl>
                <FormDescription>Transaction reference if applicable</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any additional information" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : "Make Deposit"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

