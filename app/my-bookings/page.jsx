'use client';
import { useEffect, useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, X, Trash2 } from 'lucide-react';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  pending: { bg: 'var(--color-court-soft)', color: '#7A7000', label: 'Pending' },
  confirmed: { bg: '#D4EAD8', color: '#1A4A2A', label: 'Confirmed' },
};

function BookingCard({ b, setDeleteTarget }) {

  const st = STATUS_STYLES[b.status];
  return (
    <div style={{ borderRadius: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: '7rem', background: b.grad, borderRadius: '1.5rem 1.5rem 0 0' }}>
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <div className="flex items-center justify-between">
            <span style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '10px', fontFamily: 'var(--font-mono)', color: b.accent, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              {b.facility_type}
            </span>
            <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.08em' }}>{b.id}</span>
          </div>
          <p style={{ fontSize: '1.05rem', fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1.25 }}>{b.facility_name}</p>
        </div>
      </div>

      <div style={{ position: 'relative', borderTop: '2px dashed var(--color-border)' }}>
        <span style={{ position: 'absolute', left: -9, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-paper)' }} />
        <span style={{ position: 'absolute', right: -9, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-paper)' }} />
      </div>

      <div style={{ background: 'var(--color-surface)', borderRadius: '0 0 1.5rem 1.5rem', padding: '1rem 1.25rem' }}>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            [Calendar, 'booking_date', b.booking_date],
            [Clock, 'time_slot', b.time_slot],
            [MapPin, 'Venue', b.location],
            [Ticket, 'Hours', `${b.hours}h · ৳${b.total_price.toLocaleString()}`],
          ].map(([Icon, label, val]) => (
            <div key={label} className="flex items-start gap-2">
              <Icon className="h-3.5 w-3.5 mt-0.5 shrink-0" style={{ color: 'var(--color-muted)' }} />
              <div>
                <p style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
                <p style={{ fontSize: '11px', color: 'var(--color-pine)', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{val}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: st.bg, color: st.color, fontFamily: 'var(--font-mono)' }}>
            {st.label}
          </span>
          <button onClick={() => setDeleteTarget(b)} className="inline-flex items-center gap-1 text-xs font-semibold transition-colors duration-200"
            style={{ color: 'var(--color-clay)' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
            <X className="h-3.5 w-3.5" /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingCardSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div
        style={{
          height: "7rem",
          padding: "1.25rem",
          background:
            "linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.15))",
        }}
        className="flex flex-col justify-between"
      >
        <div className="flex justify-between items-center">
          <div className="h-5 w-20 rounded-full bg-white/20" />
          <div className="h-3 w-16 rounded bg-white/10" />
        </div>

        <div className="space-y-2">
          <div className="h-5 w-44 rounded bg-white/20" />
          <div className="h-4 w-32 rounded bg-white/10" />
        </div>
      </div>

      <div
        style={{
          position: "relative",
          borderTop: "2px dashed var(--color-border)",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: -9,
            top: -9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "var(--color-paper)",
          }}
        />
        <span
          style={{
            position: "absolute",
            right: -9,
            top: -9,
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "var(--color-paper)",
          }}
        />
      </div>

      <div
        style={{
          background: "var(--color-surface)",
          padding: "1rem 1.25rem",
          borderRadius: "0 0 1.5rem 1.5rem",
        }}
      >
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex gap-2">
              <div
                className="rounded-full mt-1"
                style={{
                  width: 14,
                  height: 14,
                  background: "var(--color-border)",
                }}
              />

              <div className="flex-1">
                <div
                  className="rounded mb-2"
                  style={{
                    height: 8,
                    width: "50%",
                    background: "var(--color-border)",
                  }}
                />

                <div
                  className="rounded"
                  style={{
                    height: 12,
                    width: "80%",
                    background: "var(--color-border)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div
            className="rounded-full"
            style={{
              width: 90,
              height: 28,
              background: "var(--color-border)",
            }}
          />

          <div
            className="rounded"
            style={{
              width: 70,
              height: 16,
              background: "var(--color-border)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ConfirmModal({ facilityName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(22,51,42,0.5)', backdropFilter: 'blur(6px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-8 text-center" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-float)' }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto mb-5"
          style={{ background: 'var(--color-clay-soft)' }}>
          <Trash2 className="h-6 w-6" style={{ color: 'var(--color-clay)' }} />
        </div>
        <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Cancel Booking?</h3>
        <p className="text-sm mb-7" style={{ color: 'var(--color-sage)' }}>
          <span className="font-semibold" style={{ color: 'var(--color-pine)' }}>{facilityName}</span> will be permanently removed. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-full py-2.5 text-sm font-semibold"
            style={{ background: 'var(--color-paper-dark)', border: '1.5px solid var(--color-border)', color: 'var(--color-sage)' }}>
            Keep it
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-full py-2.5 text-sm font-semibold"
            style={{ background: 'var(--color-clay)', color: 'white', boxShadow: 'var(--shadow-sm)' }}>
            Yes, cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsPage() {
  const [BOOKINGS, setBOOKINGS] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    async function getBookings() {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${session?.user?.email}`);
        const { data } = await res.json();
        const bookings = data.map(booking => {
          return {
            ...booking,
            id: booking.facility_id
          }
        })
        setBOOKINGS(bookings);
        setBookings(bookings);
        setIsLoading(false);
      }
      catch {
        toast.error("Something went wrong please try again later.")
        setIsLoading(false)
      }
    }
    getBookings();
  }, [session?.user?.email])
  const [bookings, setBookings] = useState(BOOKINGS);

  const updateBooking = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/facility/inc_dec_booking/${deleteTarget.id}/${-1}`, {
      method: "PATCH",
      headers: {
        'content-type': "application/json"
      }
    })
  }

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/cancel/${deleteTarget.id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json'
        }
      })
      const { data } = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Booking canceled successfully.");
        updateBooking();
        window.location.reload();
      }
    }
    catch {
      toast.error("Something wrong. Booking can't be canceled.")
    }
    setDeleteTarget(null);
  };

  const [filter, setFilter] = useState('All');

  const statuses = ['All', 'Confirmed', 'Pending'];
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter.toLowerCase());

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>

      {deleteTarget && <ConfirmModal facilityName={deleteTarget.facility_name} onConfirm={confirmDelete} onCancel={() => setDeleteTarget(null)} />}

      <div className="pt-32 pb-12 px-6 lg:px-10" style={{ background: 'var(--color-paper-dark)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-7xl">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-clay)', marginBottom: '0.6rem' }}>Private Route</p>
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>My Bookings</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-sage)' }}>All your past and upcoming reservations in one place.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              ['Total', bookings.length, 'var(--color-pine)'],
              ['Confirmed', bookings.filter(b => b.status === 'confirmed').length, '#1A4A2A'],
              ['Pending', bookings.filter(b => b.status === 'pending').length, '#7A7000'],
            ].map(([label, count, col]) => (
              <div key={label} className="rounded-2xl px-5 py-3" style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                <p style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', color: col }}>{count}</p>
                <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
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
              <button key={s} onClick={() => setFilter(s)} className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300"
                style={{ background: active ? 'var(--color-pine)' : 'var(--color-surface)', color: active ? 'var(--color-paper)' : 'var(--color-sage)', border: `1.5px solid ${active ? 'transparent' : 'var(--color-border)'}` }}>
                {s}
              </button>
            );
          })}
        </div>

        {isLoading ?

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BookingCardSkeleton key={i} />
            ))}
          </div>
          : filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(b => <BookingCard key={b.id} b={b} setDeleteTarget={setDeleteTarget} />)}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-5xl mb-4">🎟️</p>
              <p className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>No bookings found</p>
              <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>Looks like you don't have any {filter.toLowerCase()} bookings yet.</p>
              <a href="/facilities" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
                style={{ background: 'var(--color-pine)', color: 'var(--color-paper)', boxShadow: 'var(--shadow-sm)' }}>
                Browse Facilities
              </a>
            </div>
          )}
      </div>
    </div>
  );
}
