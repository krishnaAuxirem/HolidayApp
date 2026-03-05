import { motion } from 'framer-motion';
import { MapPin, Star, Wifi, Coffee, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Hotel } from '@/types';

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const iconMap: { [key: string]: any } = {
    'WiFi': Wifi,
    'Free WiFi': Wifi,
    'Restaurant': Coffee,
    'Fitness Center': Dumbbell,
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <Link to={`/hotels/${hotel.id}`}>
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-white">{hotel.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {hotel.name}
          </h3>

          <div className="flex items-center gap-1 text-gray-600 mb-3">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{hotel.location}</span>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
            <span>({hotel.reviews} reviews)</span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, index) => {
              const Icon = iconMap[amenity] || Coffee;
              return (
                <div
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded-lg text-xs text-gray-600"
                >
                  <Icon className="h-3 w-3" />
                  <span>{amenity}</span>
                </div>
              );
            })}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-blue-600">${hotel.price}</span>
                <span className="text-sm text-gray-500">/ night</span>
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

export default HotelCard;
