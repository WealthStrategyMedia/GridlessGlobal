/**
 * Derives the site's brand assets from the master logo artwork in Context/.
 *
 * The supplied logo is additive glow painted over a dark grey vignette, so it
 * cannot simply be dropped onto the navy UI. This script estimates that
 * backdrop, subtracts it, and re-emits the artwork as a transparent cutout that
 * composites cleanly over any dark surface.
 *
 * Run with: npm run assets
 */
import sharp from 'sharp';

const SRC = 'Context/Logo/GridlessGlobalLogo.png';
const img = sharp(SRC);
const { width: W, height: H } = await img.metadata();
const { data } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

// --- 1. Estimate the smooth grey backdrop ---------------------------------
// Sample a coarse grid and take a low percentile of each cell's darkest channel:
// that tracks the vignette without picking up the logo itself.
const GX = 32, GY = 22;
let grid = [];
for (let gy = 0; gy < GY; gy++) {
  grid[gy] = [];
  for (let gx = 0; gx < GX; gx++) {
    const x0 = Math.floor(gx * W / GX), x1 = Math.floor((gx + 1) * W / GX);
    const y0 = Math.floor(gy * H / GY), y1 = Math.floor((gy + 1) * H / GY);
    const lum = [];
    for (let y = y0; y < y1; y += 2) for (let x = x0; x < x1; x += 2) {
      const i = (y * W + x) * 4;
      lum.push(Math.min(data[i], data[i + 1], data[i + 2]));
    }
    lum.sort((a, b) => a - b);
    grid[gy][gx] = lum[Math.floor(lum.length * 0.15)];
  }
}
// Blur toward the local minimum so cells that clipped the logo get pulled back.
for (let pass = 0; pass < 4; pass++) {
  const next = grid.map((r) => r.slice());
  for (let gy = 0; gy < GY; gy++) for (let gx = 0; gx < GX; gx++) {
    let s = 0, n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const yy = gy + dy, xx = gx + dx;
      if (yy < 0 || yy >= GY || xx < 0 || xx >= GX) continue;
      s += grid[yy][xx]; n++;
    }
    next[gy][gx] = Math.min(grid[gy][gx], s / n);
  }
  grid = next;
}
const bgAt = (x, y) => {
  const fx = Math.min(GX - 1.001, Math.max(0, x / W * GX - 0.5));
  const fy = Math.min(GY - 1.001, Math.max(0, y / H * GY - 0.5));
  const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
  const a = grid[y0][x0], b = grid[y0][x0 + 1], c = grid[y0 + 1][x0], d = grid[y0 + 1][x0 + 1];
  return (a * (1 - tx) + b * tx) * (1 - ty) + (c * (1 - tx) + d * tx) * ty;
};

// --- 2. Subtract it, emit an un-premultiplied cutout ----------------------
const KNEE = 46; // below this the remainder is backdrop haze, not artwork
const out = Buffer.alloc(W * H * 4);
let minX = W, minY = H, maxX = -1, maxY = -1;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  const i = (y * W + x) * 4;
  const bg = bgAt(x, y) * 1.05 + 3;
  const r = Math.max(0, data[i] - bg);
  const g = Math.max(0, data[i + 1] - bg);
  const b = Math.max(0, data[i + 2] - bg);
  const raw = Math.max(r, g, b);
  // Rescale everything above the knee so the real glow keeps its strength.
  const a = raw <= KNEE ? 0 : Math.min(255, (raw - KNEE) * (255 / (255 - KNEE)) * 1.3);
  out[i + 3] = Math.round(a);
  if (a > 0) {
    const k = 255 / a;
    out[i] = Math.min(255, Math.round(r * k));
    out[i + 1] = Math.min(255, Math.round(g * k));
    out[i + 2] = Math.min(255, Math.round(b * k));
  }
  if (a > 8) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
  }
}

const pad = 12;
const left = Math.max(0, minX - pad), top = Math.max(0, minY - pad);
const w = Math.min(W - left, maxX - minX + 1 + pad * 2);
const h = Math.min(H - top, maxY - minY + 1 + pad * 2);
const base = sharp(out, { raw: { width: W, height: H, channels: 4 } })
  .extract({ left, top, width: w, height: h });

await base.clone().png({ compressionLevel: 9 }).toFile('public/images/logo-lockup.png');
await base.clone().resize({ width: 960 }).webp({ quality: 92 }).toFile('public/images/logo-lockup.webp');

// --- 3. Globe mark, sized for real use ------------------------------------
// The header shows this at ~44px and the footer at ~64px, so a 280px master is
// ample at 4x. The full-resolution crop is not worth 380 kB on every page.
const meta = await sharp('public/images/logo-lockup.png').metadata();
// sharp fixes its own operation order, so crop and trim in separate passes.
const globe = await sharp('public/images/logo-lockup.png')
  .extract({ left: 0, top: 0, width: Math.round(meta.width * 0.38), height: meta.height })
  .png()
  .toBuffer();
const cropped = await sharp(globe).trim({ threshold: 10 }).png().toBuffer();
const croppedMeta = await sharp(cropped).metadata();

