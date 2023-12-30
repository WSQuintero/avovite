import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BackgroundImage from "../assets/img/signin/background.jpg";
import { useSnackbar } from "notistack";

function ForgotPassword() {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();

    if (!email) {
      enqueueSnackbar("Email is required", { variant: "error" });
      return;
    }

    enqueueSnackbar("Check your email, we have sent you a link to reset your password", { variant: "success", autoHideDuration: 5000 });
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
        <Stack zIndex={1} width="100%" spacing={2} padding={2} bgcolor="white" borderRadius={2}>
          <Stack>
            <Typography fontSize={32} fontWeight={500} textAlign="center">
              New Password
            </Typography>
            <Typography textAlign="center">You Forgot Your Password? Here you can easily retrieve a new password.</Typography>
          </Stack>

          <Stack component="form" spacing={2} width="100%" onSubmit={handleSubmitForm}>
            <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button fullWidth variant="contained" type="submit" size="large">
              Request new password
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}

export default ForgotPassword;
