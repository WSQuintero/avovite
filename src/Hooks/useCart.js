import { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";

const useCart = () => {
  return useContext(CartContext);
};

export default useCart;
