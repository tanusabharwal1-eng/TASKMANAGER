import React from "react";

import {
  MdAdd,
  MdTaskAlt,
  MdPendingActions,
  MdAssignment,
} from "react-icons/md";

import Notification from "../components/Notification";
import ProfileMenu from "../components/ProfileMenu";

const Dashboard = () => {
  const userEmail =
    sessionStorage.getItem("userEmail") || "User";

  return (
    <div className="min-h-screen bg-gray-50 p-5 md:p-7">

      {/* =================================
          HEADER
      ================================= */}

      <div className="flex items-start justify-between mb-7">

        {/* Dashboard Title */}

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {userEmail}
          </p>
        </div>


        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Notification */}

          <Notification />

          {/* Profile */}

          <ProfileMenu />

        </div>

      </div>


      {/* =================================
          STATISTICS
      ================================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Tasks */}

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-gray-500">
                Total Tasks
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                0
              </h2>

            </div>

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

              <MdAssignment className="text-xl text-blue-600" />

            </div>

          </div>

        </div>


        {/* Completed */}

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-gray-500">
                Completed
              </p>

              <h2 className="text-2xl font-bold text-green-600 mt-2">
                0
              </h2>

            </div>

            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">

              <MdTaskAlt className="text-xl text-green-600" />

            </div>

          </div>

        </div>


        {/* In Progress */}

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-gray-500">
                In Progress
              </p>

              <h2 className="text-2xl font-bold text-blue-600 mt-2">
                0
              </h2>

            </div>

            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

              <MdPendingActions className="text-xl text-blue-600" />

            </div>

          </div>

        </div>


        {/* To Do */}

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-medium text-gray-500">
                To Do
              </p>

              <h2 className="text-2xl font-bold text-orange-500 mt-2">
                0
              </h2>

            </div>

            <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">

              <MdPendingActions className="text-xl text-orange-500" />

            </div>

          </div>

        </div>

      </div>


      {/* =================================
          RECENT TASKS
      ================================= */}

      <div className="mt-7 bg-white rounded-xl shadow-sm border border-gray-100">

        {/* Recent Tasks Header */}

        <div className="flex items-center justify-between p-5 border-b border-gray-100">

          <div>

            <h2 className="text-lg font-semibold text-gray-800">
              Recent Tasks
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Your latest tasks will appear here.
            </p>

          </div>


          {/* Add Task Button */}

          <button
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >

            <MdAdd className="text-base" />

            Add Task

          </button>

        </div>


        {/* Empty State */}

        <div className="p-10 text-center">

          <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">

            <MdAssignment className="text-2xl text-blue-400" />

          </div>

          <p className="mt-4 text-sm font-medium text-gray-500">
            No tasks available yet.
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Create a task to see it here.
          </p>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;