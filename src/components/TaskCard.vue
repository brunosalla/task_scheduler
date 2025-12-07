<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const priorityColors = {
  highest: 'var(--jira-priority-highest)',
  high: 'var(--jira-priority-high)',
  medium: 'var(--jira-priority-medium)',
  low: 'var(--jira-priority-low)',
  lowest: 'var(--jira-priority-lowest)'
}

const typeIcons = {
  story: '📖',
  bug: '🐛',
  task: '✓'
}
</script>

<template>
  <div class="task-card jira-card" @click="emit('click', task)">
    <div class="task-header">
      <span class="task-type">{{ typeIcons[task.type] }}</span>
      <span class="task-id">{{ task.id }}</span>
    </div>
    
    <div class="task-title">{{ task.title }}</div>
    
    <div class="task-footer">
      <div 
        class="priority-indicator" 
        :style="{ backgroundColor: priorityColors[task.priority] }"
        :title="task.priority"
      ></div>
      <div class="task-assignee" :title="task.assignee.name">
        {{ task.assignee.avatar }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  padding: var(--jira-spacing-md);
  cursor: pointer;
  margin-bottom: var(--jira-spacing-sm);
  border: 2px solid transparent;
}

.task-card:hover {
  border-color: var(--jira-blue-light);
}

.task-header {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-sm);
  margin-bottom: var(--jira-spacing-sm);
}

.task-type {
  font-size: 14px;
}

.task-id {
  font-size: 12px;
  color: var(--jira-text-secondary);
  font-weight: 500;
}

.task-title {
  font-size: 14px;
  color: var(--jira-text-primary);
  line-height: 1.4;
  margin-bottom: var(--jira-spacing-md);
  font-weight: 500;
}

.task-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.priority-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.task-assignee {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--jira-blue-primary);
  color: var(--jira-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
}
</style>
