import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Search, Map, Calendar, Users, Copy, Loader2, Compass } from 'lucide-react';

export default function CommunityTrips() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copyingId, setCopyingId] = useState(null);

  useEffect(() => {
    fetchCommunityTrips();
  }, []);

  const fetchCommunityTrips = async () => {
    try {
      setLoading(true);
      const res = await api.get('/community/trips');
      setTrips(res.data);
    } catch (err) {
      toast.error('Failed to load community trips');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyTrip = async (tripId) => {
    try {
      setCopyingId(tripId);
      const loadingToast = toast.loading('Duplicating itinerary...');
      const res = await api.post(`/community/trips/${tripId}/copy`);
      toast.success('Trip successfully copied!', { id: loadingToast });
      navigate(`/trips/${res.data.id}/builder`);
    } catch (err) {
      toast.error('Failed to copy trip. Please try again.');
    } finally {
      setCopyingId(null);
    }
  };

  const filteredTrips = trips.filter(trip => 
    trip.name.toLowerCase().includes(search.toLowerCase()) ||
    trip.Stops?.some(stop => stop.City?.name.toLowerCase().includes(search.toLowerCase()))
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 dark:bg-stone-900 font-sans text-stone-900 dark:text-stone-100">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-stone-900 py-20 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-blue-500 blur-3xl"></div>
          <div className="absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-emerald-500 blur-3xl"></div>
        </div>
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white to-stone-400">
              Community Journeys
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-stone-300">
              Discover, get inspired, and duplicate itineraries from fellow travelers around the globe.
            </p>
            
            <div className="mx-auto flex max-w-xl items-center overflow-hidden rounded-full bg-white/10 p-1 backdrop-blur-md border border-white/20 shadow-2xl">
              <div className="pl-4 pr-2">
                <Search className="h-5 w-5 text-stone-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search destinations, trips..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 pr-4 text-white placeholder-stone-400 outline-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
          </div>
        ) : filteredTrips.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-200 p-16 text-center dark:border-stone-800"
          >
            <Compass className="mb-4 h-16 w-16 text-stone-300 dark:text-stone-700" />
            <h3 className="mb-2 text-xl font-bold">No trips found</h3>
            <p className="text-stone-500 dark:text-stone-400">Try adjusting your search terms.</p>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredTrips.map(trip => (
              <motion.div 
                key={trip.id} 
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-lg transition-all hover:shadow-xl dark:border-stone-800 dark:bg-stone-800"
              >
                <div className="relative h-48 w-full overflow-hidden bg-stone-200 dark:bg-stone-700">
                  {trip.cover_photo ? (
                    <img
                      src={trip.cover_photo.startsWith('http') ? trip.cover_photo : `http://localhost:5000/${trip.cover_photo}`}
                      alt={trip.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60'; }}
                    />
                  ) : trip.Stops?.[0]?.City?.imageUrl ? (
                    <img
                      src={trip.Stops[0].City.imageUrl}
                      alt={trip.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=60'; }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                      <Map className="h-12 w-12 text-white/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/20 backdrop-blur-md">
                        {trip.User?.photo ? (
                          <img
                            src={trip.User.photo.startsWith('http') ? trip.User.photo : `http://localhost:5000/${trip.User.photo}`}
                            alt={trip.User.name}
                            className="h-full w-full object-cover"
                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(trip.User?.name || 'User')}&background=random`; }}
                          />
                        ) : (
                          <Users className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-white drop-shadow-md">
                        {trip.User?.name || 'Traveler'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-xl font-bold leading-tight text-stone-900 line-clamp-2 dark:text-white">
                    {trip.name}
                  </h3>
                  
                  <div className="mb-4 flex flex-wrap gap-2">
                    {trip.Stops?.slice(0, 3).map(stop => (
                      <span key={stop.id} className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                        {stop.City?.name}
                      </span>
                    ))}
                    {trip.Stops?.length > 3 && (
                      <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600 dark:bg-stone-700 dark:text-stone-300">
                        +{trip.Stops.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-4 border-t border-stone-100 dark:border-stone-700 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-stone-500 dark:text-stone-400">
                      <Calendar className="h-4 w-4" />
                      {trip.Stops?.length || 0} Stops
                    </div>
                    
                    <button 
                      onClick={() => handleCopyTrip(trip.id)}
                      disabled={copyingId === trip.id}
                      className="flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100 active:scale-95 disabled:opacity-50 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      {copyingId === trip.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      Duplicate
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