// The globe's outer glow runs into the wordmark, so the crop cuts through it
// and leaves a faint rectangular edge wherever the mark sits on a lighter
// surface. Feather the alpha with a radial falloff to dissolve that edge while
// keeping essentially all of the glow.
const feather = Buffer.from(
  `<svg width="${croppedMeta.width}" height="${croppedMeta.height}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <radialGradient id="f" cx="0.5" cy="0.5" r="0.5">
         <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
         <stop offset="82%" stop-color="#fff" stop-opacity="1"/>
         <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
       </radialGradient>
     </defs>
     <rect width="${croppedMeta.width}" height="${croppedMeta.height}" fill="url(#f)"/>
   </svg>`
);
const trimmed = await sharp(cropped)
  .composite([{ input: feather, blend: 'dest-in' }])
  .png()
  .toBuffer();
const markMeta = await sharp(trimmed).metadata();

await sharp(trimmed).resize({ width: 280 }).png({ compressionLevel: 9, quality: 90 }).toFile('public/images/logo-mark.png');
await sharp(trimmed)
  .resize({ width: 512, height: 512, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9, quality: 88, palette: true })
  .toFile('public/images/logo-mark-512.png');
await sharp(trimmed)
  .resize({ width: 180, height: 180, fit: 'contain', background: { r: 1, g: 11, b: 22, alpha: 1 } })
  .flatten({ background: '#010b16' })
  .png({ compressionLevel: 9, palette: true })
  .toFile('public/images/apple-touch-icon.png');

console.log(`lockup ${meta.width}x${meta.height}  |  mark master ${markMeta.width}x${markMeta.height}`);

// --- 4. Services map: web-friendly derivatives ----------------------------
// The source PNG is ~3.7 MB, far too heavy for a hero image on a free-tier
// host. WebP at full width plus a narrower variant for phones keeps the
// artwork crisp while cutting transfer by well over 90%.
const MAP_SRC = 'Context/Images/Services_Map_Img.png';
await sharp(MAP_SRC).webp({ quality: 86, effort: 6 }).toFile('public/images/services-map.webp');
await sharp(MAP_SRC).resize({ width: 1100 }).webp({ quality: 82, effort: 6 }).toFile('public/images/services-map-1100.webp');
// A compressed PNG stays as the universal fallback, rather than the raw file.
await sharp(MAP_SRC).png({ compressionLevel: 9, quality: 88, palette: true }).toFile('public/images/services-map.png');

// --- 5. Social sharing card ----------------------------------------------
// A blurred, dimmed crop of the artwork behind the brand lockup: recognisably
// ours, but with enough contrast that the text is readable in a feed. JPEG,
// because an OG card has no business being a megabyte.
//
// Note on type: this renders through librsvg using whatever fonts the machine
// running the script has, so it names concrete families rather than the
// "sans-serif" alias, which resolves inconsistently. The output is committed,
// so it does not need to re-render on the deploy host.
const OG_W = 1200, OG_H = 630;
const FONT = 'Segoe UI, Arial, Helvetica, DejaVu Sans, sans-serif';

const backdrop = await sharp(MAP_SRC)
  .extract({ left: 420, top: 40, width: 1252, height: 657 })
  .resize(OG_W, OG_H, { fit: 'cover' })
  .blur(14)
  .modulate({ brightness: 0.52, saturation: 1.15 })
  .toBuffer();

const overlay = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="scrim" x1="0" y1="0" x2="0.9" y2="0.6">
         <stop offset="0%" stop-color="#010b16" stop-opacity="0.95"/>
         <stop offset="55%" stop-color="#04162a" stop-opacity="0.82"/>
         <stop offset="100%" stop-color="#010b16" stop-opacity="0.72"/>
       </linearGradient>
     </defs>
     <rect width="${OG_W}" height="${OG_H}" fill="url(#scrim)"/>
     <rect x="0" y="0" width="${OG_W}" height="6" fill="#1b8ef5"/>
     <rect x="0" y="0" width="420" height="6" fill="#3fd06a"/>

     <text x="80" y="330" font-family="${FONT}" font-size="86" font-weight="700" fill="#ffffff" letter-spacing="7">GRIDLESS</text>
     <text x="84" y="388" font-family="${FONT}" font-size="32" font-weight="700" fill="#3fd06a" letter-spacing="21">GLOBAL</text>
     <rect x="82" y="428" width="104" height="4" rx="2" fill="#f8b828"/>
     <text x="82" y="482" font-family="${FONT}" font-size="28" font-weight="500" fill="#c8d8ea">Powering a Connected Future</text>
     <text x="82" y="530" font-family="${FONT}" font-size="22" fill="#8fa6c0">Solar &#183; Storage &#183; Microgrids &#183; Electrical &#183; Roofing &#183; Construction</text>
   </svg>`
);

const ogMark = await sharp(trimmed).resize({ width: 300 }).toBuffer();
await sharp(backdrop)
  .composite([
    { input: overlay, left: 0, top: 0 },
    { input: ogMark, left: 830, top: 170 },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile('public/images/og-default.jpg');

console.log('services map derivatives + social card written');
