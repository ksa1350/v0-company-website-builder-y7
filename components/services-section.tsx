import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Service {
  id: string
  title: string
  description: string
  icon?: string
}

interface ServicesSectionProps {
  data: Service[]
}

export function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">خدماتنا</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجاتكم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((service, index) => (
            <Card
              key={service.id}
              className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/50 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                {service.icon && (
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                )}
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
