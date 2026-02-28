const fs = require('fs');
const path = require('path');
// 打包终端美化 打包速度分析
const WebpackBar = require('webpackbar');
// 拆分vue文件→将对应的部分分配给loader
const { VueLoaderPlugin } = require('vue-loader');
// 解析环境变量
const Dotenv = require('dotenv-webpack');
// 生成打包后的html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 获取Git版本信息
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
// 开发调试工具
const { codeInspectorPlugin } = require('code-inspector-plugin');
// css独立打包文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 打包文件开启gzip压缩
const CompressionPlugin = require('compression-webpack-plugin');
// 打包js文件分析
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
// 注册全局变量
const { DefinePlugin } = require('webpack');

/**
 * @description 获取plugin配置
 * @param {Object} options - 配置选项
 * @param {boolean} options.isProduction - 是否为生产环境
 * @param {boolean} options.isAnalyze - 是否开启打包分析
 * @param {boolean} options.isProfile - 是否开启打包性能分析
 * @param {boolean} options.isGzip - 是否开启gzip压缩
 * @param {string} options.envFile - 环境变量文件路径
 * @returns {Array} webpack plugins 数组
 */
module.exports = options => {
  const { isProduction, isAnalyze, isProfile, isGzip, envFile } = options;
  const gitRevisionPlugin = new GitRevisionPlugin({ lightweightTags: true, branch: true });

  const plugins = [
    new WebpackBar({
      name: isProduction ? '🚀 生产构建' : '⚡ 开发模式',
      color: isProduction ? '#52c41a' : '#1890ff',
      profile: isProfile, // 打包速度分析
    }),
    new VueLoaderPlugin(),
    // 基础环境变量
    new Dotenv({
      path: path.resolve(__dirname, '..', '.env'),
      systemvars: true,
    }),
    // 特殊环境变量
    ...(fs.existsSync(path.resolve(__dirname, '..', envFile))
      ? [
          new Dotenv({
            path: path.resolve(__dirname, '..', envFile),
            systemvars: true,
          }),
        ]
      : []),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: '天气预报',
      favicon: path.resolve(__dirname, '..', 'public', 'favicon.ico'),
    }),
    new DefinePlugin({
      __GIT_VERSION__: JSON.stringify(gitRevisionPlugin.version()),
      __GIT_BRANCH__: JSON.stringify(gitRevisionPlugin.branch()),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    }),
  ];
  if (!isProduction) {
    plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
  }
  if (isProduction) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name]-[contenthash:8].css',
      })
    );
  }
  // gzip压缩 必须在后面
  if (isGzip) {
    plugins.push(
      new CompressionPlugin({
        filename: '[path][base].gz', //生成的压缩文件名
        algorithm: 'gzip', //压缩算法
        test: /\.(js|css|html|svg)$/, // 匹配需要压缩的文件
        threshold: 10240, // 只处理大于 10KB 的文件
        minRatio: 0.8, // 压缩率小于 0.8 才会被压缩
        deleteOriginalAssets: true, // 删除原文件
      })
    );
  }
  if (isAnalyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true,
        generateStatsFile: false, // 需不需要分析文件
        statsFilename: 'stats.json',
      })
    );
  }
  return plugins;
};
