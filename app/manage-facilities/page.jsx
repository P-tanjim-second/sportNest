'use client';
import { useEffect, useState } from 'react';
import { Pencil, Trash2, ArrowRight, Plus } from 'lucide-react';
import { authClient } from '../lib/auth-client'
import toast from 'react-hot-toast';

function ConfirmModal({ facilityName, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background:'rgba(22,51,42,0.5)', backdropFilter:'blur(6px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-8 text-center" style={{ background:'var(--color-surface)', boxShadow:'var(--shadow-float)' }}>
        <div className="flex h-14 w-14 items-center justify-center rounded-full mx-auto mb-5"
          style={{ background:'var(--color-clay-soft)' }}>
          <Trash2 className="h-6 w-6" style={{ color:'var(--color-clay)' }}/>
        </div>
        <h3 className="text-xl mb-2" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Delete Facility?</h3>
        <p className="text-sm mb-7" style={{ color:'var(--color-sage)' }}>
          <span className="font-semibold" style={{ color:'var(--color-pine)' }}>{facilityName}</span> will be permanently removed. This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-full py-2.5 text-sm font-semibold"
            style={{ background:'var(--color-paper-dark)', border:'1.5px solid var(--color-border)', color:'var(--color-sage)' }}>
            Keep it
          </button>
          <button onClick={onConfirm} className="flex-1 rounded-full py-2.5 text-sm font-semibold"
            style={{ background:'var(--color-clay)', color:'white', boxShadow:'var(--shadow-sm)' }}>
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManageFacilitiesPage() {
  const {data: session} = authClient.useSession();
  const email = session?.user?.email;
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    if (!email) return;
    async function getMyFacilities() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my-facilities/${email}`);
        const { data } = await res.json();
        setFacilities(data);
      } catch {
        setFacilities([]);
      } finally {
        setLoading(false);
      }
    }
    getMyFacilities();
  }, [email]);

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/my_facility/delete/${deleteTarget._id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = await res.json();
      if (data.status == 200 ) {
        toast.success("Facility deleted successfully.");
        window.location.reload();
      }
    }
    catch{
      toast.error("Something wrong. Facility can't be delete.")
    }
    setDeleteTarget(null);
  };

  return (
    <div style={{ background:'var(--color-paper)', minHeight:'100vh' }}>
      {deleteTarget && <ConfirmModal facilityName={deleteTarget.name} onConfirm={confirmDelete} onCancel={()=>setDeleteTarget(null)}/>}

      <div className="pt-32 pb-12 px-6 lg:px-10" style={{ background:'var(--color-paper-dark)', borderBottom:'1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--color-clay)', marginBottom:'0.6rem' }}>Private Route</p>
            <h1 className="text-4xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Manage Facilities</h1>
            <p className="mt-2 text-sm" style={{ color:'var(--color-sage)' }}>Update, pause, or delete your listed venues.</p>
          </div>
          <a href="/add-facility" className="group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold self-start transition-all duration-300 hover:-translate-y-0.5"
            style={{ background:'var(--color-pine)', color:'var(--color-paper)', boxShadow:'var(--shadow-sm)' }}>
            <Plus className="h-4 w-4"/> Add New Facility
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">

        <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ['Total Venues', facilities.length],
            ['Active', 0],
            ['Total Bookings', 0],
            ['Avg Rating', 0],
          ].map(([l,v])=>(
            <div key={l} className="rounded-2xl p-5" style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
              <p style={{ fontSize:'1.7rem', fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>{v}</p>
              <p style={{ fontSize:'10px', fontFamily:'var(--font-mono)', color:'var(--color-muted)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'3px' }}>{l}</p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl overflow-hidden animate-pulse"
                style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', height: '96px' }} />
            ))}
          </div>
        ) : facilities.length > 0 ? (
          <div className="flex flex-col gap-4">
            {facilities.map(f => (
              <div key={f._id} className="rounded-2xl overflow-hidden"
                style={{ background:'var(--color-surface)', border:'1.5px solid var(--color-border)', boxShadow:'var(--shadow-sm)' }}>
                <div className="flex flex-col sm:flex-row">

                  <div style={{ minWidth:'6px', background:f.grad }} className="hidden sm:block"/>

                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-4 p-5">

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ fontFamily:'var(--font-mono)', background:`${f.accent}40`, color:'var(--color-pine)', border:`1px solid ${f.accent}80` }}>
                          {f.facility_type}
                        </span>
                        <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold" style={{ fontFamily:'var(--font-mono)', background:f.status==='active'?'#D4EAD8':'var(--color-paper-dark)', color:f.status==='active'?'#1A4A2A':'var(--color-muted)' }}>
                          {f.status === 'active' ? '● Active' : '○ Inactive'}
                        </span>
                      </div>
                      <p className="text-base" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>{f.name}</p>
                      <p className="text-xs mt-0.5" style={{ color:'var(--color-muted)', fontFamily:'var(--font-mono)' }}>{f.location}</p>
                    </div>

                    <div className="flex gap-6 sm:gap-8">
                      {[['Price_per_hour',f.price_per_hour],[`Bookings`,f.booking_count],['Rating',`★ ${f.rating}`]].map(([l,v])=>(
                        <div key={l} className="text-center">
                          <p style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', fontWeight:700, fontSize:'0.95rem' }}>{l == "Price_per_hour" ? "৳" : ""}{v}</p>
                          <p style={{ fontSize:'9px', fontFamily:'var(--font-mono)', color:'var(--color-muted)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:'2px' }}>{l}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <a href={`/facilities/${f.id}/edit`} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                        style={{ background:'var(--color-pine)', color:'var(--color-paper)', boxShadow:'var(--shadow-sm)' }}>
                        <Pencil className="h-3 w-3"/> Edit
                      </a>
                      <button onClick={()=>setDeleteTarget(f)} className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5"
                        style={{ background:'var(--color-clay-soft)', color:'var(--color-clay)' }}>
                        <Trash2 className="h-3.5 w-3.5"/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-5xl mb-4">🏟️</p>
            <p className="text-xl mb-2" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>No facilities yet</p>
            <p className="text-sm mb-6" style={{ color:'var(--color-muted)' }}>Add your first venue and start receiving bookings.</p>
            <a href="/add-facility" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold"
              style={{ background:'var(--color-pine)', color:'var(--color-paper)' }}>
              <Plus className="h-4 w-4"/> Add Facility
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
