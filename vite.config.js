import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './src/index.js', // 确保这个路径正确
      name: 'GoravelCaptchaVue',
      fileName: (format) => `goravel-captcha-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'axios', 'ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          'ant-design-vue': 'Antd',
        },
        exports: 'named', // 确保导出方式为 named
      },
    },
  },
});
