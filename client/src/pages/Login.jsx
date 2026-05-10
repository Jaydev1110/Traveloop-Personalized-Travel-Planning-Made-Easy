import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../hooks/useAuth.js';
import AuthSplitLayout from '../components/AuthSplitLayout.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

const inputClass =
  'w-full rounded-lg border border-white/25 bg-white/90 px-3.5 py-3 text-[15px] text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-white/50 focus:ring-2 focus:ring-white/20 dark:bg-stone-950/60 dark:text-stone-100 dark:border-white/15 dark:placeholder:text-stone-500 dark:focus:border-emerald-400/40 dark:focus:ring-emerald-500/20';

export default function Login() {
  const [entry, setEntry] = useState('traveler');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const { loginWithToken } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setPending(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      if (data.user.role === 'admin') {
        const asConsole = entry === 'console';
        loginWithToken(data.token, data.user, { adminEntry: asConsole ? 'console' : 'traveler' });
        navigate(asConsole ? '/admin' : '/home', { replace: true });
      } else {
        loginWithToken(data.token, data.user);
        navigate('/home', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthSplitLayout
      headline="Go where the map ends."
      subline="Curated routes, real places, and itineraries that feel lived-in — not generated. Sign in to continue your journey."
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">Traveloop</p>
          <p className="mt-0.5 text-sm text-white/70">Personalized travel planning</p>
        </div>
        <ThemeToggle variant="onDark" />
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/12 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-8 dark:bg-stone-950/35 dark:border-white/10">
        <h2 className="font-display text-2xl font-medium text-white">Sign in</h2>
        <p className="mt-2 text-sm leading-relaxed text-white/75">Choose how you&apos;re entering, then authenticate.</p>

        <div className="mt-7">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60">Entry</p>
          <div className="mt-3 flex gap-2 rounded-xl bg-black/25 p-1 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setEntry('traveler')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                entry === 'traveler'
                  ? 'bg-white/95 text-stone-900 shadow-md dark:bg-white/90'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Traveler
            </button>
            <button
              type="button"
              onClick={() => setEntry('console')}
              className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                entry === 'console'
                  ? 'bg-white/95 text-stone-900 shadow-md dark:bg-white/90'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              Admin console
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-white/60">
            {entry === 'traveler'
              ? 'Opens the traveler home. Admins can switch to the console anytime after login.'
              : 'Opens operator tools. Standard accounts still land on the traveler app.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div
              className="rounded-lg border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-100 backdrop-blur-sm"
              role="alert"
            >
              {error}
            </div>
          )}
          <div>
            <label htmlFor="login-email" className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/65">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`${inputClass} mt-1.5`}
              required
            />
          </div>
          <div>
            <label htmlFor="login-password" className="text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/65">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} mt-1.5`}
              required
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold tracking-wide text-stone-900 shadow-lg transition hover:bg-white/95 disabled:opacity-50 dark:bg-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400"
          >
            {pending ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-white/70">
          New here?{' '}
          <Link
            to="/register"
            className="font-semibold text-emerald-200 underline decoration-emerald-200/50 underline-offset-4 hover:text-white hover:decoration-white"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
