import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHeroReveal, useScrollReveal } from '../hooks/useScrollReveal';
import { Helmet } from 'react-helmet-async';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-dusty-peach/30 pb-4 h-fit break-inside-avoid mb-6">
      <button 
        className="w-full flex justify-between items-start text-left focus:outline-none group py-2" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-display text-[18px] md:text-[20px] text-espresso group-hover:text-primary transition-colors pr-4 leading-tight">{question}</span>
        <span 
          className={`material-symbols-outlined text-primary transform transition-transform duration-300 mt-0.5 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
          data-icon="expand_more"
        >
          expand_more
        </span>
      </button>
      <div 
        className="transition-all duration-400 ease-out overflow-hidden"
        style={{
          maxHeight: isOpen ? '500px' : '0px',
          opacity: isOpen ? 1 : 0,
          paddingTop: isOpen ? '1rem' : '0px',
        }}
      >
        <p className="font-body text-[15px] text-on-surface-variant leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};

const Faq = () => {
  const heroVisible = useHeroReveal();
  const [faqGridRef, faqGridVisible] = useScrollReveal();
  const [ctaRef, ctaVisible] = useScrollReveal();

  const faqs = [
    { q: "Is eyebrow threading painful?", a: "Most clients experience minimal discomfort, and the service becomes easier with regular visits." },
    { q: "Is threading better than waxing?", a: "Threading offers better precision and less irritation for many clients." },
    { q: "How long do results last?", a: "Typically, 2-4 weeks, depending on hair growth." },
    { q: "Can I walk in without an appointment?", a: "Yes, walk-ins are welcome when availability allows." },
    { q: "Is brow lamination safe?", a: "Yes, when professionally performed and properly maintained." },
    { q: "Can sensitive skin clients get threading?", a: "Absolutely. Threading is often a great option for sensitive skin." },
    { q: "How long does tinting last?", a: "Usually 2-3 weeks depending on skin type and aftercare." },
    { q: "Do you sanitize tools?", a: "Yes, hygiene and cleanliness are a top priority." },
    { q: "Can I wear makeup after threading?", a: "It is best to avoid heavy makeup for several hours." },
    { q: "How often should I thread my eyebrows?", a: "Most clients return every 2-4 weeks." },
    { q: "Does facial threading cause breakouts?", a: "Some redness is normal, but proper aftercare helps reduce irritation." },
    { q: "What should I avoid after brow lamination?", a: "Avoid water, steam, and heavy products for the first 24 hours." },
    { q: "Is eyebrow tinting good for light brows?", a: "Yes, tinting helps light brows appear fuller and more defined." },
    { q: "Can I get threading before an event?", a: "Yes, but booking 1-2 days before a major event is ideal." },
    { q: "Do you offer full face threading?", a: "Yes, full face threading is available." },
    { q: "Do you offer facial waxing?", a: "Yes, facial waxing services are available." },
    { q: "Is threading chemical-free?", a: "Yes, threading does not require wax or harsh chemicals." },
    { q: "How long does eyebrow threading take?", a: "Most eyebrow threading appointments are quick and efficient." },
    { q: "Can I choose my brow shape?", a: "Yes, your brow shape is customized to your preference and facial features." },
    { q: "Do you offer henna services?", a: "Yes, henna services start at $15." },
    { q: "Do you offer lash tinting?", a: "Yes, eyelash tinting is available." },
    { q: "Is there parking nearby?", a: "Yes, we have ample parking available for our clients right in front of the salon." },
    { q: "Do you offer student promotions?", a: "Seasonal and promotional offers may be available." },
    { q: "Can men get threading services?", a: "Yes, threading services can be customized for all clients." },
    { q: "What if my skin is red after threading?", a: "Mild redness is normal and usually fades quickly." },
    { q: "Do I need to grow my brows before threading?", a: "A small amount of growth helps create a cleaner shape." },
    { q: "Can I get tinting and lamination together?", a: "Yes, combo tint and lamination is available." },
    { q: "What is the price for eyebrow threading?", a: "Eyebrow threading is $10." },
    { q: "What is the full face threading price?", a: "Full face threading is $35." },
    { q: "How do I book?", a: "Call 572-240-5888 or use the website appointment form." }
  ];

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
        "@id": "https://jessicaeyebrowthreading.com/faq/#breadcrumb",
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
            "name": "FAQ",
            "item": "https://jessicaeyebrowthreading.com/faq"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://jessicaeyebrowthreading.com/faq/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is eyebrow threading painful?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most clients experience minimal discomfort, and the service becomes easier with regular visits."
            }
          },
          {
            "@type": "Question",
            "name": "Is threading better than waxing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Threading offers better precision and less irritation for many clients."
            }
          },
          {
            "@type": "Question",
            "name": "How long do results last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically, 2-4 weeks, depending on hair growth."
            }
          },
          {
            "@type": "Question",
            "name": "Can I walk in without an appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, walk-ins are welcome when availability allows."
            }
          },
          {
            "@type": "Question",
            "name": "Is brow lamination safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, when professionally performed and properly maintained."
            }
          },
          {
            "@type": "Question",
            "name": "Can sensitive skin clients get threading?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Threading is often a great option for sensitive skin."
            }
          },
          {
            "@type": "Question",
            "name": "How long does tinting last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Usually 2-3 weeks depending on skin type and aftercare."
            }
          },
          {
            "@type": "Question",
            "name": "Do you sanitize tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, hygiene and cleanliness are a top priority."
            }
          },
          {
            "@type": "Question",
            "name": "What is the price for eyebrow threading?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Eyebrow threading is $10."
            }
          },
          {
            "@type": "Question",
            "name": "How do I book?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Call 572-240-5888 or use the website appointment form."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-20 md:pt-24 pb-12 md:pb-20 overflow-x-hidden">
      <Helmet>
        <title>Frequently Asked Questions | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="Find answers to common questions about eyebrow threading, brow lamination, tinting, and facial waxing at Jessica Eyebrow Threading in Oklahoma City." />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/faq" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Frequently Asked Questions | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="Find answers to common questions about eyebrow threading, brow lamination, tinting, and facial waxing at Jessica Eyebrow Threading in Oklahoma City." />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/faq" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/faq-hero.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      
      {/* Hero Section */}
      <section className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter mb-10 md:mb-16 relative">
        <div className="absolute top-1/4 right-1/4 translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className={`lg:col-span-6 relative group order-2 lg:order-1 transition-all duration-700 ease-out delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2.5rem] rounded-tl-sm rounded-br-sm overflow-hidden shadow-[0_20px_50px_rgba(126,82,50,0.08)] relative border border-outline-variant/20">
                <img 
                  src="/faq-hero.png" 
                  alt="Elegant reception area of Jessica Eyebrow Threading"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/5 to-white/10 pointer-events-none"></div>
            </div>
          </div>

          <div className={`lg:col-span-6 order-1 lg:order-2 transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-4 block uppercase">
              Get Answers
            </span>
            <h1 className="font-display text-[32px] sm:text-[44px] md:text-[64px] text-espresso mb-6 leading-tight">
              Frequently Asked <br className="hidden md:block" /><span className="italic text-primary">Questions</span>
            </h1>
            <p className="font-display text-[22px] md:text-[28px] text-primary italic mb-6">
              "Confidence Begins with Beautiful Brows."
            </p>
            <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed mb-8">
              We know that finding the perfect brow and beauty artist requires trust. Browse through our most common inquiries below to learn more about our process, hygiene standards, and treatments.
            </p>
            <div className="flex gap-6 flex-wrap items-center">
              <Link to="/pricing#book-appointment" className="btn-primary shadow-lg shadow-primary/20">
                <span>Reserve Your Appointment</span>
              </Link>
              <a href="tel:5722405888" className="group flex items-center gap-3 text-espresso hover:text-primary transition-colors">
                <span className="w-12 h-12 rounded-full border border-dusty-peach flex items-center justify-center bg-white group-hover:bg-primary/5 transition-colors shadow-sm">
                  <span className="material-symbols-outlined text-primary text-xl">call</span>
                </span>
                <div className="flex flex-col">
                  <span className="font-body text-[11px] uppercase tracking-widest text-on-surface-variant group-hover:text-primary transition-colors">Call Now</span>
                  <span className="font-display text-[18px] leading-none font-medium">(572) 240-5888</span>
                </div>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Grid Section */}
      <section className="py-12 md:py-20 bg-surface-container-low border-y border-outline-variant/20 relative" ref={faqGridRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className={`columns-1 md:columns-2 gap-10 md:gap-16 transition-all duration-700 ease-out ${faqGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 text-center" ref={ctaRef}>
        <h2 className={`font-display text-[32px] md:text-[42px] text-espresso mb-4 transition-all duration-700 ease-out ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Beauty Starts With <span className="italic text-primary">Perfect Brows</span>
        </h2>
        <p className="font-body text-[16px] text-on-surface-variant mb-8">
          Ready to experience the difference? Your Brow Destination in Oklahoma City awaits.
        </p>
        <Link to="/pricing#book-appointment" className="btn-primary inline-flex">
          <span>Get Perfect Brows Today</span>
        </Link>
      </section>

    </div>
  );
};

export default Faq;
