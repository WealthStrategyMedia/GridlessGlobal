/**
 * Positioning audit.
 *
 * Gridless Global is registered, not licensed, and does not perform physical
 * work. That makes the site copy part of the compliance surface: in Florida,
 * offering or advertising regulated work is itself an offence, and several
 * distinct licence regimes are in play - contracting (Ch. 489), engineering
 * and architecture (Ch. 471 / 481), home inspection (Ch. 468 Pt XV), public
 * adjusting (Ch. 626 Pt VI) and lending.
 *
 * This walks the built HTML and fails the build on copy that claims work
 * Gridless Global cannot lawfully offer. It reads rendered text, not source,
 * so it catches claims wherever they come from - data files, components or
 * a stray heading.
 *
 * A finding is a prompt to reword, not a lint nit. See CLAUDE.md.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, sep } from 'node:path';

const DIST = 'dist';

/** Pages that legitimately discuss these activities in order to disclaim them. */
const LEGAL_PAGES = new Set(['terms', 'privacy']);

const RULES = [
  {
    regime: 'CONTRACTING',
    re: /\b(we|our team|gridless global)\s+(install|installs|build|builds|construct|constructs|perform|performs|wire|wires|rewire|reroof)\b/i,
    hint: 'Gridless Global scopes, tenders, coordinates and verifies - licensed trade partners perform.',
  },
  {
    regime: 'CONTRACTING',
    re: /\b(our|in-house)\s+(crew|crews|installers|electricians|roofers|technicians|tradespeople)\b/i,
    hint: 'There are no in-house trades. Say "the licensed X engaged for your project".',
  },
  {
    regime: 'CONTRACTING',
    re: /\bwe (are|is) licensed\b|\blicensed team\b|\bour licence\b|\bour license\b/i,
    hint: 'Never imply Gridless Global holds a trade licence. It does not.',
  },
  {
    regime: 'PERMIT',
    re: /\bwe (file|pull|obtain|apply for|hold)\b[^.]{0,30}permit|permits?[^.]{0,20}\b(filed|pulled|obtained) by us\b|permits? handled by us/i,
    hint: 'The licensed trade partner files and holds the permit. We track it.',
  },
  {
    regime: 'ENGINEERING',
    re: /\bwe\b[^.]{0,40}\b(stamp|stamped|seal|certify)\b|\bour engineers\b|engineers on (the|our) team|\bwe engineer\b/i,
    hint: 'Sealed work is by a separately licensed PE or architect engaged for the project.',
  },
  {
    regime: 'ENGINEERING',
    re: /\bwe\b[^.]{0,30}structural (assessment|analysis|calculation)/i,
    hint: 'Structural assessment is engineering. Attribute it to a licensed engineer.',
  },
  {
    regime: 'HOME INSPECTION',
    re: /\b(home|building|pre-sale|pre-purchase) inspections?\b/i,
    hint: 'Home inspection is separately licensed. Use "condition documentation" or "energy analysis".',
    skipLegal: true,
  },
  {
    regime: 'PUBLIC ADJUSTING',
    re: /\b(we|us)\b[^.]{0,60}\b(adjust|negotiat\w+|settl\w+)\b[^.]{0,30}\b(claim|carrier|insurer)\b/i,
    hint: 'Adjusting or negotiating a claim for a client needs a public adjuster licence. Documentation only.',
    skipLegal: true,
  },
  {
    regime: 'PUBLIC ADJUSTING',
    re: /\b(deal|work|dealing|working) (with|directly with) (the )?(carrier|insurer)\b/i,
    hint: 'Do not offer to deal with the carrier on the client’s behalf.',
    skipLegal: true,
  },
  {
    regime: 'LENDING',
    re: /\bwe\b[^.]{0,40}\b(arrange|originate|broker)\b[^.]{0,20}\b(financ\w+|loan|credit)\b/i,
    hint: 'Financing options are modelled and compared, not arranged or brokered.',
    skipLegal: true,
  },
  {
    regime: 'WARRANTY',
    re: /\bgridless global guarantee\b|\bwe warrant\b|\bour (warranty|guarantee)\b|\bwarranty desk\b|\bheld and enforced by us\b|\bwe (hold and enforce|enforce) (those|the|every|each)? ?warrant/i,
    hint: 'Gridless Global gives no warranty or guarantee of any kind. Warranties are the trade partner\u2019s and the manufacturer\u2019s; we only collect and register the paperwork.',
    skipLegal: true,
  },
  {
    regime: 'WARRANTY',
    re: /\bour warranty (on|covering) (the )?(work|installation|roof)\b|\bwe warrant the (work|installation)\b|one warranty covering|\bwarranty across every trade\b|\bone warranty\b(?! desk)/i,
    hint: 'Gridless Global does not warrant the physical work. The performing trade and the manufacturer do.',
    skipLegal: true,
  },
  {
    regime: 'CONTROL / TENDERING',
    re: /\bwe (competitively )?(tender|bid)\b|\bwe put the work to\b|\bwe appoint\b|\bwe (supervise|oversee|direct|control)\b|\bwe manage the (build|construction|trades?|crew)\b|\bschedule we control\b|\bunder our control\b|\bwe sequence\b/i,
    hint: 'Gridless organizes information and coordinates communication. It does not tender, appoint, supervise, direct or control contractors or their schedules.',
    skipLegal: true,
  },
  {
    regime: 'OWNER-BUILDER / JOBSITE',
    re: /manages? (the )?jobsite|takes? over the owner|so the (home)?owner does ?n.?t have to supervise|manage your construction|construction project management|manages? (the )?(construction|subcontractors|trades) (from|through)|schedules? and oversees?/i,
    hint: 'Florida requires an owner-builder to personally supervise and forbids delegating that to an unlicensed person. Never claim to replace owner supervision, control the jobsite, or manage construction end to end.',
    skipLegal: true,
  },
  {
    regime: 'EPC / ROLE',
    re: /\bour EPC\b|\bwe (are|act as) (your )?(the )?(EPC|GC|general contractor|contractor)\b|\bwe provide EPC\b|\b(as|is) the EPC\b|\bEPC or O&M partner\b|\bEPC services\b|\bowner.s engineer\b/i,
    hint: 'Gridless supports the owner across EPC procurement and administration. It is not the EPC, the GC, or the Owner\u2019s Engineer.',
    skipLegal: true,
  },
  {
    regime: 'LICENSING CLAIM',
    re: /\brequires? no licen[cs]e/i,
    hint: 'Never claim licensing is unnecessary. Say requirements vary by jurisdiction and Gridless limits its scope accordingly.',
    skipLegal: true,
  },
  {
    regime: 'PAYMENT CHARACTER',
    re: /\b(construction|material|roof|electrical) deposit\b|\bmobili[sz]ation payment\b|\bprogress payment\b|\bconstruction draw\b|\bretainage\b/i,
    hint: 'Gridless invoices advisory and administration fees only, never construction-style payments.',
    skipLegal: true,
  },
  {
    regime: 'BID SOLICITATION',
    re: /\bone contract\b|\bsingle[- ]contract\b|\bfree estimate\b|\bfree quote\b/i,
    hint: 'Offer a consultation, not a construction bid, and never a single contract covering the work.',
    skipLegal: true,
  },
];

const pages = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name === 'index.html') pages.push(full);
  }
};
walk(DIST);

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ');

let findings = 0;
for (const file of pages) {
  const route = file.split(sep).slice(1, -1).join('/') || '(home)';
  const isLegal = LEGAL_PAGES.has(route);
  const text = visibleText(readFileSync(file, 'utf8'));

  for (const rule of RULES) {
    if (isLegal && rule.skipLegal) continue;
    const match = rule.re.exec(text);
    if (!match) continue;
    if (findings === 0) console.error('\nPositioning audit findings:');
    const from = Math.max(0, match.index - 60);
    console.error(`\n  /${route}  [${rule.regime}]`);
    console.error(`    ...${text.slice(from, from + 180).trim()}...`);
    console.error(`    -> ${rule.hint}`);
    findings += 1;
  }
}

if (findings > 0) {
  console.error(`\nPositioning audit failed: ${findings} finding(s) across ${pages.length} pages.`);
  console.error('Gridless Global consults, advises and project-manages. Reword, do not suppress.\n');
  process.exit(1);
}

console.log(`Positioning audit clean across ${pages.length} pages.`);
