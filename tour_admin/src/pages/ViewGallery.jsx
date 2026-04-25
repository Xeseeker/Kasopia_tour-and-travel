import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Pencil, X } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";

const ViewGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACK_END_URL + "/api/admin/fetchPhoto",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // ensure photos is always an array
      console.log(res.data);
      setPhotos(Array.isArray(res.data.photos) ? res.data.photos : []);
    } catch (err) {
      console.error("Failed to fetch photos", err);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePhoto = async (id) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await axios.delete(
        import.meta.env.VITE_BACK_END_URL + `/api/admin/deletePhoto/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // remove deleted photo from state
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } catch (err) {
      console.error("Failed to delete photo", err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingPhoto) return;

    try {
      setEditLoading(true);
      const formData = new FormData();
      formData.append("title", editTitle);
      if (editFile) formData.append("photo", editFile);

      const res = await axios.put(
        import.meta.env.VITE_BACK_END_URL + `/api/admin/editPhoto/${editingPhoto.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        // Update local state to reflect UI changes
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === editingPhoto.id
              ? { ...p, title: editTitle, image_url: res.data.imageUrl || p.image_url }
              : p
          )
        );
        closeEditModal();
      }
    } catch (err) {
      console.error("Failed to edit photo:", err.response || err);
      alert("Edit failed");
    } finally {
      setEditLoading(false);
    }
  };

  const closeEditModal = () => {
    setEditingPhoto(null);
    setEditTitle("");
    setEditFile(null);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading gallery...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Global Gallery</h1>
        <p className="mt-1 text-sm text-slate-500">Manage uploaded photography from your travelers and guides.</p>
      </div>

      {photos.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <p className="text-slate-500 font-medium">No images found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <Card key={photo.id}>
              <CardContent>
                <img
                  src={photo.image_url} // <-- match backend field
                  alt={photo.title}
                  className="w-full h-48 object-cover rounded-xl"
                />

                <div className="mt-3 flex items-center justify-between">
                  <h2 className="text-lg font-medium truncate">
                    {photo.title}
                  </h2>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      onClick={() => {
                        setEditingPhoto(photo);
                        setEditTitle(photo.title);
                      }}
                    >
                      <Pencil size={18} className="text-slate-600" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deletePhoto(photo.id)}
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Modal Overlay */}
      {editingPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800">Edit Photo</h3>
              <button onClick={closeEditModal} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Update Image (Optional)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setEditFile(e.target.files[0])}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                  {editLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewGallery;
