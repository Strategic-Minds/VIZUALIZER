/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.floor-wiz.com' },
      { protocol: 'https', hostname: 'vision.floor-wiz.com' },
      { protocol: 'https', hostname: 'xtremepolishingsystems.com' },
    ],
  },
};
export default nextConfig;
