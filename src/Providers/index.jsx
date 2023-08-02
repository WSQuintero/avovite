import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ConfigProvider } from "../Providers/ConfigProvider";
import { SessionProvider } from "../Providers/SessionProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Theme from "../Theme";

function MasterProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <SessionProvider>
          <ConfigProvider>{children}</ConfigProvider>
        </SessionProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default MasterProvider;
