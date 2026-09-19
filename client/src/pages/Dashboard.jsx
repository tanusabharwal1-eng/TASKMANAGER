import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdNotificationsNone,
  MdTaskAlt,
  MdOutlinePendingActions,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";

const STORAGE_KEY = "taskme_tasks";

const defaultTasks = [
  {
    id: 1,
    title: "Complete project documentation",
    description: "Prepare documentation for the TaskManager project.",
    status: "todo",
  },
  {
    id: 2,
    title: "Design dashboard",
    description: "Create the dashboard interface.",
    status: "in progress",
  },
  {
    id: 3,
    title: "Test login system",
    description: "Check login and session authentication.",
    status: "completed",
  },
];

const getTasks = () => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY);

    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(defaultTasks)
    );

    return defaultTasks;
  } catch (error) {
    console.error("Unable to load tasks:", error);
    return defaultTasks;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(getTasks);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const userEmail =
    sessionStorage.getItem("userEmail") || "User";

  useEffect(() => {
    const refreshTasks = () => {
      setTasks(getTasks());
    };

    window.addEventListener(
      "taskme-tasks-updated",
      refreshTasks
    );

    window.addEventListener("storage", refreshTasks);

    return () => {
      window.removeEventListener(
        "taskme-tasks-updated",
        refreshTasks
      );

      window.removeEventListener(
        "storage",
        refreshTasks
      );
    };
  }, []);

  /* =========================
     TASK COUNTS
  ========================= */

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "in progress"
  ).length;

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  ).length;

  /* =========================
     DASHBOARD CARDS
  ========================= */

  const dashboardCards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: <FaTasks />,
      iconStyle: "bg-blue-50 text-blue-600",
      valueStyle: "text-gray-900",
      path: "/tasks",
    },

    {
      title: "Completed",
      value: completedTasks,
      icon: <MdTaskAlt />,
      iconStyle: "bg-green-50 text-green-600",
      valueStyle: "text-green-600",
      path: "/completed/completed",
    },

    {
      title: "In Progress",
      value: inProgressTasks,
      icon: <MdOutlinePendingActions />,
      iconStyle: "bg-blue-50 text-blue-600",
      valueStyle: "text-blue-600",
      path: "/in-progress/in%20progress",
    },

    {
      title: "To Do",
      value: todoTasks,
      icon: <MdOutlinePendingActions />,
      iconStyle: "bg-orange-50 text-orange-500",
      valueStyle: "text-orange-500",
      path: "/todo/todo",
    },
  ];

  /* =========================
     RECENT TASKS
  ========================= */

  const recentTasks = [...tasks].slice(0, 5);

  /* =========================
     ADD TASK
  ========================= */

  const handleAddTask = () => {
    navigate("/tasks?add=true");
  };

  /* =========================
     NOTIFICATIONS
  ========================= */

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="p-6 md:p-8">

      {/* =========================
          HEADER
      ========================= */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="mt-1 text-gray-500">
            Welcome back, {userEmail}
          </p>
        </div>

        {/* =========================
            NOTIFICATION
        ========================= */}

        <div className="relative">

          <button
            onClick={handleNotificationClick}
            className="relative w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition"
          >
            <MdNotificationsNone className="text-gray-700 text-2xl" />

            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* =========================
              NOTIFICATION PANEL
          ========================= */}

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50">

              <div className="px-5 py-4 border-b border-gray-200">

                <h3 className="font-semibold text-gray-800">
                  Notifications
                </h3>

                <p className="text-xs text-gray-400 mt-1">
                  Your latest updates
                </p>

              </div>

              <div className="p-4 space-y-3">

                <div className="p-3 rounded-lg bg-blue-50">

                  <p className="text-sm font-medium text-gray-800">
                    Welcome to TaskMe
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Start managing your tasks.
                  </p>

                </div>

                <div className="p-3 rounded-lg bg-gray-50">

                  <p className="text-sm font-medium text-gray-800">
                    Task system is ready
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    You can create and manage tasks.
                  </p>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

      {/* =========================
          DASHBOARD CARDS
      ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {dashboardCards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.path)}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-left hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2
                  className={`text-3xl font-bold mt-2 ${card.valueStyle}`}
                >
                  {card.value}
                </h2>

              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${card.iconStyle}`}
              >
                {card.icon}
              </div>

            </div>

          </button>
        ))}

      </div>

      {/* =========================
          RECENT TASKS
      ========================= */}

      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">

        {/* Recent Tasks Header */}

        <div className="p-6 border-b border-gray-200 flex items-center justify-between">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              Recent Tasks
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Your latest tasks will appear here.
            </p>

          </div>

          {/* ADD TASK BUTTON */}

          <button
            onClick={handleAddTask}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition"
          >
            <FaTasks className="text-sm" />
            Add Task
          </button>

        </div>

        {/* =========================
            TASK LIST
        ========================= */}

        {recentTasks.length === 0 ? (

          <div className="p-12 text-center">

            <div className="flex justify-center mb-4">

              <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">

                <FaTasks className="text-blue-500 text-2xl" />

              </div>

            </div>

            <p className="text-gray-500">
              No tasks available yet.
            </p>

            <p className="text-sm text-gray-400 mt-2">
              Create a task to see it here.
            </p>

            <button
              onClick={handleAddTask}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
            >
              Create Your First Task
            </button>

          </div>

        ) : (

          <div className="divide-y divide-gray-100">

            {recentTasks.map((task) => (

              <div
                key={task.id}
                className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >

                <div>

                  <h3 className="font-semibold text-gray-800">
                    {task.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    {task.description ||
                      "No description provided."}
                  </p>

                </div>

                {/* STATUS */}

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                    task.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : task.status === "in progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {task.status === "in progress"
                    ? "In Progress"
                    : task.status === "completed"
                    ? "Completed"
                    : "To Do"}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;