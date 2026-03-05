import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Star,
  Heart,
  Share2,
  Check,
  Calendar,
  Users,
  ChevronRight,
} from 'lucide-react';
import { packages } from '@/data/packages';
import { useWishlist } from '@/hooks/useWishlist';
import { useBooking } from '@/hooks/useBooking';
import { useAuth } from '@/context/AuthContext';
import PackageCard from '@/components/PackageCard';

const PackageDetail = () => {
  const { id } = useParams();
  const pkg = packages.find((p) => p.id === id);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { createBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  if (!pkg) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Not Found</h2>
          <Link to="/packages" className="text-blue-600 hover:underline">
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(pkg.id);
  const relatedPackages = packages.filter((p) => p.id !== pkg.id && p.destinationId === pkg.destinationId).slice(0, 3);
  const totalPrice = pkg.price * travelers;

  const handleWishlist = () => {
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

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Please login to book');
      return;
    }
    if (!travelDate) {
      alert('Please select travel date');
      return;
    }
    
    createBooking(pkg.id, pkg.title, pkg.destination, travelers, totalPrice, travelDate);
    alert('Booking confirmed! Check your profile for booking details.');
    setShowBookingForm(false);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Image Gallery */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 h-96 rounded-2xl overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Package Info */}
      <section className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column */}
            <div className="flex-1">
              <div className="mb-4">
                <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium capitalize mb-4">
                  {pkg.type}
                </span>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{pkg.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-5 w-5" />
                    <span>{pkg.destination}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-5 w-5" />
                    <span>{pkg.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{pkg.rating}</span>
                    <span className="text-gray-500">({pkg.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleWishlist}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                    inWishlist
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={inWishlist ? 'fill-red-500' : ''} />
                  <span>{inWishlist ? 'Saved' : 'Save'}</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-500 transition-colors">
                  <Share2 />
                  <span>Share</span>
                </button>
              </div>

              {/* Package Highlights */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Package Highlights</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.includes.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-6">
                  {pkg.itinerary.map((day) => (
                    <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-blue-200 last:border-0">
                      <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">{day.day}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{day.title}</h3>
                      <p className="text-gray-600 mb-3">{day.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {day.activities.map((activity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotels */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accommodation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pkg.hotels.map((hotel, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900">{hotel}</h3>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Activities Included</h2>
                <div className="flex flex-wrap gap-2">
                  {pkg.activities.map((activity, index) => (
                    <span key={index} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-medium">
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:w-96">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border-2 border-blue-100">
                <div className="mb-6">
                  {pkg.originalPrice && (
                    <span className="text-lg text-gray-400 line-through mr-2">
                      ${pkg.originalPrice}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-600">${pkg.price}</span>
                    <span className="text-gray-500">/ person</span>
                  </div>
                </div>

                {!showBookingForm ? (
                  <button
                    onClick={() => setShowBookingForm(true)}
                    className="w-full py-4 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-shadow mb-4"
                  >
                    Book Now
                  </button>
                ) : (
                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline h-4 w-4 mr-1" />
                        Travel Date
                      </label>
                      <input
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users className="inline h-4 w-4 mr-1" />
                        Number of Travelers
                      </label>
                      <select
                        value={travelers}
                        onChange={(e) => setTravelers(parseInt(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Price per person</span>
                        <span className="font-semibold">${pkg.price}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Travelers</span>
                        <span className="font-semibold">×{travelers}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span className="text-blue-600">${totalPrice}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                    >
                      Confirm Booking
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Instant confirmation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      {relatedPackages.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              More Packages in <span className="text-gradient">{pkg.destination}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPackages.map((relatedPkg) => (
                <PackageCard key={relatedPkg.id} package={relatedPkg} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PackageDetail;
