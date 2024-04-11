import { Box, Button, Container, Grid, Grow, InputAdornment, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import BackgroundImage from "../assets/img/signin/background.jpg";
import { useSnackbar } from "notistack";
import AuthService from "../Services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LockOpenOutlined as LockIcon, Error as ErrorIcon, CheckCircle as CheckCircleIcon } from "@mui/icons-material";
const $Auth = new AuthService();

function ForgotPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const currentEmail = useMemo(() => searchParams.get("email"), [searchParams]);
  const passwordStatus = useMemo(
    () => ({
      minimumCharacters: password.length >= 8 ? true : false,
      atLeastOneUppercase: /^(?=.*[A-Z])/g.test(password) ? true : false,
      atLeastOneSymbol: /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(password) ? true : false,
    }),
    [password]
  );
  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (!email) {
      enqueueSnackbar("Todos los campos son requeridos", { variant: "error" });
      return;
    }

    const { status } = await $Auth.forgotPassword({ email });

    if (status) {
      enqueueSnackbar("Revisa tu correo, recibiras un enlace para restablecer tu contraseña", {
        variant: "success",
        autoHideDuration: 5000,
      });
    } else {
      enqueueSnackbar("Ha ocurrido un error", { variant: "error" });
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    if (!(passwordStatus.minimumCharacters && passwordStatus.atLeastOneUppercase && passwordStatus.atLeastOneSymbol)) {
      enqueueSnackbar("La contraseña no cumple las condiciones", { variant: "error" });

      return;
    }
    if (!password) {
      enqueueSnackbar("Todos los campos son requeridos", { variant: "error" });
      return;
    }

    const { status } = await $Auth.forgotPassword({ email, token, password });

    if (status) {
      enqueueSnackbar("Tu contraseña ha sido restablecida", { variant: "success" });
      navigate("/signin");
    } else {
      enqueueSnackbar("Ha ocurrido un error", { variant: "error" });
    }
  };

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail]);
  const StatusIcon = ({ status = false }) => {
    return status ? <CheckCircleIcon /> : <ErrorIcon />;
  };
  return (
    <Stack
      position="relative"
      height="100vh"
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        "&:before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Container maxWidth="md" sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Grow in={!token} unmountOnExit>
          <Stack zIndex={1} width="100%" spacing={2} padding={2} bgcolor="white" borderRadius={2}>
            <Stack>
              <Typography fontSize={24} fontWeight={500} textAlign="center">
                ¿Olvidaste tu contraseña?
              </Typography>
              <Typography textAlign="center" fontSize={16}>
                Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
              </Typography>
            </Stack>

            <Stack component="form" spacing={2} width="100%" onSubmit={handleForgotPassword}>
              <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button fullWidth variant="contained" type="submit" size="large">
                Solicitar nueva contraseña
              </Button>
            </Stack>
          </Stack>
        </Grow>
        <Grow in={token} unmountOnExit>
          <Stack zIndex={1} width="100%" spacing={2} padding={2} bgcolor="white" borderRadius={2}>
            <Stack>
              <Typography fontSize={24} fontWeight={500} textAlign="center">
                Reestablecer contraseña
              </Typography>
              <Typography textAlign="center" fontSize={16}>
                Introduce tu nueva contraseña.
              </Typography>
            </Stack>

            <Stack component="form" spacing={2} width="100%" onSubmit={handleResetPassword}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Tooltip>
              <Button fullWidth variant="contained" type="submit" size="large">
                Solicitar nueva contraseña
              </Button>
            </Stack>
          </Stack>
        </Grow>
      </Container>
    </Stack>
  );
}

export default ForgotPassword;
