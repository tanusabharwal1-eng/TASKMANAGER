import React, { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Admin User",
      email: "admin@taskme.com",
      role: "Admin",
      status: "Active",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Member",
  });

  const handleAddUser = (e) => {
    e.preventDefault();

    if (!newUser.name.trim() || !newUser.email.trim()) {
      return;
    }

    const user = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
    };

    setUsers((prev) => [...prev, user]);

    setNewUser({
      name: "",
      email: "",
      role: "Member",
    });

    setShowForm(false);
  };

  const deleteUser = (id) => {
    setUsers((prev) =>
      prev.filter((user) => user.id !== id)
    );
  };

  return (
    <div className="p-6 md:p-8">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Team
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your team members
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium"
        >
          + Add User
        </button>
      </div>

      {/* ADD USER FORM */}
      {showForm && (
        <form
          onSubmit={handleAddUser}
          className="bg-white border rounded-xl p-6 shadow-sm mb-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-5">
            Add Team Member
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Full name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  name: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email address"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({
                  ...newUser,
                  role: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="Member">Member</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="flex gap-3 mt-5">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700"
            >
              Add User
            </button>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* USER TABLE */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Name
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Email
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">

              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>

                      <span className="font-medium text-gray-800">
                        {user.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteUser(user.id)}
                      disabled={user.role === "Admin"}
                      className="text-red-500 hover:text-red-700 disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="p-12 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No team members
            </h2>

            <p className="text-gray-400 mt-2">
              Add a user to your team.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Users;