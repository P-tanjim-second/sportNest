'use client';
import { useState } from 'react';
import { Upload, Plus, X, ArrowRight } from 'lucide-react';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SPORT_TYPES = ['Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Cricket', 'Volleyball', 'Table_Tennis'];
const DEFAULT_SLOTS = ['06:00-07:00', '07:00-08:00', '08:00-09:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00'];

const facilityThemes = [
  {
    facility_type: 'Football',
    grad: 'linear-gradient(155deg,#16332A,#234A3B)',
    accent: '#D4E157',
  },
  {
    facility_type: 'Badminton',
    grad: 'linear-gradient(155deg,#1A3A4A,#2A5A6B)',
    accent: '#A8D8EA',
  },
  {
    facility_type: 'Swimming',
    grad: 'linear-gradient(155deg,#1A4A6B,#2A6B8A)',
    accent: '#93E4DC',
  },
  {
    facility_type: 'Tennis',
    grad: 'linear-gradient(155deg,#2D4A35,#3D6347)',
    accent: '#D4E157',
  },
  {
    facility_type: 'Basketball',
    grad: 'linear-gradient(155deg,#6B2A0E,#C2502E)',
    accent: '#F4C89A',
  },
  {
    facility_type: 'Cricket',
    grad: 'linear-gradient(155deg,#3A2A1A,#5C4A2A)',
    accent: '#D4C09A',
  },
  {
    facility_type: 'Table_Tennis',
    grad: 'linear-gradient(155deg,#1A3A4A,#2A5A6B)',
    accent: '#A8D8EA',
  },
  {
    facility_type: 'Volleyball',
    grad: 'linear-gradient(155deg,#6B2A0E,#C2502E)',
    accent: '#F4C89A',
  },

];

const label = (txt, hint) => (
  <div className="flex items-center justify-between mb-2">
    <label className="text-xs font-semibold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-pine)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{txt}</label>
    {hint && <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{hint}</span>}
  </div>
);

