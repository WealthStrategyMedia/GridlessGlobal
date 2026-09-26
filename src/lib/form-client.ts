/**
 * Shared client runtime for every form on the site.
 *
 * Forms are fully built and validated today. Submission targets whatever URL
 * `PUBLIC_FORMS_ENDPOINT` points at. Until that variable is set, a form
 * validates normally and then reports - clearly and without losing the user's
 * input - that intake is not connected yet, offering phone and email instead.
 *
 * Wiring it up later is a one-line change in the Netlify environment. No markup
 * has to change.
 *
 * Markup contract
 *   <form data-gg-form="contact">           the form kind, sent as `formType`
 *     <div data-field>                       wrapper, gets the error state
 *       <input name="email" required>
 *       <p data-error></p>                   inline message target
 *     </div>
 *     <div data-form-status></div>           result banner target
 *     <button type="submit">                 gets the pending state
 *   </form>
 */

const ENDPOINT = (import.meta.env.PUBLIC_FORMS_ENDPOINT ?? '').trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,}$/;

type Status = 'success' | 'error' | 'info';

function fieldWrap(el: Element): HTMLElement | null {
  return el.closest<HTMLElement>('[data-field]');
}

function setFieldError(input: HTMLElement, message: string | null) {
  const wrap = fieldWrap(input);
  const target = wrap?.querySelector<HTMLElement>('[data-error]');
  if (target) {
    target.textContent = message ?? '';
    target.classList.toggle('hidden', !message);
  }
  wrap?.classList.toggle('is-invalid', Boolean(message));
  if (message) {
    input.setAttribute('aria-invalid', 'true');
    if (target?.id) input.setAttribute('aria-describedby', target.id);
  } else {
    input.removeAttribute('aria-invalid');
  }
}

function validateField(input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): string | null {
  const value = (input.value ?? '').trim();
  const label = input.dataset.label || input.getAttribute('aria-label') || 'This field';

  if (input.hasAttribute('required') && !value) {
    if (input instanceof HTMLInputElement && input.type === 'checkbox' && !input.checked) {
      return `${label} is required.`;
    }
    if (!(input instanceof HTMLInputElement) || input.type !== 'checkbox') {
      return `${label} is required.`;
    }
  }
  if (input instanceof HTMLInputElement && input.type === 'checkbox') {
    return input.hasAttribute('required') && !input.checked ? `${label} is required.` : null;
  }
  if (!value) return null;

  if (input.getAttribute('type') === 'email' && !EMAIL_RE.test(value)) {
    return 'Enter a valid email address.';
  }
  if (input.getAttribute('type') === 'tel' && !PHONE_RE.test(value)) {
    return 'Enter a valid phone number.';
  }
  const min = Number(input.dataset.minLength ?? 0);
  if (min && value.length < min) {
    return `${label} needs at least ${min} characters.`;
  }
  return null;
}

