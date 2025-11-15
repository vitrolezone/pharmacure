/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pharmify/ui', '@pharmify/db'],
};

module.exports = nextConfig;

