import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Trash from "./pages/Trash";
import Users from "./pages/Users";
import TaskDetails from "./pages/TaskDetails";

import Sidebar from "./components/Sidebar";

import { Toaster } from "sonner";


function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  // Temporary authentication
  const loggedIn = sessionStorage.getItem("loggedIn");

  const isAuthenticated =
    user || loggedIn === "true";

  // If user is not logged in
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/log-in"
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>

    </div>
  );
}


function App() {
  return (
    <>
      <Routes>

        {/* Protected Routes */}
        <Route element={<Layout />}>

          {/* Root */}
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          {/* Tasks */}
          <Route
            path="/tasks"
            element={<Tasks />}
          />

          {/* Completed */}
          <Route
            path="/completed/:status"
            element={<Tasks />}
          />

          {/* In Progress */}
          <Route
            path="/in-progress/:status"
            element={<Tasks />}
          />

          {/* To Do */}
          <Route
            path="/todo/:status"
            element={<Tasks />}
          />

          {/* Team */}
          <Route
            path="/team"
            element={<Users />}
          />

          {/* Trash */}
          <Route
            path="/trashed"
            element={<Trash />}
          />

          {/* Task Details */}
          <Route
            path="/task/:id"
            element={<TaskDetails />}
          />

        </Route>

        {/* Login */}
        <Route
          path="/log-in"
          element={<Login />}
        />

      </Routes>

      <Toaster
        richColors
        position="top-right"
      />
    </>
  );
}

export default App;