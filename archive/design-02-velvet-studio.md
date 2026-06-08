# Design Concept 02 — "Velvet Studio"
**Project:** Jessica Eyebrow Threading — Premium Beauty Salon Website
**Concept Name:** Velvet Studio
**Category:** Premium Personal Website
**Tone:** Dark Luxury · High-End Spa · Intimate Glamour · Night Bloom

---

## 🎯 Concept Statement

This design lives in the world of **high-end beauty editorial** — think a luxury spa brochure meets a fashion lookbook. Deep, rich, low-light tones create drama and exclusivity. It signals premium without screaming it. The threading studio becomes a destination, not just a service.

The one thing visitors will remember: **it feels expensive. Effortlessly so.**

This is for the client who wants to attract women willing to pay for quality — and trust that quality before they even walk in.

---

## 🎨 Color Palette

```
--color-bg:         #1A1410    /* Near-black espresso — base background */
--color-surface:    #241C17    /* Dark mocha — card/section surfaces */
--color-surface-2:  #2E2419    /* Slightly lifted — hover surfaces */
--color-rose-gold:  #C4956A    /* Rose-gold bronze — primary accent */
--color-blush:      #E8BFA0    /* Warm blush — secondary accent, body text */
--color-muted:      #8A7060    /* Muted warm — supporting text */
--color-border:     #3D2E22    /* Dark border — subtle separators */
--color-cream:      #FAF0E6    /* Warm cream — high-contrast headings */
--color-highlight:  #D4A574    /* Warm highlight — CTA, active states */
```

**Rule:** Light elements must feel like candlelight against darkness — warm, never cold or blue.

---

## 🔤 Typography

### Display Font (H1, Hero, Section Titles)
**Font:** `Playfair Display` — Regular for titles, Bold italic for hero
- Source: Google Fonts
- Why: Classic serif with drama. The swashes and contrast in strokes feel inherently luxurious. Common in Vogue-style editorial.
- H1: 72px / line-height 1.05 / color: --color-cream
- H2: 40px / line-height 1.3 / color: --color-cream
- Hero accent line: Bold Italic, 80px, slightly larger, --color-rose-gold

### Body Font
**Font:** `DM Sans` — Light (300) for body, Regular (400) for UI
- Source: Google Fonts
- Why: Clean, modern, geometric — creates beautiful contrast against Playfair Display
- Body: 15px / line-height 1.8 / color: --color-blush
- Labels: 11px / uppercase / letter-spacing 0.15em / --color-muted

### Accent / Pull Quote Font
**Font:** `Playfair Display Italic` — for testimonials, callout quotes
- Size: 26px / color: --color-rose-gold

---

## 📐 Layout System

### Grid
- Desktop: 12-column, max-width 1320px, centered
- Section padding: 140px vertical desktop, 80px mobile
- Columns: Favor asymmetric splits (40/60 or 35/65) over equal halves

