"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface HeaderProps {
  contact: {
    phone?: string
    email?: string
  } | null
}

export function Header({ contact }: HeaderProps) {
  const router = useRouter()
  const [clickCount, setClickCount] = useState(0)
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null)

  const handleLogoClick = () => {
    setClickCount((prev) => prev + 1)

    if (clickTimer) {
      clearTimeout(clickTimer)
    }

    const timer = setTimeout(() => {
      setClickCount(0)
    }, 500)

    setClickTimer(timer)

    if (clickCount + 1 === 2) {
      router.push("/auth/login")
      setClickCount(0)
      if (clickTimer) clearTimeout(clickTimer)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer select-none">
          <span className="text-xl font-bold">شركة المناسبات الدولية</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="#home" className="text-sm font-medium hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            من نحن
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary transition-colors">
            خدماتنا
          </Link>
          <Link href="#gallery" className="text-sm font-medium hover:text-primary transition-colors">
            معرض الأعمال
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            تواصل معنا
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {contact?.phone && (
            <Button asChild>
              <a href={`tel:${contact.phone}`}>اتصل بنا</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
