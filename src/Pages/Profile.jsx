import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  Typography,
  Container,
  IconButton,
  alpha,
  Avatar,
  Snackbar,
  Alert,
} from "@mui/material";
import PhoneField from "react-phone-input-2";
import useSession from "../Hooks/useSession";
import useConfig from "../Hooks/useConfig";
import PageWrapper from "../Components/PageWrapper";
import FormRow from "../Components/FormRow";

import CoverImage from "../assets/img/signin/background.png";

function Profile() {
  const [session, setSession] = useSession();
  const [{ loading }, { setLoading }] = useConfig({});
  const [user, setUser] = useState({
    avatar: "",
    name: "",
    email: "",
    phone: "",
    account_number: 0,
    city: "",
    country: "",
    account_bank: 0,
  });
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.phone ||
      !user.city ||
      !user.country ||
      user.account_number !== "" ||
      user.account_bank !== ""
    ) {
      setAlert({
        show: true,
        message: "Todos los campos son requeridos.",
        status: "error",
      });
      return;
    }
  };

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    setLoading(true);

    if (session.user) {
      setUser({
        avatar: session.user.avatar,
        name: session.user.name,
        email: session.user.email,
        phone: session.user.phone,
        account_number: session.user.account_number,
        city: session.user.city,
        country: session.user.country,
        account_bank: session.user.account_bank,
      });
    }

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [session]);

  if (!session.user) {
    return <></>;
  }

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Box position="relative" padding={2}>
          <Box display="flex" borderRadius={4} overflow="hidden" maxHeight={320}>
            <img
              src={CoverImage}
              alt="cover photo"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </Box>
          <Grid position="absolute" bottom={0} left={48} display="flex" alignItems="flex-start" gap={2}>
            <IconButton
              component="span"
              size="large"
              sx={{ position: "relative", padding: 0, "&:hover .MuiBox-root": { opacity: 1 } }}
            >
              <Box
                position="absolute"
                zIndex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
                borderRadius={50}
                sx={(t) => ({
                  backgroundColor: alpha(t.palette.primary.main, 0.5),
                  opacity: 0,
                  transition: "opacity 0.2s ease-out",
                })}
              >
                <Typography variant="caption" color="white">
                  Actualizar
                </Typography>
              </Box>
              <Avatar src={user.avatar} alt={user.firstname} sx={{ width: 92, height: 92 }} />
            </IconButton>
            <Grid display="flex" flexDirection="column">
              <Typography variant="h1" fontSize={32} fontWeight={600} color="white">
                Perfil
              </Typography>
              <Typography fontSize={16} color="white">
                Actualiza tu información personal
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid component="form" display="flex" flexDirection="column" padding={2} onSubmit={handleFormSubmit} noValidate>
          <FormRow title="Nombre Completo">
            <TextField name="name" value={user.name} onChange={handleInputChange} fullWidth />
          </FormRow>
          <FormRow title="Correo Electrónico">
            <TextField name="email" value={user.email} onChange={handleInputChange} fullWidth />
          </FormRow>
          <FormRow title="Teléfono">
            <PhoneField
              enableSearch={true}
              value={user.phone}
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
              onChange={(value) => handleInputChange({ target: { name: "phone", value } })}
            />
          </FormRow>
          <FormRow title="Número de cuenta">
            <TextField name="account_number" value={user.account_number} onChange={handleInputChange} fullWidth />
          </FormRow>
          <FormRow title="País">
            <TextField name="country" value={user.country} onChange={handleInputChange} fullWidth />
          </FormRow>
          <FormRow title="Ciudad">
            <TextField name="city" value={user.city} onChange={handleInputChange} fullWidth />
          </FormRow>
          <FormRow title="Cuenta Bancaria">
            <TextField name="account_bank" value={user.account_bank} onChange={handleInputChange} fullWidth />
          </FormRow>
          <Grid
            display="flex"
            marginLeft="auto"
            padding={2}
            sx={(t) => ({
              width: "20%",
              [t.breakpoints.down("md")]: {
                width: "100%",
              },
            })}
          >
            <Button type="submit" variant="contained" fullWidth>
              Guardar
            </Button>
          </Grid>
        </Grid>
        <Snackbar
          open={alert.show}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={resetAlert}
        >
          <Alert severity={alert.status} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </PageWrapper>
  );
}

export default Profile;
