import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import menuSidebar from "../assets/img/header menu copy.svg";

import {
  Search as SearchIcon,
  MailOutline as MailOutlineIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
} from "@mui/icons-material";
import { InputAdornment } from "@mui/material";

import { useState } from "react";
import bomb from "../assets/img/Sidebar/Bomb.svg";
import profile from "../assets/img/Sidebar/profile default.svg";
import icon from "../assets/img/Sidebar/icon.svg";
import vites from "../assets/img/Sidebar/vites.svg";
import Billetera from "../assets/img/Sidebar/Billetera.svg";
import Cosechas from "../assets/img/Sidebar/Cosechas.svg";
import Ganancias from "../assets/img/Sidebar/Ganancias.svg";
import ComprarVites from "../assets/img/Sidebar/ComprarVites.svg";
import Perfil from "../assets/img/Sidebar/Perfil.svg";
import vector from '../assets/img/Sidebar/vector.svg'
import { Button, Grid, TextField } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

// Función para obtener la imagen correspondiente al nombre del elemento
const getIconByName = (name) => {
  const iconMap = {
    vites: vites,
    Billetera: Billetera,
    Cosechas: Cosechas,
    Ganancias: Ganancias,
    "Comprar Vites": ComprarVites,
    Perfil: Perfil,
  };

  return iconMap[name] || icon; // Devuelve el icono correspondiente o el icono por defecto si no encuentra una imagen para el nombre dado
};

export default function Sidebar({ setOpen, open }) {
  const theme = useTheme();
  // const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={(theme)=>({
      display:'none',
      [theme.breakpoints.up('lg')]:{
        display: "flex"
      }
       })}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{ border: "none", borderColor: "white" }}
      >
        <Toolbar
          sx={{
            width: "100%",
            bgcolor: "white",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            onClick={handleDrawerOpen}
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                display: "none",
                paddingLeft: 100,
                color: "secondary.body",
                textTransform: "none",
                mr: 2,
                ...(open && { display: "none" }),
              },
            })}
            // Open the sidebar when this button is clicked
            startIcon={
              <img src={menuSidebar} width={20} height={20} alt="menuSidebar" />
            }
          />
          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingLeft={30}
            gap={2}
          >
            <Typography variant="h3">Avovite App</Typography>
            <TextField
              fullWidth
              sx={{ bgcolor: "transparent" }}
              placeholder="typr to sdearch"
              InputProps={{
                style: {
                  color: "black",
                  height: "40px",
                  width: "80%",
                  fontSize: 15,
                  fontWeight: 500,
                  borderRadius: "10px",
                  border: "none",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={bomb} alt="bomb" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              },
            })}
          >
            <Button
              variant="contained"
              sx={{ bgcolor: "primary.main" }}
              startIcon={<ShoppingCartOutlinedIcon sx={{ color: "white" }} />}
            ></Button>
            <Box border={1} borderColor="text.disabled" height={40}></Box>
            <img src={profile} alt="profile" />
            <Grid display="flex" flexDirection="column">
              <Typography variant="h3" color="text.cards">
                Jhonatan
              </Typography>
              <Typography variant="h3" color="text.disabled">
                Admin
              </Typography>
            </Grid>
          </Grid>
          <Button
            sx={(theme) => ({
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
            endIcon={<MoreVertIcon style={{ color: "white" }} />}
          />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
        open={open}
      >
        <DrawerHeader
          sx={{
            bgcolor: "primary.main",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            height: 340,
          }}
        >
          <img style={{ marginRight: 90 }} src={icon} alt="icon" />
          <Typography sx={{ marginTop: 2, marginRight: 15 }}>
            Navigation
          </Typography>
        </DrawerHeader>

        <List sx={{ bgcolor: "primary.main" , paddingX:2}}>
          {[
            "vites",
            "Billetera",
            "Cosechas",
            "Ganancias",
            "Comprar Vites",
            "Perfil",
          ].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <img src={getIconByName(text)} alt={text} />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
              <img src={vector} alt="Vector" />
            </ListItem>
          ))}
        </List>

        <Box height="100%" bgcolor="primary.main"></Box>
      </Drawer>
    </Box>
  );
}
