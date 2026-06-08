import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* TopAppBar (Desktop) */}
      <header 
        className={`hidden md:flex justify-between items-center px-gutter h-24 w-full border-b border-outline-variant/30 fixed top-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-background/95 shadow-sm' : 'bg-background/90'
        } backdrop-blur-md`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src="/Logo.jpeg" alt="Jessica Eyebrow Threading Logo" className="w-12 h-12 rounded-full object-cover border border-outline-variant/30" />
          <div className="flex flex-col">
            <span className="font-display italic text-primary text-[26px] leading-none">Jessica</span>
            <span className="font-body text-[11px] font-medium text-on-surface-variant tracking-widest uppercase">Eyebrow Threading</span>
          </div>
        </Link>
        <nav className="flex gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`font-body text-[13px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-primary border-b border-primary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <Link to="/pricing#book-appointment" className="btn-primary">
          <span>BOOK NOW</span>
        </Link>
      </header>

      {/* TopAppBar (Mobile) */}
      <header className="flex md:hidden fixed top-0 w-full z-50 justify-between items-center px-margin-mobile h-16 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30">
        <button 
          aria-label="Menu" 
          className="text-primary p-2 -ml-2 cursor-pointer"
          onClick={() => setIsMenuOpen(true)}
        >
          <span className="material-symbols-outlined" data-icon="menu">menu</span>
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img src="/Logo.jpeg" alt="Jessica Eyebrow Threading Logo" className="w-9 h-9 rounded-full object-cover border border-outline-variant/30" />
          <div className="flex flex-col">
            <span className="font-display italic text-primary text-[22px] leading-none">Jessica</span>
            <span className="font-body text-[9px] font-medium text-on-surface-variant tracking-widest uppercase mt-0.5">Eyebrow Threading</span>
          </div>
        </Link>
        <Link to="/pricing#book-appointment" className="font-body text-[11px] font-medium text-primary tracking-widest uppercase p-2 -mr-2">
            BOOK
        </Link>
      </header>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 bg-espresso/40 backdrop-blur-xs z-[100] md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div 
        className={`fixed top-0 left-0 bottom-0 w-[80vw] max-w-[320px] bg-warm-white border-r border-outline-variant/20 z-[101] p-6 flex flex-col md:hidden transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center pb-4 border-b border-outline-variant/20">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
            <img src="/Logo.jpeg" alt="Jessica Eyebrow Threading Logo" className="w-9 h-9 rounded-full object-cover border border-outline-variant/30" />
            <div className="flex flex-col">
              <span className="font-display italic text-primary text-[22px] leading-none">Jessica</span>
              <span className="font-body text-[9px] font-medium text-on-surface-variant tracking-widest uppercase mt-0.5">Eyebrow Threading</span>
            </div>
          </Link>
          <button 
            aria-label="Close menu" 
            className="text-primary p-2 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="material-symbols-outlined" data-icon="close">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-6 mt-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between font-body text-[14px] font-medium tracking-[0.12em] uppercase transition-colors duration-300 ${
                  isActive
                    ? 'text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="material-symbols-outlined text-[16px] text-primary" data-icon="chevron_right">chevron_right</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant/20 flex flex-col gap-4">
          <Link 
            to="/pricing#book-appointment" 
            onClick={() => setIsMenuOpen(false)}
            className="btn-primary w-full text-center py-4 flex justify-center"
          >
            <span>BOOK NOW</span>
          </Link>
          <div className="text-center font-body text-[11px] text-on-surface-variant tracking-wider">
            Call or Text: <span className="font-medium text-primary">572-240-5888</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
