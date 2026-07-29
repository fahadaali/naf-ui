import * as React from "react"
import { ExternalLink } from "lucide-react"

import { cn } from "@/registry/naf/lib/utils"
import { Button } from "@/registry/naf/ui/button"

// بطاقة أداة خارجية — بطاقة عرضية تحت شبكة المنصات في مركز الهوية.
//
// ليست بطاقةَ منصة ولا تُبنى منها: منصات ناف تُدخَل بهوية موحّدة عبر
// ‎/go/:id‎ فزرّها «دخول» وحالتها تأتي من الخادم، وهذه أداةٌ يملكها طرفٌ
// آخر يُنتقل إليها برابط مباشر — لا هوية موحّدة، ولا حالات أربع، ولا
// شارة. جمعهما في عنصر واحد يعني حقولاً معطّلة في كل استعمال.
//
// والفرق يُقرأ من الشكل قبل النصّ: عرضٌ كامل تحت الشبكة لا بطاقةً في
// صفّها، وتدرّجٌ ‎--grad-external‎ خارج تدرّجات المنصات الخمسة.
//
// المصطلحات من naf-terms.md والأيقونات من naf-icons.md.

const TERMS = {
  go: "انتقال",
}

export interface ExternalToolCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** اسم الأداة كما هو مسجَّل في naf-terms.md. */
  nameAr: string
  /** سطرٌ واحد يقول ما هي. */
  description?: string | null
  /** الوجهة — رابط مباشر إلى الأداة. */
  href: string
  /** شعار الأداة من naf-brand-marks، داخل رقعة لونها لون العلامة. */
  mark?: React.ReactNode
}

export const ExternalToolCard = React.forwardRef<HTMLDivElement, ExternalToolCardProps>(
  ({ nameAr, description, href, mark, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        /* عمودٌ على الجوّال وصفٌّ من ‎sm‎ فصاعداً: الشعار والاسم والوصف
           والزرّ في سطر واحد لا يُقرأ عند 375 بكسل. */
        "flex flex-col gap-4 rounded-lg p-5 text-start shadow-sm",
        "naf-grad-external text-surface-deep-foreground",
        "sm:flex-row sm:items-center",
        className
      )}
      {...props}
    >
      {mark ? (
        /* رقعة العلامة: خلفيتها لون العلامة ومقدّمتها ‎--brand-on-color‎ —
           القاعدة المسجّلة لشعارات الأطراف الأخرى، ولا تُلوَّن بالثيم. */
        <span
          aria-hidden="true"
          className="flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-basecamp text-brand-on-color"
        >
          {mark}
        </span>
      ) : null}

      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold">{nameAr}</h3>
        {description ? (
          <p className="text-sm text-surface-deep-muted">{description}</p>
        ) : null}
      </div>

      {/* الزرّ في نهاية السطر — يسارُ الشاشة في RTL ويمينُها في LTR، بلا
          خاصية اتجاه فيزيائية: ترتيبُه آخرَ العناصر هو ما يضعه هناك.
          ويفتح في لسان جديد لأن الوجهة خارج النظام، ومعه ‎rel‎ يقطع وصول
          الصفحة الجديدة إلى ‎window.opener‎. */}
      <Button asChild className="w-full shrink-0 sm:w-auto">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <ExternalLink aria-hidden="true" />
          {TERMS.go}
        </a>
      </Button>
    </div>
  )
)
ExternalToolCard.displayName = "ExternalToolCard"
