# 🗺️ Wireframes & Design Tokens (v0.1)

> **Figma preview link** – https://www.figma.com/file/XYZ123/Israeli-Elections-Wireframes  
> *(view-only; no account required)*

---

## 1. Screen-flow overview

| # | Route | Purpose |
|---|-------|---------|
| 1 | `/` | Welcome: headline, explainer, "Start" CTA, link to stats |
| 2 | `/quiz` | Three sliders (Security, Soc-Econ, Religious) + "Continue" |
| 3 | `/result` | Top-match card, full ranking accordion, share button |
| 4 | *(inline)* | Optional "Which party are you considering?" – skippable |
| 5 | `/stats` | 2-D scatter (Security × Soc-Econ, colour = Religious) + bar chart |
| 6 | **Footer** | Disclaimer & "Delete my data" link (UUID-based) |

---

## 2. Low-fidelity wireframes

| Screen | Thumbnail | Notes |
|--------|-----------|-------|
| **Home** | ![Home](https://placehold.co/300x180?text=Home) | Logo top-center, RTL layout |
| **Quiz** | ![Quiz](https://placehold.co/300x180?text=Quiz) | Sliders show tick labels 0-25-50-75-100 |
| **Result** | ![Result](https://placehold.co/300x180?text=Result) | Party logo 32 px, distance score, share icon copies URL |
| **Stats** | ![Stats](https://placehold.co/300x180?text=Stats) | Recharts `ScatterChart` + `BarChart` |

> *Wireframes are grayscale; colours come from the token set below.*

---

## 3. Design tokens

| Token | HEX | Usage |
|-------|-----|-------|
| `brand-600` | **#0A66C2** | Primary buttons / links |
| `brand-100` | #E6F0FA | Hero backgrounds, subtle UI |
| `accent` | #FFDD00 | Micro-highlights |
| `neutral-900` | #111111 | Body text |
| `neutral-100` | #F8F9FA | Card backgrounds |
| **Font** | "Assistant" | Loaded via Google Fonts |
| **Radius** | `rounded-2xl` (1 rem) | Cards & buttons |
| **Spacing scale** | 2 → 4 → 6 → 8 → 12 → 16 px | Tailwind utilities |

---

## 4. Accessibility targets

* WCAG AA contrast on interactive elements  
* Slider handle 24 × 24 px for touch  
* All text legible on 320 px-wide devices

---

## 5. Next steps

After this PR is merged:

1. Branch `feature/quiz-flow` to implement sliders & party-match logic.  
2. Add Storybook stories for Slider and Result components.  
3. Connect Supabase for persistence (future PR). 