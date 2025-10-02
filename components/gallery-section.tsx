import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface GalleryItem {
  id: string
  title?: string
  description?: string
  image_url: string
}

interface GallerySectionProps {
  data: GalleryItem[]
}

export function GallerySection({ data }: GallerySectionProps) {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">معرض الأعمال</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            استعرض بعضاً من أعمالنا المميزة والفعاليات التي نظمناها
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 group border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {(item.title || item.description) && (
                <div className="p-6 pb-4">
                  {item.title && (
                    <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  )}
                  {item.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  )}
                </div>
              )}

              <div className="aspect-video relative bg-muted overflow-hidden">
                <img
                  src={item.image_url || `/placeholder.svg?height=400&width=600&query=work image`}
                  alt={item.title || "صورة من معرض الأعمال"}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    console.log("[v0] Image failed to load:", item.image_url)
                    e.currentTarget.src = `/placeholder.svg?height=400&width=600&query=work image`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Card>
          ))}
        </div>

        {data.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="group bg-transparent">
              عرض المزيد من الأعمال
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
