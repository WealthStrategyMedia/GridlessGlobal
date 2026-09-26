/**
 * Payment configuration.
 *
 * Payments run through a Tweeble payment form. We render our own UI rather than
 * Tweeble's embed script, so the branding and layout match the rest of the
 * site, and post directly to their submit endpoint from the browser - their API
 * sends `Access-Control-Allow-Origin: *`, so no server hop is needed.
 *
 * The contract, taken from Tweeble's own embed script:
 *
 *   POST <submitUrl>  Content-Type: application/json
 *   {
 *     "amount": 124.95,          // dollars, omitted when pricingMode is "fixed"
 *     "<fieldId>": "value",      // one entry per form field
 *     "website_url": "",         // honeypot: must be empty
 *     "sourceUrl": "https://..." // page the payment started from
 *   }
 *
 *   200 -> { "checkoutUrl": "..." }   redirect the browser here
 *   4xx -> { "error": "..." }         message is safe to show the payer
 *
 * Field ids are specific to the form and change if it is rebuilt in Tweeble, so
 * they are never hard-coded here - they come from the committed snapshot in
 * payment-form.json. Refresh it with `npm run sync:payment-form`.
 */
import snapshot from './payment-form.json';

export interface PaymentFormField {
  id: string;
  preset: string;
  type: string;
  label: string;
  required: boolean;
}

export interface PaymentFormDefinition {
  id: string;
  name: string;
  description: string | null;
  fields: PaymentFormField[];
  pricingMode: 'custom' | 'fixed' | string;
  fixedAmountCents: number | null;
  minimumAmountCents: number | null;
  submitLabel: string;
  successMessage: string;
  submitUrl: string;
  embedScriptUrl: string;
}

export const paymentForm = snapshot as unknown as PaymentFormDefinition;

/**
 * Resolves a Tweeble field id from its label.
 *
 * Matching on the label rather than a memorised id means an edit in Tweeble
 * that only reorders or re-creates fields still resolves after a sync. If the
 * label itself is changed, this throws at build time rather than silently
 * posting an incomplete submission that the payer would see rejected.
 */
function fieldIdByLabel(label: string): string {
  const match = paymentForm.fields.find(
    (field) => field.label.trim().toLowerCase() === label.trim().toLowerCase()
  );
  if (!match) {
    throw new Error(
      `Payment form field "${label}" was not found in src/data/payment-form.json. ` +
        `The form was probably edited in Tweeble - run \`npm run sync:payment-form\`, ` +
        `then update the labels in src/data/payments.ts to match. ` +
        `Current fields: ${paymentForm.fields.map((f) => f.label).join(', ')}`
    );
  }
  return match.id;
}

/** Our stable names for each field, mapped to the ids Tweeble expects. */
export const PAYMENT_FIELDS = {
  reason: fieldIdByLabel('What is this payment for?'),
  invoiceNumber: fieldIdByLabel('Invoice or job number'),
  name: fieldIdByLabel('Name on the account'),
  email: fieldIdByLabel('Email for receipt'),
  note: fieldIdByLabel('Note'),
} as const;

/** True when the payer chooses the amount (rather than a fixed price). */
export const amountIsPayerChosen = paymentForm.pricingMode !== 'fixed';

export const minimumAmount = (paymentForm.minimumAmountCents ?? 100) / 100;

export const fixedAmount =
  paymentForm.fixedAmountCents != null ? paymentForm.fixedAmountCents / 100 : null;

/** Which of our fields the upstream form insists on. */
export const requiredFieldIds = new Set(
  paymentForm.fields.filter((field) => field.required).map((field) => field.id)
);

export const isRequired = (fieldId: string) => requiredFieldIds.has(fieldId);

/**
 * Reasons offered in our dropdown. The value is sent to Tweeble verbatim as
 * free text, so these read as sentences rather than slugs.
 */
export const PAYMENT_REASONS = [
  'Invoice payment',
  'Project deposit',
  'Progress payment',
  'Service call',
  'Energy analysis fee',
  'Other',
] as const;
