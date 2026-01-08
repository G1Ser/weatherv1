const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * @description 获取module配置
 * @param {boolean} isProduction - 是否为生产环境
 * @returns {object} module配置对象
 */
module.exports = isProduction => ({
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
});
