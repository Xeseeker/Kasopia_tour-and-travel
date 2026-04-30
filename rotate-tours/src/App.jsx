import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Tours from './pages/Tours.jsx';
import DestinationPage from './pages/DestinationPage.jsx';
import CategoryTours from './pages/CategoryTours.jsx';
import TourDetail from './pages/TourDetail.jsx';
import TourPackageCategory from './pages/TourPackageCategory.jsx';
import TourPackageDetail from './pages/TourPackageDetail.jsx';
import Gallery from './pages/Gallery.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contact from './pages/Contact.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/lalibela" element={<DestinationPage destinationKey="lalibela" />} />
        <Route path="/tours/simien" element={<DestinationPage destinationKey="simien" />} />
        <Route path="/tours/danakil" element={<DestinationPage destinationKey="danakil" />} />
        <Route path="/tours/axum" element={<DestinationPage destinationKey="axum" />} />
        <Route path="/tours/category/:categorySlug" element={<CategoryTours />} />
        <Route path="/tours/:slug" element={<TourDetail />} />
        <Route path="/tour-packages/:categorySlug" element={<TourPackageCategory />} />
        <Route path="/tour-packages/:categorySlug/:tourSlug" element={<TourPackageDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
