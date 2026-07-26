import { CheckCircle2, Clock, Info, XCircle } from "lucide-react"

import { Section } from "./section"

/**
 * ألوان الحالة الأربعة.
 * إلزامي: أيقونة ونص معاً. اللون وحده لا يوصل المعنى لكل المستخدمين.
 * الأيقونات من خريطة أيقونات ناف حرفياً.
 */

const STATUSES = [
  {
    label: "معتمد",
    token: "success",
    icon: CheckCircle2,
    surface: "bg-success text-success-foreground",
    subtle: "border-success/30 bg-success/10 text-success",
  },
  {
    label: "قيد المراجعة",
    token: "warning",
    icon: Clock,
    surface: "bg-warning text-warning-foreground",
    subtle: "border-warning/30 bg-warning/10 text-warning",
  },
  {
    label: "معلومة",
    token: "info",
    icon: Info,
    surface: "bg-info text-info-foreground",
    subtle: "border-info/30 bg-info/10 text-info",
  },
  {
    label: "مرفوض",
    token: "destructive",
    icon: XCircle,
    surface: "bg-destructive text-destructive-foreground",
    subtle: "border-destructive/30 bg-destructive/10 text-destructive",
  },
]

export function StatusesSection() {
  return (
    <Section
      title="الحالات"
      description="أربع حالات لكل منها رمز لون وأيقونة واحدة ثابتة في المنصات الخمس. لا تُوصَّل الحالة باللون وحده."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATUSES.map((status) => {
          const Icon = status.icon
          return (
            <div key={status.token} className="flex flex-col gap-3">
              <div
                className={`flex items-center gap-2 rounded-md p-4 text-base font-medium ${status.surface}`}
              >
                <Icon className="size-5 shrink-0" aria-hidden="true" />
                <span>{status.label}</span>
              </div>
              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-md border px-3 py-1 text-sm font-medium ${status.subtle}`}
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{status.label}</span>
              </span>
              <bdi className="font-mono text-sm text-muted-foreground">{status.token}</bdi>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
