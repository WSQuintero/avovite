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
import { AndroidOutlined as SampleIcon, ChevronRightOutlined as ChevronRightIcon } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useConfig from "../Hooks/useConfig";
import useSession from "../Hooks/useSession";

import background from "../assets/img/wallet/background.png";

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
              style={{ position: "absolute", zIndex: -1, top: "-50%", left: 0, right: 0, width: "100%" }}
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
      <List>
        {routes.map(({ name, route }) => (
          <ListItem key={name} disablePadding>
            <ListItemButton
              component={NavLink}
              to={route}
              sx={(t) => ({
                position: "relative",
                color: "text.light",
                borderRadius: 0,
                paddingLeft: 4,
                paddingY: 1.5,
                "&.active": {
                  color: "white",
                  "&::after": {
                    transform: "translate(0)",
                    opacity: 1,
                  },
                  "& .chevron-icon": {
                    transform: "translate(100%)",
                    opacity: 0,
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
                  transform: "translateX(100%)",
                  transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
                },
              })}
            >
              <ListItemIcon sx={{ color: "inherit" }}>
                <SampleIcon sx={{ color: "inherit" }} />
              </ListItemIcon>
              <Typography flexGrow={1} fontSize={16} fontWeight={400}>
                {name}
              </Typography>
              <ChevronRightIcon
                className="chevron-icon"
                sx={{
                  color: "inherit",
                  opacity: 1,
                  transform: "translate(0)",
                  transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
