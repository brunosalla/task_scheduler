// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

/**
 * Transform backend task format to frontend format
 */
function transformTask(backendTask) {
    // Map backend status to frontend status
    const statusMap = {
        'TODO': 'todo',
        'IN_PROGRESS': 'inprogress',
        'INPROGRESS': 'inprogress',
        'DONE': 'done',
        'FINISHED': 'done'
    }

    return {
        id: backendTask.id ? `TASK-${backendTask.id}` : backendTask.id,
        title: backendTask.title || backendTask.description || 'Untitled Task',
        description: backendTask.description || '',
        status: statusMap[backendTask.status?.toUpperCase()] || 'todo',
        priority: backendTask.priority?.toLowerCase() || 'medium',
        type: backendTask.type?.toLowerCase() || 'task',
        assignee: backendTask.assignee || {
            name: 'Unassigned',
            avatar: 'UN'
        }
    }
}

/**
 * Transform frontend task format to backend format
 */
function transformTaskToBackend(frontendTask) {
    const statusMap = {
        'todo': 'TODO',
        'inprogress': 'IN_PROGRESS',
        'done': 'finished'
    }

    return {
        id: frontendTask.id?.replace('TASK-', ''),
        title: frontendTask.title,
        description: frontendTask.description,
        status: statusMap[frontendTask.status] || 'TODO',
        priority: frontendTask.priority?.toUpperCase(),
        type: frontendTask.type?.toUpperCase(),
        assignee: frontendTask.assignee
    }
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    }

    try {
        const response = await fetch(url, config)

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }

        return await response.json()
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}

/**
 * Task API methods
 */
export const taskApi = {
    // Get all tasks
    async getAllTasks() {
        const tasks = await apiRequest('/tasks')
        return tasks.map(transformTask)
    },

    // Get a single task by ID
    async getTask(taskId) {
        const task = await apiRequest(`/tasks/${taskId}`)
        return transformTask(task)
    },

    // Create a new task
    async createTask(taskData) {
        const backendTask = transformTaskToBackend(taskData)
        const createdTask = await apiRequest('/tasks', {
            method: 'POST',
            body: JSON.stringify(backendTask),
        })
        return transformTask(createdTask)
    },

    // Update an existing task
    async updateTask(taskId, updates) {
        const backendUpdates = transformTaskToBackend({ ...updates, id: taskId })
        const updatedTask = await apiRequest(`/tasks/${taskId.replace('TASK-', '')}`, {
            method: 'PUT',
            body: JSON.stringify(backendUpdates),
        })
        return transformTask(updatedTask)
    },

    // Delete a task
    async deleteTask(taskId) {
        return apiRequest(`/tasks/${taskId.replace('TASK-', '')}`, {
            method: 'DELETE',
        })
    },

    // Update task status (for drag and drop)
    async updateTaskStatus(taskId, status) {
        const statusMap = {
            'todo': 'TODO',
            'inprogress': 'IN_PROGRESS',
            'done': 'finished'
        }
        const updatedTask = await apiRequest(`/tasks/${taskId.replace('TASK-', '')}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status: statusMap[status] }),
        })
        return transformTask(updatedTask)
    },
}
