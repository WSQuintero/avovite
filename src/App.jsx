import { BrowserRouter } from "react-router-dom";
import Router from "./Router";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./assets/css/_default.css";
import FinalContextProvider, { useFinalContext } from "./Context/FinalContext";

import { useState } from "react";
import { Grid } from "@mui/material";
import Private from "./Components/Private";
import Sidebar from "./Components/Sidebar";

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
      primary: "#c0c0c0",
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
          backgroundColor: "#ffffff",
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
          backgroundColor: "#EEEEEE66", // Cambia el color de fondo según tus preferencias
          border: "none",
          color: "#757575", // Cambia el color del texto según tus preferencias
          fontSize: "16px", // Ajusta el tamaño de fuente según tus necesidades
          
          fontWeight: 500,
          width:350
        },
      },
      defaultProps: {
        inputProps: {
          color: "#757575",

        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          color: '#757575',
          fontSize: 18,
          '&:hover': {
            borderWidth: 3,
            backgroundColor: '#EEEEEE',
          },
        },
        selected: {
          backgroundColor: '#C0C0C0', // Color de fondo cuando está seleccionado
          color: 'black', // Color del texto cuando está seleccionado
        },
      },
    },
    MuiSelect:{
      styleOverrides:{
        root:{
          borderRadius: 12,
          backgroundColor: "#EEEEEE66", // Cambia el color de fondo según tus preferencias
          border: "none",
          color: "#757575", // Cambia el color del texto según tus preferencias
          fontSize: "16px", // Ajusta el tamaño de fuente según tus necesidades
          fontWeight: 500,
         
          "&:hover":{
            borderWidth:3,
           
          },
        },
       
        
      },
      defaultProps:{
        inputProps:{
          color:'#C0C0C0'
        }
      },
      
    },
    MuiTable:{
      styleOverrides:{
        root:{
          backgroundColor:'#FFFFFF',
          
        }
      },
    
    },
    MuiTableHead:{
      styleOverrides:{
        root:{
          color:'#67AA36',
          backgroundColor:'#67AA36'
        
        }
      }
    },
    MuiTableBody:{
      styleOverrides:{
        root:{
          border:'none'
        }
      }
    },
    MuiTableCell:{
      styleOverrides:{
        root:{
         
          color:'#67AA36',
          textAlign:'center'
         
        }
      }
    },
    MuiTableContainer:{
      styleOverrides:{
        root:{
          display:'flex',
          color:'#67AA36',
          
          alignItems:'center'
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
        <Private>
          <Router/>
        </Private>
      </FinalContextProvider>
    </ThemeProvider>
  );
}

export default App;
