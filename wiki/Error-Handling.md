# Error Handling

This document describes the error handling system in the Task Scheduler application.

## Overview

The application implements a comprehensive error handling system with user-friendly error modals, automatic rollback, and detailed error messages.

## Error Store

### Location
`src/stores/errorStore.js`

### State

```javascript
{
  hasError: false,        // Boolean - Is error active
  errorMessage: '',       // String - Main error message
  errorDetails: ''        // String - Technical details (optional)
}
```

### Actions

#### showError(message, details)

Displays an error modal to the user.

**Parameters:**
- `message` (String) - User-friendly error message
- `details` (String, optional) - Technical details for debugging

**Example:**
```javascript
import { useErrorStore } from '@/stores/errorStore'

const errorStore = useErrorStore()

errorStore.showError(
  'Failed to load tasks',
  'Network timeout after 30 seconds'
)
```

#### clearError()

Dismisses the error modal.

**Example:**
```javascript
errorStore.clearError()
```

## Error Modal Component

### Location
`src/components/ErrorModal.vue`

### Features

- **Backdrop blur** - Focuses attention on error
- **Error icon** - Visual indicator with red accent
- **Error message** - Clear, user-friendly message
- **Technical details** - Optional code-style details box
- **Close button** - Dismiss error
- **Click outside** - Dismiss by clicking backdrop
- **Smooth animations** - Fade and scale transitions

### UI Elements

```
┌─────────────────────────────────────┐
│  ⚠️  Error                       ✕  │
├─────────────────────────────────────┤
│                                     │
│  Failed to update task              │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Task with ID TASK-999 not     │ │
│  │ found                         │ │
│  └───────────────────────────────┘ │
│                                     │
│                            [ OK ]   │
└─────────────────────────────────────┘
```

### Styling

- **Colors**: Jira design system
- **Error accent**: Red (#DE350B)
- **Background**: Semi-transparent overlay
- **Animation**: 300ms ease transitions

## Error Handling Patterns

### API Errors

All API operations are wrapped in try-catch blocks:

```javascript
async function fetchTasks() {
  try {
    const tasks = await taskApi.getAllTasks()
    return tasks
  } catch (error) {
    errorStore.showError('Failed to load tasks', error.message)
    throw error
  }
}
```

### Validation Errors

Input validation with specific error messages:

```javascript
async function createTask(task) {
  try {
    if (!task || !task.title) {
      throw new Error('Task title is required')
    }
    // ... create task
  } catch (error) {
    errorStore.showError('Failed to create task', error.message)
    throw error
  }
}
```

### Optimistic Update Rollback

Automatic rollback on API errors:

```javascript
async function updateTask(taskId, updates) {
  // Save previous state
  const previousTask = { ...tasks.value[index] }
  
  // Update UI optimistically
  tasks.value[index] = { ...tasks.value[index], ...updates }
  
  try {
    // Sync with backend
    const updatedTask = await taskApi.updateTask(taskId, updates)
    tasks.value[index] = updatedTask
  } catch (error) {
    // Rollback on error
    tasks.value[index] = previousTask
    errorStore.showError('Failed to update task', error.message)
    throw error
  }
}
```

## Error Types

### Network Errors

**Cause:** Backend not reachable

**Error Message:**
```
Failed to load tasks
Network request failed
```

**Solution:**
- Check backend is running
- Verify API URL in `.env`
- Check network connection

### CORS Errors

**Cause:** CORS not enabled on backend

**Error Message:**
```
Failed to load tasks
CORS policy blocked the request
```

**Solution:**
- Enable CORS on backend
- Add frontend origin to allowed origins

### Validation Errors

**Cause:** Invalid or missing data

**Error Messages:**
```
Failed to create task
Task title is required
```

```
Failed to move task
Invalid status: invalid-status
```

**Solution:**
- Provide required fields
- Use valid enum values

### Not Found Errors

**Cause:** Resource doesn't exist

**Error Message:**
```
Failed to update task
Task with ID TASK-999 not found
```

**Solution:**
- Verify task exists
- Check task ID is correct

### Server Errors

**Cause:** Backend error (500)

**Error Message:**
```
Failed to update task
HTTP error! status: 500
```

**Solution:**
- Check backend logs
- Verify database connection
- Check backend error handling

## Error Handling Flow

```
1. User action (e.g., create task)
   ↓
2. Validation check
   ↓ (if invalid)
3. Show error modal
   ↓
4. User dismisses error
   ↓
5. Error cleared
   
   OR
   
2. Validation passes
   ↓
3. Optimistic UI update
   ↓
4. API request
   ↓ (if error)
5. Rollback UI
   ↓
6. Show error modal
   ↓
7. User dismisses error
```

## User Experience

### Error Display

- **Immediate feedback** - Error shows instantly
- **Clear messaging** - User-friendly language
- **Technical details** - Available for debugging
- **Easy dismissal** - Click OK or outside modal

### Optimistic Updates

- **Instant UI** - No waiting for server
- **Automatic rollback** - Seamless error recovery
- **No data loss** - Previous state restored

### Error Recovery

- **Retry option** - User can try again
- **State preserved** - Form data not lost
- **Clear actions** - What to do next

## Best Practices

### Error Messages

✅ **Good:**
```javascript
errorStore.showError(
  'Failed to create task',
  'Task title is required'
)
```

❌ **Bad:**
```javascript
errorStore.showError(
  'Error',
  'Something went wrong'
)
```

### Error Handling

✅ **Good:**
```javascript
try {
  await taskApi.updateTask(taskId, updates)
} catch (error) {
  errorStore.showError('Failed to update task', error.message)
  throw error // Re-throw for caller
}
```

❌ **Bad:**
```javascript
try {
  await taskApi.updateTask(taskId, updates)
} catch (error) {
  console.log('Error:', error) // Silent failure
}
```

### Validation

✅ **Good:**
```javascript
if (!task.title) {
  throw new Error('Task title is required')
}
```

❌ **Bad:**
```javascript
if (!task.title) {
  return // Silent failure
}
```

## Testing Error Handling

### Manual Testing

1. **Network Error**
   - Stop backend server
   - Try to load tasks
   - Verify error modal shows

2. **Validation Error**
   - Try to create task without title
   - Verify error modal shows

3. **Not Found Error**
   - Try to update non-existent task
   - Verify error modal shows

4. **Rollback**
   - Update task
   - Disconnect network mid-request
   - Verify UI rolls back

### Browser DevTools

1. Open DevTools (F12)
2. Go to Console tab
3. Check for error logs
4. Verify error details

## Debugging

### Enable Detailed Logging

Add to API service:

```javascript
async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(url, config)
    console.log('API Response:', response) // Debug log
    return await response.json()
  } catch (error) {
    console.error('API Error:', error) // Error log
    throw error
  }
}
```

### Check Error Store State

In Vue DevTools:

1. Open Vue DevTools
2. Go to Pinia tab
3. Select errorStore
4. Check state values

## Future Enhancements

- **Error logging service** - Send errors to backend
- **Retry mechanism** - Automatic retry on network errors
- **Offline support** - Queue operations when offline
- **Error analytics** - Track error frequency
- **Custom error types** - Different modals for different errors

## Related Documentation

- [API Integration](API-Integration.md) - API error responses
- [State Management](State-Management.md) - Store documentation
- [Components](Components.md) - ErrorModal component details
