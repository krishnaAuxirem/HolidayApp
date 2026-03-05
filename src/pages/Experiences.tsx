import { motion } from 'framer-motion';
import { Compass, Mountain, Waves, Utensils, Camera, Palmtree } from 'lucide-react';

const Experiences = () => {
  const experiences = [
    {
      icon: Mountain,
      title: 'Adventure Sports',
      description: 'Thrilling activities from skydiving to bungee jumping',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      activities: ['Skydiving', 'Bungee Jumping', 'Paragliding', 'Rock Climbing'],
    },
    {
      icon: Waves,
      title: 'Water Activities',
      description: 'Dive into exciting water sports and ocean adventures',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
      activities: ['Scuba Diving', 'Surfing', 'Snorkeling', 'Kayaking'],
    },
    {
      icon: Utensils,
      title: 'Culinary Tours',
      description: 'Taste authentic local cuisines with expert guides',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
      activities: ['Food Tours', 'Cooking Classes', 'Wine Tasting', 'Street Food'],
    },
    {
      icon: Camera,
      title: 'Photography Tours',
      description: 'Capture stunning moments with professional photographers',
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
      activities: ['Sunrise Shoots', 'Wildlife Photography', 'Street Photography', 'Workshops'],
    },
    {
      icon: Compass,
      title: 'Cultural Experiences',
      description: 'Immerse yourself in local traditions and heritage',
      image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop',
      activities: ['Temple Visits', 'Local Markets', 'Traditional Shows', 'Festivals'],
    },
    {
      icon: Palmtree,
      title: 'Wellness Retreats',
      description: 'Rejuvenate your mind, body, and soul',
      image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=600&fit=crop',
      activities: ['Yoga Sessions', 'Spa Treatments', 'Meditation', 'Wellness Workshops'],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Unique <span className="text-yellow-300">Experiences</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Create unforgettable memories with extraordinary activities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Experiences Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4 p-3 glass rounded-xl">
                    <experience.icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{experience.title}</h3>
                  <p className="text-gray-600 mb-4">{experience.description}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Popular Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experience.activities.map((activity, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="mt-6 w-full py-3 gradient-primary text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
                    Explore More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready for an Adventure?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Book your unique experience today and create memories that last a lifetime
            </p>
            <button className="px-8 py-4 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Browse All Experiences
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Experiences;
