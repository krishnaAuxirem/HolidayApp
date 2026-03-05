import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, LogOut, Calendar, MapPin, Check, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useBooking } from '@/hooks/useBooking';

const Profile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'bookings'>('profile');

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <User className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please Login</h2>
          <p className="text-gray-600 mb-6">Access your profile and bookings</p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Login / Sign Up
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-6 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'profile'
                  ? 'gradient-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'bookings'
                  ? 'gradient-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              My Bookings ({bookings.length})
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'profile' ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="inline h-4 w-4 mr-1" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="inline h-4 w-4 mr-1" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="px-6 py-3 gradient-primary text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {bookings.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                  <Calendar className="h-24 w-24 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">No Bookings Yet</h2>
                  <p className="text-gray-600 mb-6">Start planning your dream vacation!</p>
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
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
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
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {booking.packageTitle}
                          </h3>
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
                                {booking.travelers}{' '}
                                {booking.travelers === 1 ? 'Traveler' : 'Travelers'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total Amount</p>
                            <p className="text-2xl font-bold text-blue-600">${booking.totalPrice}</p>
                          </div>
                          {booking.status === 'confirmed' && (
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    'Are you sure you want to cancel this booking?'
                                  )
                                ) {
                                  cancelBooking(booking.id);
                                }
                              }}
                              className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition-colors"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Profile;
