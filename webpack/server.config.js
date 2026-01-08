/**
 * @description 获取开发网络配置
 * @returns {object} devServer配置对象
 */
module.exports = () => ({
  port: 3000, // 端口号
  open: true, //自动打开
  hot: true, //热更新
  compress: true, //gzip压缩
});
