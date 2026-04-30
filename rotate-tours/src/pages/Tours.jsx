import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import TourPackageCard from '../components/TourPackageCard.jsx';
import Button from '../components/Button.jsx';
import tourPackagesData from '../data/tourPackages.json';
import SEO from '../components/SEO.jsx';

export default function Tours() {
  const filters = useMemo(
    () => [
      { slug: 'All', name: 'All' },
      ...tourPackagesData.categories.map((category) => ({ slug: category.slug, name: category.name })),
    ],
    [],
  );

  const allTours = useMemo(
    () =>
      tourPackagesData.categories.flatMap((category) =>
        category.tours.map((tour) => ({
          ...tour,
          category,
        })),
      ),
    [],
  );

  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTours =
    activeCategory === 'All' ? allTours : allTours.filter((tour) => tour.category.slug === activeCategory);

  return (
    <>
      <SEO
        title="Ethiopia Tours"
        description="Browse Kasopia Tour & Travel itineraries across Lalibela, Danakil, Axum, Omo Valley, Bale Mountains, and more Ethiopia destinations."
        path="/tours"
        keywords={['Ethiopia tours', 'Kasopia Tour & Travel', 'tour packages Ethiopia']}
      />
    <div className="space-y-12">
      <SectionTitle
        eyebrow="All Tours"
        title="Every Kasopia tour itinerary"
        description="Browse every itinerary from all folders—each with its cover image. Choose a category to narrow down, then open for details and downloads."
        titleAs="h1"
      />

      <div className="flex flex-wrap gap-3">
        {filters.map((category) => (
          <button
            key={category.slug}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              activeCategory === category.slug ? 'bg-dusk text-white' : 'bg-white text-slate-600 shadow'
            }`}
            onClick={() => setActiveCategory(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredTours.map((tour) => (
          <TourPackageCard key={tour.id} tour={tour} category={tour.category} />
        ))}
      </div>

      <div className="rounded-3xl bg-brand-500/10 p-10 text-center">
        <p className="text-xl font-display text-brand-700">Want a bespoke or family departure?</p>
        <p className="mt-2 text-slate-600">Share your wish list and our design studio will craft a private departure within 72 hours.</p>
        <Button as={Link} to="/contact" className="mt-6">
          Request custom build
        </Button>
      </div>
    </div>
    </>
  );
}
