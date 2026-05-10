import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios.js';
import { useAuth } from '../../hooks/useAuth.js';
import AdminTravelerSwitch from '../../components/AdminTravelerSwitch.jsx';
import ThemeToggle from '../../components/ThemeToggle.jsx';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Loader2, Users, Shield, ChevronLeft } from 'lucide-react';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function roleBadge(role) {
  if (role === 'admin') return 'bg-amber-500/20 text-amber-200 border-amber-400/30';
  return 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30';
}

export default function AdminUsers() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.get('/admin/users');
        if (!cancelled) {
          setUsers(Array.isArray(data?.data) ? data.data : []);
        }
      } catch (err) {
        if (!cancelled) {
          if (err.response?.status === 401 || err.response?.status === 403) {
            navigate('/admin', { replace: true });
            return;
          }
          setError(err.response?.data?.message || 'Failed to load users.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-950 via-indigo-950 to-stone-950 text-stone-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-stone-950/35 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold tracking-tight text-white">Traveloop</span>
            <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
              Admin
            </span>
          </div>
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
      </header>

      {/* Content */}
      <section className="relative overflow-hidden px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-12 top-24 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />

        <div className="mx-auto max-w-7xl">
          <Link to="/admin" className="mb-4 inline-flex items-center text-sm font-medium text-stone-400 transition hover:text-white">
            <ChevronLeft className="mr-1 h-4 w-4" /> Dashboard
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  User Management
                </h1>
                <p className="mt-1 text-sm text-stone-400">
                  {users.length} registered user{users.length !== 1 && 's'}
                </p>
              </div>
            </div>
          </motion.div>

          {error ? (
            <div className="mt-8 rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          ) : loading ? (
            <div className="mt-12 flex items-center justify-center">
              <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
            </div>
          ) : users.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
              <Users className="mx-auto mb-3 h-10 w-10 text-stone-500" />
              <p className="text-sm text-stone-400">No users found.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-8 overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                        Name
                      </th>
                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                        Email
                      </th>
                      <th className="px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                        Trips
                      </th>
                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                        Joined
                      </th>
                      <th className="px-5 py-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-white/5 transition hover:bg-white/5">
                        <td className="px-5 py-3.5 font-medium text-white">{u.name}</td>
                        <td className="px-5 py-3.5 text-stone-300">{u.email}</td>
                        <td className="px-5 py-3.5 text-center text-stone-300">
                          {u.tripCount ?? u.dataValues?.tripCount ?? 0}
                        </td>
                        <td className="px-5 py-3.5 text-stone-400">{formatDate(u.createdAt)}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${roleBadge(u.role)}`}
                          >
                            {u.role === 'admin' && <Shield className="h-3 w-3" />}
                            {u.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
