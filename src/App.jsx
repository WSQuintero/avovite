import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/_default.css";
import FinalContextProvider from "./Context/FinalContext";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import { Grid } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#67AA36",
    },
    secondary: {
      main: "#D9D9D9",
      body: "#FFFFFF",
    },
    filter: {
      main: "#5D9B31",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#5D9B31",
      disabled: "#C0C0C0",
      cards: "#757575",
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
      fontWeight: 400,
      fontSize: 32,
    },
  },
  shape: {
    borderRadius: 10,
  },

  components: {
    MuiPaper: {
      defaultProps: {
        sx: {
          bgcolor: "#F5F7F9",
        },
      },
    },

    MuiCard: {
      defaultProps: {
        sx: {
          bgcolor: "#FFFFFF",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
      defaultProps: {
        sx: {
          paddingX: 2.5,
          paddingY: 1.5,
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
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FinalContextProvider>
        <Grid sx={{display:'flex', justifyContent:'end'}}>


        <Grid sx={{width: open? "15%": "0%" , 
         }}>

          <Sidebar setOpen={setOpen} open={open}/>
        </Grid>
          
          <Grid sx={{width: open? "75%": "100%" , 
         }}>

          <Router />
          </Grid>
        </Grid>
        
      </FinalContextProvider>
    </ThemeProvider>
  );
}

export default App;
