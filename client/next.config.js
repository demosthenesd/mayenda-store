/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@company/ui", "ui", "mui-one-time-password-input"],
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
