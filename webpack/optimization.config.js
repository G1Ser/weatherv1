// 移除所有的注解、console和debugger语句
const TerserPlugin = require('terser-webpack-plugin');

/**
 * @description 获取打包优化项配置
 * @param {boolean} isProduction - 是否为生产环境
 * @returns {object} optimization配置对象
 */
module.exports = isProduction => ({
  minimize: isProduction,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        format: {
          comments: false, //是否删除所有注解
        },
        compress: {
          drop_debugger: true, //移除所有debugger语句
          pure_funcs: ['console.log'], // 仅移除console.log语句
        },
      },
    }),
  ],
  // 分包
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
});
