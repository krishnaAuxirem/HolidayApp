import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPinned, Search } from 'lucide-react';
import DestinationCard from '@/components/DestinationCard';
import TravelMap from '@/components/TravelMap';
import { destinations } from '@/data/destinations';
import { destinationGeoMap } from '@/data/geo';
import heroImage from '@/assets/hero-destinations.jpg';

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestinationId, setSelectedDestinationId] = useState(destinations[0]?.id ?? '');

  const filteredDestinations = destinations.filter((dest) =>
    dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedDestination =
    filteredDestinations.find((destination) => destination.id === selectedDestinationId) ??
    filteredDestinations[0] ??
    destinations[0];

  const selectedGeo = selectedDestination ? destinationGeoMap[selectedDestination.id] : undefined;
  const mapMarkers = selectedGeo
    ? [
        {
          id: `${selectedDestination.id}-center`,
          label: `${selectedDestination.name} City Center`,
          position: selectedGeo.center,
          description: `${selectedDestination.country}`,
        },
        ...selectedGeo.attractions.map((attraction, index) => ({
          id: `${selectedDestination.id}-attraction-${index}`,
          label: attraction.name,
          position: attraction.position,
          description: 'Top nearby attraction',
        })),
      ]
    : [];

  return (
    <div className="min-h-screen pt-20 bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Explore <span className="text-gradient">Destinations</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover amazing places around the world
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 flex items-center gap-2">
                <MapPinned className="h-6 w-6 text-blue-500" />
                Destination Explorer Map
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                View nearby attractions and a suggested local travel route.
              </p>
            </div>

            <select
              value={selectedDestination?.id ?? ''}
              onChange={(event) => setSelectedDestinationId(event.target.value)}
              className="w-full lg:w-80 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
            >
              {filteredDestinations.map((destination) => (
                <option key={destination.id} value={destination.id}>
                  {destination.name}, {destination.country}
                </option>
              ))}
            </select>
          </div>

          {selectedGeo && selectedDestination ? (
            <>
              <TravelMap
                center={selectedGeo.center}
                markers={mapMarkers}
                route={selectedGeo.route}
                zoom={8}
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedGeo.attractions.map((attraction) => (
                  <span
                    key={attraction.name}
                    className="px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-sm"
                  >
                    {attraction.name}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
              No geolocation data available for the selected destination.
            </div>
          )}
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {filteredDestinations.length} Destinations Found
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 dark:text-gray-400">No destinations found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Top Attractions */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Top <span className="text-gradient">Attractions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Historical Sites', count: 45, image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop' },
              { name: 'Natural Wonders', count: 38, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop' },
              { name: 'Beach Resorts', count: 52, image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop' },
              { name: 'Urban Adventures', count: 34, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop' },
            ].map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative h-48 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
              >
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} places</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
            Travel <span className="text-gradient">Planning Tips</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Best Time to Visit',
                description: 'Plan your trip during the ideal season for each destination to enjoy perfect weather and avoid crowds.',
                icon: '🌤️',
              },
              {
                title: 'Visa Requirements',
                description: 'Check visa requirements well in advance and ensure your passport has at least 6 months validity.',
                icon: '📋',
              },
              {
                title: 'Local Currency',
                description: 'Research the local currency and exchange rates. Consider using travel cards for better rates.',
                icon: '💰',
              },
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-transparent dark:border-gray-800"
              >
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
