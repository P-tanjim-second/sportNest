'use client';
import { useEffect, useState, Suspense } from 'react';
import { Search, SlidersHorizontal, MapPin, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const SPORT_TYPES = ['All', 'Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Cricket', 'Volleyball', 'Table_Tennis'];

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

// 1. Rename the original component to be a sub-component
function FacilitiesContent() {
  const [ALL_FACILITIES, setALL_FACILITIES] = useState([])
  const [activeType, setActiveType] = useState('All');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') || "All";

  useEffect(() => {
    async function getFacilities() {
      setActiveType(typeParam)
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all_facilities${typeParam == 'All' ? '' : '?type=' + typeParam}`);
        const { data } = await res.json();
        const updatedData = data.map(f => ({
          ...f,
          slots: f.slots[0],
        }))
        setALL_FACILITIES(updatedData)
      }
      catch {
        toast.error("Something wrong. Facilities can't be shown.")
      }
      finally {
        setLoading(false)
      }
    }
    getFacilities()
  }, [typeParam])

  const filtered = ALL_FACILITIES;

  const handleSearchFilter = async () => {
    setLoading(true);
    if (search.length > 0) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/all_facilities${typeParam == 'All' ? '' : '?type=' + typeParam}${typeParam == "All" ? "?" : "&"}search=${search}`);
        const {data} = await res.json();
        const updatedData = data.map(f => ({
          ...f,
          slots: f.slots[0],
        }))
        setALL_FACILITIES(updatedData)
      }
      catch {
        toast.error("Something wrong. Facilities can't be shown.")
      }
      finally {
        setLoading(false)
      }
    }
  }

  return (
    <div style={{ background: 'var(--color-paper)', minHeight: '100vh' }}>
      {/* Page hero */}
      <div className="pt-32 pb-14 px-6 lg:px-10" style={{ background: 'var(--color-pine)', position: 'relative', overflow: 'hidden' }}>
        <div className="absolute inset-0 opacity-[0.05]">
          <svg viewBox="0 0 1200 300" className="w-full h-full" fill="none" stroke="white" strokeWidth="1">
            <line x1="0" y1="150" x2="1200" y2="150" />
            <circle cx="600" cy="150" r="120" /><circle cx="600" cy="150" r="5" fill="white" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl">
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-court)', marginBottom: '0.75rem' }}>All Venues</p>
          <h1 className="text-4xl lg:text-5xl mb-4" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', lineHeight: 1.1 }}>
            Browse <span style={{ color: 'var(--color-court)' }}>all facilities</span>
          </h1>
          <p className="text-sm max-w-md" style={{ color: 'rgba(241,242,234,0.6)' }}>
            {ALL_FACILITIES.length} venues across Dhaka. Filter by sport, search by name.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        {/* Search + filter bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-muted)' }} />
            <input type="text" placeholder="Search by name or location…" value={search} onChange={e => setSearch(e.target.value)}
              className="w-full rounded-full pl-11 pr-5 py-3 text-sm outline-none transition-all duration-300"
              style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)', boxShadow: 'var(--shadow-sm)' }}
              onFocus={e => e.target.style.borderColor = 'var(--color-pine)'}
              onBlur={e => e.target.style.borderColor = 'var(--color-border)'} />
          </div>
          <button onClick={handleSearchFilter} className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-pine)', boxShadow: 'var(--shadow-sm)' }}>
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>
        </div>

        {/* Sport type pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {SPORT_TYPES.map(type => {
            const active = activeType === type;
            return (
              <Link href={`/facilities${type == 'All' ? '' : '?type=' + type}`} key={type}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: active ? 'var(--color-pine)' : 'var(--color-surface)',
                  color: active ? 'var(--color-paper)' : 'var(--color-sage)',
                  border: `1.5px solid ${active ? 'transparent' : 'var(--color-border)'}`,
                  boxShadow: active ? 'var(--shadow-sm)' : 'none',
                }}>
                {type}
              </Link>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mb-7 text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
          {filtered.length} {filtered.length === 1 ? 'venue' : 'venues'} found
        </p>

        {/* Grid */}
        {
          loading ? (<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="overflow-hidden rounded-[1.5rem] border animate-pulse"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface)",
                }}
              >
                {/* Header */}
                <div
                  className="h-32 p-5 flex flex-col justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,.08), rgba(0,0,0,.15))",
                  }}
                >
                  <div className="h-6 w-24 rounded-full bg-white/20" />
                  <div>
                    <div className="h-5 w-40 rounded bg-white/20 mb-2" />
                    <div className="h-3 w-28 rounded bg-white/10" />
                  </div>
                </div>

                {/* Ticket Divider */}
                <div
                  className="relative border-t-2 border-dashed"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <span
                    className="absolute left-[-9px] top-[-9px] h-[18px] w-[18px] rounded-full"
                    style={{ background: "var(--color-paper)" }}
                  />
                  <span
                    className="absolute right-[-9px] top-[-9px] h-[18px] w-[18px] rounded-full"
                    style={{ background: "var(--color-paper)" }}
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex justify-between mb-4">
                    <div className="flex gap-4">
                      <div>
                        <div className="h-2 w-8 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-12 rounded bg-gray-300" />
                      </div>

                      <div>
                        <div className="h-2 w-8 rounded bg-gray-200 mb-2" />
                        <div className="h-3 w-16 rounded bg-gray-300" />
                      </div>
                    </div>

                    <div className="h-4 w-20 rounded bg-gray-200" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-6 w-20 rounded bg-gray-300 mb-1" />
                      <div className="h-3 w-10 rounded bg-gray-200" />
                    </div>

                    <div className="h-10 w-28 rounded-full bg-gray-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>) : filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(f => (
                <div key={f._id} className="group" style={{ borderRadius: '1.5rem', boxShadow: 'var(--shadow-md)', transition: 'box-shadow 0.4s, transform 0.4s' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-float)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                  <div style={{ position: 'relative', overflow: 'hidden', height: '8rem', background: f.grad, borderRadius: '1.5rem 1.5rem 0 0' }}>
                    <LineArt facility_type={f.facility_type} />
                    <div className="absolute inset-0 flex flex-col justify-between p-5">
                      <span style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '0.2rem 0.75rem', fontSize: '10px', fontFamily: 'var(--font-mono)', color: f.accent, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{f.facility_type}</span>
                      <div>
                        <p style={{ fontSize: '1rem', fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1.25 }}>{f.name}</p>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'rgba(255,255,255,0.6)', fontSize: '11px', marginTop: '3px', fontFamily: 'var(--font-mono)' }}>
                          <MapPin className="h-3 w-3" />{f.location}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div style={{ position: 'relative', borderTop: '2px dashed var(--color-border)' }}>
                    <span style={{ position: 'absolute', left: -9, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-paper)' }} />
                    <span style={{ position: 'absolute', right: -9, top: -9, width: 18, height: 18, borderRadius: '50%', background: 'var(--color-paper)' }} />
                  </div>
                  <div style={{ background: 'var(--color-surface)', borderRadius: '0 0 1.5rem 1.5rem', padding: '1rem 1.25rem' }}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-3">
                        {[['Cap', f.capacity], ['Hrs', f.slots]].map(([l, v]) => (
                          <div key={l}>
                            <p style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: 'var(--color-muted)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{l}</p>
                            <p style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-pine)', marginTop: '2px' }}>{v}{l === "Hrs" ? "..." : ""}</p>
                          </div>
                        ))}
                      </div>
                      <span style={{ color: '#F59E0B', fontSize: '12px' }}>★ <span style={{ fontWeight: 600, color: 'var(--color-pine)' }}>{f.rating}</span> <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>({f.reviews})</span></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span style={{ fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>{f.price_per_hour}</span>
                        <span style={{ fontSize: '11px', color: 'var(--color-muted)' }}>/hr</span>
                      </div>
                      <Link href={`/facilities/${f._id}`} facility={f} className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                        style={{ background: 'var(--color-pine)', color: 'var(--color-paper)', boxShadow: 'var(--shadow-sm)' }}>
                        Book Now <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center">
              <p className="text-5xl mb-4">🏟️</p>
              <p className="text-xl mb-2" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>No venues found</p>
              <p className="text-sm mb-6" style={{ color: 'var(--color-muted)' }}>Try a different sport or clear your search.</p>
              <Link href={'/facilities'} onClick={() => { setSearch(''); setActiveType('All'); }} className="rounded-full px-6 py-2.5 text-sm font-semibold"
                style={{ background: 'var(--color-pine)', color: 'var(--color-paper)' }}>Clear Filters</Link>
            </div>
          )
        }
      </div>
    </div>
  );
}

// 2. Export the main page component wrapped in Suspense
export default function FacilitiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-paper)' }}>
        <p style={{ color: 'var(--color-pine)', fontFamily: 'var(--font-mono)' }}>Loading Facilities...</p>
      </div>
    }>
      <FacilitiesContent />
    </Suspense>
  )
}