import { NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AndroidOutlined as SampleIcon, ChevronRightOutlined as ChevronRightIcon } from "@mui/icons-material";

const routes = [
  {
    name: "Vites",
    route: "/",
  },
  {
    name: "Billetera",
    route: "/wallet",
  },
  {
    name: "Cosechas",
    route: "/crops",
  },
  {
    name: "Ganancias",
    route: "/earnings",
  },
  {
    name: "Comprar Vites",
    route: "/buy",
  },
  {
    name: "Perfil",
    route: "/profile",
  },
];

function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={(t) => ({
        flexShrink: 0,
        width: t.sizes.sidebar.main,
        backgroundColor: "primary.main",
        "& .MuiDrawer-paper": {
          width: t.sizes.sidebar.main,
          border: "none",
          backgroundColor: "transparent",
        },
      })}
    >
      <Toolbar />
      <Typography paddingX={2} color="common.white">
        Navegación
      </Typography>
      <List>
        {routes.map(({ name, route }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={route}
              sx={(t) => ({
                position: "relative",
                color: "text.secondary",
                fontWeight: 400,
                borderRadius: 0,
                "&.active": {
                  color: "white",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: 6,
                    backgroundColor: "white",
                  },
                  "& .chevron-icon": {
                    display: "none",
                  },
                },
              })}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <SampleIcon sx={{ color: "inherit" }} />
              </ListItemIcon>
              <ListItemText primary={name} />
              <ChevronRightIcon className="chevron-icon" sx={{ color: "inherit" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
