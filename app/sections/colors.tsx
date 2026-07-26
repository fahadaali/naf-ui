import { Section } from "./section"

/**
 * لوحة الألوان كاملة.
 * الأسماء تُعرض كما هي في الثيم — رموز التوكن هي المرجع، والترجمة تُربك.
 * كل رمز داخل عنصر عزل اتجاهي لأنه لاتيني داخل نص عربي.
 */

type Swatch = {
  token: string
  surface: string
  text: string
  border?: boolean
}

const INTERFACE: Swatch[] = [
  { token: "background", surface: "bg-background", text: "text-foreground", border: true },
  { token: "foreground", surface: "bg-foreground", text: "text-background" },
  { token: "card", surface: "bg-card", text: "text-card-foreground", border: true },
  { token: "popover", surface: "bg-popover", text: "text-popover-foreground", border: true },
  { token: "muted", surface: "bg-muted", text: "text-muted-foreground", border: true },
  { token: "accent", surface: "bg-accent", text: "text-accent-foreground" },
  { token: "secondary", surface: "bg-secondary", text: "text-secondary-foreground" },
  { token: "primary", surface: "bg-primary", text: "text-primary-foreground" },
]

const STATUS: Swatch[] = [
  { token: "success", surface: "bg-success", text: "text-success-foreground" },
  { token: "warning", surface: "bg-warning", text: "text-warning-foreground" },
  { token: "info", surface: "bg-info", text: "text-info-foreground" },
  { token: "destructive", surface: "bg-destructive", text: "text-destructive-foreground" },
]

const LINES: Swatch[] = [
  { token: "border", surface: "bg-border", text: "text-foreground" },
  { token: "input", surface: "bg-input", text: "text-foreground", border: true },
  { token: "ring", surface: "bg-ring", text: "text-primary-foreground" },
]

const CHARTS: Swatch[] = [
  { token: "chart-1", surface: "bg-chart-1", text: "text-primary-foreground" },
  { token: "chart-2", surface: "bg-chart-2", text: "text-primary-foreground" },
  { token: "chart-3", surface: "bg-chart-3", text: "text-primary-foreground" },
  { token: "chart-4", surface: "bg-chart-4", text: "text-primary-foreground" },
  { token: "chart-5", surface: "bg-chart-5", text: "text-primary-foreground" },
]

const SIDEBAR: Swatch[] = [
  { token: "sidebar", surface: "bg-sidebar", text: "text-sidebar-foreground" },
  {
    token: "sidebar-primary",
    surface: "bg-sidebar-primary",
    text: "text-sidebar-primary-foreground",
  },
  {
    token: "sidebar-accent",
    surface: "bg-sidebar-accent",
    text: "text-sidebar-accent-foreground",
  },
  { token: "sidebar-border", surface: "bg-sidebar-border", text: "text-foreground" },
]

function SwatchGroup({ title, items }: { title: string; items: Swatch[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.token}
            className={[
              "flex h-20 items-end rounded-md p-3 shadow-xs",
              item.surface,
              item.text,
              item.border ? "border border-border" : "",
            ].join(" ")}
          >
            <bdi className="font-mono text-sm font-medium">{item.token}</bdi>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ColorsSection() {
  return (
    <Section
      title="لوحة الألوان"
      description="ألوان الواجهة كلها من رموز الثيم. لا قيمة لون مباشرة في أي مكوّن. جرّب الوضع الداكن — كل رمز هنا له قيمتان."
    >
      <div className="flex flex-col gap-8">
        <SwatchGroup title="أسطح الواجهة" items={INTERFACE} />
        <SwatchGroup title="الحالات" items={STATUS} />
        <SwatchGroup title="الحدود والتركيز" items={LINES} />
        <SwatchGroup title="الرسوم البيانية" items={CHARTS} />
        <SwatchGroup title="الشريط الجانبي" items={SIDEBAR} />
      </div>
    </Section>
  )
}
