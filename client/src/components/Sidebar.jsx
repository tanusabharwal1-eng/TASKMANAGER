import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdTaskAlt,
} from "react-icons/md";

import {
  FaTasks,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const linkData = [
  {
    label: "Dashboard",
    link: "dashboard",
    icon: <MdDashboard />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
  {
    label: "Completed",
    link: "completed/completed",
    icon: <MdTaskAlt />,
  },
  {
    label: "In Progress",
    link: "in-progress/in progress",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "To Do",
    link: "todo/todo",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Team",
    link: "team",
    icon: <FaUsers />,
  },
  {
    label: "Trash",
    link: "trashed",
    icon: <FaTrashAlt />,
  },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  const sidebarLinks = user?.isAdmin
    ? linkData
    : linkData.slice(0, 5);

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      
      {/* Logo */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-full">
            <MdOutlineAddTask className="text-white text-2xl" />
          </div>

          <span className="text-2xl font-bold text-black">
            TaskMe
          </span>
          <div className="flex-1 flex flex-col gap-y-5 py-8">
            
        
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4">
        <ul className="space-y-2">
          {sidebarLinks.map((item) => (
            <li key={item.label}>
              <NavLink
                to={`/${item.link}`}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                  }`
                }
              >
                <span className="text-xl">
                  {item.icon}
                </span>

                <span className="font-medium">
                  {item.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;