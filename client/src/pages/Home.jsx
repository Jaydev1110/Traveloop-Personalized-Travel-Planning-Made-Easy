import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../hooks/useAuth.js';
import AdminTravelerSwitch from '../components/AdminTravelerSwitch.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { motion } from 'framer-motion';

const QUICK_ACTIONS = [
  { title: 'My Trips', subtitle: 'Manage all itineraries', to: '/trips', emoji: '🧭' },
  { title: 'Create Trip', subtitle: 'Start a fresh journey', to: '/trips/create', emoji: '➕' },
  { title: 'Explore Cities', subtitle: 'Find your next stop', to: '/cities', emoji: '🏙️' },
  { title: 'Activities', subtitle: 'Discover what to do', to: '/activities', emoji: '🎒' },
];

function getGreetingByTime() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatTripDate(startDate, endDate) {
  if (!startDate && !endDate) return 'Flexible dates';
  const start = startDate ? new Date(startDate).toLocaleDateString() : 'Flexible start';
  const end = endDate ? new Date(endDate).toLocaleDateString() : 'Flexible end';
  return `${start} - ${end}`;
}

function formatBudget(value) {
  const num = Number(value);
  if (Number.isNaN(num) || num <= 0) return 'Budget not set';
  return `INR ${num.toLocaleString('en-IN')}`;
}

function statusTone(status) {
  if (status === 'ongoing') return 'bg-emerald-500/20 text-emerald-100 border-emerald-300/30';
  if (status === 'completed') return 'bg-violet-500/20 text-violet-100 border-violet-300/30';
  return 'bg-cyan-500/20 text-cyan-100 border-cyan-300/30';
}

function costTone(cost) {
  if (cost === 'premium') return 'bg-amber-500/20 text-amber-100 border-amber-300/30';
  if (cost === 'mid') return 'bg-sky-500/20 text-sky-100 border-sky-300/30';
  return 'bg-emerald-500/20 text-emerald-100 border-emerald-300/30';
}

function TripSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
      <div className="h-36 animate-pulse bg-white/10" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/15" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
      </div>
    </article>
  );
}

function CitySkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
      <div className="h-40 animate-pulse bg-white/10" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-1/2 animate-pulse rounded bg-white/15" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/10" />
      </div>
    </article>
  );
}

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [cities, setCities] = useState([]);
  const [tripsLoading, setTripsLoading] = useState(true);
  const [citiesLoading, setCitiesLoading] = useState(true);
  const [tripsError, setTripsError] = useState('');
  const [citiesError, setCitiesError] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboardData() {
      setTripsLoading(true);
      setCitiesLoading(true);
      setTripsError('');
      setCitiesError('');

      // Run both requests together to make dashboard load faster.
      const [tripsResult, citiesResult] = await Promise.allSettled([
        api.get('/trips'),
        api.get('/cities'),
      ]);

      if (cancelled) return;

      if (tripsResult.status === 'fulfilled') {
        setTrips(Array.isArray(tripsResult.value.data?.trips) ? tripsResult.value.data.trips : []);
      } else {
        const status = tripsResult.reason?.response?.status;
        if (status === 401) {
          setTripsError('Session expired. Please login again.');
          navigate('/login', { replace: true });
        } else {
          setTripsError(
            tripsResult.reason?.response?.data?.message ||
              'Could not load trips. Please refresh in a moment.'
          );
        }
      }

      if (citiesResult.status === 'fulfilled') {
        const allCities = Array.isArray(citiesResult.value.data?.data)
          ? citiesResult.value.data.data
          : [];
        setCities(allCities.slice(0, 6));
      } else {
        setCitiesError(
          citiesResult.reason?.response?.data?.message ||
            'Could not load destinations right now.'
        );
      }

      setTripsLoading(false);
      setCitiesLoading(false);
    }

    fetchDashboardData();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const greeting = getGreetingByTime();

  const tripSummary = useMemo(() => {
    const total = trips.length;
    const upcoming = trips.filter((trip) => trip.status === 'upcoming').length;
    const publicTrips = trips.filter((trip) => Boolean(trip.is_public)).length;
    return { total, upcoming, publicTrips };
  }, [trips]);

  const recentTrips = useMemo(() => trips.slice(0, 3), [trips]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <span className="text-xl font-semibold tracking-tight text-white">Traveloop</span>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-300">
            <Link to="/home" className="hover:text-white transition">Home</Link>
            <Link to="/trips" className="hover:text-white transition">My Trips</Link>
            <Link to="/community" className="hover:text-white transition">Community</Link>
            <Link to="/saved-destinations" className="hover:text-white transition">Saved Destinations</Link>
            <Link to="/profile" className="hover:text-white transition">Profile</Link>
          </nav>

          <div className="flex items-center gap-2">
            <AdminTravelerSwitch variant="onDark" />
            <ThemeToggle variant="onDark" />
            <span className="hidden text-sm text-stone-200 sm:inline">{user?.name}</span>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-white/10 bg-stone-950/50">
          <nav className="flex overflow-x-auto px-4 py-3 gap-5 text-sm font-medium text-stone-300 whitespace-nowrap scrollbar-hide">
            <Link to="/home" className="hover:text-white transition shrink-0">Home</Link>
            <Link to="/trips" className="hover:text-white transition shrink-0">My Trips</Link>
            <Link to="/community" className="hover:text-white transition shrink-0">Community</Link>
            <Link to="/saved-destinations" className="hover:text-white transition shrink-0">Saved Destinations</Link>
            <Link to="/profile" className="hover:text-white transition shrink-0">Profile</Link>
          </nav>
        </div>
      </header>

      <main className="px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ staggerChildren: 0.1 }} className="mx-auto max-w-7xl space-y-10">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-violet-500/20 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
            <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-20 -bottom-16 h-52 w-52 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200/90">
                Personalized travel planning
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Plan Your Next Adventure
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-200 sm:text-base">
                Build smarter itineraries, discover curated destinations, and keep every trip in
                one premium dashboard.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/trips/create"
                  className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:from-cyan-200 hover:to-blue-300"
                >
                  Create Trip
                </Link>
                <Link
                  to="/cities"
                  className="rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Cities
                </Link>
              </div>
            </div>
          </motion.section>
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            <article className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/85">Welcome back</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                {greeting}, {user?.name?.split(' ')[0] || 'traveler'}!
              </h2>
              <p className="mt-2 text-sm text-stone-300">
                Your dashboard updates in real-time from your trips and destination catalog.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-stone-400">Total Trips</p>
                  <p className="mt-1 text-xl font-semibold text-white">{tripSummary.total}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-stone-400">Upcoming</p>
                  <p className="mt-1 text-xl font-semibold text-white">{tripSummary.upcoming}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-[11px] uppercase tracking-[0.12em] text-stone-400">Public</p>
                  <p className="mt-1 text-xl font-semibold text-white">{tripSummary.publicTrips}</p>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {QUICK_ACTIONS.map((item) => (
                  <Link
                    key={item.title}
                    to={item.to}
                    className="group rounded-xl border border-white/10 bg-black/20 p-3 transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-black/30"
                  >
                    <p className="text-lg">{item.emoji}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-[11px] text-stone-400">{item.subtitle}</p>
                  </Link>
                ))}
              </div>
            </article>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-white">Recent Trips</h3>
              <Link
                to="/trips"
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
              >
                View All Trips
              </Link>
            </div>

            {tripsError ? (
              <div className="rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {tripsError}
              </div>
            ) : tripsLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <TripSkeleton key={`trip-skeleton-${idx}`} />
                ))}
              </div>
            ) : recentTrips.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/20 p-8 text-center">
                <p className="text-4xl">🧳</p>
                <p className="mt-3 text-lg font-semibold text-white">No trips yet</p>
                <p className="mt-2 text-sm text-stone-300">
                  Create your first trip and start building a beautiful itinerary.
                </p>
                <Link
                  to="/trips/create"
                  className="mt-5 inline-flex rounded-lg bg-gradient-to-r from-cyan-300 to-blue-400 px-4 py-2 text-sm font-semibold text-stone-900 transition hover:from-cyan-200 hover:to-blue-300"
                >
                  Create Trip
                </Link>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {recentTrips.map((trip) => (
                  <article
                    key={trip.id}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={trip.cover_photo ? (trip.cover_photo.startsWith('http') ? trip.cover_photo : `http://localhost:5000/${trip.cover_photo}`) : 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60'}
                        alt={trip.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/30 to-transparent" />
                      <span
                        className={`absolute bottom-2 left-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusTone(trip.status)}`}
                      >
                        {trip.status}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="line-clamp-1 text-lg font-semibold text-white">{trip.name}</h4>
                      <p className="mt-2 text-xs text-stone-300">
                        {formatTripDate(trip.start_date, trip.end_date)}
                      </p>
                      <p className="mt-1 text-xs text-stone-300">
                        {formatBudget(trip.budget)} • Stops: {trip.stop_count || 0}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-white">Curated Destinations</h3>
              <Link
                to="/cities"
                className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-white/10"
              >
                Browse All
              </Link>
            </div>

            {citiesError ? (
              <div className="rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                {citiesError}
              </div>
            ) : citiesLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <CitySkeleton key={`city-skeleton-${idx}`} />
                ))}
              </div>
            ) : cities.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-black/20 p-8 text-center">
                <p className="text-4xl">🌍</p>
                <p className="mt-3 text-lg font-semibold text-white">No destinations found</p>
                <p className="mt-2 text-sm text-stone-300">
                  We could not find cities right now. Please try again in a bit.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {cities.map((city) => (
                  <Link
                    key={city.id}
                    to={`/cities/${city.id}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-black/20 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={city.hero_image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60'}
                        alt={city.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-900/35 to-transparent" />
                      <span
                        className={`absolute bottom-2 left-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${costTone(
                          city.cost_index
                        )}`}
                      >
                        {city.cost_index || 'mid'}
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-white">
                        {city.name}
                        <span className="ml-2 text-sm font-normal text-stone-300">{city.state}</span>
                      </h4>
                      <p className="mt-2 line-clamp-2 text-xs text-stone-300">
                        {Array.isArray(city.highlights) && city.highlights.length > 0
                          ? city.highlights.slice(0, 3).join(' • ')
                          : 'Handpicked destination with unique local experiences.'}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="rounded-2xl border border-white/15 bg-gradient-to-r from-emerald-500/20 via-cyan-500/15 to-blue-500/20 p-7 shadow-xl backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-white">Explore more destinations</h3>
            <p className="mt-2 max-w-2xl text-sm text-stone-200">
              Discover mountain escapes, beach towns, and cultural gems curated for your next
              unforgettable itinerary.
            </p>
            <Link
              to="/cities"
              className="mt-5 inline-flex rounded-xl bg-white/90 px-5 py-3 text-sm font-semibold text-stone-900 transition hover:bg-white"
            >
              Explore Cities
            </Link>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="rounded-2xl border border-white/15 bg-gradient-to-r from-fuchsia-500/20 via-violet-500/15 to-indigo-500/20 p-7 shadow-xl backdrop-blur-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-100/90">
              Travel inspiration
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Every great memory starts with a well-planned route.
            </h3>
            <p className="mt-2 max-w-2xl text-sm text-stone-200">
              Save destinations, craft stops, and shape a journey that feels truly yours.
            </p>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
