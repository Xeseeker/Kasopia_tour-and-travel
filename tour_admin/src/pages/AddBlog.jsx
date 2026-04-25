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
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add Blog Post</h1>
        <p className="mt-1 text-sm text-slate-500">Publish new articles, guides, or updates to the public blog.</p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm rounded-xl p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10 Best Places to Visit in Ethiopia"
              required
              className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Post Content / Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write the main content of your blog post here..."
              required
              rows="6"
              className="w-full bg-white border border-slate-300 text-slate-900 placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow resize-y"
            />
          </div>

          {/* Photo */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Cover Image
            </label>
            <label className="flex flex-col items-center justify-center w-full h-[200px] border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-blue-500 transition-colors bg-slate-50/50 group">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
                required
              />
              <div className="flex flex-col items-center">
                <p className="text-slate-700 text-lg font-medium group-hover:text-blue-600 transition-colors">
                  {photo ? photo.name : "Click to select a cover image"}
                </p>
              </div>
            </label>
          </div>

          {/* Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors rounded-lg px-8 py-2.5 font-semibold shadow-sm disabled:opacity-50"
            >
              {loading ? "Publishing..." : "Publish Blog Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
