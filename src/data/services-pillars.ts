import type { Service } from './service-types';

/**
 * The nine headline services called out on the interactive services map.
 * Every yellow "Click here for services" button and every Key Highlights row
 * in Context/Images/Services_Map_Img.png resolves to one of these.
 */
export const pillars: Service[] = [
  {
    slug: 'solar-power-plant',
    title: 'Solar Power Plant Projects',
    short: 'Solar Power Plant',
    kicker: 'Generation & Grid',
    summary:
      'Owner-side advisory and project administration for utility-scale and distributed solar - development coordination, procurement support, execution reporting and closeout.',
    intro:
      'Complex energy projects need more than equipment. They need disciplined information, stakeholder coordination, commercial visibility and owner-side decision support. Gridless Global gives project owners a central advisory and project-administration layer across development coordination, procurement support, document control, execution reporting and closeout administration. Engineering, procurement and construction are carried out by the appropriately qualified and licensed EPC contractor, engineers and construction contractors responsible for their own scopes.',
    icon: 'sun',
    accent: 'gold',
    group: 'generation',
    segments: ['utility', 'commercial', 'community'],
    pillar: true,
    highlights: [
      'Greenfield development and interconnection strategy',
      'Single-axis tracker, fixed-tilt and bifacial designs',
      'EPC delivery managed end to end on your behalf',
      'O&M contracts with performance guarantees',
    ],
    offerings: [
      {
        title: 'Site screening & feasibility',
        body: 'Irradiance modelling, topography and soils review, environmental constraints, transmission proximity and a candid buildability score before you spend real money on a parcel.',
      },
      {
        title: 'Interconnection & permitting',
        body: 'We manage the queue position, system impact studies, utility correspondence and the local entitlement process so the schedule holds together.',
      },
      {
        title: 'Engineering & design',
        body: 'Civil, structural and electrical packages stamped by the licensed professional engineers engaged for the project, with PVsyst yield modelling, DC/AC ratio optimisation and medium-voltage collection design procured and managed as one package.',
      },
      {
        title: 'EPC procurement support',
        body: 'We help the owner organize the tender process, compare the electrical, civil and racking proposals received on a like-for-like basis, and track commissioning documentation against the as-builts. The EPC and specialist contractors are engaged by the owner and remain responsible for engineering, procurement and construction within their own scopes.',
      },
      {
        title: 'Operations & maintenance',
        body: 'SCADA monitoring and availability reporting against contracted guarantees, with preventive maintenance, module washing, vegetation control and inverter service contracted to specialist providers and their reporting organized for the owner.',
      },
      {
        title: 'Repowering & asset recovery',
        body: 'Older plants get new inverters, string-level monitoring and module replacement to claw back the production the asset has quietly been losing.',
      },
    ],
    process: [
      { title: 'Screen', body: 'Resource, grid and land constraints are modelled before anything is committed.' },
      { title: 'Develop', body: 'Site control, interconnection, permits and offtake are secured in parallel.' },
      { title: 'Engineer', body: 'Design is optimised for lifetime yield, not just lowest install cost.' },
      { title: 'Build', body: 'Specialist contractors competitively bid and managed under one schedule.' },
      { title: 'Operate', body: 'Monitored, maintained and reported against guaranteed availability.' },
    ],
    faqs: [
      {
        q: 'How much land does a solar plant need?',
        a: 'Plan on roughly 5 to 8 acres per megawatt of AC capacity for a single-axis tracker plant in open terrain. Bifacial modules, higher DC/AC ratios and constrained sites move that number, which is why we model your specific parcel rather than quoting a rule of thumb.',
      },
      {
        q: 'How long does development take?',
        a: 'Interconnection is almost always the critical path. A distributed project behind an existing service can move in six to twelve months; a transmission-connected plant typically runs two to four years from site control to commercial operation.',
      },
      {
        q: 'Do you work with existing developers?',
        a: 'Yes. We are frequently brought in as the owner’s project advisor on projects another team developed, and we are equally happy to start at the earliest stage. The EPC and O&M contracts sit between you and the appropriately licensed firms that hold them.',
      },
    ],
    stats: [
      { value: '30 yr', label: 'Design life modelled on every plant' },
      { value: '99.2%', label: 'Typical contracted availability' },
      { value: '5 kW - 10,000 MW', label: 'Project sizes managed' },
    ],
    models: [
      {
        id: 'solar',
        label: 'Solar power plant',
        url: 'https://3d.energyencyclopedia.com/solar/',
        blurb:
          'Explore a photovoltaic farm, a solar thermal plant and a central tower heliostat plant, with every major component labelled.',
      },
    ],
    related: ['energy-storage', 'smart-microgrid', 'commercial', 'energy-grant-writing'],
  },

  {
    slug: 'hydro-power-plant',
    title: 'Hydro Power Projects',
    short: 'Hydro Power Plant',
    kicker: 'Generation & Grid',
    summary:
      'Owner-side advisory and project administration for run-of-river, small hydro and pumped storage - development coordination, licensing documentation, procurement support and reporting.',
    intro:
      'Water is the most dependable renewable resource there is, and it runs at night. It is also unforgiving of sloppy hydrology and even less forgiving of sloppy licensing, so both get front-loaded. Gridless Global gives the owner a central advisory and administration layer across development coordination, agency and stakeholder communications, procurement support, document control and execution reporting. Hydrology studies, engineering, licensing submissions and construction are performed by the appropriately licensed professionals and contractors engaged for the project.',
    icon: 'droplet',
    accent: 'cyan',
    group: 'generation',
    segments: ['utility', 'community'],
    pillar: true,
    highlights: [
      'Run-of-river and low-head turbine systems',
      'Pumped storage feasibility and engineering',
      'Turbine, generator and controls modernisation',
      'Fish passage and environmental compliance',
    ],
    offerings: [
      {
        title: 'Hydrology & resource assessment',
        body: 'Flow-duration curves from gauge records and on-site measurement, head verification, and a production model you can finance against.',
      },
      {
        title: 'Licensing & environmental review',
        body: 'FERC licensing or exemption strategy, state water rights, fish passage design and agency consultation managed as one workstream.',
      },
      {
        title: 'Civil & powerhouse works',
        body: 'Intake structures, penstock routing, powerhouse design, tailrace and spillway engineering with constructability reviewed early.',
      },
      {
        title: 'Turbine & generator supply',
        body: 'Kaplan, Francis, Pelton and crossflow selection matched to your flow regime, with generator, gearbox and excitation sized to suit.',
      },
      {
        title: 'Controls & grid integration',
        body: 'Governor upgrades, SCADA, protective relaying and the interconnection package that lets the plant participate in modern markets.',
      },
      {
        title: 'Refurbishment & uprating',
        body: 'Runner replacement, bearing and seal overhaul, and control modernisation that commonly recovers five to fifteen percent of lost output.',
      },
    ],
    process: [
      { title: 'Measure', body: 'Real flow and head data, not desktop estimates, drive the production model.' },
      { title: 'License', body: 'Environmental and regulatory pathway is settled before capital is committed.' },
      { title: 'Design', body: 'Civil works and turbine selection are optimised together, not in isolation.' },
      { title: 'Construct', body: 'Water-sensitive sequencing keeps in-stream work inside permitted windows.' },
      { title: 'Sustain', body: 'Long-term operations, condition monitoring and periodic overhaul.' },
    ],
    faqs: [
      {
        q: 'Is my site big enough for hydro?',
        a: 'Head times flow is what matters, not the look of the stream. Sites with as little as three metres of head can pencil out if flow is steady and the interconnection is close. We run a no-obligation screen from public gauge data before recommending any field work.',
      },
      {
        q: 'What about fish and habitat?',
        a: 'Modern low-impact hydro is designed around passage from day one - screened intakes, minimum-flow bypasses and fish-friendly runner geometry. We treat agency consultation as a design input rather than a box to tick at the end.',
      },
      {
        q: 'Can you modernise a plant we already own?',
        a: 'Yes, and it is often the best return in the portfolio. Control and runner upgrades on a plant built in the 1970s regularly recover meaningful output for a fraction of greenfield cost.',
      },
    ],
    stats: [
      { value: '24/7', label: 'Dispatchable renewable output' },
      { value: '50-100 yr', label: 'Civil asset service life' },
      { value: '5-15%', label: 'Typical uprate recovery' },
    ],
    models: [
      {
        id: 'hydropower',
        label: 'Hydropower plant',
        url: 'https://3d.energyencyclopedia.com/hydropower-plant/',
        blurb:
          'A pumped-storage plant with a Francis turbine and a conventional plant with a Kaplan turbine, cut away down to the runner.',
      },
      {
        id: 'small-hydro',
        label: 'Small hydro',
        url: 'https://3d.energyencyclopedia.com/small-hydro/',
        blurb: 'A small run-of-river installation, showing intake, penstock, powerhouse and tailrace.',
      },
    ],
    related: ['energy-storage', 'smart-microgrid', 'thermal-power-plant', 'energy-grant-writing'],
  },

  {
    slug: 'thermal-power-plant',
    title: 'Thermal Energy Projects',
    short: 'Thermal Power Plant',
    kicker: 'Generation & Grid',
    summary:
      'Owner-side advisory and project administration for combined heat and power, biomass, waste heat recovery and geothermal projects.',
    intro:
      'Thermal generation carries the load when the sun is down and the wind is still, and it lives or dies on whether the heat is genuinely used. Gridless Global gives the owner a central advisory and administration layer: load and objective documentation, procurement support, proposal evaluation support, permitting-document coordination, commissioning-document coordination and execution reporting. Engineering, emissions permitting submissions, construction and plant operation are performed by the appropriately licensed professionals, contractors and operators engaged for the project.',
    icon: 'flame',
    accent: 'gold',
    group: 'generation',
    segments: ['utility', 'commercial', 'community'],
    pillar: true,
    highlights: [
      'Combined heat and power up to 85% total efficiency',
      'Biomass, biogas and landfill gas generation',
      'Waste heat recovery and organic Rankine cycle',
      'Emissions permitting and continuous monitoring',
    ],
    offerings: [
      {
        title: 'CHP & cogeneration',
        body: 'Reciprocating engine and turbine CHP sized to your true thermal load, so the heat is actually used and the efficiency case survives contact with reality.',
      },
      {
        title: 'Biomass & biogas',
        body: 'Anaerobic digestion, landfill gas and wood-waste systems, including feedstock contracting and gas conditioning.',
      },
      {
        title: 'Waste heat recovery',
        body: 'ORC and steam bottoming cycles that convert exhaust heat from kilns, furnaces and engines into electricity you were previously venting.',
      },
      {
        title: 'Geothermal',
        body: 'Resource confirmation, binary cycle plant design and district heating loops where the geology supports it.',
      },
      {
        title: 'Emissions & permitting',
        body: 'Air permit applications, BACT analysis, SCR and oxidation catalyst design and continuous emissions monitoring systems.',
      },
      {
        title: 'Operations management',
        body: 'Operator selection and oversight, outage and overhaul planning, and heat-rate optimisation tracked across the fleet.',
      },
    ],
    process: [
      { title: 'Profile', body: 'Electrical and thermal load profiles are measured across a full seasonal cycle.' },
      { title: 'Size', body: 'Plant is sized to the thermal load, which is what makes cogeneration pay.' },
      { title: 'Permit', body: 'Air, noise and interconnection approvals are pursued in parallel.' },
      { title: 'Install', body: 'Mechanical, electrical and controls delivered to a single coordinated schedule.' },
      { title: 'Optimise', body: 'Heat rate and availability tracked continuously against the pro forma.' },
    ],
    faqs: [
      {
        q: 'Is combined heat and power actually clean?',
        a: 'Capturing the heat is what makes the difference. A condensing power plant throws away roughly two thirds of its fuel energy; a well-matched CHP system puts most of that heat to work, reaching total efficiencies near eighty-five percent and materially cutting emissions per unit of useful energy delivered.',
      },
      {
        q: 'What size host makes sense for CHP?',
        a: 'A steady year-round thermal load is the real test. Hospitals, universities, data centres, food processors, hotels and wastewater plants are the usual strong fits, generally from about 500 kW upward.',
      },
      {
        q: 'Can thermal pair with our solar?',
        a: 'That is usually the strongest configuration. Solar covers daylight, thermal covers the base load and cold snaps, and storage smooths the transitions. We help you evaluate the three together rather than letting them be bolted on one at a time by three separate providers.',
      },
    ],
    stats: [
      { value: '85%', label: 'Achievable total CHP efficiency' },
      { value: '8,000+ hr', label: 'Annual run hours designed for' },
      { value: '<2%', label: 'Forced outage rate target' },
    ],
    models: [
      {
        id: 'geothermal',
        label: 'Geothermal plant',
        url: 'https://3d.energyencyclopedia.com/geothermal_hdr',
        blurb:
          'A Hot Dry Rock geothermal station, from the injection and production wells up through the surface power block.',
      },
      {
        id: 'biomass',
        label: 'Biomass & biogas',
        url: 'https://3d.energyencyclopedia.com/biogas/',
        blurb:
          'A biomass energy plant, showing feedstock handling, anaerobic digestion and the gas engine generating set.',
      },
    ],
    related: ['energy-storage', 'smart-microgrid', 'commercial', 'energy-management'],
  },

  {
    slug: 'energy-storage',
    title: 'Energy Storage Projects',
    short: 'Energy Storage',
    kicker: 'Generation & Grid',
    summary:
      'Owner-side advisory and project administration for battery energy storage - from a single cabinet to containerised and grid-scale systems.',
    intro:
      'Storage decisions turn on duration, tariff, safety standards and how the asset will actually be dispatched, and those answers come from data rather than brochures. Gridless Global helps the owner document objectives and critical loads, organize and compare the proposals received, coordinate communications with suppliers and licensed professionals, and track budgets, documents, decisions and reported milestones through to closeout. Technical design, sizing determinations requiring professional judgement, code compliance and installation are the responsibility of the appropriately licensed engineers and contractors engaged for the project.',
    icon: 'battery',
    accent: 'green',
    group: 'generation',
    segments: ['utility', 'commercial', 'residential', 'community'],
    pillar: true,
    highlights: [
      'Peak shaving and demand-charge management',
      'Whole-home and whole-facility backup',
      'Frequency response and capacity market participation',
      'Solar-plus-storage and standalone configurations',
    ],
    offerings: [
      {
        title: 'Dispatch & revenue modelling',
        body: 'Before hardware, we model your interval data against tariffs and market products to find which value streams the system should actually chase.',
      },
      {
        title: 'Behind-the-meter systems',
        body: 'Demand-charge management, time-of-use arbitrage and backup for commercial and industrial sites, sized to the load profile we measured.',
      },
      {
        title: 'Front-of-meter reserve',
        body: 'Containerised multi-megawatt systems for capacity, frequency regulation and renewable firming, including market registration.',
      },
      {
        title: 'Residential batteries',
        body: 'Whole-home or essential-loads backup that pairs with existing or new solar, with transfer switching done properly by licensed electricians.',
      },
      {
        title: 'Safety & code compliance',
        body: 'NFPA 855 compliance, thermal runaway mitigation, fire-service coordination, spacing and enclosure design handled as a first-class design input.',
      },
      {
        title: 'Warranty & degradation management',
        body: 'Augmentation planning, state-of-health monitoring and capacity testing so the asset still meets its obligations in year ten.',
      },
    ],
    process: [
      { title: 'Analyse', body: 'Interval data and tariff structure decide the use case and the size.' },
      { title: 'Model', body: 'Dispatch simulation projects savings and revenue over the asset life.' },
      { title: 'Design', body: 'Power conversion, controls, safety and interconnection engineered together.' },
      { title: 'Commission', body: 'Functional testing against every operating mode before handover.' },
      { title: 'Manage', body: 'Ongoing dispatch optimisation and state-of-health reporting.' },
    ],
    faqs: [
      {
        q: 'Will a battery lower my bill or just back me up?',
        a: 'It depends entirely on your tariff. If you pay demand charges or have a wide time-of-use spread, a battery can cut real money off the bill. If you are on a flat residential rate, the value is mostly resilience. We tell you which case you are in before you buy anything.',
      },
      {
        q: 'How long do batteries last?',
        a: 'Modern lithium iron phosphate systems are typically warranted for ten years or a set number of cycles, and usually retain around seventy percent of rated capacity at end of warranty. For long-duration assets, augmentation is usually planned into the design by the supplier so contracted capacity is maintained, and we make sure that is addressed in what you are quoted.',
      },
      {
        q: 'Can you add storage to solar we already have?',
        a: 'Yes. AC-coupled retrofits work with nearly any existing array. We will check your inverter, service capacity and panel space, then propose the cleanest route.',
      },
    ],
    stats: [
      { value: '2-8 hr', label: 'Typical duration range specified' },
      { value: '10 yr', label: 'Standard performance warranty' },
      { value: 'NFPA 855', label: 'Safety standard engineered to' },
    ],
    related: ['solar-power-plant', 'smart-microgrid', 'demand-side-management', 'backup-power'],
  },

  {
    slug: 'smart-microgrid',
    title: 'Microgrid Projects',
    short: 'Microgrid',
    kicker: 'Generation & Grid',
    summary:
      'Owner-side advisory and project administration for islandable, resilient power at campuses, industrial parks, municipal sites, hospitals and communities.',
    intro:
      'A microgrid is the difference between an outage being an inconvenience and an outage being a catastrophe. It is also a controls problem, a tariff problem and a procurement problem at the same time. Gridless Global gives the owner one coordinated project process: objectives documented, proposals organized and compared, utility and stakeholder communications coordinated, interfaces, risks and decisions tracked, and commissioning and closeout records collected. Engineering, protection and controls design, code determinations and installation are performed by the appropriately licensed professionals and contractors engaged for the project.',
    icon: 'network',
    accent: 'blue',
    group: 'generation',
    segments: ['commercial', 'community', 'utility'],
    pillar: true,
    highlights: [
      'Seamless islanding from the utility grid',
      'Multi-asset controller with automatic load prioritisation',
      'Campus, industrial, municipal and community scale',
      'Grid services revenue while interconnected',
    ],
    offerings: [
      {
        title: 'Resilience assessment',
        body: 'We map critical, deferrable and sheddable loads, quantify what an outage actually costs you per hour, and size the system against that number.',
      },
      {
        title: 'Microgrid controller',
        body: 'The intelligence layer: dispatch optimisation, automatic islanding and reconnection, load shedding hierarchy and forecast-aware scheduling.',
      },
      {
        title: 'Distribution & switching',
        body: 'Medium-voltage loops, automatic transfer and sectionalising switchgear, protective relaying and arc-flash studies.',
      },
      {
        title: 'Multi-asset integration',
        body: 'Solar, storage, CHP, hydro, generators and controllable loads brought under one control scheme instead of five separate ones.',
      },
      {
        title: 'Grid services participation',
        body: 'While connected, the same assets earn demand response, capacity and ancillary services revenue instead of sitting idle.',
      },
      {
        title: 'Operations & drills',
        body: 'Remote monitoring, scheduled island transfer testing and operator training so the system works the day you actually need it.',
      },
    ],
    process: [
      { title: 'Assess', body: 'Critical loads and outage cost are quantified before anything is specified.' },
      { title: 'Architect', body: 'Generation mix, storage duration and switching topology designed as one system.' },
      { title: 'Integrate', body: 'Controller tied to every asset, with tested fallback behaviour.' },
      { title: 'Prove', body: 'Live island transfer testing under load before the system is accepted.' },
      { title: 'Operate', body: 'Monitored continuously, with periodic drills that verify readiness.' },
    ],
    faqs: [
      {
        q: 'How is a microgrid different from a backup generator?',
        a: 'A generator sits idle until something breaks, then carries the load at high fuel cost. A microgrid runs every day - cutting demand charges, arbitraging tariffs and earning grid-service revenue - and islands automatically when the utility fails. It pays for itself between emergencies rather than only during them.',
      },
      {
        q: 'How long can a microgrid run islanded?',
        a: 'Indefinitely, if the generation mix supports it. A solar-plus-storage microgrid with a fuel-based backstop can hold critical loads for days or weeks; a storage-only design is usually engineered for a defined window, commonly four to twenty-four hours.',
      },
      {
        q: 'Do we need utility approval?',
        a: 'Yes, and it is a core part of our scope. Islanding requires an interconnection agreement that covers protection settings, anti-islanding and reconnection procedure. We drive that process on your behalf.',
      },
    ],
    stats: [
      { value: '<100 ms', label: 'Typical islanding transition' },
      { value: '4-24 hr', label: 'Common designed island duration' },
      { value: '3+', label: 'Asset classes under one controller' },
    ],
    freeOffer: true,
    related: ['energy-storage', 'solar-power-plant', 'eco-smart-living', 'demand-side-management'],
  },

  {
    slug: 'eco-smart-living',
    title: 'Eco-Smart Living Projects',
    short: 'Eco-Smart Living',
    kicker: 'Property Solutions',
    summary:
      'Advanced energy management for sustainable communities - connected homes, shared generation and neighbourhood-scale efficiency delivered as one programme.',
    intro:
      'Eco-Smart Living is our programme for developers, HOAs, master-planned communities and multifamily owners who want energy handled properly across an entire neighbourhood rather than one roof at a time. Shared solar and storage, connected home systems, high-performance envelopes, EV readiness and a management layer that gives residents visibility and the operator control.',
    icon: 'leaf',
    accent: 'green',
    group: 'property',
    segments: ['community', 'residential', 'commercial'],
    pillar: true,
    highlights: [
      'Community solar and shared storage',
      'Connected home energy management for every unit',
      'All-electric and net-zero-ready construction',
      'EV charging infrastructure planned from day one',
    ],
    offerings: [
      {
        title: 'Community energy master planning',
        body: 'Load forecasting, generation siting, service capacity and EV build-out planned across the whole development before the first trench is dug.',
      },
      {
        title: 'Shared solar & storage',
        body: 'Community solar arrays and shared battery systems with subscription or allocation models that keep billing clean and compliant.',
      },
      {
        title: 'Connected homes',
        body: 'Smart panels, submetering, thermostats, load controllers and a resident app that makes consumption visible and controllable.',
      },
      {
        title: 'High-performance envelopes',
        body: 'Insulation, air sealing, glazing and heat pump specification that cut demand before a single panel is installed.',
      },
      {
        title: 'EV readiness',
        body: 'Conduit, capacity and load management designed in at construction so adding chargers later is a plug, not a rebuild.',
      },
      {
        title: 'Operator dashboard',
        body: 'Portfolio-wide visibility for the HOA or asset manager: consumption, generation, alerts, reporting and benchmarking by unit.',
      },
    ],
    process: [
      { title: 'Plan', body: 'Community-wide energy master plan produced at design stage.' },
      { title: 'Specify', body: 'Envelope, equipment and infrastructure standards set for every unit.' },
      { title: 'Build', body: 'Installed alongside construction, which is far cheaper than retrofitting.' },
      { title: 'Connect', body: 'Homes, shared assets and the operator dashboard commissioned together.' },
      { title: 'Manage', body: 'Ongoing optimisation, reporting and resident support.' },
    ],
    faqs: [
      {
        q: 'Does this work for an existing community?',
        a: 'Yes. Retrofit programmes are a large part of what we do - phased envelope work, shared solar on common structures, submetering and EV infrastructure rolled out over several budget cycles rather than all at once.',
      },
      {
        q: 'How are shared systems billed?',
        a: 'Usually through virtual net metering or a subscription allocation, depending on what your state and utility permit. We model the options and handle the regulatory filings.',
      },
      {
        q: 'Can this get us to net zero?',
        a: 'For most low- and mid-rise developments, yes. The order matters: cut demand through the envelope and equipment first, then size generation and storage to what is left. Doing it the other way around is how projects end up oversized and over budget.',
      },
    ],
    stats: [
      { value: '40-60%', label: 'Typical community demand reduction' },
      { value: '100%', label: 'Units EV-ready by design' },
      { value: '1 partner', label: 'From master plan to operations' },
    ],
    freeOffer: true,
    related: ['smart-microgrid', 'residential', 'ev-charging', 'energy-management'],
  },

  {
    slug: 'education-hub',
    title: 'Education Hub',
    short: 'Education Hub',
    kicker: 'Property Solutions',
    summary:
      'Workshops, grant writing, classes and speaker services - the training and advisory arm that helps teams, schools and agencies build real energy capability.',
    intro:
      'Technology is the easy part. The Gridless Global Education Hub exists because most energy projects stall on knowledge, not hardware: a facilities team that has never operated a battery, a municipality that does not know which grant it qualifies for, a school district that wants a curriculum tied to the array on its own roof. We teach, we write the funding applications, and we put qualified speakers in front of your audience.',
    icon: 'graduation',
    accent: 'blue',
    group: 'advisory',
    segments: ['commercial', 'community', 'residential'],
    pillar: true,
    highlights: [
      'Hands-on workshops for facilities and O&M teams',
      'Grant research, writing and post-award compliance',
      'Certification-aligned classes and curriculum',
      'Keynote and panel speakers for industry events',
    ],
    offerings: [
      {
        title: 'Technical workshops',
        body: 'One- and two-day sessions on solar O&M, battery safety, microgrid operation, energy accounting and demand management, delivered on your site and on your equipment.',
      },
      {
        title: 'Grant writing services',
        body: 'Opportunity identification, narrative writing, budget construction, submission and the reporting obligations that follow an award.',
      },
      {
        title: 'Classes & curriculum',
        body: 'Multi-week courses for workforce programmes, community colleges and school districts, including curriculum aligned to real installed assets.',
      },
      {
        title: 'Speaker services',
        body: 'Keynotes, panels and executive briefings on energy transition economics, resilience planning and project finance.',
      },
      {
        title: 'Executive briefings',
        body: 'Closed-door sessions for boards and leadership teams on what the transition means for a specific portfolio or balance sheet.',
      },
      {
        title: 'Operator certification prep',
        body: 'Structured preparation for industry certifications, with practice assessments and instructor support.',
      },
    ],
    process: [
      { title: 'Scope', body: 'We establish what your team already knows and what the gap actually is.' },
      { title: 'Design', body: 'Content is built around your equipment and your regulatory context.' },
      { title: 'Deliver', body: 'On-site, remote or hybrid, with materials your team keeps.' },
      { title: 'Assess', body: 'Competency checks confirm the training landed.' },
      { title: 'Support', body: 'Follow-up office hours and refreshers as systems change.' },
    ],
    faqs: [
      {
        q: 'Do you only train your own customers?',
        a: 'No. A good portion of our training work is for teams operating equipment somebody else installed. We are happy to be purely the education partner.',
      },
      {
        q: 'What is your grant success rate?',
        a: 'We qualify hard before we write. If an opportunity is a poor fit we will say so rather than bill you for a low-probability application - which is the main reason our submitted applications perform well.',
      },
      {
        q: 'Can you build a school curriculum?',
        a: 'Yes. Curriculum tied to a district’s own solar array or battery is our most requested education programme, and we can align it to state science standards.',
      },
    ],
    stats: [
      { value: '1-12 wk', label: 'Programme lengths offered' },
      { value: 'On-site', label: 'Delivered on your own equipment' },
      { value: 'Full cycle', label: 'Grant research through reporting' },
    ],
    related: ['energy-grant-writing', 'energy-analysis', 'carbon-credits', 'energy-management'],
  },

  {
    slug: 'residential',
    title: 'Residential Projects',
    short: 'Residential',
    kicker: 'Property Solutions',
    summary:
      'Owner-side support for everything a home project involves - solar, storage, electrical, roofing, siding and the trades in between, organized into one clear process.',
    intro:
      'Most homeowners end up juggling four contractors who each blame the other three, with the whole project living in text messages and a folder of PDFs. Gridless Global takes that off you. We help you work out what the house actually needs, organize and compare the proposals you receive, keep communications with every provider flowing through one process, and track budgets, documents, decisions and reported milestones through to closeout. The regulated work - electrical, roofing, solar, construction - is contracted with and performed by appropriately licensed independent contractors responsible for their own work.',
    icon: 'home',
    accent: 'green',
    group: 'property',
    segments: ['residential'],
    pillar: true,
    highlights: [
      'Solar, battery and EV charging under one managed plan',
      'Licensed, insured and vetted specialists on every job',
      'Roofing, siding and construction coordinated with the energy work',
      'Warranty paperwork from every trade collected in one place',
      'Energy analysis before you spend anything',
    ],
    offerings: [
      {
        title: 'Solar installation & upgrades',
        body: 'New rooftop and ground-mount arrays, plus additions, inverter replacement and repair on systems another company installed - scoped with you, delivered by licensed specialists you engage.',
      },
      {
        title: 'Home battery & backup',
        body: 'Whole-home or essential-loads backup, properly transfer-switched, sized against how your household actually uses power.',
      },
      {
        title: 'Energy analysis & bill savings',
        body: 'A measured audit - blower door, thermal imaging, tariff review - that ranks every improvement by payback before you commit.',
      },
      {
        title: 'Electrical & panel upgrades',
        body: 'Service upgrades, rewiring, sub-panels, EV circuits, lighting and code corrections, delivered by licensed electricians we help you select and coordinate.',
      },
      {
        title: 'Roofing & siding',
        body: 'Full replacement and repair, coordinated with solar removal and re-install so the two trades never work against each other or bill you twice.',
      },
      {
        title: 'Construction & handyman',
        body: 'Additions, remodels, garages and the long list of smaller jobs, managed by the same team that holds your other project records.',
      },
    ],
    process: [
      { title: 'Assess', body: 'A measured energy analysis of the house, not a sales walkthrough.' },
      { title: 'Prioritise', body: 'Improvements ranked by payback so the budget goes to the right place first.' },
      { title: 'Design', body: 'One integrated scope across every trade involved.' },
      { title: 'Coordinate', body: 'We keep the providers you engage talking to each other, so roofing, electrical and solar are not each hearing about the others for the first time on site.' },
      { title: 'Support', body: 'Monitoring, maintenance and a single number to call - ours.' },
    ],
    faqs: [
      {
        q: 'Where should I start?',
        a: 'With the energy analysis. It is inexpensive, it takes a few hours, and it routinely finds that the highest-return work is air sealing or a tariff change rather than the array the homeowner came in asking about.',
      },
      {
        q: 'My roof needs replacing and I have solar. Now what?',
        a: 'That is exactly the case we are built for. The detach, the roof and the re-install run as one project on one schedule, with the warranty paperwork from each trade collected in one place - instead of you coordinating two contractors who each disclaim responsibility for the other.',
      },
      {
        q: 'Do you handle incentives and paperwork?',
        a: 'Yes. Federal credits, state and utility rebates and interconnection applications are all part of our scope - you sign, we prepare and submit. Building permits are filed and carried by the licensed contractor performing the work, and we keep that process moving so it never becomes your problem.',
      },
    ],
    stats: [
      { value: '1 plan', label: 'Every trade under one manager' },
      { value: 'Vetted', label: 'Licensed specialists on every project' },
      { value: 'Free', label: 'Initial consultation and estimate' },
    ],
    freeOffer: true,
    related: ['solar-installation', 'energy-analysis', 'roofing', 'electrical'],
  },

  {
    slug: 'commercial',
    title: 'Commercial Projects',
    short: 'Commercial',
    kicker: 'Property Solutions',
    summary:
      'Owner-side advisory and project administration for facilities and portfolios - energy analysis, solar, efficiency, carbon and the capital projects that follow.',
    intro:
      'Energy is one of the few operating costs a business can genuinely re-engineer, but the plan usually dies on a spreadsheet waiting for someone to own it. Gridless Global works with facility managers, portfolio owners, REITs, manufacturers, municipalities and institutions to establish where the money is, organize the proposals and the providers, and then keep the programme visible: budgets, invoices, documents, decisions, open issues and contractor-reported milestones in one place. Licensed contractors, engineers and design professionals perform the regulated work under their own agreements.',
    icon: 'building',
    accent: 'blue',
    group: 'property',
    segments: ['commercial'],
    pillar: true,
    highlights: [
      'Portfolio-wide energy analysis and benchmarking',
      'Rooftop, carport and ground-mount commercial solar',
      'Demand-charge and tariff optimisation',
      'Carbon credit generation and ESG reporting',
      'Credentials verified on every trade partner before work begins',
    ],
    offerings: [
      {
        title: 'Portfolio energy analysis',
        body: 'ASHRAE Level I to III audits, interval-data analysis and benchmarking that shows which sites are bleeding money and which are already fine.',
      },
      {
        title: 'Commercial solar',
        body: 'Rooftop, carport and ground-mount systems, with structural review by a licensed engineer, roof warranty coordination and financing options including PPAs and leases modelled side by side.',
      },
      {
        title: 'Demand & tariff management',
        body: 'Peak shaving, load shifting, rate-schedule review and demand-response enrolment that lower the bill without touching production.',
      },
      {
        title: 'Carbon credits & ESG',
        body: 'Credit generation, registry work, verification support and the reporting your stakeholders and lenders are asking for.',
      },
      {
        title: 'Electrical & infrastructure',
        body: 'Service upgrades, switchgear, lighting retrofits, EV charging and power quality work, scoped with you, competitively priced by licensed commercial electricians, and tracked through to sign-off.',
      },
      {
        title: 'Roofing & building envelope',
        body: 'Commercial roofing, siding, cladding and construction, procured and sequenced around solar and operations so the site keeps running.',
      },
    ],
    process: [
      { title: 'Benchmark', body: 'Every site scored against its peers to find where the money is.' },
      { title: 'Model', body: 'Measures ranked by NPV, payback and carbon impact.' },
      { title: 'Fund', body: 'Incentives and grants prepared, and financing options modelled around the plan.' },
      { title: 'Coordinate', body: 'You contract the licensed trades. We keep the information, documents and reported progress moving so the plan does not quietly drift.' },
      { title: 'Report', body: 'Measurement and verification proves the savings were real.' },
    ],
    faqs: [
      {
        q: 'Can you work across multiple sites?',
        a: 'Yes, and that is usually where the value concentrates. Portfolio benchmarking regularly shows that a small number of sites drive a disproportionate share of spend, which lets you deploy capital far more precisely.',
      },
      {
        q: 'What financing options exist?',
        a: 'Direct purchase, PPA, lease, C-PACE and ESA are all in play, plus grants and incentives. The right structure depends on your tax position and balance-sheet preference, which we work through with you before recommending one.',
      },
      {
        q: 'Will installation disrupt operations?',
        a: 'We plan around your schedule - night and weekend work, phased areas, temporary power. Disruption is a design constraint we commit to in writing, not something we discover on site.',
      },
    ],
    stats: [
      { value: '15-40%', label: 'Typical energy spend reduction' },
      { value: 'Level I-III', label: 'Audit depth available' },
      { value: 'M&V', label: 'Savings verified, not estimated' },
    ],
    freeOffer: true,
    related: ['energy-analysis', 'demand-side-management', 'carbon-credits', 'solar-installation'],
  },
];
