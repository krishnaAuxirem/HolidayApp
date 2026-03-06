import { motion } from 'framer-motion';
import { Calendar, MapPin, User, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBooking } from '@/hooks/useBooking';
import { useCurrency } from '@/context/CurrencyContext';

const BookingHistory = () => {
  const { bookings } = useBooking();
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Booking History</h1>
            <p className="text-gray-600">View all your past and upcoming bookings in one place.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow">
              <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No bookings yet</h2>
              <p className="text-gray-600 mb-6">Start your journey by exploring our curated packages.</p>
              <Link
                to="/packages"
                className="inline-block px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
              >
                Browse Packages
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-700'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {booking.status === 'confirmed' && (
                            <Check className="inline h-4 w-4 mr-1" />
                          )}
                          {booking.status === 'cancelled' && (
                            <X className="inline h-4 w-4 mr-1" />
                          )}
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{booking.packageTitle}</h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{booking.destination}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(booking.travelDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>
                            {booking.travelers} {booking.travelers === 1 ? 'Traveler' : 'Travelers'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatPrice(booking.totalPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BookingHistory;
