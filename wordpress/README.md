# WordPress packaging

`pnpm run wordpress:build` builds the current React site as static pages and
packages it as an installable WordPress theme at
`dist/alpha-envirotech-wordpress-theme.zip`.

The theme serves those pages and assets through the current WordPress site. It
preserves the existing page URLs and site interactions. Forms use the existing
static-site email draft behavior, so they open the visitor's mail app addressed
to `info@aenvirotech.com` instead of relying on a server API.

The React project remains the source of truth for content and design. Make
changes in the project, rebuild the theme, and upload the replacement theme ZIP.
This keeps all website pages available through WordPress hosting without
rewriting the project into a separate, manually maintained PHP site.
