import { useTheme } from '../hooks/useTheme.js';

function SunIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.5A8.5 8.5 0 0111.5 5a8.45 8.45 0 012.9 5.6 8.5 8.5 0 01-9.9 9.9A8.45 8.45 0 0112 12c0-1.06.2-2.07.5-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** @param {'default' | 'onDark'} variant */
export default function ThemeToggle({ className = '', variant = 'default' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const base =
    variant === 'onDark'
      ? 'border-white/35 bg-black/25 text-white backdrop-blur-md hover:bg-black/40'
      : 'border-stone-300/80 bg-white/80 text-stone-700 shadow-sm backdrop-blur-md hover:border-stone-400 hover:bg-white dark:border-stone-600 dark:bg-stone-900/80 dark:text-stone-200 dark:hover:border-stone-500 dark:hover:bg-stone-800/90';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition ${base} ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <SunIcon className="opacity-90" /> : <MoonIcon className="opacity-90" />}
    </button>
  );
}
