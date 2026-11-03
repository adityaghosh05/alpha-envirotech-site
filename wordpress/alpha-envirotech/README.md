# Alpha Envirotech WordPress theme

This theme serves the built Alpha Envirotech website and handles its contact and internship forms with WordPress REST, Cloudflare Turnstile, and Resend.

## Configure form delivery

After installing and activating the theme, open **Settings → AEC Form Integrations** in WordPress and enter:

- A Cloudflare Turnstile site key configured for the production website hostname.
- Its matching secret key.
- A Resend API key and a sender address verified in Resend.
- The comma-separated recipient addresses for contact and internship submissions.

The site key is public and is inserted into rendered form pages at request time. The Turnstile secret and Resend API key remain server-side. The site checks each Turnstile token with Cloudflare before accepting a submission, then sends the form details through Resend. If required production settings are missing, the forms show an unavailable response instead of reporting a false success.

For a WordPress environment explicitly marked `local`, the handler can return a preview success after valid Turnstile verification when Resend details are absent. This does not send email. The test-key setup used in the local preview is stored only in that local WordPress database; it is not part of the theme ZIP. Never use Cloudflare's test keys on the production website.

## Rebuild the theme

From the source project root, run `pnpm run wordpress:build`. The installable theme archive is written to `dist/alpha-envirotech-wordpress-theme.zip`.
