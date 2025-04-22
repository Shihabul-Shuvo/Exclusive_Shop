import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    product: { id: number; title: string; price: number; thumbnail: string },
    quantity?: number
  ) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartItemCount: () => 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (
    product: { id: number; title: string; price: number; thumbnail: string },
    quantity: number = 1
  ) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // If item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        //alert(`${product.title} quantity updated in your cart.`);
        return updatedCart;
      } else {
        // If item doesn't exist, add new item
        alert(`${product.title} has been added to your cart.`);
        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: quantity,
          },
        ];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      const updatedCart = prevCart.filter((item) => item.id !== productId);

      if (item) {
        alert(`${item.title} has been removed from your cart.`);
      }

      return updatedCart;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    alert("Cart cleared: All items have been removed from your cart.");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
