import React, { useEffect, useRef, useState } from "react";
import {
  MdKeyboardArrowDown,
  MdLogout,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const userEmail =
    sessionStorage.getItem("userEmail") || "User";

  const avatarLetter =
    userEmail !== "User"
      ? userEmail.charAt(0).toUpperCase()
      : "U";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userEmail");

    setIsOpen(false);

    navigate("/log-in");
  };

  return (
    <div
      ref={profileRef}
      className="relative"
    >

      {/* Profile Button */}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-all duration-200"
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >

        {/* Avatar */}

        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
          {avatarLetter}
        </div>

        {/* User Email */}

        <div className="hidden sm:block text-left max-w-[150px]">

          <p className="text-xs font-semibold text-gray-800 truncate">
            {userEmail}
          </p>

          <p className="text-[10px] text-gray-400">
            My Account
          </p>

        </div>

        <MdKeyboardArrowDown
          className={`text-gray-400 text-lg transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />

      </button>


      {/* Profile Dropdown */}

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[260px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">

          {/* Profile Header */}

          <div className="px-4 py-4 bg-gray-50 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                {avatarLetter}
              </div>

              <div className="min-w-0">

                <p className="text-sm font-semibold text-gray-800 truncate">
                  {userEmail}
                </p>

                <p className="text-[11px] text-gray-400 mt-0.5">
                  TaskMe User
                </p>

              </div>

            </div>

          </div>


          {/* Logout */}

          <div className="p-2">

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >

              <span className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                <MdLogout className="text-lg text-red-500" />
              </span>

              <span className="text-sm font-medium">
                Logout
              </span>

            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default ProfileMenu;