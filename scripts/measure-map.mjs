/**
 * Re-measures the gold "Click here for services" buttons on the services map
 * artwork and prints them as percentage rectangles ready to paste into
 * `mapButtons` in src/data/services.ts.
 *
 * Run this whenever Context/Images/Services_Map_Img.png is re-exported, so the
 * clickable overlay stays locked to the artwork.
 *
 *   node scripts/measure-map.mjs
 *
 * The "Key Highlights" rows in the left banner are evenly spaced text, not a
 * solid colour, so those are derived arithmetically at the bottom instead.
 */
import sharp from 'sharp';

const SRC = 'Context/Images/Services_Map_Img.png';
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// --- Mask every pixel that belongs to a gold button ------------------------
const mask = new Uint8Array(W * H);
for (let i = 0, p = 0; i < data.length; i += 4, p++) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  if (r > 190 && g > 140 && g < 215 && b < 110 && r - b > 110 && g - b > 50) mask[p] = 1;
}

// --- Flood fill into connected components ---------------------------------
const seen = new Uint8Array(W * H);
const stack = new Int32Array(W * H);
const boxes = [];
for (let start = 0; start < mask.length; start++) {
  if (!mask[start] || seen[start]) continue;
  let sp = 0;
  stack[sp++] = start;
  seen[start] = 1;
  let x0 = W, y0 = H, x1 = -1, y1 = -1, n = 0;
  while (sp) {
    const c = stack[--sp];
    const cx = c % W, cy = (c - cx) / W;
    n++;
    if (cx < x0) x0 = cx;
    if (cx > x1) x1 = cx;
    if (cy < y0) y0 = cy;
    if (cy > y1) y1 = cy;
    for (const k of [c - 1, c + 1, c - W, c + W]) {
      if (k < 0 || k >= mask.length || !mask[k] || seen[k]) continue;
      if (Math.abs((k % W) - cx) > 1) continue; // do not wrap across rows
      seen[k] = 1;
      stack[sp++] = k;
    }
  }
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
  if (n > 500 && bw > 80 && bh > 12 && bw / bh > 3) boxes.push({ x0, y0, bw, bh });
}

boxes.sort((a, b) => a.y0 - b.y0 || a.x0 - b.x0);
const pct = (v) => Number(v.toFixed(3));

console.log(`artwork ${W}x${H} - found ${boxes.length} buttons\n`);
console.log('// paste into mapButtons, then set each slug/label by position');
for (const b of boxes) {
  const rect = {
    x: pct((b.x0 / W) * 100),
    y: pct((b.y0 / H) * 100),
    w: pct((b.bw / W) * 100),
    h: pct((b.bh / H) * 100),
  };
  console.log(`{ slug: '?', label: '?', rect: ${JSON.stringify(rect).replace(/"/g, '')} },`);
}

// --- Key Highlights rows ---------------------------------------------------
// Seven evenly spaced rows down the left banner, measured once from the text
// baselines; recompute here if the banner layout changes.
const FIRST_CENTER = 521, ROW_PITCH = 57.8, ROW_H = 50, ROW_X = 30, ROW_W = 320;
console.log('\n// paste into mapHighlights');
const labels = ['Solar Power', 'Hydro Power', 'Thermal Energy', 'Energy Storage', 'Smart Microgrid', 'Residential', 'Commercial'];
labels.forEach((label, i) => {
  const rect = {
    x: pct((ROW_X / W) * 100),
    y: pct(((FIRST_CENTER + ROW_PITCH * i - ROW_H / 2) / H) * 100),
    w: pct((ROW_W / W) * 100),
    h: pct((ROW_H / H) * 100),
  };
  console.log(`{ slug: '?', label: '${label}', rect: ${JSON.stringify(rect).replace(/"/g, '')} },`);
});
