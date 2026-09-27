/**
 * Derives the site's brand assets from the master artwork in Context/.
 *
 * The supplied logo is already a transparent PNG, so nothing is redrawn or
 * retouched. Two things are produced from it:
 *
 *   logo-lockup*        the artwork exactly as supplied, for light backgrounds
 *   logo-lockup-light*  the same artwork with the WORDMARK ONLY lifted to light
 *                       tints, for dark backgrounds
 *
 * The wordmark is deep navy, which sits at roughly 1.4:1 against the dark UI and
 * is effectively illegible. Lifting it lets the logo sit directly on any
 * background with no plate or box behind it. Hue and saturation are preserved,
 * so the mark keeps its colours - the blues stay blue and the greens stay green,
 * they simply become light enough to read. The globe is left completely
 * untouched: it is already bright and reads well on dark.
 *
 * Run with: npm run assets
 */
import sharp from 'sharp';
import fs from 'node:fs';
import { buildIco } from './lib/ico.mjs';

const LOGO = 'Context/Logo/GridlessGlobalLogo.png';
const MAP = 'Context/Images/Services_Map_Img.png';

// --- 1. The lockup exactly as supplied ------------------------------------
const trimmed = await sharp(LOGO).trim({ threshold: 1 }).png().toBuffer();
const lockup = await sharp(trimmed).metadata();

await sharp(trimmed).resize({ width: 900 }).png({ compressionLevel: 9, quality: 90 }).toFile('public/images/logo-lockup.png');
await sharp(trimmed).resize({ width: 900 }).webp({ quality: 92 }).toFile('public/images/logo-lockup.webp');

// --- 2. Light-wordmark variant for dark backgrounds -----------------------
const rgbToHsl = (r, g, b) => {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h, s, l];
};
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};
const hslToRgb = (h, s, l) => {
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ];
};

const { data: px, info } = await sharp(trimmed).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// The globe occupies the left of the lockup; everything right of it is type.
const GLOBE_EDGE = Math.round(H * 1.06);
const TARGET_L = 0.82;  // how light the darkest type becomes
const RAMP_TO = 0.62;   // tones above this are already legible and are left be

const light = Buffer.from(px);
for (let y = 0; y < H; y++) {
  for (let x = GLOBE_EDGE; x < W; x++) {
    const i = (y * W + x) * 4;
    if (light[i + 3] === 0) continue;
    const [h, s, l] = rgbToHsl(light[i], light[i + 1], light[i + 2]);
    if (l >= RAMP_TO) continue;
    // Ramp: the darker the pixel, the more it is lifted, so edges stay smooth.
    const lifted = TARGET_L - (l / RAMP_TO) * (TARGET_L - RAMP_TO);
    const [r2, g2, b2] = hslToRgb(h, Math.min(s, 0.55), lifted);
    light[i] = r2; light[i + 1] = g2; light[i + 2] = b2;
  }
}

const lightBuf = await sharp(light, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
for (const [w, name] of [[900, ''], [560, '-560'], [320, '-320']]) {
  await sharp(lightBuf).resize({ width: w }).webp({ quality: 92 }).toFile(`public/images/logo-lockup-light${name}.webp`);
}
await sharp(lightBuf).resize({ width: 560 }).png({ compressionLevel: 9, quality: 90 }).toFile('public/images/logo-lockup-light-560.png');

// --- 3. The globe on its own, and the favicons ----------------------------
const globe = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: Math.min(GLOBE_EDGE, W), height: H })
  .png()
  .toBuffer();
const mark = await sharp(globe).trim({ threshold: 1 }).png().toBuffer();
const markMeta = await sharp(mark).metadata();

await sharp(mark).resize({ width: 280 }).png({ compressionLevel: 9, quality: 88, palette: true }).toFile('public/images/logo-mark.png');
await sharp(mark)
  .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile('public/images/logo-mark-512.png');

// Square, padded slightly so the globe is not clipped at small sizes.
const squareIcon = async (size, background) => {
  const inner = Math.round(size * 0.88);
  let pipeline = sharp(mark).resize({
    width: inner, height: inner, fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  const pad = Math.round((size - inner) / 2);
  pipeline = pipeline.extend({ top: pad, bottom: pad, left: pad, right: pad, background });
  return pipeline.png({ compressionLevel: 9 }).toBuffer();
};

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };
const navy = { r: 1, g: 11, b: 22, alpha: 1 };

// Browser tab icons keep transparency; iOS flattens onto the brand navy.
for (const size of [16, 32, 48, 180, 192, 512]) {
  const buf = await squareIcon(size, transparent);
  if (size === 180) {
    await sharp(buf).flatten({ background: '#010b16' }).png({ compressionLevel: 9 }).toFile('public/images/apple-touch-icon.png');
  } else {
    await sharp(buf).toFile(`public/images/favicon-${size}.png`);
  }
}

fs.writeFileSync(
  'public/favicon.ico',
  buildIco(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await squareIcon(size, transparent) }))))
);

// Android home-screen icons need a solid background.
await sharp(await squareIcon(512, navy)).flatten({ background: '#010b16' }).png({ compressionLevel: 9 }).toFile('public/images/maskable-512.png');

// --- 4. Services map: web-friendly derivatives ----------------------------
await sharp(MAP).webp({ quality: 86, effort: 6 }).toFile('public/images/services-map.webp');
await sharp(MAP).resize({ width: 1100 }).webp({ quality: 82, effort: 6 }).toFile('public/images/services-map-1100.webp');
await sharp(MAP).png({ compressionLevel: 9, quality: 88, palette: true }).toFile('public/images/services-map.png');

// --- 5. Social sharing card ----------------------------------------------
const OG_W = 1200, OG_H = 630;
const backdrop = await sharp(MAP)
  .extract({ left: 420, top: 40, width: 1252, height: 657 })
  .resize(OG_W, OG_H, { fit: 'cover' })
  .blur(16)
  .modulate({ brightness: 0.42, saturation: 1.1 })
  .toBuffer();

const scrim = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
     <rect width="${OG_W}" height="${OG_H}" fill="#04162a" fill-opacity="0.76"/>
     <rect x="0" y="0" width="${OG_W}" height="6" fill="#1b8ef5"/>
     <rect x="0" y="0" width="420" height="6" fill="#3fd06a"/>
   </svg>`
);

const ogLogo = await sharp(lightBuf).resize({ width: 760 }).toBuffer();
const ogMeta = await sharp(ogLogo).metadata();

await sharp(backdrop)
  .composite([
    { input: scrim, left: 0, top: 0 },
    { input: ogLogo, left: Math.round((OG_W - ogMeta.width) / 2), top: Math.round((OG_H - ogMeta.height) / 2) },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/images/og-default.jpg');

console.log(`lockup ${lockup.width}x${lockup.height}  |  globe ${markMeta.width}x${markMeta.height}  |  globe edge at x=${GLOBE_EDGE}`);
console.log('light wordmark variant, favicon set (.ico + png), map derivatives and social card written');
