import { Facebook, Instagram, Twitter } from "lucide-react"

interface FooterProps {
  contact: {
    phone?: string
    email?: string
    instagram?: string
    twitter?: string
    facebook?: string
  } | null
}

export function Footer({ contact }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 border-t border-gray-700">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="text-center md:text-right">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              شركة المناسبات الدولية
            </h3>
            <p className="text-gray-400 leading-relaxed">
              نحول أحلامك إلى واقع مبهر من خلال خدمات تنظيم المناسبات الاحترافية
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors">
                الرئيسية
              </a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                من نحن
              </a>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                خدماتنا
              </a>
              <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                معرض الأعمال
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                تواصل معنا
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">تابعنا</h4>
            <div className="flex justify-center md:justify-start gap-4">
              {contact?.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {contact?.twitter && (
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {contact?.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
            {contact?.email && (
              <p className="text-gray-400 mt-4 text-sm">
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">
                  {contact.email}
                </a>
              </p>
            )}
            {contact?.phone && (
              <p className="text-gray-400 mt-2 text-sm">
                <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">
                  {contact.phone}
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} شركة المناسبات الدولية. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  )
}
