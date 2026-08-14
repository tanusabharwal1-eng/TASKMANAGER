# 🚀 Task Manager

A modern **Task Management Web Application** built with the **MERN Stack**.
The application helps users organize, manage, and track their daily tasks through a clean and responsive dashboard.

## 📌 About the Project

**Task Manager** is designed to make task organization simple and efficient.

Users can manage their tasks from a centralized dashboard, track their progress, and organize their work through an intuitive interface.

The project is being developed using the **MERN Stack**:

* **MongoDB** – Database
* **Express.js** – Backend framework
* **React.js** – Frontend library
* **Node.js** – Backend runtime

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* Secure authentication
* Logout functionality
* Protected routes

### 📋 Task Management

* Create tasks
* View tasks
* Update tasks
* Delete tasks
* Mark tasks as completed
* Track task status

### 📊 Dashboard

* Overview of tasks
* Pending tasks
* Completed tasks
* Task statistics
* User-friendly dashboard

### ⚙️ Settings

* User preferences
* Application settings
* Customizable interface

### 🎨 UI/UX

* Modern dashboard design
* Responsive layout
* Sidebar navigation
* Clean and simple interface
* Dark/Light theme support

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Redux Toolkit
* React Hook Form
* Tailwind CSS
* Axios
* Lucide React

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

### Development Tools

* Git
* GitHub
* VS Code
* Vite
* npm

---

## 📂 Project Structure

```text
TASKMANAGER/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The exact structure may change as the project develops.

---

## 💻 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/TASKMANAGER.git
```

### 2. Navigate into the project

```bash
cd TASKMANAGER
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

⚠️ **Never upload your `.env` file to GitHub.**

Make sure `.env` is included in `.gitignore`.

---

## ▶️ Running the Project

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will normally run on:

```text
http://localhost:5173
```

The backend will normally run on:

```text
http://localhost:5000
```

---

## 🔄 Application Flow

```text
User
  │
  ▼
Login / Register
  │
  ▼
Authentication
  │
  ▼
Dashboard
  │
  ├── Create Task
  ├── View Tasks
  ├── Update Task
  ├── Complete Task
  └── Delete Task
  │
  ▼
MongoDB
```

---

## 🎯 Project Goals

The main goals of this project are:

* Learn full-stack web development
* Understand the MERN architecture
* Practice React component development
* Learn REST APIs
* Implement authentication
* Work with MongoDB
* Build a real-world project
* Understand frontend-backend communication
* Practice Git and GitHub

---

## 🚧 Current Status

🟡 **Project: In Development**

The application is actively being developed. More features and improvements will be added over time.

---

## 🔮 Future Improvements

Planned features include:

* [ ] Advanced task filtering
* [ ] Task priority system
* [ ] Task categories
* [ ] Search functionality
* [ ] Due dates and reminders
* [ ] Calendar integration
* [ ] Task analytics
* [ ] User profile management
* [ ] Improved mobile responsiveness
* [ ] AI-powered task assistance
* [ ] Deployment to production

---

## 📸 Screenshots

Add screenshots of your application here after the UI is finalized.

```text
screenshots/
├── login.png
├── dashboard.png
├── tasks.png
└── settings.png
```

Example:

```markdown
![Login Page](screenshots/login.png)

![Dashboard](screenshots/dashboard.png)
```

---

## 🧠 What I Learned

Through this project, I am learning and practicing:

* React.js
* JSX
* Components
* Props
* State management
* React Router
* Redux Toolkit
* Forms and validation
* REST APIs
* Node.js
* Express.js
* MongoDB
* Authentication
* Git & GitHub
* Full-stack application architecture

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

If you want to contribute:

```bash
git fork
```

Create a new branch:

```bash
git checkout -b feature/new-feature
```

Commit your changes:

```bash
git commit -m "Add new feature"
```

Push the branch:

```bash
git push origin feature/new-feature
```

Then open a Pull Request.

---

## 📄 License

This project is created for **educational and learning purposes**.

---

## 👨‍💻 Author

**Tanu**

B.Tech Computer Science & Engineering Student

### ⭐ If you find this project useful, consider giving the repository a star!
