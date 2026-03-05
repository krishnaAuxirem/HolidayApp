import { motion } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/hooks/useWishlist';
import { packages } from '@/data/packages';
import PackageCard from '@/components/PackageCard';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();
  const { wishlist, removeFromWishlist } = useWishlist();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login to View Wishlist</h2>
          <p className="text-gray-600 mb-6">Save your favorite packages and access them anytime</p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    );
  }

  const wishlistPackages = packages.filter((pkg) => wishlist.includes(pkg.id));

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="h-10 w-10 text-red-500 fill-red-500" />
              <h1 className="text-4xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <p className="text-gray-600">
              {wishlistPackages.length} saved {wishlistPackages.length === 1 ? 'package' : 'packages'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {wishlistPackages.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-6">Start adding packages you love!</p>
              <Link
                to="/packages"
                className="inline-block px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Browse Packages
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {wishlistPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <PackageCard package={pkg} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Wishlist;
