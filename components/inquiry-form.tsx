'use client';

import Script from 'next/script';
import { type SyntheticEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

declare global {
  interface Window {
    AEC_TURNSTILE_SITE_KEY?: string;
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type FormStatus = {
  kind: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
const isWordPress = process.env.NEXT_PUBLIC_WORDPRESS === 'true';

function getFormValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === 'string' ? value : '';
}

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [siteKey, setSiteKey] = useState(turnstileSiteKey || '');
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });

  useEffect(() => {
    if (isWordPress && window.AEC_TURNSTILE_SITE_KEY)
      setSiteKey(window.AEC_TURNSTILE_SITE_KEY);
  }, []);

  function renderTurnstile() {
    if (
      !siteKey ||
      !window.turnstile ||
      !widgetRef.current ||
      widgetIdRef.current
    )
      return;
    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      action: 'project_inquiry',
      appearance: 'always',
      size: 'flexible',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  }

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if ((!isGitHubPages || isWordPress) && (!siteKey || !turnstileToken)) {
      setStatus({
        kind: 'error',
        message: 'Please complete the verification and try again.',
      });
      return;
    }

    setStatus({ kind: 'submitting' });
    const formData = new FormData(event.currentTarget);

    // GitHub Pages has no server. Keep that standalone build usable via email;
    // WordPress uses its authenticated server-side inquiry endpoint below.
    if (isGitHubPages && !isWordPress) {
      const firstName = getFormValue(formData, 'firstName');
      const lastName = getFormValue(formData, 'lastName');
      const organization = getFormValue(formData, 'organization');
      const email = getFormValue(formData, 'email');
      const message = getFormValue(formData, 'message');
      const subject = `Website message from ${firstName} ${lastName} — ${organization}`;
      const body = [
        `Name: ${firstName} ${lastName}`,
        `Organization: ${organization}`,
        `Email: ${email}`,
        '',
        message,
      ].join('\n');

      window.location.href = `mailto:info@aenvirotech.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({
        kind: 'success',
        message:
          'Your email application should open with your message ready to send.',
      });
      return;
    }

    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(
        isWordPress ? '/wp-json/aenviro/v1/inquiries' : '/api/inquiries',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            formType: 'contact',
            turnstileToken: turnstileToken || 'local-preview',
            submissionId: crypto.randomUUID(),
          }),
        },
      );
      const result = (await response.json()) as {
        ok: boolean;
        preview?: boolean;
        message?: string;
      };
      if (!response.ok || !result.ok)
        throw new Error(result.message || 'Unable to send your inquiry.');

      setStatus({
        kind: 'success',
        message: result.preview
          ? 'Verification passed. This local preview did not send an email.'
          : 'Thank you. Your inquiry has been received, and our team will follow up soon.',
      });
      formRef.current?.reset();
      setTurnstileToken('');
      if (window.turnstile && widgetIdRef.current)
        window.turnstile.reset(widgetIdRef.current);
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not send your inquiry. Please call 904.382.0083 or email info@aenvirotech.com.',
      });
    }
  }

  return (
    <>
      {(!isGitHubPages || isWordPress) && siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      )}
      <form
        ref={formRef}
        className="inquiry-form"
        onSubmit={onSubmit}
        noValidate={false}
      >
        <FieldGroup>
          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
                maxLength={80}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
                maxLength={80}
              />
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="organization">Organization</FieldLabel>
            <Input
              id="organization"
              name="organization"
              autoComplete="organization"
              required
              maxLength={160}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="message">Message</FieldLabel>
            <Textarea
              id="message"
              name="message"
              required
              maxLength={3000}
              rows={7}
              placeholder="How can we help?"
            />
          </Field>

          <div className="sr-only" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {(!isGitHubPages || isWordPress) && siteKey ? (
            <div
              ref={widgetRef}
              className="turnstile-shell"
              aria-label="Spam verification"
            />
          ) : !isGitHubPages || isWordPress ? (
            <p className="form-note">
              Spam protection and email delivery will activate with launch
              credentials.
            </p>
          ) : null}

          <div className="form-submit-row">
            <Button
              type="submit"
              size="lg"
              className="form-submit-button"
              disabled={status.kind === 'submitting'}
            >
              {status.kind === 'submitting' && (
                <LoaderCircle className="animate-spin" aria-hidden="true" />
              )}
              {status.kind === 'submitting'
                ? 'Sending message…'
                : 'Send message'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Prefer to talk? Call <a href="tel:+19043820083">904.382.0083</a>.
            </p>
          </div>
          <p className="form-privacy-note">
            By submitting this form, you agree that Alpha Envirotech may contact
            you about your message. Please do not include confidential or
            regulated information.
          </p>

          <div aria-live="polite" aria-atomic="true">
            {status.kind === 'success' && (
              <p className="form-message success">
                <CheckCircle2 aria-hidden="true" />
                {status.message}
              </p>
            )}
            {status.kind === 'error' && (
              <p className="form-message error">{status.message}</p>
            )}
          </div>
        </FieldGroup>
      </form>
    </>
  );
}
