import { useMemo } from "react";
import useSession from "./useSession";
import ShopService from "../Services/shop.service";

function useShop() {
  const [session] = useSession();
  const $Shop = useMemo(() => (session.token ? new ShopService(session.token) : null), [session.token]);

  return $Shop;
}

export default useShop;
