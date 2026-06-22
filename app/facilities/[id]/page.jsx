'use client';
import { use, useEffect, useState } from 'react';
import { MapPin, Users, Clock, Star, ArrowLeft, ArrowRight, Ticket } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '../../lib/auth-client'
import toast from 'react-hot-toast';

function LineArt({ facility_type }) {
  // Added vectorEffect so strokes stay 1.5px regardless of how big the SVG scales
  const s = { 
    fill: 'none', 
    stroke: 'white', 
    strokeWidth: '1.5', 
    vectorEffect: 'non-scaling-stroke' 
  };

  const art = {
    Football: <><line x1="100" y1="0" x2="100" y2="160" {...s} /><circle cx="100" cy="80" r="34" {...s} /></>,
    Badminton: <><rect x="22" y="8" width="156" height="144" {...s} /><line x1="22" y1="80" x2="178" y2="80" {...s} /></>,
    Swimming: <>{[32, 64, 96, 128].map(y => <line key={y} x1="0" y1={y} x2="200" y2={y} {...s} />)}</>,
    Tennis: <><rect x="18" y="10" width="164" height="140" {...s} /><line x1="18" y1="80" x2="182" y2="80" {...s} /><rect x="44" y="10" width="112" height="140" {...s} /></>,
    Basketball: <><path d="M28 155 A88 88 0 0 1 172 155" {...s} /><circle cx="100" cy="105" r="22" {...s} /></>,
    Cricket: <><rect x="74" y="14" width="52" height="132" {...s} /><line x1="74" y1="38" x2="126" y2="38" {...s} /><line x1="74" y1="122" x2="126" y2="122" {...s} /></>,
    Vollyball: <><circle cx="100" cy="80" r="50" {...s} />
      <path d="M56 34 Q100 80 144 126" {...s} />
      <path d="M144 34 Q100 80 56 126" {...s} />
      <line x1="50" y1="80" x2="150" y2="80" {...s} /></>,
    Table_Tennis: <><circle cx="78" cy="68" r="52" {...s} />
      <line x1="116" y1="106" x2="170" y2="154" {...s} />
      <circle cx="168" cy="20" r="11" {...s} /></>
  };

  // Changed viewBox to 0 0 200 160 and added preserveAspectRatio
  return (
    <svg 
      viewBox="0 0 200 160" 
      preserveAspectRatio="xMidYMid meet" 
      className="absolute inset-0 h-full w-full opacity-[0.12]" 
    >
      {art[facility_type]}
    </svg>
  );
}

