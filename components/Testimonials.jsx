'use client';

import { useEffect, useRef, useState } from 'react';

const REVIEWS = [
  {
    name: 'Rafiq Hossain',
    role: 'Football Player · Gulshan FC',
    initials: 'RH',
    rating: 5,
    text: 'Booked a turf in under 90 seconds. The pass system is genius. I can see all my bookings in one place without hunting through emails.',
    venue: 'Downtown Turf Arena',
    date: 'Every Saturday',
    color: '#16332A',
  },
  {
    name: 'Sadia Rahman',
    role: 'Badminton Enthusiast',
    initials: 'SR',
    rating: 5,
    text: 'Ive tried other platforms but the quality of venues here is unmatched. Birdie Club has perfect court lighting and the booking experience is clean.',
    venue: 'Birdie Club',
    date: 'Tue & Thu evenings',
    color: '#1A3A4A',
  },
  {
    name: 'Tanvir Ahmed',
    role: 'Swim Coach · AquaLane',
    initials: 'TA',
    rating: 5,
    text: 'Scheduling lanes for my students used to be a nightmare. Now I block our weekly slots in one go. The owner dashboard is surprisingly polished.',
    venue: 'AquaLane Center',
    date: 'Mon–Fri mornings',
    color: '#1A4A6B',
  },
];

function ReviewCard({ review, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div style={{ borderRadius: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
        <div
          style={{
            background: review.color,
            borderRadius: '1.5rem 1.5rem 0 0',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: 'rgba(255,255,255,0.15)', color: 'var(--color-paper)', fontFamily: 'var(--font-mono)' }}
            >
              {review.initials}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', fontSize: '0.95rem' }}>{review.name}</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(241,242,234,0.55)', fontSize: '10px', marginTop: '1px' }}>{review.role}</p>
            </div>
          </div>
          <div className="flex gap-0.5">
            {Array.from({ length: review.rating }).map((_, i) => (
              <span key={i} style={{ color: 'var(--color-court)', fontSize: '13px' }}>★</span>
            ))}
          </div>
        </div>

        <div style={{ position: 'relative', borderTop: '2px dashed var(--color-border)' }}>
          <span style={{ position: 'absolute', left: -9, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-paper-dark)' }} />
          <span style={{ position: 'absolute', right: -9, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-paper-dark)' }} />
        </div>

        <div style={{ background: 'var(--color-surface)', padding: '1.25rem', borderRadius: '0 0 1.5rem 1.5rem' }}>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'var(--color-sage)', marginBottom: '1.25rem' }}>
            "{review.text}"
          </p>
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Venue</p>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-pine)', marginTop: '2px' }}>{review.venue}</p>
            </div>
            <div className="text-right">
              <p style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Books</p>
              <p style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-pine)', marginTop: '2px' }}>{review.date}</p>
            </div>
            <div className="barcode h-6 w-10 opacity-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const headRef = useRef(null);
  const [headVis, setHeadVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-24 lg:py-32" style={{ background: 'var(--color-paper-dark)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div
          ref={headRef}
          className="mb-16 text-center"
          style={{ opacity: headVis ? 1 : 0, transform: headVis ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}
        >
          <p className="mb-3" style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-clay)' }}>
            Player Reviews
          </p>
          <h2 className="text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)', lineHeight: 1.1 }}>
            Athletes who{' '}
            <span className="text-highlight italic">trust the pass.</span>
          </h2>
          <p className="mt-4 text-base max-w-md mx-auto" style={{ color: 'var(--color-sage)' }}>
            Real players, real venues, real bookings. Hear it from the ones who show up every week.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.name} review={r} delay={i * 0.12} />
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-10">
          {[['4.8 / 5.0', 'Average Rating'], ['1,200+', 'Verified Reviews'], ['98%', 'Would Rebook']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>{val}</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
