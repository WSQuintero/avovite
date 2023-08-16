import { useEffect, useMemo, useState } from "react";
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
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import PhoneField from "react-phone-input-2";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import useConfig from "../Hooks/useConfig";

import CoverImage from "../assets/img/signin/background.png";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import AuthService from "../Services/auth.service";

const Row = ({ children }) => (
  <Grid
    display="flex"
    gap={4}
    sx={(t) => ({
      [t.breakpoints.down("lg")]: {
        flexDirection: "column",
      },
    })}
  >
    {children}
  </Grid>
);

function Profile() {
  const [{ constants }] = useConfig();
  const [session, { setUser: setSession }] = useSession();
  const [user, setUser] = useState({
    fullname: "",
    email: "",
    cellphone: "",
    id_type: "-",
    id_number: "",
    id_location_expedition: "",
    location_residence: "",
    user_id_bank: "-",
    user_bank_account_type: "-",
    user_bank_account_number: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const $Auth = useMemo(() => new AuthService(session.token), [session.token]);
  const validation = useMemo(
    () =>
      user.fullname &&
      user.email &&
      user.cellphone &&
      user.id_type !== "-" &&
      user.id_number &&
      user.id_location_expedition &&
      user.location_residence,
    [user]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!validation) {
      setAlert({
        show: true,
        message: "Todos los campos son requeridos.",
        status: "error",
      });
      return;
    }

    const { status } = await $Auth.update(user);

    if (status) {
      setAlert({ show: true, message: "Tu usuario ha sido actualizado con éxito.", status: "success" });
      setSession({ ...session.user, ...user });
    } else {
      setAlert({ show: true, message: "Ha ocurrido un error", status: "error" });
    }
  };

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if (session.user) {
      console.log(session.user);
      setUser({
        fullname: session.user.fullname || "",
        email: session.user.email || "",
        cellphone: session.user.cellphone || "",
        id_type: session.user.id_type || "-",
        id_number: session.user.id_number || "",
        id_location_expedition: session.user.id_location_expedition || "",
        location_residence: session.user.location_residence || "",
      });
    }
  }, [session.user]);

  if (!session.user) {
    return <></>;
  }

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Box position="relative">
          <Box
            display="flex"
            borderRadius={1}
            overflow="hidden"
            maxHeight={320}
            sx={(t) => ({
              [t.breakpoints.down("lg")]: {
                maxHeight: 160,
              },
            })}
          >
            <img
              src={CoverImage}
              alt="cover photo"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </Box>
          <Grid
            position="absolute"
            bottom={-16}
            left={32}
            display="flex"
            alignItems="flex-start"
            gap={2}
            sx={(t) => ({
              [t.breakpoints.down("lg")]: {
                alignItems: "center",
              },
            })}
          >
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
              <Typography
                fontSize={16}
                color="white"
                sx={(t) => ({
                  [t.breakpoints.down("lg")]: {
                    display: "none",
                  },
                })}
              >
                Actualiza tu información personal
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box height={32} />
        <Grid
          component="form"
          display="flex"
          flexDirection="column"
          padding={2}
          gap={4}
          noValidate
          onSubmit={handleFormSubmit}
        >
          <Row>
            <TextField
              name="fullname"
              label="Nombre Completo"
              value={user.fullname}
              required
              fullWidth
              onChange={handleInputChange}
            />
            <TextField
              name="email"
              label="Correo Electrónico"
              value={user.email}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Row>
          <Row>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="label-document-type">Tipo de Documento *</InputLabel>
              <Select
                labelId="label-document-type"
                label="Tipo de Documento"
                name="id_type"
                value={user.id_type}
                required
                fullWidth
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                <MenuItem value="cedula">Cédula de Ciudadanía</MenuItem>
                <MenuItem value="tarjetaIdentidad">Tarjeta de Identidad</MenuItem>
                <MenuItem value="cedulaExtranjeria">Cédula de Extranjería</MenuItem>
                <MenuItem value="pasaporte">Pasaporte</MenuItem>
                <MenuItem value="registroCivil">Registro Civil</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="id_number"
              type="number"
              label="Número de Documento"
              value={user.id_number}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Row>

          <Row>
            <DatePicker
              label="Fecha de Exp del Documento *"
              value={dayjs(user.id_location_expedition)}
              format="DD/MM/YYYY"
              sx={{ width: "100%" }}
              onChange={(value) =>
                setUser((prev) => ({
                  ...prev,
                  id_location_expedition: value.toDate(),
                }))
              }
            />
            <TextField
              name="location_residence"
              label="Ciudad y País de Residencia"
              value={user.location_residence}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Row>

          <Row>
            <PhoneField
              enableSearch={true}
              value={user.cellphone}
              country="co"
              specialLabel="Teléfono de Contacto"
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
              onChange={(value) => handleInputChange({ target: { name: "cellphone", value } })}
            />
          </Row>

          <Button type="submit" size="large" variant="contained" disabled={!validation}>
            Actualizar
          </Button>
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
