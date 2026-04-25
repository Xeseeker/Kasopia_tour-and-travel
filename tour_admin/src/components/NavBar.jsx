import React from "react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="bg-blue-300 fixed top-0 left-0 w-full h-16 flex justify-between items-center px-6 shadow-md z-50">
      <h1 className="text-l font-bold">Admin Dashboard</h1>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default NavBar;
