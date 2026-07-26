import { NafLogo } from "@/registry/naf/brand/naf-logo"

import { Section } from "./section"

/**
 * الشعار في الوضعين.
 * الشبكتان أدناه تعرضان النسختين جنباً إلى جنب بغضّ النظر عن وضع الصفحة،
 * لأن الغرض المقارنة. أما في الاستخدام الحقيقي فـ NafLogo يختار تلقائياً.
 */

function Plate({
  title,
  className,
  children,
}: {
  title: string
  className: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
      <div
        className={`flex min-h-40 items-center justify-center gap-8 rounded-lg border border-border p-6 ${className}`}
      >
        {children}
      </div>
    </div>
  )
}

export function LogoSection() {
  return (
    <Section
      title="الشعار"
      description="خمس نسخ معتمدة. اختيار النسخة يتبع الوضع تلقائياً. الشعار لا يُقلب في الاتجاه من اليمين لليسار أبداً."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <Plate title="على خلفية فاتحة" className="bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/naf-logo.svg" alt="شعار ناف" className="h-24 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/naf-mark.svg" alt="رمز ناف" className="h-16 w-auto" />
        </Plate>

        <Plate title="على خلفية داكنة" className="bg-foreground">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/naf-logo-dark.svg" alt="شعار ناف" className="h-24 w-auto" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/naf-mark-dark.svg" alt="رمز ناف" className="h-16 w-auto" />
        </Plate>

        <Plate title="بلون واحد" className="bg-card">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/naf-logo-mono.svg" alt="شعار ناف" className="h-24 w-auto" />
        </Plate>

        <Plate title="يتبع الوضع تلقائياً" className="bg-background">
          <NafLogo className="h-24" />
          <NafLogo variant="mark" className="h-16" />
        </Plate>
      </div>
    </Section>
  )
}
