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
    <>
      <NavBar />
      <div style={{ display: "flex", marginTop: "60px" }}>
        <Sidebar />
        <div style={{ flexGrow: 1, padding: "30px", marginLeft: "200px" }}>
          <Routes>
            <Route path="/add-photo" element={<AddPhoto />} />
            <Route path="/add-certificate" element={<AddCertificate />} />
            <Route path="/add-Blog" element={<AddBlog />} />
            <Route path="/Blogs" element={<ViewBlog />} />
            <Route path="/Gallery" element={<ViewGallery />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
