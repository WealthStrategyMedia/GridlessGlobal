/**
 * Inline SVG icon set.
 *
 * Every entry is the *inner* markup of a 24x24 viewBox. Keeping them inline
 * means no icon-font request and no runtime dependency, and lets each icon
 * inherit currentColor. Stroke icons are the default; anything listed in
 * `FILLED` is rendered with fill instead (the brand glyphs).
 */
export const icons = {
  /* --- Service icons --- */
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
  droplet: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
  flame:
    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  battery:
    '<rect x="2" y="7" width="16" height="10" rx="2"/><path d="M22 11v2"/><path d="M5 10v4M8.5 10v4M12 10v4"/>',
  network:
    '<rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  graduation: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M22 10v6"/><path d="M6 12.5V17c3.33 2.67 8.67 2.67 12 0v-4.5"/>',
  home: '<path d="m3 9.5 9-7 9 7V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M9.5 22v-8h5v8"/>',
  building:
    '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
  panel:
    '<path d="M3 4h18l1.5 10h-21Z"/><path d="M12 4v10M3.8 9h16.4"/><path d="M12 14v6M9 20h6"/>',
  upgrade: '<path d="M12 20V5"/><path d="m5 12 7-7 7 7"/><path d="M4 3h16"/>',
  layers:
    '<path d="m12.8 2.2a2 2 0 0 0-1.6 0L2.6 6.1a1 1 0 0 0 0 1.8l8.6 3.9a2 2 0 0 0 1.6 0l8.6-3.9a1 1 0 0 0 0-1.8Z"/><path d="m2.3 12.2 8.9 4a2 2 0 0 0 1.6 0l8.9-4"/><path d="m2.3 17.2 8.9 4a2 2 0 0 0 1.6 0l8.9-4"/>',
  gauge: '<path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/>',
  coins:
    '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
  chart: '<path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M7 16V11M12 16V7M17 16v-3"/>',
  'trending-down': '<path d="m22 17-8.5-8.5-5 5L2 7"/><path d="M16 17h6v-6"/>',
  'file-text':
    '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M8 13h8M8 17h6"/>',
  ev: '<rect x="3" y="9" width="13" height="8" rx="2"/><path d="m5 9 1.6-3.4A2 2 0 0 1 8.4 4.5h3.2a2 2 0 0 1 1.8 1.1L15 9"/><path d="M6 17v2M13 17v2"/><path d="M19.5 8.5 18 12h3l-1.5 3.5"/>',
  bolt: '<path d="M13.5 2 4.8 13.1a.6.6 0 0 0 .5 1h5.2l-1.5 7.9 8.7-11.1a.6.6 0 0 0-.5-1h-5.2Z"/>',
  shield:
    '<path d="M20 12.5c0 5-3.5 7.6-7.7 9a1 1 0 0 1-.7 0C7.5 20.1 4 17.5 4 12.5V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/><path d="m9.5 12 2 2 3.5-3.5"/>',
  roof: '<path d="m2 11 10-7.5L22 11"/><path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5"/><path d="M9.5 21v-5.5h5V21"/>',
  hammer:
    '<path d="m14.5 6.5 3 3"/><path d="M3.5 20.5a2.1 2.1 0 0 0 3 0l8-8-3-3-8 8a2.1 2.1 0 0 0 0 3Z"/><path d="M13 5.5 15.5 3l5.5 5.5L18.5 11Z"/>',
  wrench:
    '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9Z"/>',

  /* --- UI icons --- */
  'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  'arrow-up-right': '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  'arrow-left': '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  'check-circle': '<circle cx="12" cy="12" r="10"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  'chevron-down': '<path d="m6 9 6 6 6-6"/>',
  'chevron-right': '<path d="m9 6 6 6-6 6"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  phone:
    '<path d="M16.2 21a17.9 17.9 0 0 1-13.2-13.2 2 2 0 0 1 1.2-2.3l2.3-.9a2 2 0 0 1 2.5 1l1 2a2 2 0 0 1-.5 2.4l-.9.8a12 12 0 0 0 4.7 4.7l.8-.9a2 2 0 0 1 2.4-.5l2 1a2 2 0 0 1 1 2.5l-.9 2.3a2 2 0 0 1-2.4 1.1Z"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2.5 6.5 9.5 6 9.5-6"/>',
  'map-pin': '<path d="M20 10.5c0 6-8 11.5-8 11.5s-8-5.5-8-11.5a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10.5" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6.5V12l3.5 2"/>',
  calendar:
    '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  quote:
    '<path d="M9 11H5.5A1.5 1.5 0 0 1 4 9.5V8a4 4 0 0 1 4-4"/><path d="M9 11v3a4 4 0 0 1-4 4"/><path d="M20 11h-3.5A1.5 1.5 0 0 1 15 9.5V8a4 4 0 0 1 4-4"/><path d="M20 11v3a4 4 0 0 1-4 4"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/>',
  'credit-card': '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  sparkles:
    '<path d="m12 3 1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9Z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z"/>',
  award: '<circle cx="12" cy="9" r="6"/><path d="m8.2 13.8-1.4 7.4 5.2-2.8 5.2 2.8-1.4-7.4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  download: '<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/>',
  'shield-check':
    '<path d="M20 12.5c0 5-3.5 7.6-7.7 9a1 1 0 0 1-.7 0C7.5 20.1 4 17.5 4 12.5V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.2-2.7a1.2 1.2 0 0 1 1.5 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1Z"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 7.5V13"/><path d="M12 16.5h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16.5V11"/><path d="M12 7.5h.01"/>',

  /* --- Brand glyphs (filled) --- */
  linkedin:
    '<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05A4.2 4.2 0 0 1 16.6 8.7c4 0 4.4 2.4 4.4 5.6V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9Z"/>',
  facebook:
    '<path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.5 2.9h-2.3v7A10 10 0 0 0 22 12Z"/>',
  x: '<path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.2-8.3L2.4 3h6.4l4.4 5.8Zm-1.1 16.1h1.7L7.7 4.8H5.9Z"/>',
  youtube:
    '<path d="M22.5 7.2a2.8 2.8 0 0 0-1.9-2C18.9 4.7 12 4.7 12 4.7s-6.9 0-8.6.5a2.8 2.8 0 0 0-1.9 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 1.9 2c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.8 2.8 0 0 0 1.9-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8ZM9.8 15.3V8.7l5.7 3.3Z"/>',
} as const;

export type IconName = keyof typeof icons;

/** Icons drawn with fill rather than stroke. */
export const FILLED: ReadonlySet<string> = new Set(['linkedin', 'facebook', 'x', 'youtube', 'bolt', 'star']);
