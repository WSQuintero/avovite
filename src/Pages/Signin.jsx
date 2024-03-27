import { useMemo, useState, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useSession from "../Hooks/useSession";
import AuthService from "../Services/auth.service";
import { Box, Button, Grid, InputAdornment, Link, TextField, Typography, Snackbar, Alert, Modal } from "@mui/material";
import { PersonOutlineOutlined as PersonIcon, LockOpenOutlined as LockIcon } from "@mui/icons-material";

import BackgroundImage from "../assets/img/signin/background.jpg";
import LogoImage from "../assets/img/common/logo.svg";

function Signin() {
  const [, { setToken }] = useSession();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [feedback, setFeedback] = useState({ show: false, message: "", status: "success" });
  const $Auth = useMemo(() => new AuthService(), []);
  const [intermediateToken, setIntermediateToken] = useState();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const tokenParam = searchParams.get("token");
  const [open, setOpen] = useState();

  const onUserChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onSignin = async (event) => {
    event.preventDefault();

    const { status, data } = await $Auth.signin(user);

    if (!status) {
      setFeedback({
        show: true,
        message: "Credenciales incorrectas.",
        status: "error",
      });

      return;
    }
    setOpen(true);
    setIntermediateToken(data);
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    const validateEmail = async () => {
      if (tokenParam) {
        const { status, data } = await $Auth.validateEmail(tokenParam);

        if (status) {
          setFeedback({
            show: true,
            message: "Correo Electrónico validado correctamente.",
            status: "success",
          });
        }
      }
    };

    validateEmail();
  }, [tokenParam]);

  const handleClose = () => {
    setOpen(false);
    setToken(intermediateToken);
  };
  return (
    <>
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
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            [theme.breakpoints.down("md")]: {
              borderRadius: 0,
              order: 0,
              width: "100vw",
              height: "33vh",
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
              height: "67vh",
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
          <Box display="flex" flexDirection="column" gap={2} component="form" width="100%" maxWidth={550} onSubmit={onSignin}>
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
            <Button variant="contained" size="large" type="submit">
              Iniciar Sesion
            </Button>
            <Link component={RouterLink} textAlign="center" to="/forgot-password">
              ¿Has olvidado tu contraseña?
            </Link>
            <Link component={RouterLink} textAlign="center" to="/signup">
              No tengo cuenta registrame
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            padding: 10,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" id="modal-title">
            Actualización y Mantenimiento
          </Typography>
          <Typography variant="body1" id="modal-description" sx={{ marginTop: 5 }}>
            Estamos realizando una actualización y mantenimiento en nuestra plataforma para mejorar tu experiencia. Durante este tiempo,
            pueden surgir algunos errores o interrupciones temporales en el servicio.
          </Typography>
          <Button onClick={handleClose} variant="contained" color="primary" sx={{ marginTop: 5 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default Signin;
