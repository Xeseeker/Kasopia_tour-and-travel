import { useEffect, useState } from "react";
import axios from "axios";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACK_END_URL + "/api/user/fetchPhoto"
      );

      console.log(response.data);
      if (response.data.success) {
        setGalleryImages(response.data.photos);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading gallery...</p>;

  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Gallery"
        title="Scenes from the road"
        description="A living scrapbook from our guides, photographers, and travelers."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {galleryImages.map((item, index) => (
          <figure
            key={`${item.image_url}-${index}`}
            className="group overflow-hidden rounded-3xl"
          >
            <img
              src={item.image_url}
              alt={item.name || item.title || "Gallery Image"}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="mt-2 text-sm text-slate-500">
              {item.name || item.title || ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
