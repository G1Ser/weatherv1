module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复bug
        'docs', // 文档变更
        'style', // 代码格式(不影响代码运行的变动)
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 增加测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'build', // 打包
      ],
    ],
    'subject-empty': [2, 'never'], // 提交信息不能为空
    'subject-case': [0], // 关闭 subject 大小写校验
  },
};
