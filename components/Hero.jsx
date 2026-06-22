'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, MapPin, PlayCircle, Ticket } from 'lucide-react';

function FootballLines() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="absolute inset-0 h-full w-full opacity-[0.18]"
      fill="none"
      stroke="var(--color-paper)"
      strokeWidth="1.5"
    >
      <line x1="100" y1="0" x2="100" y2="160" />
      <circle cx="100" cy="80" r="34" />
      <circle cx="100" cy="80" r="2" fill="var(--color-paper)" />
    </svg>
  );
}

function TennisLines() {
  return (
    <svg
      viewBox="0 0 200 160"
      className="absolute inset-0 h-full w-full opacity-[0.18]"
      fill="none"
      stroke="var(--color-paper)"
      strokeWidth="1.5"
    >
      <rect x="22" y="14" width="156" height="132" />
      <line x1="22" y1="80" x2="178" y2="80" />
      <rect x="46" y="14" width="108" height="132" />
    </svg>
  );
}

function PassCard({ badge, name, location, time, price, lines, shadow }) {
  return (
    <div style={{ borderRadius: '1.5rem', boxShadow: shadow }}>
      <div
        style={{
          borderRadius: '1.5rem 1.5rem 0 0',
          background: 'linear-gradient(165deg, var(--color-pine) 0%, var(--color-pine-soft) 100%)',
          padding: '1.15rem',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '9.5rem',
        }}
      >
        {lines}
        <div className="relative z-10">
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-court)' }}>
            {badge}
          </p>
          <p className="mt-2 text-xl leading-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
            {name}
          </p>
          <p className="mt-1.5 flex items-center gap-1 text-xs" style={{ color: 'rgba(241,242,234,0.65)' }}>
            <MapPin className="h-3 w-3" /> {location}
          </p>
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <div style={{ borderTop: '2px dashed var(--color-border)' }} />
        <span style={{ position: 'absolute', left: '-9px', top: '-9px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--color-paper)' }} />
        <span style={{ position: 'absolute', right: '-9px', top: '-9px', width: '18px', height: '18px', borderRadius: '50%', background: 'var(--color-paper)' }} />
      </div>

      <div className="flex items-center justify-between" style={{ borderRadius: '0 0 1.5rem 1.5rem', background: 'var(--color-surface)', padding: '0.9rem 1.1rem' }}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>Slot</p>
          <p className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-pine)' }}>{time}</p>
        </div>
        <div className="barcode h-7 w-14 opacity-60" />
        <div className="rounded-full px-3 py-1 text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-court)', color: 'var(--color-pine)' }}>
          {price}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const animationClass = mounted ? 'in-view' : '';

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
      <div
        className="animate-drift-1 absolute -top-24 right-[-8%] h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-court), transparent 70%)' }}
      />
      <div
        className="animate-drift-2 absolute bottom-[-8rem] left-[-8rem] h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-clay-soft), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <div
              className={`fade-in ${animationClass} mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5`}
              style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}
            >
              <Ticket className="h-3.5 w-3.5" style={{ color: 'var(--color-pine)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-pine)' }}>
                One Pass, Every Court
              </span>
            </div>

            <h1
              className="text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}
            >
              <span className={`fade-up ${animationClass} block`} style={{ transitionDelay: '0.1s' }}>
                Your All-Access
              </span>
              <span className={`fade-up ${animationClass} block`} style={{ transitionDelay: '0.25s' }}>
                Pass to <span className="text-highlight italic">Play.</span>
              </span>
            </h1>

            <p
              className={`fade-up ${animationClass} mt-6 max-w-md text-base leading-relaxed sm:text-lg`}
              style={{ transitionDelay: '0.4s', color: 'var(--color-sage)' }}
            >
              Browse football turfs, badminton courts, swimming lanes and tennis
              courts nearby, then reserve your slot in seconds — all with one
              membership pass.
            </p>

            <div className={`fade-up ${animationClass} mt-9 flex flex-wrap items-center gap-4`} style={{ transitionDelay: '0.55s' }}>
              <a
                href="#facilities"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'var(--color-pine)', color: 'var(--color-paper)', boxShadow: 'var(--shadow-md)' }}
              >
                Explore Facilities
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-pine)' }}
              >
                <PlayCircle className="h-4 w-4" style={{ color: 'var(--color-clay)' }} />
                How It Works
              </a>
            </div>

            <div className={`fade-up ${animationClass} mt-12 flex items-center gap-7 sm:gap-10`} style={{ transitionDelay: '0.7s' }}>
              {[['250+', 'Venues'], ['12', 'Sports'], ['24/7', 'Booking']].map(([num, label], i) => (
                <div key={label} className={i !== 0 ? 'border-l border-dashed pl-7 sm:pl-10' : ''} style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>{num}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[440px] w-full max-w-md sm:h-[500px] lg:h-[560px]">
            <div
              className={`fade-in ${animationClass} absolute -right-10 top-2 h-56 w-56 rounded-full border sm:h-64 sm:w-64`}
              style={{ borderColor: 'var(--color-border)', transitionDelay: '0.2s' }}
            />
            <div
              className={`fade-in ${animationClass} absolute right-4 top-16 h-2 w-2 rounded-full sm:right-10 sm:top-20`}
              style={{ background: 'var(--color-court)', transitionDelay: '0.35s' }}
            />
            <div className={`fade-up ${animationClass} absolute right-0 top-0 w-[70%]`} style={{ '--tilt': '7deg', transitionDelay: '0.15s' }}>
              <div style={{ opacity: 0.55 }}>
                <PassCard
                  badge="Tennis · Court 2"
                  name="Riverside Court"
                  location="Banani, Dhaka"
                  time="07:00 – 08:00"
                  price="$18/hr"
                  lines={<TennisLines />}
                  shadow="var(--shadow-md)"
                />
              </div>
            </div>

            <div className={`fade-up ${animationClass} absolute left-0 bottom-0 w-[76%] sm:w-[72%]`} style={{ '--tilt': '-3deg', transitionDelay: '0.3s' }}>
              <PassCard
                badge="Football · Sector 4"
                name="Downtown Turf Arena"
                location="Gulshan, Dhaka"
                time="18:00 - 19:00"
                price="$25/hr"
                lines={<FootballLines />}
                shadow="var(--shadow-float)"
              />
            </div>

            <div
              className={`fade-in ${animationClass} animate-float-y glass absolute left-4 top-6 flex items-center gap-2 rounded-full px-4 py-2 sm:left-8`}
              style={{ transitionDelay: '0.6s' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full" style={{ background: 'var(--color-clay)' }} />
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full" style={{ background: 'var(--color-clay)' }} />
              </span>
              <span className="text-xs font-semibold" style={{ color: 'var(--color-pine)' }}>Live Availability</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`fade-in ${animationClass} absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex`} style={{ transitionDelay: '0.9s' }}>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>Scroll</span>
        <span className="h-8 w-px" style={{ background: 'var(--color-border)' }} />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full text-muted" style={{ background: 'var(--color-court)' }} />
      </div>
    </section>
  );
}
