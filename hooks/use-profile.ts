import { useState, useEffect } from "react";
import { supabase, Profile, TABLES } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    updates: Partial<Omit<Profile, "id" | "created_at">>
  ) => {
    try {
      const { data, error } = await supabase
        .from(TABLES.PROFILES)
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user?.id)
        .select()
        .single();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const uploadProfileImage = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      const filePath = `profile-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("profiles")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("profiles").getPublicUrl(filePath);

      await updateProfile({ profile_image_url: publicUrl });
      return publicUrl;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadProfileImage,
    refreshProfile: fetchProfile,
  };
}
