# Rotate Ethiopia Tours — React + Tailwind

A modern React rebuild of [rotateethiopiatours.com](https://www.rotateethiopiatours.com/) with refreshed typography, gradients, responsive layouts, mock data, and smooth interactions.

## ✨ Highlights
- React (Vite) + React Router DOM
- Tailwind CSS with custom theme + gradients + soft shadows
- Reusable system: `Button`, `SectionTitle`, `TourCard`, `BlogCard`, `HeroSlider`, `Layout`
- Pages: Home, About, All Tours, Tour Category, Tour Detail, Gallery, Blog, Blog Detail, Contact
- Hero slider powered by Swiper.js with autoplay + fade transitions
- Mock JSON data (`src/data/`) for tours and blog posts
- Responsive navbar with mobile drawer + polished footer
- Contact form styled with Tailwind Forms plugin (no backend)

## 🗂️ Project structure
```
src/
├── assets/               # Static assets (optional placeholders)
├── components/           # Reusable UI pieces
├── data/                 # `tours.json`, `blog.json`
├── layout/               # Navbar, Footer, Layout wrapper
├── pages/                # Route-level pages
├── App.jsx               # Route configuration
└── main.jsx              # App bootstrap with BrowserRouter
```

## 🚀 Getting started
```bash
npm install
npm run dev      # dev server with HMR
npm run build    # production build (outputs to dist/)
npm run preview  # preview production build
```

Then open the printed local URL (default http://localhost:5173).

## 🛠️ Editing tips
- Update colors, spacing, or typography via `tailwind.config.js`.
- Update tour/blog copy in `src/data/*.json` — components consume the JSON directly.
- Add new pages inside `src/pages/` and register the route in `src/App.jsx`.

## 📄 Notes
- All components use plain JavaScript (no TypeScript) as requested.
- External images rely on Unsplash URLs for realistic placeholders.
- Contact form is frontend-only; wire it to your backend or service when ready.
