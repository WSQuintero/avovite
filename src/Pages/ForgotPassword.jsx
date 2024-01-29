import { Button, Container, Grow, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import BackgroundImage from "../assets/img/signin/background.jpg";
import { useSnackbar } from "notistack";
import AuthService from "../Services/auth.service";
import { useNavigate, useSearchParams } from "react-router-dom";

const $Auth = new AuthService();

function ForgotPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useMemo(() => searchParams.get("token"), [searchParams]);
  const currentEmail = useMemo(() => searchParams.get("email"), [searchParams]);

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
                Request new password
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
              <TextField fullWidth label="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button fullWidth variant="contained" type="submit" size="large">
                Request new password
              </Button>
            </Stack>
          </Stack>
        </Grow>
      </Container>
    </Stack>
  );
}

export default ForgotPassword;
