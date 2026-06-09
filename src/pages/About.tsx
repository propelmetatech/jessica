import { Link } from 'react-router-dom';
import { useHeroReveal, useScrollReveal } from '../hooks/useScrollReveal';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const heroVisible = useHeroReveal();
  const [philosophyRef, philosophyVisible] = useScrollReveal();
  const [detailsRef, detailsVisible] = useScrollReveal();

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
        "@id": "https://jessicaeyebrowthreading.com/about/#breadcrumb",
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
            "name": "About Us",
            "item": "https://jessicaeyebrowthreading.com/about"
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-20 md:pt-24 pb-8 md:pb-12 overflow-x-hidden">
      <Helmet>
        <title>About Us | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="Learn about Jessica Eyebrow Threading in Oklahoma City. Discover our expert techniques, years of experience, and dedication to flawless natural beauty." />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/about" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="About Us | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="Learn about Jessica Eyebrow Threading in Oklahoma City. Discover our expert techniques, years of experience, and dedication to flawless natural beauty." />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/studio-sanctuary.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>
      {/* Hero Section */}
      <section className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter mb-10 md:mb-16 relative">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Text */}
          <div className={`lg:col-span-7 transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-4 block uppercase">
              Our Story
            </span>
            <h1 className="font-display text-[32px] sm:text-[44px] md:text-[64px] text-espresso mb-8 leading-tight">
              About <br className="md:hidden" /><span className="italic text-primary">Jessica Eyebrow Threading</span>
            </h1>
            <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed mb-6">
              Jessica Eyebrow Threading was created with one simple vision — helping women feel beautiful, confident, and empowered through expertly crafted beauty services.
            </p>
            <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed mb-8">
              Located in the heart of Oklahoma City, our salon combines traditional threading artistry with modern beauty techniques to deliver precise, elegant results for every client.
            </p>
            <p className="font-display text-[22px] md:text-[28px] text-primary italic">
              "We believe beauty should feel luxurious without being expensive."
            </p>
          </div>

          {/* Right: Cinematic Studio Image */}
          <div className={`lg:col-span-5 relative group transition-all duration-700 ease-out delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="w-full aspect-[4/5] rounded-[2.5rem] rounded-tr-sm rounded-bl-sm overflow-hidden shadow-[0_20px_50px_rgba(126,82,50,0.08)] relative border border-outline-variant/20">
                <img 
                  src="/studio-sanctuary.png" 
                  alt="Jessica Eyebrow Threading tranquil studio environment"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy */}
      <section className="py-10 md:py-16 bg-surface-container-low border-y border-outline-variant/20 relative" ref={philosophyRef}>
        <div className={`max-w-4xl mx-auto px-margin-mobile md:px-gutter text-center transition-all duration-700 ease-out ${philosophyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="material-symbols-outlined text-primary text-4xl mb-6" data-icon="spa">spa</span>
          <h2 className="font-display text-[32px] md:text-[42px] text-espresso mb-6">
            Our Beauty <span className="italic text-primary">Philosophy</span>
          </h2>
          <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
            Beauty is personal. That is why every brow shape, tint, and treatment is customized specifically for your facial structure, style, and comfort. We focus on enhancing your natural beauty rather than creating overdone results.
          </p>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-10 md:py-16 bg-background" ref={detailsRef}>
        <div className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Why Threading */}
            <div className={`lg:col-span-6 bg-toasted-cream rounded-2xl p-8 md:p-12 border border-outline-variant/30 shadow-[0_8px_30px_rgba(126,82,50,0.04)] relative overflow-hidden transition-all duration-700 ease-out delay-100 ${detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/5 rounded-full blur-[60px] pointer-events-none"></div>
              <span className="font-body text-[13px] font-medium text-primary tracking-[0.2em] mb-3 block uppercase">The Superior Choice</span>
              <h2 className="font-display text-[32px] md:text-[40px] text-espresso mb-8 leading-tight">
                Why Threading Is Better Than Waxing
              </h2>
              <ul className="space-y-5 relative z-10">
                {[
                  'More precise than waxing',
                  'Gentler on sensitive skin',
                  'No harsh chemicals',
                  'Longer-lasting clean results',
                  'Less irritation and redness',
                  'Better definition and shaping',
                ].map(item => (
                  <li key={item} className="flex items-center gap-4 font-body text-[16px] text-on-surface-variant">
                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm text-primary">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right: Standards & Mission */}
            <div className={`lg:col-span-6 flex flex-col gap-12 lg:py-8 transition-all duration-700 ease-out delay-300 ${detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              {/* Hygiene */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">health_and_safety</span>
                  <h3 className="font-display text-[28px] text-espresso">Hygiene & Safety Standards</h3>
                </div>
                <p className="font-body text-[16px] text-on-surface-variant leading-relaxed">
                  Your safety matters to us. We maintain strict cleanliness standards, sanitized tools, fresh threading materials, and a clean salon environment to ensure every visit feels comfortable and professional.
                </p>
              </div>

              <div className="w-16 h-[1px] bg-outline-variant/50"></div>

              {/* Mission */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary text-3xl">volunteer_activism</span>
                  <h3 className="font-display text-[28px] text-espresso">Mission Statement</h3>
                </div>
                <p className="font-body text-[16px] md:text-[18px] text-espresso font-medium leading-relaxed italic">
                  "Our mission is to help every client leave feeling more confident, polished, and beautiful than when they arrived."
                </p>
              </div>

              <div className="mt-4">
                <Link to="/pricing#book-appointment" className="btn-primary inline-block">
                  <span>BOOK AN APPOINTMENT</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
