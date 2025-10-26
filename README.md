# 天气预报项目

## 项目技术栈

- Vue 3
- TypeScript
- Bootstrap
- ECharts
- Vite

## 项目规范

### 代码风格

- 使用分号结束语句
- 缩进使用 2 个空格
- 每行最大字符数为 200
- Vue 文件中的 script 和 style 标签保持缩进

### 项目结构

```
src/
├── assets/          # 静态资源
│   ├── fonts/       # 字体
│   ├── styles/      # 样式
│   └── svgs/        # svg图标
├── components/      # 公共组件
├── views/           # 页面视图
├── router/          # 路由配置
└── types/           # TypeScript类型定义
```

## 开发指南

1. 安装依赖

   ```
   pnpm install
   ```

2. 启动开发服务器

   ```
   pnpm dev
   ```

3. 构建生产版本
   ```
   pnpm build
   ```
