import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  ChevronLeft,
  Loader2,
  AlertCircle,
  Compass,
  Utensils,
  Lightbulb,
  Mountain,
  ShoppingBag,
  Palette,
  Sparkles,
  Eye,
  MapPin,
} from 'lucide-react';

const TABS = [
  { key: 'about', label: 'About', icon: Compass },
  { key: 'activities', label: 'Activities', icon: Mountain },
  { key: 'eateries', label: 'Eateries', icon: Utensils },
  { key: 'tips', label: 'Tips', icon: Lightbulb },
];

function costTone(cost) {
  if (cost === 'premium') return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
  if (cost === 'mid') return 'bg-sky-500/20 text-sky-200 border-sky-400/30';
  return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
}

const TYPE_ICON = {
  adventure: Mountain,
  food: Utensils,
  culture: Palette,
  wellness: Sparkles,
  sightseeing: Eye,
  shopping: ShoppingBag,
};

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

export default function CityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const [cityRes, activitiesRes] = await Promise.allSettled([
          api.get(`/cities/${id}`),
          api.get(`/cities/${id}/activities`),
        ]);

        if (cancelled) return;

        if (cityRes.status === 'fulfilled') {
          setCity(cityRes.value.data?.data || cityRes.value.data);
        } else {
          const status = cityRes.reason?.response?.status;
          if (status === 401) {
            navigate('/login', { replace: true });
            return;
          }
          setError('City not found or could not be loaded.');
          return;
        }

        if (activitiesRes.status === 'fulfilled') {
          setActivities(
            Array.isArray(activitiesRes.value.data?.data)
              ? activitiesRes.value.data.data
              : Array.isArray(activitiesRes.value.data)
              ? activitiesRes.value.data
              : []
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error || !city) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
        <AlertCircle className="h-14 w-14 text-rose-400" />
        <h2 className="text-xl font-semibold">{error || 'City not found'}</h2>
        <Link to="/cities" className="rounded-xl border border-white/25 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:bg-white/10">
          ← Back to Cities
        </Link>
      </div>
    );
  }

  const highlights = Array.isArray(city.highlights) ? city.highlights : [];
  const eateries = Array.isArray(city.eateries) ? city.eateries : typeof city.eateries === 'object' && city.eateries ? [city.eateries] : [];
  const tips = Array.isArray(city.tips) ? city.tips : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden lg:h-96">
        <img
          src={city.hero_image || 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=70'}
          alt={city.name}
          className="h-full w-full object-cover"
          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=70'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/cities"
              className="mb-4 inline-flex items-center text-sm font-medium text-stone-300 transition hover:text-white"
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back to Cities
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                {city.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5 text-sm text-stone-300">
                  <MapPin className="h-4 w-4" />
                  {city.state}
                  {city.region ? ` · ${city.region}` : ''}
                </span>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${costTone(
                    city.cost_index
                  )}`}
                >
                  {city.cost_index || 'mid'}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-30 border-b border-white/10 bg-stone-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl overflow-x-auto px-4 md:px-6">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-semibold transition ${
                  activeTab === tab.key
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        {/* About Tab */}
        {activeTab === 'about' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {city.description && (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
                <h2 className="mb-3 text-xl font-semibold text-white">About {city.name}</h2>
                <p className="text-sm leading-relaxed text-stone-300">{city.description}</p>
              </div>
            )}
            {highlights.length > 0 && (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">Highlights</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-stone-300">
                      <span className="mt-0.5 text-cyan-400">✦</span>
                      {typeof h === 'string' ? h : h.name || JSON.stringify(h)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Activities Tab */}
        {activeTab === 'activities' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {activities.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <Mountain className="mx-auto mb-3 h-10 w-10 text-stone-500" />
                <p className="text-sm text-stone-400">No activities listed for this city yet.</p>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {activities.map((act) => {
                  const TypeIcon = TYPE_ICON[act.type] || Compass;
                  return (
                    <article
                      key={act.id}
                      className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-cyan-500/10"
                    >
                      {act.image && (
                        <div className="h-36 overflow-hidden">
                          <img src={act.image} alt={act.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=60'; }} />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/20 text-cyan-300">
                              <TypeIcon className="h-4 w-4" />
                            </div>
                            <h4 className="font-semibold text-white leading-tight">{act.name}</h4>
                          </div>
                          <span
                            className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${typeBadgeColor(
                              act.type
                            )}`}
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
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* Eateries Tab */}
        {activeTab === 'eateries' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {eateries.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <Utensils className="mx-auto mb-3 h-10 w-10 text-stone-500" />
                <p className="text-sm text-stone-400">No eatery recommendations yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {eateries.map((e, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-xl"
                  >
                    {typeof e === 'string' ? (
                      <p className="text-sm text-stone-300">{e}</p>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <Utensils className="h-4 w-4 text-rose-400" />
                          <h4 className="font-semibold text-white">{e.name || `Eatery ${i + 1}`}</h4>
                          {e.cuisine && (
                            <span className="rounded-full border border-rose-400/30 bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-200">
                              {e.cuisine}
                            </span>
                          )}
                        </div>
                        {e.description && (
                          <p className="mt-2 text-sm text-stone-300">{e.description}</p>
                        )}
                        {e.speciality && (
                          <p className="mt-1 text-xs text-stone-400">Speciality: {e.speciality}</p>
                        )}
                        {e.price_range && (
                          <p className="mt-1 text-xs text-stone-400">Price: {e.price_range}</p>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Tips Tab */}
        {activeTab === 'tips' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {tips.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <Lightbulb className="mx-auto mb-3 h-10 w-10 text-stone-500" />
                <p className="text-sm text-stone-400">No travel tips available yet.</p>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-xl">
                <h3 className="mb-4 text-lg font-semibold text-white">Travel Tips</h3>
                <ul className="space-y-3">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-300">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-[10px] font-bold text-amber-300">
                        {i + 1}
                      </span>
                      {typeof tip === 'string' ? tip : tip.text || tip.tip || JSON.stringify(tip)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Google Maps Embed */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/15 shadow-xl">
          <iframe
            title={`Map of ${city.name}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(city.name + (city.state ? ', ' + city.state : ''))}&output=embed`}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
