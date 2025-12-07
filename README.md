# Task Scheduler

A modern, Jira-style task management application built with Vue 3, featuring real-time API integration, beautiful UI, and comprehensive error handling.

![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD859?logo=pinia&logoColor=black)

## ✨ Features

- **Jira-Style Interface** - Professional kanban board design
- **Real-time API Integration** - All operations persist to database
- **Error Handling** - Beautiful error modals with detailed messages
- **Optimistic UI Updates** - Instant feedback with automatic rollback
- **Data Transformation** - Seamless backend/frontend compatibility
- **Loading States** - Smooth loading animations
- **Responsive Design** - Works on all screen sizes

## 📚 Documentation

**[📖 Read the Complete Wiki](wiki/README.md)**

Comprehensive documentation covering:
- [Getting Started](wiki/Getting-Started.md) - Installation and setup
- [Architecture](wiki/Architecture.md) - Technical design and patterns
- [API Integration](wiki/API-Integration.md) - Backend API documentation
- [Error Handling](wiki/Error-Handling.md) - Error system details

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/brunosalla/task_scheduler.git
cd task_scheduler

# Install dependencies
npm install

# Configure API endpoint
echo "VITE_API_BASE_URL=http://localhost:8080" > .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🛠️ Tech Stack

- **Frontend Framework**: Vue 3 (Composition API)
- **State Management**: Pinia
- **Routing**: Vue Router
- **Build Tool**: Vite
- **Styling**: CSS Variables (Jira Design System)

## 📦 Project Structure

```
task_scheduler/
├── src/
│   ├── components/       # Vue components
│   ├── services/         # API services
│   ├── stores/           # Pinia stores
│   ├── views/            # Route views
│   └── main.js           # App entry point
├── wiki/                 # Documentation
└── package.json
```

## 🔧 Available Scripts

### Development

```sh
npm run dev
```

Starts the development server at `http://localhost:5173`

### Production Build

```sh
npm run build
```

Compiles and minifies for production

### Preview Production Build

```sh
npm run preview
```

Preview the production build locally

### Lint

```sh
npm run lint
```

Lint and fix files with ESLint

## 🌐 Backend Requirements

Your backend API must implement these endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks |
| POST | `/tasks` | Create new task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |

See [API Integration](wiki/API-Integration.md) for detailed documentation.

## 💻 Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

### Browser Extensions

**Chromium-based browsers** (Chrome, Edge, Brave):
- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Turn on Custom Object Formatter](http://bit.ly/object-formatters)

**Firefox**:
- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [Turn on Custom Object Formatter](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 🐛 Troubleshooting

### Tasks Not Loading

1. Verify backend is running on port 8080
2. Check `.env` file has correct `VITE_API_BASE_URL`
3. Check browser console for errors
4. Verify CORS is enabled on backend

See [Getting Started - Troubleshooting](wiki/Getting-Started.md#troubleshooting) for more help.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please read the [Development Guide](wiki/Development-Guide.md) for details.

## 🔗 Links

- [GitHub Repository](https://github.com/brunosalla/task_scheduler)
- [Issue Tracker](https://github.com/brunosalla/task_scheduler/issues)
- [Complete Documentation](wiki/README.md)

## 📞 Support

If you encounter issues:
1. Check the [Wiki Documentation](wiki/README.md)
2. Search [GitHub Issues](https://github.com/brunosalla/task_scheduler/issues)
3. Create a new issue with detailed description
