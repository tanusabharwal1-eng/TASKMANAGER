import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const { status } = useParams();

  const [tasks, setTasks] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const currentFilter = status
    ? decodeURIComponent(status).toLowerCase()
    : "all";

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        currentFilter === "all" || task.status === currentFilter;

      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

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
      title: newTask.title,
      description: newTask.description,
      status: "todo",
    };

    setTasks((prev) => [task, ...prev]);

    setNewTask({
      title: "",
      description: "",
    });

    setShowForm(false);
  };

  const updateStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
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

  const pageTitle =
    currentFilter === "all"
      ? "All Tasks"
      : currentFilter.charAt(0).toUpperCase() +
        currentFilter.slice(1);

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
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition"
        >
          + Add Task
        </button>
      </div>

      {/* ADD TASK FORM */}
      {showForm && (
        <form
          onSubmit={handleAddTask}
          className="bg-white border rounded-xl p-6 shadow-sm mb-6"
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
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
              >
                Create Task
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* SEARCH */}
      <div className="bg-white border rounded-xl p-4 mb-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* TASKS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-white border rounded-xl p-6 shadow-sm"
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
                {task.status}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap items-center gap-3 mt-6">

              <select
                value={task.status}
                onChange={(e) =>
                  updateStatus(task.id, e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              >
                <option value="todo">To Do</option>
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
        <div className="bg-white border rounded-xl p-12 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            No tasks found
          </h2>

          <p className="text-gray-400 mt-2">
            Try another search or create a new task.
          </p>
        </div>
      )}

    </div>
  );
};

export default Tasks;