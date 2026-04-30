import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../components/HeroSlider.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import TourCard from "../components/TourCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Button from "../components/Button.jsx";
import TourPackageCard from "../components/TourPackageCard.jsx";
import CertificateSlider from "../components/CertificateSlider.jsx";
import Testimonials from "../components/Testimonials.jsx";
import SEO from "../components/SEO.jsx";
// import tours from "../data/tours.json";
// import posts from "../data/blog.json";
import tourPackagesData from "../data/tourPackages.json";
import bgImage from "../assets/bg-image.jpg";
import lalibela from "../assets/lalibela.jpg";
import dankil from "../assets/danakil.jpg";
import omo from "../assets/omo.jpg";
import harar from "../assets/harar.jpg";

// const stats = [
//   { number: '14+', label: 'Years curating journeys' },
//   { number: '120+', label: 'Local partners empowered' },
//   { number: '4.9/5', label: 'Average guest rating' },
//   { number: '24/7', label: 'Concierge coverage' },
// ];

const heroImageMap = {
  "northern-ethiopia": lalibela,
  "southern-ethiopia": omo,
  "danakil-depression": dankil,
  "eastern-ethiopia": harar,
};

export default function Home() {
  const [certificate, setCertificate] = useState([]);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACK_END_URL + "/api/user/fetchCertificate"
        );
        console.log(response.data);
        if (response.data.success) {
          setCertificate(response.data.photos);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCertificate();
  }, []);

  const popularCategoryOrder = [
    "northern-ethiopia",
    "southern-ethiopia",
    "danakil-depression",
    "eastern-ethiopia",
  ];
  const popularCategoryDescriptions = {
    "northern-ethiopia":
      "Lalibela rock-hewn marvels, Simien Highlands, and Axum’s ancient legacy.",
    "southern-ethiopia":
      "Omo Valley tribes, rift-valley lakes, and lush coffee heartlands.",
    "danakil-depression":
      "Alien salt flats, Erta Ale lava flows, and technicolor mineral springs.",
    "eastern-ethiopia":
      "Harar’s walled city, Bale wildlife, and storied Islamic heritage.",
  };

  const popularCategories = popularCategoryOrder
    .map((id) =>
      tourPackagesData.categories.find((category) => category.id === id)
    )
    .filter(Boolean);

  const heroSlides = popularCategories.map((category) => ({
    eyebrow: "Regional Signature",
    title: category.name,
    copy: popularCategoryDescriptions[category.id],
    image: heroImageMap[category.id],
    packageLink: `/tour-packages/${category.slug}`,
    primaryCta: {
      label: "View itineraries",
      to: `/tour-packages/${category.slug}`,
    },
  }));

  const fullBleed =
    "relative left-1/2 right-1/2 w-screen -translate-x-1/2 px-6 sm:px-10 ";

  return (
    <>
      <SEO
        title="Explore Ethiopia"
        description="Kasopia Tour & Travel designs Ethiopia journeys across Lalibela, Simien Mountains, Danakil Depression, Axum, Omo Valley, and beyond."
        path="/"
        keywords={[
          "Kasopia Tour & Travel",
          "Ethiopia tours",
          "Lalibela tours",
          "Danakil Depression tours",
          "Simien Mountains tours",
          "Axum tours",
        ]}
      />
    <div className="space-y-24 ">
      <div className={`${fullBleed}`}>
        <HeroSlider slides={heroSlides} titleAs="h2" />
      </div>

      <div className={fullBleed}>
        <section className="space-y-8 py-12 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0, animationFillMode: 'forwards' }}>
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-display text-dusk">
              {" "}
              <span className="text-blue-700">Kassopia</span> Ethiopia
            </h1>
            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Welcome to Kassopia Ethiopia, your premier gateway to
                discovering the extraordinary beauty, rich history, and vibrant
                culture of one of Africa's most captivating destinations. We are
                passionate about creating unforgettable travel experiences that
                showcase the diverse landscapes, ancient traditions, and warm
                hospitality that make Ethiopia truly unique.
              </p>
              
              <p>
                At Kassopia Ethiopia, we believe that travel is more than just
                visiting places—it's about connecting with people, understanding
                traditions, and creating lasting memories. Whether you're
                seeking adventure in the Simien Mountains, cultural immersion
                with indigenous communities, or spiritual exploration through
                ancient monasteries, we design itineraries that align perfectly
                with your interests and travel style.
              </p>
            </div>
          </div>
        </section>
      </div>

      <div className={`${fullBleed} relative `}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 py-12">
          <section className="space-y-12 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0, animationFillMode: 'forwards' }}>
            <SectionTitle
              eyebrow="Top Popular Ethiopia Tours"
              title="North to South, Danakil to the East"
              description="Browse our most requested regional circuits—each anchored by vetted guides, immersive culture, and effortless logistics."
            />
            <div className="space-y-10 ">
              {popularCategories.map((category) => (
                <div
                  key={category.id}
                  className="rounded-[32px] border border-white/70 bg-white/10 shadow-soft overflow-hidden"
                >
                  <div className="p-8 pb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-200">
                          {category.name}
                        </p>
                        <p className="mt-2 text-base text-slate-900">
                          {popularCategoryDescriptions[category.id]}
                        </p>
                      </div>
                      <Button
                        as={Link}
                        to={`/tour-packages/${category.slug}`}
                        variant="secondary"
                      >
                        View all
                      </Button>
                    </div>
                  </div>
                  {(() => {
                    const displayedTours = category.tours.slice(0, 3);
                    const tourCount = displayedTours.length;

                    // Use different layout for 2 vs 3 tours
                    if (tourCount === 2) {
                      return (
                        <div className="grid gap-4 md:grid-cols-2 xl:flex xl:justify-center xl:gap-6">
                          {displayedTours.map((tour) => (
                            <div
                              key={tour.id}
                              className="xl:flex-1 xl:max-w-md"
                            >
                              <TourPackageCard
                                tour={tour}
                                category={category}
                              />
                            </div>
                          ))}
                        </div>
                      );
                    }

                    return (
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {displayedTours.map((tour) => (
                          <TourPackageCard
                            key={tour.id}
                            tour={tour}
                            category={category}
                          />
                        ))}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {Array.isArray(certificate) && certificate.length > 0 ? (
        <div className={`${fullBleed} bg-slate-50 py-12`}>
          <section className="space-y-8 max-w-7xl mx-auto">
            <SectionTitle
              eyebrow="Our Certifications"
              title="Recognized Excellence"
              description="We are proud to be recognized for our commitment to quality and service excellence."
            />
            <div className="pt-8">
              <CertificateSlider certificates={certificate} />
            </div>
          </section>
        </div>
      ) : (
        <div className="hidden">Certificates will be displayed here when available</div>
      )}

      {/* Testimonials Section */}
      <div className={`${fullBleed} py-12`}>
        <section className="space-y-8 max-w-7xl mx-auto">
          <SectionTitle
            eyebrow="Guest Stories"
            title="What Our Travelers Say"
            description="Read firsthand accounts from our guests who have explored the wonders of Ethiopia with us."
          />
          <div className="pt-8">
            <Testimonials />
          </div>
        </section>
      </div>
    </div>
    </>
  );
}
