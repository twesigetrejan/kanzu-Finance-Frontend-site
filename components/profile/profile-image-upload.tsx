"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function ProfileImageUpload() {
  const { toast } = useToast()
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    // Simulate upload delay
    setTimeout(() => {
      const reader = new FileReader()
      reader.onload = (event) => {
        setAvatar(event.target?.result as string)
        setIsUploading(false)

        toast({
          title: "Image uploaded",
          description: "Your profile image has been updated",
        })
      }
      reader.readAsDataURL(file)
    }, 1500)
  }

  const removeAvatar = () => {
    setAvatar(null)
    toast({
      title: "Image removed",
      description: "Your profile image has been removed",
    })
  }

  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center gap-4">
        <Avatar className="h-32 w-32">
          <AvatarImage src={avatar || "/placeholder.svg?height=128&width=128"} alt="Profile" />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
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

