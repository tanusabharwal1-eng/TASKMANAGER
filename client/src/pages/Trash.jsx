import React, { useState } from "react";

const Trash = () => {
  const [deletedTasks, setDeletedTasks] = useState([
    {
      id: 1,
      title: "Old project meeting",
      description: "Meeting task that was removed.",
      deletedAt: "Today",
    },
    {
      id: 2,
      title: "Unused design task",
      description: "Old design work.",
      deletedAt: "Yesterday",
    },
  ]);

  const restoreTask = (id) => {
    setDeletedTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const permanentlyDelete = (id) => {
    setDeletedTasks((prev) =>
      prev.filter((task) => task.id !== id)
    );
  };

  const emptyTrash = () => {
    setDeletedTasks([]);
  };

  return (
    <div className="p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Trash
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your deleted tasks
          </p>
        </div>

        {deletedTasks.length > 0 && (
          <button
            onClick={emptyTrash}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-medium"
          >
            Empty Trash
          </button>
        )}
      </div>

      {/* DELETED TASKS */}
      {deletedTasks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

          {deletedTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border rounded-xl p-6 shadow-sm"
            >

              <div className="flex items-start justify-between gap-4">

                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    {task.description}
                  </p>

                  <p className="text-xs text-gray-400 mt-3">
                    Deleted: {task.deletedAt}
                  </p>
                </div>

                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                  Deleted
                </span>

              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 mt-6">

                <button
                  onClick={() => restoreTask(task.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Restore
                </button>

                <button
                  onClick={() => permanentlyDelete(task.id)}
                  className="border border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Delete Permanently
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        /* EMPTY STATE */
        <div className="bg-white border rounded-xl p-16 text-center shadow-sm">

          <div className="text-5xl mb-4">
            🗑️
          </div>

          <h2 className="text-xl font-semibold text-gray-700">
            Trash is empty
          </h2>

          <p className="text-gray-400 mt-2">
            Deleted tasks will appear here.
          </p>

        </div>
      )}

    </div>
  );
};

export default Trash;