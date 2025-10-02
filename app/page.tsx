import { createClient } from "@/lib/supabase/server"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { GallerySection } from "@/components/gallery-section"
import { ContactSection } from "@/components/contact-section"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch all content from database
  const [{ data: hero }, { data: about }, { data: services }, { data: gallery }, { data: contact }, { data: config }] =
    await Promise.all([
      supabase.from("hero_section").select("*").limit(1).single(),
      supabase.from("about_section").select("*").limit(1).single(),
      supabase.from("services").select("*").eq("is_active", true).order("display_order"),
      supabase.from("gallery").select("*").eq("is_active", true).order("display_order").limit(6),
      supabase.from("contact_info").select("*").limit(1).single(),
      supabase.from("site_config").select("*").limit(1).single(),
    ])

  return (
    <ThemeProvider colors={config}>
      <div className="min-h-screen bg-background" dir="rtl">
        <Header contact={contact} />
        <main>
          <HeroSection data={hero} />
          <AboutSection data={about} />
          <ServicesSection data={services || []} />
          <GallerySection data={gallery || []} />
          <ContactSection data={contact} />
        </main>
        <Footer contact={contact} />
      </div>
    </ThemeProvider>
  )
}
