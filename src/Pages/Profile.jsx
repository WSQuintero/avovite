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
  CircularProgress,
} from "@mui/material";
import PhoneField from "react-phone-input-2";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";

import CoverImage from "../assets/img/signup/background.png";
import AuthService from "../Services/auth.service";
import { DOCUMENT_TYPES } from "../utilities/constants";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const [session, { setUser: setSession }] = useSession();
  const [user, setUser] = useState({
    avatar: null,
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
  const [userAvatar, setUserAvatar] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [loading, setLoading] = useState(false);
  const $Auth = useMemo(() => new AuthService(session.token), [session.token]);
  const validation = useMemo(
    () =>
      user.fullname &&
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

  const handleAvatarChange = async (event) => {
    if (event.target.files.length > 0) {
      setLoading(true);
      const { status } = await $Auth.updateAvatar({ avatar: event.target.files[0] });
      setLoading(false);

      if (status) {
        setUserAvatar(event.target.files[0]);
        setSession({ ...session.user, avatar: URL.createObjectURL(userAvatar) });
        setAlert({ show: true, message: "Tu avatar ha sido actualizado con éxito.", status: "success" });
      } else {
        setAlert({ show: true, message: "Hubo un error al actualizar tu avatar.", status: "error" });
      }
    }
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

    const { status } = await $Auth.update({
      fullname: user.fullname,
      cellphone: user.cellphone,
      id_type: user.id_type,
      id_number: user.id_number,
      id_location_expedition: user.id_location_expedition,
      location_residence: user.location_residence,
    });

    if (status) {
      setAlert({ show: true, message: "Tu usuario ha sido actualizado con éxito.", status: "success" });
      const { avatar, ...rest } = user;
      setSession({ ...session.user, ...rest });
    } else {
      setAlert({ show: true, message: "Ha ocurrido un error", status: "error" });
    }
  };

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if (session.user) {
      if(session.user.status_terms_and_conditions==0||!session.user.status_terms_and_conditions_date){
        navigate('/dashboard');
      }else{
        setUser({
          avatar: session.user.avatar || null,
          fullname: session.user.fullname || "",
          email: session.user.email || "",
          cellphone: session.user.cellphone || "",
          id_type: session.user.id_type || "-",
          id_number: session.user.id_number || "",
          id_location_expedition: session.user.id_location_expedition || "",
          location_residence: session.user.location_residence || "",
        });
      }

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
            <TextField
              type="file"
              accept="image/*"
              id="input-select-avatar"
              sx={{ display: "none" }}
              disabled={loading}
              onChange={handleAvatarChange}
            />
            {/*<label htmlFor="input-select-avatar">
              <IconButton
                component="span"
                size="large"
                sx={{ position: "relative", padding: 0, "&:hover .MuiBox-root": { opacity: 1 } }}
                disabled={loading}
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
                {loading ? (
                  <Avatar sx={{ width: 92, height: 92 }}>
                    <CircularProgress size={40} color="inherit" />
                  </Avatar>
                ) : (
                  <Avatar
                    src={userAvatar ? URL.createObjectURL(userAvatar) : user.avatar}
                    alt={user.firstname}
                    sx={{ width: 92, height: 92 }}
                  />
                )}
              </IconButton>
                </label>-*/}
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
              label="Nombres y Apellidos"
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
              disabled
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
                {Object.keys(DOCUMENT_TYPES).map((key) => (
                  <MenuItem key={key} value={key}>
                    {DOCUMENT_TYPES[key]}
                  </MenuItem>
                ))}
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
            <TextField
              name="id_location_expedition"
              label="Lugar de Expedición del Documento"
              value={user.id_location_expedition}
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
            <TextField
              name="location_residence"
              label="Ciudad y País de Residencia"
              value={user.location_residence}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Row>

          {/*<Button type="submit" size="large" variant="contained" disabled={!validation}>
            Actualizar
            </Button>*/}
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
