'use client';
import { useEffect, useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, X } from 'lucide-react';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  pending:   { bg:'var(--color-court-soft)',  color:'#7A7000', label:'Pending' },
  confirmed: { bg:'#D4EAD8',                  color:'#1A4A2A', label:'Confirmed' },
  cancelled: { bg:'var(--color-clay-soft)',   color:'var(--color-clay)', label:'Cancelled' },
};

function BookingCard({ b, onCancel }) {
  
  const st = STATUS_STYLES[b.status];
  return (
    <div style={{ borderRadius:'1.5rem', boxShadow:'var(--shadow-md)', opacity: b.status==='cancelled' ? 0.65 : 1 }}>
      <div style={{ position:'relative', overflow:'hidden', height:'7rem', background:b.grad, borderRadius:'1.5rem 1.5rem 0 0' }}>
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span style={{ background:'rgba(255,255,255,0.14)', backdropFilter:'blur(8px)', borderRadius:'999px', padding:'0.2rem 0.75rem', fontSize:'10px', fontFamily:'var(--font-mono)', color:b.accent, fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase' }}>
              {b.facility_type}
            </span>
            <span style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'rgba(255,255,255,0.55)', letterSpacing:'0.08em' }}>{b.id}</span>
          </div>
          <p style={{ fontSize:'1.05rem', fontFamily:'var(--font-display)', color:'white', lineHeight:1.25 }}>{b.facility_name}</p>
        </div>
      </div>

      <div style={{ position:'relative', borderTop:'2px dashed var(--color-border)' }}>
        <span style={{ position:'absolute', left:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
        <span style={{ position:'absolute', right:-9, top:-9, width:18, height:18, borderRadius:'50%', background:'var(--color-paper)' }}/>
      </div>

      <div style={{ background:'var(--color-surface)', borderRadius:'0 0 1.5rem 1.5rem', padding:'1rem 1.25rem' }}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            [Calendar, 'booking_date',    b.booking_date],
            [Clock,    'time_slot',    b.time_slot],
            [MapPin,   'Venue',   b.location],
            [Ticket,   'Hours',   `${b.hours}h · ৳${b.total_price.toLocaleString()}`],
          ].map(([Icon, label, val]) => (
            <div key={label} className="flex items-start gap-2">
              <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color:'var(--color-muted)' }} />
              <div>
                <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'var(--color-muted)', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</p>
                <p style={{ fontSize:'11px', color:'var(--color-pine)', marginTop:'2px', fontFamily:'var(--font-mono)' }}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop:'1px solid var(--color-border)' }}>
          <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background:st.bg, color:st.color, fontFamily:'var(--font-mono)' }}>
            {st.label}
          </span>
          {b.status !== 'cancelled' && (
            <button onClick={() => onCancel(b.id)} className="inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
              style={{ color:'var(--color-clay)' }}
              onMouseEnter={e=>e.currentTarget.style.opacity='0.75'}
              onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              <X className="h-3.5 w-3.5" /> Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const [BOOKINGS, setBOOKINGS] =useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {data: session} = authClient.useSession();

  useEffect(()=> {
    async function getBookings () {
      try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${session?.user?.email}`);
        const {data} = await res.json();
        const bookings = data.map(booking => {
          return {
            ...booking,
            id: booking.facility_id
          }
        })
        setBOOKINGS(bookings);
        setBookings(bookings);
      }
      catch{
        toast.error("Something went wrong please try again later.")
      }
    }
    getBookings();
  },[session?.user?.email])
  const [bookings, setBookings] = useState(BOOKINGS);
  console.log(bookings)
  const [filter, setFilter] = useState('All');

  const cancel = id => setBookings(bs => bs.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));

  const statuses = ['All', 'Confirmed', 'Pending', 'Cancelled'];
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter.toLowerCase());

  return (
    <div style={{ background:'var(--color-paper)', minHeight:'100vh' }}>

      <div className="pt-32 pb-12 px-6 lg:px-10" style={{ background:'var(--color-paper-dark)', borderBottom:'1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-7xl">
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--color-clay)', marginBottom:'0.6rem' }}>Private Route</p>
          <h1 className="text-4xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>My Bookings</h1>
          <p className="mt-2 text-sm" style={{ color:'var(--color-sage)' }}>All your past and upcoming reservations in one place.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ['Total', bookings.length, 'var(--color-pine)'],
              ['Confirmed', bookings.filter(b=>b.status==='confirmed').length, '#1A4A2A'],
              ['Pending', bookings.filter(b=>b.status==='pending').length, '#7A7000'],
              ['Cancelled', bookings.filter(b=>b.status==='cancelled').length, 'var(--color-clay)'],
            ].map(([label, count, col]) => (
              <div key={label} className="rounded-2xl px-5 py-3" style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
                <p style={{ fontSize:'1.4rem', fontFamily:'var(--font-display)', color:col }}>{count}</p>
                <p style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'var(--color-muted)', letterSpacing:'0.1em', textTransform:'uppercase' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">

        <div className="mb-8 flex flex-wrap gap-2">
          {statuses.map(s => {
            const active = filter === s;
            return (
              <button key={s} onClick={()=>setFilter(s)} className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
                style={{ background:active?'var(--color-pine)':'var(--color-surface)', color:active?'var(--color-paper)':'var(--color-sage)', border:`1.5px solid ${active?'transparent':'var(--color-border)'}` }}>
                {s}
              </button>
            );
          })}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(b => <BookingCard key={b.id} b={b} onCancel={cancel} />)}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-5xl mb-4">🎟️</p>
            <p className="text-xl mb-2" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>No bookings found</p>
            <p className="text-sm mb-6" style={{ color:'var(--color-muted)' }}>Looks like you don't have any {filter.toLowerCase()} bookings yet.</p>
            <a href="/facilities" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              style={{ background:'var(--color-pine)', color:'var(--color-paper)', boxShadow:'var(--shadow-sm)' }}>
              Browse Facilities
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
