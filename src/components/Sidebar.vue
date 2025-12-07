<template>
  <aside class="sidebar">
    <div class="sidebar-header">
      <div class="project-selector">
        <div class="project-icon">📋</div>
        <div class="project-info">
          <div class="project-name">Task Scheduler</div>
          <div class="project-type">Software project</div>
        </div>
      </div>
    </div>

    <nav class="sidebar-nav">
      <a href="#" class="nav-item active">
        <span class="nav-icon">📊</span>
        <span class="nav-label">Board</span>
      </a>
      <a href="#" class="nav-item">
        <span class="nav-icon">📝</span>
        <span class="nav-label">Backlog</span>
      </a>
      <a href="#" class="nav-item">
        <span class="nav-icon">📈</span>
        <span class="nav-label">Reports</span>
      </a>
      <a href="#" class="nav-item">
        <span class="nav-icon">⚙️</span>
        <span class="nav-label">Settings</span>
      </a>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: var(--jira-bg-sidebar);
  color: var(--jira-text-inverse);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: var(--jira-spacing-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.project-selector {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-md);
  cursor: pointer;
  padding: var(--jira-spacing-sm);
  border-radius: var(--jira-radius-sm);
  transition: background var(--jira-transition-normal);
}

.project-selector:hover {
  background: rgba(255, 255, 255, 0.1);
}

.project-icon {
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--jira-radius-sm);
}

.project-info {
  flex: 1;
}

.project-name {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
}

.project-type {
  font-size: 12px;
  opacity: 0.8;
}

.sidebar-nav {
  padding: var(--jira-spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--jira-spacing-xs);
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--jira-spacing-md);
  padding: var(--jira-spacing-sm) var(--jira-spacing-md);
  border-radius: var(--jira-radius-sm);
  color: var(--jira-text-inverse);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all var(--jira-transition-normal);
  opacity: 0.8;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  opacity: 1;
}

.nav-item.active {
  background: rgba(255, 255, 255, 0.2);
  opacity: 1;
}

.nav-icon {
  font-size: 18px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-label {
  flex: 1;
}
</style>
