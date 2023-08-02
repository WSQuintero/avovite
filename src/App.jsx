import { useEffect, useMemo } from "react";
import Router from "./Router";
import useSession from "./Hooks/useSession";
import useConfig from "./Hooks/useConfig";
import AuthService from "./Services/auth.service";
import Private from "./Components/Private";

import "./assets/css/_default.css";

function App() {
  const [session, { setUser, logout }] = useSession();
  const [, { setLoading }] = useConfig();
  const $Auth = useMemo(() => new AuthService(session.token), [session.token]);

  const validateSession = async () => {
    const { status, data } = await $Auth.validate();

    if (!status && data !== null && data.response?.status === 401) {
      logout();
    }

    if (status) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    if (session.token) {
      (async () => {
        await validateSession();
      })();
    }

    setLoading(false);
  }, [session.token]);

  return (
    <Private>
      <Router />
    </Private>
  );
}

export default App;
