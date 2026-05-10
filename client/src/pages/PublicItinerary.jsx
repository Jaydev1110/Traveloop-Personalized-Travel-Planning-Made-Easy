import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../hooks/useAuth.js';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  ChevronLeft,
  Loader2,
  AlertCircle,
  MapPin,
  Calendar,
  Copy,
  Users,
  Clock,
} from 'lucide-react';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function PublicItinerary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get(`/community/trips/${id}`);
        if (!cancelled) setTrip(data);
      } catch (err) {
        if (!cancelled) {
          if (err.response?.status === 404) {
            setError('This public trip was not found or may have been made private.');
          } else if (err.response?.status === 401) {
            navigate('/login', { replace: true });
            return;
          } else {
            setError(err.response?.data?.message || 'Failed to load trip.');
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id, navigate]);

  async function handleCopy() {
    setCopying(true);
    try {
      const loadingToast = toast.loading('Duplicating itinerary…');
      const { data } = await api.post(`/community/trips/${id}/copy`);
      toast.success('Trip copied to your account!', { id: loadingToast });
      navigate(`/trips/${data.id}/builder`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to copy trip.');
    } finally {
      setCopying(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
        <AlertCircle className="h-14 w-14 text-rose-400" />
        <h2 className="text-xl font-semibold">{error || 'Trip not found'}</h2>
        <Link to="/community" className="rounded-xl border border-white/25 bg-white/5 px-5 py-2 text-sm font-semibold transition hover:bg-white/10">
          ← Back to Community
        </Link>
      </div>
    );
  }

  const stops = trip.Stops || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
      {/* Hero */}
      <div className="relative h-72 w-full overflow-hidden lg:h-96">
        {trip.cover_photo ? (
          <img src={trip.cover_photo.startsWith('http') ? trip.cover_photo : `http://localhost:5000/${trip.cover_photo}`} alt={trip.name} className="h-full w-full object-cover opacity-70" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=60'; }} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cyan-600/40 via-blue-600/30 to-violet-600/40">
            <MapPin className="h-20 w-20 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="mx-auto max-w-5xl">
            <Link to="/community" className="mb-4 inline-flex items-center text-sm font-medium text-stone-300 transition hover:text-white">
              <ChevronLeft className="mr-1 h-4 w-4" /> Community
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">{trip.name}</h1>
              {trip.description && (
                <p className="mt-3 max-w-2xl text-sm text-stone-300">{trip.description}</p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4">
                {/* Owner */}
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/20 backdrop-blur-md">
                    {trip.User?.photo ? (
                      <img
                        src={trip.User.photo.startsWith('http') ? trip.User.photo : `http://localhost:5000/${trip.User.photo}`}
                        alt={trip.User.name}
                        className="h-full w-full object-cover"
                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(trip.User?.name || 'User')}&background=random`; }}
                      />
                    ) : (
                      <Users className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-stone-200">{trip.User?.name || 'Traveler'}</span>
                </div>
                {/* Dates */}
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-stone-300 backdrop-blur-md">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(trip.start_date)} – {formatDate(trip.end_date)}
                </span>
                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={copying}
                  className="ml-auto flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-semibold text-stone-900 shadow-lg shadow-cyan-500/30 transition hover:from-cyan-300 hover:to-blue-400 disabled:opacity-60"
                >
                  {copying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Copy className="h-4 w-4" />}
                  Copy Trip
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stop List */}
      <div className="mx-auto max-w-5xl px-4 py-12 md:px-6">
        <h2 className="mb-8 text-2xl font-semibold text-white">
          Itinerary <span className="ml-2 text-sm font-normal text-stone-400">{stops.length} stop{stops.length !== 1 && 's'}</span>
        </h2>

        {stops.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <MapPin className="mx-auto mb-3 h-10 w-10 text-stone-500" />
            <p className="text-sm text-stone-400">This trip has no stops yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {stops.map((stop, idx) => (
              <motion.div
                key={stop.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-xl backdrop-blur-xl"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* City Image */}
                  <div className="relative h-40 shrink-0 overflow-hidden sm:h-auto sm:w-44">
                    <img
                      src={stop.City?.hero_image || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=60'}
                      alt={stop.City?.name}
                      className="h-full w-full object-cover"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=60'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent sm:bg-gradient-to-r" />
                    <div className="absolute bottom-3 left-3 text-white sm:bottom-auto sm:top-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-400/30 text-xs font-bold text-cyan-100 backdrop-blur-sm">
                        {idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5">
                    <div className="mb-2 flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {stop.City?.name || 'Unknown City'}
                          {stop.City?.state && (
                            <span className="ml-2 text-sm font-normal text-stone-400">{stop.City.state}</span>
                          )}
                        </h3>
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-400">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(stop.start_date)} – {formatDate(stop.end_date)}
                        </div>
                      </div>
                    </div>

                    {/* Activities in this stop */}
                    {stop.StopActivities && stop.StopActivities.length > 0 ? (
                      <div className="mt-4 space-y-2">
                        <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                          Activities ({stop.StopActivities.length})
                        </h4>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {stop.StopActivities.map((sa) => (
                            <div
                              key={sa.id}
                              className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                            >
                              <div>
                                <p className="text-sm font-medium text-white">{sa.Activity?.name || 'Activity'}</p>
                                <p className="text-[10px] text-stone-400">{sa.Activity?.type}</p>
                              </div>
                              <div className="text-right text-xs text-stone-300">
                                <p>₹{Number(sa.Activity?.cost || 0).toLocaleString('en-IN')}</p>
                                {sa.Activity?.duration_hrs && (
                                  <p className="flex items-center gap-0.5 text-[10px] text-stone-500">
                                    <Clock className="h-2.5 w-2.5" />
                                    {sa.Activity.duration_hrs}h
                                  </p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 text-xs text-stone-500">No activities planned for this stop.</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
