/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Forces Next.js to generate a static HTML/CSS/JS "out" folder
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  images: {
    unoptimized: true, // GitHub Pages does not support Next.js default image optimization
  },
};

export default nextConfig;
