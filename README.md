# Formations Proposal — Next.js + Tailwind Implementation

> **Source:** Figma file `FYuN5ddOHMKW47ecSpOFmQ` — Formations Proposal
> **Stack:** Next.js 14+ (App Router), Tailwind CSS, TypeScript
> **Design System:** Formations tokens (Gilroy font, purple/green palette)

---

## File Structure

```
formations-build/
├── README.md                           ← You are here
├── tailwind.config.formations.ts       ← Extended Tailwind config with all Formations tokens
├── globals.formations.css              ← Global CSS: @font-face, tokens, component layer
├── components/
│   └── formations-ui.tsx               ← Shared UI primitives (Header, CTA, CheckItem, etc.)
├── pages/
│   ├── BankUpsellOptimized.tsx         ← Desktop bank upsell (Novo partner card)
│   ├── BankUpsellMobile.tsx            ← Mobile bank upsell with sticky CTA
│   ├── AcceptPaymentPrompt.tsx         ← Credit card acceptance question flow
│   └── TaskDashboard.tsx               ← Full checklist dashboard with sidebar nav
└── public/
    ├── logos/
    │   ├── formations-logo.svg         ← Formations brandmark
    │   └── forbes-advisor.svg          ← Forbes Advisor co-brand
    ├── partners/
    │   └── novo-logo.png               ← Novo bank logo
    └── fonts/
        ├── Gilroy-Light.woff2
        ├── Gilroy-Regular.woff2
        ├── Gilroy-Medium.woff2
        ├── Gilroy-Semibold.woff2
        ├── Gilroy-Bold.woff2
        └── EuclidCircularB-Regular.woff2
```

---

## Quick Setup

### 1. Merge Tailwind Config

Copy the `theme.extend` values from `tailwind.config.formations.ts` into your project's existing `tailwind.config.ts`. Key additions:

- **Colors:** `primary`, `secondary`, `tertiary`, `quaternary`, `neutral` + semantic aliases
- **Font families:** `gilroy`, `euclid`
- **Spacing:** `2xs` through `4xl` (Formations scale)
- **Border radius:** `xs` through `xl`
- **Shadows:** `card`, `header`, `button`, `input`
- **Typography:** `heading-lg` through `body-xs`
- **Breakpoints:** `mobile: 390px`, `tablet: 744px`, `desktop: 1440px`

### 2. Add Global CSS

Merge `globals.formations.css` into your `globals.css`:
- `@font-face` declarations for Gilroy (5 weights) and Euclid Circular B
- CSS custom properties under `@layer base`
- Component classes under `@layer components` (`.btn-primary`, `.card-partner`, etc.)

### 3. Load Fonts

Place Gilroy and Euclid Circular B `.woff2` files in `public/fonts/`. If using `next/font` instead:

```tsx
import localFont from 'next/font/local';

const gilroy = localFont({
  src: [
    { path: '../public/fonts/Gilroy-Light.woff2', weight: '300' },
    { path: '../public/fonts/Gilroy-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Gilroy-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Gilroy-Semibold.woff2', weight: '600' },
    { path: '../public/fonts/Gilroy-Bold.woff2', weight: '700' },
  ],
  variable: '--font-gilroy',
});
```

### 4. Add Logos & Assets

Export logos from Figma and place in `public/logos/` and `public/partners/`.

---

## Page Reference

### 🏦 Bank Upsell (Optimized) — `BankUpsellOptimized.tsx`
**Figma node:** `1:1842` | **Viewport:** 1440px desktop

Key features:
- Formations + Forbes Advisor co-branded header
- "Next Up — Let's Separate {companyName}'s Finances" dynamic title
- Info banner with lightbulb icon (slate background `#F1F5F9`)
- Novo partner card with green "APPLY ONLINE IN A FEW MINUTES" banner
- Bonus callout: green tint `#F1FFFC` background
- 6-item benefits checklist with green check-circle icons
- Purple CTA button (`#4817C2`, rounded-lg, h-14)
- Social proof row with overlapping avatar circles
- "No, thanks" ghost button with shadow
- Footnote disclaimers

**Props:** `companyName: string`

---

### 📱 Bank Upsell (Mobile) — `BankUpsellMobile.tsx`
**Figma node:** `1:229` | **Viewport:** 375px mobile

Same content as desktop with:
- Compact mobile header
- "Preferred Partner" badge on Novo card
- Info tip bar at card bottom ("Complete your Novo application...")
- **Sticky CTA footer** fixed at bottom with "Learn More" + "No, thanks"
- Different title: includes "With a Business Bank Account"

**Props:** `companyName: string`

---

### 💳 Accept Payment Prompt — `AcceptPaymentPrompt.tsx`
**Figma nodes:** `1:2422` (desktop), `1:2557` (mobile) | **Responsive**

Simple question flow:
- Credit card check icon
- "Will {companyName} be accepting credit card payments?"
- Two selectable card options (radio-card pattern)
- Selected state: `border-primary-500`
- Default state: `border-outline`
- Shadow: `0px 1px 4.3px rgba(0,0,0,0.1)`
- Purple CTA button
- Back navigation
- Mobile: sticky CTA at bottom

**Props:** `companyName: string`, `onBack: () => void`, `onSubmit: (accepts: boolean) => void`

---

### 📋 Task Dashboard — `TaskDashboard.tsx`
**Figma node:** `1:675` | **Viewport:** 1440px desktop

Full dashboard with:
- **Sidebar nav:** 68px wide, 4 icons (Home, Documents, Certificates, Business)
- **Company header:** Name, registration status, order number, EIN, card last-4
- **Progress bar:** Yellow badge with percentage, green progress fill
- **11 checklist tasks** with states:
  - `available` — numbered, with "Go To Task" arrow
  - `locked` — lock icon, "Available After State Approval"
  - `completed` — green check circle, sometimes with partner notes
- **Category badges:** Color-coded by type (Licensing=purple, Compliance=gray, Risk=red, Payment=green, Financial=amber, Marketing=rose)
- **Partner notes:** Green `bg-secondary-500` text bars for MerchantOne, Paychex

**Props:** `companyName: string`

---

## Design Token Quick Reference

| Token | Value | Usage |
|---|---|---|
| `primary-500` | `#4817C2` | CTA buttons, links, accents |
| `secondary-500` | `#2F7F51` | Green banners, check icons, partner notes |
| `tertiary-300` | `#EDC385` | Progress badge background |
| `text-dark-blue` | `#002142` | Headings, primary text |
| `neutral-800` | `#171614` | Body text, labels |
| `outline` | `#DFDFDF` | Card borders, dividers |
| `info-bg` | `#F1F5F9` | Info banner background |
| `bonus-bg` | `#F1FFFC` | Bonus callout background |
| `rounded-lg` | `16px` | Cards, buttons |
| `rounded-sm` | `8px` | Form options, badges |
| `shadow-card` | `0 4px 4px rgba(0,0,0,0.09)` | Partner cards |
| `shadow-header` | `0 2px 2px rgba(0,0,0,0.04)` | Top navigation |

---

## Responsive Breakpoints

| Breakpoint | Width | Grid Columns | Margin |
|---|---|---|---|
| Mobile | 390px | 4 | 16px |
| Tablet | 744px | 8 | 24px |
| Desktop | 1440px | 12 | 80px |

**Pattern:** Use `tablet:` and `desktop:` prefixes for responsive classes.

---

## Dependencies

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "typescript": "^5.0.0"
  }
}
```

Icons use `lucide-react` throughout. The shared components expose all needed icons; no additional icon library required.
