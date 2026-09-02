import type { NextConfig } from 'next';

const githubPages = process.env.GITHUB_PAGES === 'true';
const githubPagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
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
