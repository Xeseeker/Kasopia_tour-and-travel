import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function TestimonialSlider({ testimonials = [] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          }
        }}
        className="pb-14"
      >
        {testimonials.map((testi) => (
          <SwiperSlide key={testi.id} className="h-auto pb-4">
            <div className="flex flex-col p-8 rounded-3xl bg-white shadow-soft h-full border border-slate-100 relative">
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(testi.rating || 5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 italic mb-8 grow">"{testi.description}"</p>
              <div className="flex items-center gap-4 mt-auto">
                <img 
                  src={testi.image_url} 
                  alt={testi.name} 
                  className="w-14 h-14 rounded-full object-cover shadow-sm"
                />
                <div>
                  <h4 className="font-semibold text-dusk">{testi.name}</h4>
                  <p className="text-xs text-slate-500">{testi.role || 'Traveler'}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
