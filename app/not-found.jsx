'use client';
import { ArrowRight, Ticket } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--color-paper)' }}>

      <div className="animate-drift-1 fixed -top-32 right-0 h-80 w-80 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-court), transparent 70%)' }}/>
      <div className="animate-drift-2 fixed -bottom-32 left-0 h-64 w-64 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, var(--color-clay-soft), transparent 70%)' }}/>

      <div className="relative text-center max-w-lg mx-auto">

        <div className="mx-auto mb-10 w-full max-w-sm" style={{ filter: 'drop-shadow(0 24px 40px rgba(22,51,42,0.18))' }}>
          <div style={{ borderRadius: '1.5rem' }}>
            <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(165deg,#16332A 0%,#234A3B 100%)', borderRadius:'1.5rem 1.5rem 0 0', height:'9rem', padding:'1.25rem' }}>
              <svg viewBox="0 0 200 144" className="absolute inset-0 h-full w-full opacity-[0.1]" fill="none" stroke="white" strokeWidth="1.5">
                <line x1="100" y1="0" x2="100" y2="144"/>
                <circle cx="100" cy="72" r="34"/>
              </svg>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between">
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-court)' }}>
                    SportNest · Pass
                  </span>
                  <span style={{ fontFamily:'var(--font-mono)', fontSize:'11px', fontWeight:700, letterSpacing:'0.15em', color:'var(--color-clay)', border:'2px solid var(--color-clay)', padding:'0.1rem 0.5rem', borderRadius:'4px', transform:'rotate(12deg)', display:'inline-block', opacity:0.9 }}>
                    VOID
                  </span>
                </div>
                <div>
                  <p style={{ fontFamily:'var(--font-display)', fontSize:'1.75rem', color:'white', lineHeight:1.1 }}>404</p>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'11px', color:'rgba(255,255,255,0.55)', marginTop:'4px' }}>Slot not found</p>
                </div>
              </div>
            </div>

            <div style={{ position:'relative', borderTop:'2px dashed rgba(22,51,42,0.12)' }}>
              <span style={{ position:'absolute', left:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
              <span style={{ position:'absolute', right:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
            </div>

            <div style={{ background:'var(--color-surface)', borderRadius:'0 0 1.5rem 1.5rem', padding:'1rem 1.25rem', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
              <div>
                <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'var(--color-muted)', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>Reason</p>
                <p style={{ fontSize:'11px', fontFamily:'var(--font-mono)', color:'var(--color-pine)', marginTop:'2px' }}>Page doesn't exist</p>
              </div>
              <div className="barcode h-6 w-12 opacity-30"/>
            </div>
          </div>
        </div>

        <h1 className="text-3xl lg:text-4xl mb-4" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)', lineHeight:1.15 }}>
          This page is out of bounds.
        </h1>
        <p className="text-sm leading-relaxed mb-8 max-w-sm mx-auto" style={{ color:'var(--color-sage)' }}>
          The URL you followed doesn't match any venue, booking, or route in our system. Head back and try again.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="/" className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:'var(--color-pine)', color:'var(--color-paper)', boxShadow:'var(--shadow-md)' }}>
            Back to Home
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"/>
          </a>
          <a href="/facilities" className="inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor:'var(--color-border)', color:'var(--color-pine)' }}>
            Browse Facilities
          </a>
        </div>
      </div>
    </div>
  );
}
