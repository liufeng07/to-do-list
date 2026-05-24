<template>
  <main class="token-page">
    <section class="token-card">
      <div class="title">
        <h1>🔐 双 Token 无感刷新演示</h1>
        <p>模拟 access_token 3 秒后过期，请求自动刷新 token 并重试</p>
        <p class="api-text">当前 API 基础地址：{{ apiBaseUrl }}</p>
      </div>

      <div class="button-area">
        <button class="orange" type="button" @click="normalRequest">① 模拟请求（3秒后过期）</button>
        <button class="blue" type="button" @click="refreshToken">② 手动刷新 Token</button>
        <button class="green" type="button" @click="silentRequest">③ 无感刷新请求</button>
      </div>

      <div class="token-info">
        <span>🔑 当前 Access Token：{{ shortAccessToken }}</span>
        <span>⏱️ 状态：{{ tokenStatus }}</span>
      </div>

      <div class="log-box">
        <div class="log-title">
          <strong>📋 运行日志</strong>
          <button type="button" @click="clearLogs">清空日志</button>
        </div>

        <ul>
          <li v-for="log in logs" :key="log.id">
            <span class="time">{{ log.time }}</span>
            <span>{{ log.text }}</span>
          </li>
        </ul>
      </div>
    </section>
  </main>
</template>

<script>
import { request } from '@/utils/request'

export default {
  data() {
    return {
      accessToken: '',
      refreshTokenValue: '',
      accessExpireTime: 0,
      nowTime: Date.now(),
      timer: null,
      logs: [],
      apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    }
  },

  computed: {
    shortAccessToken() {
      return this.accessToken.slice(0, 22) + '...'
    },

    tokenStatus() {
      if (this.isAccessTokenExpired()) {
        return '❌ 已过期'
      }

      return '✅ 有效'
    },
  },

  created() {
    this.createTokens()
    this.addLog('初始化 token，access_token 会在 3 秒后过期')

    // 每秒更新一次当前时间，用来触发 tokenStatus 重新计算。
    this.timer = setInterval(() => {
      this.nowTime = Date.now()
    }, 1000)
  },

  beforeUnmount() {
    clearInterval(this.timer)
  },

  methods: {
    // 创建一组模拟 token
    createTokens() {
      this.accessToken = 'access_' + Date.now()
      this.refreshTokenValue = 'refresh_' + Date.now()
      this.accessExpireTime = Date.now() + 3000
    },

    isAccessTokenExpired() {
      return this.nowTime > this.accessExpireTime
    },

    // 第一个按钮：普通请求，过期后会失败
    async normalRequest() {
      this.addLog('点击「模拟请求」按钮')

      try {
        await request('/user/info', {
          token: this.accessToken,
          mockStatus: this.isAccessTokenExpired() ? 401 : 200,
        })
        this.addLog('普通请求成功')
      } catch {
        this.addLog('普通请求失败：access_token 已过期')
      }
    },

    // 第二个按钮：手动刷新 access_token
    async refreshToken() {
      this.addLog('点击「手动刷新 Token」按钮')

      await request('/auth/refresh', {
        token: this.refreshTokenValue,
        mockStatus: 200,
      })

      this.accessToken = 'access_' + Date.now()
      this.accessExpireTime = Date.now() + 3000
      this.addLog('手动刷新成功，新 access_token：' + this.shortAccessToken)
    },

    // 第三个按钮：请求失败后自动刷新 token，再重新请求
    async silentRequest() {
      this.addLog('点击「无感刷新请求」按钮')

      try {
        await request('/order/list', {
          token: this.accessToken,
          mockStatus: this.isAccessTokenExpired() ? 401 : 200,
        })

        this.addLog('无感刷新请求成功：token 还没过期')
      } catch {
        this.addLog('发现 access_token 过期，开始自动刷新')
        await this.refreshToken()

        await request('/order/list', {
          token: this.accessToken,
          mockStatus: 200,
        })

        this.addLog('自动刷新后重新请求成功')
      }
    },

    addLog(text) {
      this.logs.unshift({
        id: Date.now() + Math.random(),
        time: new Date().toLocaleTimeString(),
        text: text,
      })
    },

    clearLogs() {
      this.logs = []
    },
  },
}
</script>

<style scoped>
.token-page {
  min-height: 100vh;
  padding: 30px 16px;
  background: #f3f6fb;
}

.token-card {
  max-width: 980px;
  margin: 0 auto;
  padding: 28px;
  border-radius: 16px;
  background: #ffffff;
}

.title {
  padding-left: 18px;
  border-left: 5px solid #4096ff;
}

.title h1 {
  margin: 0;
  color: #172b43;
  font-size: 30px;
}

.title p {
  margin: 10px 0 0;
  color: #64748b;
  font-weight: bold;
}

.api-text {
  font-size: 14px;
}

.button-area {
  display: flex;
  gap: 18px;
  margin: 34px 0;
}

.button-area button {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 999px;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.orange {
  background: #f0a52d;
}

.blue {
  background: #4096ff;
}

.green {
  background: #52c41a;
}

.token-info {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px 18px;
  border: 1px solid #dbe4ef;
  border-radius: 12px;
  background: #f8fafc;
  font-weight: bold;
}

.log-box {
  padding: 18px;
  border-radius: 12px;
  color: #dbe7f3;
  background: #1d2f3d;
}

.log-title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid #365063;
}

.log-title button {
  border: none;
  color: #cbd5e1;
  background: transparent;
  cursor: pointer;
}

.log-box ul {
  height: 330px;
  overflow: auto;
  margin: 12px 0 0;
  padding: 0;
  list-style: none;
}

.log-box li {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #2f4658;
}

.time {
  flex: 0 0 auto;
  padding: 2px 8px;
  border-radius: 999px;
  background: #33485d;
}

@media (max-width: 720px) {
  .button-area,
  .token-info {
    flex-direction: column;
  }
}
</style>
