import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Home from '@/pages/Home';
import Destinations from '@/pages/Destinations';
import Packages from '@/pages/Packages';
import PackageDetail from '@/pages/PackageDetail';
import Hotels from '@/pages/Hotels';
import Experiences from '@/pages/Experiences';
import Blog from '@/pages/Blog';
import Deals from '@/pages/Deals';
import Wishlist from '@/pages/Wishlist';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/packages" element={<Packages />} />
              <Route path="/packages/:id" element={<PackageDetail />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

const NotFound = () => (
  <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <a
        href="/"
        className="inline-block px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
      >
        Go Home
      </a>
    </div>
  </div>
);

export default App;
