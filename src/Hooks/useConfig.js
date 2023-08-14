import { useContext } from "react";
import { ConfigContext } from "../Providers/ConfigProvider";

const useConfig = () => {
  return useContext(ConfigContext);
};

export default useConfig;
