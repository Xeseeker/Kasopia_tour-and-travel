import { useMemo, useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle.jsx';
import Button from '../components/Button.jsx';
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
    if (!detailContent.data?.text) return [];
    return parseItinerary(detailContent.data.text);
  }, [detailContent.data]);

  const heroImage = useMemo(() => {
    if (!tour) return 'https://source.unsplash.com/1600x900/?ethiopia';

    const mappedImage = tourPackageImages[tour.slug];
    if (mappedImage) return mappedImage;

    const fallbackImage = fallbackCategoryImages[category?.id];
    if (fallbackImage) return fallbackImage;

    return `https://source.unsplash.com/1600x900/?ethiopia,${tour.slug}`;
  }, [tour, category]);

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
    <div className="space-y-12">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">{category.name}</p>
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
        <img src={heroImage} alt={tour.title} className="h-[420px] w-full object-cover" loading="lazy" />
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
            />
            <div className="space-y-8">
              {itinerarySteps.map((step, index) => (
                <article
                  key={step.title + index}
                  className="grid gap-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm md:grid-cols-[160px,1fr]"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={`https://source.unsplash.com/800x600/?ethiopia,${tour.slug},day-${index + 1}`}
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


