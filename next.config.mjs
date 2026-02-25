/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wedding',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
