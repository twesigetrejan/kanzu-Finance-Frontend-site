"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// This is a simplified auth implementation for demonstration purposes
// In a real application, you would use a proper auth library like NextAuth.js or Auth.js

interface Session {
  user: {
    id: string
    name: string
    email: string
  }
  expires: string
}

export async function login(email: string, password: string) {
  // In a real app, you would validate credentials against a database
  if (email === "demo@example.com" && password === "password") {
    const session: Session = {
      user: {
        id: "1",
        name: "John Doe",
        email: "demo@example.com",
      },
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }

    cookies().set("session", JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    })

    return session
  }

  throw new Error("Invalid credentials")
}

export async function logout() {
  cookies().delete("session")
  redirect("/")
}

export async function getSession(): Promise<Session | null> {
  const sessionCookie = cookies().get("session")

  if (!sessionCookie) {
    return null
  }

  try {
    const session: Session = JSON.parse(sessionCookie.value)

    // Check if session is expired
    if (new Date(session.expires) < new Date()) {
      cookies().delete("session")
      return null
    }

    return session
  } catch (error) {
    return null
  }
}

