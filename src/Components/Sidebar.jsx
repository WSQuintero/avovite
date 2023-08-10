import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Typography,
  alpha,
} from "@mui/material";
import { InvestIcon, WalletIcon, GraphIcon, EcommerceIcon, AccountantIcon, ProtectionIcon } from "./Icons";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useConfig from "../Hooks/useConfig";
import useSession from "../Hooks/useSession";

import background from "../assets/img/sidebar/background.png";

const routes = [
  {
    icon: <InvestIcon />,
    name: "Vites",
    route: "/",
  },
  {
    icon: <WalletIcon />,
    name: "Billetera",
    route: "/wallet",
  },
  {
    icon: <GraphIcon />,
    name: "Ganancias",
    route: "/earnings",
  },
  {
    icon: <EcommerceIcon />,
    name: "Comprar Vites",
    route: "/shop",
  },
  {
    icon: <AccountantIcon />,
    name: "Perfil",
    route: "/profile",
  },
  {
    icon: <ProtectionIcon />,
    name: "Administrador",
    route: "/admin",
  },
];

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [{ sidebar }, { toggleSidebar }] = useConfig();
  const [{ user }] = useSession();

  if (!user) {
    return <></>;
  }

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      open={sidebar}
      sx={(t) => ({
        flexShrink: 0,
        width: t.sizes.sidebar.main,
        "& .MuiDrawer-paper": {
          width: t.sizes.sidebar.main,
          border: "none",
          backgroundColor: "primary.main",
        },
      })}
      onClose={() => toggleSidebar()}
    >
      {isMobile && (
        <>
          <Toolbar>
            <img
              src={background}
              alt="background"
              style={{ position: "absolute", zIndex: -1, top: "-100%", left: 0, right: 0, width: "100%" }}
            />
            <Grid display="flex" justifyContent="space-between" alignItems="center" paddingY={4} width="100%">
              <Grid display="flex" flexDirection="column">
                <Typography fontSize={24} fontWeight={600} lineHeight={1} color="white">
                  {user.name.split(" ")[0]}
                </Typography>
                <Typography variant="caption" fontWeight={200} color="white">
                  {user.email}
                </Typography>
              </Grid>
              <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
            </Grid>
          </Toolbar>
          <Divider sx={{ borderColor: alpha("#ffffff", 0.25) }} />
        </>
      )}
      <Typography padding={2} color="common.white">
        Navegación
      </Typography>
      <List sx={{ overflow: "hidden" }}>
        {routes.map(({ icon, name, route }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={route}
              sx={(t) => ({
                position: "relative",
                color: "white",
                borderRadius: 0,
                paddingLeft: 4,
                paddingY: 1.5,
                transition: t.transitions.create(["background-color"], { duration: 200, easing: "ease-out" }),
                "&.active": {
                  backgroundColor: alpha(t.palette.common.white, 0.2),
                  "&::after": {
                    opacity: 1,
                  },
                },
                "&::after": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  right: 0,
                  width: 6,
                  opacity: 0,
                  backgroundColor: "white",
                  transition: "opacity 0.2s ease-out",
                },
              })}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
              <Typography flexGrow={1} fontSize={16} fontWeight={400}>
                {name}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
