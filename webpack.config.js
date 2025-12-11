const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');
const { codeInspectorPlugin } = require('code-inspector-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  const config = {
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
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
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
                  silenceDeprecations: ['import', 'legacy-js-api'],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: ['vue-svg-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|webp|ico)$/i,
          type: 'asset',
          generator: {
            filename: 'images/[name]-[hash:8][ext]',
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
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      codeInspectorPlugin({ bundler: 'webpack' }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: 'css/[name]-[contenthash:8].css',
            }),
          ]
        : []),
    ],
    optimization: {
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
    },
    devtool: isProduction ? false : 'eval-source-map',
  };

  return config;
};
