import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StarRating = ({ rating }) => {
  if (!rating) {
    return null;
  }

  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 ${index < rating ? "opacity-100" : "opacity-20"}`}
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81H7.03a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_URL}/api/testimonials`
        );
        setTestimonials(
          Array.isArray(response.data.testimonials) ? response.data.testimonials : []
        );
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-72 rounded-[28px] border border-slate-200 bg-white/70 p-6 shadow-sm"
          >
            <div className="h-full animate-pulse rounded-[20px] bg-slate-100" />
          </div>
        ))}
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/80 px-6 py-12 text-center text-slate-500">
        Testimonials will appear here soon.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      className="px-2 sm:px-4"
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
        className="pb-14"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="h-auto">
            <motion.article
              whileHover={{ y: -8, scale: 1.01 }}
              className="group flex h-full min-h-[320px] flex-col rounded-[28px] border border-slate-200 bg-white/90 p-7 shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Guest Story
                </span>
              </div>

              <p className="flex-1 text-base leading-7 text-slate-700">
                "{testimonial.message}"
              </p>

              <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-5">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-14 w-14 rounded-full object-cover ring-4 ring-slate-50"
                  />
                ) : (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-base font-semibold text-slate-500">
                    {testimonial.name?.slice(0, 1)?.toUpperCase() || "T"}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-dusk">{testimonial.name}</h3>
                  {testimonial.location ? (
                    <p className="truncate text-sm text-slate-500">{testimonial.location}</p>
                  ) : (
                    <p className="truncate text-sm text-slate-400">Traveler</p>
                  )}
                </div>
              </div>
            </motion.article>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
}
