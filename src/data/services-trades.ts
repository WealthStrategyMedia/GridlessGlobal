import type { Service } from './service-types';

/**
 * Self-performed trades. Having these in-house is what lets an energy project
 * run on one schedule instead of waiting on three subcontractors.
 */
export const tradeServices: Service[] = [
  {
    slug: 'electrical',
    title: 'Electrical Services & Wiring',
    kicker: 'Trades & Construction',
    summary:
      'Licensed electricians for service upgrades, rewiring, panels, lighting, EV circuits, troubleshooting and code correction - residential and commercial.',
    intro:
      'Our electrical division is the backbone of everything else we do. Solar, storage, microgrids and EV charging all terminate in a panel that somebody has to get right, so we keep that work in-house. The same licensed team also handles conventional electrical work: service upgrades, rewiring, lighting, troubleshooting and bringing older installations back into code compliance.',
    icon: 'bolt',
    accent: 'gold',
    group: 'trades',
    segments: ['residential', 'commercial'],
    highlights: [
      'Licensed and insured on every job',
      'Service and panel upgrades to 400A and beyond',
      'Commercial switchgear and three-phase work',
      '24/7 emergency electrical response',
    ],
    offerings: [
      { title: 'Service & panel upgrades', body: 'Capacity increases, main panel replacement, sub-panels and smart panels that support solar, storage and EV charging.' },
      { title: 'Rewiring & new circuits', body: 'Whole-property rewiring, dedicated circuits, knob-and-tube and aluminium remediation.' },
      { title: 'Commercial & industrial', body: 'Three-phase distribution, switchgear, motor controls, transformers and machine connections.' },
      { title: 'Lighting', body: 'LED retrofits, controls and occupancy sensing, interior, exterior and parking areas.' },
      { title: 'Troubleshooting & repair', body: 'Intermittent faults, nuisance tripping, power quality problems and thermal imaging of panels.' },
      { title: 'Code compliance & inspection', body: 'Correction work, pre-sale inspections and documentation for insurers and authorities.' },
    ],
    process: [
      { title: 'Inspect', body: 'Existing service, panel and wiring condition assessed and documented.' },
      { title: 'Calculate', body: 'Load calculations confirm what the service can genuinely carry.' },
      { title: 'Permit', body: 'Applications filed and inspections scheduled by us.' },
      { title: 'Install', body: 'Work performed by licensed electricians, never subcontracted out.' },
      { title: 'Certify', body: 'Testing, labelling and inspection sign-off before handover.' },
    ],
    faqs: [
      { q: 'How do I know if I need a service upgrade?', a: 'Common signs are a 100A or smaller service with modern loads, a full panel with no space, repeated breaker trips, or plans to add solar, a battery or EV charging. A load calculation settles it definitively.' },
      { q: 'Do you handle emergencies?', a: 'Yes, 24/7. Burning smells, sparking, partial power loss and water contact with electrical equipment should be treated as emergencies - shut off power at the main if it is safe to do so and call us.' },
      { q: 'Is a permit really necessary?', a: 'For anything beyond simple like-for-like replacement, yes. Unpermitted electrical work causes real problems at sale, can void insurance and frequently has to be redone. We include permitting as standard.' },
    ],
    stats: [
      { value: '24/7', label: 'Emergency response' },
      { value: 'Licensed', label: 'Never subcontracted' },
      { value: '400A+', label: 'Residential service capacity' },
    ],
    related: ['ev-charging', 'backup-power', 'solar-installation', 'residential'],
  },

  {
    slug: 'backup-power',
    title: 'Backup Power & Generators',
    kicker: 'Trades & Construction',
    summary:
      'Standby generators, transfer switches and battery backup - engineered so the transition from grid to backup is automatic, tested and genuinely reliable.',
    intro:
      'Backup power that has never been tested is a hope, not a plan. We size standby systems against the loads you actually need to keep alive, install the transfer switching correctly, and put the system on a maintenance and exercise schedule so it starts on the day it matters. Where batteries make more sense than fuel - and increasingly they do - we will say so.',
    icon: 'shield',
    accent: 'blue',
    group: 'trades',
    segments: ['residential', 'commercial'],
    highlights: [
      'Automatic transfer switching, correctly installed',
      'Natural gas, propane and diesel standby generators',
      'Battery backup as a silent, fuel-free alternative',
      'Scheduled exercise and maintenance programmes',
    ],
    offerings: [
      { title: 'Standby generators', body: 'Air- and liquid-cooled units sized against a real load study, with gas supply, pad and exhaust engineered properly.' },
      { title: 'Automatic transfer switches', body: 'Whole-property or essential-loads switching, service-rated where required, with correct neutral handling.' },
      { title: 'Battery backup', body: 'Silent, emission-free backup that also earns its keep every other day through peak shaving.' },
      { title: 'Critical facility systems', body: 'Paralleled generators, N+1 redundancy, load banks and the testing regime that regulated facilities require.' },
      { title: 'Portable & interlock solutions', body: 'Lower-cost interlock kits and inlets for owners who prefer a portable unit, installed to code.' },
      { title: 'Maintenance & load testing', body: 'Scheduled exercise, oil and filter service, battery replacement and annual load bank testing.' },
    ],
    process: [
      { title: 'Prioritise', body: 'Critical, desirable and non-essential loads separated and costed.' },
      { title: 'Size', body: 'Generator or battery sized to measured starting and running loads.' },
      { title: 'Install', body: 'Pad, fuel, exhaust, transfer switch and wiring by our own crew.' },
      { title: 'Test', body: 'Live transfer testing under load before handover.' },
      { title: 'Maintain', body: 'Scheduled service and exercise so it works when called on.' },
    ],
    faqs: [
      { q: 'Generator or battery?', a: 'Batteries are silent, need no fuel and save you money every day through peak shaving, but have a defined runtime. Generators run as long as fuel lasts, which matters for multi-day outages. Many of our customers install both, with the battery carrying short outages and the generator covering the long ones.' },
      { q: 'What size do I need?', a: 'That depends on which loads must stay live and on motor starting current, which is the usual reason undersized systems fail. A load study answers it - whole-house backup is often unnecessary, and essential-loads backup costs considerably less.' },
      { q: 'How often should it be serviced?', a: 'Annual service and weekly self-exercise at minimum. Critical facilities typically add annual load-bank testing. Most standby failures trace back to neglected batteries and stale fuel, both of which maintenance catches.' },
    ],
    stats: [
      { value: '<10 sec', label: 'Typical automatic transfer time' },
      { value: 'Annual', label: 'Service and load testing' },
      { value: 'Load study', label: 'Sizing based on measurement' },
    ],
    related: ['energy-storage', 'electrical', 'smart-microgrid', 'residential'],
  },

  {
    slug: 'roofing',
    title: 'Roofing',
    kicker: 'Trades & Construction',
    summary:
      'Residential and commercial roofing - replacement, repair, storm damage and solar-ready installation from the contractor who also handles your array.',
    intro:
      'The roof is the single most important component in any solar project, and the one most often skipped over. We replace and repair residential and commercial roofs across every common system, and because we also install solar we detail the roof to receive an array - flashing, attachment layout and future penetration planning - rather than leaving that problem for a second contractor to solve badly.',
    icon: 'roof',
    accent: 'cyan',
    group: 'trades',
    segments: ['residential', 'commercial'],
    highlights: [
      'Full replacement, repair and storm restoration',
      'Solar-ready detailing and flashing',
      'Asphalt, metal, tile, TPO, EPDM and modified bitumen',
      'Manufacturer warranties with certified installation',
    ],
    offerings: [
      { title: 'Residential replacement', body: 'Architectural asphalt, standing-seam metal, tile and slate, with full tear-off, decking inspection and ventilation correction.' },
      { title: 'Commercial roofing', body: 'TPO, EPDM, PVC, modified bitumen and coating systems, including tapered insulation and drainage correction.' },
      { title: 'Repair & maintenance', body: 'Leak diagnosis, flashing repair, targeted replacement and preventive inspection programmes.' },
      { title: 'Storm damage & insurance', body: 'Damage assessment, documented scope for your adjuster and full restoration work.' },
      { title: 'Solar-ready roofing', body: 'Attachment layout and flashing planned at roofing stage so the future array never compromises the roof.' },
      { title: 'Ventilation & insulation', body: 'Attic ventilation and insulation corrected during replacement, where much of the energy benefit actually is.' },
    ],
    process: [
      { title: 'Inspect', body: 'Condition, decking, flashing and ventilation assessed and photographed.' },
      { title: 'Specify', body: 'System selected for the building, climate and any planned solar.' },
      { title: 'Protect', body: 'Property and landscaping protected, disposal arranged.' },
      { title: 'Install', body: 'Tear-off, decking repair, underlayment, flashing and finish system.' },
      { title: 'Warrant', body: 'Manufacturer and workmanship warranties registered on your behalf.' },
    ],
    faqs: [
      { q: 'Should I replace the roof before adding solar?', a: 'If the roof has less than about ten years of life left, yes. A twenty-five year array on a ten year roof means paying twice to remove and re-install the panels. Doing both together under one contract is materially cheaper.' },
      { q: 'How long does a roof replacement take?', a: 'A typical home is one to three days. Commercial projects run from a few days to several weeks depending on area, deck condition and whether operations must continue beneath.' },
      { q: 'Do you work with insurance?', a: 'Regularly. We document damage thoroughly, provide the itemised scope adjusters expect and deal with the carrier directly on your behalf.' },
    ],
    stats: [
      { value: '1-3 days', label: 'Typical residential replacement' },
      { value: '6 systems', label: 'Roofing types installed' },
      { value: 'Solar-ready', label: 'Detailed for future arrays' },
    ],
    related: ['solar-removal-reinstall', 'siding', 'solar-installation', 'construction'],
  },

  {
    slug: 'siding',
    title: 'Siding & Exteriors',
    kicker: 'Trades & Construction',
    summary:
      'Siding, cladding, soffit, fascia and gutters - replaced with the weather barrier and insulation behind them done properly, not just the visible surface.',
    intro:
      'Siding replacement is one of the few moments when the wall assembly is genuinely open, and it is the cheapest opportunity you will ever get to fix the weather barrier, add continuous insulation and correct the details that cause rot. We treat it as a building-envelope project that happens to change the appearance, which is why our siding work usually shows up in the energy analysis as well.',
    icon: 'layers',
    accent: 'green',
    group: 'trades',
    segments: ['residential', 'commercial'],
    highlights: [
      'Fibre cement, vinyl, engineered wood, metal and stone',
      'Weather barrier and flashing corrected underneath',
      'Continuous insulation added while the wall is open',
      'Soffit, fascia, trim and gutter systems',
    ],
    offerings: [
      { title: 'Siding replacement', body: 'Full tear-off with sheathing inspection, then the cladding system suited to your climate and maintenance appetite.' },
      { title: 'Weather barrier & flashing', body: 'House wrap, window and door flashing and drainage planes detailed correctly, which is where most failures originate.' },
      { title: 'Continuous insulation', body: 'Exterior rigid insulation installed during residing to cut thermal bridging through the framing.' },
      { title: 'Soffit, fascia & trim', body: 'Low-maintenance systems with the ventilation path preserved rather than blocked.' },
      { title: 'Gutters & drainage', body: 'Seamless gutters, guards and downspout routing that moves water away from the foundation.' },
      { title: 'Commercial cladding', body: 'Metal panel, composite and rainscreen systems for commercial and industrial facades.' },
    ],
    process: [
      { title: 'Assess', body: 'Existing cladding, sheathing and moisture condition inspected.' },
      { title: 'Specify', body: 'Cladding, insulation and barrier system chosen for the assembly.' },
      { title: 'Remove', body: 'Tear-off with sheathing repair and rot remediation.' },
      { title: 'Detail', body: 'Barrier, flashing and insulation installed before cladding goes on.' },
      { title: 'Finish', body: 'Cladding, trim, soffit and gutters completed and inspected.' },
    ],
    faqs: [
      { q: 'Does new siding reduce energy bills?', a: 'The cladding itself does very little. What saves energy is what goes behind it - air sealing, corrected flashing and continuous exterior insulation. Since the wall is open anyway, that work costs a fraction of what it would as a standalone project.' },
      { q: 'Can you side over existing siding?', a: 'Sometimes, but we rarely recommend it. Covering over hides moisture damage and prevents correcting the weather barrier, which is usually the actual problem.' },
      { q: 'Which material lasts longest?', a: 'Fibre cement and metal typically give the longest service life with modest maintenance. Vinyl is the value option and engineered wood offers the most authentic appearance. We match the recommendation to your climate and budget.' },
    ],
    stats: [
      { value: '5 systems', label: 'Cladding types installed' },
      { value: 'Open wall', label: 'Best moment for insulation' },
      { value: 'Full detail', label: 'Barrier and flashing corrected' },
    ],
    related: ['roofing', 'construction', 'energy-analysis', 'handyman'],
  },

  {
    slug: 'construction',
    title: 'Construction & Build-Outs',
    kicker: 'Trades & Construction',
    summary:
      'Additions, remodels, tenant improvements and ground-up work - built efficient from the start, with the energy systems designed in rather than added later.',
    intro:
      'Gridless Global builds. Residential additions and remodels, garages and accessory dwellings, commercial tenant improvements and ground-up light construction. What distinguishes our work is that the energy design is native to it: envelope performance, electrical capacity, solar readiness and EV conduit are specified at framing, when they cost almost nothing, rather than retrofitted later at many times the price.',
    icon: 'hammer',
    accent: 'gold',
    group: 'trades',
    segments: ['residential', 'commercial'],
    highlights: [
      'Additions, remodels, garages and ADUs',
      'Commercial tenant improvements and build-outs',
      'High-performance envelope as standard',
      'Solar, storage and EV readiness built in',
    ],
    offerings: [
      { title: 'Additions & remodels', body: 'Room additions, second storeys, kitchen and bathroom remodels and full interior renovation.' },
      { title: 'Garages & ADUs', body: 'Detached garages, workshops and accessory dwelling units, permitted and built to current code.' },
      { title: 'Tenant improvements', body: 'Commercial build-outs including demising walls, mechanical, electrical, finishes and occupancy sign-off.' },
      { title: 'Ground-up construction', body: 'Light commercial and residential new build with high-performance envelope specification.' },
      { title: 'Design-build delivery', body: 'One contract covering design, permitting and construction, so responsibility never lands between two firms.' },
      { title: 'Energy-ready infrastructure', body: 'Conduit, panel capacity, roof structure and mounting provisions specified at framing for future systems.' },
    ],
    process: [
      { title: 'Define', body: 'Scope, budget and schedule established before design begins.' },
      { title: 'Design', body: 'Drawings and specifications including envelope and energy provisions.' },
      { title: 'Permit', body: 'Applications, plan review and approvals managed by us.' },
      { title: 'Build', body: 'Self-performed trades with a single site supervisor accountable.' },
      { title: 'Close', body: 'Inspections, punch list, warranty documentation and handover.' },
    ],
    faqs: [
      { q: 'Do you handle design and permits?', a: 'Yes. Design-build is our default because it removes the gap between the designer and the builder, which is where most cost overruns and schedule disputes originate.' },
      { q: 'What does energy-ready construction cost extra?', a: 'Very little at framing stage - conduit, panel capacity and roof blocking are inexpensive while the walls are open. Retrofitting the same provisions later routinely costs five to ten times as much.' },
      { q: 'Can you work in an occupied building?', a: 'Yes. Phased scheduling, dust and noise containment, temporary services and out-of-hours work are all normal parts of how we plan occupied projects.' },
    ],
    stats: [
      { value: 'Design-build', label: 'Single-contract delivery' },
      { value: '5-10x', label: 'Cost of retrofitting later' },
      { value: 'One super', label: 'Accountable on every site' },
    ],
    related: ['roofing', 'siding', 'electrical', 'eco-smart-living'],
  },

  {
    slug: 'handyman',
    title: 'Handyman Services',
    kicker: 'Trades & Construction',
    summary:
      'The smaller jobs, handled properly - repairs, installations, maintenance and punch lists by insured tradespeople, for homes and commercial properties alike.',
    intro:
      'Not everything needs a project manager and a permit. Our handyman division covers the long tail of work that property owners struggle to get anyone to show up for: repairs, fixture installation, door and window adjustment, drywall, carpentry, seasonal maintenance and the punch list that never quite gets finished. Same insured team, same standards, considerably smaller invoice.',
    icon: 'wrench',
    accent: 'blue',
    group: 'trades',
    segments: ['residential', 'commercial'],
    highlights: [
      'Insured tradespeople, scheduled appointments',
      'Repairs, installations and general maintenance',
      'Commercial property and facility punch lists',
      'Recurring maintenance plans available',
    ],
    offerings: [
      { title: 'General repairs', body: 'Drywall, trim, doors, windows, hardware, fixtures and the accumulated list of things that no longer work properly.' },
      { title: 'Installations', body: 'Fixtures, ceiling fans, shelving, mounts, grab bars, appliances and smart-home devices.' },
      { title: 'Carpentry', body: 'Trim, framing repairs, decking, fencing, gates and built-in storage.' },
      { title: 'Seasonal maintenance', body: 'Gutter clearing, weather sealing, caulking, exterior touch-up and pre-winter checks.' },
      { title: 'Commercial maintenance', body: 'Recurring facility maintenance, tenant turnover work and punch-list completion.' },
      { title: 'Accessibility modifications', body: 'Ramps, grab bars, door widening and threshold work for ageing in place.' },
    ],
    process: [
      { title: 'List', body: 'Send your list, with photos if that is easier.' },
      { title: 'Quote', body: 'Hourly or fixed-price estimate, agreed before work starts.' },
      { title: 'Schedule', body: 'A real appointment window that we keep.' },
      { title: 'Complete', body: 'Work done, area cleaned, materials disposed of.' },
      { title: 'Follow up', body: 'Workmanship warranty and an easy route to call us back.' },
    ],
    faqs: [
      { q: 'Is there a minimum charge?', a: 'We have a minimum service call to cover travel and setup, which is why bundling several small items into one visit is far better value than calling us out repeatedly.' },
      { q: 'Do you do electrical and plumbing?', a: 'Electrical, yes - licensed electricians handle anything beyond a simple fixture swap. Plumbing is limited to minor repairs and fixture replacement; anything structural we refer to a licensed plumber rather than pretend otherwise.' },
      { q: 'Do you offer maintenance plans?', a: 'Yes. Scheduled quarterly or seasonal visits for homes, and recurring facility maintenance agreements for commercial properties.' },
    ],
    stats: [
      { value: 'Insured', label: 'On every visit' },
      { value: 'Bundled', label: 'Best value per call-out' },
      { value: 'Recurring', label: 'Maintenance plans available' },
    ],
    related: ['construction', 'electrical', 'siding', 'residential'],
  },
];
