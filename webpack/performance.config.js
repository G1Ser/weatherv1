/**
 * @description 获取性能配置
 * @param {boolean} isProduction - 是否为生产环境
 * @returns {object} performance配置对象
 */
module.exports = isProduction => ({
  hints: isProduction ? 'warning' : false,
  maxAssetSize: 1024 * 1000, //单个资源体积上限
  maxEntrypointSize: 512 * 1000, // 入口文件体积上线（影响首屏加载）
});
