"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useSupabase } from "@/hooks/use-supabase"
import { getProfile, updateProfileImage } from "@/lib/api"

export function ProfileImageUpload() {
  const { toast } = useToast()
  const { supabase } = useSupabase()
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [initials, setInitials] = useState("JD")

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile()
        if (profile.profile_image) {
          setAvatar(profile.profile_image)
        }

        if (profile.full_name) {
          const nameParts = profile.full_name.split(" ")
          if (nameParts.length >= 2) {
            setInitials(`${nameParts[0][0]}${nameParts[1][0]}`)
          } else if (nameParts.length === 1) {
            setInitials(nameParts[0].substring(0, 2))
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image under 5MB",
        variant: "destructive",
      })
      return
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Get user data to use as part of the file path
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        throw new Error("User not authenticated")
      }

      // Upload to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${user.id}/${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from("profile_images").upload(fileName, file)

      if (uploadError) {
        throw uploadError
      }

      // Get the public URL
      const { data: urlData } = supabase.storage.from("profile_images").getPublicUrl(fileName)

      // Update profile with new image URL
      await updateProfileImage(urlData.publicUrl)

      setAvatar(urlData.publicUrl)

      toast({
        title: "Image uploaded",
        description: "Your profile image has been updated",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const removeAvatar = async () => {
    setIsUploading(true)

    try {
      await updateProfileImage(null)
      setAvatar(null)

      toast({
        title: "Image removed",
        description: "Your profile image has been removed",
      })
    } catch (error) {
      console.error("Error removing image:", error)
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6 flex flex-col items-center gap-4">
          <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatar || ""} alt="Profile" />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="relative" disabled={isUploading}>
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload"}
          </Button>

          {avatar && (
            <Button variant="outline" size="sm" onClick={removeAvatar} disabled={isUploading}>
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center">Upload a profile picture. Max size 5MB.</p>
      </CardContent>
    </Card>
  )
}

