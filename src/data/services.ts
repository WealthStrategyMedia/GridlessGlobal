import type { Service, ServiceGroup } from './service-types';
import { pillars } from './services-pillars';
import { energyServices } from './services-energy';
import { tradeServices } from './services-trades';

export * from './service-types';

export const services: Service[] = [...pillars, ...energyServices, ...tradeServices];

const bySlug = new Map(services.map((s) => [s.slug, s]));

export function getService(slug: string): Service | undefined {
  return bySlug.get(slug);
}

/** Throws on a bad slug so a typo fails the build instead of shipping a dead link. */
export function requireService(slug: string): Service {
  const found = bySlug.get(slug);
  if (!found) throw new Error(`Unknown service slug: "${slug}"`);
  return found;
}

export function servicesInGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

export const pillarServices = services.filter((s) => s.pillar);

export const GROUP_ORDER: ServiceGroup[] = ['generation', 'property', 'energy', 'advisory', 'trades'];

/* ==========================================================================
   Interactive services map
   --------------------------------------------------------------------------
   Rectangles below are expressed as percentages of the source artwork
   (Context/Images/Services_Map_Img.png, 1672 x 941). They were measured from
   the pixels themselves, so the overlay stays locked to the artwork at every
   viewport width. If the artwork is ever re-exported, re-run:
       node scripts/measure-map.mjs
   ========================================================================== */

export interface Hotspot {
  slug: string;
  /** Label announced to screen readers and shown in the hover tooltip. */
  label: string;
  /** Percentage-of-image rectangle: left, top, width, height. */
  rect: { x: number; y: number; w: number; h: number };
}

/** The nine gold "Click here for services" buttons on the artwork. */
export const mapButtons: Hotspot[] = [
  { slug: 'thermal-power-plant', label: 'Thermal Power Plant', rect: { x: 71.591, y: 16.259, w: 11.364, h: 2.55 } },
  { slug: 'solar-power-plant', label: 'Solar Power Plant', rect: { x: 40.012, y: 16.472, w: 10.825, h: 2.657 } },
  { slug: 'eco-smart-living', label: 'Eco-Smart Living', rect: { x: 86.005, y: 33.794, w: 10.825, h: 2.657 } },
  { slug: 'smart-microgrid', label: 'Microgrid', rect: { x: 56.1, y: 45.59, w: 10.766, h: 2.657 } },
  { slug: 'energy-storage', label: 'Strategic Energy Reserve', rect: { x: 42.584, y: 52.604, w: 10.885, h: 2.657 } },
  { slug: 'education-hub', label: 'Education Hub', rect: { x: 80.203, y: 59.83, w: 10.227, h: 2.55 } },
  { slug: 'commercial', label: 'Commercial', rect: { x: 85.287, y: 75.558, w: 11.842, h: 2.763 } },
  { slug: 'hydro-power-plant', label: 'Hydro Power Plant', rect: { x: 27.273, y: 82.253, w: 11.842, h: 2.657 } },
  { slug: 'residential', label: 'Residential', rect: { x: 47.368, y: 93.624, w: 11.065, h: 2.657 } },
];

/** The seven "Key Highlights" rows down the left banner of the artwork. */
export const mapHighlights: Hotspot[] = [
  { slug: 'solar-power-plant', label: 'Solar Power', rect: { x: 1.794, y: 52.71, w: 19.139, h: 5.313 } },
  { slug: 'hydro-power-plant', label: 'Hydro Power', rect: { x: 1.794, y: 58.852, w: 19.139, h: 5.313 } },
  { slug: 'thermal-power-plant', label: 'Thermal Energy', rect: { x: 1.794, y: 65.005, w: 19.139, h: 5.313 } },
  { slug: 'energy-storage', label: 'Energy Storage', rect: { x: 1.794, y: 71.137, w: 19.139, h: 5.313 } },
  { slug: 'smart-microgrid', label: 'Smart Microgrid', rect: { x: 1.794, y: 77.279, w: 19.139, h: 5.313 } },
  { slug: 'residential', label: 'Residential', rect: { x: 1.794, y: 83.422, w: 19.139, h: 5.313 } },
  { slug: 'commercial', label: 'Commercial', rect: { x: 1.794, y: 89.564, w: 19.139, h: 5.313 } },
];

/** Native aspect ratio of the map artwork. */
export const MAP_ASPECT = 1672 / 941;

// Fail the build early if a hotspot ever points at a slug that no longer exists.
for (const spot of [...mapButtons, ...mapHighlights]) requireService(spot.slug);
