<template>
  <Transition name="modal">
    <div v-if="errorStore.hasError" class="modal-overlay" @click="errorStore.clearError">
      <div class="modal-container" @click.stop>
        <div class="modal-header">
          <div class="error-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <h2>Error</h2>
          <button class="close-button" @click="errorStore.clearError">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <p class="error-message">{{ errorStore.errorMessage }}</p>
          <p v-if="errorStore.errorDetails" class="error-details">{{ errorStore.errorDetails }}</p>
        </div>
        
        <div class="modal-footer">
          <button class="btn-primary" @click="errorStore.clearError">
            OK
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useErrorStore } from '../stores/errorStore'

const errorStore = useErrorStore()
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(9, 30, 66, 0.54);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: var(--jira-bg-primary);
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--jira-border);
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px 24px;
  border-bottom: 1px solid var(--jira-border);
  background: linear-gradient(135deg, rgba(222, 53, 11, 0.1) 0%, rgba(222, 53, 11, 0.05) 100%);
}

.error-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(222, 53, 11, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--jira-priority-highest);
  flex-shrink: 0;
}

.modal-header h2 {
  flex: 1;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: var(--jira-text-primary);
}

.close-button {
  background: none;
  border: none;
  color: var(--jira-text-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-button:hover {
  background: var(--jira-bg-hover);
  color: var(--jira-text-primary);
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.error-message {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: var(--jira-text-primary);
  font-weight: 500;
}

.error-details {
  margin: 0;
  font-size: 14px;
  color: var(--jira-text-secondary);
  background: var(--jira-bg-secondary);
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid var(--jira-priority-highest);
  font-family: 'Monaco', 'Courier New', monospace;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--jira-border);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-primary {
  background: var(--jira-priority-highest);
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #c9372c;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(222, 53, 11, 0.3);
}

.btn-primary:active {
  transform: translateY(0);
}

/* Transition animations */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}
</style>
