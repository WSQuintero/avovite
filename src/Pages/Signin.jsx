import { Link as RouterLink } from "react-router-dom";
import { Box, Grid, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { PersonOutlineOutlined as PersonIcon, LockOpenOutlined as LockIcon } from "@mui/icons-material";

import siginphoto from "../assets/img/backgroundOfLogin/signinImg.png";
import logo from "../assets/img/logo.svg";
import { useState } from "react";

function Signin() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSignin = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      })}
    >
      <Box
        borderRadius={4}
        display="flex"
        height="100vh"
        width="50vw"
        order={1}
        sx={(theme) => ({
          overflow: "hidden",
          backgroundImage: `url(${siginphoto})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "-5px",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          [theme.breakpoints.down("md")]: {
            borderRadius: 0,
            order: 0,
            width: "100vw",
            height: "50vh",
          },
        })}
      ></Box>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        padding={4}
        height="100vh"
        width="50vw"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            width: "100vw",
            height: "50vh",
          },
        })}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          backgroundColor="white"
          overflow="hidden"
          width={160}
          height={160}
          padding={2}
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%,-50%)",
            },
          })}
        >
          <img src={logo} alt="logos" style={{ width: "100%", height: "100%" }} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          component="form"
          width="100%"
          maxWidth={550}
          onSubmit={onSignin}
        >
          <Typography
            variant="h2"
            color="primary"
            textAlign="start"
            marginBottom={2}
            sx={(theme) => ({
              [theme.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            Ingresar
          </Typography>
          <TextField
            name="email"
            type="email"
            label="Correo electrónico"
            sx={{ width: "100%" }}
            value={user.email}
            onInput={onUserChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            name="password"
            type="password"
            label="Contraseña"
            sx={{ width: "100%" }}
            value={user.password}
            onInput={onUserChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />

          <Link component={RouterLink} textAlign="center" to="/forgot-password">
            ¿Has olvidado tu contraseña?
          </Link>
          <Link component={RouterLink} textAlign="center" to="/signup">
            No tengo cuenta registrame
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}

export default Signin;
