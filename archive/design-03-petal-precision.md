# Design Concept 03 — "Petal & Precision"
**Project:** Jessica Eyebrow Threading — Premium Beauty Salon Website
**Concept Name:** Petal & Precision
**Category:** Premium Personal Website
**Tone:** Soft Editorial · Personal Trust · Feminine Confidence · Clean Warmth

---

## 🎯 Concept Statement

This design feels like a **personal beauty journal** run by someone you immediately trust. Light, airy, and personal — but with deliberate structure that signals professionalism. It sits between a fashion blog and a premium salon site, creating the feeling that Jessica herself curated every word and image.

It's built for the woman searching "eyebrow threading near me" who wants to feel comfortable, not intimidated. **The emotional hook: she feels like she already knows Jessica before she books.**

The one thing visitors will remember: **it felt personal, not corporate.**

---

## 🎨 Color Palette

```
--color-bg:         #FEFBF8    /* Lightest warm white — airy base */
--color-section:    #F7F0E8    /* Warm linen — alternate sections */
--color-rose:       #C17B6F    /* Muted terracotta rose — primary accent */
--color-sand:       #D4A882    /* Warm sand — secondary accent, borders */
--color-text:       #3D2B1F    /* Dark warm brown — body text */
--color-heading:    #2A1A10    /* Deep espresso — headings */
--color-muted:      #9C7B6A    /* Warm mid-tone — supporting text, labels */
--color-surface:    #F0E6DB    /* Peach linen — card backgrounds */
--color-line:       #E4D3C4    /* Soft divider lines */
```

**Rule:** Every color must feel like it belongs in a warm sunlit room. Nothing cold. Nothing clinical.

---

## 🔤 Typography

### Display Font (H1, H2, Major Section Headings)
**Font:** `Fraunces` — Italic 300 weight for H1, Regular 600 for H2
- Source: Google Fonts
- Why: Optical size variable font with beautiful italic swash. Editorial, personal, refined — used by lifestyle brands and independent boutiques. Not seen on typical salon sites.
- H1: 64px / line-height 1.15 / Italic / --color-heading
- H2: 38px / line-height 1.3 / Semi-bold / --color-heading
- H3: 22px / Regular / --color-rose

### Body Font
**Font:** `Lora` — Regular (400) for body, Medium italic for pull quotes
- Source: Google Fonts
- Why: A serif body font — unusual choice that makes body copy feel personal and crafted. Pairs perfectly with Fraunces. Lora is warm, readable, and feels like a personal letter.
- Body: 16px / line-height 1.85 / --color-text
- Small labels: Lora 12px uppercase, letter-spacing 0.1em, --color-muted

### Accent
**Font:** `Fraunces Italic` — for section labels above headings ("Our Services", "What Clients Say")
- Size: 13px / --color-rose / uppercase / letter-spacing 0.14em
- This overline label style appears above every major heading — it's a signature design element

---

## 📐 Layout System

### Grid
- Desktop: 12-column, max-width 1200px, 32px gutters
- Section padding: 112px vertical desktop, 64px mobile
- Deliberate use of asymmetric columns: hero (55/45), about (60/40)

### Signature Layout Choices
1. **Hero:** Two-column asymmetric. Left (55%): stacked text — small overline label "Oklahoma City's Brow Studio", then large Fraunces italic H1 on 2 lines, then a thin handwritten-style divider (SVG wavy line in --color-sand, 80px wide), then body copy, then CTAs. Right (45%): a tall image container, slightly taller than the left column, with an irregular organic border-radius (60% 40% 70% 30% / 50% 60% 40% 50% — CSS blob shape). Behind the image: a soft circle in --color-surface, offset 20px down-right.
2. **Services:** Alternating two-column layout. Each service: left side has number ("01", "02" etc. in large light Fraunces, --color-line color, 80px), then heading and copy. Right side: a soft surface-colored tag with service name + price. Every other row: layout reverses (image/tag left, copy right).
3. **About Section:** Full-width --color-section bg. Centered text with generous left/right margins (20% each side on desktop). Above the heading: a small SVG illustration of a thread spool (minimal, one-color, in --color-rose). The copy speaks directly — "We built this studio for you..."
4. **Testimonials:** Horizontally scrollable cards on mobile, 3-col on desktop. Each card: white bg, soft shadow, --color-rose left border (4px), Fraunces italic quote, Lora name + "Verified Client" label.
5. **Pricing:** Accordion-style per category (Facial Threading, Facial Waxing, Other Services). Each category expands to show a clean price list. Default: first category open. Warm and non-intimidating.
6. **Contact:** Warm linen bg section. Large heading "Come Find Us". Two columns: left stacks address, phone (large), WhatsApp link styled as a friendly button. Right: a simple clean contact form with warm-styled inputs.

