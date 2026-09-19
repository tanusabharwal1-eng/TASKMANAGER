import React, { useState } from "react";
import { MdNotificationsNone } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const userEmail =
    sessionStorage.getItem("userEmail") || "User";

  const displayName = userEmail.includes("@")
    ? userEmail.split("@")[0]
    : userEmail;

  const avatarLetter =
    displayName.charAt(0).toUpperCase();

  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userEmail");

    navigate("/log-in");
  };

  return (
    <div className="w-full flex items-center justify-end gap-4 px-6 md:px-8 py-5 bg-[#f8f9fa]">

      {/* NOTIFICATION */}
      <div className="relative">

        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
          }}
          className="relative w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:shadow-md transition"
        >
          <MdNotificationsNone className="text-gray-700 text-2xl" />

          {/* Notification count */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            2
          </span>
        </button>

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

      {/* PROFILE */}
      <div className="relative">

        <button
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
          }}
          className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-3 py-2 hover:shadow-md transition"
        >

          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {avatarLetter}
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              {displayName}
            </p>

            <p className="text-xs text-gray-400">
              My Account
            </p>
          </div>

          <FaChevronDown className="text-gray-400 text-xs mr-1" />

        </button>

        {showProfile && (
          <div className="absolute right-0 top-14 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">

            <div className="px-4 py-4 border-b border-gray-200">
              <p className="font-semibold text-gray-800">
                {displayName}
              </p>

              <p className="text-xs text-gray-400 mt-1 break-all">
                {userEmail}
              </p>
            </div>

            <div className="p-2">

              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition text-sm font-medium"
              >
                Logout
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Navbar;