import { useParams, Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import SEO from '../components/SEO.jsx';
import tours from '../data/tours.json';

const slugAliases = {
  axum: 'historic-axum-expedition',
  danakil: 'danakil-depression-expedition',
  lalibela: 'lalibela-midnight-mass',
};

export default function TourDetail() {
  const { slug } = useParams();
  const resolvedSlug = slugAliases[slug] || slug;
  const tour = tours.find((item) => item.slug === resolvedSlug);

  if (!tour) {
    return (
      <div className="space-y-4 text-center">
        <SectionTitle eyebrow="Tour" title="Journey not found" align="center" titleAs="h1" />
        <Button as={Link} to="/tours" className="mx-auto">
          Explore all tours
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={tour.title}
        description={tour.description}
        path={`/tours/${slug}`}
        keywords={[tour.title, tour.region, 'Ethiopia tours', 'Kasopia Tour & Travel']}
      />

      <article className="space-y-12">
        <div className="relative overflow-hidden rounded-[40px] bg-dusk text-white">
          <img
            src={tour.image}
            alt={tour.title}
            className="absolute inset-0 h-full w-full object-cover opacity-40"
            fetchPriority="high"
          />
          <header className="relative z-10 space-y-6 p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-200">
              {tour.category} • {tour.duration}
            </p>
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
          </header>
        </div>

        <section className="space-y-8">
          <SectionTitle title="Highlights" description="What to expect day-to-day" titleAs="h2" />
          <div className="grid gap-6 md:grid-cols-3">
            {tour.highlights.map((highlight, index) => (
              <article key={highlight} className="rounded-3xl bg-white p-6 shadow-soft">
                <p className="text-sm font-semibold text-brand-500">Day {index + 1}</p>
                <h3 className="mt-2 text-lg font-display text-dusk">{highlight}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <SectionTitle title="Gallery" description="Select scenes from this itinerary." titleAs="h2" />
          <div className="grid gap-4 md:grid-cols-3">
            {tour.gallery.map((image) => (
              <img
                key={image}
                src={image}
                alt={`${tour.title} gallery`}
                className="h-64 w-full rounded-3xl object-cover"
                loading="lazy"
              />
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
