import { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PhoneField from "react-phone-input-2";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputAdornment,
  Link,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  PersonOutlineOutlined as PersonIcon,
  EmailOutlined as EmailIcon,
  LockOpenOutlined as LockIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { tooltipClasses } from "@mui/material";
import AuthService from "../Services/auth.service";

import BackgroundImage from "../assets/img/signup/background.png";
import LogoImage from "../assets/img/common/logo.svg";

const StatusIcon = ({ status = false }) => {
  return status ? <CheckCircleIcon /> : <ErrorIcon />;
};

function Signin() {
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    password: "",
    cellphone: "",
    privacyPolicy: false,
  });
  const [feedback, setFeedback] = useState({ show: false, message: "", status: "success" });
  const $Auth = useMemo(() => new AuthService(), []);
  const passwordStatus = useMemo(
    () => ({
      minimumCharacters: user.password.length >= 8 ? true : false,
      atLeastOneUppercase: /^(?=.*[A-Z])/g.test(user.password) ? true : false,
      atLeastOneSymbol: /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(user.password) ? true : false,
    }),
    [user.password]
  );

  const onUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSignup = async (event) => {
    event.preventDefault();

    if (!(user.fullname && user.email && user.password && user.cellphone)) {
      setFeedback({
        show: true,
        message: "Todos los campos son obligatorios.",
        status: "error",
      });

      return;
    }

    if (!user.privacyPolicy) {
      setFeedback({
        show: true,
        message: "Debes aceptar Térmimos, condiciones y políticas de privacidad para poder continuar.",
        status: "error",
      });

      return;
    }

    if (!(passwordStatus.minimumCharacters && passwordStatus.atLeastOneUppercase && passwordStatus.atLeastOneSymbol)) {
      setFeedback({
        show: true,
        message: "La contraseña no cumple las condiciones.",
        status: "error",
      });

      return;
    }

    const { status } = await $Auth.signup(user);

    if (!status) {
      setFeedback({
        show: true,
        message: "Ha ocurrido un error, inténtelo de nuevo.",
        status: "error",
      });
    } else {
      setFeedback({
        show: true,
        message: "Te has registrado exitosamente.",
        status: "success",
      });
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
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
            name="fullname"
            label="Nombre de usuario"
            sx={{ width: "100%" }}
            value={user.fullname}
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
          <Tooltip
            placement="right"
            title={
              <Box display="flex" flexDirection="column">
                <Grid display="flex" gap={1}>
                  <StatusIcon status={passwordStatus.minimumCharacters} />
                  <Typography>Mínimo 8 caracteres.</Typography>
                </Grid>
                <Grid display="flex" gap={1}>
                  <StatusIcon status={passwordStatus.atLeastOneSymbol} />
                  <Typography>Al menos un símbolo.</Typography>
                </Grid>
                <Grid display="flex" gap={1}>
                  <StatusIcon status={passwordStatus.atLeastOneUppercase} />
                  <Typography>Al menos una mayúscula.</Typography>
                </Grid>
              </Box>
            }
          >
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
          </Tooltip>
          <PhoneField
            enableSearch={true}
            value={user.cellphone}
            country="co"
            specialLabel=""
            autoFormat={true}
            inputStyle={{
              width: "100%",
            }}
            inputProps={{
              name: "cellphone",
              required: true,
            }}
            isValid={(value, country) => {
              if (value.match(/12345/)) {
                return "Invalid value:" + value + ", " + country.name;
              } else {
                return true;
              }
            }}
            onChange={(value) => onUserChange({ target: { name: "cellphone", value } })}
          />
          {user.privacyPolicy ? "si" : "noo"}
          <FormControlLabel
            control={
              <Checkbox
                value={user.privacyPolicy}
                name="privacyPolicy"
                onChange={({ target }) => onUserChange({ target: { name: "privacyPolicy", value: target.checked } })}
              />
            }
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
      <Snackbar
        open={feedback.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetFeedback}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}

export default Signin;
