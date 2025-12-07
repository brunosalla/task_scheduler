<script setup>
import { ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const newTask = ref({
  title: '',
  description: '',
  priority: 'medium',
  type: 'task',
  assignee: {
    name: 'John Doe',
    avatar: 'JD'
  }
})

const closeModal = () => {
  taskStore.clearCreateModal()
  resetForm()
}

const resetForm = () => {
  newTask.value = {
    title: '',
    description: '',
    priority: 'medium',
    type: 'task',
    assignee: {
      name: 'John Doe',
      avatar: 'JD'
    }
  }
}

const createTask = () => {
  if (newTask.value.title.trim()) {
    taskStore.createTask(newTask.value)
    closeModal()
  }
}

const priorityOptions = ['highest', 'high', 'medium', 'low', 'lowest']
const typeOptions = [
  { value: 'story', label: '📖 Story' },
  { value: 'bug', label: '🐛 Bug' },
  { value: 'task', label: '✓ Task' }
]
</script>

<template>
  <Transition name="modal">
    <div v-if="taskStore.showCreateModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Create New Issue</h2>
          <button class="close-btn" @click="closeModal">✕</button>
        </div>

        <div class="modal-body">
          <div class="form-section">
            <label class="form-label">Issue Type</label>
            <select v-model="newTask.type" class="form-select">
              <option v-for="type in typeOptions" :key="type.value" :value="type.value">
                {{ type.label }}
              </option>
            </select>
          </div>

          <div class="form-section">
            <label class="form-label">Title *</label>
            <input 
              v-model="newTask.title"
              type="text" 
              class="form-input" 
              placeholder="Enter issue title..."
              @keyup.enter="createTask"
            />
          </div>

          <div class="form-section">
            <label class="form-label">Description</label>
            <textarea 
              v-model="newTask.description"
              class="form-textarea"
              placeholder="Add a description..."
              rows="4"
            ></textarea>
          </div>

          <div class="form-section">
            <label class="form-label">Priority</label>
            <select v-model="newTask.priority" class="form-select">
              <option v-for="priority in priorityOptions" :key="priority" :value="priority">
                {{ priority.charAt(0).toUpperCase() + priority.slice(1) }}
              </option>
            </select>
          </div>

          <div class="modal-footer">
            <button class="jira-btn jira-btn-secondary" @click="closeModal">
              Cancel
            </button>
            <button 
              class="jira-btn jira-btn-primary" 
              @click="createTask"
              :disabled="!newTask.title.trim()"
            >
              Create Issue
            </button>
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
  max-width: 600px;
  margin-top: 40px;
}

.modal-header {
  padding: var(--jira-spacing-xl);
  border-bottom: 1px solid var(--jira-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--jira-text-primary);
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
  padding: var(--jira-spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-lg);
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-sm);
}

.form-label {
  font-size: 12px;
  font-weight: 700;
  color: var(--jira-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-input,
.form-select,
.form-textarea {
  padding: var(--jira-spacing-sm) var(--jira-spacing-md);
  border: 2px solid var(--jira-border-light);
  border-radius: var(--jira-radius-sm);
  font-size: 14px;
  font-family: inherit;
  color: var(--jira-text-primary);
  outline: none;
  transition: all var(--jira-transition-normal);
  background: var(--jira-bg-primary);
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
  border-color: var(--jira-border-medium);
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: var(--jira-blue-primary);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-select {
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--jira-spacing-md);
  padding-top: var(--jira-spacing-lg);
  border-top: 1px solid var(--jira-border-light);
}

.jira-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
