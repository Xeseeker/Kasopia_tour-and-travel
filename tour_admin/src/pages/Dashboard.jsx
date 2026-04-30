import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import AddPhoto from "./AddPhoto";
import AddCertificate from "./AddCertificate";
import NavBar from "../components/NavBar";
import AddBlog from "./AddBlog";
import ViewBlog from "./ViewBlog";
import ViewGallery from "./ViewGallery";
import ChangePassword from "./ChangePassword";
import AdminTestimonials from "./AdminTestimonials";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/"); // redirect to login if no token
    }
  }, [token, navigate]);

  if (!token) {
    return null; // or a loading spinner while redirecting
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 min-w-0">
        <NavBar />
        <main className="flex-1 p-6 md:p-10 overflow-auto mt-16">
          <Routes>
            <Route path="/add-photo" element={<AddPhoto />} />
            <Route path="/add-certificate" element={<AddCertificate />} />
            <Route path="/add-Blog" element={<AddBlog />} />
            <Route path="/Blogs" element={<ViewBlog />} />
            <Route path="/Gallery" element={<ViewGallery />} />
            <Route path="/testimonials" element={<AdminTestimonials />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
