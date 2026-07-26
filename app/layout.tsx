import type { Metadata } from "next"

import "./globals.css"

export const metadata: Metadata = {
  title: "نظام التصميم الموحّد لشركة ناف",
  description: "سجلّ ناف — الثيم والشعار والمكوّنات المعتمدة للمنصات الخمس",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  )
}
