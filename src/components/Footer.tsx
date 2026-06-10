import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-espresso border-t border-secondary/20 text-toasted-cream">

      {/* Brand Centre Block */}
      <div className="flex flex-col items-center text-center pt-10 pb-8 px-6 border-b border-toasted-cream/10">
        <span className="font-display italic text-primary text-[28px] md:text-[34px] leading-none">Jessica</span>
        <span className="font-body text-[13px] md:text-[14px] tracking-[0.25em] uppercase text-toasted-cream/50 mt-1">Eyebrow Threading</span>
        <p className="font-body text-[14px] text-toasted-cream/40 mt-2">4503 NW 36th St, Oklahoma City, OK 73122 &nbsp;·&nbsp; 572-240-5888</p>
        <p className="font-body text-[14px] text-toasted-cream/40 mt-1">klucky1123@gmail.com</p>
      </div>

      {/* 3 Columns — all left aligned */}
      <div className="w-full max-w-desktop-max-width mx-auto px-6 md:px-12 py-8 grid grid-cols-3 gap-4 text-left">

        {/* Col 1 — Opening Hours */}
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

        {/* Col 2 — Useful Links */}
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

        {/* Col 3 — Connect */}
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
      <div className="border-t border-toasted-cream/10 py-5 flex flex-col items-center gap-2 text-center px-6">
        <p className="font-body text-[16px] text-toasted-cream/40 flex items-center justify-center gap-2">
          <img src="/Logo.webp" alt="Jessica Eyebrow Threading Logo" className="w-6 h-6 rounded-full object-cover border border-toasted-cream/10" />
          <span>© 2026 Jessica Eyebrow Threading. Handcrafted Elegance.</span>
        </p>
        <p className="font-body text-[14px] text-toasted-cream/40 flex items-center justify-center gap-1.5">
          <span>Powered by</span>
          <a href="https://propelmetatech.com/" target="_blank" rel="noopener noreferrer" className="hover:text-toasted-cream/70 underline underline-offset-2 transition-colors duration-300 inline-flex items-center gap-1.5">
            <img src="/propel_logo.webp" alt="PropelMeta Tech LLC Logo" className="w-5 h-5 rounded-full object-cover border border-toasted-cream/10" />
            <span>PropelMeta Tech LLC</span>
          </a>
        </p>
      </div>

    </footer>
  );
};

export default Footer;
