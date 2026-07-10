/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export', // Required for GitHub Pages static hosting
  basePath: isProd ? '/your-repository-name' : '',
  images: {
    unoptimized: true, // Disables Next.js server-side image optimization
  },
};

module.exports = nextConfig;
