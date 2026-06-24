'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';


function LineArt({ facility_type }) {
  const s = { fill: 'none', stroke: 'white', strokeWidth: '1.5' };
  const art = {
    Football: <><line x1="100" y1="0" x2="100" y2="160" {...s} /><circle cx="100" cy="80" r="34" {...s} /></>,
    Badminton: <><rect x="22" y="8" width="156" height="144" {...s} /><line x1="22" y1="80" x2="178" y2="80" {...s} /></>,
    Swimming: <>{[32, 64, 96, 128].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} {...s} />)}</>,
    Tennis: <><rect x="18" y="10" width="164" height="140" {...s} /><line x1="18" y1="80" x2="182" y2="80" {...s} /><rect x="44" y="10" width="112" height="140" {...s} /></>,
    Basketball: <><path d="M28 155 A88 88 0 0 1 172 155" {...s} /><circle cx="100" cy="105" r="22" {...s} /></>,
    Cricket: <><rect x="74" y="14" width="52" height="132" {...s} /><line x1="74" y1="38" x2="126" y2="38" {...s} /><line x1="74" y1="122" x2="126" y2="122" {...s} /></>,
    Volleyball: <><circle cx="100" cy="80" r="50" stroke="white" strokeWidth="1.5" />
      <path d="M56 34 Q100 80 144 126" fill="none" stroke="white" strokeWidth="1.5" />
      <path d="M144 34 Q100 80 56 126" fill="none" stroke="white" strokeWidth="1.5" />
      <line x1="50" y1="80" x2="150" y2="80" stroke="white" strokeWidth="1.5" /></>,
    Table_Tennis: <><circle cx="78" cy="68" r="52" fill="none" stroke="white" strokeWidth="1.5" />
      <line x1="116" y1="106" x2="170" y2="154" stroke="white" strokeWidth="1.5" />
      <circle cx="168" cy="20" r="11" fill="none" stroke="white" strokeWidth="1.5" /></>
  };
  return <svg viewBox="0 0 200 160" className="absolute inset-0 h-full w-full opacity-[0.15]" fill="none">{art[facility_type]}</svg>;
}

function Card({ f, delay }) {
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
        transform: vis ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.97)',
        transition: `opacity 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.85s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      <div
        className="group h-full"
        style={{
          borderRadius: '1.5rem',
          boxShadow: 'var(--shadow-md)',
          transition: 'box-shadow 0.4s, transform 0.4s',
          transform: 'translateY(0)',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow='var(--shadow-float)'; e.currentTarget.style.transform='translateY(-4px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow='var(--shadow-md)'; e.currentTarget.style.transform='translateY(0)'; }}
      >
        <div style={{ position:'relative', overflow:'hidden', height:'8.5rem', background:f.grad, borderRadius:'1.5rem 1.5rem 0 0' }}>
          <LineArt facility_type={f.facility_type} />
          <div className="absolute inset-0 flex flex-col justify-between p-5">
            <span style={{ alignSelf:'flex-start', background:'rgba(255,255,255,0.14)', backdropFilter:'blur(8px)', borderRadius:'999px', padding:'0.2rem 0.75rem', fontSize:'10px', fontFamily:'var(--font-mono)', color:f.accent, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>
              {f.facility_type}
            </span>
            <div>
              <p style={{ fontSize:'1.08rem', fontFamily:'var(--font-display)', color:'white', lineHeight:1.25 }}>{f.name}</p>
              <p style={{ display:'flex', alignItems:'center', gap:'4px', color:'rgba(255,255,255,0.6)', fontSize:'11px', marginTop:'4px', fontFamily:'var(--font-mono)' }}>
                <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {f.location}
              </p>
            </div>
          </div>
        </div>

        <div style={{ position:'relative', borderTop:'2px dashed var(--color-border)' }}>
          <span style={{ position:'absolute', left:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper-dark)' }} />
          <span style={{ position:'absolute', right:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper-dark)' }} />
        </div>

        <div style={{ background:'var(--color-surface)', borderRadius:'0 0 1.5rem 1.5rem', padding:'1rem 1.25rem' }}>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex gap-4">
              {[['Capacity',f.capacity],['Hours',f.slots]].map(([l,v])=>(
                <div key={l}>
                  <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'var(--color-muted)', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>{l}</p>
                  <p style={{ fontSize:'11px', fontFamily:'var(--font-mono)', color:'var(--color-pine)', marginTop:'2px' }}>{v}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <span style={{ color:'#F59E0B', fontSize:'13px' }}>★</span>
              <span style={{ fontSize:'12px', fontWeight:600, color:'var(--color-pine)' }}>{f.rating}</span>
              <span style={{ fontSize:'11px', color:'var(--color-muted)' }}>({f.reviews})</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span style={{ fontSize:'1.3rem', fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>{f.price_per_hour}</span>
              <span style={{ fontSize:'11px', color:'var(--color-muted)' }}>/hr</span>
            </div>
            <Link
              href={`/facilities/${f._id}`}
              className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ background:'var(--color-pine)', color:'var(--color-paper)', boxShadow:'var(--shadow-sm)' }}
            >
              Book Now
              <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedFacilities() {
  const headRef = useRef(null);
  const [headVis, setHeadVis] = useState(false);
  const [ FACILITIES, setFACILITIES] = useState([])
  useEffect(() => {
    async function getFacilities() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/limit_facilities`);
      const { data } = await res.json();
      const updatedData = data.map(f => ({
        ...f,
        slots: f.slots[0]
      }))
      setFACILITIES(updatedData)
      console.log(updatedData)
    }
    getFacilities()
  }, [])
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeadVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (headRef.current) obs.observe(headRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="facilities" className="py-24 lg:py-32" style={{ background:'var(--color-paper-dark)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <div ref={headRef} className="mb-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div style={{ opacity:headVis?1:0, transform:headVis?'none':'translateY(20px)', transition:'opacity 0.8s ease, transform 0.8s ease' }}>
            <p className="mb-3" style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--color-clay)' }}>
              Featured Facilities
            </p>
            <h2 className="text-4xl lg:text-5xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)', lineHeight:1.1 }}>
              Courts Worth{' '}
              <span className="text-highlight italic">Playing.</span>
            </h2>
          </div>
          <Link
            href="/facilities"
            className="group inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shrink-0 self-start sm:self-auto"
            style={{ borderColor:'var(--color-border)', color:'var(--color-pine)' }}
          >
            View All
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f, i) => (
            <Card key={f._id} f={f} delay={i * 0.09} />
          ))}
        </div>
      </div>
    </section>
  );
}
