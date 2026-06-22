'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Ticket, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'All Facilities', href: '/facilities' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div
          className={`glass flex items-center justify-between rounded-full px-5 py-3 transition-shadow duration-500 ${scrolled ? 'shadow-md' : ''
            }`}
        >
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-pine to-pine-soft shadow-md transition-transform duration-300 group-hover:-rotate-6">
              <Ticket className="h-4 w-4 text-court" strokeWidth={2} />
            </span>

            <span className="font-display text-xl tracking-tight text-pine">
              SportNest
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-sm font-medium text-sage transition-colors duration-300"
              >
                {link.label}

                <span className="absolute -bottom-1 left-0 h-px w-0 bg-court transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-paper shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:gap-3"
            >
              Login
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-pine lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        <div
          className={`glass mt-2 overflow-hidden rounded-3xl transition-all duration-500 lg:hidden ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="flex flex-col gap-1 p-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-sage"
              >
                {link.label}
              </a>
            ))}

            <Link
              href="/login"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-pine px-5 py-3 text-sm font-semibold text-paper"
            >
              <span className="flex items-center gap-2">
                Login
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}