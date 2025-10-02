"use client"

import type React from "react"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createAdminUser } from "../actions"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    console.log("[v0] Attempting login...")

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("[v0] Login error:", error.message)

        // If email is not confirmed, automatically fix it and retry
        if (error.message.includes("Email not confirmed")) {
          console.log("[v0] Email not confirmed, auto-fixing...")
          setSuccess("جاري تفعيل البريد الإلكتروني...")

          const result = await createAdminUser()

          if (result.success) {
            console.log("[v0] Email confirmed, retrying login...")
            setSuccess("تم تفعيل البريد الإلكتروني، جاري تسجيل الدخول...")

            // Retry login
            const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
              email,
              password,
            })

            if (retryError) {
              console.error("[v0] Retry login error:", retryError.message)
              setError(retryError.message)
            } else {
              console.log("[v0] Login successful after email confirmation!")
              setSuccess("تم تسجيل الدخول بنجاح! جاري التحويل...")
              // Small delay to ensure cookies are set
              setTimeout(() => {
                window.location.href = "/admin/dashboard"
              }, 500)
            }
          } else {
            setError(result.error || "فشل تفعيل البريد الإلكتروني")
          }
        } else {
          setError(error.message)
        }
      } else {
        console.log("[v0] Login successful, redirecting...")
        setSuccess("تم تسجيل الدخول بنجاح! جاري التحويل...")
        setTimeout(() => {
          window.location.href = "/admin/dashboard"
        }, 500)
      }
    } catch (err) {
      console.error("[v0] Unexpected error:", err)
      setError("حدث خطأ غير متوقع")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تسجيل دخول الأدمن</CardTitle>
          <CardDescription>ادخل بياناتك للوصول إلى لوحة التحكم</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                dir="ltr"
              />
            </div>
            {error && <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>}
            {success && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md">{success}</div>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
