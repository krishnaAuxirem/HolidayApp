import { motion } from 'framer-motion';
import { Clock, TrendingDown, Zap } from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import { packages } from '@/data/packages';
import heroPackages from '@/assets/hero-packages.jpg';

const Deals = () => {
  const discountedPackages = packages.filter((pkg) => pkg.originalPrice);
  const lastMinuteDeals = packages.slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[420px] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroPackages}
            alt="Travel deals background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 text-gray-900 px-4 py-1.5 text-sm font-semibold shadow-lg">
              <Zap className="h-4 w-4" />
              Limited time offers
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Exclusive
              <span className="block gradient-secondary bg-clip-text text-transparent">
                Travel Deals
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-xl">
              Save big on curated holiday packages with special discounts and flash
              deals updated regularly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Discount Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <TrendingDown className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Biggest <span className="text-gradient">Discounts</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Up to 40% off on selected packages - Book now before they're gone!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {discountedPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PackageCard package={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Clock className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Last Minute <span className="text-gradient">Deals</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Grab these incredible offers while they last
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lastMinuteDeals.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PackageCard package={pkg} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal Categories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Browse Deals by <span className="text-gradient">Category</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Honeymoon Specials', discount: '30% OFF', color: 'from-pink-500 to-red-500' },
              { title: 'Family Packages', discount: '25% OFF', color: 'from-blue-500 to-cyan-500' },
              { title: 'Adventure Tours', discount: '35% OFF', color: 'from-green-500 to-teal-500' },
              { title: 'Luxury Escapes', discount: '20% OFF', color: 'from-purple-500 to-pink-500' },
            ].map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`relative h-64 rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-gradient-to-br ${category.color}`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                  <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                  <div className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                    <span className="text-3xl font-bold">{category.discount}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Zap className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get exclusive deals and early access to special offers
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Deals;
