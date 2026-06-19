import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';

const NotFound = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full pt-20 md:pt-28 pb-section-v-mobile md:pb-section-v-desktop flex items-center justify-center min-h-[70vh]">
      <Helmet>
        <title>Page Not Found | Jessica Eyebrow Threading</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div
        className={`text-center max-w-lg mx-auto px-margin-mobile transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Large decorative number */}
        <p className="font-display text-[120px] md:text-[160px] text-primary/10 leading-none select-none mb-0">
          404
        </p>

        <h1 className="font-display text-[32px] md:text-[48px] text-primary -mt-4 mb-4 leading-tight">
          Page Not Found
        </h1>

        <p className="font-body text-[16px] md:text-[18px] text-on-surface-variant leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have moved.
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            <span>Go Home</span>
          </Link>
          <Link
            to="/pricing#book-appointment"
            className="inline-flex items-center justify-center gap-2 font-body text-[13px] font-medium tracking-[0.12em] uppercase text-primary border border-primary px-8 py-4 hover:bg-primary hover:text-white transition-colors duration-300"
          >
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Subtle decorative line */}
        <div className="mt-16 flex items-center gap-4 justify-center opacity-30">
          <div className="h-px w-12 bg-primary" />
          <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
          <div className="h-px w-12 bg-primary" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