function showStatus(form: HTMLFormElement, kind: Status, title: string, body: string) {
  const box = form.querySelector<HTMLElement>('[data-form-status]');
  if (!box) return;

  const palette: Record<Status, string> = {
    success: 'border-signal-500/40 bg-signal-500/10 text-signal-300',
    error: 'border-red-400/40 bg-red-500/10 text-red-200',
    info: 'border-gold-500/40 bg-gold-500/10 text-gold-200',
  };

  box.className = `mt-5 rounded-2xl border px-5 py-4 text-sm ${palette[kind]}`;
  box.innerHTML = '';

  const strong = document.createElement('p');
  strong.className = 'font-display font-semibold';
  strong.textContent = title;

  const p = document.createElement('p');
  p.className = 'mt-1 leading-relaxed opacity-90';
  p.textContent = body;

  box.append(strong, p);
  box.setAttribute('role', kind === 'error' ? 'alert' : 'status');
  box.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function setPending(form: HTMLFormElement, pending: boolean) {
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (!btn) return;
  btn.disabled = pending;
  if (pending) {
    btn.dataset.originalText = btn.textContent ?? '';
    btn.textContent = 'Sending...';
  } else if (btn.dataset.originalText) {
    btn.textContent = btn.dataset.originalText;
  }
}

export function initForms(root: ParentNode = document) {
  root.querySelectorAll<HTMLFormElement>('form[data-gg-form]').forEach((form) => {
    if (form.dataset.ggInit) return;
    form.dataset.ggInit = 'true';
    form.setAttribute('novalidate', '');

    // Spam controls: a hidden honeypot plus a minimum time-on-form.
    const loadedAt = Date.now();

    const controls = () =>
      Array.from(
        form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
          'input[name], textarea[name], select[name]'
        )
      ).filter((el) => el.type !== 'hidden' && !el.dataset.honeypot);

    // Clear an error as soon as the user fixes it.
    controls().forEach((el) => {
      const revalidate = () => {
        if (el.getAttribute('aria-invalid')) setFieldError(el, validateField(el));
      };
      el.addEventListener('input', revalidate);
      el.addEventListener('change', revalidate);
      el.addEventListener('blur', () => setFieldError(el, validateField(el)));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      let firstInvalid: HTMLElement | null = null;
      for (const el of controls()) {
        const message = validateField(el);
        setFieldError(el, message);
        if (message && !firstInvalid) firstInvalid = el;
      }

      if (firstInvalid) {
        showStatus(form, 'error', 'Check the highlighted fields', 'A few details still need attention before this can be sent.');
        firstInvalid.focus();
        return;
      }

      const honeypot = form.querySelector<HTMLInputElement>('[data-honeypot]');
      if (honeypot?.value || Date.now() - loadedAt < 1500) {
        // Silently accept: a bot gets no signal about why it failed.
        showStatus(form, 'success', 'Thank you', 'Your message has been received.');
        form.reset();
        return;
      }

      const payload = {
        formType: form.dataset.ggForm,
        submittedAt: new Date().toISOString(),
        pageUrl: window.location.href,
        fields: Object.fromEntries(
          controls().map((el) =>
            el instanceof HTMLInputElement && el.type === 'checkbox'
              ? [el.name, el.checked]
              : [el.name, el.value.trim()]
          )
        ),
      };

      if (!ENDPOINT) {
        // Intake is not wired up yet. Say so plainly rather than pretending.
        showStatus(
          form,
          'info',
          'Online intake is not connected yet',
          'This form is built and your details are valid, but submissions are not being delivered until our intake service is live. Please call or email us in the meantime and we will pick this up straight away.'
        );
        // eslint-disable-next-line no-console
        console.info('[gridless] Form payload (not sent - PUBLIC_FORMS_ENDPOINT is unset):', payload);
        return;
      }

      setPending(form, true);
      try {
        const response = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        showStatus(
          form,
          'success',
          'Thank you - we have got it',
          'A member of the team will be in touch within one business day.'
        );
        form.reset();
        form.querySelectorAll<HTMLElement>('[data-field]').forEach((f) => f.classList.remove('is-invalid'));
        form.dispatchEvent(new CustomEvent('gg:submitted', { bubbles: true, detail: payload }));
      } catch (error) {
        showStatus(
          form,
          'error',
          'That did not go through',
          'Something went wrong sending your details. Please try again, or call us and we will take it over the phone.'
        );
        // eslint-disable-next-line no-console
        console.error('[gridless] Form submission failed:', error);
      } finally {
        setPending(form, false);
      }
    });
  });
}

/** True when a forms endpoint is configured; used to show setup notices. */
export const formsConnected = Boolean(ENDPOINT);

/**
 * Validates just the controls inside `section` and paints their inline errors.
 * Used by the multi-step quote form to gate each step before advancing.
 * Returns the first invalid control, or null when the section is clean.
 */
export function validateSection(section: ParentNode): HTMLElement | null {
  let firstInvalid: HTMLElement | null = null;
  section
    .querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
      'input[name], textarea[name], select[name]'
    )
    .forEach((el) => {
      if (el.type === 'hidden' || el.dataset.honeypot) return;
      const message = validateField(el);
      setFieldError(el, message);
      if (message && !firstInvalid) firstInvalid = el;
    });
  return firstInvalid;
}
