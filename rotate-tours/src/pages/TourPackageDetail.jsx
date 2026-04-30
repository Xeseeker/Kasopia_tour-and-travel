import { useMemo, useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
import SEO from '../components/SEO.jsx';
import tourPackages from '../data/tourPackages.json';
import tourPackageImages from '../data/tourPackageImages.js';
import lalibela from '../assets/lalibela.jpg';
import dankil from '../assets/danakil.jpg';
import omo from '../assets/omo.jpg';
import harar from '../assets/harar.jpg';
import addis from '../assets/addis-ababa.jpg';
import combined from '../assets/combined.jpg';

const fallbackCategoryImages = {
  'northern-ethiopia': lalibela,
  'southern-ethiopia': omo,
  'danakil-depression': dankil,
  'eastern-ethiopia': harar,
  'addis-ababa': addis,
  'combined-tours': combined,
};

export default function TourPackageDetail() {
  const { categorySlug, tourSlug } = useParams();
  const [detailContent, setDetailContent] = useState({ loading: true, data: null, error: null });
  const [stepImages, setStepImages] = useState({});

  const category = useMemo(
    () => tourPackages.categories.find((cat) => cat.slug === categorySlug),
    [categorySlug],
  );
  const tour = useMemo(() => category?.tours.find((item) => item.slug === tourSlug), [category, tourSlug]);

  useEffect(() => {
    if (!tour) {
      setDetailContent({ loading: false, data: null, error: 'Tour not found' });
      return;
    }

    let isMounted = true;
    const controller = new AbortController();
    const loadContent = async () => {
      try {
        setDetailContent((prev) => ({ ...prev, loading: true }));
        const response = await fetch(`/tour-details/${tour.slug}.json`, { signal: controller.signal });
        if (!response.ok) throw new Error('Failed to load tour itinerary');
        const data = await response.json();
        if (isMounted) setDetailContent({ loading: false, data, error: null });
      } catch (error) {
        if (!isMounted || error.name === 'AbortError') return;
        setDetailContent({ loading: false, data: null, error: error.message });
      }
    };

    loadContent();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [tour]);

  const itinerarySteps = useMemo(() => {
    if (Array.isArray(detailContent.data?.steps) && detailContent.data.steps.length > 0) {
      return detailContent.data.steps;
    }

    if (!detailContent.data?.text) return [];
    return parseItinerary(detailContent.data.text);
  }, [detailContent.data]);

  const heroImage = useMemo(() => {
    if (!tour) return addis;

    const mappedImage = tourPackageImages[tour.slug];
    if (mappedImage) return mappedImage;

    const fallbackImage = fallbackCategoryImages[category?.id];
    if (fallbackImage) return fallbackImage;

    return addis;
  }, [tour, category]);

  useEffect(() => {
    if (!itinerarySteps.length) {
      setStepImages({});
      return;
    }

    let isMounted = true;

    const loadStepImages = async () => {
      const resolvedEntries = await Promise.all(
        itinerarySteps.map(async (step, index) => {
          const cacheKey = `${step.day || index + 1}-${step.title}`;
          const image = await resolveStepImage(step, tour, category, heroImage);
          return [cacheKey, image];
        }),
      );

      if (!isMounted) {
        return;
      }

      setStepImages(Object.fromEntries(resolvedEntries));
    };

    loadStepImages();

    return () => {
      isMounted = false;
    };
  }, [itinerarySteps, tour, category, heroImage]);

  if (!category || !tour) {
    return (
      <div className="space-y-6 text-center">
        <SectionTitle
          eyebrow="Journey"
          title="Tour not found"
          description="The requested tour could not be located. Please return to the catalog and try again."
          align="center"
        />
        <Button as={Link} to="/tour-packages/addis-ababa-its-surroundings" className="mx-auto">
          Browse tours
        </Button>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={tour.title}
        description={
          detailContent.data?.text?.slice(0, 155) ||
          `${tour.title} itinerary, trip steps, and route planning for Ethiopia with Kasopia Tour & Travel.`
        }
        path={`/tour-packages/${category.slug}/${tour.slug}`}
        keywords={[tour.title, category.name, 'Ethiopia tour package', 'Kasopia Tour & Travel']}
      />
    <div className="space-y-12">
      <div className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-500">{category.name}</p>
        <h1 className="text-4xl md:text-5xl font-display text-dusk">{tour.title}</h1>
        <div className="flex flex-wrap gap-3 text-sm text-slate-500">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-semibold text-dusk">
            <span role="img" aria-label="duration">
              🗓️
            </span>
            {tour.duration}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 font-semibold text-dusk">
            <span role="img" aria-label="location">
              📍
            </span>
            Starts in Addis Ababa
          </span>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl shadow-lg">
        <img src={heroImage} alt={tour.title} className="h-[420px] w-full object-cover" fetchPriority="high" />
      </div>

      {detailContent.loading && <p className="text-center text-slate-500">Loading itinerary...</p>}
      {detailContent.error && (
        <p className="text-center text-red-500">
          {detailContent.error}. Please download the original document for reference.
        </p>
      )}

      {detailContent.data && (
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <SectionTitle
              eyebrow="Itinerary"
              title="Trip steps"
              description="Each day is carefully curated. Review the key highlights below or download the full document."
              titleAs="h2"
            />
            <div className="space-y-8">
              {itinerarySteps.map((step, index) => (
                <article
                  key={step.title + index}
                  className="grid gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-[160px,1fr]"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={
                        stepImages[`${step.day || index + 1}-${step.title}`] ||
                        heroImage
                      }
                      alt={step.title}
                      className="h-40 w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-dusk">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                </article>
              ))}
            </div>

           
          </div>

          <aside className="space-y-8">
            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-display text-dusk">Request offer</h3>
                <p className="text-sm text-slate-500">Selected tour</p>
                <p className="font-semibold text-dusk">{tour.title}</p>
              </div>
              <BookingForm selectedTour={tour.title} />
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
              <div className="p-6 border-b border-slate-100">
                <h3 className="text-xl font-display text-dusk">Kasopia preview</h3>
                <p className="text-sm text-slate-500">Addis Ababa to {getDestinationName(tour.title)}</p>
              </div>
              <iframe
                title="Route preview map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `Addis Ababa to ${getDestinationName(tour.title)}`,
                )}&output=embed`}
                loading="lazy"
                className="h-96 w-full rounded-b-2xl border-0"
                allowFullScreen
              ></iframe>
            </div>
          </aside>
        </div>
      )}
    </div>
    </>
  );
}

function parseItinerary(rawText) {
  const lines = rawText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const steps = [];
  let current = null;

  lines.forEach((line) => {
    if (/^day\s*\d+/i.test(line)) {
      if (current) steps.push(current);
      current = { title: capitalize(line), descriptionLines: [] };
    } else if (current) {
      current.descriptionLines.push(line);
    }
  });

  if (current) steps.push(current);

  if (!steps.length) {
    return [
      {
        title: 'Overview',
        description: lines.join(' '),
      },
    ];
  }

  return steps.map((step) => ({
    title: step.title,
    description: step.descriptionLines.join(' ') || 'Detailed description available in the downloadable document.',
  }));
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getDestinationName(title = '') {
  const tokens = title.split('–')[0] || title.split('-')[0] || title;
  return tokens.trim();
}

const wikipediaImageCache = new Map();

const placeImageMap = [
  { aliases: ['addis ababa', 'addis abeba', 'bole'], pageTitle: 'Addis Ababa' },
  { aliases: ['entoto'], pageTitle: 'Entoto' },
  { aliases: ['trinity cathedral', 'holy trinity'], pageTitle: 'Holy Trinity Cathedral, Addis Ababa' },
  { aliases: ['mercato', 'merkato'], pageTitle: 'Mercato' },
  { aliases: ['adadi maryam'], pageTitle: 'Adadi Maryam' },
  { aliases: ['tiya', 'tiya stele', 'tiya stelae'], pageTitle: 'Tiya (archaeological site)' },
  { aliases: ['debre libanos', 'debrelibanos'], pageTitle: 'Debre Libanos' },
  { aliases: ['wenchi', 'wenchi crater lake'], pageTitle: 'Wonchi' },
  { aliases: ['menagesha', 'suba forest'], pageTitle: 'Menagesha Suba Forest' },
  { aliases: ['debre zeit', 'bishoftu'], pageTitle: 'Bishoftu' },
  { aliases: ['awash'], pageTitle: 'Awash National Park' },
  { aliases: ['bahir dar', 'bahirdar'], pageTitle: 'Bahir Dar' },
  { aliases: ['lake tana', 'zeghe'], pageTitle: 'Lake Tana' },
  { aliases: ['blue nile falls', 'tisisat', 'tis isat'], pageTitle: 'Blue Nile Falls' },
  { aliases: ['gondar', 'gonder'], pageTitle: 'Gondar' },
  { aliases: ['lalibela'], pageTitle: 'Lalibela' },
  { aliases: ['axum', 'aksum'], pageTitle: 'Axum' },
  { aliases: ['simien', 'semen', 'ras dashen'], pageTitle: 'Simien Mountains' },
  { aliases: ['harar', 'harer', 'jugol'], pageTitle: 'Harar' },
  { aliases: ['bale'], pageTitle: 'Bale Mountains National Park' },
  { aliases: ['danakil', 'dallol'], pageTitle: 'Danakil Depression' },
  { aliases: ['erta ale'], pageTitle: 'Erta Ale' },
  { aliases: ['mekele', 'meqele'], pageTitle: 'Mekelle' },
  { aliases: ['tigray'], pageTitle: 'Tigray Region' },
  { aliases: ['arbaminch', 'arba minch', 'arbamich'], pageTitle: 'Arba Minch' },
  { aliases: ['lake chamo'], pageTitle: 'Lake Chamo' },
  { aliases: ['chencha'], pageTitle: 'Chencha' },
  { aliases: ['dorze'], pageTitle: 'Dorze people' },
  { aliases: ['jinka'], pageTitle: 'Jinka' },
  { aliases: ['mursi'], pageTitle: 'Mursi people' },
  { aliases: ['mago'], pageTitle: 'Mago National Park' },
  { aliases: ['turmi'], pageTitle: 'Turmi' },
  { aliases: ['keyafer', 'keyafar', 'kayafer'], pageTitle: 'Key Afer' },
  { aliases: ['dimeka'], pageTitle: 'Dimeka' },
  { aliases: ['karo', 'kara'], pageTitle: 'Karo people (Ethiopia)' },
  { aliases: ['hamar', 'hammar', 'hammer people'], pageTitle: 'Hamer people' },
  { aliases: ['ari village', 'ari villages', 'ari tribe'], pageTitle: 'Aari people' },
  { aliases: ['nyangatom'], pageTitle: 'Nyangatom people' },
  { aliases: ['dassanech', 'dasenech'], pageTitle: 'Daasanach people' },
  { aliases: ['konso'], pageTitle: 'Konso people' },
  { aliases: ['ziway', 'lake ziway'], pageTitle: 'Lake Zway' },
];

async function resolveStepImage(step, tour, category, fallbackImage) {
  const match = getStepImageMatch(step, tour, category);

  if (!match.pageTitle) {
    return fallbackImage;
  }

  const cacheKey = match.pageTitle;
  if (wikipediaImageCache.has(cacheKey)) {
    return wikipediaImageCache.get(cacheKey);
  }

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(match.pageTitle)}`,
    );

    if (!response.ok) {
      wikipediaImageCache.set(cacheKey, fallbackImage);
      return fallbackImage;
    }

    const data = await response.json();
    const imageUrl =
      data.originalimage?.source ||
      data.thumbnail?.source ||
      fallbackImage;

    wikipediaImageCache.set(cacheKey, imageUrl);
    return imageUrl;
  } catch {
    wikipediaImageCache.set(cacheKey, fallbackImage);
    return fallbackImage;
  }
}

function getStepImageMatch(step, tour, category) {
  const searchableText = `${step.title} ${step.description}`.toLowerCase();

  for (const place of placeImageMap) {
    if (place.aliases.some((alias) => searchableText.includes(alias))) {
      return place;
    }
  }

  const cleanedTitle = step.title
    .replace(/^day\s*\d+\s*:?/i, '')
    .replace(/[()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleanedTitle) {
    const pageTitle = cleanedTitle
      .split(/[-–,/]/)
      .map((part) => part.trim())
      .filter(Boolean)
      .find(Boolean);

    if (pageTitle) {
      return { pageTitle };
    }
  }

  return { pageTitle: `${tour.title} ${category?.name || 'Ethiopia'}` };
}

function BookingForm({ selectedTour }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      setStatus('submitting');

      setTimeout(() => {
        console.table({ selectedTour, ...formData });
        setStatus('success');
      }, 600);
    },
    [formData, selectedTour],
  );

  return (
    <form className="space-y-4 p-6" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="selectedTour">
          Selected Tour
        </label>
        <input
          id="selectedTour"
          value={selectedTour}
          readOnly
          className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-dusk"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="fullName">
          Your Full Name*
        </label>
        <input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
          placeholder="First and last name"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="email">
          Your Email*
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="phone">
          Your Phone
        </label>
        <input
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
          placeholder="+251 ..."
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="country">
          Your Country
        </label>
        <input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
          placeholder="Country of residence"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-600" htmlFor="message">
          Additional Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm"
          placeholder="Tell us about your desired dates, group size, or special requests."
        ></textarea>
      </div>
      <Button type="submit" className="w-full justify-center" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Request Offer'}
      </Button>
      {status === 'success' && <p className="text-sm text-green-600">Thanks! We will reach out within 24 hours.</p>}
    </form>
  );
}


