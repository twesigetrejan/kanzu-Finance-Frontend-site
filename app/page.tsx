import { redirect } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { getSession } from "@/lib/auth"

export default async function Home() {
  const session = await getSession()

  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border border-border">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">SACCO Member Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to access your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

