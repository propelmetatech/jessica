import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { InlineWidget } from 'react-calendly';

/* ─── types ─── */
type ServiceItem = { id: string; name: string; price: string; duration: string };
type Category    = { icon: string; label: string; services: ServiceItem[] };

const CATEGORIES: Category[] = [
  {
    icon: 'content_cut',
    label: 'Facial Threading',
    services: [
      { id: 't_eyebrow',   name: 'Eyebrow',   price: '$10', duration: '15 min' },
      { id: 't_upperlip',  name: 'Upper Lip', price: '$6',  duration: '10 min' },
      { id: 't_lowerlip',  name: 'Lower Lip', price: '$3',  duration: '5 min' },
      { id: 't_chin',      name: 'Chin',      price: '$7',  duration: '10 min' },
      { id: 't_forehead',  name: 'Forehead',  price: '$7',  duration: '10 min' },
      { id: 't_sides',     name: 'Sides',     price: '$8',  duration: '10 min' },
      { id: 't_cheeks',    name: 'Cheeks',    price: '$5',  duration: '10 min' },
      { id: 't_neck',      name: 'Neck',      price: '$6',  duration: '10 min' },
      { id: 't_fullface',  name: 'Full Face', price: '$35', duration: '45 min' },
    ],
  },
  {
    icon: 'face_retouching_natural',
    label: 'Facial Waxing',
    services: [
      { id: 'w_eyebrows',  name: 'Eyebrows',  price: '$11', duration: '15 min' },
      { id: 'w_upperlip',  name: 'Upper Lip', price: '$7',  duration: '10 min' },
      { id: 'w_chin',      name: 'Chin',      price: '$7',  duration: '10 min' },
      { id: 'w_forehead',  name: 'Forehead',  price: '$7',  duration: '10 min' },
      { id: 'w_sides',     name: 'Sides',     price: '$10', duration: '10 min' },
      { id: 'w_cheeks',    name: 'Cheeks',    price: '$6',  duration: '10 min' },
      { id: 'w_neck',      name: 'Neck',      price: '$8',  duration: '10 min' },
      { id: 'w_fullface',  name: 'Full Face', price: '$45', duration: '45 min' },
    ],
  },
  {
    icon: 'spa',
    label: 'Other Services',
    services: [
      { id: 'o_browtint',  name: 'Eyebrow Tinting',       price: '$13', duration: '15 min' },
      { id: 'o_lashtint',  name: 'Eye Lashes Tint',       price: '$10', duration: '15 min' },
      { id: 'o_browlam',   name: 'Eyebrow Lamination',    price: '$20', duration: '45 min' },
      { id: 'o_combotint', name: 'Combo Tint Lamination', price: '$25', duration: '60 min' },
      { id: 'o_henna',     name: 'Henna Start',           price: '$15', duration: '30 min' },
      { id: 'o_massage',   name: 'Head Massage',          price: '$15', duration: '20 min' },
    ],
  },
];

const ALL_SERVICES = CATEGORIES.flatMap(c => c.services);

/* ─── component ─── */
const Pricing = () => {
  const location = useLocation();

  /* scroll to booking block when arriving via /pricing#book-appointment */
  useEffect(() => {
    if (location.hash === '#book-appointment') {
      setTimeout(() => {
        document.getElementById('book-appointment')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);



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
        "@id": "https://jessicaeyebrowthreading.com/pricing/#breadcrumb",
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
            "name": "Pricing & Booking",
            "item": "https://jessicaeyebrowthreading.com/pricing"
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full pt-20 md:pt-24 pb-12 md:pb-20">
      <Helmet>
        <title>Services Pricing & Booking | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="View pricing and book your appointment for eyebrow threading, lamination, and facial waxing at Jessica Eyebrow Threading in Oklahoma City. Book online!" />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/pricing" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Services Pricing & Booking | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="View pricing and book your appointment for eyebrow threading, lamination, and facial waxing at Jessica Eyebrow Threading in Oklahoma City. Book online!" />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/service_eyebrow_threading.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      <div className="w-full max-w-[1280px] px-6 md:px-20 mx-auto">

        {/* ── Page Header ── */}
        <div className="text-center mb-8 md:mb-12">
          <span className="font-body text-[11px] font-medium text-on-surface-variant tracking-[0.22em] mb-1 block uppercase">
            Spa Menu
          </span>
          <h1 className="font-display text-[38px] md:text-[58px] text-primary leading-none mb-2">
            Pricing &amp; Services
          </h1>
          <p className="font-body text-[14px] text-on-surface-variant max-w-xl mx-auto">
            Transparent pricing for handcrafted treatments — tailored to your unique facial structure, performed with unhurried precision.
          </p>
        </div>

        {/* ── Services Grid ── */}
        <div className="bg-[#F2EAE0] rounded-xl p-6 md:p-10 shadow-[0_8px_30px_rgba(126,82,50,0.05)] border border-[#d5c3b9]/30 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {CATEGORIES.map(cat => (
              <div key={cat.label}>
                <div className="flex items-center gap-2 mb-4 border-b border-[#d5c3b9]/40 pb-3">
                  <span className="material-symbols-outlined text-primary text-xl">{cat.icon}</span>
                  <h2 className="font-display text-[24px] md:text-[28px] text-[#1c1c19]">{cat.label}</h2>
                </div>
                <div className="space-y-4">
                  {cat.services.map(svc => (
                    <div key={svc.id} className="group cursor-default">
                      <div className="flex items-baseline justify-between w-full mb-0.5">
                        <h3 className="font-body text-[16px] text-on-surface-variant group-hover:text-primary transition-colors font-medium">
                          {svc.name}
                        </h3>
                        <div className="dot-leader" />
                        <span className="font-body text-[16px] text-on-surface-variant group-hover:text-primary transition-colors font-medium w-10 text-left flex-shrink-0">{svc.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Appointment Booking ── */}
        <div
          id="book-appointment"
          className="bg-[#F2EAE0] rounded-xl p-6 md:p-10 shadow-[0_8px_30px_rgba(126,82,50,0.05)] border border-[#d5c3b9]/30 scroll-mt-28"
        >
          {/* Section heading */}
          <div className="mb-6">
            <span className="font-body text-[11px] font-medium text-on-surface-variant tracking-[0.22em] mb-0.5 block uppercase">
              Reserve Your Visit
            </span>
            <h2 className="font-display text-[28px] md:text-[38px] text-primary leading-none mb-1">
              Book an Appointment
            </h2>
            <p className="font-body text-[13px] text-on-surface-variant">
              Pick a date &amp; time, select your services, and we'll take care of the rest.
            </p>
          </div>

          <div className="bg-white/60 rounded-lg border border-[#d5c3b9]/30 overflow-hidden">
            <InlineWidget 
              url="https://calendly.com/jessicaeyebrowthreading/15" 
              styles={{ height: '700px', width: '100%' }} 
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Pricing;