---

## ✨ Motion & Interaction

- **Page load:** The blob-image on hero scales from 95% → 100% (0.6s, ease-out). H1 slides up from 20px (0.4s, 0.1s delay). CTAs fade in (0.4s, 0.5s delay).
- **Scroll reveals:** Each element fades up 24px. Stagger 60ms between siblings. Smooth, never bouncy.
- **Service row hover:** The large faded number rotates 3 degrees and darkens from --color-line to --color-sand. Subtle delight.
- **Testimonial cards:** Hover lifts 4px, left border deepens to --color-heading.
- **Pricing accordion:** Smooth max-height transition (0.35s). Caret rotates 180°.
- **CTA Button hover:** Background shifts one step darker, 0.2s. No scaling — scaling feels cheap.
- **Nav:** Solid from the start (light bg). No transparency — this site is soft and readable from first pixel.

---

## 🧩 Component Specs

### Primary CTA Button
```
Background:   --color-rose
Text:         #FEFBF8, Lora Regular, 14px, letter-spacing 0.08em
Padding:      15px 38px
Border-radius: 40px (full pill — soft, approachable, personal)
Hover:        Darken to #A3665C, 0.2s ease
Box-shadow:   0 4px 16px rgba(193, 123, 111, 0.25)
```

### Secondary CTA Button
```
Border:       1.5px solid --color-rose
Text:         --color-rose
Background:   transparent
Border-radius: 40px
Hover:        Background → rgba(193,123,111,0.07)
```

### Service Row
```
Layout:       Flex row, align-items: center, gap 48px
Number:       Fraunces 80px, font-weight 200, color --color-line, flex-shrink 0
Content:      Flex column — H3 heading + body copy
Tag:          Rounded rect (8px), --color-surface bg, 1px --color-line border, service name + price
Hover:        Number color transitions, subtle left shift on content (4px)
```

### Service Card (mobile fallback — full-width stacked cards)
```
Background:   --color-surface
Border-radius: 12px
Padding:      28px
Border-left:  3px solid --color-sand
Shadow:       0 2px 12px rgba(61, 43, 31, 0.07)
```

### Nav Bar
```
Background:   --color-bg (always visible, never transparent)
Border-bottom: 1px solid --color-line
Logo:         "Jessica" in Fraunces Italic 24px + "Eyebrow Threading" in Lora 10px uppercase below
Links:        Lora 13px, --color-muted, hover → --color-heading, underline on hover (2px, --color-sand)
CTA in nav:   Pill "Book Now" in --color-rose, small (12px text, 10px 24px padding)
Mobile:       Slide-down dropdown menu (not overlay). Clean, fast.
```

### Input Fields (Contact Form)
```
Background:   #FFFFFF
Border:       1.5px solid --color-line
Border-radius: 8px
Padding:      12px 16px
Font:         Lora 15px, --color-text
Focus border: --color-rose (transition 0.2s)
Label:        Above field, Lora 12px uppercase, --color-muted
Placeholder:  --color-muted, italic
```

---

## 📱 Mobile-First Rules

