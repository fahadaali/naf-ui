"use client"

import { Money } from "@/registry/naf/currency/money"
import { formatDualDate, formatPhone, formatTime } from "@/registry/naf/lib/format"

import { Section } from "./section"

/**
 * المبالغ خارج الجدول.
 * الرمز U+20C1 حصراً، والمبلغ داخل عنصر عزل اتجاهي،
 * وارتفاع الرمز يتبع ارتفاع النص في كل مقاس.
 */

const SIZES = [
  { className: "text-sm", token: "text-sm" },
  { className: "text-base", token: "text-base" },
  { className: "text-xl", token: "text-xl" },
  { className: "text-3xl", token: "text-3xl" },
]

const WEIGHTS = [
  { className: "font-normal", token: "400" },
  { className: "font-medium", token: "500" },
  { className: "font-semibold", token: "600" },
  { className: "font-bold", token: "700" },
]

const LEDGER = [
  { label: "أتعاب الاستشارة", value: 12400 },
  { label: "رسوم القيد", value: 900 },
  { label: "مصروفات الترجمة", value: 1237.5 },
  { label: "الإجمالي", value: 14537.5 },
]

const STAMP = "2026-07-26T14:30:00"

export function CurrencySection() {
  return (
    <Section
      title="المبالغ"
      description="رمز الريال U+20C1 بارتفاع النص، وفراغه ثلث ارتفاعه، واتجاهه يتبع اتجاه النص. المبلغ كاملاً معزول اتجاهياً بأرقام متساوية العرض."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">داخل جملة عربية</h3>
          <p className="max-w-prose text-base">
            بلغت أتعاب الاستشارة <Money value={12400} /> وتُسدَّد خلال ثلاثين يوماً من تاريخ
            الفاتورة.
          </p>
          <p className="max-w-prose text-base">
            رُصد مبلغ <Money value={1237.5} /> مصروفاتِ ترجمة معتمدة، ويُخصم من الدفعة الأولى.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">الارتفاع يتبع مقاس النص</h3>
          <div className="flex flex-col gap-3">
            {SIZES.map((size) => (
              <div key={size.token} className="flex flex-wrap items-baseline gap-3">
                <bdi className="font-mono text-sm text-muted-foreground">{size.token}</bdi>
                <span className={size.className}>
                  <Money value={12400} />
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">الوزن يتبع وزن النص</h3>
          <div className="flex flex-wrap items-baseline gap-6">
            {WEIGHTS.map((weight) => (
              <span key={weight.token} className={`text-xl ${weight.className}`}>
                <Money value={12400} />
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold">المحاذاة في عمود</h3>
            <div className="rounded-lg border border-border bg-card p-4">
              <dl className="flex flex-col gap-2">
                {LEDGER.map((row, index) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-6 ${
                      index === LEDGER.length - 1
                        ? "border-t border-border pt-2 font-semibold"
                        : ""
                    }`}
                  >
                    <dt className="text-base">{row.label}</dt>
                    <dd className="text-base">
                      <Money value={row.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-base font-semibold">البديل النصي</h3>
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-sm text-muted-foreground">الخط محمّل</span>
                <span className="text-base">
                  <Money value={12400} />
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-6">
                <span className="text-sm text-muted-foreground">تعذّر تحميل الخط</span>
                <bdi className="naf-money tabular-nums text-base">
                  12,400.00
                  <span className="naf-riyal-fallback">ر.س</span>
                </bdi>
              </div>
              <p className="text-sm text-muted-foreground">
                التبديل تلقائي. والمستندات المطبوعة وملفات PDF تبقى على «ر.س» دائماً.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">بقية التنسيقات من المكتبة نفسها</h3>
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">التاريخ المزدوج</dt>
              <dd className="text-base">
                <bdi>{formatDualDate(STAMP)}</bdi>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">الوقت</dt>
              <dd className="text-base">
                <bdi>{formatTime(STAMP)}</bdi>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">الجوال</dt>
              <dd className="text-base">
                <bdi>{formatPhone("0551234567")}</bdi>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  )
}
