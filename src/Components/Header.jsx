import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  SearchOutlined as SearchIcon,
  MenuOpenOutlined as MenuIcon,
  MoreVertOutlined as SettingsIcon,
  KeyboardBackspaceOutlined as BackIcon,
  ShoppingCartOutlined as CartIcon,
  LogoutOutlined as LogoutIcon,
  PersonOutline as PersonIcon,
} from "@mui/icons-material";
import { EcommerceIcon } from "../Components/Icons";
import useSession from "../Hooks/useSession";
import useConfig from "../Hooks/useConfig";
import useCart from "../Hooks/useCart";

function Header({ isInvalidSession = false }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [session, { logout }] = useSession();
  const [, { toggleSidebar }] = useConfig();
  const [shoppingCart] = useCart();
  const [search, setSearch] = useState("");
  const [profileMenu, setProfileMenu] = useState(null);

  if (!session.user) {
    return <></>;
  }

  return (
    <>
      {!isMobile ? (
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <Grid display="flex" alignItems="center" gap={2} width="100%">
              <Link fontSize={24} fontWeight={500} component={RouterLink} to="/" sx={{ textDecoration: "none" }}>
                Avovite
              </Link>
              {!isInvalidSession && (
                <TextField
                  label="Buscar"
                  size="small"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary">
                          <SearchIcon color="inherit" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginLeft: 2 }}
                />
              )}
              <Box flexGrow={1} />
              {!session.user?.isAdmin() && !isInvalidSession && (
                <Badge color="error" badgeContent={shoppingCart.length}>
                  <Button component={RouterLink} variant="contained" size="small" to="/cart">
                    <EcommerceIcon />
                  </Button>
                </Badge>
              )}
              <Divider orientation="vertical" variant="middle" flexItem />
              <Button
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                onClick={(event) => {
                  setProfileMenu(event.currentTarget);
                }}
              >
                <Avatar alt={session.user.fullname} src={session.user.avatar} />
                <Grid display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
                  <Typography fontWeight={500} lineHeight={1}>
                    {session.user.fullname}
                  </Typography>
                  <Typography variant="caption" fontWeight={300} lineHeight={1}>
                    {session.user?.isAdmin() ? "Admin" : "Member"}
                  </Typography>
                </Grid>
              </Button>
            </Grid>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="relative" color="secondary" elevation={0}>
          <Toolbar>
            <Grid display="flex" justifyContent="space-between" alignItems="center" width="100%">
              {!isInvalidSession && (
                <IconButton onClick={() => toggleSidebar()}>
                  <MenuIcon sx={{ color: "white" }} />
                </IconButton>
              )}
              <Link
                fontSize={24}
                fontWeight={500}
                component={RouterLink}
                to="/"
                sx={{ textDecoration: "none", color: "white" }}
              >
                Avovite
              </Link>
              <IconButton
                color="inherit"
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                onClick={(event) => {
                  setProfileMenu(event.currentTarget);
                }}
              >
                <Avatar alt={session.user.name} src={session.user.avatar} />
              </IconButton>
            </Grid>
          </Toolbar>

          {!isInvalidSession && (
            <Box
              position="absolute"
              zIndex={1}
              top="100%"
              left={0}
              right={0}
              display="flex"
              alignItems="center"
              gap={1}
              paddingX={3}
              paddingY={1}
              sx={{ backgroundColor: "primary.main" }}
            >
              <IconButton onClick={() => navigate(-1)}>
                <BackIcon sx={{ color: "white" }} />
              </IconButton>
              <Typography color="white">Ir Atrás</Typography>
            </Box>
          )}
        </AppBar>
      )}

      <Menu
        anchorEl={profileMenu}
        open={!!profileMenu}
        elevation={2}
        onClose={() => setProfileMenu(null)}
        sx={{ top: 16, minWidth: 200 }}
      >
        <MenuItem sx={{ display: "flex", gap: 2 }} onClick={() => !isInvalidSession && navigate("/profile")}>
          <Avatar />
          <Grid display="flex" flexDirection="column" maxWidth={184}>
            <Typography
              lineHeight={1}
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: " nowrap",
              }}
            >
              {session.user.fullname}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: " nowrap",
              }}
            >
              {session.user.email}
            </Typography>
          </Grid>
        </MenuItem>
        <Divider />
        {!session.user?.isAdmin() && !isInvalidSession && isMobile && (
          <>
            <MenuItem onClick={() => navigate("/cart")}>
              <ListItemIcon>
                <Badge color="error" badgeContent={shoppingCart.length}>
                  <CartIcon fontSize="small" />
                </Badge>
              </ListItemIcon>
              <ListItemText>Carrito</ListItemText>
            </MenuItem>
            <Divider />
          </>
        )}

        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <LogoutIcon color="error" fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Cerrar sesión</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}

export default Header;
