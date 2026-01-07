const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');
// 移除所有的注解、console和debugger语句
const TerserPlugin = require('terser-webpack-plugin');
// 获取Git版本信息
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
// 注册全局变量
const { DefinePlugin } = require('webpack');
const { codeInspectorPlugin } = require('code-inspector-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const envFile = isProduction ? '.env.production' : '.env.development';
  const gitRevisionPlugin = new GitRevisionPlugin({ lightweightTags: true, branch: true });
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
      extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
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
          test: /\.tsx$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
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
      new Dotenv({
        path: fs.existsSync(path.resolve(__dirname, envFile))
          ? path.resolve(__dirname, envFile)
          : path.resolve(__dirname, '.env'),
        systemvars: true,
      }),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: '天气预报',
        favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      }),
      new DefinePlugin({
        __GIT_VERSION__: JSON.stringify(gitRevisionPlugin.version()),
        __GIT_BRANCH__: JSON.stringify(gitRevisionPlugin.branch()),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
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
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false, //删除所有注解
            },
            compress: {
              drop_debugger: true, //移除所有debugger语句
              pure_funcs: ['console.log'], // 移除console.log语句
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
    },
    devtool: isProduction ? false : 'eval-source-map',
  };

  return config;
};
