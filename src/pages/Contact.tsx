import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for staggered card animations
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
        }
      },
      { threshold: 0.15 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BeautySalon",
        "@id": "https://jessicaeyebrowthreading.com/#salon",
        "name": "Jessica Eyebrow Threading",
        "url": "https://jessicaeyebrowthreading.com/",
        "telephone": "+1-572-240-5888",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "4503 Northwest 36th Street",
          "addressLocality": "Oklahoma City",
          "addressRegion": "OK",
          "postalCode": "73122",
          "addressCountry": "US"
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://jessicaeyebrowthreading.com/contact/#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://jessicaeyebrowthreading.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Contact Us",
            "item": "https://jessicaeyebrowthreading.com/contact"
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-20 md:pt-28 pb-section-v-mobile md:pb-section-v-desktop">
      <Helmet>
        <title>Contact & Location | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="Visit Jessica Eyebrow Threading at 4503 Northwest 36th Street, Oklahoma City, OK. Get directions, view hours, or call 572-240-5888 to schedule your visit." />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/contact" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Contact & Location | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="Visit Jessica Eyebrow Threading at 4503 Northwest 36th Street, Oklahoma City, OK. Get directions, view hours, or call 572-240-5888 to schedule your visit." />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/contact" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/service_eyebrow_threading.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      {/* ── Hero Section ── */}
      <div className="w-full max-w-desktop-max-width px-margin-mobile md:px-gutter mx-auto mb-16 md:mb-24">
        <div
          className={`text-center max-w-2xl mx-auto transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="font-body text-[13px] font-medium text-on-surface-variant tracking-[0.2em] mb-4 block uppercase">
            Get in Touch
          </span>
          <h1 className="font-display text-[36px] sm:text-[42px] md:text-[68px] text-primary mb-6 leading-tight">
            Visit <span className="italic">Us</span>
          </h1>
          <p className="font-display text-[18px] md:text-[22px] text-on-surface-variant leading-relaxed max-w-lg mx-auto">
            Step into our sunlit boutique for an experience of handcrafted elegance. We look forward to welcoming you.
          </p>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="w-full max-w-desktop-max-width px-margin-mobile md:px-gutter mx-auto" ref={cardsRef}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Left Column — Stylized Map ── */}
          <div
            className={`transition-all duration-700 ease-out delay-100 ${
              cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="bg-toasted-cream rounded-tl-xl rounded-tr rounded-br rounded-bl border border-dusty-peach/40 shadow-[0_8px_30px_rgba(44,31,24,0.08)] overflow-hidden relative h-full min-h-[320px] lg:min-h-[560px]">
              {/* Map badge */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-[0_2px_12px_rgba(44,31,24,0.12)]">
                <span className="material-symbols-outlined text-primary text-[18px]" data-icon="location_on" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                <span className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso">Oklahoma City</span>
              </div>

              {/* Map pin overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className="relative">
                  <div className="absolute -inset-4 bg-primary/10 rounded-full animate-pulse"></div>
                  <span className="material-symbols-outlined text-primary text-4xl drop-shadow-lg" data-icon="location_on" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
              </div>

              {/* Embedded map with sepia filter */}
              <iframe
                title="Jessica Eyebrow Threading — Oklahoma City"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3245.147073038!2d-97.5771!3d35.5026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b21731e7971819%3A0x19ffd3e21f3c3d74!2s4503%20NW%2036th%20St%2C%20Oklahoma%20City%2C%20OK%2073122!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full border-0 absolute inset-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ filter: 'sepia(25%) saturate(75%) hue-rotate(10deg) brightness(1.02)' }}
              />
            </div>
          </div>

          {/* ── Right Column — Contact Cards ── */}
          <div className="flex flex-col gap-6">

            {/* Row 1 — Two cards side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Card 1: Boutique Location */}
              <div
                className={`bg-toasted-cream rounded-tl-xl rounded-tr rounded-br rounded-bl p-8 border border-dusty-peach/40 shadow-[0_4px_20px_rgba(44,31,24,0.08)] group hover:-translate-y-1 transition-all duration-500 ease-out delay-200 ${
                  cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl" data-icon="storefront">storefront</span>
                  </div>
                  <h2 className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso">Boutique Location</h2>
                </div>
                <div className="font-body text-[15px] text-on-surface-variant leading-relaxed space-y-0.5 mb-5">
                  <p>4503 Northwest 36th Street,</p>
                  <p>Oklahoma City, OK</p>
                </div>
                <a
                  href="https://maps.google.com/?q=4503+NW+36th+St+Oklahoma+City+OK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-body text-[12px] font-medium text-primary tracking-wider uppercase group-hover:gap-2.5 transition-all duration-300 py-2 -my-2"
                >
                  Get Directions
                  <span className="material-symbols-outlined text-[16px]" data-icon="arrow_forward">arrow_forward</span>
                </a>
              </div>

              {/* Card 2: Direct Line + Hours */}
              <div
                className={`bg-toasted-cream rounded-tl-xl rounded-tr rounded-br rounded-bl p-8 border border-dusty-peach/40 shadow-[0_4px_20px_rgba(44,31,24,0.08)] hover:-translate-y-1 transition-all duration-500 ease-out delay-300 ${
                  cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                {/* Phone */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl" data-icon="call">call</span>
                  </div>
                  <h2 className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso">Direct Line</h2>
                </div>
                <a
                  href="tel:+15722405888"
                  className="font-display text-[22px] text-primary hover:text-espresso transition-colors block mb-5 py-1"
                >
                  572-240-5888
                </a>

                {/* Divider */}
                <div className="border-t border-dusty-peach/50 my-4"></div>

                {/* Hours */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-xl" data-icon="schedule">schedule</span>
                  </div>
                  <h2 className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso">Hours</h2>
                </div>
                <div className="font-body text-[14px] text-on-surface-variant leading-relaxed space-y-1">
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface font-medium">Tue – Thu</span>
                    <span>11:00 AM CST – 7:00 PM CST</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface font-medium">Fri – Sun</span>
                    <span>11:00 AM CST – 8:00 PM CST</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-on-surface font-medium">Monday</span>
                    <span className="text-primary">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 — Full-width WhatsApp Card */}
            <div
              className={`relative bg-toasted-cream rounded-tl-xl rounded-tr rounded-br rounded-bl p-8 md:p-10 border border-dusty-peach/40 shadow-[0_4px_20px_rgba(44,31,24,0.08)] hover:-translate-y-1 transition-all duration-500 ease-out delay-[400ms] ${
                cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Decorative dots */}
              <div className="absolute top-4 right-4 opacity-[0.04] pointer-events-none select-none hidden md:block">
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><circle cx="8" cy="8" r="3" fill="#7e5232"/><circle cx="28" cy="8" r="3" fill="#7e5232"/><circle cx="48" cy="8" r="3" fill="#7e5232"/><circle cx="68" cy="8" r="3" fill="#7e5232"/><circle cx="8" cy="28" r="3" fill="#7e5232"/><circle cx="28" cy="28" r="3" fill="#7e5232"/><circle cx="48" cy="28" r="3" fill="#7e5232"/><circle cx="68" cy="28" r="3" fill="#7e5232"/><circle cx="8" cy="48" r="3" fill="#7e5232"/><circle cx="28" cy="48" r="3" fill="#7e5232"/><circle cx="48" cy="48" r="3" fill="#7e5232"/><circle cx="68" cy="48" r="3" fill="#7e5232"/></svg>
              </div>
              <div className="relative z-10">
                <h2 className="font-display text-[28px] md:text-[36px] text-espresso mb-3 leading-tight">
                  Prefer to <span className="italic text-primary">text?</span>
                </h2>
                <p className="font-body text-[15px] md:text-[16px] text-on-surface-variant leading-relaxed mb-8 max-w-lg">
                  Reach out directly via WhatsApp for quick questions or to arrange a bespoke appointment time.
                </p>
                <a
                  href="https://wa.me/15722405888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-xl relative z-[2]" data-icon="chat" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                  <span>CHAT WITH US</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Additional Info Strip ── */}
      <div className="w-full max-w-desktop-max-width px-margin-mobile md:px-gutter mx-auto mt-16 md:mt-24">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 md:divide-x divide-dusty-peach/30 rounded-tl-xl rounded-tr rounded-br rounded-bl overflow-hidden border border-dusty-peach/40 shadow-[0_4px_20px_rgba(44,31,24,0.06)] transition-all duration-700 ease-out delay-500 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          {/* Walk-ins */}
          <div className="bg-toasted-cream p-8 text-center group hover:bg-surface transition-colors duration-300">
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300" data-icon="door_open">door_open</span>
            <h3 className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso mb-2">Walk-Ins Welcome</h3>
            <p className="font-body text-[14px] text-on-surface-variant">No appointment needed — drop by anytime during business hours.</p>
          </div>

          {/* Parking */}
          <div className="bg-toasted-cream p-8 text-center group hover:bg-surface transition-colors duration-300">
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300" data-icon="local_parking">local_parking</span>
            <h3 className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso mb-2">Free Parking</h3>
            <p className="font-body text-[14px] text-on-surface-variant">Complimentary parking directly in front of our boutique.</p>
          </div>

          {/* Accessibility */}
          <div className="bg-toasted-cream p-8 text-center group hover:bg-surface transition-colors duration-300">
            <span className="material-symbols-outlined text-primary text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300" data-icon="accessible">accessible</span>
            <h3 className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-espresso mb-2">Fully Accessible</h3>
            <p className="font-body text-[14px] text-on-surface-variant">Ground-level entry with wheelchair-friendly access throughout.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
