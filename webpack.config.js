const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    mode: isProduction ? 'production' : 'development',
    entry: './src/main.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name]-[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name]-[contenthash:8].js' : 'js/[name].js',
      clean: true,
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'vue$': 'vue/dist/vue.esm.js',
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `@use "@/assets/styles/base.scss";`,
                sassOptions: {
                  silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin', 'legacy-js-api'],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            'vue-loader',
            {
              loader: 'vue-svg-loader',
              options: {
                svgo: {
                  plugins: [
                    { removeViewBox: false },
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|webp|ico)$/i,
          type: 'asset',
          generator: {
            filename: 'images/[name]-[hash:8][ext]',
          },
          parser: {
            dataUrlCondition: {
              maxSize: 10 * 1024, // 10kb
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name]-[hash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          extensions: {
            vue: {
              enabled: true,
              compiler: require.resolve('vue-template-compiler'),
            },
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'body',
      }),
      new webpack.DefinePlugin({
        'process.env.VUE_APP_LOCAL_LOCATION': JSON.stringify(process.env.VUE_APP_LOCAL_LOCATION || '北京'),
        'process.env.VUE_APP_AMAP_API': JSON.stringify(process.env.VUE_APP_AMAP_API),
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'css/[name]-[contenthash:8].css',
              chunkFilename: 'css/[name]-[contenthash:8].css',
            }),
            new CopyWebpackPlugin({
              patterns: [
                {
                  from: 'public',
                  to: '',
                  globOptions: {
                    ignore: ['**/index.html'],
                  },
                },
              ],
            }),
          ]
        : []),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ],
      splitChunks: {
        cacheGroups: {
          'vue-vendor': {
            test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
            name: 'vue-vendor',
            chunks: 'all',
            priority: 10,
          },
          'echarts-vendor': {
            test: /[\\/]node_modules[\\/]echarts[\\/]/,
            name: 'echarts-vendor',
            chunks: 'all',
            priority: 9,
          },
          'utils-vendor': {
            test: /[\\/]node_modules[\\/](axios|lodash-es)[\\/]/,
            name: 'utils-vendor',
            chunks: 'all',
            priority: 8,
          },
        },
      },
    },
    devServer: {
      port: 3000,
      open: true,
      hot: true,
      historyApiFallback: true,
      compress: true,
    },
    devtool: isProduction ? false : 'eval-source-map',
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