### Signature Layout Choices
1. **Hero:** Full dark screen. Large Playfair Display italic headline — split across 2 lines, second line in rose-gold. Centered. Below: thin divider line, then tagline in DM Sans uppercase. Hero is text-only intentionally — no image clutter. Background has a very subtle grain texture and a radial glow (rose-gold, 8% opacity) centered behind the text.
2. **Services Section:** 3-column card grid on desktop, 1-col on mobile. Cards are dark surface (#241C17) with a 1px rose-gold top border (3px height, full width). Card has generous padding (40px). Service name in Playfair, description in DM Sans Light. Price appears only on hover — slides up from bottom with fade.
3. **About Section:** Dark full-width section with a centered quote (large Playfair italic) + paragraph below. Left side has a thin vertical rose-gold line (decorative). No image — relies on typography as the visual element.
4. **Pricing:** Two-column price list on dark surface card. Category title in Playfair, items in DM Sans, prices right-aligned in --color-highlight. Subtle horizontal rules between items (1px, --color-border).
5. **Testimonials:** Cards on a slightly lighter surface (#2E2419). Star rating in rose-gold. Quote in Playfair italic. Name in DM Sans uppercase muted.
6. **Footer:** Full-width dark. Centered layout. Large wordmark top. Contact info and nav links below in two columns. Rose-gold thin top border on footer.

---

## ✨ Motion & Interaction

- **Page load:** Logo mark fades in first (0.3s). Then H1 line 1 slides up (0.5s). Then H1 line 2 (rose-gold, 0.7s). Then tagline + CTA fades up (0.9s). Feels cinematic.
- **Section reveals:** Fade up on IntersectionObserver. Delay: 0ms, 100ms, 200ms for sibling elements.
- **Service cards:** Background lifts to --color-surface-2. Top border animates from 3px to 5px. Price text slides up.
- **CTA Button hover:** Subtle glow pulse (box-shadow: 0 0 20px rgba(196,149,106,0.4)).
- **Nav scroll:** Background fades from transparent to --color-bg with blur (backdrop-filter: blur(12px)).
- **Floating WhatsApp:** Appears after 3s on mobile. Subtle bounce animation once on appear.

---

## 🧩 Component Specs

### Primary CTA Button
```
Background:   --color-rose-gold
Text:         #1A1410 (dark text on light button), DM Sans Medium, 13px, uppercase, letter-spacing 0.12em
Padding:      16px 40px
Border-radius: 0px (completely square — unexpected, deliberate, luxury choice)
Hover:        --color-highlight bg + glow shadow
```

### Secondary CTA Button (ghost)
```
Border:       1px solid --color-rose-gold
Text:         --color-rose-gold
Background:   transparent
Hover:        Background fills with rgba(196,149,106,0.08)
Border-radius: 0px
```

### Service Card
```
Background:   --color-surface (#241C17)
Border-top:   3px solid --color-rose-gold
Border-rest:  1px solid --color-border
Border-radius: 0px (square — consistent luxury language)
Padding:      40px 36px
Hover:        Background → --color-surface-2, border-top → 5px
Price reveal: opacity 0 → 1 on hover, translateY(8px → 0)
```

### Nav Bar
```
Default bg:   transparent
Scroll bg:    rgba(26,20,16,0.92) + backdrop-filter: blur(12px)
Logo:         "JESSICA" in Playfair Display 20px + thin divider + "Eyebrow Threading" DM Sans 10px uppercase
Links:        DM Sans 11px uppercase, letter-spacing 0.14em, --color-muted, hover → --color-cream
CTA:          Square "Book Now" button, rose-gold
Mobile:       Full-screen overlay nav. Links centered, large. Dark bg. Animated open/close.
```

---

## 📱 Mobile-First Rules

- Hero: Center-aligned text (exception to desktop left-align). H1 60px → 38px mobile.
- Service cards: Full-width stacked. Price visible always (no hover on mobile).
- Nav: Full-screen overlay for mobile menu — more premium feel than drawer.
- Floating CTA: Fixed bottom bar on mobile — "Call Now" left + "WhatsApp" right. 56px height. --color-bg background with rose-gold top border.
- Section padding: 80px → 48px on mobile.
- All touch targets: 48px minimum.

---

## 🗂️ Page Sections — Build Order

1. `<nav>` — Transparent, logo center (desktop) / left (mobile), Book Now CTA right
2. `<section id="hero">` — Full-viewport, centered text, grain texture bg, rose-gold glow
3. `<section id="trust-strip">` — 4 items, DM Sans uppercase, rose-gold dots as separators, dark bg
4. `<section id="services">` — 3-col dark cards with top border accent
5. `<section id="about">` — Centered editorial quote + philosophy paragraph + CTA
6. `<section id="pricing">` — Dark card, two-column spa menu list
7. `<section id="testimonials">` — 3 testimonial cards, star ratings, Playfair quotes
8. `<section id="faq">` — Accordion on dark bg. Rose-gold "+" icon. Smooth expand.
9. `<section id="contact">` — Left: contact details stacked. Right: simple contact form (no map dependency)
10. `<footer>` — Centered, wordmark, links row, address, copyright

---

## 📍 CTA Strategy

- **Primary throughout:** `Call Now — 572-240-5888` (tel: link, rose-gold button)
- **WhatsApp:** Fixed mobile bottom bar (right side) + section CTAs
  - Link: `https://wa.me/15722405888`
- **Hero:** "Book Your Appointment" (primary square) + "See Our Services" (ghost square)
- **Mobile sticky bar:** Persistent bottom strip — dual action bar on mobile only

---

## 🔍 SEO Implementation Notes

### Meta Tags (Homepage)
```html
<title>Jessica Eyebrow Threading Oklahoma City | Luxury Brow Studio OKC</title>
<meta name="description" content="Oklahoma City's premier eyebrow threading studio. Expert brow shaping, lamination & tinting. Walk-ins welcome at 4503 NW 36th St. Call 572-240-5888.">
```

### Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Jessica Eyebrow Threading",
  "image": "https://jessicaeyebrowthreading.com/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "4503 Northwest 36th Street",
    "addressLocality": "Oklahoma City",
    "addressRegion": "OK",
    "postalCode": "73122",
    "addressCountry": "US"
  },
  "telephone": "+1-572-240-5888",
  "priceRange": "$6 - $55",
  "openingHours": "Mo-Su 09:00-19:00",
  "url": "https://jessicaeyebrowthreading.com"
}
```

---

## 🚫 What To Avoid

- No light/white backgrounds on any section
- No pastel pinks or millennial rose
- No rounded pill buttons — square is the deliberate choice
- No stock imagery or clip art
- No bright neon or harsh accent colors
- No centered body paragraphs (only hero)
- No generic serif + sans-serif combinations (Playfair + DM Sans is specific and earned)
- Don't add gradients unless very subtle (max 8% opacity glow, not gradient fills)
