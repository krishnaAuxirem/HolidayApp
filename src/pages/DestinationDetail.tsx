import { Link, useParams } from 'react-router-dom';
import { MapPin, Star, Calendar, Thermometer, Check } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { destinationGeoMap } from '@/data/geo';
import { packages } from '@/data/packages';
import TravelMap from '@/components/TravelMap';
import PackageCard from '@/components/PackageCard';

const DestinationDetail = () => {
  const { id } = useParams();
  const destination = destinations.find((item) => item.id === id);

  if (!destination) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Destination Not Found</h2>
          <Link to="/destinations" className="text-blue-600 hover:underline">
            Browse All Destinations
          </Link>
        </div>
      </div>
    );
  }

  const geoData = destinationGeoMap[destination.id];
  const relatedPackages = packages.filter((pkg) => pkg.destinationId === destination.id).slice(0, 6);
  const mapMarkers = geoData
    ? [
        {
          id: `${destination.id}-center`,
          label: `${destination.name}, ${destination.country}`,
          position: geoData.center,
          description: 'Destination center',
        },
        ...geoData.attractions.map((attraction, index) => ({
          id: `${destination.id}-attraction-${index}`,
          label: attraction.name,
          position: attraction.position,
          description: 'Nearby attraction',
        })),
      ]
    : [];

  return (
    <div className="min-h-screen pt-20 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <section className="relative h-[420px]">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 mb-4">
              <Star className="h-4 w-4 text-yellow-300 fill-yellow-300" />
              <span className="font-semibold">{destination.rating} rating</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{destination.name}</h1>
            <div className="flex flex-wrap items-center gap-5 text-white/90">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-5 w-5" />
                {destination.country}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-5 w-5" />
                Best time: {destination.bestTimeToVisit}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Thermometer className="h-5 w-5" />
                Avg Temp: {destination.averageTemp}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">About {destination.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-7">{destination.description}</p>
              </div>
            </div>

            <div>
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Top Attractions</h3>
                <div className="space-y-3">
                  {destination.attractions.map((attraction) => (
                    <div key={attraction} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                      <Check className="h-4 w-4 text-green-600 mt-1" />
                      <span>{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {geoData && (
            <div className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Map & Travel Route</h2>
              <TravelMap center={geoData.center} markers={mapMarkers} route={geoData.route} zoom={8} />
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gray-50 dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Packages for <span className="text-gradient">{destination.name}</span>
          </h2>

          {relatedPackages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center text-gray-500 dark:text-gray-400">
              No packages available for this destination yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DestinationDetail;