export default function AddFacilityPage() {
  const [slots, setSlots] = useState([]);
  const [sportType, setSportType] = useState('');
  const [newSlot, setNewSlot] = useState('');
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const addSlot = (s) => { if (s && !slots.includes(s)) setSlots(prev => [...prev, s]); };
  const removeSlot = (s) => setSlots(prev => prev.filter(x => x !== s));

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300";
  const inputSt = { background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' };
  const foc = e => (e.target.style.borderColor = 'var(--color-pine)');
  const blr = e => (e.target.style.borderColor = 'var(--color-border)');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const themeGradient = facilityThemes.find(theme => theme.facility_type === data.facility_type);

    const facility = {
      ...data,
      slots,
      owner_email: user?.email,
      booking_count: 0,
      rating: Number((Math.random() * 4 + 1).toFixed(1)),
      status: 'active',
      ...themeGradient,
      created_at: new Date().toString(),
    };
    console.log(facility)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/add_facility`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(facility),
      });
      const result = await res.json();
      if (result.status === 200) {
        toast.success('Facility published successfully!');
        router.push('/manage-facilities');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Could not add the facility.');
    }
  };

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>

      <div className="pt-32 pb-12 px-6 lg:px-10" style={{ background: 'var(--color-paper-dark)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-4xl">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-clay)', marginBottom: '0.6rem' }}>Private Route</p>
          <h1 className="text-4xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Add a Facility</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--color-sage)' }}>List your venue and start receiving bookings. Facility data is stored securely.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-10 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">

            <div className="lg:col-span-2 flex flex-col gap-6">

              <div className="rounded-2xl p-7" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                <h2 className="text-lg mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Basic Information</h2>
                <div className="flex flex-col gap-4">

                  <div>{label('Facility Name')}
                    <input required name="name" type="text" placeholder="e.g. Riverside Football Turf" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr} />
                  </div>

                  <div>{label('Facility Type')}
                    <select required name="facility_type" value={sportType} onChange={e => setSportType(e.target.value)} className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}>
                      <option value="">Select a sport type</option>
                      {SPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>{label('Description')}
                    <textarea required name="description" rows={4} placeholder="Describe your facility. Write about pitch type, amenities, special features…" className={inputCls} style={{ ...inputSt, resize: 'none' }} onFocus={foc} onBlur={blr} />
                  </div>

                </div>
              </div>

              <div className="rounded-2xl p-7" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                <h2 className="text-lg mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Facility Image</h2>
                <div>
                  {label('Image URL')}
                  <input required name='image_url' type="url" placeholder="https://i.ibb.co/yourimage.jpg" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr} />
                </div>
                <div className="mt-4 flex flex-col items-center justify-center rounded-xl py-10 cursor-pointer transition-all duration-300"
                  style={{ border: '2px dashed var(--color-border)', background: 'var(--color-paper-dark)' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-pine)'; e.currentTarget.style.background = 'var(--color-court-soft)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.background = 'var(--color-paper-dark)'; }}>
                  <Upload className="h-8 w-8 mb-2" style={{ color: 'var(--color-muted)' }} />
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-pine)' }}>Click to upload or drag here</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>PNG, JPG up to 5 MB</p>
                </div>
              </div>

              <div className="rounded-2xl p-7" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                <h2 className="text-lg mb-5" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Location & Pricing</h2>
                <div className="flex flex-col gap-4">

                  <div>{label('Location / Address')}
                    <input required name="location" type="text" placeholder="e.g. Road 54, Gulshan-2, Dhaka 1212" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr} />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>{label('Price per Hour', '৳')}
                      <input required name="price_per_hour" type="number" placeholder="2500" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr} />
                    </div>
                    <div>{label('Capacity')}
                      <input required name="capacity" type="number" placeholder="22" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr} />
                    </div>
                  </div>

                </div>
              </div>

              <div className="rounded-2xl p-7" style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)' }}>
                <h2 className="text-lg mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Available Time Slots</h2>
                <p className="text-xs mb-5" style={{ color: 'var(--color-muted)' }}>Select from presets or add a custom slot.</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {DEFAULT_SLOTS.map(s => {
                    const active = slots.includes(s);
                    return (
                      <button key={s} type="button" onClick={() => active ? removeSlot(s) : addSlot(s)}
                        className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                        style={{ fontFamily: 'var(--font-mono)', background: active ? 'var(--color-pine)' : 'var(--color-paper-dark)', color: active ? 'var(--color-paper)' : 'var(--color-sage)', border: `1.5px solid ${active ? 'transparent' : 'var(--color-border)'}` }}>
                        {s}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-2">
                  <input type="text" placeholder="e.g. 22:00-23:00" value={newSlot} onChange={e => setNewSlot(e.target.value)}
                    className={inputCls + ' flex-1'} style={inputSt} onFocus={foc} onBlur={blr} />
                  <button type="button" onClick={() => { addSlot(newSlot); setNewSlot(''); }}
                    className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                    style={{ background: 'var(--color-pine)', color: 'var(--color-paper)' }}>
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                {slots.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {slots.map(s => (
                      <span key={s} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                        style={{ background: 'var(--color-court-soft)', color: 'var(--color-pine)', fontFamily: 'var(--font-mono)' }}>
                        {s}
                        <button type="button" onClick={() => removeSlot(s)}><X className="h-3 w-3" /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-28 flex flex-col gap-5">

                <div className="rounded-2xl p-5" style={{ background: 'var(--color-pine)', boxShadow: 'var(--shadow-md)' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-court)', marginBottom: '0.75rem' }}>Auto-filled</p>
                  <p className="text-sm mb-1" style={{ color: 'rgba(241,242,234,0.65)', fontFamily: 'var(--font-mono)' }}>Owner Email</p>
                  <p className="text-sm" style={{ color: 'var(--color-paper)', fontFamily: 'var(--font-mono)' }}>{session?.user?.email ?? 'your@email.com'}</p>
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: 'rgba(241,242,234,0.45)' }}>Your email is linked automatically and cannot be changed from this form.</p>
                </div>

                <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'var(--color-court)', color: 'var(--color-pine)', boxShadow: 'var(--shadow-md)' }}>
                  Publish Facility
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button type="button" className="w-full rounded-full py-3 text-sm font-semibold"
                  style={{ background: 'transparent', border: '1.5px solid var(--color-border)', color: 'var(--color-sage)' }}>
                  Save as Draft
                </button>

                <p className="text-xs text-center" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                  By publishing, you agree to SportNest's venue listing guidelines.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
