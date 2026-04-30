import { Link, Navigate, useParams } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import Button from '../components/Button.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import lalibelaImage from '../assets/lalibela.jpg';
import danakilImage from '../assets/danakil.jpg';
import axumImage from '../assets/axum.webp';
import simienImage from '../assets/gondar.png';

const destinations = {
  lalibela: {
    title: 'Lalibela Tours',
    description:
      'Explore Lalibela rock-hewn churches with Kasopia Tour & Travel through immersive Ethiopia tours, cultural encounters, and carefully paced itineraries.',
    image: lalibelaImage,
    eyebrow: 'Historic Ethiopia',
    heading: 'Lalibela tours and sacred stone architecture',
    intro:
      'Travel to Lalibela for Ethiopia’s most iconic rock-hewn churches, living spiritual traditions, and highland views shaped by centuries of devotion.',
    highlights: [
      'Visit the UNESCO-listed rock-hewn churches with knowledgeable local guides.',
      'Plan around sunrise, liturgy, and market days for a deeper cultural experience.',
      'Pair Lalibela with Gondar, Axum, or Addis Ababa for a stronger northern circuit.',
    ],
    primaryCta: '/tour-packages/northern-ethiopia-tours',
  },
  simien: {
    title: 'Simien Mountains Tours',
    description:
      'Discover Simien Mountains tours in Ethiopia with trekking routes, wildlife sightings, and highland scenery arranged by Kasopia Tour & Travel.',
    image: simienImage,
    eyebrow: 'Highland Adventure',
    heading: 'Simien Mountains trekking and scenic Ethiopia escapes',
    intro:
      'The Simien Mountains combine dramatic escarpments, endemic wildlife, and some of the strongest trekking landscapes in East Africa.',
    highlights: [
      'Build routes around viewpoints, village trails, and gelada baboon habitats.',
      'Combine Simien with Gondar and Lalibela for a balanced history-and-nature itinerary.',
      'Choose gentle scenic drives or more demanding multi-day trekking departures.',
    ],
    primaryCta: '/tour-packages/northern-ethiopia-tours/10-days-northern-ethiopia-tours',
  },
  danakil: {
    title: 'Danakil Depression Tours',
    description:
      'Book Danakil Depression tours in Ethiopia with expert logistics, Erta Ale volcano access, salt flat visits, and desert planning by Kasopia Tour & Travel.',
    image: danakilImage,
    eyebrow: 'Extreme Landscapes',
    heading: 'Danakil Depression expeditions across salt, lava, and desert',
    intro:
      'Danakil is one of Ethiopia’s most intense landscapes, known for volcanic terrain, Afar desert culture, and surreal mineral formations.',
    highlights: [
      'Plan around Dallol, Erta Ale, and desert road logistics with experienced operators.',
      'Use a dry-season route structure that protects comfort and reliability.',
      'Combine Danakil with Tigray churches or northern history for a broader expedition.',
    ],
    primaryCta: '/tour-packages/danakil-depression-tours',
  },
  axum: {
    title: 'Axum Tours',
    description:
      'Visit Axum in northern Ethiopia with Kasopia Tour & Travel for stelae fields, sacred history, and curated routes through one of Ethiopia’s great ancient cities.',
    image: axumImage,
    eyebrow: 'Ancient Legacy',
    heading: 'Axum journeys through Ethiopia’s royal and religious past',
    intro:
      'Axum offers monumental stelae, royal history, and a deep connection to Ethiopia’s ancient identity and Christian heritage.',
    highlights: [
      'Explore Axum’s archaeological landmarks with strong historical context.',
      'Pair Axum with Gondar, Lalibela, and Bahir Dar for a classic northern route.',
      'Shape departures around heritage depth, pace, and internal flight efficiency.',
    ],
    primaryCta: '/tour-packages/northern-ethiopia-tours/17-days-north-and-harar-tours',
  },
};

export default function DestinationPage({ destinationKey }) {
  const { destinationSlug } = useParams();
  const resolvedKey = destinationKey || destinationSlug;
  const destination = destinations[resolvedKey];

  if (!destination) {
    return <Navigate to="/tours" replace />;
  }

  return (
    <>
      <SEO
        title={destination.title}
        description={destination.description}
        path={`/tours/${resolvedKey}`}
        keywords={[
          destination.title,
          'Ethiopia tours',
          'Kasopia Tour & Travel',
          resolvedKey,
        ]}
      />

      <article className="space-y-12">
        <header className="relative overflow-hidden rounded-[36px] bg-slate-900 text-white">
          <img
            src={destination.image}
            alt={destination.title}
            className="absolute inset-0 h-full w-full object-cover opacity-45"
            fetchPriority="high"
          />
          <div className="relative z-10 space-y-6 px-8 py-16 sm:px-12">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">
              {destination.eyebrow}
            </p>
            <h1 className="max-w-4xl text-4xl font-display leading-tight sm:text-5xl">
              {destination.heading}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-white/90">{destination.intro}</p>
            <div className="flex flex-wrap gap-4">
              <Button as={Link} to={destination.primaryCta}>
                View related itinerary
              </Button>
              <Button as={Link} to="/contact" variant="secondary">
                Plan this route
              </Button>
            </div>
          </div>
        </header>

        <section className="space-y-8">
          <SectionTitle
            eyebrow="Why Visit"
            title={`Plan ${destination.title.toLowerCase()} with stronger route context`}
            description={destination.description}
            titleAs="h2"
            align="left"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {destination.highlights.map((highlight) => (
              <article
                key={highlight}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-display text-dusk">{highlight}</h3>
              </article>
            ))}
          </div>
        </section>
      </article>
    </>
  );
}
