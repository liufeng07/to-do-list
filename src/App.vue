<template>
  <main class="page">
    <section class="todo-box">
      <div class="header">
        <h1>📋 任务管家</h1>
        <p>Vue 指令 · 数据绑定 · 方法调用 综合实训</p>
      </div>

      <div class="count-area">
        <!-- 插值表达式：展示响应式数据和计算属性 -->
        <span>📌 全部任务：{{ totalCount }}</span>
        <span>✅ 未完成：{{ unfinishedCount }}</span>
        <span>✓ 已完成：{{ completedCount }}</span>
      </div>

      <div class="add-area">
        <!-- v-model：输入框和 newTodo 双向绑定 -->
        <!-- @keyup.enter：按回车时调用 addTodo 方法 -->
        <input
          v-model="newTodo"
          class="todo-input"
          type="text"
          placeholder="写一个任务，例如：学习 v-model"
          @keyup.enter="addTodo"
        />

        <!-- :disabled：输入框为空时禁用按钮 -->
        <button class="add-button" type="button" :disabled="newTodo.trim() === ''" @click="addTodo">
          + 添加任务
        </button>
      </div>

      <div class="list-title">
        <h2>🗂️ 我的任务清单</h2>

        <!-- v-on：@click 点击时调用 toggleHelpTips 方法 -->
        <button class="tip-button" type="button" @click="toggleHelpTips">
          💡
        </button>
      </div>

      <!-- v-show：控制帮助面板显示或隐藏 -->
      <div v-show="showHelpTips" class="tips">
        提示：点击左侧圆圈可以切换任务状态，点击删除可以移除任务。
      </div>

      <!-- v-if / v-else：没有任务时显示空状态，有任务时显示列表 -->
      <p v-if="todos.length === 0" class="empty-text">
        暂无任务，请先添加一条任务。
      </p>

      <ul v-else class="todo-list">
        <!-- v-for：循环渲染任务列表；:key 用来标识每一条任务 -->
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <button class="check-button" type="button" @click="toggleComplete(todo.id)">
            {{ todo.completed ? '✓' : '○' }}
          </button>

          <span class="todo-title">{{ todo.title }}</span>

          <!-- :class：根据任务完成状态绑定不同样式 -->
          <span class="status" :class="{ done: todo.completed, doing: !todo.completed }">
            {{ todo.completed ? '已完成' : '进行中' }}
          </span>

          <button class="delete-button" type="button" @click="deleteTodo(todo.id)">
            🗑️
          </button>
        </li>
      </ul>

      <p class="bottom-text">
        {{ todoStatusText }}
      </p>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      // newTodo 保存输入框中的内容
      newTodo: '',

      // showHelpTips 控制帮助面板显示或隐藏
      showHelpTips: true,

      // todos 保存任务列表，每个任务都有 id、标题、完成状态
      todos: [
        { id: 1, title: '学习 v-on 事件绑定', completed: false },
        { id: 2, title: '掌握 v-model 双向绑定', completed: false },
        { id: 3, title: '使用 v-for 动态渲染列表', completed: true },
        { id: 4, title: '测试 v-bind 动态类样式', completed: false },
        { id: 5, title: '练习 v-if / v-else 空状态', completed: false },
        { id: 6, title: '使用 v-show 控制帮助面板', completed: true },
      ],
    }
  },

  computed: {
    // 任务总数
    totalCount() {
      return this.todos.length
    },

    // 已完成任务数量
    completedCount() {
      return this.todos.filter(function (todo) {
        return todo.completed
      }).length
    },

    // 未完成任务数量
    unfinishedCount() {
      return this.todos.filter(function (todo) {
        return !todo.completed
      }).length
    },

    // 底部动态提示文字
    todoStatusText() {
      if (this.unfinishedCount === 0) {
        return '所有任务都完成啦！'
      }

      return '当前还有 ' + this.unfinishedCount + ' 个任务未完成。'
    },
  },

  methods: {
    // 添加任务
    addTodo() {
      const title = this.newTodo.trim()

      if (title === '') {
        return
      }

      this.todos.push({
        id: Date.now(),
        title: title,
        completed: false,
      })

      this.newTodo = ''
    },

    // 删除任务
    deleteTodo(id) {
      this.todos = this.todos.filter(function (todo) {
        return todo.id !== id
      })
    },

    // 切换任务完成状态
    toggleComplete(id) {
      const todo = this.todos.find(function (item) {
        return item.id === id
      })

      if (todo) {
        todo.completed = !todo.completed
      }
    },

    // 切换帮助提示显示或隐藏
    toggleHelpTips() {
      this.showHelpTips = !this.showHelpTips
    },
  },
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 24px 12px;
  background: #e8eef6;
}

.todo-box {
  max-width: 600px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 22px;
  background: #ffffff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.16);
}

.header {
  padding: 28px 20px;
  color: #ffffff;
  text-align: center;
  background: #1d2f46;
}

h1 {
  margin: 0;
  font-size: 30px;
}

.header p {
  margin: 8px 0 0;
  color: #c9d4e3;
  font-weight: bold;
}

.list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 28px 10px;
}

h2 {
  margin: 0;
  font-size: 22px;
}

button,
input {
  font: inherit;
}

button {
  border: none;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.tip-button {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #f1f5f9;
}

.tips {
  margin: 0 28px 15px;
  padding: 10px 12px;
  border-radius: 8px;
  color: #475569;
  text-align: center;
  background: #f8fafc;
}

.add-area {
  display: flex;
  gap: 10px;
  padding: 24px 28px;
  border-bottom: 1px solid #e2e8f0;
}

.todo-input {
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
  border: 2px solid #d8e1ec;
  border-radius: 999px;
  outline: none;
}

.todo-input:focus {
  border-color: #2588ff;
}

.add-button {
  padding: 0 22px;
  border-radius: 999px;
  color: #ffffff;
  font-weight: bold;
  background: #1688ff;
}

.count-area {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 14px 28px;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
  font-weight: bold;
}

.empty-text {
  margin: 0 28px 18px;
  padding: 24px;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  color: #64748b;
  text-align: center;
}

.todo-list {
  list-style: none;
  margin: 0 28px;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  padding: 14px;
  border: 1px solid #edf2f7;
  border-radius: 20px;
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.08);
}

.todo-item.completed .todo-title {
  color: #94a3b8;
  text-decoration: line-through;
}

.check-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  color: #2563eb;
  background: #eef4ff;
  font-size: 20px;
  font-weight: bold;
}

.todo-item.completed .check-button {
  color: #16a34a;
}

.todo-title {
  flex: 1;
  font-weight: bold;
}

.status {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 14px;
}

.doing {
  color: #a16207;
  background: #fef3c7;
}

.done {
  color: #047857;
  background: #bbf7d0;
}

.delete-button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f8fafc;
}

.bottom-text {
  margin: 4px 28px 24px;
  padding: 10px;
  border-radius: 10px;
  color: #475569;
  text-align: center;
  background: #f8fafc;
}

@media (max-width: 520px) {
  .add-area,
  .count-area {
    flex-direction: column;
  }

  .add-area,
  .count-area,
  .list-title {
    padding-left: 18px;
    padding-right: 18px;
  }

  .todo-list,
  .empty-text,
  .tips,
  .bottom-text {
    margin-left: 18px;
    margin-right: 18px;
  }

  .todo-item {
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
