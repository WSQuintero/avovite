import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#67AA36",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#214820",
      light: "#79C941",
    },
    text: {
      primary: "#979797",
      light: "#D2D2D2",
      disabled: "#c9c9c9",
    },
    background: {
      paper: "#E8E8E8",
    },
    info: {
      main: "#C0C0C0",
    },
    disabled: {
      main: "#757575",
    },
    error: {
      main: "#ff0000",
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: "'Poppins', sans-serif",
    h2: {
      fontWeight: 600,
      fontSize: 32,
      color: "#67AA36",
    },
    h3: {
      fontWeight: 500,
      fontSize: 24,
      color: "#67AA36",
    },
    h4: {
      fontWeight: 500,
      fontSize: 20,
      color: "#67AA36",
    },
  },
  shadows: Array.from({ length: 30 }, (_, i) => (i === 0 ? "none" : `0px 4px ${i}px 0px #45549229`)),
  shape: { borderRadius: 10 },
  components: {
    MuiDialogTitle: {
      defaultProps: { color: "#67AA36" },
    },
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
    MuiIcon: {
      defaultProps: {
        baseClassName: "fas",
        sx: {
          display: "flex",
          justifyContent: "center",
          width: "min-content",
          aspectRatio: 1,
          overflow: "visible",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
        },
        contained: {
          color: "#FFFFFF",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        sizeLarge: {
          paddingLeft: 2.5 * 8,
          paddingRight: 2.5 * 8,
          paddingTop: 1.5 * 8,
          paddingBottom: 1.5 * 8,
        },
      },
    },
    MuiFormLabel: {
      defaultProps: {
        sx: {
          color: "#979797",
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiInputBase: {
      defaultProps: {
        sx: {
          "& fieldset": { borderColor: "#979797" },
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: "inherit",
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
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          color: "#757575",
          fontSize: 18,
          "&:hover": {
            borderWidth: 3,
            backgroundColor: "#EEEEEE",
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          th: {
            color: "#67AA36",
            fontWeight: 500,
          },
        },
      },
    },
    MuiTableSortLabel: {
      styleOverrides: {
        icon: {
          fill: "white",
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      xsm: 400,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  sizes: {
    sidebar: {
      main: 256,
    },
    header: {
      main: 72,
    },
  },
});

export default createTheme(theme, {
  palette: {
    customWhite: theme.palette.augmentColor({
      color: {
        main: "#FFFFFF",
        light: "#FFFFFF",
        dark: "#DDDDDD",
      },
      name: "white",
    }),
    premium: theme.palette.augmentColor({
      color: {
        main: "#D0A723",
        dark: "#8B620D",
      },
      name: "premium",
    }),
  },
});
