import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Destination } from '@/types';

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl shadow-lg"
    >
      <Link to={`/destinations/${destination.id}`}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 glass px-3 py-1.5 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-white">{destination.rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
              <div className="flex items-center gap-1 text-white/90">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{destination.country}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-white/80 line-clamp-2">{destination.description}</p>
          
          <button className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Explore
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default DestinationCard;
