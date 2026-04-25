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
    <div className="min-h-screen w-full flex bg-white hidden sm:flex">
      {/* Left: Branding Image panel */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 border-r border-slate-200">
        <img
          src={coverImage}
          alt="Kasopia Cover"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
        
        <div className="relative z-10 w-full flex flex-col justify-between p-12">
          <div className="bg-white/10 backdrop-blur-md self-start p-4 rounded-2xl border border-white/20">
            <img src={logoImage} alt="Logo" className="w-16 h-16 object-contain" />
          </div>
          <div className="text-white space-y-4">
            <h1 className="text-4xl font-display font-medium tracking-wide">Kasopia Operations</h1>
            <p className="text-slate-200 text-lg max-w-md">Secure portal to manage tours, blog posts, gallery images, and administrative workflows.</p>
          </div>
        </div>
      </div>

      {/* Right: Login Form panel */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8 absolute top-10 lg:static">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-500">
              Please enter your credentials to access the dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Username</label>
                <div className="mt-1">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 rounded-xl border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter your username"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <div className="mt-1">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-4 py-3 rounded-xl border border-slate-300 shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors active:scale-[0.98]"
              >
                Sign in to Dashboard
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
