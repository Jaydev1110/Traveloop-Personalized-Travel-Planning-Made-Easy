import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Heart, HeartOff, MapPin, Loader2, Plus } from 'lucide-react';

export default function SavedDestinations() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      setLoading(true);
      const res = await api.get('/saved-destinations');
      setSaved(res.data);
    } catch (err) {
      toast.error('Failed to load saved destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await api.delete(`/saved-destinations/${id}`);
      setSaved(saved.filter(s => s.id !== id));
      toast.success('Removed from saved');
    } catch (err) {
      toast.error('Failed to remove');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20 pt-8 dark:bg-stone-900 font-sans text-stone-900 dark:text-stone-100">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            <Heart className="h-8 w-8 text-rose-500 fill-rose-500" />
            Saved Destinations
          </h1>
          <p className="mt-2 text-stone-500 dark:text-stone-400">
            Your travel bucket list. Cities you want to visit next.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
          </div>
        ) : saved.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-stone-200 bg-white/50 p-16 text-center dark:border-stone-800 dark:bg-stone-800/50"
          >
            <div className="mb-4 rounded-full bg-rose-50 p-4 dark:bg-rose-900/20">
              <HeartOff className="h-10 w-10 text-rose-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Your bucket list is empty</h3>
            <p className="text-stone-500 dark:text-stone-400">
              Start exploring cities and click the heart icon to save them here.
            </p>
            <button 
              onClick={() => navigate('/home')}
              className="mt-6 rounded-full bg-stone-900 px-6 py-2.5 font-bold text-white transition-transform hover:scale-105 active:scale-95 dark:bg-stone-100 dark:text-stone-900"
            >
              Explore Cities
            </button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <AnimatePresence>
              {saved.map(item => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  exit="exit"
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-stone-200/50 dark:bg-stone-800 dark:shadow-none"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-stone-200 dark:bg-stone-700">
                    {item.City?.imageUrl ? (
                      <img
                        src={item.City.imageUrl}
                        alt={item.City.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60'; }}
                      />
                    ) : item.City?.hero_image ? (
                      <img
                        src={item.City.hero_image}
                        alt={item.City.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60'; }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-stone-300 dark:bg-stone-600">
                        <MapPin className="h-8 w-8 text-stone-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-rose-500"
                      title="Remove"
                    >
                      <HeartOff className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-3 left-3">
                      <h3 className="text-lg font-bold text-white drop-shadow-md">{item.City?.name}</h3>
                      <p className="text-xs font-medium text-stone-200 drop-shadow-md">{item.City?.country}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <button 
                      onClick={() => navigate('/trips/create')} // Can't add directly without a trip context, so route to create
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-stone-100 py-2.5 text-sm font-bold text-stone-900 transition-colors hover:bg-stone-200 dark:bg-stone-700 dark:text-stone-100 dark:hover:bg-stone-600"
                    >
                      <Plus className="h-4 w-4" />
                      Plan Trip Here
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
