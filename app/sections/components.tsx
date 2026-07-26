"use client"

import * as React from "react"
import {
  CircleCheck,
  CircleX,
  Clock,
  Info,
  Save,
  Trash2,
  TriangleAlert,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/registry/naf/ui/alert"
import { Button } from "@/registry/naf/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/naf/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/naf/ui/dialog"
import { Money } from "@/registry/naf/currency/money"
import { Input } from "@/registry/naf/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/naf/ui/table"

import { Section, StateColumn, StateGrid } from "./section"

/* حالتا التمرير والتركيز تُعرضان بتثبيت أصنافهما، وإلا لما ظهرتا في لقطة ثابتة.
   العنصر الأول في كل شبكة تفاعلي فعلاً — مرّر عليه وجرّب مفتاح التنقّل. */
const HOVER = "bg-primary/90"
const FOCUS = "ring-2 ring-ring ring-offset-2 ring-offset-background"

function ButtonBlock() {
  return (
    <div className="flex flex-col gap-6">
      <StateGrid>
        <StateColumn label="عادي">
          <Button>حفظ</Button>
        </StateColumn>
        <StateColumn label="تمرير">
          <Button className={HOVER}>حفظ</Button>
        </StateColumn>
        <StateColumn label="تركيز">
          <Button className={FOCUS}>حفظ</Button>
        </StateColumn>
        <StateColumn label="معطّل">
          <Button disabled>حفظ</Button>
        </StateColumn>
      </StateGrid>

      <div className="flex flex-wrap items-center gap-3">
        <Button>
          <Save aria-hidden="true" />
          حفظ
        </Button>
        <Button variant="secondary">تعديل</Button>
        <Button variant="outline">إلغاء</Button>
        <Button variant="ghost">رجوع</Button>
        <Button variant="destructive">
          <Trash2 aria-hidden="true" />
          حذف
        </Button>
        <Button variant="link">عرض سجلّ النشاط</Button>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <Button size="sm">إرسال</Button>
        <Button size="md">إرسال</Button>
        <Button size="lg">إرسال</Button>
      </div>
    </div>
  )
}

function InputBlock() {
  return (
    <div className="flex flex-col gap-6">
      <StateGrid>
        <StateColumn label="عادي">
          <Input placeholder="اسم العميل" aria-label="اسم العميل" />
        </StateColumn>
        <StateColumn label="تمرير">
          <Input placeholder="اسم العميل" aria-label="اسم العميل" className="border-ring" />
        </StateColumn>
        <StateColumn label="تركيز">
          <Input placeholder="اسم العميل" aria-label="اسم العميل" className={FOCUS} />
        </StateColumn>
        <StateColumn label="معطّل">
          <Input placeholder="اسم العميل" aria-label="اسم العميل" disabled />
        </StateColumn>
      </StateGrid>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="naf-matter" className="text-sm font-medium">
            رقم الملف
          </label>
          <Input id="naf-matter" defaultValue="NAF-2026-0147" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="naf-email" className="text-sm font-medium">
            البريد الإلكتروني
          </label>
          <Input
            id="naf-email"
            type="email"
            defaultValue="majed"
            aria-invalid
            aria-describedby="naf-email-error"
          />
          <p id="naf-email-error" className="flex items-center gap-1.5 text-sm text-destructive">
            <CircleX className="size-4 shrink-0" aria-hidden="true" />
            أدخل بريداً إلكترونياً صحيحاً
          </p>
        </div>
      </div>
    </div>
  )
}

function ClientCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>مؤسسة الرياض للمقاولات</CardTitle>
        <CardDescription>
          استشارة — مراجعة عقد توريد. آخر تحديث <bdi>2026/07/22</bdi>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        ثلاثة ملفات مفتوحة، وفاتورة واحدة قيد المراجعة.
      </CardContent>
      <CardFooter>
        <Button size="sm">فتح الملف</Button>
        <Button size="sm" variant="outline">
          إضافة مرفق
        </Button>
      </CardFooter>
    </Card>
  )
}

function CardBlock() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <ClientCard />
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            بطاقة قابلة للتحديد — عادي وتمرير وتركيز ومعطّل
          </span>
          <div className="grid gap-3">
            <button
              type="button"
              className="rounded-lg border border-border bg-card p-4 text-start text-base transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              قضية رقم <bdi>1447/ت/2291</bdi>
            </button>
            <div className="rounded-lg border border-border bg-accent p-4 text-base text-accent-foreground">
              قضية رقم <bdi>1447/ت/2292</bdi>
            </div>
            <div className={`rounded-lg border border-border bg-card p-4 text-base ${FOCUS}`}>
              قضية رقم <bdi>1447/ت/2293</bdi>
            </div>
            <div className="rounded-lg border border-border bg-card p-4 text-base opacity-50">
              قضية رقم <bdi>1447/ت/2294</bdi>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DialogBlock() {
  return (
    <div className="flex flex-col gap-6">
      <StateGrid>
        <StateColumn label="عادي">
          <DeleteDialog />
        </StateColumn>
        <StateColumn label="تمرير">
          <Button variant="destructive" className="bg-destructive/90">
            حذف
          </Button>
        </StateColumn>
        <StateColumn label="تركيز">
          <Button variant="destructive" className={FOCUS}>
            حذف
          </Button>
        </StateColumn>
        <StateColumn label="معطّل">
          <Button variant="destructive" disabled>
            حذف
          </Button>
        </StateColumn>
      </StateGrid>
      <p className="text-sm text-muted-foreground">
        اضغط «حذف» لفتح النافذة. زر التأكيد يحمل اسم الفعل لا «نعم».
      </p>
    </div>
  )
}

function DeleteDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 aria-hidden="true" />
          حذف
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>حذف العميل</DialogTitle>
          <DialogDescription>
            سيُحذف العميل وكل ملفاته المرتبطة. لا يمكن التراجع عن هذا.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive">حذف</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function AlertBlock() {
  return (
    <div className="flex flex-col gap-4">
      <Alert variant="success">
        <CircleCheck aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <AlertTitle>تم اعتماد المستند</AlertTitle>
          <AlertDescription>
            اعتُمدت المذكرة بتاريخ <bdi>2026/07/26</bdi> الساعة <bdi>14:30</bdi>.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="warning">
        <Clock aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <AlertTitle>قيد المراجعة</AlertTitle>
          <AlertDescription>
            لدى الشريك المراجع ثلاث لوائح معلّقة قبل موعد الجلسة.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="info">
        <Info aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <AlertTitle>جلسة قادمة</AlertTitle>
          <AlertDescription>
            جلسة المرافعة يوم <bdi>2026/08/03</bdi> الساعة <bdi>09:00</bdi> — الدائرة التجارية الرابعة.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="destructive">
        <TriangleAlert aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <AlertTitle>تعذّر رفع المرفق</AlertTitle>
          <AlertDescription>
            صيغة الملف غير مدعومة. الصيغ المقبولة: <bdi>PDF</bdi> و <bdi>DOCX</bdi>
          </AlertDescription>
        </div>
      </Alert>
    </div>
  )
}

const INVOICES = [
  {
    id: "INV-2026-0311",
    client: "مؤسسة الرياض للمقاولات",
    date: "2026/07/12",
    amount: 12400,
    status: "معتمد",
    icon: CircleCheck,
    tone: "text-success",
  },
  {
    id: "INV-2026-0312",
    client: "شركة نجد للتقنية",
    date: "2026/07/18",
    amount: 8750,
    status: "قيد المراجعة",
    icon: Clock,
    tone: "text-warning",
  },
  {
    id: "INV-2026-0313",
    client: "الأحمد وشركاه",
    date: "2026/07/21",
    amount: 23900,
    status: "مرفوض",
    icon: CircleX,
    tone: "text-destructive",
  },
  {
    id: "INV-2026-0314",
    client: "مجموعة الخليج الطبية",
    date: "2026/07/24",
    amount: 5200,
    status: "معلّق",
    icon: Info,
    tone: "text-info",
  },
]

function TableBlock() {
  return (
    <div className="flex flex-col gap-4">
      <Table>
        <TableCaption>فواتير الربع الثالث — تُعرض الأرقام بخانات متساوية العرض لتتحاذى الأعمدة.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>رقم الفاتورة</TableHead>
            <TableHead>العميل</TableHead>
            <TableHead>التاريخ</TableHead>
            <TableHead>المبلغ</TableHead>
            <TableHead>الحالة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((invoice, index) => {
            const Icon = invoice.icon
            const isDisabled = index === 3
            return (
              <TableRow
                key={invoice.id}
                tabIndex={isDisabled ? -1 : 0}
                aria-disabled={isDisabled || undefined}
                className={[
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                  index === 1 ? "bg-muted/50" : "",
                  isDisabled ? "opacity-50" : "",
                ].join(" ")}
              >
                <TableCell className="font-medium">
                  <bdi>{invoice.id}</bdi>
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>
                  <bdi>{invoice.date}</bdi>
                </TableCell>
                <TableCell>
                  <Money value={invoice.amount} />
                </TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1.5 font-medium ${invoice.tone}`}>
                    <Icon className="size-4 shrink-0" aria-hidden="true" />
                    {invoice.status}
                  </span>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <p className="text-sm text-muted-foreground">
        الصف الأول عادي، والثاني بحالة تمرير مثبّتة، والرابع معطّل. انتقل بمفتاح التنقّل لرؤية حالة التركيز.
      </p>
    </div>
  )
}

const BLOCKS = [
  { title: "الزر", node: <ButtonBlock /> },
  { title: "الحقل", node: <InputBlock /> },
  { title: "البطاقة", node: <CardBlock /> },
  { title: "النافذة المنبثقة", node: <DialogBlock /> },
  { title: "التنبيه", node: <AlertBlock /> },
  { title: "الجدول", node: <TableBlock /> },
]

export function ComponentsSection() {
  return (
    <Section
      title="المكوّنات"
      description="ستة مكوّنات معتمدة. كلها بخصائص اتجاهية منطقية، وحلقة تركيز ظاهرة، وثلاثة ارتفاعات لا رابع لها."
    >
      <div className="flex flex-col gap-12">
        {BLOCKS.map((block) => (
          <div key={block.title} className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">{block.title}</h3>
            {block.node}
          </div>
        ))}
      </div>
    </Section>
  )
}
