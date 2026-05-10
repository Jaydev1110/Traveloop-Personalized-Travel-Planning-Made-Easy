import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

/**
 * @param {'default' | 'onDark'} variant — onDark: light text for use over photography
 */
export default function AdminTravelerSwitch({ className = '', variant = 'default' }) {
  const { isAdmin, adminShell, setAdminShell } = useAuth();
  const navigate = useNavigate();

  if (!isAdmin) return null;

  const goTraveler = () => {
    setAdminShell('traveler');
    navigate('/home', { replace: true });
  };

  const goConsole = () => {
    setAdminShell('console');
    navigate('/admin', { replace: true });
  };

  const shell =
    variant === 'onDark'
      ? 'border-white/25 bg-black/35 backdrop-blur-md'
      : 'border-stone-300/90 bg-white/70 backdrop-blur-md dark:border-stone-600 dark:bg-stone-900/70';

  const activeTraveler =
    variant === 'onDark'
      ? 'bg-white text-stone-900 shadow-lg'
      : 'bg-stone-900 text-white shadow-md dark:bg-stone-100 dark:text-stone-900';

  const activeAdmin =
    variant === 'onDark'
      ? 'bg-white text-stone-900 shadow-lg'
      : 'bg-stone-900 text-white shadow-md dark:bg-stone-100 dark:text-stone-900';

  const idle =
    variant === 'onDark'
      ? 'text-white/75 hover:text-white'
      : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100';

  return (
    <div
      className={`inline-flex gap-0 rounded-full border p-1 ${shell} ${className}`}
      role="group"
      aria-label="Switch between traveler app and admin console"
    >
      <button
        type="button"
        onClick={goTraveler}
        className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
          adminShell === 'traveler' ? activeTraveler : idle
        }`}
      >
        Traveler
      </button>
      <button
        type="button"
        onClick={goConsole}
        className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
          adminShell === 'console' ? activeAdmin : idle
        }`}
      >
        Admin
      </button>
    </div>
  );
}
