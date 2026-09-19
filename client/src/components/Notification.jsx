import React, { useEffect, useRef, useState } from "react";
import { MdNotificationsNone, MdClose } from "react-icons/md";

const Notification = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notificationRef = useRef(null);

  // Temporary notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Welcome to TaskMe",
      message: "You are successfully logged in.",
      time: "Just now",
      read: false,
    },
    {
      id: 2,
      title: "Task Manager",
      message: "Create your first task to get started.",
      time: "Today",
      read: false,
    },
  ]);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Number of unread notifications
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  // Remove one notification
  const removeNotification = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) => notification.id !== id
      )
    );
  };

  return (
    <div
      ref={notificationRef}
      className="relative"
    >
      {/* =================================
          Notification Button
      ================================= */}

      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
        aria-label="Notifications"
      >
        <MdNotificationsNone className="text-2xl" />

        {/* Notification Count */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-white">
            {unreadCount}
          </span>
        )}
      </button>


      {/* =================================
          Notification Dropdown
      ================================= */}

      {isOpen && (
        <div className="absolute right-0 top-12 z-50 w-[320px] bg-white rounded-xl border border-gray-200 shadow-xl overflow-hidden">

          {/* Header */}

          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">

            <div>
              <h3 className="text-sm font-bold text-gray-800">
                Notifications
              </h3>

              <p className="text-[11px] text-gray-400 mt-0.5">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${
                      unreadCount > 1 ? "s" : ""
                    }`
                  : "You're all caught up"}
              </p>
            </div>

            {notifications.length > 0 && unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-blue-600 hover:text-blue-700"
              >
                Mark all read
              </button>
            )}

          </div>


          {/* Notification List */}

          <div className="max-h-[320px] overflow-y-auto">

            {notifications.length === 0 ? (

              <div className="px-5 py-10 text-center">

                <MdNotificationsNone className="mx-auto text-4xl text-gray-300" />

                <p className="mt-2 text-sm font-medium text-gray-500">
                  No notifications
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  You're all caught up!
                </p>

              </div>

            ) : (

              notifications.map((notification) => (

                <div
                  key={notification.id}
                  className={`relative flex gap-3 px-4 py-4 border-b border-gray-100 last:border-b-0 transition-colors ${
                    notification.read
                      ? "bg-white"
                      : "bg-blue-50/50"
                  }`}
                >

                  {/* Unread indicator */}

                  <div className="pt-1">

                    <span
                      className={`block w-2 h-2 rounded-full ${
                        notification.read
                          ? "bg-gray-300"
                          : "bg-blue-600"
                      }`}
                    />

                  </div>


                  {/* Notification Content */}

                  <div className="flex-1 min-w-0">

                    <h4 className="text-xs font-semibold text-gray-800">
                      {notification.title}
                    </h4>

                    <p className="mt-1 text-[11px] leading-4 text-gray-500">
                      {notification.message}
                    </p>

                    <p className="mt-1 text-[10px] text-gray-400">
                      {notification.time}
                    </p>

                  </div>


                  {/* Remove */}

                  <button
                    type="button"
                    onClick={() =>
                      removeNotification(notification.id)
                    }
                    className="self-start text-gray-300 hover:text-red-500 transition-colors"
                    aria-label="Remove notification"
                  >
                    <MdClose className="text-base" />
                  </button>

                </div>

              ))

            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default Notification;