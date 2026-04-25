import { useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import logo from '../assets/logo.jpg'
const whyTravelWithUs = [
  {
    title: 'Local Knowledge',
    description: "Our guides are born and raised in Ethiopia. Their deep understanding of the country's culture, languages, and hidden gems ensures an immersive and respectful travel experience.",
  },
  {
    title: 'Custom Itineraries',
    description: 'Whether you seek adventure, history, nature, or spiritual journeys, we tailor tours to fit your interests, time, and budget.',
  },
  {
    title: 'Responsible Tourism',
    description: 'We prioritize sustainable travel, partnering with local communities to ensure tourism benefits everyone involved.',
  },
  {
    title: 'Reliable Service',
    description: 'From the moment you arrive to your final farewell, our team offers 24/7 support, high-quality transportation, and accommodations that meet international standards.',
  },
];

const whatWeOffer = [
  {
    title: 'Cultural Tours',
    description: "Dive into Ethiopia's history and traditions with visits to ancient sites, local communities, and vibrant markets.",
  },
  {
    title: 'Adventure Expeditions',
    description: "Trek the Simien Mountains, explore the Danakil Depression, or discover the Omo Valley's tribal heritage.",
  },
  {
    title: 'Customized Itineraries',
    description: 'Tailor-made trips to suit your interests, timeline, and travel style.',
  },
  {
    title: 'Luxury & Comfort Travel',
    description: 'Experience Ethiopia in style with curated high-end tours.',
  },
];

const whyChooseKasopia = [
  {
    title: 'Local Expertise',
    description: 'Our team includes seasoned guides and insiders who know Ethiopia intimately.',
  },
  {
    title: 'Personalized Service',
    description: 'We listen to your dreams and design journeys that reflect your unique spirit of adventure.',
  },
  {
    title: 'Seamless Logistics',
    description: 'With a founder skilled in aviation and hospitality, we ensure smooth, stress-free travel from start to finish.',
  },
  {
    title: 'Commitment to Sustainability',
    description: 'We support local economies and protect the environments we explore.',
  },
];

export default function About() {
  const [logoError, setLogoError] = useState(false);

  return (
    <div className="space-y-20 max-w-7xl mx-auto px-6 sm:px-10">
      {/* About Us Section */}
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 p-12 sm:p-16 text-center space-y-6 shadow-soft">
          <div className="flex flex-col items-center gap-6">
            {/* Logo Image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center overflow-hidden bg-white shadow-lg">
              {!logoError ? (
                <img 
                 src={logo}
                 
                  alt="Kasopia Tours and Adventure Logo" 
                  className="w-full h-full object-cover rounded-full"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="text-4xl sm:text-5xl font-display text-white font-bold">KT</div>
              )}
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display text-white">
                About Us
              </h1>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-white">
                <span className="text-yellow-300">Kasopia</span> Tours and Adventure
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed max-w-6xl mx-auto">
          <p>
            Welcome to Kasopia Tours and Adventure, your trusted gateway to the heart of Africa's most ancient and vibrant land. Based in Addis Ababa, we are a locally owned and operated tour company dedicated to sharing the diverse beauty, deep history, and rich cultural heritage of Ethiopia with travelers from around the world.
          </p>
          <p>
            At Kasopia Tours and Adventure, we believe travel is more than just sightseeing — it's about connection, authenticity, and unforgettable experiences. Whether you're walking through the rock-hewn churches of Lalibela, trekking the majestic Simien Mountains, exploring the unique tribes of the Omo Valley, or witnessing the dramatic landscapes of the Danakil Depression, our expert guides ensure your journey is safe, insightful, and personalized.
          </p>
          <p>
            Welcome to Kasopia Tours and Adventure, where we turn journeys into unforgettable stories and adventures into lifelong memories. Based in the heart of Ethiopia, Addis Ababa, we are your trusted partners in exploring the raw beauty, rich culture, and uncharted wonders of Ethiopia and beyond.
          </p>
        </div>
      </div>

      {/* Why Travel With Us */}
      <section className="space-y-10">
        <SectionTitle eyebrow="Why Travel With Us?" title="Experience Ethiopia with confidence" align="center" />
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {whyTravelWithUs.map((item, index) => (
            <div key={index} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <h3 className="text-xl font-display text-dusk mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="space-y-8">
        <SectionTitle eyebrow="Who We Are" title="Our Story" align="center" />
        <div className="max-w-6xl mx-auto space-y-6 text-base sm:text-lg text-slate-700 leading-relaxed">
          <p>
            Kasopia Tours and Adventure was born from a passion for discovery and a deep love for Ethiopia's diverse landscapes and traditions. Founded by a former air hostess with years of experience in global travel, our company combines insider knowledge, professionalism, and a spirit of adventure to deliver exceptional travel experiences. We understand travel from both sides—the logistics and the magic—and we blend them seamlessly to give you the best of both worlds.
          </p>
        </div>
      </section>

      {/* Vision and Mission */}
      <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
          <h3 className="text-2xl font-display text-dusk mb-4">Our Vision</h3>
          <p className="text-slate-600">
            To be a leading Ethiopian tour operator known for promoting responsible travel, cultural appreciation, and genuine hospitality.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
          <h3 className="text-2xl font-display text-dusk mb-4">Our Mission</h3>
          <p className="text-slate-600 mb-4">
            To offer authentic, safe, and enriching travel experiences that showcase the wonders of Ethiopia while empowering local communities and preserving our heritage.
          </p>
          <p className="text-slate-600">
            To inspire and empower travelers through authentic, well-crafted adventures that connect them with people, nature, and culture. We aim to:
          </p>
          <ul className="mt-4 space-y-2 text-slate-600 list-disc list-inside">
            <li>Provide safe, immersive, and personalized travel experiences.</li>
            <li>Promote sustainable and responsible tourism.</li>
            <li>Showcase the hidden gems and iconic sites of Ethiopia with integrity and passion.</li>
          </ul>
        </div>
      </div>

      {/* What We Offer */}
      <section className="space-y-10">
        <SectionTitle eyebrow="What We Offer" title="Our Specializations" align="center" />
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {whatWeOffer.map((item, index) => (
            <div key={index} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
              <h3 className="text-xl font-display text-dusk mb-3">{index + 1}. {item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Kasopia */}
      <section className="space-y-10">
        <SectionTitle eyebrow="Why Choose Kasopia?" title="What sets us apart" align="center" />
        <div className="grid gap-6 md:grid-cols-2 max-w-6xl mx-auto">
          {whyChooseKasopia.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
              <h3 className="text-xl font-display text-dusk mb-3">· {item.title}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visit Us */}
      <section className="space-y-8">
        <SectionTitle eyebrow="Visit Us" title="Our Office & Address" align="center" />
        <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr] max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden shadow-soft border border-slate-100">
            <iframe
              title="Kasopia Tours Office Location"
              src="https://www.google.com/maps?q=Kasopia%20Tours%20and%20Adventure,%20Addis%20Ababa,%20Ethiopia&output=embed"
              loading="lazy"
              className="w-full h-96 border-0"
              allowFullScreen
            ></iframe>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-soft border border-slate-100 space-y-4">
            <h3 className="text-2xl font-display text-dusk">Kasopia Tours and Adventure</h3>
            <p className="text-slate-600 leading-relaxed">
              Bole, Addis Ababa, Ethiopia<br />
              (Near the airport area)
            </p>
            <div className="space-y-2 text-slate-700">
              <p><span className="font-semibold">Phone:</span> +251 911 234 567</p>
              <p><span className="font-semibold">Email:</span> info@kasopiatours.com</p>
            </div>
            <p className="text-sm text-slate-500">
              Stop by to plan your next adventure or meet our team in person.
            </p>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="space-y-8">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-slate-100 bg-gradient-to-br from-blue-50 to-white p-10 shadow-soft text-center space-y-6">
            <h3 className="text-3xl font-display text-dusk">Our Promise</h3>
            <p className="text-lg text-slate-700 leading-relaxed">
              At Kasopia Tours and Adventure, we don't just show you places—we help you live them. Whether you're summiting peaks, sharing coffee with locals, or tracing the footsteps of ancient civilizations, we promise an adventure that will move you, change you, and stay with you forever.
            </p>
            <p className="text-xl font-display text-blue-700 mt-8">
              Let's explore together. Your adventure starts with Kasopia.
            </p>
            <p className="text-slate-600 italic mt-4">
              — The Kasopia Tours and Adventure Team
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
