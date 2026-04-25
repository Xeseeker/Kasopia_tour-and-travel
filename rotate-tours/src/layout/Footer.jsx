import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/footer.png'

const footerLinks = [
  {
    title: 'Journeys',
    links: [
      { label: 'All Tours', to: '/tours' },
      { label: 'Adventure', to: '/tours/category/adventure' },
      { label: 'Culture', to: '/tours/category/culture' },
      { label: 'Bespoke', to: '/contact' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Facebook', href: 'https://facebook.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
];

const languages = [
  { code: 'am', label: 'Amharic' },
  { code: 'ar', label: 'Arabic' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'de', label: 'German' },
  { code: 'iw', label: 'Hebrew' },
  { code: 'it', label: 'Italian' },
  { code: 'es', label: 'Spanish' },
];

const DEFAULT_LANGUAGE = 'en';

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState(DEFAULT_LANGUAGE);

  const applyLanguage = useCallback((lang, attempt = 0) => {
    if (typeof window === 'undefined') return;
    if (typeof window.doGTranslate !== 'function') {
      if (attempt < 10) {
        setTimeout(() => applyLanguage(lang, attempt + 1), 400);
      }
      return;
    }
    window.doGTranslate(`en|${lang}`);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      applyLanguage(savedLanguage);
    }
  }, [applyLanguage]);

  const handleLanguageChange = (event) => {
    const nextLanguage = event.target.value;
    setSelectedLanguage(nextLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredLanguage', nextLanguage);
    }
    applyLanguage(nextLanguage);
  };

  return (
   <footer
  className="relative mt-24 bg-cover bg-center text-sand overflow-hidden"
  style={{ backgroundImage: `url(${bgImage})` }}
>
  {/* Blur + dark overlay */}
  <div className="absolute inset-0 backdrop-blur-sm bg-black/40"></div>

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 space-y-12">
    <div className="grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2 space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-brand-300">
          Kasopia tour and Travel
        </p>
        <h3 className="text-3xl font-display">
          Crafted journeys across Ethiopia's wild soul.
        </h3>
        <p className="text-sm text-sand/70">
          Licensed Ethiopian tour operator curating small-group and bespoke experiences since 2011.
        </p>
      </div>

      {footerLinks.map((section) => (
        <div key={section.title} className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-200">
            {section.title}
          </h4>
          <ul className="space-y-2">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  className="text-sand/80 hover:text-white"
                  to={link.to}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-6">
        {socials.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold tracking-wide"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="flex flex-col gap-2 text-sm">
        <label
          htmlFor="language-selector"
          className="uppercase tracking-[0.2em] text-brand-200"
        >
          Language
        </label>
        <select
          id="language-selector"
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="rounded-full bg-white px-4 py-2 text-dusk font-semibold focus:outline-none focus:ring-2 focus:ring-brand-300"
        >
          {languages.map((language) => (
            <option key={language.code} value={language.code}>
              {language.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-sand/60 text-center md:text-right">
        © {new Date().getFullYear()} Kasopia Tours and Adventure. All rights reserved.
      </p>
    </div>
  </div>
</footer>

  );
}
