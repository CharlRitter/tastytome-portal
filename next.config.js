/** @type {import('next').NextConfig} */

const { version } = require('./package.json');

const nextConfig = {
  publicRuntimeConfig: {
    version,
    enablePantry: process.env.ENABLE_PANTRY === 'true',
    enableShoppingList: process.env.ENABLE_SHOPPING_LIST === 'true'
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    });

    return config;
  }
};

module.exports = nextConfig;
