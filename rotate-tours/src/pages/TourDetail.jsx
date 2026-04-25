import { useParams, Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import tours from '../data/tours.json';

export default function TourDetail() {
  const { slug } = useParams();
  const tour = tours.find((item) => item.slug === slug);

  if (!tour) {
    return (
      <div className="space-y-4 text-center">
        <SectionTitle eyebrow="Tour" title="Journey not found" align="center" />
        <Button as={Link} to="/tours" className="mx-auto">
          Explore all tours
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="relative overflow-hidden rounded-[40px] bg-dusk text-white">
        <img src={tour.image} alt={tour.title} className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="relative z-10 space-y-6 p-10">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-200">{tour.category} • {tour.duration}</p>
          <h1 className="text-4xl font-display">{tour.title}</h1>
          <p className="max-w-3xl text-lg text-white/80">{tour.description}</p>
          <div className="flex flex-wrap gap-6 text-sm">
            <span>Group size: {tour.groupSize}</span>
            <span>Investment: ${tour.price}</span>
            <span>Best season: {tour.season}</span>
            <span>Difficulty: {tour.difficulty}</span>
          </div>
          <Button as={Link} to="/contact" variant="secondary">
            Request availability
          </Button>
        </div>
      </div>

      <section className="space-y-8">
        <SectionTitle title="Highlights" description="What to expect day-to-day" />
        <div className="grid gap-6 md:grid-cols-3">
          {tour.highlights.map((highlight, index) => (
            <div key={highlight} className="rounded-3xl bg-white p-6 shadow-soft">
              <p className="text-sm font-semibold text-brand-500">Day {index + 1}</p>
              <p className="mt-2 text-lg font-display text-dusk">{highlight}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionTitle title="Gallery" description="Select scenes from this itinerary." />
        <div className="grid gap-4 md:grid-cols-3">
          {tour.gallery.map((image) => (
            <img key={image} src={image} alt="Tour gallery" className="h-64 w-full rounded-3xl object-cover" />
          ))}
        </div>
      </section>
    </div>
  );
}
