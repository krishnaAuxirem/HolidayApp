import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/types';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <Link to={`/blog/${blog.id}`}>
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 gradient-primary text-white rounded-full text-sm font-semibold">
            {blog.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{new Date(blog.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {/* Read More */}
          <button className="text-blue-600 font-medium text-sm hover:underline">
            Read More →
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
