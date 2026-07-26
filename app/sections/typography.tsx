import { Section } from "./section"

/**
 * سلّم الخطوط بنص عربي حقيقي من سياق قانوني.
 * ارتفاعات الأسطر لا تُخفَّض — العربية تحتاج مساحة رأسية أكثر من اللاتينية.
 */

const SIZES = [
  { className: "text-4xl", token: "text-4xl", sample: "مذكرة الدفاع" },
  { className: "text-3xl", token: "text-3xl", sample: "لائحة اعتراضية على الحكم الابتدائي" },
  { className: "text-2xl", token: "text-2xl", sample: "عقد تقديم خدمات استشارية" },
  { className: "text-xl", token: "text-xl", sample: "محضر جلسة المرافعة الأولى" },
  { className: "text-lg", token: "text-lg", sample: "اتفاقية عدم إفصاح بين الطرفين" },
  { className: "text-base", token: "text-base", sample: "تقرّر إحالة الملف إلى دائرة المرافعات." },
  { className: "text-sm", token: "text-sm", sample: "آخر تحديث على المسودة قبل الاعتماد." },
]

const WEIGHTS = [
  { className: "font-normal", token: "400", label: "عادي" },
  { className: "font-medium", token: "500", label: "متوسط" },
  { className: "font-semibold", token: "600", label: "شبه عريض" },
  { className: "font-bold", token: "700", label: "عريض" },
]

const BODY_COPY =
  "يلتزم الطرف الثاني بتقديم استشارة قانونية مكتوبة خلال خمسة أيام عمل من تاريخ استلام الطلب، على أن تتضمن الاستشارة بيان المركز القانوني للطرف الأول والمخاطر المحتملة والتوصية النهائية. وفي حال تعذّر الالتزام بالمدة، يُخطر الطرف الأول كتابةً قبل انقضائها بيوم عمل واحد على الأقل."

export function TypographySection() {
  return (
    <Section
      title="سلّم الخطوط"
      description="عائلة واحدة: IBM Plex Sans Arabic، بأربعة أوزان لا خامس لها. المقاسات من السلّم فقط."
    >
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">المقاسات</h3>
          <div className="flex flex-col gap-4">
            {SIZES.map((size) => (
              <div
                key={size.token}
                className="flex flex-col gap-1 border-b border-border pb-4 last:border-0"
              >
                <bdi className="font-mono text-sm text-muted-foreground">{size.token}</bdi>
                <p className={size.className}>{size.sample}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold">الأوزان</h3>
          <div className="flex flex-col gap-3">
            {WEIGHTS.map((weight) => (
              <div key={weight.token} className="flex flex-wrap items-baseline gap-3">
                <bdi className="font-mono text-sm text-muted-foreground">{weight.token}</bdi>
                <span className="text-sm text-muted-foreground">{weight.label}</span>
                <p className={`text-xl ${weight.className}`}>
                  هيئة كتّاب العدل — قسم التوثيق
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold">النص الطويل</h3>
          <p className="max-w-prose text-base">{BODY_COPY}</p>
          <p className="text-sm text-muted-foreground">
            عرض السطر مقيّد حتى لا يتجاوز المدى المريح للقراءة.
          </p>
        </div>
      </div>
    </Section>
  )
}
