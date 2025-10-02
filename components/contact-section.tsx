import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactSectionProps {
  data: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  } | null
}

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">تواصل معنا</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا للإجابة على استفساراتكم ومساعدتكم في تحقيق رؤيتكم
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {data?.phone && (
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-3">
                  <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-lg">الهاتف</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`tel:${data.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {data.phone}
                </a>
              </CardContent>
            </Card>
          )}

          {data?.email && (
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-lg">البريد الإلكتروني</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`mailto:${data.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium break-all"
                >
                  {data.email}
                </a>
              </CardContent>
            </Card>
          )}

          {data?.whatsapp && (
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-3">
                  <MessageCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-lg">واتساب</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {data.whatsapp}
                </a>
              </CardContent>
            </Card>
          )}

          {data?.address && (
            <Card className="hover:shadow-xl transition-all hover:-translate-y-1 border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle className="text-lg">العنوان</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{data.address}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto border-2 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">هل لديك مناسبة قادمة؟</h3>
              <p className="text-muted-foreground mb-6">
                دعنا نساعدك في تحويل رؤيتك إلى حقيقة. تواصل معنا اليوم للحصول على استشارة مجانية
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {data?.phone && (
                  <Button size="lg" asChild>
                    <a href={`tel:${data.phone}`}>
                      <Phone className="ml-2 h-4 w-4" />
                      اتصل بنا الآن
                    </a>
                  </Button>
                )}
                {data?.whatsapp && (
                  <Button size="lg" variant="outline" asChild>
                    <a
                      href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="ml-2 h-4 w-4" />
                      راسلنا على واتساب
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
