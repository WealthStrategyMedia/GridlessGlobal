/**
 * Creates a hosted checkout session and returns its URL.
 *
 * Reached from the browser at POST /api/checkout (see the redirect in
 * netlify.toml). The front end sends an amount in cents plus the details that
 * belong on the receipt, and expects `{ checkoutUrl }` back.
 *
 * ---------------------------------------------------------------------------
 * NOT LIVE YET. Until credentials are present in the Netlify environment this
 * responds 503 with a readable message, which the payment form displays. To
 * switch it on, set these in Netlify -> Site settings -> Environment variables:
 *
 *   PAYMENTS_PROVIDER = stripe
 *   STRIPE_SECRET_KEY = sk_live_... (or sk_test_... while testing)
 *
 * No code change is needed for Stripe. The `tweeble` branch below is a
 * placeholder for the planned Tweeble integration - fill in the request shape
 * once their API is documented.
 * ---------------------------------------------------------------------------
 */
import type { Config, Context } from '@netlify/functions';

interface CheckoutRequest {
  amountCents: number;
  currency?: string;
  reason?: string;
  invoiceNumber?: string;
  name?: string;
  email?: string;
  notes?: string;
  returnUrl?: string;
  cancelUrl?: string;
}

const REASON_LABELS: Record<string, string> = {
  invoice: 'Invoice payment',
  deposit: 'Project deposit',
  progress: 'Progress payment',
  'service-call': 'Service call',
  assessment: 'Energy analysis fee',
  other: 'Payment',
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export default async function handler(request: Request, _context: Context) {
  if (request.method !== 'POST') {
    return json({ message: 'Method not allowed.' }, 405);
  }

  let body: CheckoutRequest;
  try {
    body = (await request.json()) as CheckoutRequest;
  } catch {
    return json({ message: 'Request body must be valid JSON.' }, 400);
  }

  // --- Validate before we touch any provider ------------------------------
  const amountCents = Math.round(Number(body.amountCents));
  if (!Number.isFinite(amountCents) || amountCents < 100) {
    return json({ message: 'Amount must be at least $1.00.' }, 400);
  }
  if (amountCents > 100_000_00) {
    return json({ message: 'For payments over $100,000 please contact our accounts team directly.' }, 400);
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(body.email)) {
    return json({ message: 'A valid email address is required for the receipt.' }, 400);
  }

  const provider = (process.env.PAYMENTS_PROVIDER ?? 'stripe').toLowerCase();
  const currency = (body.currency ?? 'usd').toLowerCase();
  const label = REASON_LABELS[body.reason ?? 'other'] ?? 'Payment';
  const description = body.invoiceNumber ? `${label} - ${body.invoiceNumber}` : label;

  const origin = new URL(request.url).origin;
  const successUrl = `${body.returnUrl ?? `${origin}/pay/complete`}?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = body.cancelUrl ?? `${origin}/pay`;

  // --- Stripe -------------------------------------------------------------
  if (provider === 'stripe') {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return json(
        {
          message:
            'Card payments are not connected yet. Please call us and we will take payment directly, or request an invoice with remittance details.',
          provider: 'stripe',
          configured: false,
        },
        503
      );
    }

    // Stripe's Checkout Sessions endpoint takes form-encoded input.
    const params = new URLSearchParams({
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: body.email,
      'line_items[0][quantity]': '1',
      'line_items[0][price_data][currency]': currency,
      'line_items[0][price_data][unit_amount]': String(amountCents),
      'line_items[0][price_data][product_data][name]': description,
    });
    if (body.name) params.set('metadata[name]', body.name);
    if (body.invoiceNumber) params.set('metadata[invoiceNumber]', body.invoiceNumber);
    if (body.reason) params.set('metadata[reason]', body.reason);
    if (body.notes) params.set('metadata[notes]', body.notes.slice(0, 500));

    try {
      const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
      const data = (await response.json()) as { url?: string; error?: { message?: string } };

      if (!response.ok || !data.url) {
        console.error('[checkout] Stripe rejected the session request:', data.error);
        return json({ message: data.error?.message ?? 'The payment provider rejected this request.' }, 502);
      }
      return json({ checkoutUrl: data.url });
    } catch (error) {
      console.error('[checkout] Could not reach Stripe:', error);
      return json({ message: 'We could not reach the payment provider. Please try again shortly.' }, 502);
    }
  }

  // --- Tweeble (planned) --------------------------------------------------
  if (provider === 'tweeble') {
    const base = process.env.TWEEBLE_API_BASE;
    const key = process.env.TWEEBLE_API_KEY;
    if (!base || !key) {
      return json(
        {
          message:
            'Tweeble payments are configured as the provider but no API credentials are set yet.',
          provider: 'tweeble',
          configured: false,
        },
        503
      );
    }
    // TODO: replace with Tweeble's documented checkout request once available.
    return json(
      { message: 'The Tweeble payment integration is not implemented yet.', provider: 'tweeble' },
      503
    );
  }

  return json({ message: `Unknown payment provider "${provider}".` }, 500);
}

export const config: Config = {
  path: '/api/checkout',
};
