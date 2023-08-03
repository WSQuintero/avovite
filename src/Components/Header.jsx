import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "@emotion/react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  AndroidOutlined as SampleIcon,
  MenuOpenOutlined as MenuIcon,
  MoreVertOutlined as SettingsIcon,
  KeyboardBackspaceOutlined as BackIcon,
} from "@mui/icons-material";
import useSession from "../Hooks/useSession";
import useConfig from "../Hooks/useConfig";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [session] = useSession();
  const [, { toggleSidebar }] = useConfig();
  const [search, setSearch] = useState("");
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  if (!session.user) {
    return <></>;
  }

  return !isMobile ? (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid display="flex" alignItems="center" gap={2} width="100%">
          <Link fontSize={24} fontWeight={500} component={RouterLink} to="/" sx={{ textDecoration: "none" }}>
            Avovite app
          </Link>
          <TextField
            label="Buscar"
            size="small"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SampleIcon />
                </InputAdornment>
              ),
            }}
            sx={{ marginLeft: 2 }}
          />
          <Box flexGrow={1} />
          <Button variant="contained" size="small">
            <SampleIcon />
          </Button>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Button
            color="inherit"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setProfileMenuAnchor(event.target);
            }}
          >
            <Avatar alt={session.user.name} src={session.user.avatar} />
            <Grid display="flex" flexDirection="column" alignItems="flex-start" gap={0.5}>
              <Typography fontWeight={500} lineHeight={1}>
                {session.user.name}
              </Typography>
              <Typography variant="caption" fontWeight={300} lineHeight={1}>
                Admin
              </Typography>
            </Grid>
          </Button>
        </Grid>
      </Toolbar>

      <Menu
        anchorEl={profileMenuAnchor}
        open={!!profileMenuAnchor}
        elevation={0}
        onClose={() => setProfileMenuAnchor(null)}
      >
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <Grid display="flex" justifyContent="space-between" alignItems="center" gap={1} width="100%">
            <Typography>Profile & Notifications </Typography>
            <SampleIcon color="info" fontSize="small" />
          </Grid>
        </MenuItem>
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <Grid display="flex" justifyContent="space-between" alignItems="center" gap={1} width="100%">
            <Typography>Billing Settings</Typography>
            <SampleIcon color="info" fontSize="small" />
          </Grid>
        </MenuItem>
        <MenuItem onClick={() => setProfileMenuAnchor(null)}>
          <Grid display="flex" justifyContent="space-between" alignItems="center" gap={1} width="100%">
            <Typography color="error">Log Out</Typography>
            <SampleIcon color="error" fontSize="small" />
          </Grid>
        </MenuItem>
      </Menu>
    </AppBar>
  ) : (
    <AppBar position="relative" color="secondary" elevation={0}>
      <Toolbar>
        <Grid display="flex" justifyContent="space-between" width="100%">
          <IconButton onClick={() => toggleSidebar()}>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Link
            fontSize={24}
            fontWeight={500}
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "white" }}
          >
            Avovite app
          </Link>
          <IconButton>
            <SettingsIcon sx={{ color: "white" }} />
          </IconButton>
        </Grid>
      </Toolbar>
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
        <IconButton>
          <BackIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography color="white">Ir Atrás</Typography>
      </Box>
    </AppBar>
  );
}

export default Header;
