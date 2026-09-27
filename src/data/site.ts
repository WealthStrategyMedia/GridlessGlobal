/**
 * Single source of truth for company details, navigation and global copy.
 * Placeholder contact details are marked TODO - swap them for the real ones.
 */

export const site = {
  name: 'Gridless Global',
  legalName: 'Gridless Global LLC',
  tagline: 'Powering a Connected Future',
  description:
    'Gridless Global designs, builds, finances and maintains energy systems end to end - utility-scale generation, microgrids and storage, plus solar, electrical, roofing and construction for homes and businesses.',
  url: 'https://gridlessglobal.com',

  /** Primary number. Both published numbers are listed in `phones`. */
  phone: '603-918-3678',
  phoneHref: 'tel:+16039183678',
  phones: [
    { number: '603-918-3678', href: 'tel:+16039183678' },
    { number: '786-216-3191', href: 'tel:+17862163191' },
  ],
  email: 'gridlessglobal@gmail.com',
  supportEmail: 'gridlessglobal@gmail.com',
  /** Service area only - no street address is published. */
  location: {
    city: 'Orlando',
    region: 'Florida',
    regionCode: 'FL',
    country: 'USA',
    label: 'Orlando, Florida',
  },
  hours: 'Mon-Fri 7:00am - 6:00pm - 24/7 emergency service',

  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'X', href: 'https://x.com/', icon: 'x' },
    { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  ],
} as const;

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  href: string;
  /** Rendered as a mega-menu column when present. */
  columns?: { heading: string; links: NavLink[] }[];
}

export const primaryNav: NavGroup[] = [
  {
    label: 'Services',
    href: '/services',
    columns: [
      {
        heading: 'Generation & Grid',
        links: [
          { label: 'Solar Power Plants', href: '/services/solar-power-plant', description: 'Utility and distributed PV' },
          { label: 'Hydro Power', href: '/services/hydro-power-plant', description: 'Run-of-river and small hydro' },
          { label: 'Thermal Energy', href: '/services/thermal-power-plant', description: 'CHP, biomass and geothermal' },
          { label: 'Energy Storage', href: '/services/energy-storage', description: 'Strategic reserve and BESS' },
          { label: 'Smart Microgrids', href: '/services/smart-microgrid', description: 'Islandable, resilient power' },
        ],
      },
      {
        heading: 'Property Solutions',
        links: [
          { label: 'Residential', href: '/services/residential', description: 'Everything for the home' },
          { label: 'Commercial', href: '/services/commercial', description: 'Portfolios and facilities' },
          { label: 'Eco-Smart Living', href: '/services/eco-smart-living', description: 'Connected community energy' },
          { label: 'Education Hub', href: '/services/education-hub', description: 'Workshops, classes, speakers' },
        ],
      },
      {
        heading: 'Energy Services',
        links: [
          { label: 'Solar Installation', href: '/services/solar-installation' },
          { label: 'Solar Upgrades', href: '/services/solar-upgrades' },
          { label: 'Solar Removal & Re-Install', href: '/services/solar-removal-reinstall' },
          { label: 'Energy Analysis', href: '/services/energy-analysis' },
          { label: 'Energy Bill Savings', href: '/services/energy-bill-savings' },
          { label: 'Carbon Credits', href: '/services/carbon-credits' },
        ],
      },
      {
        heading: 'Advisory & Trades',
        links: [
          { label: 'Energy Management', href: '/services/energy-management' },
          { label: 'Demand-Side Management', href: '/services/demand-side-management' },
          { label: 'Energy Grant Writing', href: '/services/energy-grant-writing' },
          { label: 'Electrical & Wiring', href: '/services/electrical' },
          { label: 'EV Charging', href: '/services/ev-charging' },
          { label: 'Backup Power', href: '/services/backup-power' },
          { label: 'Roofing', href: '/services/roofing' },
          { label: 'Siding & Exteriors', href: '/services/siding' },
          { label: 'Construction', href: '/services/construction' },
          { label: 'Handyman Services', href: '/services/handyman' },
        ],
      },
    ],
  },
  { label: 'Residential', href: '/services/residential' },
  { label: 'Commercial', href: '/services/commercial' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Pay a Bill', href: '/pay' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav = [
  {
    heading: 'Generation & Grid',
    links: [
      { label: 'Solar Power Plants', href: '/services/solar-power-plant' },
      { label: 'Hydro Power Plants', href: '/services/hydro-power-plant' },
      { label: 'Thermal Power Plants', href: '/services/thermal-power-plant' },
      { label: 'Energy Storage', href: '/services/energy-storage' },
      { label: 'Smart Microgrids', href: '/services/smart-microgrid' },
    ],
  },
  {
    heading: 'Homes & Businesses',
    links: [
      { label: 'Residential', href: '/services/residential' },
      { label: 'Commercial', href: '/services/commercial' },
      { label: 'Eco-Smart Living', href: '/services/eco-smart-living' },
      { label: 'Solar Installation', href: '/services/solar-installation' },
      { label: 'Electrical & Wiring', href: '/services/electrical' },
      { label: 'Roofing', href: '/services/roofing' },
    ],
  },
  {
    heading: 'Advisory',
    links: [
      { label: 'Energy Analysis', href: '/services/energy-analysis' },
      { label: 'Energy Bill Savings', href: '/services/energy-bill-savings' },
      { label: 'Carbon Credits', href: '/services/carbon-credits' },
      { label: 'Grant Writing', href: '/services/energy-grant-writing' },
      { label: 'Education Hub', href: '/services/education-hub' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Insights & News', href: '/blog' },
      { label: 'All Services', href: '/services' },
      { label: 'Request a Quote', href: '/quote' },
      { label: 'Make a Payment', href: '/pay' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];
