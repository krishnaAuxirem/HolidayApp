import { motion } from 'framer-motion';
import { Clock, Star, Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Package } from '@/types';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { toast } from '@/components/ui/sonner';

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { formatPrice } = useCurrency();
  const inWishlist = isInWishlist(pkg.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast('Please log in to save this package', {
        description: 'Your wishlist will sync across devices once you sign in.',
      });
      return;
    }
    if (inWishlist) {
      removeFromWishlist(pkg.id);
    } else {
      addToWishlist(pkg.id);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-800"
    >
      <Link to={`/packages/${pkg.id}`}>
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 glass rounded-full hover:bg-white/90 transition-colors z-10"
          >
            <Heart
              className={`h-5 w-5 ${
                inWishlist ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>

          {/* Discount Badge */}
          {pkg.originalPrice && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-500 text-white rounded-full text-sm font-semibold">
              Save {formatPrice(pkg.originalPrice - pkg.price)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Type Badge */}
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3 capitalize">
            {pkg.type}
          </span>

          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 transition-colors">
            {pkg.title}
          </h3>

          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{pkg.destination}</span>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{pkg.rating}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">({pkg.reviews} reviews)</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{pkg.duration}</span>
          </div>

          {/* Price */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="min-w-0">
              {pkg.originalPrice && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through mr-2">
                  {formatPrice(pkg.originalPrice)}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-blue-600">{formatPrice(pkg.price)}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">/ person</span>
              </div>
            </div>
            <button className="mt-3 w-full py-2.5 gradient-primary text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
