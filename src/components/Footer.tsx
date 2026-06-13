import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-espresso border-t border-secondary/20 text-toasted-cream">

      {/* 4 Columns — responsive layout */}
      <div className="w-full max-w-desktop-max-width mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-left">

        {/* Col 1 — Brand Info */}
        <div className="flex flex-col items-start gap-3">
          <img src="/Logo.webp" alt="Jessica Eyebrow Threading Logo" className="w-16 h-16 rounded-full object-cover border border-secondary/20 mb-1" />
          <div className="flex flex-col">
            <span className="font-display italic text-primary text-[26px] leading-none">Jessica</span>
            <span className="font-body text-[11px] tracking-[0.25em] uppercase text-toasted-cream/50 mt-1">Eyebrow Threading</span>
          </div>
          <p className="font-body text-[14px] text-toasted-cream/50 leading-relaxed max-w-[240px] mt-1">
            Handcrafted facial styling, precise eyebrow threading, and organic waxing services designed to enhance your natural beauty.
          </p>
          <div className="font-body text-[13px] text-toasted-cream/40 flex flex-col gap-1 mt-1">
            <span className="flex items-center gap-1.5">📍 4503 NW 36th St, OKC 73122</span>
            <span className="flex items-center gap-1.5">📞 572-240-5888</span>
            <span className="flex items-center gap-1.5">✉️ klucky1123@gmail.com</span>
          </div>
          <Link to="/pricing#book-appointment" className="btn-primary py-2.5 px-4 text-[13px] inline-block text-center rounded-md font-body transition-transform hover:scale-[1.02] mt-2">
            <span>Book Appointment</span>
          </Link>
        </div>

        {/* Col 2 — Opening Hours */}
        <div className="flex flex-col items-start gap-3 w-fit md:mx-auto">
          <span className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-toasted-cream/30">Hours</span>
          <div className="w-6 h-px bg-toasted-cream/10"></div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-start">
              <span className="font-body text-[13px] md:text-[15px] text-toasted-cream/70">Tue – Thu</span>
              <span className="font-body text-[13px] md:text-[14px] text-toasted-cream/50">11:00 AM CST – 7:00 PM CST</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-body text-[13px] md:text-[15px] text-toasted-cream/70">Fri – Sun</span>
              <span className="font-body text-[13px] md:text-[14px] text-toasted-cream/50">11:00 AM CST – 8:00 PM CST</span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-body text-[13px] md:text-[15px] text-toasted-cream/70">Monday</span>
              <span className="font-body text-[13px] md:text-[14px] text-dusty-peach/70">Closed</span>
            </div>
          </div>
        </div>

        {/* Col 3 — Useful Links */}
        <div className="flex flex-col items-start gap-3 w-fit md:mx-auto">
          <span className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-toasted-cream/30">Useful Links</span>
          <div className="w-6 h-px bg-toasted-cream/10"></div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" to="/">Home</Link>
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" to="/about">About</Link>
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" to="/services">Services</Link>
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" to="/pricing">Pricing</Link>
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" to="/contact">Contact</Link>
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" to="/faq">FAQ</Link>
            <Link className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors col-span-2 text-left" to="/blog">Blog</Link>
          </div>
        </div>

        {/* Col 4 — Connect */}
        <div className="flex flex-col items-start gap-3 w-fit md:mx-auto">
          <span className="font-body text-[12px] md:text-[13px] tracking-[0.2em] uppercase text-toasted-cream/30">Connect</span>
          <div className="w-6 h-px bg-toasted-cream/10"></div>
          <a className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" href="https://www.instagram.com/jessica_eyebrowsthreading/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" href="https://www.threads.com/@jessica_eyebrowsthreading?xmt=AQG0Uix70op_dvISdls92_T5ca9kvQbsIam619J_Y37W7cc" target="_blank" rel="noopener noreferrer">Threads</a>
          <a className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" href="https://www.facebook.com/profile.php?id=61590243452121" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" href="https://wa.me/15722405888?text=Hi%20Jessica!%20%F0%9F%91%8B%20I'd%20love%20to%20book%20an%20appointment.%20Could%20you%20please%20share%20your%20available%20slots%3F" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a className="font-body text-[14px] md:text-[16px] text-toasted-cream/60 hover:text-dusty-peach transition-colors text-left" href="mailto:klucky1123@gmail.com">Email Us</a>
        </div>

      </div>

      {/* Bottom Strip */}
      <div className="border-t border-toasted-cream/10 py-5 px-6 md:px-12">
        <div className="w-full max-w-[1280px] mx-auto flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4 text-left">
          <p className="font-body text-[15px] text-toasted-cream/40 flex items-center justify-start gap-1.5 order-2 md:order-1">
            <span>Powered by</span>
            <a href="https://propelmetatech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-toasted-cream/70 underline underline-offset-2 transition-colors duration-300 inline-flex items-center gap-1.5">
              <img src="/propel_logo.webp" alt="PropelMeta Tech LLC Logo" className="w-5 h-5 rounded-full object-cover border border-toasted-cream/10" />
              <span>PropelMeta Tech LLC</span>
            </a>
          </p>
          <p className="font-body text-[17px] text-toasted-cream/40 flex items-center justify-start md:justify-end gap-2 order-1 md:order-2">
            <img src="/Logo.webp" alt="Jessica Eyebrow Threading Logo" className="w-6 h-6 rounded-full object-cover border border-toasted-cream/10" />
            <span>© 2026 Jessica Eyebrow Threading. Handcrafted Elegance.</span>
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
