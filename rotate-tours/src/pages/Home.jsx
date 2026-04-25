import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroSlider from "../components/HeroSlider.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import TourCard from "../components/TourCard.jsx";
import BlogCard from "../components/BlogCard.jsx";
import Button from "../components/Button.jsx";
import TourPackageCard from "../components/TourPackageCard.jsx";
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
    <div className="space-y-24 ">
      <div className={`${fullBleed} bg-black/50`}>
        <HeroSlider slides={heroSlides} />
      </div>

      <div className={fullBleed}>
        <section className="space-y-8 py-12">
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-display text-dusk">
              {" "}
              <span className="text-blue-700">Kassopia</span> Ethiopia
            </h2>
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
                With years of expertise in curating exceptional journeys across
                this remarkable country, we specialize in crafting personalized
                tours that take you from the rock-hewn churches of Lalibela to
                the dramatic landscapes of the Danakil Depression, from the
                tribal cultures of the Omo Valley to the historic routes of
                Northern Ethiopia. Our deep local knowledge and extensive
                network of trusted partners ensure that every moment of your
                adventure is seamless, authentic, and deeply meaningful.
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
          className="absolute inset-0 bg-cover bg-center blur-md"
          style={{ backgroundImage: `url(${bgImage})` }}
        ></div>
        <div className="relative z-10">
          <section className="space-y-12">
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
                        <p className="text-lg uppercase tracking-[0.4em] text-blue-800">
                          {category.name}
                        </p>
                        <p className="mt-2 text-base text-slate-600">
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
        <div className={fullBleed}>
          <section className="space-y-8 py-12">
            <SectionTitle
              eyebrow="Our Certifications"
              title="Recognized Excellence"
              description="We are proud to be recognized for our commitment to quality and service excellence."
            />
            <div className="flex flex-wrap justify-center items-center gap-8 py-8">
              {certificate.map((cert) => (
                <img
                  key={cert.id}
                  src={cert.image_url}
                  alt={cert.title || "Certificate"}
                  className="h-32 w-auto rounded-lg shadow-md"
                />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <p>Certificates will be displayed here when available</p>
      )}
    </div>
  );
}
