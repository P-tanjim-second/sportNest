'use client';

import { useEffect, useRef, useState } from 'react';

const SPORTS = [
  { label: 'Football',    emoji: '⚽', count: '48 venues', color: '#16332A', light: '#D8EAD4' },
  { label: 'Badminton',   emoji: '🏸', count: '36 venues', color: '#1A3A4A', light: '#D4E8F0' },
  { label: 'Swimming',    emoji: '🏊', count: '22 venues', color: '#1A4A6B', light: '#D4E6F4' },
  { label: 'Tennis',      emoji: '🎾', count: '29 venues', color: '#2D4A35', light: '#D8EAD8' },
  { label: 'Basketball',  emoji: '🏀', count: '18 venues', color: '#6B2A0E', light: '#F4DFD4' },
  { label: 'Cricket',     emoji: '🏏', count: '31 venues', color: '#3A2A1A', light: '#EAE0D4' },
  { label: 'Volleyball',  emoji: '🏐', count: '14 venues', color: '#4A2A6B', light: '#E4D4F0' },
  { label: 'Table Tennis',emoji: '🏓', count: '24 venues', color: '#2A4A1A', light: '#D8EAD0' },
];

const HIGHLIGHTS = [
  {
    label: 'Most Booked',
    sport: 'Football',
    stat: '48 Turfs',
    subStat: '~৳2,200 avg/hr',
    note: 'Highest demand on weekends',
    bg: 'var(--color-pine)',
    fg: 'var(--color-paper)',
    accent: 'var(--color-court)',
  },
  {
    label: 'Best Value',
    sport: 'Badminton',
    stat: '36 Courts',
    subStat: '~৳750 avg/hr',
    note: 'Great for casual players',
    bg: 'var(--color-paper)',
    fg: 'var(--color-pine)',
    accent: 'var(--color-clay)',
  },
  {
    label: 'Premium Pick',
    sport: 'Swimming',
    stat: '22 Pools',
    subStat: '~৳1,100 avg/hr',
    note: 'Olympic-grade facilities',
    bg: 'var(--color-court-soft)',
    fg: 'var(--color-pine)',
    accent: 'var(--color-pine)',
  },
];

export default function SportCategories() {
  const [active, setActive] = useState('Football');
  const headRef = useRef(null);
  const [headVis, setHeadVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-32 overflow-hidden" style={{ background: 'var(--color-pine)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div
          ref={headRef}
          className="mb-12"
          style={{ opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <p className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-court)' }}>
            All Sports
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', lineHeight: 1.1 }}>
              Every game.<br />
              <span style={{ color: 'var(--color-court)' }}>One platform.</span>
            </h2>
            <p className="text-sm max-w-xs leading-relaxed" style={{ color: 'rgba(241,242,234,0.6)' }}>
              Whether you're spiking, swimming, or swinging. SportNest has a venue for every athlete.
            </p>
          </div>
        </div>

        <div className="mb-12 -mx-6 lg:mx-0 ">
          <div className="flex gap-3 px-6 lg:px-0 py-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {SPORTS.map((s, i) => {
              const isActive = active === s.label;
              return (
                <button
                  key={s.label}
                  onClick={() => setActive(s.label)}
                  className="flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    fontFamily: 'var(--font-body)',
                    background: isActive ? 'var(--color-court)' : 'rgba(255,255,255,0.08)',
                    color: isActive ? 'var(--color-pine)' : 'rgba(241,242,234,0.7)',
                    border: `1.5px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.12)'}`,
                    boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                    transform: isActive ? 'translateY(-2px)' : undefined,
                  }}
                >
                  <span className="text-base">{s.emoji}</span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {(() => {
          const s = SPORTS.find(x => x.label === active);
          return (
            <div
              key={active}
              className="rounded-3xl p-8 mb-10"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                animation: 'fadeSlideIn 0.4s ease',
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{s.emoji}</span>
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', fontSize: '1.6rem' }}>{s.label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(241,242,234,0.55)', fontSize: '12px', marginTop: '2px' }}>{s.count} across Dhaka</p>
                  </div>
                </div>
                <a
                  href={`/facilities?type=${s.label.toLowerCase()}`}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold self-start sm:self-auto"
                  style={{ background: 'var(--color-court)', color: 'var(--color-pine)' }}
                >
                  Browse {s.label} Venues
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          );
        })()}

        <div className="grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.label}
              className="rounded-2xl p-6"
              style={{ background: h.bg, boxShadow: 'var(--shadow-md)' }}
            >
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: h.accent, marginBottom: '0.75rem' }}>
                {h.label}
              </p>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', color: h.fg, lineHeight: 1.2 }}>{h.sport}</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 700, color: h.fg }}>{h.stat}</p>
                  <p style={{ fontSize: '11px', color: h.fg, opacity: 0.6, marginTop: '2px' }}>{h.subStat}</p>
                </div>
              </div>
              <p style={{ fontSize: '11px', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: `1px solid ${h.fg === 'var(--color-paper)' ? 'rgba(255,255,255,0.12)' : 'var(--color-border)'}`, color: h.fg, opacity: 0.55, fontFamily: 'var(--font-mono)' }}>
                {h.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
