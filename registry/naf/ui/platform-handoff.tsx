import * as React from "react"
import { LoaderCircle } from "lucide-react"

import { cn } from "@/registry/naf/lib/utils"

// طبقة الانتقال إلى المنصة — تغطّي شبكة المنصات من ضغط «دخول» إلى أن
// تفتح المنصةُ صفحتَها.
//
// لماذا توجد: الدخول تحويلةٌ إلى نظامٍ آخر تمرّ بـ‎/go/:id‎ ثم بمبادلة رمز
// عبور عند المنصة، وهي تأخذ وقتاً محسوساً. وبلا طبقةٍ يبقى القارئ أمام
// شبكةٍ لا تتحرّك فيضغط الزرّ ثانيةً. فالطبقة تقول إن الضغطة وصلت، وتملأ
// انتظاراً قائماً أصلاً — لا تصنعه.
//
// وهي عرضٌ لا حراسة: الرفض الحقيقي عند ‎/go/:platformId‎ كما في بطاقة
// المنصة. من عطّل التنفيذ يرى تحويلةً بلا طبقة، وهذا هو المطلوب.
//
// المصطلحات من naf-terms.md §١٠ «طبقة الانتقال إلى المنصة»، والحركة من
// app/naf-platform-handoff.css، والتدرّجات من app/naf-platform-card.css.

const TERMS = {
  enteringTo: "جارٍ الدخول إلى",
}

/** التدرّجات المعتمدة — الخمسة نفسها التي تحملها بطاقة المنصة. */
const GRADIENT_CLASS: Record<string, string> = {
  "grad-1": "naf-grad-1",
  "grad-2": "naf-grad-2",
  "grad-3": "naf-grad-3",
  "grad-4": "naf-grad-4",
  "grad-5": "naf-grad-5",
}

/** أول حرفين من الاسم، بديلاً عن الشعار الغائب — كما في البطاقة. */
function initials(name: string): string {
  return Array.from(name.trim()).slice(0, 2).join("")
}

export interface PlatformHandoffProps extends React.HTMLAttributes<HTMLDivElement> {
  /** اسم المنصة المقصودة كما يُعرض. يأتي من `name_ar` فيُعزل اتجاهياً. */
  nameAr: string
  /**
   * العبارة المنتقاة من `pickPhrase`. تُمرَّر ولا تُنتقى هنا: انتقاءٌ داخل
   * المكوّن يُعيد الانتقاء مع كل إعادة رسم، فتتبدّل العبارة تحت عين القارئ.
   */
  phrase?: string | null
  logoUrl?: string | null
  gradToken?: string | null
}

export const PlatformHandoff = React.forwardRef<HTMLDivElement, PlatformHandoffProps>(
  ({ nameAr, phrase, logoUrl, gradToken, className, ...props }, ref) => {
    const gradientClass = GRADIENT_CLASS[gradToken ?? ""] ?? GRADIENT_CLASS["grad-1"]

    return (
      <div
        ref={ref}
        /* `alertdialog` لا `dialog`: لا خيار فيها ولا إغلاق — إعلانٌ بأن
           انتقالاً يجري. و`aria-live` معها فينطقها قارئ الشاشة عند ظهورها
           دون أن ينقل إليها البؤرة، والبؤرة في طريقها إلى صفحة أخرى. */
        role="alertdialog"
        aria-live="assertive"
        aria-busy="true"
        aria-label={`${TERMS.enteringTo} ${nameAr}`}
        className={cn(
          "naf-handoff-veil fixed inset-0 z-50 flex items-center justify-center p-4",
          "bg-overlay backdrop-blur-sm",
          className
        )}
        {...props}
      >
        {/* بطاقةٌ عائمة على حجابٍ داكن، فظلّها ‎--shadow-elevated‎ لا سلّم
            الظلال العادي — القاعدة في CLAUDE.md §٦. والنصّ عليها
            ‎text-foreground‎ فوق ‎bg-card‎: زوجٌ مضمون في الوضعين، بخلاف
            نصٍّ أبيض يوضع على الحجاب نفسه وتحته صفحةٌ فاتحة. */}
        <div className="naf-handoff-rise flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl bg-card p-8 text-center shadow-elevated">
          {/* رقعة المنصة المقصودة بتدرّجها وشعارها — الصورةُ نفسها التي
              ضغطها القارئ قبل لحظة، فيرى أنه ذاهبٌ إلى ما قصد. */}
          <span
            aria-hidden="true"
            className={cn(
              "naf-handoff-breath flex size-20 shrink-0 items-center justify-center rounded-xl",
              gradientClass,
              "text-surface-deep-foreground"
            )}
          >
            {logoUrl ? (
              <img src={logoUrl} alt="" className="size-12 object-contain" />
            ) : (
              <span className="text-2xl font-semibold">{initials(nameAr)}</span>
            )}
          </span>

          {/* الاسم قد يأتي لاتينياً أو يحمل رقماً فيقلب ترتيب الجملة
              حوله — يُعزل بـ<bdi>، قاعدة §٥ من naf-terms.md. */}
          <p className="text-lg font-semibold text-foreground">
            {TERMS.enteringTo} <bdi>{nameAr}</bdi>
          </p>

          {/* العبارة زينةُ انتظار لا تحمل معنى تشغيلياً، والطبقة تُقرأ
              تامّةً بحذفها — فهي `aria-hidden`. قارئٌ ينتظر انتقالاً لا
              يحتاج حكمةً تُملى عليه، والمنطوق هو `aria-label` أعلاه. */}
          {phrase ? (
            <p
              aria-hidden="true"
              className="naf-handoff-rise-late max-w-prose text-balance text-base text-muted-foreground"
            >
              {phrase}
            </p>
          ) : null}

          {/* مؤشّر انتظار لا أيقونةَ حالة — النمط المسجَّل في naf-icons.md
              للخطوة الجارية. ولا يُقلب في الاتجاه.
              وهو `aria-hidden` ولا نصَّ تحته: السطر المرئيّ فوقه يقول
              الحالة نصاً كاملاً، فالحلقة لا تحمل معنى وحدها ولا تحتاج
              بديلاً — والقاعدة تمنع حمل المعنى بالشكل وحده لا تُوجب
              تكرار النصّ تحت كل شكل. */}
          <LoaderCircle
            aria-hidden="true"
            className="naf-handoff-spin size-5 text-muted-foreground"
          />
        </div>
      </div>
    )
  }
)
PlatformHandoff.displayName = "PlatformHandoff"
