import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ConfigProvider } from "../Providers/ConfigProvider";
import { SessionProvider } from "../Providers/SessionProvider";
import Theme from "../Theme";

function MasterProvider({ children }) {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <SessionProvider>
        <ConfigProvider>{children}</ConfigProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default MasterProvider;
