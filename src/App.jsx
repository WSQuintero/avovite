import { useEffect, useMemo, useState } from "react";
import Router from "./Router";
import useSession from "./Hooks/useSession";
import useConfig from "./Hooks/useConfig";
import AuthService from "./Services/auth.service";
import UtilsService from "./Services/utils.service";
import Loader from "./Components/Loader";
import ContractValidation from "./Components/ContractValidation";

function App() {
  const [session, { setUser, logout }] = useSession();
  const [{ loading }, { setLoading, setConstants }] = useConfig();
  const [sessionStatus, setSessionStatus] = useState(true);
  const $Auth = useMemo(() => new AuthService(session.token), [session.token]);
  const $Utils = useMemo(() => new UtilsService(session.token), [session.token]);

  const validateSession = async () => {
    if (session.token) {
      const { status, data } = await $Auth.validate();

      if (!status && data !== null && data.response?.status === 401) {
        logout();
      }

      if (status) {
        // setSessionStatus(false);
        setUser(data.user);
      }
    }
  };

  const fetchConstants = async () => {
    const { status, data } = await $Utils.getConstants();

    if (status) {
      setConstants(data.data);
    }
  };

  useEffect(() => {
    (async () => {
      await validateSession();
      await fetchConstants();
      setLoading(false);
    })();
  }, [session.token]);

  return (
    <>
      <Loader show={loading} />
      {!loading && (sessionStatus ? <Router /> : <ContractValidation />)}
    </>
  );
}

export default App;
