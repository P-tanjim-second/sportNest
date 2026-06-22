'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, Calendar, Ticket } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Browse & Discover',
    body: 'Explore facilities by sport type, location, or price. Every venue is verified with real-time slot data.',
    detail: 'Filter by city, sport, price range',
  },
  {
    num: '02',
    icon: Calendar,
    title: 'Pick Your Slot',
    body: 'Choose a date, select a time slot that works for you, and see the total price before committing.',
    detail: 'Live availability, no hidden fees',
  },
  {
    num: '03',
    icon: Ticket,
    title: 'Get Your Pass',
    body: 'Confirm your booking in one click. Your all-access pass is stored under My Bookings. Ready when you are.',
    detail: 'Instant confirmation, cancel anytime',
  },
];

function Step({ step, index, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const Icon = step.icon;
  const isLast = index === STEPS.length -1;

  return (
    <div className="relative flex flex-col items-center text-center" ref={ref}>
      {!isLast && (
        <div
          className="absolute top-10 left-1/2 hidden lg:block"
          style={{
            width: '100%',
            height: '2px',
            background: 'repeating-linear-gradient(90deg,var(--color-border) 0 6px,transparent 6px 12px)',
            zIndex: 0,
          }}
        />
      )}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: vis ? 1 : 0,
          transform: vis ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.9)',
          transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full mx-auto"
          style={{ border: '2px dashed var(--color-border)', padding: '6px' }}
        >
          <div
            className="flex h-full w-full items-center justify-center rounded-full"
            style={{ background: 'linear-gradient(135deg, var(--color-pine) 0%, var(--color-pine-soft) 100%)', boxShadow: 'var(--shadow-md)' }}
          >
            <Icon className="h-6 w-6" style={{ color: 'var(--color-court)' }} strokeWidth={1.8} />
          </div>
        </div>
        <span
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold"
          style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-court)', color: 'var(--color-pine)' }}
        >
          {step.num}
        </span>
      </div>

      <div
        style={{
          marginTop: '1.75rem',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(16px)',
          transition: `opacity 0.8s ease ${delay + 0.15}s, transform 0.8s ease ${delay + 0.15}s`,
        }}
      >
        <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>
          {step.title}
        </h3>
        <p className="text-sm leading-relaxed max-w-xs mx-auto mb-4" style={{ color: 'var(--color-sage)' }}>
          {step.body}
        </p>
        <p
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
          style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-court-soft)', color: 'var(--color-pine)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full inline-block" style={{ background: 'var(--color-pine)' }} />
          {step.detail}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const headRef = useRef(null);
  const [headVis, setHeadVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="py-24 lg:py-32" style={{ background: 'var(--color-paper)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div
          ref={headRef}
          className="mb-20 text-center"
          style={{ opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <p className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-clay)' }}>
            Simple Process
          </p>
          <h2 className="text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)', lineHeight: 1.1 }}>
            Three steps to the{' '}
            <span className="text-highlight italic">court.</span>
          </h2>
          <p className="mt-5 text-base max-w-lg mx-auto" style={{ color: 'var(--color-sage)' }}>
            From discovering a facility to stepping on the field. The entire experience fits in under a minute.
          </p>
        </div>

        <div className="grid gap-14 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((step, i) => (
            <Step key={step.num} step={step} index={i} delay={0.1 + i * 0.15} />
          ))}
        </div>

        <div
          className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-3xl px-8 py-7"
          style={{ background: 'linear-gradient(135deg, var(--color-pine) 0%, var(--color-pine-soft) 100%)', boxShadow: 'var(--shadow-lg)' }}
        >
          <div>
            <p className="text-xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)' }}>
              Ready to claim your slot?
            </p>
            <p className="mt-1 text-sm" style={{ color: 'rgba(241,242,234,0.65)' }}>
              250+ facilities. 12 sports. All in one place.
            </p>
          </div>
          <a
            href="/facilities"
            className="group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap"
            style={{ background: 'var(--color-court)', color: 'var(--color-pine)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
          >
            Explore All Facilities
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
