import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (book) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item._id === book._id);

      if (existingItem) {
        return prev.map((item) =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== bookId));
  };

  const increaseQuantity = (bookId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === bookId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (bookId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);