import { createContext, useCallback, useState } from "react";

export const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({ loading: true });

  return (
    <ConfigContext.Provider
      value={[
        config,
        {
          setLoading: useCallback((value) => setConfig((prev) => ({ ...prev, loading: value })), []),
        },
      ]}
    >
      {children}
    </ConfigContext.Provider>
  );
};
