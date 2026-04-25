import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Button from './Button.jsx';

export default function HeroSlider({ slides = [] }) {
  return (
    <div className="relative text-white">
      <Swiper
        modules={[Autoplay, Pagination, EffectCoverflow, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        effect="coverflow"
        coverflowEffect={{
          rotate: 0,
          stretch: -40,
          depth: 200,
          modifier: 1,
          scale: 0.9,
          slideShadows: false,
        }}
        centeredSlides
        loop
        spaceBetween={0}
        slidesPerView="auto"
        className="h-[520px] sm:h-[580px] xl:h-[640px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title} className="!flex !h-auto w-full max-w-[1100px]">
            <Link
              to={slide.packageLink || slide.primaryCta?.to || '#'}
              className="group relative block h-full w-full overflow-hidden rounded-[20px] bg-hero-gradient shadow-soft"
            >
              <img src={slide.image} alt={slide.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="relative z-10 flex h-full flex-col justify-center px-6 py-10 sm:px-14 max-w-3xl">
                <div className="glass-panel p-8 sm:p-12 rounded-3xl animate-fade-in-up">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#e2e8f0] opacity-90">{slide.eyebrow}</p>
                  <h1 className="mt-4 text-4xl sm:text-5xl xl:text-6xl font-display leading-tight text-white drop-shadow-md">{slide.title}</h1>
                  <p className="mt-5 text-base sm:text-lg text-white/90 drop-shadow-sm font-medium">{slide.copy}</p>
                  <div className="mt-8 flex flex-wrap gap-4">
                  {slide.primaryCta && (
                    <Button
                      as={slide.primaryCta.to ? Link : 'a'}
                      to={slide.primaryCta.to}
                      href={slide.primaryCta.href}
                      target={slide.primaryCta.external ? '_blank' : undefined}
                      rel={slide.primaryCta.external ? 'noreferrer' : undefined}
                    >
                      {slide.primaryCta.label}
                    </Button>
                  )}
                  {slide.secondaryCta && (
                    <Button
                      as={slide.secondaryCta.to ? Link : 'a'}
                      to={slide.secondaryCta.to}
                      href={slide.secondaryCta.href}
                      variant="secondary"
                      className="backdrop-blur border border-white/40"
                    >
                      {slide.secondaryCta.label}
                    </Button>
                  )}
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
