import { createContext, useEffect, useState } from "react";
import { CONTRACT_TYPES } from "../utilities/constants";

const sessionKey = "VE9LX0FWT19FTg";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ user: null, token: false });

  const setUser = (value) =>
    setSession((prev) => ({
      ...prev,
      user: {
        ...value,
        isAdmin: () => value.rol === 1,
        isWhitelisted: () =>
          value.approvedlist === 1 ? CONTRACT_TYPES.mortgage : value.approvedlist === 2 ? CONTRACT_TYPES.standard : null,
      },
    }));

  const setToken = (value) => setSession((prev) => ({ ...prev, token: value }));

  const logout = () => {
    localStorage.removeItem(sessionKey);
    setToken(null);
  };

  useEffect(() => {
    setToken(null);

    if (localStorage.getItem(sessionKey)) {
      setToken(localStorage.getItem(sessionKey));
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem(sessionKey) && session.token) {
      localStorage.setItem(sessionKey, session.token);
    }
  }, [session.token]);

  return <SessionContext.Provider value={[session, { setUser, setToken, logout }]}>{children}</SessionContext.Provider>;
};
