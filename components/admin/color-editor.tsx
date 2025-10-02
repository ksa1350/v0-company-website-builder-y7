"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ColorEditorProps {
  data: any
}

export function ColorEditor({ data }: ColorEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    primary_color: data?.primary_color || "#2563eb",
    secondary_color: data?.secondary_color || "#7c3aed",
    accent_color: data?.accent_color || "#f59e0b",
    background_color: data?.background_color || "#ffffff",
    text_color: data?.text_color || "#1f2937",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from("site_config").update(formData).eq("id", data.id)

    if (error) {
      alert("حدث خطأ: " + error.message)
    } else {
      alert("تم الحفظ بنجاح! قم بتحديث الصفحة لرؤية التغييرات")
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>تعديل ألوان الموقع</CardTitle>
        <CardDescription>قم بتخصيص ألوان الموقع حسب هوية علامتك التجارية</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_color">اللون الأساسي</Label>
              <div className="flex gap-2">
                <Input
                  id="primary_color"
                  type="color"
                  value={formData.primary_color}
                  onChange={(e) => setFormData({ ...formData, primary_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input value={formData.primary_color} readOnly className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondary_color">اللون الثانوي</Label>
              <div className="flex gap-2">
                <Input
                  id="secondary_color"
                  type="color"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData({ ...formData, secondary_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input value={formData.secondary_color} readOnly className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent_color">لون التمييز</Label>
              <div className="flex gap-2">
                <Input
                  id="accent_color"
                  type="color"
                  value={formData.accent_color}
                  onChange={(e) => setFormData({ ...formData, accent_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input value={formData.accent_color} readOnly className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background_color">لون الخلفية</Label>
              <div className="flex gap-2">
                <Input
                  id="background_color"
                  type="color"
                  value={formData.background_color}
                  onChange={(e) => setFormData({ ...formData, background_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input value={formData.background_color} readOnly className="flex-1" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text_color">لون النص</Label>
              <div className="flex gap-2">
                <Input
                  id="text_color"
                  type="color"
                  value={formData.text_color}
                  onChange={(e) => setFormData({ ...formData, text_color: e.target.value })}
                  className="w-20 h-10"
                />
                <Input value={formData.text_color} readOnly className="flex-1" />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
