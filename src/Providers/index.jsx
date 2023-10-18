import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ConfigProvider } from "../Providers/ConfigProvider";
import { SessionProvider } from "../Providers/SessionProvider";
import { CartProvider } from "../Providers/CartProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Theme from "../Theme";
import 'dayjs/locale/es';

function MasterProvider({ children }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <SessionProvider>
          <CartProvider>
            <ConfigProvider>{children}</ConfigProvider>
          </CartProvider>
        </SessionProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default MasterProvider;
