import { useEffect, useState } from "react";
import axios from "axios";
import SectionTitle from "../components/SectionTitle.jsx";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Slider state
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchGallery = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACK_END_URL + "/api/user/fetchPhoto"
      );
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

  const goToPrev = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  if (loading) return <p className="text-center mt-10">Loading gallery...</p>;

  return (
    <div className="space-y-12 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
      <SectionTitle
        eyebrow="Gallery"
        title="Scenes from the road"
        description="A living scrapbook from our guides, photographers, and travelers."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {galleryImages.map((item, index) => (
          <figure
            key={`${item.image_url}-${index}`}
            onClick={() => setSelectedIndex(index)}
            className="group glass-card overflow-hidden rounded-3xl flex flex-col cursor-pointer"
          >
            <img
              src={item.image_url}
              alt={item.name || item.title || "Gallery Image"}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="p-4 glass-panel border-x-0 border-b-0 border-t-white/30 text-sm font-semibold text-slate-800 bg-white/40">
              {item.name || item.title || "Gallery Moment"}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox Overlay */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
            onClick={() => setSelectedIndex(null)}
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {/* Left Arrow */}
          <button 
            className="absolute left-4 md:left-10 text-white hover:text-gray-300 transition-colors p-3 bg-black/50 hover:bg-black/70 rounded-full"
            onClick={goToPrev}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Active Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center">
            <img 
              src={galleryImages[selectedIndex]?.image_url} 
              alt="Expanded gallery" 
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="text-white text-center mt-4 text-lg tracking-wide font-medium">
              {galleryImages[selectedIndex]?.name || galleryImages[selectedIndex]?.title || ""}
            </p>
          </div>

          {/* Right Arrow */}
          <button 
            className="absolute right-4 md:right-10 text-white hover:text-gray-300 transition-colors p-3 bg-black/50 hover:bg-black/70 rounded-full"
            onClick={goToNext}
          >
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}
