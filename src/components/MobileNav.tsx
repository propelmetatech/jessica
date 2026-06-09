import { Link, useLocation } from 'react-router-dom';

const mobileNavLinks = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/about', label: 'About', icon: 'info' },
  { to: '/services', label: 'Services', icon: 'content_cut' },
  { to: '/pricing', label: 'Pricing', icon: 'payments' },
  { to: '/faq', label: 'FAQ', icon: 'help' },
  { to: '/blog', label: 'Blog', icon: 'article' },
];

const MobileNav = () => {
  const location = useLocation();

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center pt-2 pb-safe px-4 bg-warm-white shadow-[0_-4px_20px_rgba(120,87,70,0.08)] z-50">
        {mobileNavLinks.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex flex-col items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 h-14 scale-95'
                  : 'text-on-surface-variant hover:text-primary w-16 h-14'
              }`}
            >
              <span
                className="material-symbols-outlined text-2xl mb-1"
                data-icon={link.icon}
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {link.icon}
              </span>
              <span className={`font-body text-[10px] tracking-wider uppercase ${isActive ? 'font-medium' : ''}`}>
                {link.label}
              </span>
            </Link>
          );
        })}
      </nav>
      {/* Floating WhatsApp Icon */}
      <a
        href="https://wa.me/15722405888?text=Hi%20Jessica!%20%F0%9F%91%8B%20I'd%20love%20to%20book%20an%20appointment.%20Could%20you%20please%20share%20your%20available%20slots%3F"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fab-whatsapp flex"
      >
        <span className="material-symbols-outlined" data-icon="chat">chat</span>
      </a>
    </>
  );
};

export default MobileNav;
