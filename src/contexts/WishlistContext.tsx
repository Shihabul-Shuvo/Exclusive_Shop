
import React, { createContext, useContext, useState, useEffect } from 'react';

type WishlistItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

type WishlistContextType = {
  wishlist: WishlistItem[];
  addToWishlist: (product: WishlistItem) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  getWishlistCount: () => number;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  getWishlistCount: () => 0,
  clearWishlist: () => {},
});

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: any) => {
    setWishlist(prevWishlist => {
      if (!prevWishlist.some(item => item.id === product.id)) {
        alert(`${product.title} added to your wishlist.`);
        return [...prevWishlist, {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail
        }];
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prevWishlist => {
      const item = prevWishlist.find(item => item.id === productId);
      const updatedWishlist = prevWishlist.filter(item => item.id !== productId);
      
      if (item) {
        alert(`${item.title} removed from your wishlist.`);
      }
      
      return updatedWishlist;
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  const getWishlistCount = () => {
    return wishlist.length;
  };

  const clearWishlist = () => {
    setWishlist([]);
    alert("Wishlist cleared. All items have been removed.");
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      getWishlistCount,
      clearWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};
