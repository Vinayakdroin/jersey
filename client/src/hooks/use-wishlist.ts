import { useState, useEffect } from 'react';
import { WishlistItem } from '@/lib/types';

const WISHLIST_STORAGE_KEY = 'jerseyWishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage:', error);
        setWishlist([]);
      }
    }
  }, []);

  const saveWishlist = (newWishlist: WishlistItem[]) => {
    setWishlist(newWishlist);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(newWishlist));
  };

  const addToWishlist = (item: WishlistItem) => {
    const exists = wishlist.find(w => w.id === item.id);
    if (!exists) {
      const newWishlist = [...wishlist, item];
      saveWishlist(newWishlist);
      return true;
    }
    return false;
  };

  const removeFromWishlist = (id: number) => {
    const newWishlist = wishlist.filter(w => w.id !== id);
    saveWishlist(newWishlist);
  };

  const isInWishlist = (id: number) => {
    return wishlist.some(w => w.id === id);
  };

  const clearWishlist = () => {
    saveWishlist([]);
  };

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlist.length,
  };
}
