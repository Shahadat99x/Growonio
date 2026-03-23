"use server";

import { createClient, hasSupabaseEnv, missingSupabaseConfigMessage } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type LoginActionState = {
  error?: string;
} | null;

export async function loginAction(_prevState: LoginActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const locale = formData.get("locale") as string || "en";

  if (!hasSupabaseEnv()) {
    return { error: missingSupabaseConfigMessage };
  }

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Redirect to admin dashboard on success
  redirect(`/${locale}/admin`);
}

export async function logoutAction(locale: string = "en") {
  if (!hasSupabaseEnv()) {
    redirect(`/${locale}/login`);
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(`/${locale}/login`);
}
