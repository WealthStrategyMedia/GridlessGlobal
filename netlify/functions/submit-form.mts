/**
 * Optional server-side relay for form submissions.
 *
 * The site posts forms straight to PUBLIC_FORMS_ENDPOINT from the browser. Use
 * this function instead when the upstream intake service needs a secret that
 * must not be exposed to the browser:
 *
 *   1. Set PUBLIC_FORMS_ENDPOINT = /api/forms
 *   2. Set FORMS_UPSTREAM_URL    = https://your-intake-service/...
 *   3. Set FORMS_UPSTREAM_TOKEN  = <bearer token>   (optional)
 *
 * With no upstream configured it responds 503 and the form shows its
 * "not connected yet" message.
 */
import type { Config, Context } from '@netlify/functions';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

/** Very small in-memory throttle. Resets whenever the instance recycles, which
 *  is fine as a first line of defence alongside the client-side honeypot. */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > MAX_PER_WINDOW;
}

export default async function handler(request: Request, context: Context) {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed.' }, 405);
  }

  const ip = context.ip ?? request.headers.get('x-nf-client-connection-ip') ?? 'unknown';
  if (rateLimited(ip)) {
    return json({ message: 'Too many submissions. Please wait a minute and try again.' }, 429);
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ message: 'Request body must be valid JSON.' }, 400);
  }

  const fields = (payload.fields ?? {}) as Record<string, unknown>;

  // Reject anything that tripped the honeypot before it reaches the CRM.
  if (typeof fields.company_website === 'string' && fields.company_website.trim()) {
    return json({ ok: true });
  }
  if (!payload.formType) {
    return json({ message: 'Missing form type.' }, 400);
  }

  const upstream = process.env.FORMS_UPSTREAM_URL;
  if (!upstream) {
    return json(
      {
        message:
          'Form intake is not connected yet. Please call or email us and we will take your details directly.',
        configured: false,
      },
      503
    );
  }

  try {
    const response = await fetch(upstream, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.FORMS_UPSTREAM_TOKEN
          ? { Authorization: `Bearer ${process.env.FORMS_UPSTREAM_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...payload,
        meta: {
          ip,
          userAgent: request.headers.get('user-agent') ?? null,
          receivedAt: new Date().toISOString(),
        },
      }),
    });

    if (!response.ok) {
      console.error('[forms] Upstream returned', response.status, await response.text().catch(() => ''));
      return json({ message: 'The intake service rejected this submission.' }, 502);
    }
    return json({ ok: true });
  } catch (error) {
    console.error('[forms] Could not reach the intake service:', error);
    return json({ message: 'We could not reach the intake service. Please try again shortly.' }, 502);
  }
}

export const config: Config = {
  path: '/api/forms',
};
