/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: "",
  transpilePackages: ['@lens-protocol'],
};

module.exports = nextConfig;

require('dotenv').config();