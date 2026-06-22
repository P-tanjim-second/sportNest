'use client';
import { useState } from 'react';
import { X, Plus } from 'lucide-react';

const DEFAULT_SLOTS = ['06:00-07:00', '07:00-08:00', '08:00-09:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00'];
const SPORT_TYPES = ['Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Cricket', 'Volleyball', 'Table_Tennis'];

const INP_BASE = {
  width: '100%', borderRadius: 12, padding: '11px 14px', fontSize: '13px',
  border: '1.5px solid var(--color-border)', background: 'var(--color-paper-dark)',
  color: 'var(--color-text)', fontFamily: 'var(--font-body)',
  outline: 'none', transition: 'border-color 0.2s',
};

function Label({ text }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase',
      color: 'var(--color-pine)', marginBottom: 6,
    }}>{text}</p>
  );
}

export default function EditFacilityModal({ facility, onClose, onSave }) {
  const [form, setForm] = useState({
    id: facility?._id || '',
    name: facility?.name || '',
    facility_type: facility?.facility_type || '',
    location: facility?.location || '',
    price_per_hour: facility?.price_per_hour || '',
    capacity: facility?.capacity?.replace(/[^\d]/g, '') || '',
    description: facility?.description || '',
  });
  const [slots, setSlots] = useState(facility?.slots || []);
  const [custom, setCustom] = useState('');

  const addSlot = s => { if (s && !slots.includes(s)) setSlots(p => [...p, s]); };
  const removeSlot = s => setSlots(p => p.filter(x => x !== s));
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const focus = e => (e.target.style.borderColor = 'var(--color-pine)');
  const blur = e => (e.target.style.borderColor = 'var(--color-border)');

  return (
    /* ── backdrop ── */
    <div
      onClick={onClose}
    >
      {/* ── panel ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 600, maxHeight: '92vh', overflowY: 'auto',
          background: 'var(--color-surface)', borderRadius: '1.75rem',
          boxShadow: 'var(--shadow-float)',
          scrollbarWidth: 'none',
        }}
      >

        {/* sticky pine header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: 'linear-gradient(135deg, var(--color-pine) 0%, var(--color-pine-soft) 100%)',
          borderRadius: '1.75rem 1.75rem 0 0',
          padding: '20px 26px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-court)', marginBottom: 3 }}>
              Edit Facility
            </p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--color-paper)' }}>
              {form.name || 'Facility Details'}
            </p>
          </div>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-paper)',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          >
            <X size={16} />
          </button>
        </div>

        {/* ── form body ── */}
        <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Name + Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <Label text="Facility Name" />
              <input value={form.name} onChange={e => set('name', e.target.value)} style={INP_BASE} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label text="Facility Type" />
              <select value={form.facility_type} onChange={e => set('facility_type', e.target.value)} style={INP_BASE} onFocus={focus} onBlur={blur}>
                <option value="">Select type</option>
                {SPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <Label text="Location" />
            <input value={form.location} onChange={e => set('location', e.target.value)} style={INP_BASE} onFocus={focus} onBlur={blur} />
          </div>

          {/* Price + Capacity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <Label text="Price per Hour (৳)" />
              <input type="number" value={form.price_per_hour} onChange={e => set('price_per_hour', e.target.value)} style={INP_BASE} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <Label text="Capacity" />
              <input type="number" value={form.capacity} onChange={e => set('capacity', e.target.value)} style={INP_BASE} onFocus={focus} onBlur={blur} />
            </div>
          </div>

          {/* Slots */}
          <div>
            <Label text="Available Slots" />
            {/* Preset chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 10 }}>
              {DEFAULT_SLOTS.map(s => {
                const active = slots.includes(s);
                return (
                  <button key={s} type="button" onClick={() => active ? removeSlot(s) : addSlot(s)}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200"
                    style={{
                      fontFamily: 'var(--font-mono)', cursor: 'pointer', transition: 'all 0.2s',
                      background: active ? 'var(--color-pine)' : 'var(--color-paper-dark)',
                      color: active ? 'var(--color-paper)' : 'var(--color-sage)',
                      border: `1.5px solid ${active ? 'transparent' : 'var(--color-border)'}`,
                      borderRadius: 999, padding: '5px 12px', fontSize: '11px', fontWeight: 600,
                    }}>
                    {s}
                  </button>
                );
              })}
            </div>
            {/* Custom slot row */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={custom} onChange={e => setCustom(e.target.value)}
                placeholder="Custom e.g. 22:00–23:00"
                style={{ ...INP_BASE, flex: 1 }} onFocus={focus} onBlur={blur}
                onKeyDown={e => { if (e.key === 'Enter') { addSlot(custom); setCustom(''); } }}
              />
              <button type="button" onClick={() => { addSlot(custom); setCustom(''); }}
                style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--color-pine)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-paper)', flexShrink: 0 }}>
                <Plus size={17} />
              </button>
            </div>
            {/* Active selection */}
            {slots.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {slots.map(s => (
                  <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, borderRadius: 999, padding: '4px 10px', fontSize: '11px', fontWeight: 600, fontFamily: 'var(--font-mono)', background: 'var(--color-court-soft)', color: 'var(--color-pine)' }}>
                    {s}
                    <button onClick={() => removeSlot(s)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-pine)', padding: 0, lineHeight: 1, fontSize: 14, fontWeight: 700 }}>×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <Label text="Description" />
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
              style={{ ...INP_BASE, resize: 'none' }} onFocus={focus} onBlur={blur} />
          </div>

          {/* Owner Email — read-only */}
          <div>
            <Label text="Owner Email" />
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '11px 14px', borderRadius: 12, fontSize: '13px',
              fontFamily: 'var(--font-mono)', color: 'var(--color-muted)',
              background: 'var(--color-paper-dark)', border: '1.5px solid var(--color-border)',
            }}>
              <span>{facility?.owner_email || 'your@email.com'}</span>
              <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--color-border)', padding: '2px 8px', borderRadius: 4, color: 'var(--color-muted)' }}>
                Read Only
              </span>
            </div>
          </div>

          {/* Perforation divider */}
          <div style={{ position: 'relative', borderTop: '2px dashed var(--color-border)', margin: '4px 0' }}>
            <span style={{ position: 'absolute', left: -26, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-surface)' }} />
            <span style={{ position: 'absolute', right: -26, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-surface)' }} />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={onClose} style={{
              flex: 1, borderRadius: 999, padding: '12px', fontSize: '13px', fontWeight: 600,
              fontFamily: 'var(--font-body)', cursor: 'pointer',
              background: 'var(--color-paper-dark)', border: '1.5px solid var(--color-border)', color: 'var(--color-sage)',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--color-paper)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--color-paper-dark)'}>
              Cancel
            </button>
            <button onClick={() => { onSave?.({ ...form, slots }); onClose(); }} style={{
              flex: 2, borderRadius: 999, padding: '12px', fontSize: '13px', fontWeight: 600,
              fontFamily: 'var(--font-body)', cursor: 'pointer',
              background: 'var(--color-pine)', border: 'none', color: 'var(--color-paper)',
              boxShadow: 'var(--shadow-md)', transition: 'box-shadow 0.2s, transform 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'none'; }}>
              Save Changes →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}