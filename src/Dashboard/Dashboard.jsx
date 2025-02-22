import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProver";
import TaskFile from "./TaskFile.jsx/TaskFile";
import { Menu, X, LogOut, User, LogIn } from "lucide-react"; 

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <header className="bg-white shadow-md fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-gray-900">Task Management</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <div className="flex items-center gap-3">
                  <User className="text-indigo-600" size={20} />
                  <span className="text-lg text-gray-800">{user.displayName || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <LogOut size={18} /> Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                <LogIn size={18} /> Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md px-6 py-4 absolute w-full">
            {user ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <User className="text-indigo-600" size={20} />
                  <span className="text-lg text-gray-800">{user.displayName || "User"}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <LogOut size={18} /> Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                <LogIn size={18} /> Login
              </button>
            )}
          </div>
        )}
      </header>

      {/* ✅ Main Content */}
      <main className="max-w-7xl mx-auto py-24 px-6">
        <TaskFile />
      </main>
    </div>
  );
};

export default Dashboard;
