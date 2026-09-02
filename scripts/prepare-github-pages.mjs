import { promises as fs } from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist/client');
const basePath = process.env.GITHUB_PAGES_BASE_PATH || process.env.NEXT_PUBLIC_BASE_PATH || '';
if (!basePath) process.exit(0);

async function visit(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await visit(file);
    else if (/\.(html|css|js|rsc|json)$/.test(entry.name)) {
      const source = await fs.readFile(file, 'utf8');
      const updated = source
        .replaceAll('href="/', `href="${basePath}/`)
        .replaceAll('src="/', `src="${basePath}/`)
        .replaceAll('srcSet="/', `srcSet="${basePath}/`)
        .replaceAll('content="/', `content="${basePath}/`)
        .replaceAll('url(/', `url(${basePath}/`)
        .replaceAll(`"/_next/`, `"${basePath}/_next/`)
        .replaceAll(`"/images/`, `"${basePath}/images/`)
        .replaceAll(`"/icon.png`, `"${basePath}/icon.png`)
        .replaceAll(`"/apple-icon.png`, `"${basePath}/apple-icon.png`)
        .replaceAll(`"/og.png`, `"${basePath}/og.png`);
      if (updated !== source) await fs.writeFile(file, updated);
    }
  }
}

await visit(root);
