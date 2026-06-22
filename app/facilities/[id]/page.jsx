'use client';
import { useState } from 'react';
import { MapPin, Users, Clock, Star, ArrowLeft, ArrowRight, Ticket } from 'lucide-react';

const FACILITY = {
  id: 1,
  badge: 'Football',
  name: 'Downtown Turf Arena',
  owner: 'owner@sportnest.bd',
  location: 'Gulshan-2, Road 54, Dhaka 1212',
  price: 2500,
  rating: 4.9,
  reviews: 128,
  capacity: '22 Players',
  description: 'Downtown Turf Arena is Dhaka\'s premier synthetic turf venue. Featuring FIFA-standard 5v5 and 7v7 pitches with floodlights, changing rooms, and a refreshment zone. Ideal for competitive leagues, casual matches, or corporate tournaments.',
  amenities: ['Floodlights', 'Changing Rooms', 'Parking', 'CCTV', 'Water Dispenser', 'First Aid Kit'],
  slots: ['06:00–07:00', '07:00–08:00', '08:00–09:00', '16:00–17:00', '17:00–18:00', '18:00–19:00', '19:00–20:00', '20:00–21:00', '21:00–22:00'],
  grad: 'linear-gradient(165deg,#16332A 0%,#234A3B 100%)',
};

