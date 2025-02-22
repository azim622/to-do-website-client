import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProver";
import TaskFile from "./TaskFile.jsx/TaskFile";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext); // ✅ Fix: Use `logOut` instead of `signOut`
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut(); // ✅ Fix: Call correct function
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">TaskManagement</h1>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-indigo-600 text-xl">
                    {user.displayName || "User"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <TaskFile></TaskFile>
            </main>
    </div>
  );
};

export default Dashboard;
