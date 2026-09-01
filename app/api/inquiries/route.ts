const requestTypes = ['evaluation', 'proposal', 'general'] as const;
const serviceInterests = [
  'assessment-remediation',
  'ecology-permitting',
  'engineering-water',
  'construction-compliance',
  'sustainability-buildings',
  'other',
] as const;
const timelines = [
  'urgent',
  '30-days',
  '1-3-months',
  '3-plus-months',
  'planning',
] as const;

type Inquiry = {
  requestType: (typeof requestTypes)[number];
  serviceInterest: (typeof serviceInterests)[number];
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  projectLocation: string;
  timeline: (typeof timelines)[number];
  summary: string;
  consent: boolean;
  turnstileToken: string;
  submissionId: string;
  website: string;
};

const labels: Record<string, string> = {
  evaluation: 'Free project evaluation',
  proposal: 'Proposal request',
  general: 'General inquiry',
  'assessment-remediation': 'Site assessment & remediation',
  'ecology-permitting': 'Ecology, wetlands & cultural resources',
  'engineering-water': 'Environmental engineering & water',
  'construction-compliance': 'Construction, compliance & federal delivery',
  'sustainability-buildings': 'Sustainability, buildings & industrial hygiene',
  other: 'Other / not sure',
  urgent: 'Immediate / urgent',
  '30-days': 'Within 30 days',
  '1-3-months': '1–3 months',
  '3-plus-months': 'More than 3 months',
  planning: 'Early planning',
};

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

function parseInquiry(raw: Record<string, unknown>): Inquiry | null {
  const requestType = clean(raw.requestType, 32);
  const serviceInterest = clean(raw.serviceInterest, 64);
  const timeline = clean(raw.timeline, 32);
  const inquiry: Inquiry = {
    requestType: requestType as Inquiry['requestType'],
    serviceInterest: serviceInterest as Inquiry['serviceInterest'],
    fullName: clean(raw.fullName, 120),
    organization: clean(raw.organization, 160),
    email: clean(raw.email, 200).toLowerCase(),
    phone: clean(raw.phone, 40),
    projectLocation: clean(raw.projectLocation, 160),
    timeline: timeline as Inquiry['timeline'],
    summary: clean(raw.summary, 3000),
    consent: raw.consent === true,
    turnstileToken: clean(raw.turnstileToken, 2048),
    submissionId: clean(raw.submissionId, 80),
    website: clean(raw.website, 200),
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idPattern = /^[a-zA-Z0-9-]{16,80}$/;
  if (
    !requestTypes.includes(inquiry.requestType) ||
    !serviceInterests.includes(inquiry.serviceInterest) ||
    !timelines.includes(inquiry.timeline) ||
    inquiry.fullName.length < 2 ||
    inquiry.organization.length < 2 ||
    !emailPattern.test(inquiry.email) ||
    inquiry.projectLocation.length < 2 ||
    inquiry.summary.length < 20 ||
    !inquiry.consent ||
    !inquiry.turnstileToken ||
    !idPattern.test(inquiry.submissionId)
  )
    return null;

  return inquiry;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > 20_000)
    return json({ ok: false, message: 'This request is too large.' }, 413);

  let raw: Record<string, unknown>;
  try {
    raw = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(
      { ok: false, message: 'Please review the form and try again.' },
      400,
    );
  }

  const inquiry = parseInquiry(raw);
  if (!inquiry)
    return json(
      {
        ok: false,
        message: 'Please complete all required fields with valid information.',
      },
      422,
    );

  // Honeypot submissions receive a neutral response without triggering delivery.
  if (inquiry.website) return json({ ok: true });

  const isDevelopment = process.env.NODE_ENV !== 'production';
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const resendApiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const recipients = (process.env.CONTACT_RECIPIENTS || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  if (
    isDevelopment &&
    (!turnstileSecret || !resendApiKey || !from || recipients.length === 0)
  ) {
    return json({ ok: true, preview: true });
  }

  if (!turnstileSecret || !resendApiKey || !from || recipients.length === 0) {
    return json(
      {
        ok: false,
        message:
          'Online inquiries are temporarily unavailable. Please call 904.382.0083 or email info@aenvirotech.com.',
      },
      503,
    );
  }

  const remoteIp =
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim();

  try {
    const turnstileResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: inquiry.turnstileToken,
          remoteip: remoteIp,
          idempotency_key: inquiry.submissionId,
        }),
        signal: AbortSignal.timeout(8_000),
      },
    );
    const verification = (await turnstileResponse.json()) as {
      success?: boolean;
      action?: string;
    };
    if (
      !turnstileResponse.ok ||
      !verification.success ||
      verification.action !== 'project_inquiry'
    ) {
      return json(
        {
          ok: false,
          message: 'Verification expired or failed. Please try again.',
        },
        429,
      );
    }
  } catch {
    return json(
      {
        ok: false,
        message: 'Verification is temporarily unavailable. Please try again.',
      },
      503,
    );
  }

  const rows = [
    ['Request type', labels[inquiry.requestType]],
    ['Service interest', labels[inquiry.serviceInterest]],
    ['Name', inquiry.fullName],
    ['Organization', inquiry.organization],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone || 'Not provided'],
    ['Project location', inquiry.projectLocation],
    ['Timeline', labels[inquiry.timeline]],
  ];
  const text = [
    'New Alpha Envirotech website inquiry',
    '',
    ...rows.map(([label, value]) => `${label}: ${value}`),
    '',
    'Project or goal summary:',
    inquiry.summary,
  ].join('\n');
  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><th style="padding:8px 14px 8px 0;text-align:left;vertical-align:top;color:#52645b">${escapeHtml(label)}</th><td style="padding:8px 0;vertical-align:top">${escapeHtml(value)}</td></tr>`,
    )
    .join('');
  const html = `<div style="font-family:Arial,sans-serif;color:#17251f;line-height:1.5"><h1 style="color:#081838">New website inquiry</h1><table style="border-collapse:collapse">${htmlRows}</table><h2 style="margin-top:28px;color:#081838">Project or goal summary</h2><p style="white-space:pre-wrap">${escapeHtml(inquiry.summary)}</p></div>`;

  try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `aec_inquiry_${inquiry.submissionId}`,
      },
      body: JSON.stringify({
        from,
        to: recipients,
        reply_to: inquiry.email,
        subject: `[AEC website] ${labels[inquiry.requestType]} — ${inquiry.organization}`,
        text,
        html,
        tags: [
          { name: 'source', value: 'website' },
          { name: 'request_type', value: inquiry.requestType },
        ],
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!delivery.ok) throw new Error('delivery failed');
  } catch {
    return json(
      {
        ok: false,
        message:
          'We could not send your inquiry. Please call 904.382.0083 or email info@aenvirotech.com.',
      },
      503,
    );
  }

  return json({ ok: true });
}
