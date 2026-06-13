import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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

/* ─── calendar helpers ─── */
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];

const getSlotsForDay = (dayOfWeek: number) => {
  // Tuesday (2) – Thursday (4)
  if (dayOfWeek >= 2 && dayOfWeek <= 4) {
    return [
      '11:00 AM CST', '11:30 AM CST', '12:00 PM CST', '12:30 PM CST',
      '1:00 PM CST', '1:30 PM CST', '2:00 PM CST', '2:30 PM CST',
      '3:00 PM CST', '3:30 PM CST', '4:00 PM CST', '4:30 PM CST',
      '5:00 PM CST', '5:30 PM CST', '6:00 PM CST', '6:30 PM CST'
    ];
  }
  // Friday (5) – Sunday (0)
  if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
    return [
      '11:00 AM CST', '11:30 AM CST', '12:00 PM CST', '12:30 PM CST',
      '1:00 PM CST', '1:30 PM CST', '2:00 PM CST', '2:30 PM CST',
      '3:00 PM CST', '3:30 PM CST', '4:00 PM CST', '4:30 PM CST',
      '5:00 PM CST', '5:30 PM CST', '6:00 PM CST', '6:30 PM CST',
      '7:00 PM CST', '7:30 PM CST'
    ];
  }
  return [];
};

const BLOCKED: Record<string, string[]> = {};

const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const getFirstDay    = (y: number, m: number) => new Date(y, m, 1).getDay();

