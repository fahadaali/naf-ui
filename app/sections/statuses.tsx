import {
  Archive,
  CalendarClock,
  CircleCheck,
  CircleX,
  Clock,
  FilePen,
  Info,
  Send,
  TriangleAlert,
  UserCheck,
} from "lucide-react"

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
    icon: CircleCheck,
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
    icon: CircleX,
    surface: "bg-destructive text-destructive-foreground",
    subtle: "border-destructive/30 bg-destructive/10 text-destructive",
  },
]

/* دورة حياة المحتوى — تسع حالات.
   اللون يقول أي عائلة، والأيقونة والنص يقولان أيّها بالضبط. */
const LIFECYCLE = [
  { label: "مسودة", token: "muted-foreground", icon: FilePen },
  { label: "بانتظار المراجعة", token: "warning", icon: Clock },
  { label: "بانتظار الاعتماد", token: "warning", icon: UserCheck },
  { label: "معتمد", token: "success", icon: CircleCheck },
  { label: "مجدول", token: "info", icon: CalendarClock },
  { label: "متأخر", token: "destructive", icon: TriangleAlert },
  { label: "منشور", token: "success", icon: Send },
  { label: "مؤرشف", token: "muted-foreground", icon: Archive },
  { label: "مرفوض", token: "destructive", icon: CircleX },
]

const SOFT: Record<string, string> = {
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  info: "bg-info-soft text-info",
  destructive: "bg-destructive-soft text-destructive",
  "muted-foreground": "bg-muted text-muted-foreground",
}

function LifecycleBlock() {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">دورة حياة المحتوى</h3>
      <div className="flex flex-wrap gap-2">
        {LIFECYCLE.map((status) => {
          const Icon = status.icon
          return (
            <span
              key={status.label}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-sm font-medium ${SOFT[status.token]}`}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span>{status.label}</span>
            </span>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        اللون يتكرّر عمداً: «بانتظار المراجعة» و«بانتظار الاعتماد» كلاهما{" "}
        <bdi className="font-mono">warning</bdi>، و«معتمد» و«منشور» كلاهما{" "}
        <bdi className="font-mono">success</bdi>. اللون يقول أي عائلة، والأيقونة والنص
        يقولان أيّها بالضبط. لونٌ فريد لكل حالة يستنفد اللوحة ويصنع ألواناً بلا معنى.
      </p>
    </div>
  )
}

export function StatusesSection() {
  return (
    <Section
      title="الحالات"
      description="أربعة رموز حالة، وتسع حالات لدورة حياة المحتوى. لكل حالة أيقونة واحدة ثابتة في المنصات الخمس. لا تُوصَّل الحالة باللون وحده."
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
      <div className="mt-10">
        <LifecycleBlock />
      </div>
    </Section>
  )
}
