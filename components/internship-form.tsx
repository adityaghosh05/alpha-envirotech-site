'use client';

import Script from 'next/script';
import { type FormEvent, useRef, useState } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const isGitHubPages = process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';

type Status = {
  kind: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
};

export function InternshipForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const token = useRef('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  function renderTurnstile() {
    if (!siteKey || !window.turnstile || !widgetRef.current || widgetId.current)
      return;
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      action: 'project_inquiry',
      appearance: 'interaction-only',
      size: 'flexible',
      callback: (value: string) => {
        token.current = value;
      },
      'expired-callback': () => {
        token.current = '';
      },
      'error-callback': () => {
        token.current = '';
      },
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isGitHubPages && siteKey && !token.current) {
      setStatus({
        kind: 'error',
        message: 'Please complete the verification and try again.',
      });
      return;
    }
    setStatus({ kind: 'submitting' });
    const formData = new FormData(event.currentTarget);
    const application = Object.fromEntries(formData.entries());
    if (isGitHubPages) {
      const {
        firstName,
        lastName,
        email,
        school,
        major,
        year,
        phone,
        message,
      } = application;
      const body = [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `School: ${school}`,
        `Major: ${major}`,
        `Year: ${year}`,
        `Phone: ${phone || 'Not provided'}`,
        '',
        `Additional information: ${message || 'Not provided'}`,
      ].join('\n');
      window.location.href = `mailto:info@aenvirotech.com?subject=${encodeURIComponent('Internship application — ' + firstName + ' ' + lastName)}&body=${encodeURIComponent(body)}`;
      setStatus({
        kind: 'success',
        message:
          'Your email application should open with your information ready to send.',
      });
      return;
    }
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...application,
          formType: 'internship',
          turnstileToken: token.current || 'local-preview',
          submissionId: crypto.randomUUID(),
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };
      if (!response.ok || !result.ok)
        throw new Error(result.message || 'Unable to send your application.');
      setStatus({
        kind: 'success',
        message: 'Thank you. Your internship application has been received.',
      });
      formRef.current?.reset();
      token.current = '';
      if (window.turnstile && widgetId.current)
        window.turnstile.reset(widgetId.current);
    } catch (error) {
      setStatus({
        kind: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'We could not send your application. Please email info@aenvirotech.com.',
      });
    }
  }

  return (
    <>
      {!isGitHubPages && siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={renderTurnstile}
        />
      )}
      <form ref={formRef} className="inquiry-form" onSubmit={onSubmit}>
        <FieldGroup>
          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="intern-firstName">First name</FieldLabel>
              <Input
                id="intern-firstName"
                name="firstName"
                autoComplete="given-name"
                maxLength={80}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="intern-lastName">Last name</FieldLabel>
              <Input
                id="intern-lastName"
                name="lastName"
                autoComplete="family-name"
                maxLength={80}
                required
              />
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="intern-email">Email</FieldLabel>
            <Input
              id="intern-email"
              name="email"
              type="email"
              autoComplete="email"
              maxLength={200}
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="intern-school">School</FieldLabel>
            <Input
              id="intern-school"
              name="school"
              autoComplete="organization"
              maxLength={160}
              required
            />
          </Field>
          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="intern-major">
                Major / field of study
              </FieldLabel>
              <Input id="intern-major" name="major" maxLength={120} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="intern-year">Year in school</FieldLabel>
              <select
                className="form-select"
                id="intern-year"
                name="year"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select year
                </option>
                <option>First year</option>
                <option>Sophomore</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Graduate student</option>
                <option>Other</option>
              </select>
            </Field>
          </div>
          <Field>
            <FieldLabel htmlFor="intern-phone">Phone (optional)</FieldLabel>
            <Input
              id="intern-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="intern-message">
              What are you interested in learning or working on? (optional)
            </FieldLabel>
            <Textarea
              id="intern-message"
              name="message"
              maxLength={2000}
              rows={5}
            />
          </Field>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="intern-website">Website</label>
            <input
              id="intern-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>
          {!isGitHubPages && siteKey ? (
            <div
              ref={widgetRef}
              className="turnstile-shell"
              aria-label="Spam verification"
            />
          ) : null}
          <Button
            type="submit"
            size="lg"
            disabled={status.kind === 'submitting'}
          >
            {status.kind === 'submitting' && (
              <LoaderCircle className="animate-spin" aria-hidden="true" />
            )}
            {status.kind === 'submitting'
              ? 'Sending application…'
              : 'Submit application'}
          </Button>
          <p className="form-privacy-note">
            By submitting, you agree that Alpha Envirotech may contact you about
            internship opportunities.
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
