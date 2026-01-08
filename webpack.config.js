const path = require('path');
// webpack module配置
const getModule = require('./webpack/module.config');
// webpack pulgins配置
const getPlugins = require('./webpack/plugin.config');
// webpack optimization配置
const getOptimization = require('./webpack/optimization.config');
// webpack devServer设置
const getDevServer = require('./webpack/server.config');
// webpack performance设置
const getPerformance = require('./webpack/performance.config');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isAnalyze = env.analyze === true;
  const isProfile = env.profile === true;
  const isGzip = env.gzip === true;
  const envFile = isProduction ? '.env.production' : '.env.development';
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
    module: getModule(isProduction),
    plugins: getPlugins({ isProduction, isAnalyze, isProfile, isGzip, envFile }),
    optimization: getOptimization(isProduction),
    devServer: getDevServer(),
    devtool: isProduction ? false : 'eval-source-map', // 开启sourcemap
    performance: getPerformance(isProduction),
  };

  return config;
};
