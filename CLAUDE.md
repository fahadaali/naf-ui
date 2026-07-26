# NAF UI Rules

Place at the root of every NAF repository — the five platforms and `naf-ui` itself.
These are constraints, not suggestions. Five codebases drifted apart; this file is what stops it happening again.

Registry address: `fahadaali/naf-ui`
Pin to a release: `fahadaali/naf-ui/button#v1.0.0`

---

## 1. The one rule

**Never write a raw design value.** No hex codes, no `rgb()`, no arbitrary pixel spacing, no font stacks, no ad-hoc radii, no inline shadows.

```jsx
// rejected
<div style={{ background: '#1B4B5A', padding: '13px' }}>
<div className="bg-[#1B4B5A] p-[13px] text-[15px]">

// correct
<div className="bg-primary p-4 rounded-md">
```

If a value you need does not exist in the token set, **stop and ask**. Adding a token is a deliberate decision made once in `naf-ui`, never per-component.

---

## 2. RTL is the default

All five platforms serve Arabic first. Physical direction properties will break every layout.

| Never | Always |
|---|---|
| `ml-*` `mr-*` | `ms-*` `me-*` |
| `pl-*` `pr-*` | `ps-*` `pe-*` |
| `left-*` `right-*` | `start-*` `end-*` |
| `text-left` `text-right` | `text-start` `text-end` |
| `border-l` `border-r` | `border-s` `border-e` |
| `rounded-l-*` `rounded-r-*` | `rounded-s-*` `rounded-e-*` |
| `float-left` `float-right` | `float-start` `float-end` |

In plain CSS use `margin-inline-start`, `padding-inline-end`, `inset-inline-start`, `border-inline-start`.

**Mixed-direction content.** Any string mixing Arabic with digits, Latin words, phone numbers, IBANs, currency, dates or filenames must be isolated, or Arabic reorders it:

```jsx
<span>المبلغ <bdi>12,400.00</bdi> ريال</span>
<span>الملف <bdi>report.pdf</bdi> جاهز</span>
```

**Icon mirroring.** Mirror: arrows, chevrons, back, forward, send, reply, indent.
Do not mirror: logos, brand marks, clocks, checkmarks, search, user, media play, photographs.

---

## 3. Components

- **Never rebuild what exists in the registry.** Check `naf-ui` first, every time.
- A new shared component is a decision. If a screen needs something new, ask before adding it.
- Components accept `className` and forward refs. They never hardcode outer margins — spacing belongs to the parent.
- Every interactive element needs a visible `:focus-visible` state. Do not remove it with `outline-none` without an equally visible replacement.
- Three control heights only: `sm`, `md`, `lg`. `md` is the default. No other height exists.

---

## 4. Typography

- One family. Never import another font anywhere.
- Weights 400, 500, 600, 700 only.
- Sizes from the scale. Never `text-[15px]`.
- **Do not reduce line heights.** The scale is deliberately taller than a Latin-only scale because Arabic needs vertical room for ascenders, descenders and diacritics.
- Long-form body copy gets a capped measure.

---

## 5. Colour

Semantic tokens for interface, palette steps for decoration only:

```
bg-background  bg-card  bg-muted
text-foreground  text-muted-foreground
border-border
bg-primary  text-primary-foreground  hover:bg-primary/90
```

- Accent is emphasis, not decoration. More than one accent element visible at once means one is wrong.
- Never communicate meaning by colour alone — pair status colours with an icon or label.
- Light and dark must both work. Test both.

---

## 6. Copy

All user-facing text comes from the NAF terminology file in the registry. Never invent a label.

- Buttons use the verbal noun: حفظ not احفظ
- Errors state what happened and what to do. They do not apologise.
- Empty states invite action. Never "لا توجد بيانات".
- Success messages name the action: تم الحفظ, تم الإرسال.
- The button that says نشر produces تم النشر, not تم الحفظ.

If a term is missing, add it to `naf-ui` first. Do not coin one locally.

---

## 7. Numbers, dates, money

Use the shared formatting library. Never format inline.

- Western digits always
- Currency: `12,400.00 ر.س`
- Time: 24-hour
- Every number, date and amount wrapped in a direction-isolating element
- Table numerals tabular so columns align

---

## 8. Definition of done

Before reporting any UI work complete:

1. Search the diff for raw values — no `#`, no `rgb(`, no arbitrary bracket values
2. Search the diff for `ml-|mr-|pl-|pr-|text-left|text-right|left-|right-` — must return nothing
3. Render in both `dir="rtl"` and `dir="ltr"`
4. Render in both light and dark
5. Tab through the screen — focus visible at every stop
6. Check at 375px width
7. Confirm every visible string exists in the terminology file

**State which of these you actually verified. Never claim a check you did not run.**

---

## 9. Working style

- One platform per session. Never two repos in one task.
- Migrations run in reviewable batches: propose the mapping table, get approval, then apply.
- Commit per batch so any batch can be reverted alone.
- Never delete a file.
- Never edit an original asset — copy it and edit the copy.
- When something is ambiguous, ask. Do not guess, do not proceed on an assumption.
- Prefer boring, obvious code. Six codebases, many maintainers.
