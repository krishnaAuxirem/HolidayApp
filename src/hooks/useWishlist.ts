import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export const useWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      setWishlist(storedWishlist ? JSON.parse(storedWishlist) : []);
    }
  }, [user]);

  const addToWishlist = (packageId: string) => {
    if (!user) return;
    
    const newWishlist = [...wishlist, packageId];
    setWishlist(newWishlist);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
  };

  const removeFromWishlist = (packageId: string) => {
    if (!user) return;
    
    const newWishlist = wishlist.filter(id => id !== packageId);
    setWishlist(newWishlist);
    localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
  };

  const isInWishlist = (packageId: string): boolean => {
    return wishlist.includes(packageId);
  };

  return { wishlist, addToWishlist, removeFromWishlist, isInWishlist };
};
