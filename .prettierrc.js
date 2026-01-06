module.exports = {
  // ===== 基础设置 =====
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  semi: true,

  // ===== 引号设置 =====
  singleQuote: true, // 使用单引号
  jsxSingleQuote: false, // JSX 使用双引号(React 习惯)
  quoteProps: 'as-needed', // 对象属性按需加引号

  // ===== 括号和空格 =====
  bracketSpacing: true, // { foo: bar } 而不是 {foo: bar}
  bracketSameLine: false, // 标签的 > 不和最后一个属性在同一行
  arrowParens: 'avoid', // 箭头函数单参数时省略括号

  // ===== 逗号 =====
  trailingComma: 'es5', // 对象/数组末尾加逗号,方便 git diff

  // ===== Vue 特定 =====
  vueIndentScriptAndStyle: false, // script 和 style 标签内不额外缩进
  singleAttributePerLine: false, // 属性少时允许在一行

  // ===== HTML =====
  htmlWhitespaceSensitivity: 'css', // 根据 CSS display 属性处理空格

  // ===== 换行符 =====
  endOfLine: 'lf', // 统一使用 Unix 换行符

  // ===== Markdown =====
  proseWrap: 'preserve', // 保持 Markdown 原有换行

  // ===== 其他 =====
  embeddedLanguageFormatting: 'auto', // 自动格式化嵌入的代码
};
