import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../hooks/useAuth.js';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Search, Heart, MapPin, Loader2, X } from 'lucide-react';

const REGIONS = ['North', 'South', 'East', 'West', 'Northeast'];
const COST_OPTIONS = ['budget', 'mid', 'premium'];

function costTone(cost) {
  if (cost === 'premium') return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
  if (cost === 'mid') return 'bg-sky-500/20 text-sky-200 border-sky-400/30';
  return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
}

function CityCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
      <div className="h-44 animate-pulse bg-white/10" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/15" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-white/10" />
      </div>
    </article>
  );
}

export default function CitySearch() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [cost, setCost] = useState('');

  // Saved city IDs for heart state — map of cityId → savedRecordId
  const [savedMap, setSavedMap] = useState({});
  const [savingIds, setSavingIds] = useState(new Set());

  // Fetch saved destinations to know which hearts are filled
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/saved-destinations');
        const map = {};
        (Array.isArray(data) ? data : []).forEach((s) => {
          if (s.city_id) map[s.city_id] = s.id;
        });
        setSavedMap(map);
      } catch {
        /* ignore — heart state simply won't show */
      }
    })();
  }, []);

  // Fetch cities with filters
  const fetchCities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (region) params.region = region;
      if (cost) params.cost = cost;
      const { data } = await api.get('/cities', { params });
      setCities(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login', { replace: true });
        return;
      }
      setError(err.response?.data?.message || 'Failed to load cities.');
    } finally {
      setLoading(false);
    }
  }, [search, region, cost, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCities();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchCities]);

  // Toggle save/unsave
  async function toggleSave(cityId) {
    if (savingIds.has(cityId)) return;
    setSavingIds((prev) => new Set(prev).add(cityId));

    try {
      if (savedMap[cityId]) {
        await api.delete(`/saved-destinations/${savedMap[cityId]}`);
        setSavedMap((prev) => {
          const next = { ...prev };
          delete next[cityId];
          return next;
        });
        toast.success('Removed from saved');
      } else {
        const { data } = await api.post('/saved-destinations', { city_id: cityId });
        setSavedMap((prev) => ({ ...prev, [cityId]: data.id }));
        toast.success('Saved destination');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not update saved status');
    } finally {
      setSavingIds((prev) => {
        const next = new Set(prev);
        next.delete(cityId);
        return next;
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
      {/* Hero / Header */}
      <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">
              Discover your next destination
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Explore Cities
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-stone-300 sm:text-base">
              Search through curated Indian destinations, filter by region and budget, and save your favorites.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-xl"
          >
            <Search className="h-5 w-5 shrink-0 text-stone-400" />
            <input
              type="text"
              placeholder="Search cities by name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-white placeholder-stone-400 outline-none"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="text-stone-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </motion.div>

          {/* Filter Chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            {/* Region Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Region</span>
              {REGIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRegion(region === r ? '' : r)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                    region === r
                      ? 'border-cyan-300/50 bg-cyan-400/20 text-cyan-100'
                      : 'border-white/15 bg-white/5 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Cost Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">Budget</span>
              {COST_OPTIONS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCost(cost === c ? '' : c)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    cost === c
                      ? 'border-violet-300/50 bg-violet-400/20 text-violet-100'
                      : 'border-white/15 bg-white/5 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* City Grid */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {error ? (
            <div className="rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CityCardSkeleton key={`skel-${i}`} />
              ))}
            </div>
          ) : cities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg rounded-2xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl"
            >
              <MapPin className="mx-auto mb-4 h-12 w-12 text-stone-400" />
              <h3 className="text-xl font-semibold text-white">No cities found</h3>
              <p className="mt-2 text-sm text-stone-300">
                Try adjusting your search or filters to discover more destinations.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence>
                {cities.map((city) => (
                  <motion.article
                    key={city.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-300 hover:shadow-cyan-500/10"
                  >
                    <Link to={`/cities/${city.id}`} className="block">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={city.hero_image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60'}
                          alt={city.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/35 to-transparent" />
                        <span
                          className={`absolute bottom-2 left-2 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${costTone(city.cost_index)}`}
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

                    {/* Heart Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSave(city.id);
                      }}
                      disabled={savingIds.has(city.id)}
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 disabled:opacity-50"
                      title={savedMap[city.id] ? 'Unsave' : 'Save'}
                    >
                      <Heart
                        className={`h-4.5 w-4.5 transition ${
                          savedMap[city.id] ? 'fill-rose-500 text-rose-500' : 'text-white'
                        }`}
                      />
                    </button>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
