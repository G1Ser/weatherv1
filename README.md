# 天气预报项目(已归档 2026/3/26)

基于高德地图 API 的天气预报应用，支持城市搜索、天气查询和收藏夹功能。

## 项目特点

- **地理数据库**
  基于IP定位结合自建地理数据库，提升城市识别的稳定性与可控性，减少对单一第三方服务的依赖
- **PostGIS空间能力支持**
  使用PostGIS扩展地理空间查询能力，实现更准确的区域匹配
- **接口缓存**
  通过Cloudflare构建缓存层，对天气查询接口进行缓存与复用，有效减少高德API调用 [后端源码](https://github.com/G1Ser/wt-prod-k8m3)
- **跨平台组件化架构**
  核心UI基于Lit构建，实现多端复用 [g1components使用](https://g1components.chauncey.work)
- **工程化与代码质量**
  引入Husky、Eslint、TypeScript与Jest，建立提交预检查、代码规范检查、类型检查和测试能力，提升项目开发效率与代码质量
- **webpack工程化构建**
  基于Webpack进行工程化管理，完成模块拆分、资源处理与打包分析，增强项目的可维护性与构建稳定性。

## 项目技术栈

- Vue 2.7
- TypeScript
- Vuex (状态管理)
- Vue Router (路由)
- Webpack (构建工具)
- ECharts (图表可视化)
- Axios (HTTP 请求)
- Lodash-es (工具库)
- Jest + ts-jest (单元测试)

## 项目规范

### 代码风格

- 使用分号结束语句
- 缩进使用 2 个空格
- 每行最大字符数为 120
- Vue 文件中的 script 和 style 标签不额外缩进
- 使用单引号（JSX 中使用双引号）
- 箭头函数单参数时省略括号

### 提交规范

使用 Conventional Commits 规范，类型包括：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式调整
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

### 项目结构

```
public/
├── svgs/            # 天气图标
└── favicon.ico      # 项目图标

src/
├── api/             # API 接口
├── assets/          # 静态资源
│   ├── fonts/       # 字体文件
│   ├── styles/      # 全局样式
│   └── svgs/        # SVG 图标
├── components/      # 公共组件
├── constant/        # 常量定义
├── doc/             # 开发文档
├── plugins/         # Vue-Lit插件
├── router/          # 路由配置
├── shared/          # Lit组件库
├── store/           # Vuex 状态管理
│   └── modules/     # 状态模块
├── types/           # TypeScript 类型定义
├── utils/           # 工具函数
│   ├── git/         # Git 信息
│   ├── gmap/        # 高德地图工具
│   ├── http/        # HTTP 请求封装
│   ├── localstorage/ # 本地存储
│   ├── performance/  # 性能监控
│   └── weather-icon/ # 天气图标
└── views/           # 页面视图

tests/
├── __mocks__/       # API Mock 文件
└── *.test.ts        # 单元测试文件

types/
├── .d.ts            # 全局类型
├── env.d.ts         # 环境变量类型
└── g1.d.ts          # Lit第三方组件库类型

webpack/
├── module           # module rules配置
├── optimization     # 打包优化配置
├── performance      # 打包体积性能配置
├── plugin           # 插件配置
└── server           # 网络配置

```

## 开发指南

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev              # 启动开发服务器
```

### 构建

```bash
pnpm build            # 生产构建
pnpm build:analyze    # 构建并分析包大小
pnpm build:profile    # 构建并分析性能
pnpm build:gzip       # 构建并启用 gzip 压缩
pnpm preview          # 预览生产构建
```

### 代码质量

```bash
pnpm lint             # 运行 ESLint 检查
pnpm lint:fix         # 自动修复 ESLint 问题
pnpm format           # 格式化代码
pnpm format:check     # 检查代码格式
pnpm type-check       # TypeScript 类型检查
```

### 单元测试

```bash
pnpm test             # 运行所有测试
pnpm test:watch       # 监听模式运行测试
pnpm test:coverage    # 运行测试并生成覆盖率报告
```
