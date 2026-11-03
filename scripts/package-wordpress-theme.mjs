import { execFileSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const exportRoot = path.join(projectRoot, 'dist/client');
const themeSource = path.join(projectRoot, 'wordpress/alpha-envirotech');
const outputRoot = path.join(projectRoot, 'dist/wordpress-theme');
const themeOutput = path.join(outputRoot, 'alpha-envirotech');
const siteOutput = path.join(themeOutput, 'site');
const archive = path.join(projectRoot, 'dist/alpha-envirotech-wordpress-theme.zip');
const assetPrefix = '/__AEC_THEME_SITE__';

await fs.access(path.join(exportRoot, 'index.html'));
await fs.rm(outputRoot, { recursive: true, force: true });
await fs.mkdir(themeOutput, { recursive: true });
await fs.cp(themeSource, themeOutput, { recursive: true });
await fs.cp(exportRoot, siteOutput, {
  recursive: true,
  filter(source) {
    const relative = path.relative(exportRoot, source);
    return !relative.startsWith('.vite') &&
      relative !== '.assetsignore' &&
      relative !== '_headers' &&
      relative !== 'vinext-client-entry-manifest.json';
  },
});

async function rewriteAssets(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await rewriteAssets(filename);
      continue;
    }

    if (!/\.(html|rsc|js|css|json|txt|svg)$/.test(entry.name)) continue;
    let contents = await fs.readFile(filename, 'utf8');
    for (const assetRoot of ['_next', 'images', 'documents', 'videos']) {
      const source = `/${assetRoot}/`;
      const target = `${assetPrefix}${source}`;
      contents = contents
        .replaceAll(`="${source}`, `="${target}`)
        .replaceAll(`='${source}`, `='${target}`)
        .replaceAll(`"${source}`, `"${target}`)
        .replaceAll(`\\"${source}`, `\\"${target}`)
        .replaceAll(`url(${source}`, `url(${target}`);
    }
    for (const asset of ['/icon.png', '/apple-icon.png']) {
      contents = contents
        .replaceAll(`="${asset}`, `="${assetPrefix}${asset}`)
        .replaceAll(`'${asset}`, `'${assetPrefix}${asset}`)
        .replaceAll(`"${asset}`, `"${assetPrefix}${asset}`)
        .replaceAll(`\\"${asset}`, `\\"${assetPrefix}${asset}`);
    }
    await fs.writeFile(filename, contents);
  }
}

await rewriteAssets(siteOutput);
await fs.rm(archive, { force: true });
execFileSync('zip', ['-qr', archive, 'alpha-envirotech'], { cwd: outputRoot });
const stat = await fs.stat(archive);
console.log(`Created ${path.relative(projectRoot, archive)} (${Math.round(stat.size / 1024 / 1024)} MB)`);
