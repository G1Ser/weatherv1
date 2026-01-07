module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // 必须放最后,关闭冲突规则
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    // Prettier
    'prettier/prettier': 'warn',

    // Vue 规则
    'vue/multi-word-component-names': 'off', // 允许单词组件名
    'vue/no-v-html': 'warn', // v-html 警告
    'vue/require-default-prop': 'off', // 不强制 prop 默认值
    'vue/require-prop-types': 'warn', // prop 类型警告

    // TypeScript 规则
    '@typescript-eslint/no-explicit-any': 'warn', // any 警告
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_', // 忽略 _ 开头的参数
        varsIgnorePattern: '^_', // 忽略 _ 开头的变量
      },
    ],

    // 通用规则
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off', // 关闭 JS 的,用 TS 的
  },
};
