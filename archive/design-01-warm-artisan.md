# Design Concept 01 — "Warm Artisan"
**Project:** Jessica Eyebrow Threading — Premium Beauty Salon Website
**Concept Name:** Warm Artisan
**Category:** Premium Personal Website
**Tone:** Organic Luxury · Handcrafted Elegance · Intimate Boutique

---

## 🎯 Concept Statement

This design feels like walking into a warm, sunlit boutique owned by someone who genuinely cares about their craft. It evokes **handmade care, natural ingredients, and artisanal precision** — not a chain salon, but a personal expert who knows your face. Every element feels considered, unhurried, and beautiful.

The one thing visitors will remember: **the warmth. It feels human.**

---

## 🎨 Color Palette

```
--color-bg:         #FAF6F1    /* Warm parchment — base background */
--color-surface:    #F2EAE0    /* Toasted cream — card/section backgrounds */
--color-mocha:      #6B4C3B    /* Deep mocha — primary text, headings */
--color-caramel:    #B07D5A    /* Caramel bronze — accent, CTA buttons */
--color-blush:      #E8C9B5    /* Dusty peach — soft borders, dividers */
--color-dark:       #2C1F18    /* Espresso — nav text, footer */
--color-white:      #FFFDF9    /* Warm white — hero overlay text */
--color-gold:       #C9975A    /* Antique gold — hover states, icons */
```

**Rule:** Never use pure #FFFFFF or #000000. Every shade must carry warmth.

---

## 🔤 Typography

### Display Font (Headings H1, H2, Big CTAs)
**Font:** `Cormorant Garamond` — Italic weight for H1, Regular for H2
- Source: Google Fonts
- Why: Timeless, editorial, feminine without being delicate. Used in luxury fashion.
- H1: 68px / line-height 1.1 / letter-spacing -0.02em
- H2: 42px / line-height 1.25
- Style: Use italic variant for hero H1 specifically

### Body Font
**Font:** `Jost` — Light (300) for body, Medium (500) for UI labels
- Source: Google Fonts
- Why: Geometric but warm, pairs beautifully with Cormorant without competing
- Body: 16px / line-height 1.75 / color: --color-mocha at 85% opacity
- Labels/Nav: 13px / letter-spacing 0.12em / uppercase

### Accent Text
**Font:** `Cormorant Garamond Italic` — for pull quotes, testimonials, taglines
- Size: 22px / color: --color-caramel

---

## 📐 Layout System

### Grid
- Desktop: 12-column, 80px gutters, max-width 1280px
- Mobile: single column, 24px horizontal padding
- Section vertical rhythm: 120px top/bottom padding on desktop, 72px on mobile

### Signature Layout Choices
1. **Hero:** Full-bleed warm parchment bg. H1 left-aligned, massive (68px). Right side: a tall asymmetric image frame (rounded top-left corner only, 24px radius). Image slightly overlaps into next section by 60px — breaking the grid intentionally.
2. **Services Section:** Horizontal scroll cards on mobile. Desktop: masonry-inspired 2+1 layout (two tall cards left, one wide card right). Cards have a subtle inner border (1px --color-blush) and a warm shadow.
3. **Testimonials:** Full-width dark section (--color-dark bg, --color-white text). Single rotating quote, large Cormorant Italic. Client name in Jost uppercase. Soft grain texture overlay on the dark bg.
4. **Pricing Table:** Not a standard table. Presented as a price list in two columns, styled like a spa menu. Category headers in Cormorant, prices right-aligned in caramel.
5. **Footer:** Split — left has the wordmark large, right has contact info stacked. Thin divider line in --color-blush. Very minimal.

---

## ✨ Motion & Interaction

- **Page load:** Hero H1 fades up in two parts — first line (0.4s delay), second line (0.7s delay). Image frame slides in from right (0.5s, ease-out).
- **Section reveals:** Fade-up on scroll (IntersectionObserver). Stagger children by 80ms each.
- **Service cards:** On hover — lift 6px, shadow deepens, caramel left border appears (3px, slides in from bottom).
- **CTA Button:** Pill shape. Background fills from left on hover (0.3s). No jarring transforms.
- **Nav:** Transparent on hero, transitions to warm white with bottom border on scroll.

