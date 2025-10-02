"use server"

import { createClient } from "@supabase/supabase-js"

export async function createAdminUser() {
  try {
    console.log("[v0] Starting admin user creation/update...")

    // Use service role key to create user with admin privileges
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Check if user already exists
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers()
    const existingUser = existingUsers?.users.find((user) => user.email === "thossam099@gmail.com")

    if (existingUser) {
      console.log("[v0] User exists, checking email confirmation status...")

      if (!existingUser.email_confirmed_at) {
        console.log("[v0] Email not confirmed, updating user...")

        const { data, error } = await supabaseAdmin.auth.admin.updateUserById(existingUser.id, {
          email_confirm: true,
          user_metadata: {
            role: "admin",
          },
        })

        if (error) {
          console.error("[v0] Error updating user:", error)
          return { success: false, error: error.message }
        }

        console.log("[v0] User updated successfully:", data)
        return { success: true, message: "تم تأكيد البريد الإلكتروني! يمكنك الآن تسجيل الدخول" }
      }

      return { success: true, message: "الحساب موجود ومفعّل بالفعل" }
    }

    console.log("[v0] Creating new admin user...")
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: "thossam099@gmail.com",
      password: "Talal6500a",
      email_confirm: true,
      user_metadata: {
        role: "admin",
      },
    })

    if (error) {
      console.error("[v0] Error creating admin user:", error)
      return { success: false, error: error.message }
    }

    console.log("[v0] Admin user created successfully:", data)
    return { success: true, message: "تم إنشاء حساب الأدمن بنجاح!" }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
    return { success: false, error: "حدث خطأ غير متوقع" }
  }
}
