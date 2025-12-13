import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useErrorStore } from './errorStore'
import { taskApi } from '../services/api'

export const useTaskStore = defineStore('tasks', () => {
  const errorStore = useErrorStore()
  const tasks = ref([])
  const selectedTask = ref(null)
  const showCreateModal = ref(false)
  const isLoading = ref(false)

  // Fetch all tasks from API
  async function fetchTasks() {
    isLoading.value = true
    try {
      const fetchedTasks = await taskApi.getAllTasks()
      tasks.value = fetchedTasks
      return fetchedTasks
    } catch (error) {
      errorStore.showError('Failed to load tasks', error.message)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function createTask(task) {
    try {
      if (!task || !task.title) {
        throw new Error('Task title is required')
      }

      // Call API to create task in database
      const createdTask = await taskApi.createTask({
        ...task,
        status: 'todo'
      })

      // Add to local state
      tasks.value.push(createdTask)
      return createdTask
    } catch (error) {
      errorStore.showError('Failed to create task', error.message)
      throw error
    }
  }

  async function updateTask(taskId, updates) {
    try {
      if (!taskId) {
        throw new Error('Task ID is required')
      }
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index === -1) {
        throw new Error(`Task with ID ${taskId} not found`)
      }

      // Optimistic update - update UI immediately
      const previousTask = { ...tasks.value[index] }
      tasks.value[index] = { ...tasks.value[index], ...updates }

      try {
        // Call API to update task in database
        const updatedTask = await taskApi.updateTask(taskId, updates)
        // Update with server response
        tasks.value[index] = updatedTask
        return updatedTask
      } catch (apiError) {
        // Rollback on API error
        tasks.value[index] = previousTask
        throw apiError
      }
    } catch (error) {
      errorStore.showError('Failed to update task', error.message)
      throw error
    }
  }

  async function deleteTask(taskId) {
    try {
      if (!taskId) {
        throw new Error('Task ID is required')
      }
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index === -1) {
        throw new Error(`Task with ID ${taskId} not found`)
      }

      // Optimistic delete - remove from UI immediately
      const deletedTask = tasks.value[index]
      tasks.value.splice(index, 1)
      if (selectedTask.value?.id === taskId) {
        selectedTask.value = null
      }

      try {
        // Call API to delete task from database
        await taskApi.deleteTask(taskId)
      } catch (apiError) {
        // Rollback on API error
        tasks.value.splice(index, 0, deletedTask)
        throw apiError
      }
    } catch (error) {
      errorStore.showError('Failed to delete task', error.message)
      throw error
    }
  }

  async function moveTask(taskId, newStatus) {
    try {
      if (!newStatus) {
        throw new Error('New status is required')
      }
      const validStatuses = ['todo', 'inprogress', 'done']
      if (!validStatuses.includes(newStatus)) {
        throw new Error(`Invalid status: ${newStatus}`)
      }

      // Optimistic update
      const index = tasks.value.findIndex(t => t.id === taskId)
      if (index === -1) {
        throw new Error(`Task with ID ${taskId} not found`)
      }
      const previousTask = { ...tasks.value[index] }
      tasks.value[index] = { ...tasks.value[index], status: newStatus }

      try {
        // Use PATCH /status endpoint for status-only updates
        const updatedTask = await taskApi.updateTaskStatus(taskId, newStatus)
        tasks.value[index] = updatedTask
      } catch (apiError) {
        // Rollback on error
        tasks.value[index] = previousTask
        throw apiError
      }
    } catch (error) {
      errorStore.showError('Failed to move task', error.message)
      throw error
    }
  }

  function selectTask(task) {
    selectedTask.value = task
  }

  function clearSelectedTask() {
    selectedTask.value = null
  }

  function openCreateModal() {
    showCreateModal.value = true
  }

  function clearCreateModal() {
    showCreateModal.value = false
  }

  return {
    tasks,
    selectedTask,
    showCreateModal,
    isLoading,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    selectTask,
    clearSelectedTask,
    openCreateModal,
    clearCreateModal
  }
})
