import js from '@eslint/js'
import globals from 'globals'
import vue from 'eslint-plugin-vue'

// ESLint 配置文件：用来检查代码是否有明显问题，帮助统一代码规范。
export default [
  {
    // 这些目录或文件不需要检查。
    ignores: ['dist/**', 'node_modules/**', 'src/**/*.d.ts'],
  },

  // 使用 ESLint 官方推荐规则。
  js.configs.recommended,

  // 使用 Vue 官方推荐规则，让 ESLint 能检查 .vue 文件。
  ...vue.configs['flat/recommended'],

  {
    // 只检查 src 目录下的 js 和 vue 文件。
    files: ['src/**/*.js', 'src/**/*.vue'],
    languageOptions: {
      globals: {
        // browser：允许 window、document 等浏览器变量。
        ...globals.browser,

        // node：允许 process 等 Node 环境变量，配置文件里会用到。
        ...globals.node,
      },
    },
    rules: {
      // 课堂演示需要 console.log 打印请求和响应日志，所以这里允许使用 console。
      'no-console': 'off',

      // 下面几个 Vue 规则主要是格式细节，为了初学者代码更自由一点，这里关闭。
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
]
