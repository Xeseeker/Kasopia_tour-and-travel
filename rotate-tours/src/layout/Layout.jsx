import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#d6d3d3] text-dusk">
      <Navbar />
      <main className="pt-40 pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
