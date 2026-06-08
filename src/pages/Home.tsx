import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [animate, setAnimate] = useState(false);
  const [philosophyRef, philosophyVisible] = useScrollReveal();
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [transformRef, transformVisible] = useScrollReveal();
  const [testimonialsRef, testimonialsVisible] = useScrollReveal();
  const [connectRef, connectVisible] = useScrollReveal();
  const [locationRef, locationVisible] = useScrollReveal();

  useEffect(() => {
    // Trigger smooth entrance animations
    setAnimate(true);
  }, []);

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BeautySalon",
        "@id": "https://jessicaeyebrowthreading.com/#salon",
        "name": "Jessica Eyebrow Threading",
        "description": "Premium eyebrow threading, brow shaping, lamination, tinting, facial waxing, and head massage services in Oklahoma City.",
        "url": "https://jessicaeyebrowthreading.com/",
        "telephone": "+1-572-240-5888",
        "priceRange": "$6 - $55",
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
          "latitude": 35.5026,
          "longitude": -97.5771
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        },
        "areaServed": {
          "@type": "AdministrativeArea",
          "name": "Oklahoma City"
        },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61590243452121",
          "https://www.instagram.com/jessica_eyebrowsthreading/"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://jessicaeyebrowthreading.com/#website",
        "url": "https://jessicaeyebrowthreading.com/",
        "name": "Jessica Eyebrow Threading",
        "description": "Premium eyebrow threading, brow shaping, lamination, tinting, facial waxing, and head massage services in Oklahoma City.",
        "publisher": {
          "@id": "https://jessicaeyebrowthreading.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://jessicaeyebrowthreading.com/#organization",
        "name": "Jessica Eyebrow Threading",
        "url": "https://jessicaeyebrowthreading.com/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://jessicaeyebrowthreading.com/Logo.jpeg"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://jessicaeyebrowthreading.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Does eyebrow threading hurt?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Threading is generally less painful than waxing and becomes easier with regular appointments."
            }
          },
          {
            "@type": "Question",
            "name": "How long does eyebrow threading last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most clients enjoy results for 2-4 weeks, depending on hair growth."
            }
          },
          {
            "@type": "Question",
            "name": "Is threading safe for sensitive skin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Threading is one of the safest hair removal methods for sensitive skin because it avoids harsh chemicals."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-20 md:pt-28 overflow-x-hidden">
      <Helmet>
        <title>Eyebrow Threading | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="Book professional eyebrow threading, brow shaping & lamination at Jessica Eyebrow Threading in Oklahoma City, OK. Same-day appointments available. Call today!" />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Eyebrow Threading | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="Book professional eyebrow threading, brow shaping & lamination at Jessica Eyebrow Threading in Oklahoma City, OK. Same-day appointments available. Call today!" />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/hero-boutique.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter mb-section-v-mobile md:mb-section-v-desktop relative">
        {/* Soft Background Accent Dots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Left Content */}
          <div 
            className={`lg:col-span-6 z-10 lg:pr-8 transition-all duration-1000 ease-out transform ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-4 block uppercase">
              Oklahoma City's Premier Threading Studio
            </span>
            <h1 className="font-display text-[44px] sm:text-[56px] md:text-[72px] text-espresso mb-6 leading-[1.1]">
              Perfect Brows.<br />
              <span className="italic text-primary font-medium">Effortless Beauty.</span>
            </h1>
            <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              Experience precision eyebrow threading, flawless brow shaping, and luxury beauty services
              in Oklahoma City — designed to enhance your natural beauty with elegance and care.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6">
              <Link to="/pricing#book-appointment" className="btn-primary text-center">
                <span>BOOK YOUR APPOINTMENT</span>
              </Link>
              <Link
                to="/services"
                className="font-body text-[13px] font-medium text-espresso hover:text-primary tracking-[0.15em] uppercase border-b border-espresso hover:border-primary py-2 text-center transition-all duration-300"
              >
                VIEW SERVICES
              </Link>
              <a
                href="tel:+15722405888"
                className="font-body text-[13px] font-medium text-espresso hover:text-primary tracking-[0.15em] uppercase border-b border-espresso hover:border-primary py-2 text-center transition-all duration-300"
              >
                CALL NOW
              </a>
            </div>
            {/* Trust bar */}
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {['Affordable Luxury','Expert Brow Artists','Hygienic Beauty Care','Walk-Ins Welcome'].map(t => (
                <span key={t} className="flex items-center gap-1.5 font-body text-[12px] text-on-surface-variant">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block flex-shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Hero Right Media */}
          <div 
            className={`lg:col-span-6 relative transition-all duration-1000 delay-300 ease-out transform ${
              animate ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
            }`}
          >
            {/* Organic SVG Leaf Pattern as background element */}
            <div className="absolute -top-12 -right-8 w-48 h-48 opacity-10 text-primary pointer-events-none -z-10 select-none">
              <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
                <path d="M50 0C50 0 55 25 80 40C80 40 60 45 50 70C50 70 45 45 20 40C20 40 40 25 50 0Z" />
              </svg>
            </div>

            {/* Premium framed image container */}
            <div className="w-full h-[360px] sm:h-[480px] md:h-[540px] bg-toasted-cream rounded-tl-[6rem] rounded-br-[6rem] rounded-tr-sm rounded-bl-sm overflow-hidden shadow-[0_20px_50px_rgba(126,82,50,0.12)] border border-outline-variant/20 relative group">
              <img 
                alt="Jessica Eyebrow Threading serene boutique studio lounge with handcrafted ceramic vases and sunlit earth tones." 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="/hero-boutique.png"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-0"></div>
              
              {/* Sunbeam visual effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none"></div>
            </div>

            {/* Absolute badge detail */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-outline-variant/30 p-5 rounded-lg shadow-lg flex items-center gap-3 hidden sm:flex">
              <span className="material-symbols-outlined text-primary text-3xl" data-icon="verified">verified</span>
              <div>
                <p className="font-display text-[18px] text-espresso leading-none font-semibold">100% Cotton</p>
                <p className="font-body text-[11px] text-on-surface-variant tracking-wider uppercase mt-1">Zero skin pulling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-surface-container-low py-section-v-mobile md:py-section-v-desktop border-y border-outline-variant/20 relative" ref={philosophyRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-out ${philosophyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-3 block uppercase">Why Choose Us</span>
            <h2 className="font-display text-[32px] md:text-[48px] text-espresso leading-tight">
              Beauty is <span className="italic text-primary">Confidence</span>
            </h2>
            <div className="w-16 h-[2px] bg-primary/30 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Value 1 */}
            <div
              className="bg-background border border-dusty-peach/30 rounded-lg p-8 shadow-[0_4px_20px_rgba(120,87,70,0.03)] hover:shadow-[0_12px_30px_rgba(120,87,70,0.06)] hover:-translate-y-1 transition-all duration-500"
              style={{ opacity: philosophyVisible ? 1 : 0, transform: philosophyVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease-out 100ms, transform 0.6s ease-out 100ms` }}
            >
              <div className="w-12 h-12 bg-toasted-cream rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-2xl" data-icon="spa">spa</span>
              </div>
              <h3 className="font-display text-[22px] text-espresso mb-3">Our Philosophy</h3>
              <p className="font-body text-[15px] text-on-surface-variant leading-relaxed mb-5">
                At Jessica Eyebrow Threading, beauty is more than a service — it is confidence, self-care,
                and transformation. We specialize in precise threading designed for women who want clean,
                defined, natural-looking brows without harsh chemicals or irritation.
              </p>
            </div>

            {/* Value 2 */}
            <div
              className="bg-background border border-dusty-peach/30 rounded-lg p-8 shadow-[0_4px_20px_rgba(120,87,70,0.03)] hover:shadow-[0_12px_30px_rgba(120,87,70,0.06)] hover:-translate-y-1 transition-all duration-500"
              style={{ opacity: philosophyVisible ? 1 : 0, transform: philosophyVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease-out 220ms, transform 0.6s ease-out 220ms` }}
            >
              <div className="w-12 h-12 bg-toasted-cream rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-2xl" data-icon="verified">verified</span>
              </div>
              <h3 className="font-display text-[22px] text-espresso mb-4">What Sets Us Apart</h3>
              <ul className="space-y-2">
                {[
                  'Expert eyebrow shaping',
                  'Gentle for sensitive skin',
                  'Clean & hygienic environment',
                  'Affordable luxury beauty services',
                  'Fast walk-in friendly service',
                  'Customized brow mapping',
                  'Premium beauty care experience',
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 font-body text-[14px] text-on-surface-variant">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Value 3 */}
            <div
              className="bg-background border border-dusty-peach/30 rounded-lg p-8 shadow-[0_4px_20px_rgba(120,87,70,0.03)] hover:shadow-[0_12px_30px_rgba(120,87,70,0.06)] hover:-translate-y-1 transition-all duration-500"
              style={{ opacity: philosophyVisible ? 1 : 0, transform: philosophyVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease-out 340ms, transform 0.6s ease-out 340ms` }}
            >
              <div className="w-12 h-12 bg-toasted-cream rounded-full flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-2xl" data-icon="self_improvement">self_improvement</span>
              </div>
              <h3 className="font-display text-[22px] text-espresso mb-3">Your Sanctuary Awaits</h3>
              <p className="font-body text-[15px] text-on-surface-variant leading-relaxed">
                Step off the busy streets into our warm, intimate studio in Oklahoma City. Every visit
                is unhurried, personal, and crafted entirely around you and your natural features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-section-v-mobile md:py-section-v-desktop bg-background" ref={servicesRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className={`flex flex-col md:flex-row justify-between items-end mb-16 gap-6 transition-all duration-700 ease-out ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-3 block uppercase">Our Menu</span>
              <h2 className="font-display text-[32px] md:text-[42px] text-espresso">
                Featured <span className="italic text-primary">Services</span>
              </h2>
            </div>
            <p className="font-body text-[16px] text-on-surface-variant max-w-sm">
              A curated selection of our most popular beauty and grooming treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Eyebrow Threading', desc: 'Define your face with perfectly sculpted brows customized to your features.', icon: 'gesture' },
              { name: 'Facial Threading', desc: 'Smooth, hair-free skin with gentle threading is ideal for sensitive skin.', icon: 'face_retouching_natural' },
              { name: 'Brow Lamination', desc: 'Achieve fuller, lifted, fluffy brows with long-lasting definition.', icon: 'spa' },
              { name: 'Eyebrow Tinting', desc: 'Enhance colour, shape, and depth for naturally bold brows.', icon: 'palette' },
              { name: 'Facial Waxing', desc: 'Quick and effective facial hair removal for silky smooth skin.', icon: 'clean_hands' },
              { name: 'Head Massage', desc: 'Relax, recharge, and refresh with soothing stress-relief massage therapy.', icon: 'self_improvement' },
            ].map((svc, idx) => (
               <div
                 key={svc.name}
                 className="bg-background border border-dusty-peach/30 rounded-lg p-6 shadow-[0_4px_15px_rgba(120,87,70,0.02)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-500"
                 style={{ opacity: servicesVisible ? 1 : 0, transform: servicesVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease-out ${idx * 80}ms, transform 0.6s ease-out ${idx * 80}ms` }}
               >
                  <div className="flex items-center gap-3 mb-3 text-primary">
                    <span className="material-symbols-outlined text-[24px]" data-icon={svc.icon}>{svc.icon}</span>
                    <h3 className="font-display text-[22px] text-espresso">{svc.name}</h3>
                  </div>
                  <p className="font-body text-[14px] text-on-surface-variant">{svc.desc}</p>
               </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing" className="btn-primary inline-block">
              <span>EXPLORE ENTIRE MENU</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Brow Transformation Section */}
      <section className="py-section-v-mobile md:py-section-v-desktop bg-surface-container-low border-y border-outline-variant/20" ref={transformRef}>
         <div className={`max-w-4xl mx-auto px-margin-mobile md:px-gutter text-center transition-all duration-700 ease-out ${transformVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-3 block uppercase">The Transformation</span>
            <h2 className="font-display text-[32px] md:text-[42px] text-espresso mb-8">
              Brows frame your face and define your expression.
            </h2>
            <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed mb-6">
              Our threading specialists carefully shape each brow to complement your natural beauty, creating cleaner symmetry, softer definition, and effortless confidence.
            </p>
            <p className="font-body text-[16px] md:text-[18px] text-primary font-medium italic">
              At Jessica Eyebrow Threading, every detail matters — because your brows deserve artistry, not shortcuts.
            </p>
         </div>
      </section>

      {/* Guest Testimonial Section */}
      <section className="bg-espresso relative overflow-hidden py-section-v-mobile md:py-section-v-desktop px-margin-mobile md:px-gutter text-white" ref={testimonialsRef}>
        {/* Subtle noise/texture overlay matching other dark blocks */}
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')", mixBlendMode: 'overlay' }}></div>
        
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-body text-[13px] font-medium text-dusty-peach tracking-[0.2em] mb-3 block uppercase">Reviews</span>
            <h2 className="font-display text-[32px] md:text-[42px] text-toasted-cream leading-tight">
              Valuable customer <span className="italic text-dusty-peach font-medium">Trust</span>
            </h2>
            <div className="w-16 h-[2px] bg-dusty-peach/30 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { quote: 'Jessica is a brow genius! She took her time mapping out my eyebrows to match my face shape. The threading was incredibly precise and painless. My brows have never looked so symmetrical and clean.', name: 'Sarah K.' },
              { quote: 'This place is a hidden gem. Super clean, peaceful, and beautifully designed. Jessica was so gentle and did an amazing job with my brow lamination. Best beauty experience in OKC!', name: 'Sophia M.' },
              { quote: "I have very sensitive skin, and waxing always leaves me red. Threading with Jessica was so clean and didn't irritate my skin at all. She is fast, professional, and very affordable.", name: 'Emily W.' },
              { quote: 'Phenomenal service! I came in for eyebrow threading and tinting, and the results are stunning. Jessica is incredibly talented and friendly. The space feels like a luxury sanctuary.', name: 'Priya S.' },
            ].map(({ quote, name }, idx) => (
              <div
                key={name}
                className="flex flex-col gap-4"
                style={{ opacity: testimonialsVisible ? 1 : 0, transform: testimonialsVisible ? 'translateY(0)' : 'translateY(40px)', transition: `opacity 0.6s ease-out ${idx * 150}ms, transform 0.6s ease-out ${idx * 150}ms` }}
              >
                <div className="text-dusty-peach text-[14px] tracking-wider">
                  ★★★★★
                </div>
                <p className="font-display text-[18px] md:text-[20px] italic leading-snug font-light flex-1">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="w-8 h-[1px] bg-dusty-peach/40" />
                <cite className="font-body text-[12px] font-medium text-dusty-peach tracking-[0.2em] uppercase not-italic">
                  — {name}
                </cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect & FAQ Section (Combined) */}
      <section className="py-section-v-mobile md:py-section-v-desktop bg-background" ref={connectRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left: Instagram / Social Proof */}
            <div className={`flex flex-col transition-all duration-700 ease-out ${connectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-3 block uppercase">Connect With Us</span>
              <h2 className="font-display text-[32px] md:text-[42px] text-espresso mb-6">
                Daily Beauty <span className="italic text-primary">Inspiration</span>
              </h2>
              <p className="font-body text-[16px] text-on-surface-variant leading-relaxed mb-8 max-w-md">
                See real client transformations, beauty tips, brow trends, and exclusive promotions on Instagram and Facebook. Real results. Beautiful confidence.
              </p>
              <div className="flex gap-6">
                 <a href="https://www.instagram.com/jessica_eyebrowsthreading/" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] font-medium text-espresso hover:text-primary tracking-[0.15em] uppercase border-b border-espresso hover:border-primary py-2 transition-all duration-300 flex items-center gap-2">
                   Instagram
                 </a>
                 <a href="https://www.facebook.com/profile.php?id=61590243452121" target="_blank" rel="noopener noreferrer" className="font-body text-[13px] font-medium text-espresso hover:text-primary tracking-[0.15em] uppercase border-b border-espresso hover:border-primary py-2 transition-all duration-300 flex items-center gap-2">
                   Facebook
                 </a>
              </div>
            </div>

            {/* Right: FAQ Preview */}
            <div className={`flex flex-col transition-all duration-700 ease-out delay-200 ${connectVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-3 block uppercase">Common Questions</span>
              <h2 className="font-display text-[26px] md:text-[32px] text-espresso mb-8">
                Frequently Asked <span className="italic text-primary">Questions</span>
              </h2>
              <div className="space-y-4">
                {[
                  { q: 'Does eyebrow threading hurt?', a: 'Threading is generally less painful than waxing and becomes easier with regular appointments.' },
                  { q: 'How long does eyebrow threading last?', a: 'Most clients enjoy results for 2-4 weeks, depending on hair growth.' },
                  { q: 'Is threading safe for sensitive skin?', a: 'Yes. Threading is one of the safest hair removal methods for sensitive skin because it avoids harsh chemicals.' }
                ].map(faq => (
                   <div key={faq.q} className="bg-background border border-dusty-peach/30 rounded-lg p-5 sm:p-6 shadow-[0_2px_10px_rgba(120,87,70,0.02)]">
                      <h3 className="font-display text-[20px] text-espresso mb-2">{faq.q}</h3>
                      <p className="font-body text-[15px] text-on-surface-variant">{faq.a}</p>
                   </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Location, Hours, and Booking Card */}
      <section className="py-section-v-mobile md:py-section-v-desktop bg-surface-container-low border-t border-outline-variant/20" ref={locationRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className={`bg-toasted-cream rounded-2xl p-8 md:p-12 lg:p-16 border border-outline-variant/30 shadow-[0_8px_30px_rgba(126,82,50,0.04)] relative overflow-hidden transition-all duration-700 ease-out ${locationVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <span className="font-body text-[12px] font-semibold text-primary tracking-widest uppercase mb-3 block">Welcoming You</span>
                <h2 className="font-display text-[32px] md:text-[48px] text-espresso mb-6">Come Visit <span className="italic text-primary">Our Sanctuary</span></h2>
                <p className="font-body text-[15px] text-on-surface-variant mb-8 max-w-xl leading-relaxed">
                  Located in a serene spot, our boutique offers high-end precision treatments. 
                  Reserve your time slot in advance to ensure completely dedicated, unhurried attention.
                </p>
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5" data-icon="location_on">location_on</span>
                    <div>
                      <p className="font-display text-[18px] text-espresso font-semibold">Location</p>
                      <p className="font-body text-[14px] text-on-surface-variant mt-1">4503 Northwest 36th Street<br />Oklahoma City, OK 73122</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-xl mt-0.5" data-icon="schedule">schedule</span>
                    <div>
                      <p className="font-display text-[18px] text-espresso font-semibold">Hours</p>
                      <p className="font-body text-[14px] text-on-surface-variant mt-1">Tue – Sat: 9:00 AM CST – 7:00 PM CST<br />Sun – Mon: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-stretch lg:items-center justify-center bg-background border border-outline-variant/30 p-8 rounded-xl shadow-[0_10px_30px_rgba(126,82,50,0.03)] text-center">
                <h3 className="font-display text-[24px] text-espresso mb-2">Ready to Transform?</h3>
                <p className="font-body text-[14px] text-on-surface-variant mb-6 max-w-xs">
                  Bookings are quick and easy. Secure your customized treatment today.
                </p>
                <Link to="/pricing#book-appointment" className="btn-primary w-full text-center">
                  <span>BOOK AN APPOINTMENT</span>
                </Link>
                <a 
                  href="tel:+15722405888" 
                  className="font-body text-[12px] text-on-surface-variant hover:text-primary tracking-wider uppercase mt-4 block transition-colors duration-300"
                >
                  Or call 572-240-5888
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
