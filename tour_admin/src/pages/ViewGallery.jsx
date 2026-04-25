import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";

const ViewGallery = () => {
  const [photos, setPhotos] = useState([]); // always start as array
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading gallery...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Gallery</h1>

      {photos.length === 0 ? (
        <p className="text-gray-500">No images found.</p>
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

                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deletePhoto(photo.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewGallery;
