# Jessica Eyebrow Threading — Implementation-Ready Design Brief
## Mission
Create implementation-ready, token-driven UI guidance for Jessica Eyebrow Threading that is optimized for consistency, accessibility, and fast delivery across a premium beauty salon website.

## Brand
- **Client:** Jessica Eyebrow Threading
- **URL:** jessicaeyebrowthreading.com (staging TBD)
- **Address:** 4503 Northwest 36th Street, Oklahoma City, OK 73122
- **Phone:** 572-240-5888
- **WhatsApp:** https://wa.me/15722405888
- **Audience:** Local women in Oklahoma City seeking eyebrow threading, brow lamination, tinting, facial waxing
- **Product surface:** Premium local beauty salon website (mobile-first, single page with anchor nav)

## Style Foundations

### Design Tone
Clean, functional, implementation-oriented — with warm personal trust signals.

### Typography
- `font.family.primary=Lato`
- `font.family.stack=Lato, arial, sans-serif`
- `font.size.base=18px`
- `font.weight.base=400`
- `font.lineHeight.base=27px`

### Typography Scale
- `font.size.xs=16px`
- `font.size.sm=18px`
- `font.size.md=23px`
- `font.size.lg=24px`
- `font.size.xl=36px`
- `font.size.2xl=64px`

### Color Palette (Do Not Modify)
- `color.text.primary=#fefefe`
- `color.text.secondary=#ffffff`
- `color.surface.base=#000000`
- `color.text.inverse=#e2e2e2`
- `color.surface.raised=#9401d2`
- `color.surface.strong=#3f0457`

### Semantic Token Mapping for Jessica Site
```
--color-bg:           color.surface.base       /* #000000 — page background */
--color-surface:      color.surface.strong      /* #3f0457 — section/card backgrounds */
--color-accent:       color.surface.raised      /* #9401d2 — CTAs, highlights, borders */
--color-text:         color.text.primary        /* #fefefe — primary body text */
--color-text-sub:     color.text.secondary      /* #ffffff — headings */
--color-text-muted:   color.text.inverse        /* #e2e2e2 — supporting labels, captions */
--color-border:       color.surface.raised      /* #9401d2 — card borders, dividers */
```

### Spacing Scale
- `space.1=4px`
- `space.2=6px`
- `space.3=8px`
- `space.4=16px`
- `space.5=24px`
- `space.6=32px`
- `space.7=40px`
- `space.8=56px`

### Motion
- `motion.duration.instant=300ms` — all transitions use this value

### Radius
- Cards: `8px`
- Buttons (primary): `2px`
- Buttons (pill/secondary): `40px`
- Inputs: `6px`

---

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required on all interactive elements
- Contrast constraints: `color.text.primary` on `color.surface.strong` must pass AA (test in implementation)
- All CTAs must have descriptive aria-labels
- Touch targets: minimum 48×48px

---

## Page Sections — Build Order & Content

### 1. `<nav>` — Navigation Bar
**Layout:** Logo left · Links center · CTA right
**Scroll behavior:** Transparent on hero → `color.surface.strong` bg + bottom border on scroll (300ms transition)
**Logo:**
- Line 1: "Jessica" — Lato Bold, `font.size.lg=24px`, `color.text.secondary`
- Line 2: "Eyebrow Threading" — Lato Regular, 11px, uppercase, letter-spacing 0.12em, `color.text.muted`

**Nav Links:** Services · About · Pricing · Gallery · Contact
- Font: Lato, 13px, uppercase, letter-spacing 0.1em
- Default: `color.text.inverse`
- Hover: `color.text.primary`

