import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function CertificateSlider({ certificates = [] }) {
  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="relative w-full max-w-6xl mx-auto px-12">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={true}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          }
        }}
        className="pb-14"
      >
        {certificates.map((cert) => (
          <SwiperSlide key={cert.id} className="h-auto pb-4">
            <div className="flex flex-col sm:flex-row items-center gap-6 p-8 rounded-3xl bg-white shadow-soft h-full border border-slate-100 hover:shadow-md transition-shadow">
              <img 
                src={cert.image_url} 
                alt={cert.name || 'Certificate'} 
                className="w-32 h-32 object-contain shrink-0"
              />
              <div className="text-center sm:text-left flex-1">
                <h3 className="text-xl font-display font-semibold text-dusk">{cert.name || 'Recognized Certificate'}</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {cert.description || "Awarded for outstanding excellence, commitment to quality service, and ensuring highly memorable travel experiences."}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
