import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Destinations from '@/pages/Destinations';
import DestinationDetail from '@/pages/DestinationDetail';
import Packages from '@/pages/Packages';
import PackageDetail from '@/pages/PackageDetail';
import Hotels from '@/pages/Hotels';
import HotelDetail from '@/pages/HotelDetail';
import Experiences from '@/pages/Experiences';
import Blog from '@/pages/Blog';
import BlogDetail from '@/pages/BlogDetail';
import Deals from '@/pages/Deals';
import Wishlist from '@/pages/Wishlist';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import TravelerDashboard from '@/pages/TravelerDashboard';
import VendorDashboard from '@/pages/VendorDashboard';
import DashboardRedirect from '@/pages/DashboardRedirect';
import Settings from '@/pages/Settings';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} storageKey="holidayapp-theme">
      <AuthProvider>
        <CurrencyProvider>
          <BrowserRouter>
            <AppShell />
          </BrowserRouter>
        </CurrencyProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppShell = () => {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen transition-colors duration-300 bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:id" element={<DestinationDetail />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={['traveler', 'vendor', 'admin']}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['traveler', 'vendor', 'admin']}>
                  <DashboardRedirect />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/traveler"
              element={
                <ProtectedRoute allowedRoles={['traveler']}>
                  <TravelerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isDashboardRoute && <Footer />}
        <Toaster />
      </div>
    </>
  );
};
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
