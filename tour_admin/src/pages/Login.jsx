import { useNavigate } from "react-router-dom";
import coverImage from "../assets/Cover-image.png";
import logoImage from "../assets/Cover-image.png"; // replace with your actual logo
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACK_END_URL + "/api/login",
        {
          username,
          password,
        }
      );
      if (res.data.success) {
        navigate("/admin/add-photo");
        const token = res.data.token;

        // Store token in localStorage
        localStorage.setItem("token", token);
      }
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-md"></div>

      {/* Login card */}
      <div className="relative z-10 w-full max-w-4xl flex rounded-3xl overflow-hidden ">
        {/* Left: Logo */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <img
            src={logoImage}
            alt="Logo"
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-white/70"></div>

        {/* Right: Form + Welcome */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Welcome Back!</h2>
          <p className="mb-6 text-white/90">
            Please login to access your admin dashboard
          </p>

          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-lg border border-white/60 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-6 rounded-lg border border-white/60 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full mt-20 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
