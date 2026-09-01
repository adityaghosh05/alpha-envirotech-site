'use client';

import Script from 'next/script';
import { type SyntheticEvent, useRef, useState } from 'react';
import { CheckCircle2, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Textarea } from '@/components/ui/textarea';

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

type FormStatus = {
  kind: 'idle' | 'submitting' | 'success' | 'error';
  message?: string;
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function InquiryForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ kind: 'idle' });

  function renderTurnstile() {
    if (
      !turnstileSiteKey ||
      !window.turnstile ||
      !widgetRef.current ||
      widgetIdRef.current
    )
      return;
    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: turnstileSiteKey,
      action: 'project_inquiry',
      appearance: 'interaction-only',
      size: 'flexible',
      callback: (token: string) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
      'error-callback': () => setTurnstileToken(''),
    });
  }

  async function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) {
      setStatus({
        kind: 'error',
        message: 'Please confirm that we may contact you about this request.',
      });
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      setStatus({
        kind: 'error',
        message: 'Please complete the verification and try again.',
      });
      return;
    }

    setStatus({ kind: 'submitting' });
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          consent,
          turnstileToken: turnstileToken || 'local-preview',
          submissionId: crypto.randomUUID(),
        }),
      });
      const result = (await response.json()) as {
        ok: boolean;
        message?: string;
      };
      if (!response.ok || !result.ok)
        throw new Error(result.message || 'Unable to send your inquiry.');

      setStatus({
        kind: 'success',
        message:
          'Thank you. Your inquiry has been received, and our team will follow up soon.',
      });
      formRef.current?.reset();
      setConsent(false);
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
      {turnstileSiteKey && (
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
              <FieldLabel htmlFor="requestType">How can we help?</FieldLabel>
              <NativeSelect
                id="requestType"
                name="requestType"
                className="w-full"
                required
                defaultValue=""
              >
                <NativeSelectOption value="" disabled>
                  Select a request type
                </NativeSelectOption>
                <NativeSelectOption value="evaluation">
                  Free project evaluation
                </NativeSelectOption>
                <NativeSelectOption value="proposal">
                  Request a proposal
                </NativeSelectOption>
                <NativeSelectOption value="general">
                  General inquiry
                </NativeSelectOption>
              </NativeSelect>
            </Field>
            <Field>
              <FieldLabel htmlFor="serviceInterest">
                Service interest
              </FieldLabel>
              <NativeSelect
                id="serviceInterest"
                name="serviceInterest"
                className="w-full"
                required
                defaultValue=""
              >
                <NativeSelectOption value="" disabled>
                  Select a service area
                </NativeSelectOption>
                <NativeSelectOption value="assessment-remediation">
                  Site assessment &amp; remediation
                </NativeSelectOption>
                <NativeSelectOption value="ecology-permitting">
                  Ecology, wetlands &amp; cultural resources
                </NativeSelectOption>
                <NativeSelectOption value="engineering-water">
                  Environmental engineering &amp; water
                </NativeSelectOption>
                <NativeSelectOption value="construction-compliance">
                  Construction, compliance &amp; federal delivery
                </NativeSelectOption>
                <NativeSelectOption value="sustainability-buildings">
                  Sustainability, buildings &amp; industrial hygiene
                </NativeSelectOption>
                <NativeSelectOption value="other">
                  Other / not sure
                </NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>

          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <Input
                id="fullName"
                name="fullName"
                autoComplete="name"
                required
                maxLength={120}
              />
            </Field>
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
          </div>

          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="email">Work email</FieldLabel>
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
              <FieldLabel htmlFor="phone">
                Phone <span className="form-optional">Optional</span>
              </FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </Field>
          </div>

          <div className="form-grid">
            <Field>
              <FieldLabel htmlFor="projectLocation">
                Project location
              </FieldLabel>
              <Input
                id="projectLocation"
                name="projectLocation"
                placeholder="City, state or region"
                required
                maxLength={160}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="timeline">Anticipated timeline</FieldLabel>
              <NativeSelect
                id="timeline"
                name="timeline"
                className="w-full"
                required
                defaultValue=""
              >
                <NativeSelectOption value="" disabled>
                  Select a timeline
                </NativeSelectOption>
                <NativeSelectOption value="urgent">
                  Immediate / urgent
                </NativeSelectOption>
                <NativeSelectOption value="30-days">
                  Within 30 days
                </NativeSelectOption>
                <NativeSelectOption value="1-3-months">
                  1–3 months
                </NativeSelectOption>
                <NativeSelectOption value="3-plus-months">
                  More than 3 months
                </NativeSelectOption>
                <NativeSelectOption value="planning">
                  Early planning
                </NativeSelectOption>
              </NativeSelect>
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="summary">Project or goal summary</FieldLabel>
            <Textarea
              id="summary"
              name="summary"
              required
              maxLength={3000}
              rows={7}
              placeholder="Tell us about the site, challenge, schedule, and the decision you need to make."
            />
            <FieldDescription>
              Please do not include confidential, regulated, or sensitive
              personal information.
            </FieldDescription>
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

          <div className="consent-row">
            <Checkbox
              id="consent"
              name="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(Boolean(checked))}
              required
            />
            <label htmlFor="consent">
              I agree that Alpha Envirotech may contact me about this request
              and understand that submitting this form does not create a client
              or professional-services relationship.
            </label>
          </div>

          {turnstileSiteKey ? (
            <div
              ref={widgetRef}
              className="turnstile-shell"
              aria-label="Spam verification"
            />
          ) : (
            <p className="form-note">
              Spam protection and email delivery will activate with launch
              credentials.
            </p>
          )}

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
                ? 'Sending inquiry…'
                : 'Send project inquiry'}
            </Button>
            <p className="text-sm text-muted-foreground">
              Prefer to talk? Call <a href="tel:+19043820083">904.382.0083</a>.
            </p>
          </div>

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
