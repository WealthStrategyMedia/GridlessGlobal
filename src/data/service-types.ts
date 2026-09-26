import type { IconName } from '~/components/icons';

export type Segment = 'residential' | 'commercial' | 'utility' | 'community';
export type Accent = 'blue' | 'green' | 'gold' | 'cyan';
export type ServiceGroup = 'generation' | 'property' | 'energy' | 'advisory' | 'trades';

export interface Offering {
  title: string;
  body: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Service {
  /** URL segment: /services/<slug> */
  slug: string;
  title: string;
  /** Compact label for map hotspots, chips and breadcrumbs. */
  short?: string;
  /** Eyebrow line above the page title. */
  kicker: string;
  /** One or two sentences used on cards and in meta descriptions. */
  summary: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  icon: IconName;
  accent: Accent;
  group: ServiceGroup;
  segments: Segment[];
  /** True for the nine headline services called out on the services map. */
  pillar?: boolean;
  highlights: string[];
  offerings: Offering[];
  process: Step[];
  faqs: Faq[];
  stats?: Stat[];
  /** Slugs of services shown in the "works well with" rail. */
  related: string[];
}

export const GROUP_LABELS: Record<ServiceGroup, string> = {
  generation: 'Generation & Grid',
  property: 'Property Solutions',
  energy: 'Energy Services',
  advisory: 'Advisory & Finance',
  trades: 'Trades & Construction',
};

export const SEGMENT_LABELS: Record<Segment, string> = {
  residential: 'Residential',
  commercial: 'Commercial',
  utility: 'Utility & Developer',
  community: 'Community',
};

/** Tailwind-friendly accent tokens, resolved once so every surface agrees. */
export const ACCENTS: Record<
  Accent,
  { text: string; border: string; bg: string; ring: string; dot: string; glow: string }
> = {
  blue: {
    text: 'text-brand-300',
    border: 'border-brand-500/35',
    bg: 'bg-brand-500/12',
    ring: 'group-hover:border-brand-400/60',
    dot: 'bg-brand-400',
    glow: 'shadow-glow-blue',
  },
  green: {
    text: 'text-signal-400',
    border: 'border-signal-500/35',
    bg: 'bg-signal-500/12',
    ring: 'group-hover:border-signal-400/60',
    dot: 'bg-signal-400',
    glow: 'shadow-glow-green',
  },
  gold: {
    text: 'text-gold-400',
    border: 'border-gold-500/35',
    bg: 'bg-gold-500/12',
    ring: 'group-hover:border-gold-400/60',
    dot: 'bg-gold-400',
    glow: 'shadow-glow-gold',
  },
  cyan: {
    text: 'text-brand-200',
    border: 'border-brand-300/35',
    bg: 'bg-brand-300/12',
    ring: 'group-hover:border-brand-200/60',
    dot: 'bg-brand-200',
    glow: 'shadow-glow-blue',
  },
};
