import * as React from "react"
import { CalendarX, CircleSlash } from "lucide-react"

import { cn } from "@/registry/naf/lib/utils"
import { Badge } from "@/registry/naf/ui/badge"
import { Button } from "@/registry/naf/ui/button"

// بطاقة منصة في شبكة مركز الهوية.
//
// أربع حالات ظاهرة. والخامسة — المخفية — ليست حالةً هنا: البطاقة لا تُبنى
// أصلاً، فلا يُلمَّح إلى وجود المنصة.
//
// تفريق تحمله الحالات ولا يُلغى: تعليق المنصة يعمّ الجميع فتُبهت البطاقة
// وتحمل شارة، أمّا حرمان المستخدم أو انتهاء وصوله فالبطاقة فيه كاملة والزرّ
// وحده معطّل — وإلا ظنّ القارئ أن المنصة متوقّفة وهي تعمل لغيره.
//
// المصطلحات من naf-terms.md والأيقونات من naf-icons.md.

export type PlatformCardState = "available" | "suspended" | "no-access" | "expired"

/** التدرّجات المعتمدة. تُستهلك في مُنتقي لوحة الآدمن — لا منتقي ألوان حر. */
export const PLATFORM_GRADIENTS = ["grad-1", "grad-2", "grad-3", "grad-4", "grad-5"] as const
export type PlatformGradient = (typeof PLATFORM_GRADIENTS)[number]

const GRADIENT_CLASS: Record<PlatformGradient, string> = {
  "grad-1": "naf-grad-1",
  "grad-2": "naf-grad-2",
  "grad-3": "naf-grad-3",
  "grad-4": "naf-grad-4",
  "grad-5": "naf-grad-5",
}

const TERMS = {
  enter: "دخول",
  disabled: "معطّلة",
  noAccess: "لا تملك صلاحية الوصول لهذه المنصة",
  expired: "انتهت صلاحية وصولك",
}

/** أول حرفين من الاسم، بديلاً عن الشعار الغائب في الحاوية نفسها. */
function initials(name: string): string {
  return Array.from(name.trim()).slice(0, 2).join("")
}

export interface PlatformCardProps extends React.HTMLAttributes<HTMLDivElement> {
  nameAr: string
  description?: string | null
  logoUrl?: string | null
  gradToken: string
  state: PlatformCardState
  /** سبب التعليق أو سبب الحرمان، كما كتبه مسؤول النظام. يُعرض كما هو. */
  note?: string | null
  /** وجهة الزرّ حين تكون المنصة متاحة — /go/:platformId */
  href: string
}

export const PlatformCard = React.forwardRef<HTMLDivElement, PlatformCardProps>(
  ({ nameAr, description, logoUrl, gradToken, state, note, href, className, ...props }, ref) => {
    const gradientClass =
      GRADIENT_CLASS[gradToken as PlatformGradient] ?? GRADIENT_CLASS["grad-1"]
    const suspended = state === "suspended"
    const available = state === "available"

    // النصّ المعروض تحت الزرّ: سبب مكتوب إن وُجد، وإلا النصّ المسجّل للحالة.
    const reason = suspended
      ? note
      : state === "no-access"
        ? (note ?? TERMS.noAccess)
        : state === "expired"
          ? TERMS.expired
          : null

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col overflow-hidden rounded-lg border border-border bg-card text-start shadow-sm",
          // الإبهات للمنصة المعطّلة وحدها — لا لحرمان قارئ بعينه.
          suspended && "opacity-60",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center p-6 text-surface-deep-foreground",
            gradientClass
          )}
        >
          {logoUrl ? (
            <img src={logoUrl} alt="" className="size-16 object-contain" />
          ) : (
            <span aria-hidden="true" className="text-3xl font-semibold">
              {initials(nameAr)}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-foreground">{nameAr}</h3>
            {/* الشارة الافتراضية محايدة اللون، وهي المطابقة لـmuted-foreground
                المسجّل لحالة «معطّل». والأيقونة معها إلزاماً لا زخرفة. */}
            {suspended ? (
              <Badge className="shrink-0">
                <CircleSlash aria-hidden="true" />
                {TERMS.disabled}
              </Badge>
            ) : null}
          </div>

          {/* سطران بارتفاع ثابت حتى تتساوى البطاقات مهما اختلفت الأوصاف. */}
          <p className="line-clamp-2 min-h-12 text-sm text-muted-foreground">{description ?? ""}</p>

          {available ? (
            <Button asChild className="w-full">
              <a href={href}>{TERMS.enter}</a>
            </Button>
          ) : (
            <Button disabled className="w-full">
              {TERMS.enter}
            </Button>
          )}

          {reason ? (
            <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
              {state === "expired" ? (
                <CalendarX aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              ) : null}
              <span>{reason}</span>
            </p>
          ) : null}
        </div>
      </div>
    )
  }
)
PlatformCard.displayName = "PlatformCard"
