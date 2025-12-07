<script setup>
import { computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()

// Fetch tasks when component mounts
onMounted(async () => {
  await taskStore.fetchTasks()
})

const columns = [
  { id: 'todo', title: 'TO DO', status: 'todo' },
  { id: 'inprogress', title: 'IN PROGRESS', status: 'inprogress' },
  { id: 'done', title: 'DONE', status: 'done' }
]

const getTasksByStatus = (status) => {
  return computed(() => taskStore.tasks.filter(task => task.status === status))
}

const handleTaskClick = (task) => {
  taskStore.selectTask(task)
}

const handleCreateClick = () => {
  taskStore.openCreateModal()
}
</script>

<template>
  <div class="task-board">
    <div class="board-header">
      <h1 class="board-title">Task Board</h1>
      <div class="board-actions">
        <button class="jira-btn jira-btn-secondary">
          <span>⚙️</span>
          <span>Board settings</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="taskStore.isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading tasks...</p>
    </div>

    <!-- Task Board -->
    <div v-else class="board-columns">
      <div v-for="column in columns" :key="column.id" class="board-column">
        <div class="column-header">
          <h3 class="column-title">{{ column.title }}</h3>
          <span class="column-count">{{ getTasksByStatus(column.status).value.length }}</span>
        </div>
        
        <div class="column-content">
          <TaskCard
            v-for="task in getTasksByStatus(column.status).value"
            :key="task.id"
            :task="task"
            @click="handleTaskClick"
          />
          
          <button class="add-task-btn" @click="handleCreateClick">
            <span>+</span>
            <span>Create issue</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-board {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.board-header {
  padding: var(--jira-spacing-xl);
  background: var(--jira-bg-primary);
  border-bottom: 1px solid var(--jira-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.board-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--jira-text-primary);
}

.board-actions {
  display: flex;
  gap: var(--jira-spacing-md);
}

.board-columns {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--jira-spacing-lg);
  padding: var(--jira-spacing-xl);
  overflow-x: auto;
  overflow-y: hidden;
}

.board-column {
  background: var(--jira-bg-secondary);
  border-radius: var(--jira-radius-sm);
  display: flex;
  flex-direction: column;
  min-width: 280px;
  max-height: 100%;
}

.column-header {
  padding: var(--jira-spacing-md) var(--jira-spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.column-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.column-count {
  background: var(--jira-bg-tertiary);
  color: var(--jira-text-secondary);
  padding: 2px var(--jira-spacing-sm);
  border-radius: var(--jira-radius-sm);
  font-size: 12px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.column-content {
  flex: 1;
  padding: 0 var(--jira-spacing-md) var(--jira-spacing-md);
  overflow-y: auto;
  overflow-x: hidden;
}

.add-task-btn {
  width: 100%;
  padding: var(--jira-spacing-sm);
  background: transparent;
  border: 2px dashed var(--jira-border-light);
  border-radius: var(--jira-radius-sm);
  color: var(--jira-text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--jira-spacing-sm);
  transition: all var(--jira-transition-normal);
  margin-top: var(--jira-spacing-sm);
}

.add-task-btn:hover {
  background: var(--jira-bg-primary);
  border-color: var(--jira-blue-primary);
  color: var(--jira-blue-primary);
}

.loading-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--jira-spacing-lg);
  color: var(--jira-text-secondary);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid var(--jira-border-light);
  border-top-color: var(--jira-blue-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
