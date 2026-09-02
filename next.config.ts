import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // vinext's export prerenderer requests route paths without a slash; keep
  // its build mode stable and normalize the emitted HTML into index files.
  trailingSlash: githubPages ? false : true,
  ...(githubPages
    ? {
        output: 'export',
        basePath: githubPagesBasePath,
        assetPrefix: `${githubPagesBasePath}/`,
      }
    : {}),
};

export default nextConfig;
