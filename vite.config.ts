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
