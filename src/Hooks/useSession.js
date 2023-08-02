import { useContext } from "react";
import { SessionContext } from "../Providers/SessionProvider";

const useSession = () => {
  return useContext(SessionContext);
};

export default useSession;
