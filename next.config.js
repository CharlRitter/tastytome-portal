const { PHASE_PRODUCTION_SERVER } = require('next/constants')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (phase, { defaultConfig }) => {
  webpack: (config, { dev }) => {
    entry: './pages/index.tsx',
    config.module.rules.push(
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'sass-loader!style-loader!css-loader'
      },
      {
        test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
            publicPath: "./",
            outputPath: "static/",
            name: "[name].[ext]"
          }
        }
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: require.resolve('file-loader'),
        options: {
          name: '/static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(t|j)sx?$/,
        use: { loader: 'awesome-typescript-loader' }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    )
    return config
  }

  if (phase === PHASE_PRODUCTION_SERVER) {
    return {
      ...defaultConfig,
      webpack: {
        plugins: [new BundleAnalyzerPlugin()]
      }
    }
  }

  return defaultConfig
}
