import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([
    {
      id: 'TASK-1',
      title: 'Design new landing page',
      description: 'Create a modern, responsive landing page with hero section',
      status: 'todo',
      priority: 'high',
      type: 'story',
      assignee: {
        name: 'John Doe',
        avatar: 'JD'
      }
    },
    {
      id: 'TASK-2',
      title: 'Fix login authentication bug',
      description: 'Users are unable to login with social media accounts',
      status: 'inprogress',
      priority: 'highest',
      type: 'bug',
      assignee: {
        name: 'Jane Smith',
        avatar: 'JS'
      }
    },
    {
      id: 'TASK-3',
      title: 'Update API documentation',
      description: 'Add examples and improve clarity of API endpoints',
      status: 'inprogress',
      priority: 'medium',
      type: 'task',
      assignee: {
        name: 'Mike Johnson',
        avatar: 'MJ'
      }
    },
    {
      id: 'TASK-4',
      title: 'Implement dark mode',
      description: 'Add dark mode toggle and theme switching functionality',
      status: 'done',
      priority: 'low',
      type: 'story',
      assignee: {
        name: 'Sarah Wilson',
        avatar: 'SW'
      }
    },
    {
      id: 'TASK-5',
      title: 'Optimize database queries',
      description: 'Improve performance of slow running queries',
      status: 'done',
      priority: 'medium',
      type: 'task',
      assignee: {
        name: 'John Doe',
        avatar: 'JD'
      }
    },
    {
      id: 'TASK-6',
      title: 'Add user profile settings',
      description: 'Allow users to customize their profile information',
      status: 'todo',
      priority: 'medium',
      type: 'story',
      assignee: {
        name: 'Jane Smith',
        avatar: 'JS'
      }
    }
  ])

  const selectedTask = ref(null)
  const showCreateModal = ref(false)

  function createTask(task) {
    const newTask = {
      id: `TASK-${tasks.value.length + 1}`,
      ...task,
      status: 'todo'
    }
    tasks.value.push(newTask)
  }

  function updateTask(taskId, updates) {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index !== -1) {
      tasks.value[index] = { ...tasks.value[index], ...updates }
    }
  }

  function deleteTask(taskId) {
    const index = tasks.value.findIndex(t => t.id === taskId)
    if (index !== -1) {
      tasks.value.splice(index, 1)
    }
    if (selectedTask.value?.id === taskId) {
      selectedTask.value = null
    }
  }

  function moveTask(taskId, newStatus) {
    updateTask(taskId, { status: newStatus })
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
