import type { Service } from './service-types';

/**
 * Energy and advisory services. Every one of these is offered to both
 * residential and commercial customers, which is why each detail page renders
 * a "for your home / for your business" split rather than duplicating pages.
 */
export const energyServices: Service[] = [
  {
    slug: 'solar-installation',
    title: 'Solar Installation',
    kicker: 'Energy Services',
    summary:
      'Rooftop, ground-mount and carport photovoltaic systems designed around your actual consumption and installed by our own licensed crews.',
    intro:
      'A solar array is only as good as the analysis behind it. We start from twelve months of real consumption data and a structural assessment of what you are mounting to, then design a system sized to your load and your tariff rather than to whatever fits on the roof. Installation is performed by our own licensed electricians, and permits, interconnection and incentive paperwork are all inside our scope.',
    icon: 'panel',
    accent: 'gold',
    group: 'energy',
    segments: ['residential', 'commercial'],
    highlights: [
      'Design driven by twelve months of real usage data',
      'Structural and roof-condition assessment included',
      'Permits, interconnection and incentives handled',
      'Installed by in-house licensed electricians',
    ],
    offerings: [
      { title: 'Rooftop systems', body: 'Pitched and flat roofs, with flashing and attachment detailed to preserve the existing roof warranty.' },
      { title: 'Ground-mount arrays', body: 'Where roof area, shading or orientation make ground mounting the better producer.' },
      { title: 'Solar carports', body: 'Covered parking that generates power and pairs naturally with EV charging.' },
      { title: 'Shade & yield modelling', body: 'Site-specific production modelling so the estimate you receive is one we will stand behind.' },
      { title: 'Monitoring & commissioning', body: 'Panel-level or string-level monitoring, commissioned and demonstrated before we leave.' },
      { title: 'Financing & incentives', body: 'Cash, loan, lease and PPA options, with federal, state and utility incentives filed on your behalf.' },
    ],
    process: [
      { title: 'Analyse', body: 'Twelve months of bills and interval data establish the target.' },
      { title: 'Survey', body: 'Roof, structure, service panel and shading assessed on site.' },
      { title: 'Design', body: 'Layout, equipment and financing presented as one proposal.' },
      { title: 'Install', body: 'Permitting, build and inspection managed end to end.' },
      { title: 'Activate', body: 'Interconnection, commissioning and monitoring handover.' },
    ],
    faqs: [
      { q: 'Is my roof suitable?', a: 'Orientation, pitch, shading, age and structure all matter. South-facing is ideal but east and west frequently work well, especially with a time-of-use tariff. If the roof has under about ten years of life left, we will recommend replacing it first rather than mounting to it.' },
      { q: 'What happens on cloudy days or at night?', a: 'Output drops but rarely stops in daylight. Overnight you draw from the grid, or from a battery if you have one. Net metering, where available, credits the excess you export during the day against what you pull back later.' },
      { q: 'How long does installation take?', a: 'A typical home is one to three days on site. The longer stretch is permitting and utility interconnection, usually four to twelve weeks depending on your jurisdiction.' },
    ],
    stats: [
      { value: '25-30 yr', label: 'Module performance warranty' },
      { value: '1-3 days', label: 'Typical residential install time' },
      { value: '30%', label: 'Federal credit we help you claim' },
    ],
    freeOffer: true,
    related: ['solar-upgrades', 'energy-storage', 'roofing', 'energy-analysis'],
  },

  {
    slug: 'solar-upgrades',
    title: 'Solar Upgrades & Repowering',
    kicker: 'Energy Services',
    summary:
      'Expand, modernise or repair an existing array - added capacity, new inverters, panel-level monitoring and recovery of production you have quietly been losing.',
    intro:
      'Arrays age, households grow, and the original installer is often long gone. We take on systems somebody else built: adding capacity for an EV or a heat pump, replacing inverters that have reached end of life, retrofitting monitoring so faults surface early, and diagnosing the gradual underperformance that owners usually do not notice until we measure it.',
    icon: 'upgrade',
    accent: 'blue',
    group: 'energy',
    segments: ['residential', 'commercial'],
    highlights: [
      'Capacity expansion for EVs, heat pumps and growth',
      'Inverter replacement and modernisation',
      'Panel-level monitoring retrofits',
      'Performance diagnostics on any brand',
    ],
    offerings: [
      { title: 'Capacity expansion', body: 'Additional modules and the electrical work to support them, checked against service and interconnection limits first.' },
      { title: 'Inverter replacement', body: 'String and micro-inverter replacement when the original reaches end of life, typically after ten to fifteen years.' },
      { title: 'Monitoring retrofit', body: 'Module-level electronics that turn a silent array into one that reports faults the week they occur.' },
      { title: 'Battery retrofit', body: 'AC-coupled storage added to an existing array without replacing what already works.' },
      { title: 'Performance diagnostics', body: 'IV curve tracing, thermal imaging and string testing to find the exact cause of lost output.' },
      { title: 'Orphaned system adoption', body: 'We take over service and warranty administration for systems whose original installer has gone.' },
    ],
    process: [
      { title: 'Measure', body: 'Actual output is compared against modelled expectation.' },
      { title: 'Diagnose', body: 'Thermal and electrical testing isolates the real fault.' },
      { title: 'Plan', body: 'Repair, expansion and modernisation options priced side by side.' },
      { title: 'Upgrade', body: 'Work completed with minimal array downtime.' },
      { title: 'Verify', body: 'Post-work production confirms the gain was real.' },
    ],
    faqs: [
      { q: 'My production dropped. What causes that?', a: 'Most often a failed optimiser or micro-inverter, a tripped string, soiling, or new shading from tree growth. Occasionally it is module degradation. Diagnostics settle it in a single visit rather than by guesswork.' },
      { q: 'Can I add panels to an old system?', a: 'Usually, though it depends on inverter headroom, service capacity and your interconnection agreement. Where mixing old and new modules is a problem, a separate string with its own inverter is often the cleaner answer.' },
      { q: 'Do you service systems you did not install?', a: 'Routinely. A large share of our service work is on arrays installed by companies that are no longer trading.' },
    ],
    stats: [
      { value: '10-15 yr', label: 'Typical inverter service life' },
      { value: 'Any brand', label: 'Equipment we will service' },
      { value: '5-20%', label: 'Common recoverable output loss' },
    ],
    freeOffer: true,
    related: ['solar-installation', 'solar-removal-reinstall', 'energy-storage', 'energy-analysis'],
  },

  {
    slug: 'solar-removal-reinstall',
    title: 'Solar Removal & Re-Install',
    kicker: 'Energy Services',
    summary:
      'Panel removal and re-installation for roof replacement, repairs, storm damage or relocation - one contractor, one warranty, no finger-pointing.',
    intro:
      'When the roof under an array needs work, most homeowners discover their roofer will not touch the panels and their solar company will not touch the roof. Gridless Global does both. We detach and store the array, complete the roofing scope, then re-install and re-commission the system - with a single warranty covering the roof penetrations and the array alike.',
    icon: 'layers',
    accent: 'gold',
    group: 'energy',
    segments: ['residential', 'commercial'],
    highlights: [
      'Detach and re-install for roof replacement',
      'Safe on-site storage of modules and electronics',
      'Storm and insurance work supported',
      'One warranty covering roof and array together',
    ],
    offerings: [
      { title: 'Detach & re-install', body: 'Full removal, labelled storage and re-installation with new flashing and attachment hardware.' },
      { title: 'Roof replacement coordination', body: 'Our own roofing crews work to the same schedule, so the house is never left open waiting on a subcontractor.' },
      { title: 'Storm & insurance claims', body: 'Damage assessment, documentation and direct work with your adjuster.' },
      { title: 'System relocation', body: 'Moving an array to a new roof section, a ground mount, or a new property entirely.' },
      { title: 'Decommissioning', body: 'Permanent removal with responsible module recycling and electrical make-safe.' },
      { title: 'Re-commissioning', body: 'Full electrical testing and production verification before we call the job done.' },
    ],
    process: [
      { title: 'Document', body: 'Existing layout, wiring and production recorded before anything moves.' },
      { title: 'Detach', body: 'Array removed, labelled and stored securely on site.' },
      { title: 'Roof', body: 'Roofing scope completed by our own crew.' },
      { title: 'Re-install', body: 'New flashing and hardware, array returned to its layout.' },
      { title: 'Verify', body: 'Production tested against the pre-removal baseline.' },
    ],
    faqs: [
      { q: 'How long is my system offline?', a: 'Typically three to seven days for a standard residential roof replacement. We schedule detach and re-install around the roofing crew so the gap stays as short as the work allows.' },
      { q: 'Will removal void my panel warranty?', a: 'Not when a licensed contractor performs it and documents the work, which we do as standard. Removal by an unqualified crew is a genuine warranty risk, which is much of the reason this service exists.' },
      { q: 'Can you handle the insurance claim?', a: 'Yes. We document the damage, provide the itemised scope your adjuster needs and work directly with the carrier.' },
    ],
    stats: [
      { value: '3-7 days', label: 'Typical system downtime' },
      { value: '1 contractor', label: 'Roof and array under one scope' },
      { value: '100%', label: 'New flashing on re-install' },
    ],
    related: ['roofing', 'solar-upgrades', 'solar-installation', 'residential'],
  },

  {
    slug: 'energy-analysis',
    title: 'Energy Analysis & Audits',
    kicker: 'Energy Services',
    summary:
      'Measured audits that show exactly where energy and money are leaving the building, with every improvement ranked by payback before you spend anything.',
    intro:
      'An energy analysis is the cheapest thing we sell and almost always the most valuable. Using blower-door testing, thermal imaging, interval-data analysis and tariff review, we produce a ranked list of improvements with modelled savings and payback for each. Frequently the top of that list is not the item the customer arrived asking about - and knowing that before you commit capital is the entire point.',
    icon: 'gauge',
    accent: 'cyan',
    group: 'energy',
    segments: ['residential', 'commercial'],
    highlights: [
      'Blower-door and thermal imaging diagnostics',
      'Interval-data and tariff analysis',
      'ASHRAE Level I-III for commercial buildings',
      'Every measure ranked by modelled payback',
    ],
    offerings: [
      { title: 'Home energy audit', body: 'Envelope leakage, insulation, HVAC, water heating, lighting and appliance assessment with a prioritised report.' },
      { title: 'ASHRAE Level I-III audits', body: 'From a walkthrough screen to investment-grade analysis with capital cost estimates suitable for board approval.' },
      { title: 'Thermal imaging', body: 'Infrared survey of envelope, electrical and mechanical systems that reveals losses and faults nothing else will show.' },
      { title: 'Interval data analysis', body: 'Fifteen-minute utility data analysed for load shape, demand spikes, base load and scheduling waste.' },
      { title: 'Benchmarking', body: 'ENERGY STAR Portfolio Manager scoring so each site can be ranked against genuine peers.' },
      { title: 'Measurement & verification', body: 'Post-implementation M&V that proves the savings materialised instead of assuming they did.' },
    ],
    process: [
      { title: 'Collect', body: 'Twelve to twenty-four months of bills and interval data gathered.' },
      { title: 'Test', body: 'On-site diagnostics: blower door, thermal, equipment inventory.' },
      { title: 'Model', body: 'Measures simulated for savings, cost and interaction effects.' },
      { title: 'Rank', body: 'Prioritised report by payback, NPV and carbon impact.' },
      { title: 'Verify', body: 'Savings confirmed against baseline after implementation.' },
    ],
    faqs: [
      { q: 'How long does an audit take?', a: 'A home is typically two to four hours on site with a report a few days later. Commercial audits range from a half-day walkthrough to several weeks for investment-grade work on a large facility.' },
      { q: 'Is the cost credited if we proceed?', a: 'Yes, on most residential projects we credit the audit fee against implementation work. Utility rebate programmes also cover part or all of the audit cost in many territories.' },
      { q: 'Will you recommend things you do not sell?', a: 'Often. Tariff changes, operating-schedule corrections and appliance replacements show up regularly at the top of the list. The report is worth less to you if it only contains our own product lines.' },
    ],
    stats: [
      { value: '2-4 hr', label: 'Typical residential audit' },
      { value: '15-40%', label: 'Savings commonly identified' },
      { value: 'Ranked', label: 'Every measure, by payback' },
    ],
    freeOffer: true,
    related: ['energy-bill-savings', 'energy-management', 'commercial', 'residential'],
  },

  {
    slug: 'energy-bill-savings',
    title: 'Energy Bill Savings',
    kicker: 'Energy Services',
    summary:
      'Lower bills without new hardware - rate optimisation, tariff switching, billing error recovery, demand-response enrolment and supplier procurement.',
    intro:
      'A surprising share of energy overspend has nothing to do with how much energy you use. Wrong rate schedule, uncorrected billing errors, unclaimed exemptions, power-factor penalties and unenrolled demand-response programmes quietly cost customers money every month. We audit the bill itself first, because the savings there need no capital at all.',
    icon: 'coins',
    accent: 'green',
    group: 'energy',
    segments: ['residential', 'commercial'],
    highlights: [
      'Rate-schedule review and tariff switching',
      'Historic billing error recovery and refunds',
      'Demand response and incentive enrolment',
      'Supplier procurement in deregulated markets',
    ],
    offerings: [
      { title: 'Tariff optimisation', body: 'Your usage profile tested against every rate schedule you qualify for - customers are frequently on the wrong one.' },
      { title: 'Billing audit & recovery', body: 'Historic bills reviewed for meter multiplier errors, misapplied charges and unclaimed exemptions, with refunds pursued on your behalf.' },
      { title: 'Power factor correction', body: 'Capacitor banks and equipment corrections that remove reactive power penalties from commercial bills.' },
      { title: 'Demand response enrolment', body: 'Registration in utility and grid-operator programmes that pay you for curtailment you can comfortably deliver.' },
      { title: 'Supplier procurement', body: 'Competitive supply tendering and contract timing in deregulated markets, with terms reviewed properly.' },
      { title: 'Incentive & rebate capture', body: 'Systematic identification and filing of every rebate and credit your projects qualify for.' },
    ],
    process: [
      { title: 'Gather', body: 'Twenty-four months of bills across every account and meter.' },
      { title: 'Audit', body: 'Line-by-line review for errors, wrong rates and missed programmes.' },
      { title: 'Compare', body: 'Usage modelled against all eligible tariffs and suppliers.' },
      { title: 'Switch', body: 'Filings, enrolments and refund claims executed for you.' },
      { title: 'Monitor', body: 'Ongoing review so a tariff change or new programme does not slip past.' },
    ],
    faqs: [
      { q: 'How much can this save without buying anything?', a: 'For commercial accounts, five to fifteen percent is a common result from rate and billing work alone. Residential savings are smaller in absolute terms but the work costs correspondingly little.' },
      { q: 'How far back can billing errors be recovered?', a: 'It varies by jurisdiction and utility, but two to four years of back-billing recovery is often available where a genuine error is documented.' },
      { q: 'Is demand response disruptive?', a: 'Only if you enrol badly. We look for loads you can genuinely shed - pre-cooling, deferrable pumping, non-critical process equipment - and size participation so events are a non-event operationally.' },
    ],
    stats: [
      { value: '5-15%', label: 'Common savings with no capital' },
      { value: '2-4 yr', label: 'Typical billing recovery window' },
      { value: '24 mo', label: 'Billing history we review' },
    ],
    freeOffer: true,
    related: ['energy-analysis', 'demand-side-management', 'energy-management', 'commercial'],
  },

  {
    slug: 'carbon-credits',
    title: 'Carbon Credits & Offsets',
    kicker: 'Advisory & Finance',
    summary:
      'Turn verified emissions reductions into a revenue stream - eligibility assessment, registry work, verification support, monetisation and clean reporting.',
    intro:
      'Projects that reduce emissions can often generate tradeable credits, but only if the measurement, additionality and registry work are done correctly from the start. Gridless Global assesses eligibility, builds the monitoring infrastructure, manages registry listing and third-party verification, and takes the resulting credits to market - while producing the ESG reporting your lenders and stakeholders are asking for anyway.',
    icon: 'leaf',
    accent: 'green',
    group: 'advisory',
    segments: ['commercial', 'residential', 'utility', 'community'],
    highlights: [
      'Eligibility and additionality assessment',
      'Registry listing and third-party verification',
      'Monetisation through brokers and direct buyers',
      'ESG and Scope 1-3 reporting support',
    ],
    offerings: [
      { title: 'Eligibility assessment', body: 'A candid read on whether your project generates saleable credits, under which protocol, and at roughly what volume.' },
      { title: 'Baseline & monitoring', body: 'Measurement infrastructure and data governance that will survive an auditor, established before the crediting period begins.' },
      { title: 'Registry management', body: 'Listing with Verra, Gold Standard, ACR, CAR or the relevant compliance registry, and the documentation each demands.' },
      { title: 'Verification support', body: 'We prepare the evidence package and manage the third-party validation and verification process.' },
      { title: 'Credit monetisation', body: 'Sale through broker networks, direct corporate offtake or forward agreements, with pricing guidance.' },
      { title: 'ESG reporting', body: 'Scope 1, 2 and 3 inventories, GHG Protocol alignment and disclosure-ready reporting.' },
    ],
    process: [
      { title: 'Screen', body: 'Protocol fit, additionality and likely credit volume assessed first.' },
      { title: 'Baseline', body: 'Pre-project emissions established to registry standard.' },
      { title: 'Monitor', body: 'Metering and data systems installed and validated.' },
      { title: 'Verify', body: 'Independent verification and credit issuance managed.' },
      { title: 'Monetise', body: 'Credits sold or retired against your own targets.' },
    ],
    faqs: [
      { q: 'Does rooftop solar generate credits?', a: 'Sometimes, but not automatically. Where net metering or a renewable energy certificate programme already captures the environmental attribute, issuing carbon credits as well would be double counting. We check exactly which attribute you own before promising anything.' },
      { q: 'What are credits worth?', a: 'Voluntary market prices vary widely by protocol, vintage and quality - roughly single digits to well over fifty dollars per tonne. Compliance markets price differently again. We give you a realistic range for your specific project rather than a headline number.' },
      { q: 'How long does registration take?', a: 'Typically six to eighteen months from screening to first issuance, driven mostly by the baseline monitoring period and verifier scheduling.' },
    ],
    stats: [
      { value: '6-18 mo', label: 'Screening to first issuance' },
      { value: '4+', label: 'Registries we work across' },
      { value: 'Scope 1-3', label: 'Reporting coverage' },
    ],
    related: ['energy-analysis', 'energy-grant-writing', 'commercial', 'education-hub'],
  },

  {
    slug: 'energy-management',
    title: 'Energy Management',
    kicker: 'Energy Services',
    summary:
      'Continuous oversight of how your buildings and assets consume energy - metering, analytics, automated control and someone accountable for the number.',
    intro:
      'Efficiency projects decay. Schedules drift, setpoints get overridden, equipment fails quietly and within two years a building is consuming what it did before the retrofit. Energy management is the discipline that prevents that: submetering and analytics that make consumption visible, automated control that holds the gains, and a named person reviewing the numbers every month.',
    icon: 'chart',
    accent: 'blue',
    group: 'energy',
    segments: ['commercial', 'residential', 'community'],
    highlights: [
      'Submetering and real-time analytics',
      'Automated fault detection and diagnostics',
      'Building controls and setpoint governance',
      'Monthly reporting against a measured baseline',
    ],
    offerings: [
      { title: 'Metering & submetering', body: 'Circuit and system-level metering that attributes consumption to the equipment actually responsible for it.' },
      { title: 'Analytics platform', body: 'Dashboards, anomaly alerts and drill-down that show a problem within days rather than at the next quarterly review.' },
      { title: 'Fault detection & diagnostics', body: 'Automated rules that catch simultaneous heating and cooling, stuck dampers, short cycling and schedule overrides.' },
      { title: 'Controls optimisation', body: 'BMS and thermostat programming, setpoint governance and schedule discipline that stop savings eroding.' },
      { title: 'Managed energy service', body: 'We act as your energy manager - monthly review, exception reporting and a documented action list.' },
      { title: 'ISO 50001 support', body: 'Energy management system documentation and implementation support for organisations pursuing certification.' },
    ],
    process: [
      { title: 'Instrument', body: 'Metering installed where consumption decisions are actually made.' },
      { title: 'Baseline', body: 'Weather-normalised baseline established for fair comparison.' },
      { title: 'Detect', body: 'Automated analytics surface faults and drift as they happen.' },
      { title: 'Correct', body: 'Issues routed to the right team with a defined action.' },
      { title: 'Report', body: 'Monthly performance against baseline, with variance explained.' },
    ],
    faqs: [
      { q: 'Is this just a dashboard?', a: 'A dashboard nobody reads saves nothing. The software matters, but the value is in the monthly review discipline and someone being accountable for acting on what it shows. We provide both.' },
      { q: 'Do we need to replace our building management system?', a: 'Usually not. Most modern BMS platforms expose data through BACnet or an API, and we layer analytics on top of what you already own.' },
      { q: 'What savings should we expect?', a: 'Ongoing management typically delivers five to fifteen percent beyond capital retrofits, largely by preventing the drift that would otherwise erase them.' },
    ],
    stats: [
      { value: '5-15%', label: 'Savings from management alone' },
      { value: 'Monthly', label: 'Reporting cadence' },
      { value: 'Live', label: 'Fault detection, not quarterly' },
    ],
    freeOffer: true,
    related: ['demand-side-management', 'energy-analysis', 'eco-smart-living', 'commercial'],
  },

  {
    slug: 'demand-side-management',
    title: 'Demand-Side Management',
    kicker: 'Energy Services',
    summary:
      'Reshape when and how you consume - peak shaving, load shifting, demand response and automated curtailment that cut demand charges and earn grid revenue.',
    intro:
      'For most commercial accounts, demand charges are a quarter to a half of the bill, and they are set by a handful of fifteen-minute intervals across the whole month. Demand-side management attacks that directly: identifying the peaks, shifting or curtailing the loads that cause them, automating the response, and enrolling the same flexibility in programmes that pay you for it.',
    icon: 'trending-down',
    accent: 'cyan',
    group: 'energy',
    segments: ['commercial', 'community', 'residential'],
    highlights: [
      'Peak identification from interval data',
      'Automated load shedding and sequencing',
      'Demand response programme enrolment',
      'Thermal and battery storage for load shifting',
    ],
    offerings: [
      { title: 'Peak analysis', body: 'Interval data analysed to find which equipment, at which moment, sets your monthly demand charge.' },
      { title: 'Load shifting', body: 'Pre-cooling, thermal storage, batch scheduling and process sequencing that move consumption off the peak.' },
      { title: 'Automated demand control', body: 'Controllers that shed or stage non-critical loads before a new peak is established, without human intervention.' },
      { title: 'Demand response enrolment', body: 'Registration and performance management in utility and grid-operator programmes that pay for curtailment.' },
      { title: 'Storage for peak shaving', body: 'Batteries discharged precisely against demand peaks, sized from your measured load shape.' },
      { title: 'Process scheduling', body: 'Industrial and commercial process timing reviewed against tariff structure and peak windows.' },
    ],
    process: [
      { title: 'Measure', body: 'A full year of interval data reveals the true peak pattern.' },
      { title: 'Attribute', body: 'Submetering identifies which equipment drives each peak.' },
      { title: 'Design', body: 'Shifting, shedding and storage combined into one strategy.' },
      { title: 'Automate', body: 'Controls implemented so response does not depend on staff.' },
      { title: 'Enrol', body: 'Flexibility registered in every programme that will pay for it.' },
    ],
    faqs: [
      { q: 'What is a demand charge?', a: 'A charge based on your highest rate of consumption during the billing period, usually measured over fifteen minutes, rather than on total energy used. One badly timed simultaneous start-up can set a charge you then pay for the entire month.' },
      { q: 'Will this affect operations?', a: 'It should not. We target loads with genuine flexibility - thermal mass, deferrable pumping, charging, non-critical process steps - and set limits with your operations team before anything is automated.' },
      { q: 'Can we get paid for participating?', a: 'In most territories, yes. Capacity and demand-response programmes pay for committed curtailment, and the same equipment that lowers your demand charge usually qualifies.' },
    ],
    stats: [
      { value: '25-50%', label: 'Share of bill from demand charges' },
      { value: '15 min', label: 'Interval that sets the charge' },
      { value: 'Automated', label: 'Response without staff intervention' },
    ],
    freeOffer: true,
    related: ['energy-storage', 'energy-management', 'energy-bill-savings', 'smart-microgrid'],
  },

  {
    slug: 'energy-grant-writing',
    title: 'Energy Grant Writing',
    kicker: 'Advisory & Finance',
    summary:
      'Find, win and administer the funding that makes energy projects viable - federal, state, utility and foundation programmes, from search through post-award reporting.',
    intro:
      'There is substantially more money available for energy projects than most organisations ever claim, and it goes to whoever writes the better application. Our grant team identifies the programmes you actually qualify for, builds the technical and financial narrative, assembles the submission, and stays on after the award to handle the reporting and compliance obligations that follow.',
    icon: 'file-text',
    accent: 'gold',
    group: 'advisory',
    segments: ['commercial', 'community', 'residential', 'utility'],
    highlights: [
      'Opportunity search across federal, state and utility programmes',
      'Technical narrative and budget construction',
      'Full submission management',
      'Post-award compliance and reporting',
    ],
    offerings: [
      { title: 'Funding search', body: 'A mapped list of the programmes your project and organisation type genuinely qualify for, with deadlines and match requirements.' },
      { title: 'Eligibility & readiness', body: 'An honest assessment of competitiveness before you invest effort in a low-probability application.' },
      { title: 'Narrative writing', body: 'Technical approach, need statement, impact and sustainability sections written to the published scoring rubric.' },
      { title: 'Budget & match', body: 'Budget construction, cost-share strategy and the justification narrative reviewers actually read.' },
      { title: 'Submission management', body: 'Registrations, portal mechanics, letters of support and the whole document set delivered before deadline.' },
      { title: 'Post-award administration', body: 'Performance and financial reporting, drawdown documentation and audit readiness.' },
    ],
    process: [
      { title: 'Search', body: 'Programmes matched to your project, entity type and geography.' },
      { title: 'Qualify', body: 'Competitiveness assessed honestly before work begins.' },
      { title: 'Write', body: 'Narrative and budget built directly against the scoring criteria.' },
      { title: 'Submit', body: 'Registrations, attachments and portal submission managed.' },
      { title: 'Administer', body: 'Reporting and compliance handled through the award period.' },
    ],
    faqs: [
      { q: 'Who qualifies for energy grants?', a: 'Municipalities, school districts, non-profits, tribal entities, agricultural producers, rural small businesses and manufacturers all have dedicated programmes. Homeowners generally access incentives and rebates rather than grants, which we also handle.' },
      { q: 'How are you paid?', a: 'Usually a fixed fee for the search and writing work. Contingency-only arrangements are prohibited on most federal awards, so we structure fees to stay compliant with the funder’s own rules.' },
      { q: 'How long does a grant cycle take?', a: 'Typically three to nine months from application to award notice, plus the reporting period. Build that into the project schedule rather than assuming funding arrives on your timeline.' },
    ],
    stats: [
      { value: 'Federal-local', label: 'Programme coverage' },
      { value: '3-9 mo', label: 'Typical award cycle' },
      { value: 'Post-award', label: 'Compliance handled too' },
    ],
    related: ['carbon-credits', 'education-hub', 'commercial', 'energy-analysis'],
  },

  {
    slug: 'ev-charging',
    title: 'EV Charging Infrastructure',
    kicker: 'Energy Services',
    summary:
      'Home, workplace and fleet charging - load-managed, properly permitted and designed so adding the next twenty chargers does not mean a new service.',
    intro:
      'Charging infrastructure fails in predictable ways: service capacity nobody checked, conduit nobody installed, and a second phase that costs more than the first. We design for where you are going, not only where you are - load management that lets existing capacity support more chargers, conduit and panel space for future stages, and the networking and billing to run it as a service if you need to.',
    icon: 'ev',
    accent: 'green',
    group: 'energy',
    segments: ['residential', 'commercial', 'community'],
    highlights: [
      'Level 2 and DC fast charging',
      'Load management to defer service upgrades',
      'Fleet depot design and scheduling',
      'Networked billing and access control',
    ],
    offerings: [
      { title: 'Home charging', body: 'Level 2 installation with the circuit and panel work done properly, including load calculations and permits.' },
      { title: 'Workplace & multifamily', body: 'Shared charging with access control, cost allocation and submetering that keeps billing fair.' },
      { title: 'Fleet depots', body: 'Depot design around duty cycles and dwell time, with managed charging that avoids setting new demand peaks.' },
      { title: 'DC fast charging', body: 'High-power installations including utility coordination, transformer work and site civils.' },
      { title: 'Load management', body: 'Dynamic power sharing that lets an existing service support several times more chargers than static sizing would allow.' },
      { title: 'Solar & storage integration', body: 'Charging paired with on-site generation and batteries so the demand charge does not eat the fuel savings.' },
    ],
    process: [
      { title: 'Assess', body: 'Service capacity, panel space and duty cycles established first.' },
      { title: 'Plan', body: 'Phased layout with conduit and capacity for later stages.' },
      { title: 'Install', body: 'Licensed electrical work, permits and inspection.' },
      { title: 'Network', body: 'Access control, billing and monitoring configured.' },
      { title: 'Manage', body: 'Load management tuned so charging never sets a new peak.' },
    ],
    faqs: [
      { q: 'Do I need a service upgrade for home charging?', a: 'Often not. A load calculation frequently shows existing capacity is adequate, and where it is marginal a load-management device that pauses charging during peak household demand is far cheaper than a new service.' },
      { q: 'How many chargers can our site support?', a: 'With static sizing, capacity divided by charger rating. With dynamic load management, typically three to five times that, because vehicles rarely all charge at full power simultaneously.' },
      { q: 'Can we charge users?', a: 'Yes. Networked chargers support per-session, per-kWh or time-based billing with access control by card, app or RFID.' },
    ],
    stats: [
      { value: '3-5x', label: 'More chargers with load management' },
      { value: 'L2 & DCFC', label: 'Charging levels installed' },
      { value: 'Phased', label: 'Designed for the next expansion' },
    ],
    freeOffer: true,
    related: ['electrical', 'energy-storage', 'eco-smart-living', 'demand-side-management'],
  },
];
