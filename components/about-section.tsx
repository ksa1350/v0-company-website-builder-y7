import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Sparkles, Target } from "lucide-react"

interface AboutSectionProps {
  data: {
    title?: string
    content?: string
    image?: string
  } | null
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">{data?.title || "من نحن"}</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="mb-8 border-2 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground text-pretty text-center">
                {data?.content ||
                  "شركة المناسبات الدولية هي شركة رائدة في مجال تنظيم الفعاليات والمناسبات الخاصة والعامة. نفخر بتقديم خدمات متميزة تلبي تطلعات عملائنا وتحول أحلامهم إلى واقع مبهر."}
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">خبرة واسعة</h3>
                <p className="text-sm text-muted-foreground">سنوات من الخبرة في تنظيم المناسبات</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">فريق محترف</h3>
                <p className="text-sm text-muted-foreground">فريق عمل متخصص ومحترف</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">إبداع متميز</h3>
                <p className="text-sm text-muted-foreground">أفكار إبداعية وتنفيذ مبتكر</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">دقة في التنفيذ</h3>
                <p className="text-sm text-muted-foreground">التزام بالمواعيد والجودة</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
