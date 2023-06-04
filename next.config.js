const { PHASE_PRODUCTION_SERVER } = require('next/constants');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (phase, { defaultConfig }) => {
  const isProduction = phase === PHASE_PRODUCTION_SERVER;

  const webpackConfig = (config, options) => {
    const modifiedConfig = {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules,
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.s[a|c]ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
            use: {
              loader: 'url-loader',
              options: {
                limit: 100000,
                publicPath: './',
                outputPath: 'static/',
                name: '[name].[ext]',
              },
            },
          },
          {
            test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
            loader: require.resolve('file-loader'),
            options: {
              name: '/static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(t|j)sx?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            enforce: 'pre',
            test: /\.js$/,
            loader: 'source-map-loader',
          },
        ],
      },
    };

    if (isProduction) {
      modifiedConfig.plugins = [
        ...(config.plugins || []),
        new BundleAnalyzerPlugin(),
      ];
    }

    return modifiedConfig;
  };

  return {
    ...defaultConfig,
    webpack: webpackConfig,
  };
};
