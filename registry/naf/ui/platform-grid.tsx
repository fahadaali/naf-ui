import * as React from "react"

import { cn } from "@/registry/naf/lib/utils"

// حاوية شبكة بطاقات المنصات.
//
// وجودها في السجلّ لا في المنصة مقصود رغم بساطتها: عدد الأعمدة عند كل عرض
// والفجوة بينها قرارٌ واحد يجب أن يتطابق أينما عُرضت الشبكة. تركُه لكل شاشة
// هو بالضبط كيف تفترق منصتان في تخطيط واحد.
//
// عمود واحد على الجوّال — البطاقة بشعارها ووصفها بسطرين لا تُقرأ في نصف
// عرض 375 بكسل.
//
// لا هوامش خارجية: المسافة حول الشبكة مسؤولية العنصر الأب.

export const PlatformGrid = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}
      {...props}
    />
  )
)
PlatformGrid.displayName = "PlatformGrid"
