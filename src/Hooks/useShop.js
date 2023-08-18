import { useMemo } from "react";
import useSession from "./useSession";
import ProductService from "../Services/product.service";

function useShop() {
  const [session] = useSession();
  const $Shop = useMemo(() => (session.token ? new ProductService(session.token) : null), [session.token]);

  return $Shop;
}

export default useShop;
