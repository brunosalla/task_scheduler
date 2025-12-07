# API Integration

This document describes the backend API integration, endpoints, data formats, and transformation logic.

## Overview

The Task Scheduler integrates with a REST API backend for data persistence. All task operations (create, read, update, delete) are synchronized with the backend database.

## Configuration

### Environment Variables

Configure the API base URL in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

**Default:** `http://localhost:8080`

## API Endpoints

### Get All Tasks

**Endpoint:** `GET /tasks`

**Description:** Retrieves all tasks from the database

**Request:**
```http
GET /tasks HTTP/1.1
Host: localhost:8080
Accept: application/json
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Task title",
    "description": "Task description",
    "status": "TODO",
    "priority": "HIGH",
    "type": "STORY",
    "dueDate": null,
    "assignee": {
      "name": "John Doe",
      "avatar": "JD"
    }
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

### Get Single Task

**Endpoint:** `GET /tasks/:id`

**Description:** Retrieves a specific task by ID

**Request:**
```http
GET /tasks/1 HTTP/1.1
Host: localhost:8080
Accept: application/json
```

**Response:**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "TODO",
  "priority": "HIGH",
  "type": "STORY"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

### Create Task

**Endpoint:** `POST /tasks`

**Description:** Creates a new task

**Request:**
```http
POST /tasks HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "status": "TODO",
  "priority": "MEDIUM",
  "type": "TASK"
}
```

**Response:**
```json
{
  "id": 7,
  "title": "New task",
  "description": "Task description",
  "status": "TODO",
  "priority": "MEDIUM",
  "type": "TASK"
}
```

**Status Codes:**
- `201 Created` - Task created successfully
- `400 Bad Request` - Invalid data
- `500 Internal Server Error` - Server error

---

### Update Task

**Endpoint:** `PUT /tasks/:id`

**Description:** Updates an existing task

**Request:**
```http
PUT /tasks/1 HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Updated title",
  "description": "Updated description",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "type": "TASK"
}
```

**Status Codes:**
- `200 OK` - Task updated successfully
- `404 Not Found` - Task not found
- `400 Bad Request` - Invalid data
- `500 Internal Server Error` - Server error

---

### Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Deletes a task

**Request:**
```http
DELETE /tasks/1 HTTP/1.1
Host: localhost:8080
```

**Response:**
```
204 No Content
```

**Status Codes:**
- `204 No Content` - Task deleted successfully
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

---

### Update Task Status

**Endpoint:** `PATCH /tasks/:id/status`

**Description:** Updates only the task status (for drag and drop)

**Request:**
```http
PATCH /tasks/1/status HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "status": "DONE"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "DONE",
  "priority": "HIGH",
  "type": "TASK"
}
```

**Status Codes:**
- `200 OK` - Status updated successfully
- `404 Not Found` - Task not found
- `400 Bad Request` - Invalid status
- `500 Internal Server Error` - Server error

## Data Formats

### Backend Format

The backend uses uppercase enums:

**Status Values:**
- `TODO` - Task not started
- `IN_PROGRESS` - Task in progress  
- `DONE` - Task completed

**Priority Values:**
- `LOWEST`
- `LOW`
- `MEDIUM`
- `HIGH`
- `HIGHEST`

**Type Values:**
- `STORY` - User story
- `TASK` - Standard task
- `BUG` - Bug fix

### Frontend Format

The frontend uses lowercase strings:

**Status Values:**
- `todo`
- `inprogress`
- `done`

**Priority Values:**
- `lowest`, `low`, `medium`, `high`, `highest`

**Type Values:**
- `story`, `task`, `bug`

## Data Transformation

The API service automatically transforms data between backend and frontend formats.

### Backend → Frontend Transformation

```javascript
function transformTask(backendTask) {
  const statusMap = {
    'TODO': 'todo',
    'IN_PROGRESS': 'inprogress',
    'INPROGRESS': 'inprogress',
    'DONE': 'done'
  }

  return {
    id: `TASK-${backendTask.id}`,
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
```

**Transformations:**
- ID: `1` → `TASK-1`
- Status: `TODO` → `todo`
- Priority: `HIGH` → `high`
- Type: `STORY` → `story`
- Missing title: Uses description as fallback
- Missing assignee: Defaults to "Unassigned"

### Frontend → Backend Transformation

```javascript
function transformTaskToBackend(frontendTask) {
  const statusMap = {
    'todo': 'TODO',
    'inprogress': 'IN_PROGRESS',
    'done': 'DONE'
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
```

**Transformations:**
- ID: `TASK-1` → `1`
- Status: `todo` → `TODO`
- Priority: `high` → `HIGH`
- Type: `story` → `STORY`

## Error Handling

### API Errors

All API errors are caught and displayed via the error modal:

```javascript
try {
  const tasks = await taskApi.getAllTasks()
} catch (error) {
  errorStore.showError('Failed to load tasks', error.message)
}
```

### Error Response Format

```json
{
  "message": "Error description",
  "status": 500,
  "timestamp": "2025-12-07T20:00:00Z"
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Network Error | Backend not running | Start backend server |
| CORS Error | CORS not enabled | Enable CORS on backend |
| 404 Not Found | Invalid endpoint | Check API endpoint URL |
| 500 Server Error | Backend error | Check backend logs |

## CORS Configuration

### Backend Setup (Spring Boot Example)

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH")
                    .allowedHeaders("*");
            }
        };
    }
}
```

## Usage Examples

### Fetching Tasks

```javascript
import { useTaskStore } from '@/stores/taskStore'

const taskStore = useTaskStore()

// Fetch all tasks
await taskStore.fetchTasks()
```

### Creating a Task

```javascript
const newTask = {
  title: 'New feature',
  description: 'Implement new feature',
  priority: 'high',
  type: 'story',
  assignee: {
    name: 'John Doe',
    avatar: 'JD'
  }
}

await taskStore.createTask(newTask)
```

### Updating a Task

```javascript
await taskStore.updateTask('TASK-1', {
  title: 'Updated title',
  status: 'inprogress'
})
```

### Deleting a Task

```javascript
await taskStore.deleteTask('TASK-1')
```

### Moving a Task

```javascript
// Drag and drop to new column
await taskStore.moveTask('TASK-1', 'done')
```

## Testing API Integration

### Using cURL

```bash
# Get all tasks
curl http://localhost:8080/tasks

# Create task
curl -X POST http://localhost:8080/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Test task","status":"TODO"}'

# Update task
curl -X PUT http://localhost:8080/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated","status":"DONE"}'

# Delete task
curl -X DELETE http://localhost:8080/tasks/1
```

### Using Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Perform action in app
4. Check request/response details

## Performance

### Optimistic Updates

Tasks update immediately in UI, then sync with backend:

- **Perceived latency:** ~0ms (instant)
- **Actual latency:** Depends on network
- **Rollback on error:** Automatic

### Caching

Currently no caching implemented. Future enhancements:
- Local storage cache
- Service worker cache
- Optimistic cache updates

## Next Steps

- [State Management](State-Management.md) - Store documentation
- [Error Handling](Error-Handling.md) - Error system details
- [Development Guide](Development-Guide.md) - Development workflow
