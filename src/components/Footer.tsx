import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full relative bg-espresso border-t border-secondary/20 flex flex-col items-center text-center py-section-v-mobile px-margin-mobile gap-6 text-toasted-cream">
      <div className="w-full max-w-desktop-max-width mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12 text-left md:text-center">
        <div className="flex flex-col gap-4 text-left">
          <a className="font-body text-[14px] text-toasted-cream/70 hover:text-dusty-peach transition-colors" href="#">Privacy Policy</a>
          <a className="font-body text-[14px] text-toasted-cream/70 hover:text-dusty-peach transition-colors" href="#">Terms of Service</a>
          <a className="font-body text-[14px] text-toasted-cream/70 hover:text-dusty-peach transition-colors" href="https://wa.me/15722405888" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
        </div>
        <div className="flex flex-col gap-2 text-left">
          <span className="font-body text-[14px] font-semibold text-toasted-cream">Jessica Eyebrow Threading</span>
          <span className="font-body text-[14px] text-toasted-cream/70">4503 Northwest 36th Street,<br />Oklahoma City, OK 73122</span>
          <span className="font-body text-[14px] text-toasted-cream/70">Phone: 572-240-5888</span>
        </div>
        <div className="flex flex-col gap-4 text-left">
          <Link className="font-body text-[14px] text-toasted-cream/70 hover:text-dusty-peach transition-colors" to="/contact">Contact</Link>
          <Link className="font-body text-[14px] text-toasted-cream/70 hover:text-dusty-peach transition-colors" to="/services">Services</Link>
          <Link className="font-body text-[14px] text-toasted-cream/70 hover:text-dusty-peach transition-colors" to="/pricing">Pricing</Link>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-toasted-cream/10 w-full max-w-desktop-max-width mx-auto">
        <p className="font-body text-[12px] text-toasted-cream/50">© 2024 Jessica Eyebrow Threading. Handcrafted Elegance.</p>
      </div>
    </footer>
  );
};

export default Footer;
