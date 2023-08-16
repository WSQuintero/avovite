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
import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useConfig from "../Hooks/useConfig";
import useSession from "../Hooks/useSession";

import background from "../assets/img/sidebar/background.png";

function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"), { noSsr: true });
  const [{ sidebar }, { toggleSidebar }] = useConfig();
  const [{ user }] = useSession();

  const routes = useMemo(
    () => [
      {
        icon: <InvestIcon />,
        name: "Vites",
        route: "/",
        show: true,
      },
      {
        icon: <AccountantIcon />,
        name: "Perfil",
        route: "/profile",
        show: true,
      },
      // {
      //   icon: <WalletIcon />,
      //   name: "Billetera",
      //   route: "/wallet",
      //   show: true,
      // },
      {
        icon: <GraphIcon />,
        name: "Ganancias",
        route: "/earnings",
        show: true,
      },
      {
        icon: <EcommerceIcon />,
        name: "Comprar Vites",
        route: "/shop",
        show: true,
      },
      {
        icon: <ProtectionIcon />,
        name: "Administrador",
        route: "/admin",
        show: user?.isAdmin(),
      },
    ],
    [user]
  );

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
              style={{ position: "absolute", zIndex: -1, top: "-50%", left: 0, right: 0, width: "100%" }}
            />
            <Grid display="flex" flexDirection="column" gap={1} paddingY={4} width="100%">
              <Avatar src={user.avatar} alt={user.name} sx={{ width: 48, height: 48 }} />
              <Grid display="flex" flexDirection="column" overflow="hidden">
                <Typography fontSize={24} fontWeight={600} lineHeight={1} color="white">
                  {user.fullname.split(" ")[0]}
                </Typography>
                <Typography variant="caption" fontWeight={200} color="white" textOverflow="ellipsis">
                  {user.email}
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </>
      )}
      <Typography padding={2} color="common.white">
        Navegación
      </Typography>
      <List sx={{ overflow: "hidden" }}>
        {routes.map(
          ({ icon, name, route, show }) =>
            show && (
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
            )
        )}
      </List>
    </Drawer>
  );
}

export default Sidebar;
