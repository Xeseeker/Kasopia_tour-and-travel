import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import TourCard from '../components/TourCard.jsx';
import Button from '../components/Button.jsx';
import tours from '../data/tours.json';

export default function CategoryTours() {
  const { categorySlug } = useParams();
  const displayName = useMemo(() => categorySlug?.replace(/-/g, ' '), [categorySlug]);
  const matchingTours = tours.filter((tour) => tour.category.toLowerCase() === displayName?.toLowerCase());

  if (!matchingTours.length) {
    return (
      <div className="space-y-6 text-center">
        <SectionTitle eyebrow="Journeys" title="Category coming soon" description="We are updating this collection. Choose another or build something bespoke." align="center" />
        <Button as={Link} to="/tours" className="mx-auto">
          Back to tours
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="Collection"
        title={`${displayName} Journeys`}
        description="Carefully paced itineraries curated for this specific travel style."
      />
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {matchingTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
