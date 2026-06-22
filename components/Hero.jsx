'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, MapPin, PlayCircle, Ticket } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const animationClass = mounted ? 'in-view' : '';

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-24 lg:pt-44 lg:pb-32">
      <div
        className="animate-drift-1 absolute -top-24 right-[-8%] h-[26rem] w-[26rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-court), transparent 70%)' }}
      />
      <div
        className="animate-drift-2 absolute bottom-[-8rem] left-[-8rem] h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-clay-soft), transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <div
              className={`fade-in ${animationClass} mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5`}
              style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-sm)' }}
            >
              <Ticket className="h-3.5 w-3.5" style={{ color: 'var(--color-pine)' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-pine)' }}>
                One Pass, Every Court
              </span>
            </div>

            <h1
              className="text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}
            >
              <span className={`fade-up ${animationClass} block`} style={{ transitionDelay: '0.1s' }}>
                Your All-Access
              </span>
              <span className={`fade-up ${animationClass} block`} style={{ transitionDelay: '0.25s' }}>
                Pass to <span className="text-highlight italic">Play.</span>
              </span>
            </h1>

            <p
              className={`fade-up ${animationClass} mt-6 max-w-md text-base leading-relaxed sm:text-lg`}
              style={{ transitionDelay: '0.4s', color: 'var(--color-sage)' }}
            >
              Browse football turfs, badminton courts, swimming lanes and tennis
              courts nearby, then reserve your slot in seconds. All with one
              membership pass.
            </p>

            <div className={`fade-up ${animationClass} mt-9 flex flex-wrap items-center gap-4`} style={{ transitionDelay: '0.55s' }}>
              <a
                href="#facilities"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'var(--color-pine)', color: 'var(--color-paper)', boxShadow: 'var(--shadow-md)' }}
              >
                Explore Facilities
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-pine)' }}
              >
                <PlayCircle className="h-4 w-4" style={{ color: 'var(--color-clay)' }} />
                How It Works
              </a>
            </div>

            <div className={`fade-up ${animationClass} mt-12 flex items-center gap-7 sm:gap-10`} style={{ transitionDelay: '0.7s' }}>
              {[['250+', 'Venues'], ['12', 'Sports'], ['24/7', 'Booking']].map(([num, label], i) => (
                <div key={label} className={i !== 0 ? 'border-l border-dashed pl-7 sm:pl-10' : ''} style={{ borderColor: 'var(--color-border)' }}>
                  <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>{num}</p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`fade-up ${animationClass} relative mx-auto w-full max-w-[460px] lg:max-w-[500px]`}
            style={{ transitionDelay: '0.15s', perspective: '1400px' }}
          >

            <div
              style={{
                transform: 'rotateX(5deg) rotateY(-12deg) rotateZ(1deg)',
                transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >

              <div
                style={{
                  borderRadius: '1.25rem',
                  boxShadow:
                    '0 40px 90px rgba(22,51,42,0.05), 0 12px 28px rgba(22,51,42,0.12), 0 2px 6px rgba(22,51,42,0.07)',
                }}
              >

                <div
                  style={{
                    borderRadius: '1.25rem 1.25rem 0 0',
                    background: 'linear-gradient(158deg, var(--color-pine) 0%, var(--color-pine-soft) 100%)',
                    padding: '1.75rem 2rem 2rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >

                  <svg
                    viewBox="0 0 400 200"
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                    stroke="var(--color-paper)"
                    strokeWidth="1.2"
                    style={{ opacity: 0.1 }}
                    aria-hidden="true"
                  >
                    <rect x="18" y="14" width="364" height="172" />
                    <line x1="200" y1="14" x2="200" y2="186" />
                    <circle cx="200" cy="100" r="36" />
                    <circle cx="200" cy="100" r="2.5" fill="var(--color-paper)" stroke="none" />
                    <rect x="18" y="58" width="70" height="84" />
                    <rect x="18" y="78" width="26" height="44" />
                    <circle cx="58" cy="100" r="1.8" fill="var(--color-paper)" stroke="none" />
                    <path d="M88,74 Q126,100 88,126" strokeDasharray="3 3" />
                    <rect x="312" y="58" width="70" height="84" />
                    <rect x="356" y="78" width="26" height="44" />
                    <circle cx="342" cy="100" r="1.8" fill="var(--color-paper)" stroke="none" />
                    <path d="M312,74 Q274,100 312,126" strokeDasharray="3 3" />
                    <path d="M18,14 Q26,14 26,22" />
                    <path d="M382,14 Q382,22 374,22" />
                    <path d="M18,186 Q18,178 26,178" />
                    <path d="M382,186 Q374,186 374,178" />
                    <rect x="4" y="83" width="14" height="34" />
                    <rect x="382" y="83" width="14" height="34" />
                  </svg>

                  <p
                    className="absolute z-0 select-none"
                    style={{
                      right: '1.1rem',
                      top: '50%',
                      transform: 'translateY(-50%) rotate(90deg)',
                      transformOrigin: 'center',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '7px',
                      color: 'rgba(241,242,234,0.12)',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    SportNest · All Access Pass
                  </p>

                  <div className="relative z-10">

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            letterSpacing: '0.2em',
                            color: 'var(--color-court)',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                          }}
                        >
                          Booking Confirmed
                        </span>
                        <h3
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '2rem',
                            color: 'var(--color-paper)',
                            marginTop: '0.3rem',
                            lineHeight: 1.05,
                            fontWeight: 400,
                          }}
                        >
                          Downtown<br />Turf Arena
                        </h3>
                        <p
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '9px',
                            color: 'rgba(241,242,234,0.42)',
                            marginTop: '0.35rem',
                          }}
                        >
                          <MapPin style={{ width: '9px', height: '9px', flexShrink: 0 }} />
                          Gulshan, Dhaka
                        </p>
                      </div>

                      <div
                        style={{
                          background: 'var(--color-court)',
                          borderRadius: '4px',
                          padding: '3px 9px',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '7.5px',
                            color: 'var(--color-pine)',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                          }}
                        >
                          FOOTBALL
                        </p>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: '1.75rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid rgba(241,242,234,0.1)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {[
                          ['Date', 'SAT 22 JUN'],
                          ['Slot', '18:00-19:00'],
                          ['Pitch', '04 / A'],
                        ].map(([label, val]) => (
                          <div key={label}>
                            <p
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '7.5px',
                                color: 'rgba(241,242,234,0.32)',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                              }}
                            >
                              {label}
                            </p>
                            <p
                              style={{
                                fontFamily: 'var(--font-mono)',
                                fontSize: '10.5px',
                                color: 'var(--color-paper)',
                                marginTop: '4px',
                                fontWeight: 700,
                              }}
                            >
                              {val}
                            </p>
                          </div>
                        ))}
                      </div>

                      <p
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '7px',
                          color: 'rgba(241,242,234,0.18)',
                          letterSpacing: '0.06em',
                        }}
                      >
                        SNT-240622-004
                      </p>
                    </div>

                  </div>
                </div>

                <div style={{ position: 'relative', height: '1px', overflow: 'visible' }}>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: '14px',
                      right: '14px',
                      borderTop: '1.5px dashed rgba(22,51,42,0.18)',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      left: '-10px',
                      top: '-10px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--color-paper)',
                      display: 'block',
                    }}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '-10px',
                      top: '-10px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--color-paper)',
                      display: 'block',
                    }}
                  />
                </div>

                <div
                  style={{
                    borderRadius: '0 0 1.25rem 1.25rem',
                    background: 'var(--color-paper)',
                    padding: '1.1rem 2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '7.5px',
                        color: 'var(--color-muted)',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Pass Type
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        color: 'var(--color-pine)',
                        marginTop: '3px',
                        fontWeight: 700,
                        letterSpacing: '0.07em',
                      }}
                    >
                      ALL-ACCESS
                    </p>
                  </div>

                  <svg
                    width={70}
                    height={32}
                    viewBox="0 0 70 32"
                    style={{ flexShrink: 0, opacity: 0.5 }}
                    aria-hidden="true"
                  >
                    {[
                      [0, 1], [2, 2], [6, 1], [9, 3], [14, 1], [16, 2], [20, 1], [23, 3],
                      [28, 1], [31, 2], [35, 1], [38, 3], [43, 1], [46, 2], [50, 1], [53, 3],
                      [58, 1], [61, 2], [65, 1], [68, 2],
                    ].map(([x, w], i) => (
                      <rect key={i} x={x} y={0} width={w} height={32} fill="var(--color-pine)" />
                    ))}
                  </svg>

                  <div style={{ textAlign: 'right' }}>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '7.5px',
                        color: 'var(--color-muted)',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Total
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.8rem',
                        color: 'var(--color-pine)',
                        marginTop: '1px',
                        lineHeight: 1,
                        fontWeight: 400,
                      }}
                    >
                      $25
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '8px',
                        color: 'var(--color-muted)',
                        marginTop: '2px',
                      }}
                    >
                      per hour
                    </p>
                  </div>
                </div>

              </div>
            </div>

            <div
              className={`fade-in ${animationClass}`}
              style={{ marginTop: '1.75rem', transitionDelay: '0.6s' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  color: 'var(--color-muted)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                }}
              >
                Also available today
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {[
                  { sport: 'Tennis', time: '07:00', col: 'var(--color-court)' },
                  { sport: 'Swimming', time: '09:30', col: 'var(--color-clay)' },
                  { sport: 'Badminton', time: '16:00', col: 'var(--color-court)' },
                ].map(({ sport, time, col }) => (
                  <div
                    key={sport}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '5px 11px',
                      borderRadius: '4px',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: col,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--color-pine)',
                      }}
                    >
                      {sport}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '9px',
                        color: 'var(--color-muted)',
                      }}
                    >
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
