import { Link } from 'react-router-dom';
import Button from './Button.jsx';

export default function TourCard({ tour, compact = false }) {
  return (
    <article className="group glass-card rounded-3xl overflow-hidden flex flex-col">
      <div className="relative">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-card-overlay" />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 text-xs font-semibold text-white">
          <span className="px-3 py-1 rounded-full glass-panel border border-white/30 text-white drop-shadow-sm">{tour.category}</span>
          <span className="px-3 py-1 rounded-full bg-brand-500 text-white">{tour.duration}</span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-4">
        <div>
          <p className="text-sm font-semibold tracking-wider uppercase text-brand-500">{tour.region}</p>
          <h3 className="text-2xl font-display text-dusk">{tour.title}</h3>
          <p className="mt-2 text-slate-600">
            {compact ? tour.tagline : tour.description}
          </p>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{tour.groupSize}</span>
          <span className="font-semibold text-dusk">Starting at ${tour.price}</span>
        </div>
        <Button as={Link} to={`/tours/${tour.slug}`} className="justify-center">
          View Journey
        </Button>
      </div>
    </article>
  );
}
