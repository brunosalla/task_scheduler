# Architecture

This document describes the technical architecture and design patterns used in the Task Scheduler application.

## Overview

The Task Scheduler is built using modern Vue 3 architecture with the Composition API, following best practices for scalability and maintainability.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     User Interface                       │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │ TopBar   │  │ Sidebar  │  │TaskBoard │  │ Modals  │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│              State Management (Pinia)                    │
│  ┌──────────────┐              ┌──────────────┐        │
│  │  taskStore   │              │ errorStore   │        │
│  └──────────────┘              └──────────────┘        │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Service Layer                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  API Service (api.js)                            │  │
│  │  - Data Transformation                           │  │
│  │  - HTTP Requests                                 │  │
│  │  - Error Handling                                │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Backend API                             │
│              (REST API - Port 8080)                      │
└─────────────────────────────────────────────────────────┘
```

## Core Concepts

### 1. Component-Based Architecture

The application is built using reusable Vue components:

**Layout Components:**
- `App.vue` - Root component
- `TopBar.vue` - Navigation header
- `Sidebar.vue` - Side navigation

**Feature Components:**
- `TaskBoard.vue` - Main kanban board
- `TaskCard.vue` - Individual task card
- `TaskModal.vue` - Task details modal
- `CreateTaskModal.vue` - Create task modal
- `ErrorModal.vue` - Error display modal

### 2. State Management (Pinia)

**Task Store (`taskStore.js`):**
- Manages task data
- Handles CRUD operations
- Integrates with API service
- Implements optimistic updates

**Error Store (`errorStore.js`):**
- Global error state
- Error message display
- Error clearing

### 3. Service Layer

**API Service (`api.js`):**
- Centralized API communication
- Data transformation layer
- Error handling
- Request/response interceptors

## Design Patterns

### Optimistic UI Updates

Tasks are updated in the UI immediately, then synced with the backend:

```javascript
async function updateTask(taskId, updates) {
  // 1. Update UI immediately (optimistic)
  const previousTask = { ...tasks.value[index] }
  tasks.value[index] = { ...tasks.value[index], ...updates }
  
  try {
    // 2. Sync with backend
    const updatedTask = await taskApi.updateTask(taskId, updates)
    tasks.value[index] = updatedTask
  } catch (error) {
    // 3. Rollback on error
    tasks.value[index] = previousTask
    throw error
  }
}
```

**Benefits:**
- Instant user feedback
- Better perceived performance
- Automatic error recovery

### Data Transformation Layer

Separates backend and frontend data formats:

```javascript
// Backend → Frontend
function transformTask(backendTask) {
  return {
    id: `TASK-${backendTask.id}`,
    status: backendTask.status.toLowerCase(),
    // ... other transformations
  }
}

// Frontend → Backend
function transformTaskToBackend(frontendTask) {
  return {
    id: frontendTask.id.replace('TASK-', ''),
    status: frontendTask.status.toUpperCase(),
    // ... other transformations
  }
}
```

**Benefits:**
- Decouples frontend from backend changes
- Handles missing fields gracefully
- Provides default values

### Composition API Pattern

Uses Vue 3 Composition API for better code organization:

```javascript
export const useTaskStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])
  const isLoading = ref(false)
  
  // Actions
  async function fetchTasks() {
    // ...
  }
  
  // Return public API
  return { tasks, isLoading, fetchTasks }
})
```

**Benefits:**
- Better TypeScript support
- Easier code reuse
- More flexible composition

### Error Boundary Pattern

Global error handling with user-friendly messages:

```javascript
try {
  await taskApi.updateTask(taskId, updates)
} catch (error) {
  errorStore.showError('Failed to update task', error.message)
  throw error
}
```

**Benefits:**
- Consistent error handling
- User-friendly error messages
- Centralized error display

## Data Flow

### Task Creation Flow

```
1. User clicks "Create issue"
   ↓
2. CreateTaskModal opens
   ↓
3. User fills form and submits
   ↓
4. taskStore.createTask() called
   ↓
5. Data transformed to backend format
   ↓
6. POST /tasks API request
   ↓
7. Backend creates task
   ↓
8. Response transformed to frontend format
   ↓
9. Task added to store
   ↓
10. UI updates automatically (reactive)
```

### Task Update Flow

```
1. User modifies task (e.g., drag to new column)
   ↓
2. UI updates immediately (optimistic)
   ↓
3. taskStore.updateTask() called
   ↓
4. PUT /tasks/:id API request
   ↓
5. Backend updates task
   ↓
6. Response received
   ↓
7. Store updated with server data
   ↓
8. If error: UI rolls back to previous state
```

## Technology Stack

### Frontend

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation build tool
- **Pinia** - State management
- **Vue Router** - Client-side routing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vite DevTools** - Development server

### Styling

- **CSS Variables** - Theming system
- **Scoped CSS** - Component-level styles
- **Jira Design System** - Color palette and spacing

## File Structure

```
src/
├── components/          # Reusable components
│   ├── ErrorModal.vue
│   ├── TaskBoard.vue
│   ├── TaskCard.vue
│   ├── TaskModal.vue
│   ├── CreateTaskModal.vue
│   ├── TopBar.vue
│   └── Sidebar.vue
├── services/           # Business logic layer
│   └── api.js         # API service
├── stores/            # State management
│   ├── taskStore.js   # Task state
│   └── errorStore.js  # Error state
├── views/             # Route views
│   ├── HomeView.vue
│   └── AboutView.vue
├── router/            # Routing config
│   └── index.js
├── assets/            # Static assets
│   ├── main.css       # Global styles
│   └── base.css       # CSS variables
└── main.js            # App entry point
```

## Performance Considerations

### Optimizations

1. **Lazy Loading** - Components loaded on demand
2. **Reactive Updates** - Only changed components re-render
3. **Optimistic UI** - No waiting for server responses
4. **Efficient Re-renders** - Vue's virtual DOM diffing

### Best Practices

- Use `computed` for derived state
- Avoid unnecessary watchers
- Keep components small and focused
- Use `v-show` vs `v-if` appropriately
- Implement proper loading states

## Security

### API Security

- CORS configuration required
- HTTPS recommended for production
- API authentication (to be implemented)

### Input Validation

- Client-side validation in forms
- Server-side validation required
- XSS prevention through Vue's escaping

## Scalability

The architecture supports:

- Adding new task properties
- Multiple task boards
- User authentication
- Real-time updates (WebSocket ready)
- Internationalization (i18n ready)

## Next Steps

- [API Integration](API-Integration.md) - API documentation
- [Components](Components.md) - Component details
- [State Management](State-Management.md) - Store documentation
