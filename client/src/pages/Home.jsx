import { useState } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import AdminTravelerSwitch from '../components/AdminTravelerSwitch.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import NatureSlideshow from '../components/NatureSlideshow.jsx';
import { NATURE, NATURE_SLIDES } from '../config/nature.js';

export default function Home() {
  const { user, logout, isAdmin } = useAuth();
  const [heroIdx, setHeroIdx] = useState(0);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <header className="absolute left-0 right-0 top-0 z-30 border-b border-white/10 bg-stone-950/20 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span className="font-display text-xl font-semibold tracking-tight text-white">Traveloop</span>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="hidden rounded-full border border-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 sm:inline">
              Traveler
            </span>
            <AdminTravelerSwitch variant="onDark" />
            <ThemeToggle variant="onDark" />
            <span className="hidden text-sm text-white/80 sm:inline">{user?.name}</span>
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-white/10"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NatureSlideshow
            intervalMs={6000}
            onSlideChange={setHeroIdx}
            showDots
            dotClassName="bottom-6 left-auto right-6 sm:bottom-10 sm:right-10"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-stone-950/75 via-stone-900/45 to-stone-950/92" />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-stone-950/85 via-transparent to-stone-950/45" />
        <div className="pointer-events-none absolute inset-0 z-[5] opacity-[0.12] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.75%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-20 pt-32 md:pb-28 md:pt-40">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-emerald-200/90">
            <span className="text-white/80">Traveler</span>
            <span className="mx-2 font-normal text-white/35">—</span>
            <span>{NATURE_SLIDES[heroIdx]?.title ?? ''}</span>
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-white md:text-7xl md:leading-[1.02]">
            {isAdmin
              ? 'Seeing the trip through their eyes.'
              : `Welcome back, ${user?.name?.split(' ')[0] ?? 'explorer'}.`}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-200/95 md:text-xl">
            {isAdmin
              ? 'You’re in traveler mode. Switch to Admin when you need the console.'
              : 'Your atlas of cities, stops, and detours — refined, personal, and ready to grow.'}
          </p>
        </div>
      </section>

      <section className="relative z-20 -mt-16 px-5 pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <article className="group relative overflow-hidden border border-stone-200/80 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="relative h-48 overflow-hidden md:h-56">
              <img
                src={NATURE.coast}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <span className="absolute bottom-4 left-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90">
                Phase 2
              </span>
            </div>
            <div className="p-7">
              <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-50">Multi-city itineraries</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Stops you can reorder, activities you can feel, and a timeline that respects how you actually travel.
              </p>
            </div>
          </article>

          <article className="group relative overflow-hidden border border-stone-200/80 bg-white shadow-xl dark:border-stone-800 dark:bg-stone-900">
            <div className="relative h-48 overflow-hidden md:h-56">
              <img
                src={NATURE.valley}
                alt=""
                className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <span className="absolute bottom-4 left-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/90">
                Explore
              </span>
            </div>
            <div className="p-7">
              <h2 className="font-display text-2xl font-medium text-stone-900 dark:text-stone-50">Curated destinations</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                Twenty-five hand-seeded places across India — with real tips, not filler copy.
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
