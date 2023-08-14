import { createContext, useCallback, useEffect, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ loading: true, onboarding: true, sidebar: false, constants: null });

  const setter = (key, value = null) => setConfig((prev) => ({ ...prev, [key]: value === null ? !prev[key] : value }));

  const setters = {
    setLoading: useCallback((value) => setter("loading", value), []),
    setOnboarding: useCallback((value) => {
      setter("onboarding", value);
      localStorage.setItem("onboarding", value);
    }, []),
    toggleSidebar: useCallback(() => setter("sidebar"), []),
    setConstants: useCallback((value) => setter("constants", value), []),
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("onboarding")) === false) {
      setters.setOnboarding(false);
    }
  }, []);

  return <ConfigContext.Provider value={[config, setters]}>{children}</ConfigContext.Provider>;
};
