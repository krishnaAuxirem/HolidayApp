import { motion } from 'framer-motion';
import { Clock, Star, Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Package } from '@/types';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/context/AuthContext';

interface PackageCardProps {
  package: Package;
}

const PackageCard = ({ package: pkg }: PackageCardProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const inWishlist = isInWishlist(pkg.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to add to wishlist');
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
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden"
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
              Save ${pkg.originalPrice - pkg.price}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Type Badge */}
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3 capitalize">
            {pkg.type}
          </span>

          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {pkg.title}
          </h3>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{pkg.destination}</span>
          </div>

          {/* Rating & Reviews */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{pkg.rating}</span>
            </div>
            <span className="text-sm text-gray-500">({pkg.reviews} reviews)</span>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2 mb-4 text-gray-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm">{pkg.duration}</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              {pkg.originalPrice && (
                <span className="text-sm text-gray-400 line-through mr-2">
                  ${pkg.originalPrice}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                <span className="text-sm text-gray-500">/ person</span>
              </div>
            </div>
            <button className="px-6 py-2.5 gradient-primary text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
              View Details
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PackageCard;
