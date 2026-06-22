'use client'
import { Ticket } from 'lucide-react';

const LINKS = {
  Company:    ['About SportNest', 'How It Works', 'Careers', 'Press'],
  Facilities: ['Football Turfs', 'Badminton Courts', 'Swimming Pools', 'Tennis Courts'],
  Account:    ['My Bookings', 'Add Facility', 'Manage Facilities', 'Profile Settings'],
};

export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--color-pine)' }}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

          <div className="lg:col-span-2">
            <a href="/" className="group inline-flex items-center gap-2.5 mb-6">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl"
                style={{ background: 'rgba(212,225,87,0.15)', border: '1px solid rgba(212,225,87,0.3)' }}
              >
                <Ticket className="h-4 w-4" style={{ color: 'var(--color-court)' }} strokeWidth={2} />
              </span>
              <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', fontSize: '1.2rem' }}>
                SportNest
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs mb-8" style={{ color: 'rgba(241,242,234,0.55)' }}>
              Bangladesh's leading sports facility booking platform. Reserve courts, turfs, lanes, and more — all with one all-access pass.
            </p>

            <div className="flex items-center gap-3">
              {[
                { name: 'X', path: 'M 18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                { name: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
              ].map(s => (
                <a
                  key={s.name}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
                  aria-label={s.name}
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="rgba(241,242,234,0.7)">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(LINKS).map(([heading, items]) => (
            <div key={heading}>
              <p className="mb-5 text-[10px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-court)' }}>
                {heading}
              </p>
              <ul className="flex flex-col gap-3">
                {items.map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                      style={{ color: 'rgba(241,242,234,0.6)' }}
                      onMouseEnter={e => e.currentTarget.style.color='var(--color-paper)'}
                      onMouseLeave={e => e.currentTarget.style.color='rgba(241,242,234,0.6)'}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-7 py-5"
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          {[
            ['Email', 'hello@sportnest.bd'],
            ['Phone', '+880 1234 567890'],
            ['Hours', 'Daily, 6 AM – 11 PM'],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--color-court)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{label}</p>
              <p style={{ fontSize: '13px', color: 'rgba(241,242,234,0.8)', marginTop: '3px' }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: '12px', color: 'rgba(241,242,234,0.4)', fontFamily: 'var(--font-mono)' }}>
            © 2025 SportNest. All rights reserved.
          </p>
          <div className="flex gap-5">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
              <a key={l} href="#" style={{ fontSize: '11px', color: 'rgba(241,242,234,0.4)', fontFamily: 'var(--font-mono)' }}
                onMouseEnter={e => e.currentTarget.style.color='rgba(241,242,234,0.75)'}
                onMouseLeave={e => e.currentTarget.style.color='rgba(241,242,234,0.4)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
