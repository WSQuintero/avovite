import React from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  InputAdornment,
  Link,
  Paper,
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";

function Home() {
  const theme = useTheme();
  const route = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Grid display="flex" flexDirection="column">
      <Box position="relative" height="50vh">
        <img
          src={BackgroundPhoto}
          alt="photo"
          style={{ width: "100%", height: "100%", objectFit: "cover" , objectPosition:'center'}}
        />
        <Box
          position="absolute"
          left={0}
          top={0}
          width="100%"
          height="100%"
          bgcolor="filter.main"
          sx={{ opacity: 0.25 }}
        ></Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          borderRadius="50%"
          backgroundColor="white"
          overflow="hidden"
          bottom={0}
          left="50%"
          width={160}
          height={160}
          padding={2}
          sx={{ transform: "translate(-50%,50%)" }}
        >
          <img
            src={logo}
            alt="logos"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
      <Grid
        flexGrow={1}
        paddingX={4}
        paddingY={2}
        display="flex"
        flexDirection="column"
        gap={4}
      >
        <Box height={80}></Box>
        <Typography
          color="primary"
          textAlign="center"
          width="75%"
          marginX="auto"
        >
          Las ganancias del aguacate HASS Colombiano son para todos
        </Typography>
        <Grid display='flex' gap={2}>
          <Button variant="contained"  fullWidth sx={{color:'white'}}>Iniciar sesión</Button>
          <Button variant="outlined" fullWidth>Inscribirse</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home;
