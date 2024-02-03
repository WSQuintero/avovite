import {
  Avatar,
  Collapse,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Toolbar,
  Typography,
  alpha,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import TermsAndConditions from "../Components/TermsAndConditions";
import { InvestIcon, GraphIcon, EcommerceIcon, AccountantIcon, ProtectionIcon, LoanIcon, RecieptIcon, AnnualIcon } from "./Icons";
import { useTheme } from "@emotion/react";
import { memo, useMemo, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import useConfig from "../Hooks/useConfig";
import useSession from "../Hooks/useSession";

import background from "../assets/img/sidebar/background.png";
import WhiteIcon from "../assets/img/common/icon_white.svg";
import WhiteLogo from "../assets/img/common/logo_white.png";
import { CONTRACT_TYPES } from "../utilities/constants";
import Image from "./Image";

const SidebarLink = ({ collapse, name, icon, route, subRoutes }) => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          component={NavLink}
          to={route}
          sx={(t) => ({
            position: "relative",
            color: "white",
            borderRadius: 0,
            paddingLeft: 4,
            paddingY: 1.5,
            overflowX: "hidden",
            transition: t.transitions.create(["background-color"], { duration: 200, easing: "ease-out" }),
            "&.active": {
              backgroundColor: alpha(t.palette.common.white, 0.2),
              "&::after": {
                opacity: 1,
                translate: 0,
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
              translate: "100%",
              backgroundColor: "white",
              transition: "opacity 0.2s ease-out, translate 0.2s ease-out",
            },
          })}
        >
          {icon && <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>}
          <Typography flexGrow={1} fontSize={16} fontWeight={400} paddingLeft={icon ? 0 : 2}>
            {name}
          </Typography>
        </ListItemButton>
      </ListItem>
      {subRoutes && (
        <Collapse in={collapse} timeout="auto" unmountOnExit>
          <List disablePadding>
            {subRoutes.map(({ name, route }) => (
              <SidebarLink key={name} open={false} name={name} route={route} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

const Sidebar = memo(function Sidebar({ collapseOn = "" }) {
  const theme = useTheme();
  const [modal, setModal] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"), { noSsr: true });
  const [{ sidebar }, { toggleSidebar }] = useConfig();
  const [{ user }] = useSession();

  const routes = useMemo(
    () => [
      {
        icon: <EcommerceIcon />,
        name: "Comprar Vites",
        route: "/shop",
        show: !user?.isAdmin() && !user?.isWhitelisted(),
      },
      {
        icon: <LoanIcon />,
        name: "Dashboard",
        route: "/dashboard",
        show: !user?.isAdmin(),
      },
      {
        icon: <InvestIcon />,
        name: "Vites",
        route: "/vites",
        show: !user?.isAdmin(),
      },
      {
        icon: <InvestIcon />,
        name: "Cosechas",
        route: "/harvests",
        show: !user?.isAdmin(),
      },
      {
        icon: <RecieptIcon />,
        name: "Transacciones",
        route: "/transactions",
        show: !user?.isAdmin(),
      },
      {
        icon: <RecieptIcon />,
        name: "Pagos",
        route: "/payments",
        show: !user?.isAdmin(),
      },
      {
        icon: <AnnualIcon />,
        name: "Pago por cuotas",
        route: user?.isWhitelisted() === CONTRACT_TYPES.mortgage ? "/registro-contrato-hipoteca" : "/registro-contrato",
        show: !user?.isAdmin() && user?.isWhitelisted(),
      },
      /* {
        icon: <GraphIcon />,
        name: "Ganancias",
        route: "/earnings",
        show: !user?.isAdmin(),
      }, */
      {
        icon: <ProtectionIcon />,
        name: "Administrador",
        route: "/admin",
        show: user?.isAdmin(),
        collapse: collapseOn === "admin",
        children: [
          {
            name: "Blog",
            route: "/admin/blog",
          },
          {
            name: "Conceptos",
            route: "/admin/concepts",
          },
          {
            name: "Contratos",
            route: "/admin/contracts",
          },
          {
            name: "Cosechas",
            route: "/admin/harvests",
          },
          // {
          //   name: "Lapsos",
          //   route: "/admin/date-ranges",
          // },
          {
            name: "Proveedores",
            route: "/admin/suppliers",
          },
          {
            name: "Split de pagos",
            route: "/admin/payment-split",
          },
          {
            name: "Tienda",
            route: "/admin/shop",
          },
          {
            name: "Usuarios",
            route: "/admin/users",
          },
          {
            name: "Verifik",
            route: "/admin/verifik",
          },
          {
            name: "Whitelist",
            route: "/admin/whitelist",
          },
        ],
      },
      {
        icon: <AccountantIcon />,
        name: "Perfil",
        route: "/profile",
        show: true,
      },
    ],
    [user, collapseOn]
  );

  if (!user) {
    return <></>;
  }else if(user.status_terms_and_conditions==0||!user.status_terms_and_conditions_date){
    return <></>;
  }

  return (<>
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
      {isMobile ? (
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
      ) : (
        <Toolbar>
          <img src={WhiteLogo} alt="Logo" height={40} />
        </Toolbar>
      )}
      <Typography padding={2} color="common.white">
        Navegación
      </Typography>
      <List>
        {routes.map(
          ({ icon, name, route, show, collapse, children }) =>
            show && <SidebarLink key={name} collapse={collapse} name={name} icon={icon} route={route} subRoutes={children} />
        )}
      </List>
      
      <Stack spacing={1} alignItems="center" mt="auto" mb={1}>
        <Typography variant="caption" color="white" lineHeight={1} style={{cursor: "pointer"}} onClick={()=>setModal("modal-terms")}>
          TÉRMINOS Y CONDICIONES
        </Typography>
      </Stack>
      
      <Stack direction="row" spacing={4} alignItems="center" pr={2}  mb={1} sx={{ opacity: 0.5 }}>
        <Image src={WhiteIcon} alt="Logo" width={128} marginLeft={-6} flexShrink={0} />
        <Typography variant="caption" color="white" lineHeight={1}>
          Las ganancias del aguacate Hass Colombiana son para todos
        </Typography>
      </Stack>
    </Drawer>
          
    <Dialog open={modal === "modal-terms"} onClose={() => setModal(null)}  maxWidth="md" fullWidth>
      <DialogTitle color="primary.main">Términos y Condiciones</DialogTitle>
      <DialogContent>
        <TermsAndConditions />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => setModal(null)}>
          Aceptaste los términos el: {user.status_terms_and_conditions_date.split("T")[0]} a las {user.status_terms_and_conditions_date.split("T")[1].replaceAll(".000Z","")}
        </Button>
      </DialogActions>
    </Dialog>
  </>);
});

export default Sidebar;
