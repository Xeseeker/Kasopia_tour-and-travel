import { Link } from 'react-router-dom';
import tourPackageImages from '../data/tourPackageImages.js';
import lalibela from'../assets/lalibela.jpg'
import dankil from '../assets/danakil.jpg'
import omo from '../assets/omo.jpg'
import harar from '../assets/harar.jpg'
import addis from '../assets/addis-ababa.jpg'
import combined from'../assets/combined.jpg'
// const fallbackCategoryImages = {
//   'northern-ethiopia': 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
//   'southern-ethiopia': 'https://images.unsplash.com/photo-1526682847800-3f5bbbe5013e?auto=format&fit=crop&w=1200&q=80',
//   'danakil-depression': 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
//   'eastern-ethiopia': 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
//   'addis-ababa': 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
//   'combined-tours': 'https://images.unsplash.com/photo-1526682847800-3f5bbbe5013e?auto=format&fit=crop&w=1200&q=80',
// };

const fallbackCategoryImages = {
  'northern-ethiopia': lalibela,
  'southern-ethiopia': omo,
  'danakil-depression': dankil,
  'eastern-ethiopia': harar,
  'addis-ababa': addis,
  'combined-tours': combined,
};

export default function TourPackageCard({ tour, category }) {
  const detailPath = `/tour-packages/${category?.slug}/${tour.slug}`;
  const imageSrc = tourPackageImages[tour.slug] || fallbackCategoryImages[category?.id] || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="group relative overflow-hidden rounded-3xl shadow-lg isolate">
      <div className="relative h-[300px] md:h-[350px] w-full bg-slate-900 border border-slate-200">
        <img
          src={imageSrc}
          alt={tour.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.08]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
        
        {/* Book Now Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <Link
            to={detailPath}
            className="inline-flex glass-panel !bg-white/80 items-center justify-center rounded-lg px-8 py-3 font-bold text-blue-800 transition-all hover:bg-white hover:scale-105 shadow-2xl"
          >
            Book Now
          </Link>
        </div>

        {/* Floating Tour info overlay */}
        <div className="absolute bottom-4 left-4 right-4 glass-panel p-5 rounded-2xl border-white/20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-10">
          <h3 className="text-xl font-display text-white drop-shadow-md leading-tight">{tour.title}</h3>
          <p className="mt-1 text-sm font-semibold text-white/90">{tour.duration}</p>
        </div>
      </div>
    </div>
  );
}

