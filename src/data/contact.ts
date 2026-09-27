/**
 * Contact form configuration.
 *
 * The contact form posts to a Tweeble contact form. We render our own UI so it
 * matches the site, and post directly from the browser - Tweeble's API sends
 * `Access-Control-Allow-Origin: *`, so no server hop is needed.
 *
 * The contract, taken from Tweeble's own embed script:
 *
 *   POST <submitUrl>  Content-Type: application/json
 *   {
 *     "<fieldId>": "value",      // one entry per form field
 *     "website_url": "",         // honeypot: must be empty
 *     "sourceUrl": "https://..." // page the message was sent from
 *   }
 *
 *   2xx -> { "message": "..." }  shown to the sender (falls back to successMessage)
 *   4xx -> { "error": "..." }    shown to the sender verbatim
 *
 * Field ids are specific to the form and change if it is rebuilt in Tweeble, so
 * they are never hard-coded here - they come from the committed snapshot in
 * contact-form.json. Refresh it with `npm run sync:forms`.
 */
import snapshot from './contact-form.json';

export interface ContactFormField {
  id: string;
  preset: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

export interface ContactFormDefinition {
  id: string;
  name: string;
  description: string | null;
  submitLabel: string;
  successMessage: string;
  fields: ContactFormField[];
  submitUrl: string;
  embedScriptUrl: string;
}

export const contactForm = snapshot as unknown as ContactFormDefinition;

/**
 * The fields, in the order Tweeble defines them, with a layout hint so our
 * grid can pair the short ones and give the long ones a full row.
 */
export const contactFields = contactForm.fields.map((field) => ({
  ...field,
  fullWidth: field.type === 'textarea' || field.type === 'select',
}));

/** Looks a field up by label so a reorder in Tweeble cannot break the mapping. */
export function contactFieldByLabel(label: string): ContactFormField {
  const match = contactForm.fields.find(
    (field) => field.label.trim().toLowerCase() === label.trim().toLowerCase()
  );
  if (!match) {
    throw new Error(
      `Contact form field "${label}" was not found in src/data/contact-form.json. ` +
        `The form was probably edited in Tweeble - run \`npm run sync:forms\`. ` +
        `Current fields: ${contactForm.fields.map((f) => f.label).join(', ')}`
    );
  }
  return match;
}

/** The "What can we help with?" field, so a service page can preselect itself. */
export const SERVICE_FIELD_LABEL = 'What can we help with?';

/**
 * Maps one of our service slugs to the matching option in Tweeble's
 * "What can we help with?" list, so a service page can preselect itself.
 *
 * Most titles match once punctuation and "&" are normalised. The handful that
 * are worded differently upstream are listed explicitly rather than guessed.
 */
const SERVICE_OPTION_ALIASES: Record<string, string> = {
  'solar-removal-reinstall': 'Solar removal and re-installation',
  electrical: 'Electric service and wiring',
  construction: 'Construction and buildouts',
};

const normalise = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

export function serviceOption(slug: string, title: string): string | undefined {
  const field = contactForm.fields.find((f) => f.label === SERVICE_FIELD_LABEL);
  const options = field?.options ?? [];

  const alias = SERVICE_OPTION_ALIASES[slug];
  if (alias && options.includes(alias)) return alias;

  const target = normalise(title);
  return options.find((option) => normalise(option) === target);
}
