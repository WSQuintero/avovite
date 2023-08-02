import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import { AndroidOutlined as SampleIcon } from "@mui/icons-material";
import useSession from "../Hooks/useSession";

function Header() {
  const [session] = useSession();
  const [search, setSearch] = useState("");
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  if (!session.user) {
    return <></>;
  }

  return (
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
  );
}

export default Header;
