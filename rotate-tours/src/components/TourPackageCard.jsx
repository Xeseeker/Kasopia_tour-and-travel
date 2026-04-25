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
    <div className="group relative overflow-hidden">
      <div className="relative h-[300px] md:h-[350px] w-full">
        <img
          src={imageSrc}
          alt={tour.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-0" />
        
        {/* Book Now Button - appears on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={detailPath}
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:scale-105 shadow-lg"
          >
            Book Now
          </Link>
        </div>

        {/* Tour info overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <h3 className="text-xl font-display text-white">{tour.title}</h3>
          <p className="mt-2 text-sm text-white/90">{tour.duration}</p>
        </div>
      </div>
    </div>
  );
}

