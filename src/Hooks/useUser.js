import { useMemo } from "react";
import useSession from "./useSession";
import UserService from "../Services/user.service";

function useUser() {
  const [{ token }] = useSession();
  const $User = useMemo(() => (token ? new UserService(token) : null), [token]);

  return $User;
}

export default useUser;