export default function FacilityDetailPage({params}) {
  const {id} = use(params)
  const {data: session} = authClient.useSession();
  const [FULL_FACILITY, setFULL_FACILITY] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getFacility() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/${id}`);
        const {data} = await res.json();
        console.log(data)
        setFULL_FACILITY(data);
      } catch (error) {
        console.error("Failed to fetch facility:", error);
      } finally {
        setIsLoading(false);
      }
    }
    getFacility();
  }, []);

  const [selectedSlot, setSelectedSlot] = useState('');
  const [hours, setHours] = useState(1);
  const [date, setDate] = useState('');

  const handleBooking = async () => {
    const Data = {
      facility_id: id,
      user_email: session?.user?.email,
      booking_date: date,
      time_slot: selectedSlot,
      hours: hours,
      status: 'pending',
      total_price: total,
      facility_name: FULL_FACILITY.name,
      location: FULL_FACILITY.location
    }
    console.log(Data)
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        method: "POST",
        headers: {
          'content-type': "application/json"
        },
        body: JSON.stringify(Data)
      })
      const result = await res.json();
      if (result.status == 200) {
        toast.success("Your booking place successfully.")
      }
    }
    catch{
      toast.error("Something went wrong. Please try again later.")
    }
  }
  
  const pricePerHour = FULL_FACILITY?.price_per_hour || 0;
  const total = pricePerHour * hours;

  if (isLoading) {
    return (
      <div style={{ background: 'var(--color-paper)', minHeight: '100vh'}} className="flex items-center justify-center">
        <p style={{ fontFamily:'var(--font-mono)', color:'var(--color-sage)' }}>Loading facility details...</p>
      </div>
    );
  }

  if (!FULL_FACILITY) {
    return (
      <div style={{ background: 'var(--color-paper)', minHeight: '100vh'}} className="flex items-center justify-center flex-col gap-4">
        <p style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)' }}>Facility not found.</p>
        <Link href="/facilities" className="text-sm font-semibold underline" style={{ color: 'var(--color-sage)' }}>Go back</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh'}}>

      <div className="pt-28 pb-6 px-6 lg:px-10 mx-auto max-w-7xl">
        <Link href="/facilities" className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:-translate-x-1"
          style={{ color: 'var(--color-sage)' }}>
          <ArrowLeft className="h-4 w-4" /> Back to Facilities
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">

          <div className="lg:col-span-2">

            <div style={{ position:'relative', overflow:'hidden', height:'20rem', background:FULL_FACILITY?.grad, borderRadius:'2rem' }}>
              {LineArt({facility_type: FULL_FACILITY?.facility_type})}
              <div className="absolute bottom-6 left-6">
                <span style={{ display:'inline-flex', alignItems:'center', gap:'6px', background:'rgba(255,255,255,0.14)', backdropFilter:'blur(12px)', borderRadius:'999px', padding:'0.3rem 0.9rem', fontSize:'11px', fontFamily:'var(--font-mono)', color:'var(--color-court)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>
                  <Ticket className="h-3.5 w-3.5" /> {FULL_FACILITY?.facility_type}
                </span>
              </div>
              <div className="absolute top-6 right-6 flex items-center gap-1.5 rounded-full px-3 py-1.5"
                style={{ background:'rgba(255,255,255,0.14)', backdropFilter:'blur(12px)' }}>
                <span style={{ color:'#F59E0B', fontSize:'13px' }}>★</span>
                <span style={{ fontSize:'13px', fontWeight:600, color:'white', fontFamily:'var(--font-mono)' }}>{FULL_FACILITY?.rating}</span>
                <span style={{ fontSize:'12px', color:'rgba(255,255,255,0.65)' }}>({FULL_FACILITY?.reviews})</span>
              </div>
            </div>

            <div className="mt-7 mb-5">
              <h1 className="text-3xl lg:text-4xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)', lineHeight:1.1 }}>{FULL_FACILITY?.name}</h1>
              <p className="mt-2 flex items-center gap-1.5 text-sm" style={{ color:'var(--color-sage)' }}>
                <MapPin className="h-4 w-4" /> {FULL_FACILITY?.location}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {[
                [Users, FULL_FACILITY?.capacity, 'Capacity'],
                [Clock, '6 AM - 11 PM', 'Operating Hours'],
                [Star, `${FULL_FACILITY?.rating} / 5.0`, 'Rating'],
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

            <div className="mb-8">
              <h2 className="text-xl mb-3" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>About this venue</h2>
              <p className="text-sm leading-relaxed" style={{ color:'var(--color-sage)' }}>{FULL_FACILITY?.description}</p>
            </div>

            
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div style={{ borderRadius:'1.75rem', boxShadow:'var(--shadow-lg)', overflow:'hidden' }}>

                <div className="p-5" style={{ background:FULL_FACILITY?.grad, position:'relative' }}>
                  <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-court)' }}>Book Your Pass</p>
                  <p className="mt-1 text-lg" style={{ fontFamily:'var(--font-display)', color:'var(--color-paper)' }}>{FULL_FACILITY?.name}</p>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span style={{ fontSize:'1.75rem', fontFamily:'var(--font-display)', color:'var(--color-paper)' }}>৳{FULL_FACILITY?.price_per_hour?.toLocaleString() || 0}</span>
                    <span style={{ fontSize:'12px', color:'rgba(241,242,234,0.65)' }}>/hr</span>
                  </div>
                </div>

                <div style={{ position:'relative', borderTop:'2px dashed var(--color-border)', background:'var(--color-surface)' }}>
                  <span style={{ position:'absolute', left:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
                  <span style={{ position:'absolute', right:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
                </div>

                <div className="p-5 flex flex-col gap-4" style={{ background:'var(--color-surface)' }}>

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>FACILITY</label>
                    <input type="text" value={FULL_FACILITY?.name || ''} readOnly className="w-full rounded-xl px-4 py-2.5 text-sm"
                      style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-sage)', cursor:'not-allowed' }} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>BOOKING DATE</label>
                    <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-text)' }}
                      onFocus={e=>e.target.style.borderColor='var(--color-pine)'}
                      onBlur={e=>e.target.style.borderColor='var(--color-border)'} />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>TIME SLOT</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {FULL_FACILITY?.slots?.map(slot => (
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

                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em' }}>HOURS</label>
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={()=>setHours(h=>Math.max(1,h-1))} className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold"
                        style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-pine)' }}>-</button>
                      <span className="flex-1 text-center text-lg font-bold" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)' }}>{hours}h</span>
                      <button type="button" onClick={()=>setHours(h=>Math.min(5,h+1))} className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-bold"
                        style={{ background:'var(--color-pine)', color:'var(--color-paper)' }}>+</button>
                    </div>
                  </div>

                  <div className="rounded-xl p-4" style={{ background:'var(--color-paper-dark)' }}>
                    <div className="flex justify-between text-xs mb-2" style={{ color:'var(--color-muted)', fontFamily:'var(--font-mono)' }}>
                      <span>৳{FULL_FACILITY?.price_per_hour?.toLocaleString() || 0} × {hours}h</span>
                      <span>৳{total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2" style={{ borderTop:'1px solid var(--color-border)' }}>
                      <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)' }}>Total</span>
                      <span className="text-xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>৳{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button type="button" onClick={handleBooking} className="group w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
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