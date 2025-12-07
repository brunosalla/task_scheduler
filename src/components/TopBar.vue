<script setup>
import { useTaskStore } from '../stores/taskStore'

const taskStore = useTaskStore()

const handleCreateClick = () => {
  taskStore.openCreateModal()
}
</script>

<template>
  <header class="topbar">
    <div class="topbar-left">
      <div class="breadcrumb">
        <span class="breadcrumb-item">Projects</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item">Task Scheduler</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item active">Board</span>
      </div>
    </div>

    <div class="topbar-center">
      <div class="search-bar">
        <span class="search-icon">🔍</span>
        <input type="text" placeholder="Search issues..." class="search-input" />
      </div>
    </div>

    <div class="topbar-right">
      <button class="jira-btn jira-btn-primary create-btn" @click="handleCreateClick">
        <span>+</span>
        <span>Create</span>
      </button>
      <div class="user-menu">
        <div class="user-avatar">U</div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  height: 56px;
  background: var(--jira-bg-primary);
  border-bottom: 1px solid var(--jira-border-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--jira-spacing-xl);
  gap: var(--jira-spacing-xl);
  flex-shrink: 0;
}

.topbar-left {
  display: flex;
  align-items: center;
  min-width: 200px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-sm);
  font-size: 14px;
}

.breadcrumb-item {
  color: var(--jira-text-secondary);
  transition: color var(--jira-transition-normal);
}

.breadcrumb-item:hover {
  color: var(--jira-text-primary);
  cursor: pointer;
}

.breadcrumb-item.active {
  color: var(--jira-text-primary);
  font-weight: 600;
}

.breadcrumb-separator {
  color: var(--jira-text-tertiary);
}

.topbar-center {
  flex: 1;
  max-width: 400px;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-sm);
  background: var(--jira-bg-secondary);
  border: 2px solid transparent;
  border-radius: var(--jira-radius-sm);
  padding: var(--jira-spacing-sm) var(--jira-spacing-md);
  transition: all var(--jira-transition-normal);
}

.search-bar:focus-within {
  background: var(--jira-bg-primary);
  border-color: var(--jira-blue-primary);
}

.search-icon {
  font-size: 16px;
  color: var(--jira-text-tertiary);
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  color: var(--jira-text-primary);
}

.search-input::placeholder {
  color: var(--jira-text-tertiary);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-lg);
}

.create-btn {
  font-weight: 600;
}

.user-menu {
  cursor: pointer;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--jira-blue-primary);
  color: var(--jira-text-inverse);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  transition: all var(--jira-transition-normal);
}

.user-avatar:hover {
  background: var(--jira-blue-dark);
  transform: scale(1.05);
}
</style>
