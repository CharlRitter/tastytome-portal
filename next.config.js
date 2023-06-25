/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();
const { version } = require('./package.json');

const nextConfig = {
  experimental: {
    mdxRs: true
  },
  publicRuntimeConfig: {
    version
  }
};

module.exports = withMDX(nextConfig);
