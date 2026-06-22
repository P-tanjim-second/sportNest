'use client';
import { useState } from 'react';
import { Ticket, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);

  const signIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    console.log(user)

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password
    });
    if (data) {
      toast.success("Log In successful")
      redirect('/')
      return
    }
    if (error) {
      toast.error(error.message)
      return
    }

  }
  const googleSignIn = async () => {
      const data = await authClient.signIn.social({
        provider: "google",
      });
      if (data) {
        toast.success("Log In successfully")
        redirect('/')
        return
      }
      else {
        toast.error("Something went wrong")
        return
      }
    }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--color-paper)' }}>

      <div
        className="hidden lg:flex lg:w-5/12 flex-col justify-between p-12 relative overflow-hidden"
        style={{ background: 'linear-gradient(165deg, var(--color-pine) 0%, var(--color-pine-soft) 100%)' }}
      >
        <svg viewBox="0 0 400 600" className="absolute inset-0 h-full w-full opacity-[0.07]" fill="none" stroke="white" strokeWidth="1.5">
          <rect x="60" y="80" width="280" height="440" />
          <line x1="60" y1="300" x2="340" y2="300" strokeWidth="3" />
          <rect x="110" y="80" width="180" height="440" />
          <circle cx="200" cy="300" r="60" />
        </svg>

        <a href="/" className="inline-flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'rgba(212,225,87,0.15)', border: '1px solid rgba(212,225,87,0.3)' }}>
            <Ticket className="h-4 w-4" style={{ color: 'var(--color-court)' }} strokeWidth={2} />
          </span>
          <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', fontSize: '1.2rem' }}>SportNest</span>
        </a>

        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-court)', marginBottom: '1rem' }}>
            All-Access Pass
          </p>
          <h2 className="text-4xl xl:text-5xl" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', lineHeight: 1.1 }}>
            Welcome back.<br />
            <span style={{ color: 'var(--color-court)' }}>Your court awaits.</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(241,242,234,0.6)' }}>
            Sign in to view your bookings, manage your facilities, and discover new venues near you.
          </p>
        </div>

        <div className="flex items-center gap-8">
          {[['250+', 'Venues'], ['12', 'Sports'], ['24/7', 'Booking']].map(([n, l], i) => (
            <div key={l} className={i !== 0 ? 'border-l pl-8' : ''} style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <p style={{ fontFamily: 'var(--font-display)', color: 'var(--color-paper)', fontSize: '1.5rem' }}>{n}</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'rgba(241,242,234,0.5)', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-16 lg:px-12">
        <div className="w-full max-w-sm">

          <a href="/" className="inline-flex items-center gap-2.5 mb-10 lg:hidden">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: 'var(--color-pine)' }}>
              <Ticket className="h-4 w-4" style={{ color: 'var(--color-court)' }} strokeWidth={2} />
            </span>
            <span style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)', fontSize: '1.2rem' }}>SportNest</span>
          </a>

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-clay)', marginBottom: '0.75rem' }}>Sign In</p>
          <h1 className="text-3xl mb-8" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-pine)' }}>Log in to your account</h1>

          <div className="flex flex-col gap-4">
            <form onSubmit={signIn}>
              <div>
                <label className="block text-xs font-semibold mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-pine)', letterSpacing: '0.06em' }}>EMAIL</label>
                <input
                  type="email"
                  name='email'
                  placeholder="you@example.com"
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300"
                  style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-pine)'}
                  onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-pine)', letterSpacing: '0.06em' }}>PASSWORD</label>
                <div className="relative">
                  <input
                    name='password'
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none pr-12 transition-all duration-300"
                    style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-text)', fontFamily: 'var(--font-body)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--color-pine)'}
                    onBlur={e => e.target.style.borderColor = 'var(--color-border)'}
                  />
                  <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-muted)' }}>
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'var(--color-pine)', color: 'var(--color-paper)', boxShadow: 'var(--shadow-md)' }}
              >
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <div className="flex items-center gap-3 my-1">
              <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
              <span className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>or continue with</span>
              <span className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
            </div>

            <button
              type="button"
              onClick={googleSignIn}
              className="w-full inline-flex items-center justify-center gap-3 rounded-full py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border)', color: 'var(--color-pine)', boxShadow: 'var(--shadow-sm)' }}
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-8 text-center text-sm" style={{ color: 'var(--color-muted)' }}>
            Don't have an account?{' '}
            <a href="/register" className="font-semibold" style={{ color: 'var(--color-pine)' }}>Create one →</a>
          </p>
        </div>
      </div>
    </div>
  );
}
