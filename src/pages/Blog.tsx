import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogData } from '../blog/blogData';
import { useHeroReveal, useScrollReveal } from '../hooks/useScrollReveal';


const Blog = () => {
  const heroVisible = useHeroReveal();
  const [gridRef, gridVisible] = useScrollReveal(0.05);

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
        "@id": "https://jessicaeyebrowthreading.com/blog/#breadcrumb",
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
            "name": "Blog",
            "item": "https://jessicaeyebrowthreading.com/blog"
          }
        ]
      }
    ]
  };

  return (
    <div className="pt-20 md:pt-24 pb-12 md:pb-20 bg-background min-h-screen">
      <Helmet>
        <title>Beauty & Brow Care Blog | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content="Beauty tips, brow care guidance, and expert advice from Jessica Eyebrow Threading in Oklahoma City, OK." />
        <meta name="keywords" content="eyebrow threading Oklahoma City, brow lamination OKC, facial threading near me, brow studio Oklahoma" />
        <link rel="canonical" href="https://jessicaeyebrowthreading.com/blog" />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Beauty & Brow Care Blog | Jessica Eyebrow Threading — Oklahoma City" />
        <meta property="og:description" content="Beauty tips, brow care guidance, and expert advice from Jessica Eyebrow Threading in Oklahoma City, OK." />
        <meta property="og:url" content="https://jessicaeyebrowthreading.com/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/service_eyebrow_threading.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      {/* Header */}
      <section className="text-center mb-12 md:mb-16 px-margin-mobile md:px-gutter mt-8">
        <div className={`transition-all duration-700 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <span className="font-body text-[11px] font-medium text-primary tracking-[0.22em] mb-2 block uppercase">
          Expert Advice
        </span>
        <h1 className="font-display text-[38px] md:text-[58px] text-espresso leading-none mb-4">
          Beauty &amp; Brow Care Blog
        </h1>
        <p className="font-body text-[15px] md:text-[18px] text-on-surface-variant max-w-2xl mx-auto">
          Beauty tips, brow care guidance, and expert advice from Jessica Eyebrow Threading.
        </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-desktop-max-width mx-auto px-margin-mobile md:px-gutter" ref={gridRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((post, idx) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col h-full bg-surface-container-low rounded-2xl border border-outline-variant/30 overflow-hidden hover:shadow-[0_10px_30px_rgba(126,82,50,0.08)] hover:border-dusty-peach transition-all duration-300"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: `opacity 0.35s ease-out ${idx * 40}ms, transform 0.35s ease-out ${idx * 40}ms`,
              }}
            >
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <span className="font-body text-[10px] uppercase tracking-widest text-primary mb-3 bg-[#E8C9B5]/30 w-fit px-2 py-1 rounded-sm">
                  {post.category || 'Article'}
                </span>
                <h2 className="font-display text-[22px] md:text-[24px] text-espresso leading-tight mb-3 group-hover:text-primary transition-colors capitalize">
                  {post.title || post.slug.replace(/-/g, ' ')}
                </h2>
                <p className="font-body text-[14px] text-on-surface-variant line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {post.excerpt || 'Stay tuned for expert tips and beauty insights in this upcoming article.'}
                </p>
                <div className="flex items-center gap-1 font-body text-[12px] font-medium text-primary uppercase tracking-widest mt-auto group-hover:gap-2 transition-all">
                  Read More <span className="material-symbols-outlined text-[16px]">arrow_right_alt</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blog;