- Hero: Single column. Blob image goes first (full-width, 260px height, blob shape maintained via CSS). Text below. CTAs stacked vertically.
- Service rows: Collapse to card format (see Service Card spec above).
- Nav: Logo left, pill "Call" button right (tel: link), hamburger icon far right.
- Testimonials: Horizontal scroll with snap. Show 1.2 cards to hint scroll.
- Pricing accordion: Full-width. Works perfectly for mobile touch.
- Contact section: Stack vertically. Form below contact info.
- Floating WhatsApp: Pill-shaped button, fixed bottom-right, --color-rose bg, 56px height, "WhatsApp Us" label visible (not just icon).
- H1: 64px → 40px mobile / H2: 38px → 26px.

---

## 🗂️ Page Sections — Build Order

1. `<nav>` — Always-visible warm white nav, Fraunces logo, pill CTA
2. `<section id="hero">` — Asymmetric 2-col, blob image, editorial headline
3. `<section id="trust-strip">` — Linen bg, 4 trust points with small rose dot icons
4. `<section id="services">` — Alternating number + content row layout
5. `<section id="about">` — Centered, linen bg, thread SVG icon, personal copy
6. `<section id="pricing">` — Accordion by category, warm inputs
7. `<section id="testimonials">` — 3-col cards with left rose border
8. `<section id="faq">` — Accordion, clean, default first item open
9. `<section id="contact">` — 2-col: contact details + form, warm styling
10. `<footer>` — Logo, nav links in 2 cols, address, WhatsApp footer link, copyright

---

## 📍 CTA Strategy

- **Primary:** "Book Your Appointment" — pill button, --color-rose, visible in hero + after services + contact section
- **Phone CTA:** `572-240-5888` styled as a large clickable number (not a standard button)
- **WhatsApp:** `https://wa.me/15722405888` — floating pill (mobile), inline friendly button in contact section
- **Nav CTA:** "Book Now" small pill — persistent
- **No aggressive popups.** This brand is personal and trusting — popups break the tone.

---

## 🔍 SEO Implementation Notes

### Meta Tags (Homepage)
```html
<title>Jessica Eyebrow Threading | Brow Studio in Oklahoma City, OK</title>
<meta name="description" content="Precision eyebrow threading, brow lamination & tinting in Oklahoma City. Personal care, expert results. Walk-ins welcome. Book at 572-240-5888.">
<link rel="canonical" href="https://jessicaeyebrowthreading.com/">
```

### Open Graph
```html
<meta property="og:title" content="Jessica Eyebrow Threading — Oklahoma City">
<meta property="og:description" content="Expert brow shaping, lamination & threading in OKC. Walk-ins welcome.">
<meta property="og:type" content="business.business">
<meta property="og:image" content="/og-image.jpg">
```

### Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Jessica Eyebrow Threading",
  "description": "Expert eyebrow threading, brow lamination, tinting and facial waxing in Oklahoma City, OK.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4503 Northwest 36th Street",
    "addressLocality": "Oklahoma City",
    "addressRegion": "OK",
    "postalCode": "73122",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 35.5118,
    "longitude": -97.6195
  },
  "telephone": "+1-572-240-5888",
  "priceRange": "$6 - $55",
  "openingHours": "Mo-Su 09:00-19:00",
  "url": "https://jessicaeyebrowthreading.com",
  "hasMap": "https://maps.google.com/?q=4503+Northwest+36th+Street+Oklahoma+City+OK+73122"
}
```

---

## 🚫 What To Avoid

- No dark backgrounds anywhere — this concept lives entirely in warm light
- No pill buttons that look like app UI (make them salon-appropriate: slightly larger, generous padding)
- No Helvetica, Montserrat, or geometric sans for body text — Lora is the deliberate choice
- No icon packs (FontAwesome, Material) — SVG only, custom or minimal
- No shadows heavier than 0 4px 20px at 8% opacity
- No multi-column body text on mobile
- No full-width image banners without the blob/organic clip shape — they flatten the premium feel
- Never use the word "cheap" in copy — it's "affordable luxury" or "accessible pricing"
