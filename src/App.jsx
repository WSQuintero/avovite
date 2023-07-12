import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/_default.css";
import FinalContextProvider from "./Context/FinalContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#67AA36",
    },
    secondary: {
      main: "#FDFDFD",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#5D9B31",
      disabled: "#C0C0C0",
    },
    background: {
      paper: "#E8E8E8",
    },
    info: {
      main: "#C0C0C0",
    },
    disabled: {
      main: "#C0C0C0",
    },
    error: {
      main: "#ff0000",
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h2: {
      fontWeight: 600,
      fontSize: 32,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        sx: {
          bgcolor: "#F5F7F9",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        style: {
          borderRadius: 12,
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        style: {
          borderRadius: 12,
        },
      },
    },
    MuiInputAdornment: {
      defaultProps: {
        sx: {
          color: "text.disabled",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        sx: {
          color: "text.secondary",
          textDecorationColor: "black",
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: "transparent",
        },
        list: {
          '&[role="menu"]': {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #C0C0C0",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FinalContextProvider>
        {" "}
        {/* Usar FinalContextProvider como proveedor del contexto */}
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </FinalContextProvider>
    </ThemeProvider>
  );
}

export default App;
