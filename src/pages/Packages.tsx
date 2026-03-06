import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import { packages } from '@/data/packages';
import { useCurrency } from '@/context/CurrencyContext';
import heroImage from '@/assets/hero-packages.jpg';

const Packages = () => {
  const { formatPrice } = useCurrency();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPackages = packages.filter((pkg) => {
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesType = selectedType === 'all' || pkg.type === selectedType;
    const matchesRating = pkg.rating >= minRating;
    return matchesPrice && matchesType && matchesRating;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Packages" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Travel <span className="text-gradient">Packages</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Exclusive vacation packages designed for unforgettable experiences
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Content */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{formatPrice(priceRange[0], { maximumFractionDigits: 0 })}</span>
                        <span>{formatPrice(priceRange[1], { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>
                  </div>

                  {/* Package Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Package Type
                    </label>
                    <div className="space-y-2">
                      {['all', 'adventure', 'luxury', 'budget', 'family', 'honeymoon', 'cultural'].map((type) => (
                        <label key={type} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={selectedType === type}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="text-blue-600"
                          />
                          <span className="text-sm text-gray-700 capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Minimum Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Minimum Rating
                    </label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="0">All Ratings</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4.0">4.0+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                    </select>
                  </div>

                  {/* Reset Filters */}
                  <button
                    onClick={() => {
                      setPriceRange([0, 5000]);
                      setSelectedType('all');
                      setMinRating(0);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="flex-1">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredPackages.length} Packages Found
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
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

              {filteredPackages.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-500">
                    No packages match your filters. Try adjusting your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
