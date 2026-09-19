# TaskMe - Task Management Web App

TaskMe is a task management web application built to help users create, organize, track, and manage their tasks through a clean and simple interface.

This project was developed as a hands-on project to strengthen my understanding of frontend development, React, routing, state management, and Git/GitHub.

---

## 🚀 Features

- 🔐 User Login
- 📊 Dashboard with task statistics
- ➕ Create and manage tasks
- 🔎 Search tasks
- 📌 Filter tasks by status
- ✅ Completed tasks
- 🔄 In Progress tasks
- 📝 To Do tasks
- 👥 Team/User management
- 🗑️ Trash management
- 🔔 Notifications
- 👤 User profile menu
- 📱 Responsive interface
- 💾 Task data persistence using Local Storage

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Tailwind CSS

### Libraries

- React Router
- Redux / React Redux
- React Icons
- React Hook Form

### Development Tools

- Git
- GitHub
- VS Code
- npm

---

## 📸 Project Screenshots

### 🔐 Login Page

<p align="center">
  <img src="screenshots/login.png" width="85%" alt="TaskMe Login Page">
</p>

### 📊 Dashboard

<p align="center">
  <img src="screenshots/dashboard.png" width="85%" alt="TaskMe Dashboard">
</p>

### 📝 Task Management

<p align="center">
  <img src="screenshots/tasks.png" width="85%" alt="TaskMe Task Management">
</p>

### ➕ Add Task

<p align="center">
  <img src="screenshots/addtask.png" width="85%" alt="TaskMe Add Task">
</p>

### 📝 To Do

<p align="center">
  <img src="screenshots/todo.png" width="85%" alt="TaskMe To Do">
</p>

---

## 📂 Project Structure

```text
TASKMANAGER/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Textbox.jsx
│   │   │   └── ...
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   ├── Users.jsx
│   │   │   ├── Trash.jsx
│   │   │   └── TaskDetails.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   ├── tasks.png
│   ├── addtask.png
│   └── todo.png
│
└── README.md