import { useMemo, useState } from 'react';
import { Camera, Filter, Star, ThumbsUp } from 'lucide-react';
import { usePackageReviews } from '@/hooks/usePackageReviews';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/sonner';

interface PackageReviewsProps {
  packageId: string;
  baseReviewCount: number;
  baseRating: number;
}

const PackageReviews = ({ packageId, baseReviewCount, baseRating }: PackageReviewsProps) => {
  const { reviews, addReview, toggleHelpful, hasVotedHelpful } = usePackageReviews(packageId);
  const { isAuthenticated } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [minRatingFilter, setMinRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'helpful'>('newest');

  const weightedRating = useMemo(() => {
    if (reviews.length === 0) {
      return baseRating;
    }

    const userReviewAverage = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return (baseRating * baseReviewCount + userReviewAverage * reviews.length) / (baseReviewCount + reviews.length);
  }, [baseRating, baseReviewCount, reviews]);

  const totalReviews = baseReviewCount + reviews.length;

  const visibleReviews = useMemo(() => {
    const filtered = reviews.filter((review) => review.rating >= minRatingFilter);

    return filtered.sort((a, b) => {
      if (sortBy === 'highest') {
        return b.rating - a.rating;
      }

      if (sortBy === 'helpful') {
        return b.helpful - a.helpful;
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [reviews, minRatingFilter, sortBy]);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).slice(0, 4 - photos.length);
    if (files.length === 0) {
      return;
    }

    const encodedFiles = await Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          }),
      ),
    );

    setPhotos((previous) => [...previous, ...encodedFiles].slice(0, 4));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!isAuthenticated) {
      toast('Please log in to submit a review', {
        description: 'Sign in to share your travel experience.',
      });
      return;
    }

    if (comment.trim().length < 20) {
      toast('Review is too short', {
        description: 'Please write at least 20 characters before submitting.',
      });
      return;
    }

    addReview({
      packageId,
      rating,
      comment: comment.trim(),
      photos,
    });

    toast('Review submitted', {
      description: 'Thank you for sharing your travel experience.',
    });
    setRating(5);
    setComment('');
    setPhotos([]);
  };

  return (
    <section className="mt-12">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Reviews & Ratings</h2>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{weightedRating.toFixed(1)}</span>
          </div>
          <span>{totalReviews} total reviews</span>
          <span>{reviews.length} new community reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1">
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-4 sticky top-24"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Write a Review</h3>

            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Rating</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    className="p-1"
                  >
                    <Star
                      className={`h-6 w-6 ${value <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Review</label>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                className="mt-2 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-4 py-3 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500"
                rows={5}
                placeholder="Share your trip highlights, quality of stays, itinerary comfort, and guide experience..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Add Photos</label>
              <label className="mt-2 flex items-center justify-center gap-2 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:border-blue-500 transition-colors">
                <Camera className="h-4 w-4" />
                Upload up to 4 images
                <input type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoUpload} />
              </label>
              {photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {photos.map((photo, index) => (
                    <img key={photo + index} src={photo} alt={`Uploaded ${index + 1}`} className="h-14 w-full rounded-lg object-cover" />
                  ))}
                </div>
              )}
            </div>

            <button className="w-full py-3 gradient-primary text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
              Submit Review
            </button>
          </form>
        </div>

        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Filter className="h-4 w-4" />
              <span>Filter & Sort</span>
            </div>
            <div className="flex gap-3">
              <select
                value={minRatingFilter}
                onChange={(event) => setMinRatingFilter(Number(event.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm text-gray-700 dark:text-gray-200"
              >
                <option value={0}>All ratings</option>
                <option value={4}>4 stars & up</option>
                <option value={3}>3 stars & up</option>
              </select>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as 'newest' | 'highest' | 'helpful')}
                className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-sm text-gray-700 dark:text-gray-200"
              >
                <option value="newest">Newest</option>
                <option value="highest">Highest rating</option>
                <option value="helpful">Most helpful</option>
              </select>
            </div>
          </div>

          {visibleReviews.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-10 text-center text-gray-500 dark:text-gray-400">
              No matching reviews yet. Be the first to share your experience.
            </div>
          ) : (
            visibleReviews.map((review) => (
              <article key={review.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex flex-wrap justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{review.userName}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Star
                        key={value}
                        className={`h-4 w-4 ${value <= review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-4">{review.comment}</p>

                {review.photos.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {review.photos.map((photo, index) => (
                      <img
                        key={photo + index}
                        src={photo}
                        alt={`Review photo ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                <button
                  onClick={() => toggleHelpful(review.id)}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors ${
                    hasVotedHelpful(review.id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-blue-500'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Helpful ({review.helpful})
                </button>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default PackageReviews;
