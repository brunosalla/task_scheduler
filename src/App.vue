<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import TopBar from './components/TopBar.vue'
import TaskModal from './components/TaskModal.vue'
import CreateTaskModal from './components/CreateTaskModal.vue'
import ErrorModal from './components/ErrorModal.vue'
</script>

<template>
  <div class="app-container">
    <Sidebar />
    
    <div class="main-container">
      <TopBar />
      
      <main class="content-area">
        <RouterView />
      </main>
    </div>

    <TaskModal />
    <CreateTaskModal />
    <ErrorModal />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-area {
  flex: 1;
  overflow: auto;
  background: var(--jira-bg-secondary);
}
</style>
