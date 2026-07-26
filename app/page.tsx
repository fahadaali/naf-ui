"use client"

import * as React from "react"

import { NafLogo } from "@/registry/naf/brand/naf-logo"
import { Button } from "@/registry/naf/ui/button"

import { ColorsSection } from "./sections/colors"
import { ComponentsSection } from "./sections/components"
import { LogoSection } from "./sections/logo"
import { StatusesSection } from "./sections/statuses"
import { TypographySection } from "./sections/typography"

type Mode = "light" | "dark"
type Direction = "rtl" | "ltr"

export default function PreviewPage() {
  const [mode, setMode] = React.useState<Mode>("light")
  const [direction, setDirection] = React.useState<Direction>("rtl")

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark")
  }, [mode])

  React.useEffect(() => {
    document.documentElement.setAttribute("dir", direction)
  }, [direction])

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <NafLogo className="h-16" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">المظهر</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={mode === "light" ? "default" : "outline"}
                  aria-pressed={mode === "light"}
                  onClick={() => setMode("light")}
                >
                  الوضع الفاتح
                </Button>
                <Button
                  size="sm"
                  variant={mode === "dark" ? "default" : "outline"}
                  aria-pressed={mode === "dark"}
                  onClick={() => setMode("dark")}
                >
                  الوضع الداكن
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-muted-foreground">الاتجاه</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={direction === "rtl" ? "default" : "outline"}
                  aria-pressed={direction === "rtl"}
                  onClick={() => setDirection("rtl")}
                >
                  من اليمين لليسار
                </Button>
                <Button
                  size="sm"
                  variant={direction === "ltr" ? "default" : "outline"}
                  aria-pressed={direction === "ltr"}
                  onClick={() => setDirection("ltr")}
                >
                  من اليسار لليمين
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold">نظام التصميم الموحّد لشركة ناف</h1>
          <p className="max-w-prose text-base text-muted-foreground">
            هذه الصفحة معاينة سجلّ <bdi>naf-ui</bdi>. كل ما فيها مسحوب من رموز الثيم والمكوّنات
            المعتمدة — لا قيمة لون ولا مقاس خط مكتوب مباشرة.
          </p>
        </div>
      </header>

      <main className="flex flex-col gap-12">
        <LogoSection />
        <ColorsSection />
        <TypographySection />
        <StatusesSection />
        <ComponentsSection />
      </main>

      <footer className="border-t border-border pt-6 text-sm text-muted-foreground">
        سجلّ ناف — <bdi>fahadaali/naf-ui</bdi>
      </footer>
    </div>
  )
}
