/**
 * Nature photography via Unsplash (Unsplash License).
 */
export const NATURE = {
  mountainLake:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=85',
  forest:
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2400&q=85',
  valley:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=85',
  ridge:
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85',
  coast:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85',
};

export const PHOTO_CREDIT = {
  mountainLake: 'Photography / Unsplash',
  forest: 'Photography / Unsplash',
  valley: 'Photography / Unsplash',
  ridge: 'Photography / Unsplash',
  coast: 'Photography / Unsplash',
};

/** All five heroes — order used by rotating slideshow */
export const NATURE_SLIDES = [
  { key: 'mountainLake', src: NATURE.mountainLake, title: 'Cold water & peaks' },
  { key: 'forest', src: NATURE.forest, title: 'Old growth' },
  { key: 'valley', src: NATURE.valley, title: 'Wide open' },
  { key: 'ridge', src: NATURE.ridge, title: 'Above the tree line' },
  { key: 'coast', src: NATURE.coast, title: 'Salt & horizon' },
];
