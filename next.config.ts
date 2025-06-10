import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'rpg-portfolio'; // Nome do seu repositório

const nextConfig: NextConfig = {
  // Apenas aplicar configurações de export em produção
  ...(isProd && {
    output: 'export',
    trailingSlash: true,
    skipTrailingSlashRedirect: true,
    distDir: 'out',
    assetPrefix: `/${repoName}/`,
    basePath: `/${repoName}`,
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
