"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Trash2 } from "lucide-react"

interface ServicesEditorProps {
  data: any[]
}

export function ServicesEditor({ data }: ServicesEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [services, setServices] = useState(data)
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
  })

  const handleUpdate = async (id: string, field: string, value: string) => {
    const supabase = createClient()
    const { error } = await supabase
      .from("services")
      .update({ [field]: value })
      .eq("id", id)

    if (error) {
      alert("حدث خطأ: " + error.message)
    } else {
      router.refresh()
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الخدمة؟")) return

    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("services").delete().eq("id", id)

    if (error) {
      alert("حدث خطأ: " + error.message)
    } else {
      alert("تم الحذف بنجاح!")
      router.refresh()
    }
    setIsLoading(false)
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from("services").insert({
      ...newService,
      display_order: services.length + 1,
    })

    if (error) {
      alert("حدث خطأ: " + error.message)
    } else {
      alert("تم الإضافة بنجاح!")
      setNewService({ title: "", description: "", icon: "" })
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إضافة خدمة جديدة</CardTitle>
          <CardDescription>أضف خدمة جديدة إلى قائمة الخدمات</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-title">العنوان</Label>
                <Input
                  id="new-title"
                  value={newService.title}
                  onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-icon">الأيقونة (emoji)</Label>
                <Input
                  id="new-icon"
                  value={newService.icon}
                  onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                  placeholder="🎉"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-description">الوصف</Label>
                <Input
                  id="new-description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading}>
              <Plus className="ml-2 h-4 w-4" />
              إضافة خدمة
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-start">
                <div className="space-y-2">
                  <Label>الأيقونة</Label>
                  <Input
                    value={service.icon || ""}
                    onChange={(e) => handleUpdate(service.id, "icon", e.target.value)}
                    className="w-20 text-center text-2xl"
                  />
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>العنوان</Label>
                    <Input value={service.title} onChange={(e) => handleUpdate(service.id, "title", e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>الوصف</Label>
                    <Textarea
                      value={service.description}
                      onChange={(e) => handleUpdate(service.id, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>

                <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)} disabled={isLoading}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
