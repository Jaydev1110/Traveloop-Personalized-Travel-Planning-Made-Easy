import { NatureCrossfade, slideCredit } from './NatureSlideshow.jsx';
import { NATURE_SLIDES } from '../config/nature.js';
import { useNatureRotator } from '../hooks/useNatureRotator.js';

/**
 * Fullscreen rotating nature imagery + narrow glass form rail (no half-page solid panel).
 */
export default function AuthSplitLayout({ kicker = 'Traveloop', headline, subline, children }) {
  const slideIdx = useNatureRotator(NATURE_SLIDES.length, 5500);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-stone-800">
      {/* Fullscreen slideshow */}
      <div className="fixed inset-0 z-0">
        <NatureCrossfade
          activeIndex={slideIdx}
          slides={NATURE_SLIDES}
          className="h-full min-h-[100dvh]"
          showDots
          dotClassName="bottom-5 left-1/2 right-auto -translate-x-1/2 lg:bottom-8 lg:left-auto lg:right-8 lg:translate-x-0"
        />
      </div>

      {/* Readable scrim — light, not a solid wall */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-stone-950/50 via-stone-950/30 to-stone-950/70"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-r from-stone-950/40 via-transparent to-stone-950/55 lg:to-stone-950/70"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 z-[2] opacity-[0.1] mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22n%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.75%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23n)%22/%3E%3C/svg%3E')]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100dvh] flex-col lg:flex-row lg:items-stretch">
        {/* Editorial copy — shares the fullscreen photo */}
        <div className="flex flex-1 flex-col justify-end px-5 pb-6 pt-20 sm:pt-24 lg:justify-center lg:px-10 lg:pb-12 xl:px-14">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-emerald-200/90">{kicker}</p>
          <h1 className="mt-3 max-w-xl font-display text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-4xl xl:text-5xl">
            {headline}
          </h1>
          {subline ? (
            <p className="mt-4 max-w-md text-sm leading-relaxed text-stone-200/95 sm:text-base">{subline}</p>
          ) : null}
          <p className="mt-6 text-[0.65rem] tracking-wide text-stone-400">{slideCredit(slideIdx)}</p>
        </div>

        {/* Narrow glass rail — ~400px, not half the viewport */}
        <div className="flex w-full shrink-0 justify-center px-4 pb-10 pt-2 sm:px-6 lg:w-[min(100%,clamp(320px,32vw,420px))] lg:justify-center lg:px-6 lg:py-12 xl:px-8">
          <div className="w-full max-w-[400px] lg:my-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}
