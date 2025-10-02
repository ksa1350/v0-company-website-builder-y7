"use client"

import type React from "react"

import { useEffect } from "react"

interface ThemeProviderProps {
  colors?: {
    primary_color?: string
    secondary_color?: string
    accent_color?: string
    background_color?: string
    text_color?: string
  }
  children: React.ReactNode
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

export function ThemeProvider({ colors, children }: ThemeProviderProps) {
  useEffect(() => {
    if (!colors) return

    const root = document.documentElement

    if (colors.primary_color) {
      root.style.setProperty("--primary", colors.primary_color)
      root.style.setProperty("--ring", colors.primary_color)
      root.style.setProperty("--chart-1", colors.primary_color)
    }
    if (colors.secondary_color) {
      root.style.setProperty("--secondary", colors.secondary_color)
      root.style.setProperty("--chart-2", colors.secondary_color)
    }
    if (colors.accent_color) {
      root.style.setProperty("--accent", colors.accent_color)
      root.style.setProperty("--chart-3", colors.accent_color)
    }
    if (colors.background_color) {
      root.style.setProperty("--background", colors.background_color)
      root.style.setProperty("--card", colors.background_color)
    }
    if (colors.text_color) {
      root.style.setProperty("--foreground", colors.text_color)
      root.style.setProperty("--card-foreground", colors.text_color)
    }
  }, [colors])

  return <>{children}</>
}
