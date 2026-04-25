import { useState } from "react";
import axios from "axios";

const AddBlog = () => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!photo) {
  //     alert("Please select an image");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const formData = new FormData();
  //     formData.append("title", title);
  //     formData.append("description", description);
  //     formData.append("photo", photo);

  //     console.log("TOKEN FROM STORAGE:", localStorage.getItem("token"));

  //     const response = await axios.post(
  //       "http://localhost:5000/api/admin/addBlog",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           // ❌ DO NOT manually set Content-Type
  //         },
  //       }
  //     );

  //     if (response.data.success) {
  //       alert("Photo uploaded successfully!");
  //       setTitle("");
  //       setDescription("");
  //       setPhoto(null);
  //     }
  //   } catch (error) {
  //     console.error("Failed to post photo", error);
  //     alert("Upload failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("photo", photo);

      const response = await axios.post(
        import.meta.env.VITE_BACK_END_URL + "/api/admin/addBlog",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response from backend:", response.data);

      if (response.data.success) {
        alert(response.data.message);
        setTitle("");
        setDescription("");
        setPhoto(null);
      } else {
        alert("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error.response || error);
      alert("Upload failed");
    } finally {
      setLoading(false); // ✅ Always stops loading
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block font-medium mb-2 text-gray-800">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter photo title"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-transparent"
            />
          </div>
          {/* description */}
          <div>
            <label className="block font-medium mb-2 text-gray-800">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter photo description"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 bg-transparent"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block font-medium mb-2 text-gray-800">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              required
              className="w-full rounded-lg border border-gray-300 p-2 bg-transparent"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-semibold disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
