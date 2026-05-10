import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Loader2,
  X,
  Mountain,
  Utensils,
  Palette,
  Sparkles,
  Eye,
  ShoppingBag,
  Compass,
  SlidersHorizontal,
} from 'lucide-react';

const ACTIVITY_TYPES = [
  { key: 'adventure', label: 'Adventure', icon: Mountain },
  { key: 'food', label: 'Food', icon: Utensils },
  { key: 'culture', label: 'Culture', icon: Palette },
  { key: 'wellness', label: 'Wellness', icon: Sparkles },
  { key: 'sightseeing', label: 'Sightseeing', icon: Eye },
  { key: 'shopping', label: 'Shopping', icon: ShoppingBag },
];

function typeBadgeColor(type) {
  const colors = {
    adventure: 'bg-orange-500/20 text-orange-200 border-orange-400/30',
    food: 'bg-rose-500/20 text-rose-200 border-rose-400/30',
    culture: 'bg-violet-500/20 text-violet-200 border-violet-400/30',
    wellness: 'bg-teal-500/20 text-teal-200 border-teal-400/30',
    sightseeing: 'bg-cyan-500/20 text-cyan-200 border-cyan-400/30',
    shopping: 'bg-pink-500/20 text-pink-200 border-pink-400/30',
  };
  return colors[type] || 'bg-stone-500/20 text-stone-200 border-stone-400/30';
}

const TYPE_ICON = {
  adventure: Mountain,
  food: Utensils,
  culture: Palette,
  wellness: Sparkles,
  sightseeing: Eye,
  shopping: ShoppingBag,
};

function ActivitySkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-xl backdrop-blur-xl">
      <div className="h-40 animate-pulse bg-white/10" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-2/3 animate-pulse rounded bg-white/15" />
        <div className="h-4 w-full animate-pulse rounded bg-white/10" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-white/10" />
      </div>
    </article>
  );
}

export default function ActivitySearch() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [maxCost, setMaxCost] = useState('');
  const [maxDuration, setMaxDuration] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (selectedType) params.type = selectedType;
      if (maxCost) params.maxCost = maxCost;
      const { data } = await api.get('/activities', { params });

      let list = Array.isArray(data?.data) ? data.data : [];

      // Client-side duration filter (not supported by backend)
      if (maxDuration) {
        const maxDur = parseFloat(maxDuration);
        if (!isNaN(maxDur)) {
          list = list.filter((a) => parseFloat(a.duration_hrs || 0) <= maxDur);
        }
      }

      setActivities(list);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login', { replace: true });
        return;
      }
      setError(err.response?.data?.message || 'Failed to load activities.');
    } finally {
      setLoading(false);
    }
  }, [selectedType, maxCost, maxDuration, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchActivities();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchActivities]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-200/90">
              Find things to do
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Discover Activities
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-stone-300 sm:text-base">
              Browse curated experiences across all destinations — adventure, culture, food, and more.
            </p>
          </motion.div>

          {/* Type Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setSelectedType('')}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                !selectedType
                  ? 'border-cyan-300/50 bg-cyan-400/20 text-cyan-100'
                  : 'border-white/15 bg-white/5 text-stone-300 hover:bg-white/10'
              }`}
            >
              All
            </button>
            {ACTIVITY_TYPES.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setSelectedType(selectedType === t.key ? '' : t.key)}
                  className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    selectedType === t.key
                      ? 'border-violet-300/50 bg-violet-400/20 text-violet-100'
                      : 'border-white/15 bg-white/5 text-stone-300 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {t.label}
                </button>
              );
            })}
          </motion.div>

          {/* Advanced Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4"
          >
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-xs font-semibold text-stone-400 transition hover:text-white"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 flex flex-wrap items-end gap-6 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex-1 min-w-[180px]">
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                      Max Cost (₹)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={maxCost || 10000}
                      onChange={(e) => setMaxCost(e.target.value === '10000' ? '' : e.target.value)}
                      className="w-full accent-cyan-400"
                    />
                    <p className="mt-1 text-xs text-stone-300">
                      {maxCost ? `Up to ₹${Number(maxCost).toLocaleString('en-IN')}` : 'Any cost'}
                    </p>
                  </div>
                  <div className="flex-1 min-w-[180px]">
                    <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                      Max Duration (hrs)
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="0.5"
                      value={maxDuration || 12}
                      onChange={(e) => setMaxDuration(e.target.value === '12' ? '' : e.target.value)}
                      className="w-full accent-violet-400"
                    />
                    <p className="mt-1 text-xs text-stone-300">
                      {maxDuration ? `Up to ${maxDuration} hrs` : 'Any duration'}
                    </p>
                  </div>
                  {(maxCost || maxDuration) && (
                    <button
                      type="button"
                      onClick={() => {
                        setMaxCost('');
                        setMaxDuration('');
                      }}
                      className="flex items-center gap-1 rounded-lg border border-white/20 px-3 py-2 text-xs font-medium text-stone-300 transition hover:bg-white/10"
                    >
                      <X className="h-3 w-3" /> Clear
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Activity Grid */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {error ? (
            <div className="rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : loading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ActivitySkeleton key={`skel-${i}`} />
              ))}
            </div>
          ) : activities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto max-w-lg rounded-2xl border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-xl"
            >
              <Compass className="mx-auto mb-4 h-12 w-12 text-stone-400" />
              <h3 className="text-xl font-semibold text-white">No activities found</h3>
              <p className="mt-2 text-sm text-stone-300">
                Try broadening your filters to discover more experiences.
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {activities.map((act) => {
                const TypeIcon = TYPE_ICON[act.type] || Compass;
                return (
                  <motion.article
                    key={act.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="group overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl transition duration-300 hover:shadow-violet-500/10"
                  >
                    {act.image && (
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={act.image}
                          alt={act.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60'; }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-400/20 text-violet-300">
                            <TypeIcon className="h-4 w-4" />
                          </div>
                          <h4 className="font-semibold text-white leading-tight">{act.name}</h4>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${typeBadgeColor(act.type)}`}
                        >
                          {act.type}
                        </span>
                      </div>
                      {act.description && (
                        <p className="mb-3 line-clamp-2 text-xs text-stone-400">{act.description}</p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-stone-300">
                        <span>₹{Number(act.cost || 0).toLocaleString('en-IN')}</span>
                        <span>{act.duration_hrs || '–'} hrs</span>
                        {act.city_name && (
                          <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-stone-400">
                            {act.city_name}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
