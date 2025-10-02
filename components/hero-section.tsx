import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface HeroSectionProps {
  data: {
    title?: string
    subtitle?: string
    description?: string
    button_text?: string
    button_link?: string
    background_image?: string
  } | null
}

export function HeroSection({ data }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative min-h-[700px] flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTMwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHpNNiAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      <div className="container relative z-10 text-center py-24 px-4">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">أفضل خدمات تنظيم المناسبات</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
            {data?.title || "شركة المناسبات الدولية"}
          </h1>

          <p className="text-2xl md:text-4xl mb-4 text-balance font-semibold bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
            {data?.subtitle || "نحول أحلامك إلى واقع مبهر"}
          </p>

          <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-pretty leading-relaxed text-white/90">
            {data?.description || "نقدم خدمات تنظيم المناسبات والفعاليات بأعلى معايير الجودة والاحترافية"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all"
              asChild
            >
              <a href={data?.button_link || "#contact"}>{data?.button_text || "تواصل معنا"}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
              asChild
            >
              <a href="#services">استكشف خدماتنا</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