---

## 🧩 Component Specs

### Primary CTA Button
```
Background:   --color-caramel
Text:         --color-white, Jost Medium, 14px, uppercase, letter-spacing 0.1em
Padding:      14px 36px
Border-radius: 2px (slightly squared — not a full pill, not a rectangle)
Hover:        --color-mocha background, smooth 0.3s
```

### Secondary CTA Button (outline)
```
Border:       1.5px solid --color-caramel
Text:         --color-caramel
Background:   transparent
Hover:        Fill with --color-blush
```

### Service Card
```
Background:   --color-surface
Border:       1px solid --color-blush
Border-radius: 12px top-left only, rest 4px (asymmetric radius)
Padding:      32px
Shadow:       0 4px 24px rgba(107, 76, 59, 0.08)
Icon area:    Small hand-drawn style SVG icon (thread/needle motif) in --color-caramel
```

### Nav Bar
```
Logo:         "Jessica" in Cormorant Italic 26px + "Eyebrow Threading" Jost 11px uppercase below
Links:        Jost 13px uppercase, letter-spacing 0.1em
CTA in nav:   Small pill button "Book Now" in --color-caramel
Mobile:       Hamburger slides drawer from right, full height, warm bg
```

---

## 📱 Mobile-First Rules

- Hero: Stack vertically. Image goes below H1, full-width, 280px height.
- Nav: Logo left, hamburger right. Drawer overlay.
- Service cards: Horizontal scroll with snap (scrollbar hidden).
- Pricing: Single column stacked list.
- All touch targets: min 48px height.
- Font scaling: H1 → 42px on mobile, H2 → 28px.

---

## 🗂️ Page Sections — Build Order

1. `<nav>` — Logo + links + Book Now CTA
2. `<section id="hero">` — H1, tagline, dual CTAs, asymmetric image frame
3. `<section id="trust-strip">` — 4 trust badges inline (Expert Artists · Hygienic · Walk-ins Welcome · Sensitive Skin Safe)
4. `<section id="about-intro">` — 2-col: left copy, right warm textured box with a quote
5. `<section id="services">` — 6 service cards in masonry layout
6. `<section id="transformation">` — Full-width editorial copy + CTA
7. `<section id="pricing">` — Spa-menu style price list
8. `<section id="testimonials">` — Dark bg, rotating quotes
9. `<section id="faq">` — Accordion, minimal styling
10. `<section id="contact">` — Map embed left, contact details right, WhatsApp CTA prominent
11. `<footer>` — Wordmark, nav links, address, social icons

---

## 📍 CTA Strategy

- **Primary CTA throughout:** `Call Now — 572-240-5888` (tel: link)
- **WhatsApp CTA:** Fixed floating button, bottom-right, caramel bg, WhatsApp icon
  - Link: `https://wa.me/15722405888`
  - Label: "Chat with Us"
- **Hero dual CTA:** "Book Your Appointment" (primary) + "View Services" (secondary outline)
- **Section CTAs:** End of services, testimonials, and pricing sections each have a CTA

---

## 🔍 SEO Implementation Notes

### Meta Tags (Homepage)
```html
<title>Jessica Eyebrow Threading | Best Brow Studio in Oklahoma City</title>
<meta name="description" content="Expert eyebrow threading, brow lamination & beauty services in Oklahoma City. Walk-ins welcome. Affordable luxury. Call 572-240-5888.">
<meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma">
```

### Schema.org JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Jessica Eyebrow Threading",
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
  "servesCuisine": null,
  "openingHours": "Mo-Su 09:00-19:00",
  "url": "https://jessicaeyebrowthreading.com",
  "sameAs": []
}
```

---

## 🚫 What To Avoid

- No stark white backgrounds
- No purple, teal, or neon accents
- No stock-photo-style illustrations
- No heavy drop shadows on text
- No more than 2 font families on any page
- No full-width tables — use spa menu layout instead
- Never center-align body text paragraphs (only hero tagline)
