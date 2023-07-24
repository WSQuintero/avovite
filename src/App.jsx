import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/_default.css";
import FinalContextProvider from "./Context/FinalContext";
import Sidebar from "./Components/Sidebar";
import { useState } from "react";
import { Grid } from "@mui/material";
import { Height } from "@mui/icons-material";

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
    h3: {
      fontWeight: 400,
      fontSize: 18,
      color: "#67AA36",
    },
    h2: {
      fontWeight: 600,
      fontSize: 32,
      color: "#67AA36",
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
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: "#C0C0C0", // Cambia el color de fondo según tus preferencias
          border: "none",
          color: "#c0c0c0", // Cambia el color del texto según tus preferencias
          fontSize: "16px", // Ajusta el tamaño de fuente según tus necesidades
          fontWeight: 500,
          width:350
        },
      },
      defaultProps: {
        inputProps: {
          color: "#c0c0c0",

        },
      },
    },
    MuiMenuItem:{
      styleOverrides:{
        root:{
          backgroundColor:'#C0C0C0',
          color:'white',
          fontSize:18,
          "&:hover":{
            borderWidth:3
          }
        }
      }
    },
    MuiSelect:{
      styleOverrides:{
        root:{
          borderRadius: 12,
          backgroundColor: "#C0C0C0", // Cambia el color de fondo según tus preferencias
          border: "none",
          color: "white", // Cambia el color del texto según tus preferencias
          fontSize: "16px", // Ajusta el tamaño de fuente según tus necesidades
          fontWeight: 500,
          width:350
        }
      },
      defaultProps:{
        inputProps:{
          color:'white'
        }
      }
    }
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
        <Grid sx={(theme)=>({
          [theme.breakpoints.up('lg')]:{
            display: "flex", 
            justifyContent: "end" 
          }
         })}>
          <Grid sx={(theme)=>({
            [theme.breakpoints.up('lg')]:{
             
              width:"15%"
            }
           })}
          >
            <Sidebar setOpen={setOpen} open={open} />
          </Grid>

          <Grid sx={(theme)=>({
            [theme.breakpoints.up('lg')]:{
             
              width:"75%"
            }
           })}
          >
            <Router />
          </Grid>
        </Grid>
      </FinalContextProvider>
    </ThemeProvider>
  );
}

export default App;
