"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Upload, LinkIcon, AlertCircle } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GalleryEditorProps {
  data: any[]
}

export function GalleryEditor({ data }: GalleryEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [gallery, setGallery] = useState(data)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image_url: "",
  })
  const [uploadMethod, setUploadMethod] = useState<"url" | "file">("file")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(false)
  const [urlError, setUrlError] = useState<string>("")

  const handleDelete = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا العنصر؟")) return

    setIsLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("gallery").delete().eq("id", id)

    if (error) {
      alert("حدث خطأ: " + error.message)
    } else {
      alert("تم الحذف بنجاح!")
      router.refresh()
    }
    setIsLoading(false)
  }

  const handleFileUpload = async (file: File) => {
    setUploadProgress(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload file")
      }

      const data = await response.json()

      const supabase = createClient()
      const { error } = await supabase.from("gallery").insert({
        title: newItem.title,
        description: newItem.description,
        image_url: data.url,
        display_order: gallery.length + 1,
      })

      if (error) {
        throw new Error(error.message)
      }

      alert("تم رفع وحفظ الصورة بنجاح!")
      setNewItem({ title: "", description: "", image_url: "" })
      setSelectedFile(null)
      setUrlError("")
      router.refresh()
    } catch (error) {
      console.error("[v0] Upload error:", error)
      alert("حدث خطأ أثناء رفع الصورة: " + (error instanceof Error ? error.message : "خطأ غير معروف"))
    } finally {
      setUploadProgress(false)
    }
  }

  const validateImageUrl = (url: string): { valid: boolean; error?: string; cleanUrl?: string } => {
    try {
      const urlObj = new URL(url)

      // Check if it's a Google Images URL
      if (urlObj.hostname.includes("google.com") && url.includes("imgurl=")) {
        return {
          valid: false,
          error:
            "لا يمكن استخدام روابط بحث Google. الرجاء النقر بزر الماوس الأيمن على الصورة واختيار 'نسخ عنوان الصورة'",
        }
      }

      // Check if it's a direct image URL or Vercel Blob
      if (
        urlObj.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) ||
        urlObj.hostname.includes("blob.vercel-storage.com")
      ) {
        return { valid: true, cleanUrl: url }
      }

      return {
        valid: false,
        error: "الرجاء إدخال رابط صورة مباشر ينتهي بـ .jpg أو .png أو .webp",
      }
    } catch {
      return {
        valid: false,
        error: "الرجاء إدخال رابط صحيح",
      }
    }
  }

  const handleUrlChange = (url: string) => {
    setNewItem({ ...newItem, image_url: url })
    if (url) {
      const validation = validateImageUrl(url)
      setUrlError(validation.error || "")
    } else {
      setUrlError("")
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (uploadMethod === "file" && selectedFile) {
      await handleFileUpload(selectedFile)
      return
    }

    if (!newItem.image_url) {
      alert("الرجاء إضافة صورة")
      return
    }

    if (uploadMethod === "url") {
      const validation = validateImageUrl(newItem.image_url)
      if (!validation.valid) {
        setUrlError(validation.error || "رابط غير صالح")
        return
      }
    }

    setIsLoading(true)

    const supabase = createClient()
    const { error } = await supabase.from("gallery").insert({
      ...newItem,
      display_order: gallery.length + 1,
    })

    if (error) {
      alert("حدث خطأ: " + error.message)
    } else {
      alert("تم الإضافة بنجاح!")
      setNewItem({ title: "", description: "", image_url: "" })
      setSelectedFile(null)
      setUrlError("")
      router.refresh()
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إضافة صورة جديدة</CardTitle>
          <CardDescription>أضف صورة جديدة إلى معرض الأعمال (النص اختياري)</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
            <Tabs value={uploadMethod} onValueChange={(v) => setUploadMethod(v as "url" | "file")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="file">
                  <Upload className="ml-2 h-4 w-4" />
                  رفع ملف
                </TabsTrigger>
                <TabsTrigger value="url">
                  <LinkIcon className="ml-2 h-4 w-4" />
                  رابط
                </TabsTrigger>
              </TabsList>

              <TabsContent value="file" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload">اختر صورة</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setSelectedFile(file)
                        setNewItem({ ...newItem, image_url: "" })
                        setUrlError("")
                      }
                    }}
                  />
                  {selectedFile && <p className="text-sm text-muted-foreground">الملف المحدد: {selectedFile.name}</p>}
                  {newItem.image_url && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600 mb-2">تم رفع الصورة بنجاح!</p>
                      <img
                        src={newItem.image_url || "/placeholder.svg"}
                        alt="معاينة"
                        className="w-full max-w-xs rounded-md border"
                      />
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="url" className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>كيفية الحصول على رابط صورة مباشر:</strong>
                    <br />
                    1. ابحث عن الصورة في Google Images
                    <br />
                    2. افتح الصورة في صفحة جديدة
                    <br />
                    3. انقر بزر الماوس الأيمن واختر "نسخ عنوان الصورة"
                    <br />
                    4. الصق الرابط هنا
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="new-image">رابط الصورة المباشر</Label>
                  <Input
                    id="new-image"
                    value={newItem.image_url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={urlError ? "border-red-500" : ""}
                  />
                  {urlError && <p className="text-sm text-red-500">{urlError}</p>}
                  {newItem.image_url && !urlError && (
                    <div className="mt-2">
                      <p className="text-sm text-green-600 mb-2">معاينة الصورة:</p>
                      <img
                        src={newItem.image_url || "/placeholder.svg?height=200&width=300&query=work image"}
                        alt="معاينة"
                        className="w-full max-w-xs rounded-md border"
                        onError={() => setUrlError("فشل تحميل الصورة. تأكد من صحة الرابط")}
                      />
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <Label htmlFor="new-title">العنوان (اختياري)</Label>
              <Input
                id="new-title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                placeholder="اكتب عنوان للصورة..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-description">الوصف (اختياري)</Label>
              <Textarea
                id="new-description"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="اكتب وصف للصورة..."
                rows={3}
              />
            </div>

            <Button type="submit" disabled={isLoading || uploadProgress || !!urlError}>
              <Plus className="ml-2 h-4 w-4" />
              {uploadProgress ? "جاري الرفع..." : "إضافة صورة"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video relative bg-muted">
              <img
                src={item.image_url || `/placeholder.svg?height=200&width=300&query=work image`}
                alt={item.title || "صورة من معرض الأعمال"}
                className="object-cover w-full h-full"
                onError={(e) => {
                  console.log("[v0] Image failed to load:", item.image_url)
                  e.currentTarget.src = `/placeholder.svg?height=200&width=300&query=work image`
                }}
              />
            </div>

            <CardContent className="pt-4 space-y-3">
              {item.title && <h3 className="font-semibold text-lg">{item.title}</h3>}
              {item.description && <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>}

              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => handleDelete(item.id)}
                disabled={isLoading}
              >
                <Trash2 className="ml-2 h-4 w-4" />
                حذف
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
