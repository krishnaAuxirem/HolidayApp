import { Destination } from '@/types';

export const destinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Santorini',
    country: 'Greece',
    description: 'A stunning Greek island famous for its white-washed buildings, blue-domed churches, and breathtaking sunsets over the Aegean Sea.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    rating: 4.9,
    popularityScore: 95,
    bestTimeToVisit: 'April to October',
    averageTemp: '25°C',
    attractions: ['Oia Sunset', 'Red Beach', 'Ancient Thera', 'Wine Tasting Tours']
  },
  {
    id: 'dest-2',
    name: 'Bali',
    country: 'Indonesia',
    description: 'A tropical paradise known for pristine beaches, ancient temples, lush rice terraces, and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    rating: 4.8,
    popularityScore: 92,
    bestTimeToVisit: 'April to October',
    averageTemp: '27°C',
    attractions: ['Tanah Lot Temple', 'Ubud Rice Terraces', 'Sacred Monkey Forest', 'Beach Clubs']
  },
  {
    id: 'dest-3',
    name: 'Maldives',
    country: 'Maldives',
    description: 'An archipelago of pristine islands with crystal-clear waters, luxury resorts, and incredible marine life.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop',
    rating: 5.0,
    popularityScore: 98,
    bestTimeToVisit: 'November to April',
    averageTemp: '28°C',
    attractions: ['Underwater Restaurant', 'Snorkeling & Diving', 'Private Island Resorts', 'Bioluminescent Beach']
  },
  {
    id: 'dest-4',
    name: 'Paris',
    country: 'France',
    description: 'The City of Light, renowned for its art, culture, fashion, and iconic landmarks like the Eiffel Tower.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    rating: 4.7,
    popularityScore: 90,
    bestTimeToVisit: 'April to June, September to October',
    averageTemp: '15°C',
    attractions: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame Cathedral', 'Champs-Élysées']
  },
  {
    id: 'dest-5',
    name: 'Dubai',
    country: 'UAE',
    description: 'A futuristic city in the desert featuring the world\'s tallest building, luxury shopping, and extravagant attractions.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    rating: 4.6,
    popularityScore: 88,
    bestTimeToVisit: 'November to March',
    averageTemp: '30°C',
    attractions: ['Burj Khalifa', 'Dubai Mall', 'Palm Jumeirah', 'Desert Safari']
  },
  {
    id: 'dest-6',
    name: 'Tokyo',
    country: 'Japan',
    description: 'A vibrant metropolis blending ancient traditions with cutting-edge technology, offering unique cultural experiences.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    rating: 4.8,
    popularityScore: 91,
    bestTimeToVisit: 'March to May, September to November',
    averageTemp: '16°C',
    attractions: ['Mount Fuji', 'Senso-ji Temple', 'Shibuya Crossing', 'Tokyo Skytree']
  },
  {
    id: 'dest-7',
    name: 'New York',
    country: 'USA',
    description: 'The city that never sleeps, famous for its skyline, Broadway shows, diverse culture, and iconic landmarks.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    rating: 4.7,
    popularityScore: 89,
    bestTimeToVisit: 'April to June, September to November',
    averageTemp: '13°C',
    attractions: ['Statue of Liberty', 'Central Park', 'Times Square', 'Empire State Building']
  },
  {
    id: 'dest-8',
    name: 'Swiss Alps',
    country: 'Switzerland',
    description: 'Majestic mountain ranges offering world-class skiing, hiking, and breathtaking alpine scenery.',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop',
    rating: 4.9,
    popularityScore: 93,
    bestTimeToVisit: 'December to March (Skiing), June to September (Hiking)',
    averageTemp: '8°C',
    attractions: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva', 'Skiing Resorts']
  },
  {
    id: 'dest-9',
    name: 'Iceland',
    country: 'Iceland',
    description: 'A land of fire and ice with dramatic landscapes, geothermal hot springs, and the Northern Lights.',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=600&fit=crop',
    rating: 4.8,
    popularityScore: 87,
    bestTimeToVisit: 'June to August, September to March (Northern Lights)',
    averageTemp: '5°C',
    attractions: ['Blue Lagoon', 'Golden Circle', 'Northern Lights', 'Glacier Hiking']
  },
  {
    id: 'dest-10',
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'An ancient Incan citadel set high in the Andes Mountains, offering mystery and spectacular views.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
    rating: 4.9,
    popularityScore: 94,
    bestTimeToVisit: 'May to September',
    averageTemp: '12°C',
    attractions: ['Incan Ruins', 'Huayna Picchu', 'Inca Trail', 'Sacred Valley']
  },
  {
    id: 'dest-11',
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City, rich in history with ancient ruins, Renaissance art, and incredible cuisine.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    rating: 4.7,
    popularityScore: 90,
    bestTimeToVisit: 'April to June, September to October',
    averageTemp: '17°C',
    attractions: ['Colosseum', 'Vatican City', 'Trevi Fountain', 'Roman Forum']
  },
  {
    id: 'dest-12',
    name: 'Barcelona',
    country: 'Spain',
    description: 'A vibrant coastal city known for Gaudí\'s architecture, beaches, and lively culture.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
    rating: 4.8,
    popularityScore: 91,
    bestTimeToVisit: 'May to June, September to October',
    averageTemp: '18°C',
    attractions: ['Sagrada Familia', 'Park Güell', 'La Rambla', 'Gothic Quarter']
  }
];
