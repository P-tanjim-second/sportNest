'use client';
import { useState } from 'react';
import { Upload, Plus, X, ArrowRight } from 'lucide-react';

const SPORT_TYPES = ['Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Cricket', 'Volleyball', 'Table Tennis'];
const DEFAULT_SLOTS = ['06:00–07:00', '07:00–08:00', '08:00–09:00', '17:00–18:00', '18:00–19:00', '19:00–20:00', '20:00–21:00'];

const label = (txt, hint) => (
  <div className="flex items-center justify-between mb-2">
    <label className="text-xs font-semibold" style={{ fontFamily:'var(--font-mono)', color:'var(--color-pine)', letterSpacing:'0.06em', textTransform:'uppercase' }}>{txt}</label>
    {hint && <span className="text-xs" style={{ color:'var(--color-muted)' }}>{hint}</span>}
  </div>
);

export default function AddFacilityPage() {
  const [slots, setSlots] = useState([]);
  const [sportType, setSportType] = useState('');
  const [newSlot, setNewSlot] = useState('');

  const addSlot = (s) => { if (s && !slots.includes(s)) setSlots(prev => [...prev, s]); };
  const removeSlot = (s) => setSlots(prev => prev.filter(x => x !== s));

  const inputCls = "w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300";
  const inputSt  = { background:'var(--color-surface)', border:'1.5px solid var(--color-border)', color:'var(--color-text)', fontFamily:'var(--font-body)' };
  const foc = e => (e.target.style.borderColor = 'var(--color-pine)');
  const blr = e => (e.target.style.borderColor = 'var(--color-border)');

  return (
    <div style={{ background:'var(--color-paper)', minHeight:'100vh' }}>

      {/* Page header */}
      <div className="pt-32 pb-12 px-6 lg:px-10" style={{ background:'var(--color-paper-dark)', borderBottom:'1px solid var(--color-border)' }}>
        <div className="mx-auto max-w-4xl">
          <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--color-clay)', marginBottom:'0.6rem' }}>Private Route</p>
          <h1 className="text-4xl" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Add a Facility</h1>
          <p className="mt-2 text-sm" style={{ color:'var(--color-sage)' }}>List your venue and start receiving bookings. Facility data is stored securely.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 lg:px-10 py-12">
        <div className="grid gap-8 lg:grid-cols-3">

          {/* ── Main form ── */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Section: Basic Info */}
            <div className="rounded-2xl p-7" style={{ background:'var(--color-surface)', boxShadow:'var(--shadow-sm)', border:'1px solid var(--color-border)' }}>
              <h2 className="text-lg mb-5" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Basic Information</h2>
              <div className="flex flex-col gap-4">

                <div>{label('Facility Name')}
                  <input type="text" placeholder="e.g. Riverside Football Turf" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}/>
                </div>

                <div>{label('Facility Type')}
                  <select value={sportType} onChange={e=>setSportType(e.target.value)} className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}>
                    <option value="">Select a sport type</option>
                    {SPORT_TYPES.map(t=><option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div>{label('Description')}
                  <textarea rows={4} placeholder="Describe your facility — pitch type, amenities, special features…" className={inputCls} style={{ ...inputSt, resize:'none' }} onFocus={foc} onBlur={blr}/>
                </div>

              </div>
            </div>

            {/* Section: Location & Pricing */}
            <div className="rounded-2xl p-7" style={{ background:'var(--color-surface)', boxShadow:'var(--shadow-sm)', border:'1px solid var(--color-border)' }}>
              <h2 className="text-lg mb-5" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Location & Pricing</h2>
              <div className="flex flex-col gap-4">

                <div>{label('Location / Address')}
                  <input type="text" placeholder="e.g. Road 54, Gulshan-2, Dhaka 1212" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>{label('Price per Hour', '৳')}
                    <input type="number" placeholder="2500" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}/>
                  </div>
                  <div>{label('Capacity')}
                    <input type="number" placeholder="22" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}/>
                  </div>
                </div>

              </div>
            </div>

            {/* Section: Image Upload */}
            <div className="rounded-2xl p-7" style={{ background:'var(--color-surface)', boxShadow:'var(--shadow-sm)', border:'1px solid var(--color-border)' }}>
              <h2 className="text-lg mb-5" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Facility Image</h2>
              <div>
                {label('Image URL', 'via imgbb or postimage')}
                <input type="url" placeholder="https://i.ibb.co/yourimage.jpg" className={inputCls} style={inputSt} onFocus={foc} onBlur={blr}/>
              </div>
              <div className="mt-4 flex flex-col items-center justify-center rounded-xl py-10 cursor-pointer transition-all duration-300"
                style={{ border:'2px dashed var(--color-border)', background:'var(--color-paper-dark)' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--color-pine)';e.currentTarget.style.background='var(--color-court-soft)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--color-border)';e.currentTarget.style.background='var(--color-paper-dark)';}}>
                <Upload className="h-8 w-8 mb-2" style={{ color:'var(--color-muted)' }}/>
                <p className="text-sm font-semibold" style={{ color:'var(--color-pine)' }}>Click to upload or drag here</p>
                <p className="text-xs mt-1" style={{ color:'var(--color-muted)' }}>PNG, JPG up to 5 MB</p>
              </div>
            </div>

            {/* Section: Time Slots */}
            <div className="rounded-2xl p-7" style={{ background:'var(--color-surface)', boxShadow:'var(--shadow-sm)', border:'1px solid var(--color-border)' }}>
              <h2 className="text-lg mb-2" style={{ fontFamily:'var(--font-display)', color:'var(--color-pine)' }}>Available Time Slots</h2>
              <p className="text-xs mb-5" style={{ color:'var(--color-muted)' }}>Select from presets or add a custom slot.</p>

              {/* Preset chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {DEFAULT_SLOTS.map(s => {
                  const active = slots.includes(s);
                  return (
                    <button key={s} type="button" onClick={() => active ? removeSlot(s) : addSlot(s)}
                      className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                      style={{ fontFamily:'var(--font-mono)', background:active?'var(--color-pine)':'var(--color-paper-dark)', color:active?'var(--color-paper)':'var(--color-sage)', border:`1.5px solid ${active?'transparent':'var(--color-border)'}` }}>
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Custom slot */}
              <div className="flex gap-2">
                <input type="text" placeholder="e.g. 22:00–23:00" value={newSlot} onChange={e=>setNewSlot(e.target.value)}
                  className={inputCls + ' flex-1'} style={inputSt} onFocus={foc} onBlur={blr}/>
                <button type="button" onClick={()=>{addSlot(newSlot);setNewSlot('');}}
                  className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                  style={{ background:'var(--color-pine)', color:'var(--color-paper)' }}>
                  <Plus className="h-5 w-5"/>
                </button>
              </div>

              {/* Selected slots */}
              {slots.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {slots.map(s=>(
                    <span key={s} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
                      style={{ background:'var(--color-court-soft)', color:'var(--color-pine)', fontFamily:'var(--font-mono)' }}>
                      {s}
                      <button type="button" onClick={()=>removeSlot(s)}><X className="h-3 w-3"/></button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-5">

              {/* Auto-filled owner info card */}
              <div className="rounded-2xl p-5" style={{ background:'var(--color-pine)', boxShadow:'var(--shadow-md)' }}>
                <p style={{ fontFamily:'var(--font-mono)', fontSize:'10px', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--color-court)', marginBottom:'0.75rem' }}>Auto-filled</p>
                <p className="text-sm mb-1" style={{ color:'rgba(241,242,234,0.65)', fontFamily:'var(--font-mono)' }}>Owner Email</p>
                <p className="text-sm" style={{ color:'var(--color-paper)', fontFamily:'var(--font-mono)' }}>your@email.com</p>
                <p className="mt-3 text-xs leading-relaxed" style={{ color:'rgba(241,242,234,0.45)' }}>Your email is linked automatically and cannot be changed from this form.</p>
              </div>

              {/* Submit */}
              <button type="button" className="group w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background:'var(--color-court)', color:'var(--color-pine)', boxShadow:'var(--shadow-md)' }}>
                Publish Facility
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"/>
              </button>
              <button type="button" className="w-full rounded-full py-3 text-sm font-semibold"
                style={{ background:'transparent', border:'1.5px solid var(--color-border)', color:'var(--color-sage)' }}>
                Save as Draft
              </button>

              <p className="text-xs text-center" style={{ color:'var(--color-muted)', fontFamily:'var(--font-mono)' }}>
                By publishing, you agree to SportNest's venue listing guidelines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
