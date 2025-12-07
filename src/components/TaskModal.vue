<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const priorityOptions = ['highest', 'high', 'medium', 'low', 'lowest']
const statusOptions = ['todo', 'inprogress', 'done']

const closeModal = () => {
  taskStore.clearSelectedTask()
}

const deleteTask = () => {
  if (taskStore.selectedTask) {
    taskStore.deleteTask(taskStore.selectedTask.id)
  }
}

const updateStatus = (newStatus) => {
  if (taskStore.selectedTask) {
    taskStore.updateTask(taskStore.selectedTask.id, { status: newStatus })
  }
}

const updatePriority = (newPriority) => {
  if (taskStore.selectedTask) {
    taskStore.updateTask(taskStore.selectedTask.id, { priority: newPriority })
  }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="taskStore.selectedTask" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <div class="task-type-badge">
            {{ taskStore.selectedTask.type === 'story' ? '📖' : taskStore.selectedTask.type === 'bug' ? '🐛' : '✓' }}
            {{ taskStore.selectedTask.id }}
          </div>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="modal-main">
            <input 
              type="text" 
              class="task-title-input" 
              :value="taskStore.selectedTask.title"
              @input="taskStore.updateTask(taskStore.selectedTask.id, { title: $event.target.value })"
            />
            
            <div class="section">
              <h4 class="section-title">Description</h4>
              <textarea 
                class="description-input"
                :value="taskStore.selectedTask.description"
                @input="taskStore.updateTask(taskStore.selectedTask.id, { description: $event.target.value })"
                rows="4"
              ></textarea>
            </div>

            <div class="section">
              <h4 class="section-title">Comments</h4>
              <div class="comments-placeholder">
                <p class="placeholder-text">No comments yet. Be the first to comment!</p>
              </div>
            </div>
          </div>

          <div class="modal-sidebar">
            <div class="sidebar-section">
              <label class="sidebar-label">Status</label>
              <select 
                class="sidebar-select"
                :value="taskStore.selectedTask.status"
                @change="updateStatus($event.target.value)"
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div class="sidebar-section">
              <label class="sidebar-label">Assignee</label>
              <div class="assignee-info">
                <div class="assignee-avatar">{{ taskStore.selectedTask.assignee.avatar }}</div>
                <span class="assignee-name">{{ taskStore.selectedTask.assignee.name }}</span>
              </div>
            </div>

            <div class="sidebar-section">
              <label class="sidebar-label">Priority</label>
              <select 
                class="sidebar-select"
                :value="taskStore.selectedTask.priority"
                @change="updatePriority($event.target.value)"
              >
                <option v-for="priority in priorityOptions" :key="priority" :value="priority">
                  {{ priority.charAt(0).toUpperCase() + priority.slice(1) }}
                </option>
              </select>
            </div>

            <div class="sidebar-section">
              <button class="jira-btn jira-btn-secondary delete-btn" @click="deleteTask">
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: var(--jira-spacing-xxl);
  z-index: 1000;
  overflow-y: auto;
}

.modal-content {
  background: var(--jira-bg-primary);
  border-radius: var(--jira-radius-md);
  box-shadow: var(--jira-shadow-lg);
  width: 100%;
  max-width: 900px;
  margin-top: 40px;
}

.modal-header {
  padding: var(--jira-spacing-xl);
  border-bottom: 1px solid var(--jira-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.task-type-badge {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-sm);
  font-size: 14px;
  color: var(--jira-text-secondary);
  font-weight: 500;
}

.close-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: var(--jira-text-secondary);
  font-size: 20px;
  cursor: pointer;
  border-radius: var(--jira-radius-sm);
  transition: all var(--jira-transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: var(--jira-bg-secondary);
  color: var(--jira-text-primary);
}

.modal-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: var(--jira-spacing-xl);
  padding: var(--jira-spacing-xl);
}

.modal-main {
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-xl);
}

.task-title-input {
  font-size: 24px;
  font-weight: 600;
  color: var(--jira-text-primary);
  border: 2px solid transparent;
  border-radius: var(--jira-radius-sm);
  padding: var(--jira-spacing-sm);
  outline: none;
  transition: all var(--jira-transition-normal);
}

.task-title-input:hover {
  background: var(--jira-bg-secondary);
}

.task-title-input:focus {
  background: var(--jira-bg-primary);
  border-color: var(--jira-blue-primary);
}

.section {
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-md);
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.description-input {
  width: 100%;
  padding: var(--jira-spacing-md);
  border: 2px solid var(--jira-border-light);
  border-radius: var(--jira-radius-sm);
  font-size: 14px;
  font-family: inherit;
  color: var(--jira-text-primary);
  resize: vertical;
  outline: none;
  transition: all var(--jira-transition-normal);
}

.description-input:focus {
  border-color: var(--jira-blue-primary);
}

.comments-placeholder {
  padding: var(--jira-spacing-xl);
  background: var(--jira-bg-secondary);
  border-radius: var(--jira-radius-sm);
  text-align: center;
}

.placeholder-text {
  color: var(--jira-text-tertiary);
  font-size: 14px;
}

.modal-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-xl);
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-sm);
}

.sidebar-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.sidebar-select {
  padding: var(--jira-spacing-sm) var(--jira-spacing-md);
  border: 2px solid var(--jira-border-light);
  border-radius: var(--jira-radius-sm);
  font-size: 14px;
  color: var(--jira-text-primary);
  background: var(--jira-bg-primary);
  cursor: pointer;
  outline: none;
  transition: all var(--jira-transition-normal);
}

.sidebar-select:hover {
  border-color: var(--jira-border-medium);
}

.sidebar-select:focus {
  border-color: var(--jira-blue-primary);
}

.assignee-info {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-md);
  padding: var(--jira-spacing-sm);
  border: 2px solid var(--jira-border-light);
  border-radius: var(--jira-radius-sm);
}

.assignee-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--jira-blue-primary);
  color: var(--jira-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
}

.assignee-name {
  font-size: 14px;
  color: var(--jira-text-primary);
}

.delete-btn {
  width: 100%;
  justify-content: center;
  color: var(--jira-priority-high);
}

.delete-btn:hover {
  background: var(--jira-priority-high);
  color: var(--jira-text-inverse);
}

/* Modal Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity var(--jira-transition-normal);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform var(--jira-transition-normal);
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95);
}
</style>
