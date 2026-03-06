import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { blogs } from '@/data/blogs';

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h2>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-primary text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs">
                {blog.category}
              </span>
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            <p className="text-lg text-gray-600 max-w-3xl">{blog.excerpt}</p>
          </motion.div>
        </div>
      </section>

      {/* Cover image */}
      <section className="bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="rounded-2xl overflow-hidden shadow-md -mt-8 mb-10">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[320px] md:h-[420px] object-cover"
            />
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none text-gray-700">
            {/* Placeholder content until real rich text is provided */}
            <p>
              {blog.content ||
                'This is a sample travel article. Replace this placeholder text with the full blog content to share detailed stories, tips, and guides with your travelers.'}
            </p>

            {blog.tags?.length ? (
              <div className="mt-8 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between items-center text-sm text-gray-500">
              <span>Share this story with your fellow travelers.</span>
              <Link to="/blog" className="inline-flex items-center gap-1 text-blue-600 font-medium">
                <ArrowLeft className="h-4 w-4" />
                Back to all articles
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
