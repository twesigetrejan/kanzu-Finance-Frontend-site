"use server"

import { supabase } from "./supabase"
import { getUser } from "./auth"

// Profile functions
export async function getProfile() {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching profile:", error)
    throw new Error("Failed to fetch profile")
  }

  return data
}

export async function updateProfile(profileData: any) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase.from("profiles").update(profileData).eq("id", user.id).select().single()

  if (error) {
    console.error("Error updating profile:", error)
    throw new Error("Failed to update profile")
  }

  return data
}

export async function updateProfileImage(filePath: string) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("profiles")
    .update({ profile_image: filePath })
    .eq("id", user.id)
    .select()
    .single()

  if (error) {
    console.error("Error updating profile image:", error)
    throw new Error("Failed to update profile image")
  }

  return data
}

// Loan functions
export async function getLoans() {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("loans")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false }) // Changed from date_applied to created_at

  if (error) {
    console.error("Error fetching loans:", error)
    throw new Error("Failed to fetch loans")
  }

  return data
}

export async function getLoanById(id: string) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("loans")
    .select(`
      *,
      loan_payments(*),
      loan_documents(*)
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (error) {
    console.error("Error fetching loan:", error)
    throw new Error("Failed to fetch loan")
  }

  return data
}

export async function applyForLoan(loanData: any) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("loans")
    .insert({
      user_id: user.id,
      loan_type: loanData.loanType,
      amount: Number.parseFloat(loanData.amount.replace(/,/g, "")),
      term_months: Number.parseInt(loanData.term),
      purpose: loanData.purpose,
      // Removed collateral field as it doesn't exist in the schema
      status: "pending",
    })
    .select()
    .single()

  if (error) {
    console.error("Error applying for loan:", error)
    throw new Error("Failed to apply for loan")
  }

  return data
}

export async function uploadLoanDocument(loanId: string, file: File, name: string) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // First upload the file to Supabase Storage
  const fileExt = file.name.split(".").pop()
  const fileName = `${user.id}/${loanId}/${Date.now()}.${fileExt}`

  const { data: uploadData, error: uploadError } = await supabase.storage.from("loan_documents").upload(fileName, file)

  if (uploadError) {
    console.error("Error uploading document:", uploadError)
    throw new Error("Failed to upload document")
  }

  // Get the public URL for the uploaded file
  const { data: urlData } = supabase.storage.from("loan_documents").getPublicUrl(fileName)

  // Then create a record in the loan_documents table
  const { data, error } = await supabase
    .from("loan_documents")
    .insert({
      loan_id: loanId,
      name: name,
      file_path: fileName,
      file_url: urlData.publicUrl,
      date_uploaded: new Date().toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating document record:", error)
    throw new Error("Failed to create document record")
  }

  return data
}

// Savings functions
export async function getSavingsAccounts() {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase.from("savings_accounts").select("*").eq("user_id", user.id)

  if (error) {
    console.error("Error fetching savings accounts:", error)
    throw new Error("Failed to fetch savings accounts")
  }

  return data
}

export async function getSavingsTransactions() {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase
    .from("savings_transactions")
    .select(`
      *,
      savings_accounts(account_type)
    `)
    .eq("user_id", user.id)
    .order("date", { ascending: false })
    .limit(10)

  if (error) {
    console.error("Error fetching savings transactions:", error)
    throw new Error("Failed to fetch savings transactions")
  }

  return data
}

export async function makeDeposit(depositData: any) {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  // First, get the savings account
  const { data: accountData, error: accountError } = await supabase
    .from("savings_accounts")
    .select("*")
    .eq("user_id", user.id)
    .eq("account_type", depositData.accountType)
    .single()

  if (accountError) {
    console.error("Error fetching savings account:", accountError)
    throw new Error("Failed to fetch savings account")
  }

  const amount = Number.parseFloat(depositData.amount.replace(/,/g, ""))

  // Create a transaction
  const { data: transactionData, error: transactionError } = await supabase
    .from("savings_transactions")
    .insert({
      user_id: user.id,
      savings_account_id: accountData.id,
      type: "deposit",
      amount: amount,
      method: depositData.method,
      reference: depositData.reference || null,
      notes: depositData.notes || null,
      date: new Date().toISOString(),
    })
    .select()
    .single()

  if (transactionError) {
    console.error("Error creating transaction:", transactionError)
    throw new Error("Failed to create transaction")
  }

  // Update the account balance
  const { data: updateData, error: updateError } = await supabase
    .from("savings_accounts")
    .update({
      balance: accountData.balance + amount,
      last_transaction_date: new Date().toISOString(),
    })
    .eq("id", accountData.id)
    .select()
    .single()

  if (updateError) {
    console.error("Error updating account balance:", updateError)
    throw new Error("Failed to update account balance")
  }

  return transactionData
}

// Investment functions
export async function getInvestments() {
  const user = await getUser()

  if (!user) {
    throw new Error("User not authenticated")
  }

  const { data, error } = await supabase.from("investments").select("*").eq("user_id", user.id)

  if (error) {
    console.error("Error fetching investments:", error)
    throw new Error("Failed to fetch investments")
  }

  return data
}

