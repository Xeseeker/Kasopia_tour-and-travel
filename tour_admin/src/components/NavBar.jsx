import React from "react";
import { useNavigate } from "react-router-dom";

import { LogOut, Bell } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="bg-white border-b border-slate-200 fixed top-0 w-[calc(100%-16rem)] ml-64 h-16 flex justify-between items-center px-8 shadow-sm z-30">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-slate-800">Dashboard Overview</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <div className="h-6 w-px bg-slate-200"></div>
        <button 
          onClick={logout} 
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-red-600 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}

export default NavBar;
