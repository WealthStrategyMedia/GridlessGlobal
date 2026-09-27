/**
 * Newsletter subscription form (footer).
 *
 * Same Tweeble contract as the contact form: post the field ids plus an empty
 * `website_url` honeypot and `sourceUrl` to `submitUrl`.
 *
 * The upstream form is a generic contact form, so its submit label reads
 * "Send Message". This is a subscribe box, so the label is overridden here -
 * everything else (the field id, its required flag, the endpoint) still comes
 * from the snapshot, refreshed with `npm run sync:forms`.
 */
import snapshot from './newsletter-form.json';
import type { ContactFormDefinition } from './contact';

export const newsletterForm = snapshot as unknown as ContactFormDefinition;

/** Overrides the generic upstream label. */
export const NEWSLETTER_SUBMIT_LABEL = 'Subscribe';

export const NEWSLETTER_SUCCESS_MESSAGE = 'You are subscribed. Welcome aboard.';

const emailField = newsletterForm.fields.find((field) => field.type === 'email' || field.preset === 'email');

if (!emailField) {
  throw new Error(
    'The newsletter form has no email field. Run `npm run sync:forms`; current fields: ' +
      newsletterForm.fields.map((f) => `${f.label} (${f.type})`).join(', ')
  );
}

export const newsletterEmailField = emailField;