export default function FacilityDetailPage() {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState('');
  const total = FACILITY.price * hours;

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>

      {/* Back nav */}
      <div className="pt-28 pb-6 px-6 lg:px-10 mx-auto max-w-7xl">
        <a href="/facilities" className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-x-1"
          style={{ color: 'var(--color-sage)' }}>
          <ArrowLeft className="h-4 w-4" /> Back to Facilities
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">

          {/* ── Left: Facility info ── */}
          <div className="lg:col-span-2">

            {/* Hero image (gradient placeholder with line art) */}
            <div style={{ position:'relative', overflow:'hidden', height:'20rem', background:FACILITY.grad, borderRadius:'2rem' }}>
              <svg viewBox="0 0 800 320" className="absolute inset-0 h-full w-full opacity-[0.12]" fill="none" stroke="white" strokeWidth="1.5">
                <line x1="400" y1="0" x2="400" y2="320"/>
                <circle cx="400" cy="160" r="90"/>
                <circle cx="400" cy="160" r="6" fill="white"/>
                <rect x="0" y="0" width="800" height="320"/>
              </svg>
              <div className="absolute bottom-6 left-6">
                <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.14)', backdropFilter:'blur(12px)', borderRadius:'999px', padding:'0.3rem 0.9rem', fontSize:'11px', fontFamily:'var(--font-mono)', color:'var(--color-court)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  <Ticket className="h-3.5 w-3.5" /> {FACILITY.badge}
                </span>
              </div>
              <div className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background:'rgba(255,255,255,0.14)', backdropFilter:'blur(12px)' }}>
                <span style={{ color:'#F59E0B', fontSize:'13px' }}>★</span>
                <span style={{ fontSize:'13px', fontWeight:600, color:'white', fontFamily:'var(--font-mono)' }}>{FACILITY.rating}</span>
                <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.65)' }}>({FACILITY.reviews})</span>
              </div>
            </div>

            {/* Name + location */}
            <div className="mt-7 mb-5">
              <h1 className="text-3xl lg:text-4xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)', lineHeight:1.1 }}>{FACILITY.name}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm" style={{ color:'var(--color-sage)' }}>
                <MapPin className="h-4 w-4" /> {FACILITY.location}
              </p>
            </div>

            {/* Quick stats strip */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                [Users, FACILITY.capacity, 'Capacity'],
                [Clock, '6 AM – 11 PM', 'Operating Hours'],
                [Star, `${FACILITY.rating} / 5.0`, 'Rating'],
              ].map(([Icon, val, label]) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl px-4 py-3"
                  style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background:'var(--color-pine)' }}>
                    <Icon className="h-4 w-4" style={{ color:'var(--color-court)' }} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p style={{ fontSize:'12px', fontWeight:600, color:'var(--color-pine)' }}>{val}</p>
                    <p style={{ fontSize:'10px', color:'var(--color-muted)', fontFamily:'var(--font-mono)', letterSpacing:'0.06em' }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl mb-3" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>About this venue</h2>
              <p className="text-sm leading-relaxed" style={{ color:'var(--color-sage)' }}>{FACILITY.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-xl mb-4" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {FACILITY.amenities.map(a => (
                  <span key={a} className="rounded-full px-4 py-2 text-xs font-semibold"
                    style={{ background:'var(--color-court-soft)', color:'var(--color-pine)', border:'1px solid var(--color-border)' }}>
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Booking form ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div style={{ borderRadius:'1.75rem', boxShadow:'var(--shadow-lg)', overflow:'hidden' }}>

                {/* Pass header */}
                <div className="p-5" style={{ background:FACILITY.grad, position:'relative' }}>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-court)' }}>Book Your Pass</p>
                  <p className="mt-1 text-lg" style={{ fontFamily:'var(--font-display)', color:'var(--color-paper)' }}>{FACILITY.name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span style={{ fontSize:'1.75rem', fontFamily:'var(--font-display)', color:'var(--color-paper)' }}>৳{FACILITY.price.toLocaleString()}</span>
                    <span style={{ fontSize:'12px', color:'rgba(241,242,234,0.65)' }}>/hr</span>
                  </div>
                </div>

                {/* Perforation */}
                <div style={{ position:'relative', borderTop:'2px dashed var(--color-border)', background:'var(--color-surface)' }}>
                  <span style={{ position:'absolute', left:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
                  <span style={{ position:'absolute', right:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
                </div>

                {/* Form */}
                <div className="p-5 flex flex-col gap-4" style={{ background:'var(--color-surface)' }}>

                  {/* Facility name (auto-filled) */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>FACILITY</label>
                    <input type="text" value={FACILITY.name} readOnly className="w-full rounded-xl px-4 py-2.5 text-sm"
                      style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-sage)', cursor:'not-allowed' }} />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>BOOKING DATE</label>
                    <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-text)' }}
                      onFocus={e=>e.target.style.borderColor='var(--color-pine)'}
                      onBlur={e=>e.target.style.borderColor='var(--color-border)'} />
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>TIME SLOT</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {FACILITY.slots.map(slot => (
                        <button key={slot} type="button" onClick={()=>setSelectedSlot(slot)}
                          className="rounded-lg px-2 py-1.5 text-[10px] font-semibold transition-all duration-200"
                          style={{
                            fontFamily:'var(--font-mono)',
                            background: selectedSlot===slot ? 'var(--color-pine)' : 'var(--color-paper-dark)',
                            color: selectedSlot===slot ? 'var(--color-paper)' : 'var(--color-sage)',
                            border: `1.5px solid ${selectedSlot===slot ? 'transparent' : 'var(--color-border)'}`,
                          }}>
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Hours */}
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>HOURS</label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={()=>setHours(h=>Math.max(1,h-1))} className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold"
                        style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-pine)' }}>−</button>
                      <span className="flex-1 text-center text-lg font-bold" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)' }}>{hours}h</span>
                      <button type="button" onClick={()=>setHours(h=>Math.min(5,h+1))} className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold"
                        style={{ background:'var(--color-pine)', color:'var(--color-paper)' }}>+</button>
                    </div>
                  </div>

                  {/* Price breakdown */}
                  <div className="rounded-xl p-4" style={{ background:'var(--color-paper-dark)' }}>
                    <div className="flex justify-between text-xs mb-2" style={{ color:'var(--color-muted)', fontFamily:'var(--font-mono)' }}>
                      <span>৳{FACILITY.price.toLocaleString()} × {hours}h</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2" style={{ borderTop:'1px solid var(--color-border)' }}>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)' }}>Total</span>
                      <span className="text-xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Confirm */}
                  <button type="button" className="group w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background:'var(--color-pine)', color:'var(--color-paper)', boxShadow:'var(--shadow-md)' }}>
                    Confirm Booking
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-xs" style={{ color:'var(--color-muted)', fontFamily:'var(--font-mono)' }}>
                    Status set to <span style={{ color:'var(--color-clay)' }}>Pending</span> until confirmed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
