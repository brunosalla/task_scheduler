# Getting Started

This guide will help you set up and run the Task Scheduler application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher)
- **Git**
- **Backend API** running on port 8080 (or configure custom port)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/brunosalla/task_scheduler.git
cd task_scheduler
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Vue 3
- Vue Router
- Pinia
- Vite
- ESLint & Prettier

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# .env
VITE_API_BASE_URL=http://localhost:8080
```

**Configuration Options:**
- `VITE_API_BASE_URL` - Your backend API base URL (default: `http://localhost:8080`)

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Backend Setup

Your backend API must implement the following endpoints:

### Required Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get single task |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |
| PATCH | `/tasks/:id/status` | Update task status |

### Backend Data Format

**Task Object:**
```json
{
  "id": 1,
  "title": "Task title",
  "description": "Task description",
  "status": "TODO",
  "priority": "HIGH",
  "type": "STORY",
  "assignee": {
    "name": "John Doe",
    "avatar": "JD"
  }
}
```

**Status Values:**
- `TODO` - Task not started
- `IN_PROGRESS` - Task in progress
- `DONE` - Task completed

> **Note:** The frontend automatically transforms between backend format (uppercase) and frontend format (lowercase).

## Verify Installation

1. **Check Development Server**
   - Visit `http://localhost:5173`
   - You should see the Task Board interface

2. **Check API Connection**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Refresh the page
   - Look for a request to `/tasks`
   - Verify it returns 200 status

3. **Test Task Operations**
   - Click "Create issue" button
   - Fill in task details
   - Verify task appears in TODO column
   - Try dragging tasks between columns

## Troubleshooting

### Tasks Not Loading

**Problem:** Empty task board or loading spinner stuck

**Solutions:**
1. Verify backend is running on correct port
2. Check `.env` file has correct `VITE_API_BASE_URL`
3. Check browser console for CORS errors
4. Verify backend `/tasks` endpoint returns valid JSON

### CORS Errors

**Problem:** Browser blocks API requests

**Solution:** Enable CORS on your backend:

```java
// Spring Boot example
@CrossOrigin(origins = "http://localhost:5173")
```

### Port Already in Use

**Problem:** Port 5173 is already in use

**Solution:**
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

## Next Steps

- Read [Architecture](Architecture.md) to understand the codebase
- Check [API Integration](API-Integration.md) for API details
- Review [Components](Components.md) for component documentation
- See [Development Guide](Development-Guide.md) for development workflow

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

## Development Tools

### Recommended VS Code Extensions

- **Volar** - Vue 3 language support
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Vue VSCode Snippets** - Vue code snippets

### Browser DevTools

- **Vue DevTools** - Install browser extension for Vue debugging
- **Network Tab** - Monitor API requests
- **Console** - Check for errors and logs

## Support

If you encounter issues:

1. Check [Troubleshooting](#troubleshooting) section
2. Review [Error Handling](Error-Handling.md) documentation
3. Search [GitHub Issues](https://github.com/brunosalla/task_scheduler/issues)
4. Create a new issue with detailed description
