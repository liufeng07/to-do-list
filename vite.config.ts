import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Vite 项目配置文件：开发服务器、插件、路径别名等都可以在这里配置。
export default defineConfig({
  // 让 Vite 可以识别和编译 .vue 单文件组件。
  plugins: [vue()],

  resolve: {
    alias: {
      // 配置 @ 指向 src 目录。
      // 这样导入文件时可以写 @/views/TokenDemoPage.vue，不用写 ../../views/...
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
