import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdAddTask, MdClose } from "react-icons/md";

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

    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
  } catch (error) {
    console.error("Unable to load tasks:", error);
    return defaultTasks;
  }
};

const saveTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

  window.dispatchEvent(new Event("taskme-tasks-updated"));
};

const Tasks = () => {
  const { status } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(getTasks);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  /*
   * Detect status from the sidebar URL.
   */
  const currentFilter = useMemo(() => {
    const pathname = location.pathname.toLowerCase();

    if (
      pathname.includes("completed") ||
      (status && decodeURIComponent(status).toLowerCase() === "completed")
    ) {
      return "completed";
    }

    if (
      pathname.includes("in-progress") ||
      pathname.includes("in progress") ||
      (status &&
        decodeURIComponent(status).toLowerCase() === "in progress")
    ) {
      return "in progress";
    }

    if (
      pathname.includes("todo") ||
      (status && decodeURIComponent(status).toLowerCase() === "todo")
    ) {
      return "todo";
    }

    return "all";
  }, [location.pathname, status]);

  /*
   * Open Add Task form automatically when Dashboard sends ?add=true
   */
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("add") === "true") {
      setShowForm(true);

      // Remove ?add=true from the URL after opening the form.
      navigate("/tasks", { replace: true });
    }
  }, [location.search, navigate]);

  /*
   * Refresh tasks if another page updates them.
   */
  useEffect(() => {
    const refreshTasks = () => {
      setTasks(getTasks());
    };

    window.addEventListener("taskme-tasks-updated", refreshTasks);
    window.addEventListener("storage", refreshTasks);

    return () => {
      window.removeEventListener("taskme-tasks-updated", refreshTasks);
      window.removeEventListener("storage", refreshTasks);
    };
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        currentFilter === "all" || task.status === currentFilter;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, currentFilter, search]);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      status: "todo",
    };

    const updatedTasks = [task, ...tasks];

    setTasks(updatedTasks);
    saveTasks(updatedTasks);

    setNewTask({
      title: "",
      description: "",
    });

    setShowForm(false);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: newStatus,
          }
        : task
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const getStatusStyle = (taskStatus) => {
    if (taskStatus === "completed") {
      return "bg-green-100 text-green-700";
    }

    if (taskStatus === "in progress") {
      return "bg-blue-100 text-blue-700";
    }

    return "bg-orange-100 text-orange-700";
  };

  const getStatusLabel = (taskStatus) => {
    if (taskStatus === "completed") {
      return "Completed";
    }

    if (taskStatus === "in progress") {
      return "In Progress";
    }

    return "To Do";
  };

  const pageTitle =
    currentFilter === "all"
      ? "All Tasks"
      : currentFilter === "completed"
      ? "Completed"
      : currentFilter === "in progress"
      ? "In Progress"
      : "To Do";

  return (
    <div className="p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {pageTitle}
          </h1>

          <p className="text-gray-500 mt-1">
            Manage and track your tasks
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          {showForm ? (
            <MdClose className="text-xl" />
          ) : (
            <MdAddTask className="text-xl" />
          )}

          {showForm ? "Close" : "Add Task"}
        </button>

      </div>

      {/* ADD TASK FORM */}
      {showForm && (
        <form
          onSubmit={handleAddTask}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Create New Task
          </h2>

          <div className="grid gap-4">

            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  title: e.target.value,
                })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({
                  ...newTask,
                  description: e.target.value,
                })
              }
              rows="3"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
              >
                Create Task
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewTask({
                    title: "",
                    description: "",
                  });
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium transition"
              >
                Cancel
              </button>

            </div>

          </div>
        </form>
      )}

      {/* SEARCH */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

      {/* TASK CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            <div className="flex justify-between items-start gap-4">

              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {task.title}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {task.description || "No description provided."}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyle(
                  task.status
                )}`}
              >
                {getStatusLabel(task.status)}
              </span>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">
                  To Do
                </option>

                <option value="in progress">
                  In Progress
                </option>

                <option value="completed">
                  Completed
                </option>
              </select>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY STATE */}
      {filteredTasks.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

          <h2 className="text-xl font-semibold text-gray-700">
            No tasks found
          </h2>

          <p className="text-gray-400 mt-2">
            Try another search or create a new task.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition"
          >
            Add Task
          </button>

        </div>
      )}

    </div>
  );
};

export default Tasks;