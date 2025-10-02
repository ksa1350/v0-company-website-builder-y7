"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { HeroEditor } from "./hero-editor"
import { AboutEditor } from "./about-editor"
import { ServicesEditor } from "./services-editor"
import { GalleryEditor } from "./gallery-editor"
import { ContactEditor } from "./contact-editor"
import { ColorEditor } from "./color-editor"

interface AdminDashboardProps {
  user: User
  hero: any
  about: any
  services: any[]
  gallery: any[]
  contact: any
  config: any
}

export function AdminDashboard({ user, hero, about, services, gallery, contact, config }: AdminDashboardProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <header className="border-b bg-card">
        <div className="container flex h-16 items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <a href="/" target="_blank" rel="noreferrer">
                عرض الموقع
              </a>
            </Button>
            <Button variant="destructive" onClick={handleLogout} disabled={isLoggingOut}>
              <LogOut className="ml-2 h-4 w-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="hero" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="hero">القسم الرئيسي</TabsTrigger>
            <TabsTrigger value="about">من نحن</TabsTrigger>
            <TabsTrigger value="services">الخدمات</TabsTrigger>
            <TabsTrigger value="gallery">المعرض</TabsTrigger>
            <TabsTrigger value="contact">التواصل</TabsTrigger>
            <TabsTrigger value="colors">الألوان</TabsTrigger>
          </TabsList>

          <TabsContent value="hero">
            <HeroEditor data={hero} />
          </TabsContent>

          <TabsContent value="about">
            <AboutEditor data={about} />
          </TabsContent>

          <TabsContent value="services">
            <ServicesEditor data={services} />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryEditor data={gallery} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactEditor data={contact} />
          </TabsContent>

          <TabsContent value="colors">
            <ColorEditor data={config} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