/* ─── component ─── */
const Pricing = () => {
  const location = useLocation();
  const today    = new Date();

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [selectedDay,      setSelectedDay]      = useState<number | null>(null);
  const [selectedTime,     setSelectedTime]     = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name,  setName]  = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState<Record<string, string[]>>({});

  /* scroll to booking block when arriving via /pricing#book-appointment */
  useEffect(() => {
    if (location.hash === '#book-appointment') {
      setTimeout(() => {
        document.getElementById('book-appointment')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [location]);

  // Fetch booked slots from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/booked-slots')
      .then(res => res.json())
      .then(data => setBlocked(data))
      .catch(err => console.error('Failed to fetch booked slots:', err));
  }, [confirmed]);

  const daysInMonth    = getDaysInMonth(viewYear, viewMonth);
  const firstDayOfWeek = getFirstDay(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
    setSelectedDay(null); setSelectedTime(null);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
    setSelectedDay(null); setSelectedTime(null);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day); d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  };

  const dateKey = selectedDay ? `${MONTHS[viewMonth]} ${selectedDay}, ${viewYear}` : '';
  const blockedSlots = dateKey ? (blocked[dateKey] ?? []) : [];

  const toggleService = (id: string) =>
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );

  const totalPrice = selectedServices.reduce((sum, id) => {
    const svc = ALL_SERVICES.find(s => s.id === id);
    return sum + (svc ? parseInt(svc.price.replace('$', '')) : 0);
  }, 0);

  const totalMins = selectedServices.reduce((sum, id) => {
    const svc = ALL_SERVICES.find(s => s.id === id);
    return sum + (svc ? parseInt(svc.duration) : 0);
  }, 0);

  const handleConfirm = async () => {
    if (!selectedDay || !selectedTime || selectedServices.length === 0 || !name || !email || !phone) return;
    
    setSubmitting(true);
    setSubmitError(null);

    const bookingData = {
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      service: selectedServices.map(id => {
        const svc = ALL_SERVICES.find(s => s.id === id);
        return `${svc?.name} (${svc?.price})`;
      }).join(', '),
      booking_date: `${MONTHS[viewMonth]} ${selectedDay}, ${viewYear}`,
      booking_time: selectedTime,
      total_price: `$${totalPrice}`
    };

    try {
      const response = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Failed to book appointment. Please try again.');
      }

      setConfirmed(true);
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please check if backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setConfirmed(false); setSelectedDay(null); setSelectedTime(null);
    setSelectedServices([]); setName(''); setPhone(''); setEmail('');
    setSubmitting(false); setSubmitError(null);
  };

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

          {confirmed ? (
            /* ── Confirmation ── */
            <div className="flex flex-col items-center justify-center py-12 text-center gap-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >check_circle</span>
              </div>
              <h3 className="font-display text-[28px] text-primary">You're booked, {name}!</h3>
              <p className="font-body text-[14px] text-on-surface-variant max-w-sm">
                <strong>{selectedServices.map(id => ALL_SERVICES.find(s => s.id === id)?.name).join(', ')}</strong> on{' '}
                <strong>{MONTHS[viewMonth]} {selectedDay}, {viewYear}</strong> at{' '}
                <strong>{selectedTime}</strong>.<br />
                We'll confirm via WhatsApp shortly.
              </p>
              {totalPrice > 0 && (
                <p className="font-display text-[22px] text-primary">Total: ${totalPrice}</p>
              )}
              <button onClick={handleReset} className="btn-primary mt-2">
                <span>Book Another</span>
              </button>
            </div>
          ) : (
            /* ── 3-column booking layout ── */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_280px] gap-6">

              {/* ── Col 1: Calendar ── */}
              <div className="bg-white/60 rounded-lg p-4 border border-[#d5c3b9]/30">
                {/* Month navigator */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={prevMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8C9B5]/50 transition-colors text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  <span className="font-display text-[18px] text-primary">
                    {MONTHS[viewMonth]} {viewYear}
                  </span>
                  <button
                    onClick={nextMonth}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#E8C9B5]/50 transition-colors text-primary"
                  >
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
                </div>

                {/* Day-of-week labels */}
                <div className="grid grid-cols-7 mb-1">
                  {DAYS.map(d => (
                    <div key={d} className="text-center font-body text-[11px] text-on-surface-variant py-1 font-medium tracking-wide">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day grid */}
                <div className="grid grid-cols-7 gap-y-1">
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                    const d          = new Date(viewYear, viewMonth, day);
                    const isMonday   = d.getDay() === 1;
                    const past       = isPast(day);
                    const closed     = isMonday;
                    const isToday    = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                    const selected   = day === selectedDay;
                    const dateStr    = `${MONTHS[viewMonth]} ${day}, ${viewYear}`;
                    const hasBlocked = !!blocked[dateStr] && blocked[dateStr].length > 0;
                    return (
                      <button
                        key={day}
                        disabled={past || closed}
                        onClick={() => { setSelectedDay(day); setSelectedTime(null); }}
                        className={[
                          'relative mx-auto w-10 h-10 flex items-center justify-center rounded-full font-body text-[13px] transition-all duration-150',
                          (past || closed) ? 'text-[#d5c3b9] cursor-not-allowed opacity-40'
                          : selected ? 'bg-primary text-white shadow-md scale-105'
                          : isToday  ? 'border border-primary text-primary font-semibold hover:bg-[#E8C9B5]/40'
                          :            'text-[#1c1c19] hover:bg-[#E8C9B5]/40 cursor-pointer',
                        ].join(' ')}
                      >
                        {day}
                        {!past && !closed && hasBlocked && !selected && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E8C9B5]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#d5c3b9]/30">
                  <span className="flex items-center gap-1 font-body text-[11px] text-on-surface-variant">
                    <span className="w-2 h-2 rounded-full bg-[#E8C9B5] inline-block" /> Partially booked
                  </span>
                  <span className="flex items-center gap-1 font-body text-[11px] text-on-surface-variant">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" /> Selected
                  </span>
                </div>
              </div>

              {/* ── Col 2: Time Slots ── */}
              <div className="bg-white/60 rounded-lg p-4 border border-[#d5c3b9]/30">
                {selectedDay ? (
                  <>
                    <p className="font-body text-[12px] text-on-surface-variant mb-3 font-medium uppercase tracking-widest">
                      {MONTHS[viewMonth]} {selectedDay} — Available Times
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[300px] overflow-y-auto pr-1">
                      {selectedDay && getSlotsForDay(new Date(viewYear, viewMonth, selectedDay).getDay()).map(slot => {
                        const blocked  = blockedSlots.includes(slot);
                        const isChosen = slot === selectedTime;
                        return (
                          <button
                            key={slot}
                            disabled={blocked}
                            onClick={() => setSelectedTime(slot)}
                            className={[
                              'py-2 px-1 rounded-md font-body text-[12px] transition-all duration-150 border text-center',
                              blocked
                                ? 'bg-[#d5c3b9]/30 text-[#d5c3b9] border-transparent cursor-not-allowed line-through'
                                : isChosen
                                  ? 'bg-primary text-white border-primary shadow-sm'
                                  : 'bg-white border-[#d5c3b9]/50 text-[#51443c] hover:border-primary hover:text-primary',
                            ].join(' ')}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                    <p className="font-body text-[11px] text-on-surface-variant mt-2">
                      <span className="line-through text-[#d5c3b9]">Strikethrough</span> = already booked
                    </p>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center py-10 gap-2">
                    <span className="material-symbols-outlined text-[#d5c3b9] text-4xl">calendar_month</span>
                    <p className="font-body text-[13px] text-on-surface-variant">Select a date to see available times</p>
                  </div>
                )}
              </div>

              {/* ── Col 3: Right panel — Services list + form ── */}
              <div className="bg-white/60 rounded-lg p-4 border border-[#d5c3b9]/30 flex flex-col gap-3 md:col-span-2 lg:col-span-1">

                {/* Services multi-select list */}
                <div>
                  <p className="font-body text-[12px] text-on-surface-variant mb-2 font-medium uppercase tracking-widest">
                    Select Your Services
                  </p>
                  <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto pr-1">
                    {CATEGORIES.map((cat, idx) => (
                      <div key={cat.label} className={idx > 0 ? "mt-3" : ""}>
                        <div className="sticky top-0 bg-[#F2EAE0]/95 backdrop-blur-sm z-10 py-1 mb-1.5 border-b border-[#d5c3b9]/40 flex items-center gap-1.5">
                           <span className="material-symbols-outlined text-primary text-[16px]">{cat.icon}</span>
                           <span className="font-display text-[15px] text-primary">{cat.label}</span>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          {cat.services.map(svc => {
                            const chosen = selectedServices.includes(svc.id);
                            return (
                              <button
                                key={svc.id}
                                onClick={() => toggleService(svc.id)}
                                className={[
                                  'flex items-center justify-between px-3 py-2 rounded-md border text-left transition-all duration-150 w-full',
                                  chosen
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-white/80 border-[#d5c3b9]/50 hover:border-primary hover:text-primary',
                                ].join(' ')}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={[
                                    'w-3.5 h-3.5 rounded-sm border flex items-center justify-center flex-shrink-0 transition-colors',
                                    chosen ? 'bg-white border-white' : 'border-[#d5c3b9]',
                                  ].join(' ')}>
                                    {chosen && (
                                      <span className="material-symbols-outlined text-primary text-[11px]" style={{ fontVariationSettings: "'FILL' 1", fontSize: '11px' }}>
                                        check
                                      </span>
                                    )}
                                  </span>
                                  <span className="font-body text-[12px]">{svc.name}</span>
                                </div>
                                <span className={`font-body text-[12px] ml-1 flex-shrink-0 whitespace-nowrap ${chosen ? 'text-white/80' : 'text-primary font-medium'}`}>
                                  {svc.price}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Running total */}
                  {selectedServices.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#d5c3b9]/30 flex justify-between items-center animate-fade-in">
                      <span className="font-body text-[11px] text-on-surface-variant">
                        {selectedServices.length} selected
                      </span>
                      <span className="font-display text-[15px] text-primary">
                        ${totalPrice} · {totalMins} min
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="border-t border-[#d5c3b9]/30" />

                {/* Name */}
                <div>
                  <label className="font-body text-[11px] text-on-surface-variant block mb-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white border border-[#d5c3b9]/60 rounded-md px-3 py-2 font-body text-[13px] text-[#1c1c19] placeholder-[#d5c3b9] focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-body text-[11px] text-on-surface-variant block mb-1">Email *</label>
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white border border-[#d5c3b9]/60 rounded-md px-3 py-2 font-body text-[13px] text-[#1c1c19] placeholder-[#d5c3b9] focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="font-body text-[11px] text-on-surface-variant block mb-1">Phone *</label>
                  <input
                    type="tel"
                    placeholder="+1 555 000 0000"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white border border-[#d5c3b9]/60 rounded-md px-3 py-2 font-body text-[13px] text-[#1c1c19] placeholder-[#d5c3b9] focus:outline-none focus:border-primary transition-colors"
                  />
                </div>

                {/* Booking summary chip */}
                {selectedDay && selectedTime && (
                  <div className="bg-primary/[0.07] border border-primary/20 rounded-md px-3 py-2 font-body text-[12px] text-primary animate-fade-in">
                    📅 {MONTHS[viewMonth]} {selectedDay} · {selectedTime}
                  </div>
                )}

                {/* Confirm button */}
                {submitError && (
                  <p className="font-body text-[12px] text-red-600 text-center mb-1 font-medium">
                    ⚠️ {submitError}
                  </p>
                )}
                <button
                  onClick={handleConfirm}
                  disabled={!selectedDay || !selectedTime || selectedServices.length === 0 || !name || !email || !phone || submitting}
                  className="btn-primary w-full mt-auto disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{submitting ? 'Processing...' : 'Confirm Booking'}</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Pricing;
