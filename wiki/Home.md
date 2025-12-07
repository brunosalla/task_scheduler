# Task Scheduler Wiki

Welcome to the **Task Scheduler** project wiki! This is a modern, Jira-style task management application built with Vue 3, featuring real-time API integration and a beautiful user interface.

## 📚 Table of Contents

- [Home](Home.md) - Project overview and quick start
- [Getting Started](Getting-Started.md) - Installation and setup guide
- [Architecture](Architecture.md) - Technical architecture and design patterns
- [API Integration](API-Integration.md) - Backend API documentation
- [Components](Components.md) - Component documentation
- [State Management](State-Management.md) - Pinia stores and state flow
- [Error Handling](Error-Handling.md) - Error handling system
- [Development Guide](Development-Guide.md) - Development workflow and best practices
- [Deployment](Deployment.md) - Deployment instructions

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/brunosalla/task_scheduler.git

# Navigate to project directory
cd task_scheduler

# Install dependencies
npm install

# Configure API endpoint
echo "VITE_API_BASE_URL=http://localhost:8080" > .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## ✨ Key Features

- **Jira-Style Interface** - Modern, professional task board design
- **Real-time API Integration** - All operations persist to database
- **Error Handling** - Beautiful error modals with detailed messages
- **Optimistic UI Updates** - Instant feedback with automatic rollback
- **Data Transformation** - Seamless backend/frontend compatibility
- **Loading States** - Smooth loading animations
- **Responsive Design** - Works on all screen sizes

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Build Tool**: Vite
- **Styling**: CSS Variables (Jira Design System)
- **Backend API**: REST API (configurable endpoint)

## 📦 Project Structure

```
task_scheduler/
├── src/
│   ├── components/       # Vue components
│   │   ├── ErrorModal.vue
│   │   ├── TaskBoard.vue
│   │   ├── TaskCard.vue
│   │   ├── TaskModal.vue
│   │   ├── CreateTaskModal.vue
│   │   ├── TopBar.vue
│   │   └── Sidebar.vue
│   ├── services/         # API services
│   │   └── api.js
│   ├── stores/           # Pinia stores
│   │   ├── taskStore.js
│   │   └── errorStore.js
│   ├── views/            # Route views
│   ├── router/           # Vue Router config
│   ├── assets/           # CSS and static assets
│   └── main.js           # App entry point
├── .env                  # Environment variables
└── package.json          # Dependencies
```

## 🤝 Contributing

Contributions are welcome! Please read our [Development Guide](Development-Guide.md) for details on our code of conduct and development process.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [GitHub Repository](https://github.com/brunosalla/task_scheduler)
- [Issue Tracker](https://github.com/brunosalla/task_scheduler/issues)
- [API Documentation](API-Integration.md)
