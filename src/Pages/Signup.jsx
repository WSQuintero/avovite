import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AuthService from "../Services/auth.service";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import {
  PersonOutlineOutlined as PersonIcon,
  EmailOutlined as EmailIcon,
  LockOpenOutlined as LockIcon,
} from "@mui/icons-material";

import BackgroundImage from "../assets/img/signup/background.png";
import LogoImage from "../assets/img/common/logo.svg";

function Signin() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    privacyPolicy: false,
  });
  const [feedback, setFeedback] = useState({ show: false, message: "", status: "success" });
  const $Auth = useMemo(() => new AuthService(), []);

  const onUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSignup = async (event) => {
    event.preventDefault();

    const { status, data } = await $Auth.signin(user);

    if (!status) {
      setFeedback({
        show: true,
        message: "Ha ocurrido un error, inténtelo de nuevo.",
        status: "error",
      });

      return;
    }

    setToken(data.token);
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
          backgroundImage: `url(${BackgroundImage})`,
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
          <img src={LogoImage} alt="logos" style={{ width: "100%", height: "100%" }} />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          component="form"
          width="100%"
          maxWidth={550}
          onSubmit={onSignup}
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
            Crear Cuenta
          </Typography>
          <TextField
            name="name"
            label="Nombre de usuario"
            sx={{ width: "100%" }}
            value={user.email}
            onInput={onUserChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
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
          <FormControlLabel
            control={<Checkbox value={user.privacyPolicy} />}
            label={
              <Typography>
                He leido y acepto los{" "}
                <Link component={RouterLink} textAlign="center" to="/privacy-policy" target="_blank">
                  terminos y condiciones
                </Link>
              </Typography>
            }
          />
          <Button variant="contained" size="large" type="submit">
            Crear Cuenta
          </Button>
          <Link component={RouterLink} textAlign="center" to="/signin">
            ¿Ya tienes cuenta?
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}

export default Signin;
