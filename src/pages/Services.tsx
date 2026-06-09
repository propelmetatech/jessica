import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHeroReveal, useScrollReveal } from '../hooks/useScrollReveal';
import { Helmet } from 'react-helmet-async';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-dusty-peach/30 pb-4">
      <button 
        className="w-full flex justify-between items-center text-left focus:outline-none group py-2" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-display text-[22px] text-espresso group-hover:text-primary transition-colors pr-4">{question}</span>
        <span 
          className={`material-symbols-outlined text-primary transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
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
          paddingTop: isOpen ? '1.25rem' : '0px',
          paddingBottom: isOpen ? '1.5rem' : '0px'
        }}
      >
        <p className="font-body text-[16px] text-on-surface-variant leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};

const Services = () => {
  const heroVisible = useHeroReveal();
  const [servicesRef, servicesVisible] = useScrollReveal();
  const [faqRef, faqVisible] = useScrollReveal();

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
        "@id": "https://jessicaeyebrowthreading.com/services/#breadcrumb",
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
            "name": "Services",
            "item": "https://jessicaeyebrowthreading.com/services"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://jessicaeyebrowthreading.com/services/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is threading painful?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While everyone's pain tolerance is different, threading is generally considered less painful than waxing because it doesn't pull on the skin, only the hair. We work gently to ensure your comfort and provide a soothing experience."
            }
          },
          {
            "@type": "Question",
            "name": "How long do results last?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Typically, hair regrowth occurs within 3 to 4 weeks depending on your individual hair growth cycle. Consistent threading can actually slow down hair growth over time, leading to finer and sparser regrowth."
            }
          },
          {
            "@type": "Question",
            "name": "Can I wear makeup after my appointment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We recommend waiting at least 2-4 hours before applying heavy makeup or skincare products to the threaded area. This allows the pores to close naturally and prevents potential irritation or breakouts."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-20 md:pt-28">
      <Helmet>
        <title>Services | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="Explore our premium beauty services in Oklahoma City: eyebrow threading, brow lamination, facial threading, tinting & waxing. View our full service list." />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/services" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Services | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="Explore our premium beauty services in Oklahoma City: eyebrow threading, brow lamination, facial threading, tinting & waxing. View our full service list." />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/services" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/service_eyebrow_threading.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter mb-section-v-mobile md:mb-section-v-desktop relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className={`lg:col-span-5 z-10 transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-white/90 backdrop-blur-md p-6 sm:p-8 lg:p-12 rounded-2xl border border-[#d5c3b9]/40 shadow-xl lg:-mr-40 relative">
              <span className="font-body text-[12px] md:text-[13px] font-medium text-primary tracking-[0.2em] mb-4 block uppercase">Our Menu</span>
              <h1 className="font-display text-[32px] sm:text-[40px] md:text-[56px] text-espresso mb-6 leading-tight">Beauty Services in <br/><span className="italic text-primary">Oklahoma City</span></h1>
              <p className="font-display text-[18px] md:text-[20px] text-on-surface-variant leading-relaxed mb-6">Experience the meticulous artistry of our threading and beauty services. Each treatment is tailored to your unique features in a serene, intimate environment.</p>
              <div className="w-12 h-[2px] bg-primary/20"></div>
            </div>
          </div>
          <div className={`lg:col-span-7 relative transition-all duration-700 ease-out delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full h-[400px] md:h-[600px] bg-toasted-cream rounded-sm overflow-hidden shadow-2xl relative">
              <img alt="Close-up of a professional beauty treatment setup." className="w-full h-full object-cover opacity-90 transition-opacity duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_dp8p02QwMcBxlafdIlSh25Ssk1VC_98a3juQ4YnJE2--IXmQpXrCuuNfXGxGtjcg-r5VF8OZAzUC2UUrJFcQC7_5mQL0nTwSYnKLL2XTg909xzwFw0XuSWWM67kIsJNg3VUwSR70CAbe-OilZGxmqiIph__zQsO1wlQ1pUGeS5hqXpJBoqjnmpBAYB9ZP3g3PB-spqx5qJc406YvL6w2SuRaUYiBnro6j0pBAXewrNcB9idUx3DOTcPA2f8NEkcJ30GTUudkfuqC"/>
              <div className="absolute inset-0 bg-primary/5 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="bg-surface-container-low py-section-v-mobile md:py-section-v-desktop border-t border-outline-variant/20" ref={servicesRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 transition-all duration-700 ease-out ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h2 className="font-display text-[28px] md:text-[42px] text-espresso mb-2 md:mb-0">The <span className="italic text-primary">Menu</span></h2>
            </div>
            <div className="flex flex-col md:items-end gap-5 max-w-sm text-left md:text-right">
              <p className="font-body text-[16px] text-on-surface-variant">Select from our curated menu of threading and beauty services, performed with absolute precision.</p>
              <Link to="/pricing#book-appointment" className="btn-primary inline-flex">
                <span>BOOK YOUR APPOINTMENT TODAY</span>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Eyebrow Threading', desc: 'Define your face with perfectly sculpted brows customized to your features.', img: '/service_eyebrow_threading.png' },
              { title: 'Facial Threading', desc: 'Smooth, hair-free skin with gentle threading is ideal for sensitive skin.', img: '/service_facial_threading.png' },
              { title: 'Brow Lamination', desc: 'Achieve fuller, lifted, fluffy brows with long-lasting definition.', img: '/service_brow_lamination.png' },
              { title: 'Eyebrow Tinting', desc: 'Enhance colour, shape, and depth for naturally bold brows.', img: '/service_eyebrow_tinting.png' },
              { title: 'Facial Waxing', desc: 'Quick and effective facial hair removal for silky smooth skin.', img: '/service_facial_waxing.png' },
              { title: 'Head Massage', desc: 'Relax, recharge, and refresh with soothing stress-relief massage therapy.', img: '/service_head_massage.png' },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-background rounded-[2rem] rounded-tr-sm rounded-bl-sm overflow-hidden shadow-[0_10px_30px_rgba(120,87,70,0.06)] hover:-translate-y-2 transition-all duration-500 group border border-dusty-peach/30 flex flex-col"
                style={{
                  opacity: servicesVisible ? 1 : 0,
                  transform: servicesVisible ? 'translateY(0)' : 'translateY(48px)',
                  transition: `opacity 0.6s ease-out ${100 + idx * 80}ms, transform 0.6s ease-out ${100 + idx * 80}ms`,
                }}
              >
                <div className="w-full h-[240px] overflow-hidden relative">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-display text-[26px] text-espresso mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="font-body text-[16px] text-on-surface-variant leading-relaxed flex-1">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-section-v-mobile md:py-section-v-desktop bg-background w-full" ref={faqRef}>
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-0">
          <h2 className={`font-display text-[28px] md:text-[42px] text-espresso text-center mb-12 transition-all duration-700 ease-out ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Frequent <span className="italic text-primary">Inquiries</span>
          </h2>
          <div className={`space-y-4 transition-all duration-700 ease-out delay-200 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <FAQItem 
              question="Is threading painful?" 
              answer="While everyone's pain tolerance is different, threading is generally considered less painful than waxing because it doesn't pull on the skin, only the hair. We work gently to ensure your comfort and provide a soothing experience."
            />
            <FAQItem 
              question="How long do results last?" 
              answer="Typically, hair regrowth occurs within 3 to 4 weeks depending on your individual hair growth cycle. Consistent threading can actually slow down hair growth over time, leading to finer and sparser regrowth."
            />
            <FAQItem 
              question="Can I wear makeup after my appointment?" 
              answer="We recommend waiting at least 2-4 hours before applying heavy makeup or skincare products to the threaded area. This allows the pores to close naturally and prevents potential irritation or breakouts."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
