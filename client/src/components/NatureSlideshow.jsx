import { useEffect } from 'react';
import { NATURE_SLIDES, PHOTO_CREDIT } from '../config/nature.js';
import { useNatureRotator } from '../hooks/useNatureRotator.js';

/**
 * Crossfade layers — use the same `activeIndex` in multiple places to keep them in sync.
 */
export function NatureCrossfade({
  activeIndex,
  slides = NATURE_SLIDES,
  className = '',
  showDots = true,
  dotClassName = '',
}) {
  return (
    <div className={`relative h-full w-full overflow-hidden bg-stone-700 ${className}`}>
      {slides.map((slide, i) => (
        <img
          key={slide.key}
          src={slide.src}
          alt=""
          fetchPriority={i === 0 ? 'high' : 'low'}
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1600ms] ease-in-out ${
            i === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.04]'
          }`}
        />
      ))}

      {showDots ? (
        <div
          className={`pointer-events-none absolute z-[15] flex gap-1.5 ${
            dotClassName || 'bottom-4 left-4 sm:bottom-6 sm:left-6'
          }`}
          aria-hidden
        >
          {slides.map((s, i) => (
            <span
              key={s.key}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === activeIndex ? 'w-6 bg-white' : 'w-1 bg-white/35'
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Full slideshow with its own timer — use on Home / Admin where only one instance exists.
 */
export default function NatureSlideshow({
  intervalMs = 5500,
  className = '',
  slides = NATURE_SLIDES,
  onSlideChange,
  showDots = true,
  dotClassName = '',
}) {
  const index = useNatureRotator(slides.length, intervalMs);

  useEffect(() => {
    onSlideChange?.(index);
  }, [index, onSlideChange]);

  return (
    <NatureCrossfade
      activeIndex={index}
      slides={slides}
      className={className}
      showDots={showDots}
      dotClassName={dotClassName}
    />
  );
}

export function slideCredit(index) {
  const slide = NATURE_SLIDES[index % NATURE_SLIDES.length];
  return slide ? PHOTO_CREDIT[slide.key] : '';
}
