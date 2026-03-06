import { Link, useParams } from 'react-router-dom';
import { MapPin, Star, Check, BedDouble } from 'lucide-react';
import { hotels } from '@/data/hotels';
import { useCurrency } from '@/context/CurrencyContext';

const HotelDetail = () => {
  const { id } = useParams();
  const hotel = hotels.find((item) => item.id === id);
  const { formatPrice } = useCurrency();

  if (!hotel) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Hotel Not Found</h2>
          <Link to="/hotels" className="text-blue-600 hover:underline">
            Browse All Hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <section className="relative h-[420px]">
        <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 mb-4">
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              <span>{hotel.rating} · {hotel.reviews} reviews</span>
            </div>
            <h1 className="text-4xl font-bold mb-3">{hotel.name}</h1>
            <div className="inline-flex items-center gap-2 text-white/90">
              <MapPin className="h-5 w-5" />
              <span>{hotel.location}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Overview</h2>
              <p className="text-gray-600 dark:text-gray-300">{hotel.description}</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Room Types</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {hotel.roomTypes.map((room) => (
                  <div key={room} className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                    <BedDouble className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-800 dark:text-gray-100">{room}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-blue-100 dark:border-blue-900/40 shadow-xl p-6 sticky top-24">
              <p className="text-sm text-gray-500 dark:text-gray-400">Starting from</p>
              <p className="text-3xl font-bold text-blue-600">{formatPrice(hotel.price)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">per night</p>

              <button className="w-full py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                Reserve Room
              </button>
              <button className="w-full mt-3 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800">
                Contact Concierge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotelDetail;
