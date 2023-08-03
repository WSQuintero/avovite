import { createContext, useCallback, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ loading: true, onboarding: true, sidebar: false });

  const setter = (key, value = null) => setConfig((prev) => ({ ...prev, [key]: value === null ? !prev[key] : value }));

  return (
    <ConfigContext.Provider
      value={[
        config,
        {
          setLoading: useCallback((value) => setter("loading", value), []),
          setOnboarding: useCallback((value) => setter("onboarding", value), []),
          toggleSidebar: useCallback(() => setter("sidebar"), []),
        },
      ]}
    >
      {children}
    </ConfigContext.Provider>
  );
};
