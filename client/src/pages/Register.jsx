import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import AuthSplitLayout from '../components/AuthSplitLayout.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

const inputClass =
  'w-full rounded-lg border border-white/25 bg-white/90 px-3.5 py-2.5 text-[15px] text-stone-900 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-white/50 focus:ring-2 focus:ring-white/20 dark:bg-stone-950/60 dark:text-stone-100 dark:border-white/15 dark:placeholder:text-stone-500 dark:focus:border-emerald-400/40 dark:focus:ring-emerald-500/20';

const labelClass =
  'mb-1 block text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/65';

export default function Register() {
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [photo, setPhoto] = useState(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    city: '',
    country: '',
  });

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setPending(true);
    try {
      const body = new FormData();
      body.append('firstName', form.firstName.trim());
      body.append('lastName', form.lastName.trim());
      body.append('email', form.email.trim());
      body.append('password', form.password);
      body.append('phone', form.phone.trim());
      body.append('city', form.city.trim());
      body.append('country', form.country.trim());
      if (photo) body.append('photo', photo);

      await api.post('/auth/register', body, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthSplitLayout
      headline="The world is still wide open."
      subline="Create your profile — we’ll help you stitch cities, trails, and detours into one coherent trip."
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link
          to="/login"
          className="text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition hover:text-white hover:decoration-white"
        >
          ← Back to sign in
        </Link>
        <ThemeToggle variant="onDark" />
      </div>

      <div className="max-h-[min(calc(100dvh-7rem),720px)] overflow-y-auto rounded-2xl border border-white/20 bg-white/12 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7 dark:bg-stone-950/35 dark:border-white/10">
        <h1 className="font-display text-2xl font-medium text-white">Join Traveloop</h1>
        <p className="mt-2 text-sm leading-relaxed text-white/75">A few details — then you’re in.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-400/40 bg-red-950/50 px-4 py-3 text-sm text-red-100 backdrop-blur-sm">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>Profile photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] || null)}
              className="mt-2 w-full text-sm text-white/80 file:mr-3 file:rounded-lg file:border-0 file:bg-white/90 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-stone-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name
              </label>
              <input
                id="firstName"
                value={form.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                className={`${inputClass} mt-1`}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name
              </label>
              <input
                id="lastName"
                value={form.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                className={`${inputClass} mt-1`}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={`${inputClass} mt-1`}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              className={`${inputClass} mt-1`}
              required
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={`${inputClass} mt-1`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                id="city"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                className={`${inputClass} mt-1`}
              />
            </div>
            <div>
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <input
                id="country"
                value={form.country}
                onChange={(e) => updateField('country', e.target.value)}
                className={`${inputClass} mt-1`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold tracking-wide text-stone-900 shadow-lg transition hover:bg-white/95 disabled:opacity-50 dark:bg-emerald-500 dark:text-stone-950 dark:hover:bg-emerald-400"
          >
            {pending ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-semibold text-emerald-200 underline decoration-emerald-200/50 underline-offset-4 hover:text-white"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthSplitLayout>
  );
}