**CTA Button in Nav:** "Book Now"
- Background: `color.surface.raised` (#9401d2)
- Text: `color.text.primary`, Lato Medium, 13px uppercase
- Padding: `space.3` `space.5` (8px 24px)
- Border-radius: 2px
- Hover: `color.surface.strong` (#3f0457), 300ms

**Mobile:** Hamburger right. Drawer slides from right. Full height. `color.surface.strong` bg.

---

### 2. `<section id="hero">` — Hero
**H1:** "Perfect Brows. Effortless Beauty."
- Font: Lato Bold, `font.size.2xl=64px`, `color.text.secondary`
- Mobile: 40px

**Tagline:** "Experience precision eyebrow threading, flawless brow shaping, and luxury beauty services in Oklahoma City."
- Font: Lato Light, `font.size.sm=18px`, `color.text.inverse`, line-height 27px

**Trust Line:** Affordable Luxury · Expert Brow Artists · Hygienic · Walk-Ins Welcome
- Font: Lato, `font.size.xs=16px`, uppercase, `color.text.muted`, `space.4` gap between items

**CTA Pair:**
- Primary: "Book Your Appointment" — `color.surface.raised` bg, `color.text.primary` text, border-radius 2px, padding `space.4` `space.7`
- Secondary: "Call Now" — border 1.5px `color.surface.raised`, `color.surface.raised` text, transparent bg, same padding

**Background:** `color.surface.base` (#000000). Subtle radial glow `color.surface.raised` at 6% opacity centered behind H1.

**Layout:** Left-aligned text (55% width desktop). Right: tall image frame, top-left corner radius only (24px), overlaps next section 60px.

---

### 3. `<section id="trust-strip">` — Trust Bar
**Background:** `color.surface.strong` (#3f0457)
**Items (4):** Expert Brow Artists · Hygienic Care · Walk-Ins Welcome · Sensitive Skin Safe
- Lato, 13px uppercase, `color.text.inverse`, separated by `color.surface.raised` dot dividers
- Padding: `space.6` vertical

---

### 4. `<section id="services">` — Featured Services
**Section Heading (H2):** "Our Beauty Services"
- Lato Bold, `font.size.xl=36px`, `color.text.secondary`

**Overline label above H2:** "What We Offer" — Lato 12px uppercase, `color.surface.raised`, letter-spacing 0.14em

**6 Service Cards:**

| Service | Description | Price |
|---|---|---|
| Eyebrow Threading | Define your face with perfectly sculpted brows customized to your features. | $10 |
| Facial Threading | Smooth, hair-free skin with gentle threading — ideal for sensitive skin. | From $3 |
| Brow Lamination | Fuller, lifted, fluffy brows with long-lasting definition. | $20 |
| Eyebrow Tinting | Enhanced colour, shape, and depth for naturally bold brows. | $13 |
| Facial Waxing | Quick and effective facial hair removal for silky smooth skin. | From $6 |
| Head Massage | Relax, recharge, and refresh with soothing stress-relief therapy. | $15 |

**Card Spec:**
- Background: `color.surface.strong` (#3f0457)
- Border: 1px solid `color.surface.raised` (#9401d2)
- Border-radius: 8px
- Padding: `space.6` (32px)
- Service name: Lato Bold, `font.size.md=23px`, `color.text.secondary`
- Description: Lato Regular, `font.size.sm=18px`, `color.text.inverse`
- Price: Lato Bold, `font.size.lg=24px`, `color.surface.raised`
- Hover: border-top 3px `color.surface.raised`, lifts `space.2` (6px), shadow deepens — 300ms

**Desktop layout:** Masonry 2+1 (two tall left, one wide right)
**Mobile:** Horizontal scroll with snap

---

### 5. `<section id="about">` — About Jessica
**Background:** `color.surface.base`

**H2:** "About Jessica Eyebrow Threading"
- Lato Bold, `font.size.xl=36px`, `color.text.secondary`

**Body copy:**
"Jessica Eyebrow Threading was created with one simple vision — helping women feel beautiful, confident, and empowered through expertly crafted beauty services. Located in Oklahoma City, our salon combines traditional threading artistry with modern techniques to deliver precise, elegant results for every client. We believe beauty should feel luxurious without being expensive."

- Lato Regular, `font.size.sm=18px`, `color.text.inverse`, line-height 27px

**Why Threading > Waxing list:**
- More precise · Gentler on sensitive skin · No harsh chemicals · Less irritation · Better definition

**CTA:** "Book Your Appointment" — primary button spec

---

### 6. `<section id="pricing">` — Pricing
**H2:** "Simple, Transparent Pricing"
**Background:** `color.surface.strong`

**Layout:** Spa-menu style. Two columns. Category headers in Lato Bold `font.size.lg`, items in Lato Regular, prices right-aligned in `color.surface.raised`.

**Full Price List:**

**Facial Threading**
Eyebrow $10 · Upper Lip $6 · Lower Lip $3 · Chin $7 · Forehead $7 · Sides $8 · Cheeks $5 · Neck $6 · Full Face $35

**Facial Waxing**
Eyebrows $11 · Upper Lip $7 · Chin $7 · Forehead $7 · Sides $10 · Cheeks $6 · Neck $8 · Full Face $45

**Other Services**
Eyebrow Tinting $13 · Eyelash Tint $10 · Brow Lamination $20 · Combo Tint + Lamination $25 · Henna $15 · Head Massage $15

**Packages:**
- Brow Glow Package — $30 (Threading + Tinting + Styling)
- Full Beauty Refresh — $55 (Full face threading + Lamination + Lash tint)
- Monthly Maintenance — Custom

---

### 7. `<section id="testimonials">` — Reviews
**Background:** `color.surface.base`. Grain texture overlay (4% opacity).

**H2:** "What Our Clients Say"
- Lato Bold, `font.size.xl`, `color.text.secondary`

**3 Featured Testimonials:**
1. "The best eyebrow threading in Oklahoma City. My brows have never looked this clean." — Amanda R.
2. "Super clean salon, friendly staff, affordable pricing. Love my brow lamination results." — Sophia M.
3. "I finally found my go-to eyebrow salon near me. Quick, professional, beautiful work." — Jessica T.

**Card spec:**
- Background: `color.surface.strong`
- Border-left: 3px solid `color.surface.raised`
- Quote: Lato Italic, `font.size.md=23px`, `color.text.primary`
- Name: Lato Bold, 13px uppercase, `color.text.muted`

---

### 8. `<section id="faq">` — FAQ
**Background:** `color.surface.strong`
**H2:** "Frequently Asked Questions"

**10 Key FAQs:**
1. Does eyebrow threading hurt? — Minimal discomfort, becomes easier with regular visits.
2. How long do results last? — 2–4 weeks depending on hair growth.
3. Is threading safe for sensitive skin? — Yes, no chemicals involved.
4. Can I walk in without an appointment? — Yes, walk-ins welcome.
5. Is brow lamination safe? — Yes, when professionally performed.
6. How long does tinting last? — 2–3 weeks.
7. Can I wear makeup after threading? — Avoid heavy makeup for a few hours.
8. What is the price for eyebrow threading? — $10.
9. Do you offer full face threading? — Yes, $35.
10. Can I get tinting and lamination together? — Yes, combo available at $25.

**Accordion spec:**
- Default: first item open
- Icon: "+" rotates to "×" on open — `color.surface.raised`
- Border-bottom: 1px `color.surface.raised` per item
- Expand transition: 300ms max-height

---

### 9. `<section id="contact">` — Contact
**H2:** "Come Find Us"
**Background:** `color.surface.base`

**Left column:**
- Address: 4503 Northwest 36th Street, Oklahoma City, OK 73122
- Phone: 572-240-5888 (large, clickable tel: link, `color.surface.raised`, Lato Bold `font.size.xl`)
- WhatsApp button: "Chat on WhatsApp" — pill button, `color.surface.raised` bg, href: `https://wa.me/15722405888`
- Hours: Monday – Sunday (placeholder — fill before launch)

**Right column — Contact Form:**
Fields: Name · Phone · Service interested in (dropdown) · Message
- Input bg: `color.surface.strong`
- Input border: 1px `color.surface.raised`
- Input text: `color.text.primary`
- Focus border: `color.text.secondary`, 300ms
- Submit CTA: "Send Message" — primary button spec

---

### 10. `<footer>`
**Background:** `color.surface.strong`
**Border-top:** 2px solid `color.surface.raised`

**Left:** "Jessica" wordmark large + "Eyebrow Threading" small
**Right:** Address + phone + WhatsApp link
**Bottom row:** Nav links · Copyright 2025 Jessica Eyebrow Threading · "Made with care in OKC"

---

## Floating WhatsApp CTA
- Fixed: bottom-right, `space.8` (56px) from edge
- Shape: Pill, `color.surface.raised` bg
- Label: "WhatsApp Us" — visible on desktop, icon-only on small mobile
- Appears after 3s page load
- Link: `https://wa.me/15722405888`
- z-index: 999

---

## Component State Rules

### Buttons (All)
| State | Behavior |
|---|---|
| Default | As defined per variant |
| Hover | Background shifts one tone, 300ms |
| Focus-visible | 2px outline `color.text.secondary`, 2px offset |
| Active | Scale 0.98, 150ms |
| Disabled | 40% opacity, cursor not-allowed |
| Loading | Spinner replaces label, same bg |

### Inputs (All)
| State | Behavior |
|---|---|
| Default | `color.surface.strong` bg, `color.surface.raised` border |
| Focus | `color.text.secondary` border, 300ms |
| Error | Red border `#ff4d4d`, error message below in 14px |
| Disabled | 50% opacity, cursor not-allowed |

### Cards (Service/Testimonial)
| State | Behavior |
|---|---|
| Default | As defined |
| Hover | Lift `space.2`, border-top thickens, 300ms |
| Focus-visible | 2px outline `color.text.secondary` |

---

## SEO Meta Block (Homepage)
```html
<title>Jessica Eyebrow Threading | Best Brow Studio in Oklahoma City</title>
<meta name="description" content="Expert eyebrow threading, brow lamination & tinting in Oklahoma City. Walk-ins welcome. Affordable luxury. Call 572-240-5888.">
<meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma">
<link rel="canonical" href="https://jessicaeyebrowthreading.com/">
<meta property="og:title" content="Jessica Eyebrow Threading — Oklahoma City">
<meta property="og:description" content="Expert brow shaping, lamination & threading in OKC. Walk-ins welcome.">
<meta property="og:type" content="business.business">
```

## Schema.org JSON-LD
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

## Rules: Do
- Use semantic tokens, not raw hex values, in all component guidance
- Every component must define states: default, hover, focus-visible, active, disabled, loading, error
- All interactive components must document keyboard, pointer, and touch behavior
- Accessibility acceptance criteria must be testable
- WhatsApp must be present as CTA on every page section

## Rules: Don't
- Do not change the color palette — use only the 6 defined tokens
- Do not use low-contrast text combinations
- Do not introduce one-off spacing outside the spacing scale
- Do not use any font other than Lato
- Do not use rounded pill buttons for primary CTAs (border-radius: 2px only)
- Do not remove the WhatsApp floating CTA

---

## QA Checklist
- [ ] Color tokens match exactly: #000000, #3f0457, #9401d2, #fefefe, #ffffff, #e2e2e2
- [ ] No raw hex values used in components — semantic tokens only
- [ ] All buttons have all 6 states defined
- [ ] Focus-visible outlines visible on all interactive elements
- [ ] WhatsApp CTA present: floating + hero + contact section
- [ ] Phone number 572-240-5888 is a `tel:` link everywhere it appears
- [ ] Schema JSON-LD present in `<head>` of homepage
- [ ] All meta tags present: title, description, canonical, OG
- [ ] Mobile: all touch targets ≥ 48px
- [ ] Mobile: H1 scales to 40px, H2 to 26px
- [ ] Pricing table: all prices match the PRD exactly
- [ ] FAQ accordion: first item open by default
- [ ] Contact form: all fields have labels, error states defined
- [ ] Business hours filled before launch (currently placeholder)
- [ ] Nav transparent → solid transition working on scroll
