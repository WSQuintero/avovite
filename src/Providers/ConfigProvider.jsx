import { createContext, useCallback, useEffect, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ loading: true, onboarding: true, sidebar: false });

  const setter = (key, value = null) => setConfig((prev) => ({ ...prev, [key]: value === null ? !prev[key] : value }));
  const setLoading = useCallback((value) => setter("loading", value), []);
  const setOnboarding = useCallback((value) => {
    setter("onboarding", value);
    localStorage.setItem("onboarding", value);
  }, []);
  const toggleSidebar = useCallback(() => setter("sidebar"), []);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("onboarding")) === false) {
      setOnboarding(false);
    }
  }, []);

  return (
    <ConfigContext.Provider value={[config, { setLoading, setOnboarding, toggleSidebar }]}>
      {children}
    </ConfigContext.Provider>
  );
};
