import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false, // 保留 viewBox 以便缩放
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'docs',
    sourcemap: false,
    minify: 'terser',
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除 console
        drop_debugger: true, // 移除 debugger
        pure_funcs: ['console.log'], // 移除 console.log
      },
    },
    // Rollup 打包配置
    rollupOptions: {
      output: {
        // 手动配置代码分割
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'echarts-vendor': ['echarts'],
          'utils-vendor': ['axios', 'lodash-es'],
        },
        // 优化输出文件名
        chunkFileNames: (chunkInfo) => {
          // vendor 文件放到单独的 vendor 目录
          if (chunkInfo.name.includes('vendor')) {
            return 'vendor/[name]-[hash].js';
          }
          return 'js/[name]-[hash].js';
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: assetInfo => {
          // 根据文件类型分类存放
          const fileName = assetInfo.names?.[0] || '';
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(fileName)) {
            return `images/[name]-[hash].[ext]`;
          } else if (/\.(woff2?|eot|ttf|otf)$/i.test(fileName)) {
            return `fonts/[name]-[hash].[ext]`;
          } else if (/\.css$/i.test(fileName)) {
            return `css/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
      },
    },
  },
  publicDir: 'public',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/base.scss";`,
        silenceDeprecations: ['import', 'mixed-decls', 'color-functions', 'global-builtin', 'legacy-js-api'],
      },
    },
  },
});
