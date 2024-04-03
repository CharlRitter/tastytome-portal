/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')();
const { version } = require('./package.json');

const nextConfig = {
  experimental: {
    mdxRs: true
  },
  publicRuntimeConfig: {
    version,
    enablePantry: process.env.ENABLE_PANTRY === 'true',
    enableShoppingList: process.env.ENABLE_SHOPPING_LIST === 'true'
  }
};

module.exports = withMDX(nextConfig);
