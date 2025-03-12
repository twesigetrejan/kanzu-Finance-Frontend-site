import { redirect } from "next/navigation"
import { getSession } from "@/lib/auth"
import { ProfileForm } from "@/components/profile/profile-form"
import { ProfileImageUpload } from "@/components/profile/profile-image-upload"

export default async function ProfilePage() {
  const session = await getSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <div className="space-y-6">
          <ProfileImageUpload />
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <ProfileForm />
        </div>
      </div>
    </div>
  )
}

