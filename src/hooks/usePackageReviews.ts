import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const STORAGE_KEY = 'holidayapp_package_reviews';
const VOTER_KEY = 'holidayapp_helpful_voter';

export interface PackageReviewItem {
  id: string;
  packageId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  photos: string[];
  helpfulVoterIds: string[];
}

interface CreateReviewInput {
  packageId: string;
  rating: number;
  comment: string;
  photos: string[];
}

const getVoterId = () => {
  const existing = localStorage.getItem(VOTER_KEY);
  if (existing) {
    return existing;
  }

  const generated = `voter-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  localStorage.setItem(VOTER_KEY, generated);
  return generated;
};

export const usePackageReviews = (packageId: string) => {
  const { user, isAuthenticated } = useAuth();
  const [allReviews, setAllReviews] = useState<PackageReviewItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as PackageReviewItem[];
      setAllReviews(parsed);
    } catch {
      setAllReviews([]);
    }
  }, []);

  const saveReviews = (nextReviews: PackageReviewItem[]) => {
    setAllReviews(nextReviews);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReviews));
  };

  const reviews = useMemo(
    () => allReviews.filter((review) => review.packageId === packageId),
    [allReviews, packageId],
  );

  const addReview = ({ packageId, rating, comment, photos }: CreateReviewInput) => {
    const nextReview: PackageReviewItem = {
      id: `review-${Date.now()}`,
      packageId,
      userName: user?.name ?? 'Guest Traveler',
      userAvatar: user?.avatar,
      rating,
      comment,
      date: new Date().toISOString(),
      helpful: 0,
      photos,
      helpfulVoterIds: [],
    };

    saveReviews([nextReview, ...allReviews]);
  };

  const toggleHelpful = (reviewId: string) => {
    const voterId = user?.id ?? getVoterId();

    const nextReviews = allReviews.map((review) => {
      if (review.id !== reviewId) {
        return review;
      }

      const alreadyHelpful = review.helpfulVoterIds.includes(voterId);
      const helpfulVoterIds = alreadyHelpful
        ? review.helpfulVoterIds.filter((id) => id !== voterId)
        : [...review.helpfulVoterIds, voterId];

      return {
        ...review,
        helpfulVoterIds,
        helpful: helpfulVoterIds.length,
      };
    });

    saveReviews(nextReviews);
  };

  const hasVotedHelpful = (reviewId: string) => {
    const voterId = user?.id ?? getVoterId();
    const review = allReviews.find((item) => item.id === reviewId);
    return !!review?.helpfulVoterIds.includes(voterId);
  };

  return {
    reviews,
    addReview,
    toggleHelpful,
    hasVotedHelpful,
    isAuthenticated,
  };
};
