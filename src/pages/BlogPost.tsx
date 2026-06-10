import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { blogData } from '../blog/blogData';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const postUrl = `https://jessicaeyebrowthreading.com/blog/${post.slug}`;

  // JSON-LD Schema
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
        "@id": `${postUrl}/#breadcrumb`,
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
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": postUrl
          }
        ]
      },
      {
        "@type": "Article",
        "@id": `${postUrl}/#article`,
        "headline": post.title,
        "description": post.metaDescription || post.excerpt,
        "image": "https://jessicaeyebrowthreading.com/service_eyebrow_threading.png",
        "author": {
          "@type": "Organization",
          "name": "Jessica Eyebrow Threading"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Jessica Eyebrow Threading",
          "logo": {
            "@type": "ImageObject",
            "url": "https://jessicaeyebrowthreading.com/Logo.webp"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": postUrl
        }
      }
    ]
  };

  return (
    <div className="pt-24 md:pt-32 pb-16 bg-background min-h-screen">
      <Helmet>
        <title>{post.title || post.slug.replace(/-/g, ' ')} | Jessica Eyebrow Threading — Oklahoma City</title>
        <meta name="description" content={post.metaDescription || post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* GEO Tags */}
        <meta name="geo.region" content="US-OK" />
        <meta name="geo.placename" content="Oklahoma City" />
        <meta name="geo.position" content="35.5026;-97.5771" />
        <meta name="ICBM" content="35.5026, -97.5771" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={`${post.title || post.slug.replace(/-/g, ' ')} | Jessica Eyebrow Threading — Oklahoma City`} />
        <meta property="og:description" content={post.metaDescription || post.excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://jessicaeyebrowthreading.com/service_eyebrow_threading.png" />
        <meta property="og:site_name" content="Jessica Eyebrow Threading" />
        
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <article className="max-w-3xl mx-auto px-margin-mobile md:px-gutter">
        {/* Header */}
        <header className="mb-12 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 font-body text-[11px] font-medium text-primary tracking-[0.1em] uppercase hover:text-espresso transition-colors mb-6">
            <span className="material-symbols-outlined text-[16px]">arrow_left_alt</span> Back to Blog
          </Link>
          <span className="font-body text-[11px] font-medium text-on-surface-variant tracking-[0.2em] mb-4 block uppercase">
            {post.category || 'Article'}
          </span>
          <h1 className="font-display text-[36px] md:text-[52px] text-espresso leading-tight mb-6 capitalize">
            {post.title || post.slug.replace(/-/g, ' ')}
          </h1>
          <div className="w-16 h-0.5 bg-dusty-peach mx-auto"></div>
        </header>

        {/* Content */}
        <div className="prose prose-lg prose-headings:font-display prose-headings:text-espresso prose-headings:font-normal prose-h2:text-[28px] md:prose-h2:text-[32px] prose-p:font-body prose-p:text-on-surface-variant prose-p:leading-relaxed prose-a:text-primary max-w-none mb-16">
          {post.content && post.content.length > 0 ? (
            post.content.map((section, idx) => (
              <div key={idx} className="mb-10">
                <h2 className="mb-4">{section.heading}</h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="mb-4">{p}</p>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-surface-container-low rounded-2xl border border-outline-variant/30">
              <span className="material-symbols-outlined text-dusty-peach text-4xl mb-4 block opacity-50">edit_document</span>
              <h2 className="font-display text-[24px] text-espresso mb-2">Article in Progress</h2>
              <p className="font-body text-on-surface-variant">Our experts are currently writing this guide. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#F2EAE0] rounded-2xl p-8 md:p-12 text-center border border-[#d5c3b9]/30">
          <h3 className="font-display text-[28px] md:text-[34px] text-espresso mb-4">
            Ready for Perfect Brows?
          </h3>
          <p className="font-body text-[15px] text-on-surface-variant mb-6 max-w-md mx-auto">
            Book your appointment with our experts in Oklahoma City today and experience the difference of true artistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/pricing#book-appointment" className="btn-primary w-full sm:w-auto shadow-sm">
              <span>Book Appointment</span>
            </Link>
            <a href="tel:5722405888" className="btn-secondary w-full sm:w-auto bg-white hover:bg-[#E8C9B5]/20 border-dusty-peach/50 border">
              <span>Call 572-240-5888</span>
            </a>
          </div>

        </div>
      </article>
    </div>
  );
};

export default BlogPost;
