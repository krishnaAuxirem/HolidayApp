import { Link } from 'react-router-dom';
import { Plane, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Plane className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">HolidayApp</span>
            </div>
            <p className="text-sm mb-4">
              Discover the world's most beautiful destinations with exclusive travel packages,
              luxury hotels, and unforgettable experiences.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-red-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/destinations" className="hover:text-blue-400 transition-colors">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-blue-400 transition-colors">Packages</Link></li>
              <li><Link to="/hotels" className="hover:text-blue-400 transition-colors">Hotels</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Travel Blog</Link></li>
              <li><Link to="/deals" className="hover:text-blue-400 transition-colors">Special Deals</Link></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Top Destinations</h3>
            <ul className="space-y-2">
              <li><Link to="/destinations/dest-1" className="hover:text-blue-400 transition-colors">Santorini, Greece</Link></li>
              <li><Link to="/destinations/dest-2" className="hover:text-blue-400 transition-colors">Bali, Indonesia</Link></li>
              <li><Link to="/destinations/dest-3" className="hover:text-blue-400 transition-colors">Maldives</Link></li>
              <li><Link to="/destinations/dest-4" className="hover:text-blue-400 transition-colors">Paris, France</Link></li>
              <li><Link to="/destinations/dest-5" className="hover:text-blue-400 transition-colors">Dubai, UAE</Link></li>
              <li><Link to="/destinations/dest-6" className="hover:text-blue-400 transition-colors">Tokyo, Japan</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">123 Travel Street, Adventure City, AC 12345</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">support@holidayapp.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} HolidayApp. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
