import { createContext, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  const push = (pack) => {
    setShoppingCart((prevState) => {
      const newState = [...prevState, { id: uuid(), quantity: 1, package: pack }];
      localStorage.setItem("shopping_cart", JSON.stringify(newState));
      return newState;
    });
  };

  const remove = (id) => {
    setShoppingCart((prev) => {
      const newState = prev.filter((el) => el.id !== id);
      localStorage.setItem("shopping_cart", JSON.stringify(newState));
      return newState;
    });
  };

  const updateQuantity = (value, id) => {
    setShoppingCart((prev) => {
      const newState = prev.map((el) =>
        el.id === id
          ? {
              ...el,
              quantity:
                value === "increase"
                  ? el.quantity + 1
                  : value === "decrease"
                  ? el.quantity - 1 <= 0
                    ? el.quantity
                    : el.quantity - 1
                  : value,
            }
          : el
      );
      localStorage.setItem("shopping_cart", JSON.stringify(newState));
      return newState;
    });
  };

  useEffect(() => {
    if (localStorage.getItem("shopping_cart")) {
      setShoppingCart(JSON.parse(localStorage.getItem("shopping_cart")));
    }
  }, []);

  return (
    <CartContext.Provider value={[shoppingCart, { push, remove, updateQuantity }]}>{children}</CartContext.Provider>
  );
};
