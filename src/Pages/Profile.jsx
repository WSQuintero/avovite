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
import AuthService from "../Services/user.service";
import { DOCUMENT_TYPES } from "../utilities/constants";
import { useNavigate } from "react-router-dom";
import useUser from "../Hooks/useUser";
import BackButton from "../Components/BackButton";

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
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [countryInfo, setCountry] = useState(null);
  const $User = useUser();

  useEffect(() => {
    if ($User) {
      const getInformationUser = async () => {
        const { status, data } = await $User.get();

        if (status) {
          const country = data.data.find((a) => a.id === session.user.id).country;
          setCountry(country);
        }
      };
      getInformationUser();
    }
  }, [$User, session]);

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if (session.user) {
      if (session.user.status_terms_and_conditions == 0 || !session.user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      } else {
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

  const handleReadOnlyInputChange = () => {
    resetAlert();
    setTimeout(() => {
      setAlert({ show: true, message: "Por favor, para modificar tu información, crea un ticket.", status: "info" });
    }, 500);
  };
  return (
    <PageWrapper>
      <BackButton />
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
            <TextField type="file" accept="image/*" id="input-select-avatar" sx={{ display: "none" }} />
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
        <Grid component="form" display="flex" flexDirection="column" padding={2} gap={4} noValidate>
          <Row>
            <TextField
              name="fullname"
              label="Nombres y Apellidos"
              value={user.fullname}
              required
              fullWidth
              InputProps={{
                readOnly: true,
                onFocus: handleReadOnlyInputChange,
              }}
            />
            <TextField
              name="email"
              label="Correo Electrónico"
              value={user.email}
              required
              fullWidth
              InputProps={{
                readOnly: true,
                onFocus: handleReadOnlyInputChange,
              }}
            />
          </Row>
          <Row>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="label-document-type">Tipo de Documento *</InputLabel>
              <Select
                labelId="label-document-type"
                label="Tipo de Documento"
                name="id_type"
                value={session.user.last_contract.id_type ? session.user.last_contract.id_type : user.id_type}
                required
                fullWidth
                disabled
                onFocus={handleReadOnlyInputChange}
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
              value={session.user.last_contract.id_number ? session.user.last_contract.id_number : user.id_number}
              required
              fullWidth
              InputProps={{
                readOnly: true,
                onFocus: handleReadOnlyInputChange,
              }}
            />
          </Row>
          <Row>
            <TextField
              name="id_location_expedition"
              label="Lugar de Expedición del Documento"
              value={
                session.user.last_contract.id_location_expedition
                  ? session.user.last_contract.id_location_expedition
                  : user.id_location_expedition
              }
              required
              fullWidth
              InputProps={{
                readOnly: true,
                onFocus: handleReadOnlyInputChange,
              }}
            />
          </Row>
          <Row>
            {/* PhoneField component disabled */}
            <TextField
              name="cellphone"
              label="Teléfono de Contacto"
              value={user.cellphone}
              required
              fullWidth
              InputProps={{
                readOnly: true,
                onFocus: handleReadOnlyInputChange,
              }}
            />
            <TextField
              name="location_residence"
              label="País de Residencia"
              value={countryInfo === null ? "Colombia" : countryInfo}
              required
              fullWidth
              InputProps={{
                readOnly: true,
                onFocus: handleReadOnlyInputChange,
              }}
            />
          </Row>
        </Grid>
        <Snackbar open={alert.show} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={resetAlert}>
          <Alert severity={alert.status} sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Container>
    </PageWrapper>
  );
}

export default Profile;
