import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    redirect("/auth/login")
  }

  // Fetch all content
  const [{ data: hero }, { data: about }, { data: services }, { data: gallery }, { data: contact }, { data: config }] =
    await Promise.all([
      supabase.from("hero_section").select("*").limit(1).single(),
      supabase.from("about_section").select("*").limit(1).single(),
      supabase.from("services").select("*").order("display_order"),
      supabase.from("gallery").select("*").order("display_order"),
      supabase.from("contact_info").select("*").limit(1).single(),
      supabase.from("site_config").select("*").limit(1).single(),
    ])

  return (
    <AdminDashboard
      user={user}
      hero={hero}
      about={about}
      services={services || []}
      gallery={gallery || []}
      contact={contact}
      config={config}
    />
  )
}
