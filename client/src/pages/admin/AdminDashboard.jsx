import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.js';
import AdminTravelerSwitch from '../../components/AdminTravelerSwitch.jsx';
import ThemeToggle from '../../components/ThemeToggle.jsx';
import NatureSlideshow from '../../components/NatureSlideshow.jsx';
import { NATURE, NATURE_SLIDES } from '../../config/nature.js';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [heroIdx, setHeroIdx] = useState(0);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <header className="absolute left-0 right-0 top-0 z-30 border-b border-white/10 bg-stone-950/25 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="font-display text-xl font-semibold tracking-tight text-white">Traveloop</span>
            <span className="rounded-full border border-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/85">
              Admin
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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

      <section className="relative min-h-[52vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <NatureSlideshow
            intervalMs={6500}
            onSlideChange={setHeroIdx}
            showDots
            dotClassName="bottom-6 left-auto right-6 sm:bottom-8 sm:right-10"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-stone-950/88 via-stone-950/58 to-stone-950/95" />
        <div className="pointer-events-none absolute inset-0 z-[5] opacity-[0.1] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.8%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

        <div className="relative z-10 mx-auto flex min-h-[52vh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 md:pt-36">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-emerald-200/85">
            <span className="text-white/80">Console</span>
            <span className="mx-2 font-normal text-white/35">—</span>
            <span>{NATURE_SLIDES[heroIdx]?.title ?? ''}</span>
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-white md:text-6xl">
            Command center for the journey.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-stone-300 md:text-lg">
            Analytics, travelers, and where the platform is catching fire — Phase 5 will fill this room with data.
          </p>
        </div>
      </section>

      <section className="relative z-20 -mt-12 px-5 pb-20">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-3">
          {[
            {
              label: 'Travelers',
              hint: 'Signups, roles, retention',
              img: NATURE.mountainLake,
            },
            {
              label: 'Trips',
              hint: 'Created, completed, public',
              img: NATURE.valley,
            },
            {
              label: 'Cities',
              hint: 'Stops, saves, momentum',
              img: NATURE.coast,
            },
          ].map((card) => (
            <article
              key={card.label}
              className="overflow-hidden border border-stone-200/90 bg-white shadow-lg dark:border-stone-800 dark:bg-stone-900"
            >
              <div className="relative h-36">
                <img src={card.img} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 to-transparent" />
              </div>
              <div className="p-5">
                <h2 className="font-display text-xl font-medium text-stone-900 dark:text-stone-50">{card.label}</h2>
                <p className="mt-2 text-xs leading-relaxed text-stone-600 dark:text-stone-400">{card.hint}</p>
                <div className="mt-4 h-px w-full bg-stone-200 dark:bg-stone-700">
                  <div className="h-px w-2/5 bg-stone-900 dark:bg-stone-300" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
