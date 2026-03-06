import { motion } from 'framer-motion';
import { ArrowRight, Award, Globe, HeadphonesIcon, Shield, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import DestinationCard from '@/components/DestinationCard';
import PackageCard from '@/components/PackageCard';
import BlogCard from '@/components/BlogCard';
import { destinations } from '@/data/destinations';
import { packages } from '@/data/packages';
import { blogs } from '@/data/blogs';
import heroImage from '@/assets/hero-home.jpg';

const Home = () => {
  const topDestinations = destinations.slice(0, 6);
  const popularPackages = packages.slice(0, 4);
  const latestBlogs = blogs.slice(0, 3);

  const heroContainer = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: 'easeOut',
        staggerChildren: 0.15,
      },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Travel destinations"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={heroItem}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Discover Your Next
              <span className="block gradient-secondary bg-clip-text text-transparent">
                Dream Adventure
              </span>
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto"
            >
              Explore the world's most beautiful destinations with exclusive travel packages
              tailored just for you
            </motion.p>

            <motion.div variants={heroItem} className="mb-16">
              <SearchBar />
            </motion.div>

            <motion.div
              variants={heroItem}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link
                to="/packages"
                className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:shadow-2xl transition-all flex items-center gap-2 button-glow"
              >
                Explore Packages
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/destinations"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-md hover:shadow-xl transition-all"
              >
                View Destinations
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top <span className="text-gradient">Destinations</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the most popular travel destinations loved by millions of travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDestinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <DestinationCard destination={destination} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              View All Destinations
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular <span className="text-gradient">Travel Packages</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Curated vacation packages designed for unforgettable experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularPackages.map((pkg, index) => (
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

          <div className="text-center mt-12">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Explore All Packages
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-gradient">HolidayApp</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your trusted partner for memorable travel experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Globe,
                title: 'Global Coverage',
                description: 'Access to 500+ destinations worldwide with verified partners',
              },
              {
                icon: Shield,
                title: 'Secure Booking',
                description: 'Safe and encrypted transactions with full payment protection',
              },
              {
                icon: Award,
                title: 'Best Prices',
                description: 'Guaranteed lowest prices with exclusive deals and offers',
              },
              {
                icon: HeadphonesIcon,
                title: '24/7 Support',
                description: 'Round-the-clock customer service in multiple languages',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="inline-flex p-4 gradient-primary rounded-2xl mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark p-12 rounded-3xl text-center"
          >
            <TrendingUp className="h-16 w-16 text-white mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Limited Time Offer!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Book your dream vacation now and save up to 40% on selected packages
            </p>
            <Link
              to="/deals"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              View Special Deals
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our <span className="text-gradient">Travelers Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from real travelers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                location: 'New York, USA',
                avatar: 'https://i.pravatar.cc/150?img=1',
                rating: 5,
                comment:
                  'Amazing experience! The Santorini package exceeded all expectations. Everything was perfectly organized.',
              },
              {
                name: 'Michael Chen',
                location: 'Singapore',
                avatar: 'https://i.pravatar.cc/150?img=2',
                rating: 5,
                comment:
                  'Best travel booking platform! Found incredible deals and the customer service was outstanding.',
              },
              {
                name: 'Emma Williams',
                location: 'London, UK',
                avatar: 'https://i.pravatar.cc/150?img=3',
                rating: 5,
                comment:
                  'Highly recommended! Made our dream Maldives vacation a reality. Will definitely book again.',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Users key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Blog */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Travel <span className="text-gradient">Inspiration</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tips, guides, and stories to fuel your wanderlust
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Read More Stories
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Exclusive Travel Deals
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Subscribe to our newsletter and never miss out on amazing offers
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

export default Home;
