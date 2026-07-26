import * as React from "react"

import { cn } from "@/registry/naf/lib/utils"

export function Section({
  title,
  description,
  children,
  className,
}: {
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={cn("flex flex-col gap-6 border-t border-border pt-10", className)}>
      <header className="flex flex-col gap-1.5">
        <h2 className="text-2xl font-bold">{title}</h2>
        {description ? (
          <p className="max-w-prose text-base text-muted-foreground">{description}</p>
        ) : null}
      </header>
      {children}
    </section>
  )
}

/** الحالات الأربع المعتمدة لعرض أي مكوّن تفاعلي. */
export const STATE_LABELS = ["عادي", "تمرير", "تركيز", "معطّل"] as const

export function StateColumn({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

export function StateGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">{children}</div>
  )
}
