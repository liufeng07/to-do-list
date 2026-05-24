<template>
  <div class="app-shell">
    <nav class="nav">
      <RouterLink to="/">第一节：待办事项</RouterLink>
      <RouterLink to="/token-demo">第二节：双 Token 演示</RouterLink>
    </nav>

    <!-- 路由出口：不同地址显示不同页面 -->
    <RouterView />
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 14px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

.nav a {
  padding: 8px 14px;
  border-radius: 999px;
  color: #334155;
  text-decoration: none;
  background: #f1f5f9;
}

.nav a.router-link-active {
  color: #ffffff;
  background: #2563eb;
}
</style>
