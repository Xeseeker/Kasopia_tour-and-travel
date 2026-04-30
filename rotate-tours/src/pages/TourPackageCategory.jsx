import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import TourPackageCard from '../components/TourPackageCard.jsx';
import Button from '../components/Button.jsx';
import SEO from '../components/SEO.jsx';
import tourPackagesData from '../data/tourPackages.json';

export default function TourPackageCategory() {
  const { categorySlug } = useParams();

  const category = useMemo(() => {
    return tourPackagesData.categories.find(
      (cat) => cat.slug === categorySlug
    );
  }, [categorySlug]);

  if (!category) {
    return (
      <div className="space-y-6 text-center">
        <SectionTitle
          eyebrow="Tours"
          title="Category not found"
          description="The requested tour category could not be found."
          align="center"
          titleAs="h1"
        />
        <Button as={Link} to="/tours" className="mx-auto">
          Back to tours
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={category.name}
        description={`Explore ${category.name} itineraries and curated tour packages across Ethiopia with Kasopia Tour & Travel.`}
        path={`/tour-packages/${category.slug}`}
      />
      <div className="space-y-12">
        <SectionTitle
          eyebrow="Tour Packages"
          title={category.name}
          description="Explore our carefully curated tour packages in this category. Click 'View Details' to see the full itinerary and information."
          titleAs="h1"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {category.tours.map((tour) => (
            <TourPackageCard
              key={tour.id}
              tour={tour}
              category={category}
            />
          ))}
        </div>

        <div className="rounded-3xl bg-brand-500/10 p-10 text-center">
          <p className="text-xl font-display text-brand-700">Need a customized tour?</p>
          <p className="mt-2 text-slate-600">Contact us to create a personalized itinerary tailored to your preferences.</p>
          <Button as={Link} to="/contact" className="mt-6">
            Contact Us
          </Button>
        </div>
      </div>
    </>
  );
}
