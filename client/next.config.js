/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: {
      displayName: false,
    },
  },
};

module.exports = nextConfig;
