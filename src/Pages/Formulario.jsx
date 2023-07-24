import React from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  FormLabel,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";

const Formulario = () => {
  const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ marginTop: 24 }}>
      <Box
        display="flex"
        border={1}
        borderColor="primary.main"
        borderRadius={2}
        paddingY={3}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
      >
        <img src={logo} alt="photo" />
        <Typography variant="h2">Aplicación Standard</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Fecha de pago</Typography>
            <TextField type="date" />
            <Typography variant="h3">Tipo de Documento Beneficiario</Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                label="Tipo de Documento Beneficiario"
                id="tipoDocumentoBeneficiario"
                defaultValue="Selecciona el tipo de documento"
              >
                <MenuItem value="cedula" sx={{ '&:hover': { backgroundColor: '#757575' } }}>Cédula de Ciudadanía</MenuItem>
                <MenuItem value="tarjetaIdentidad" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                  Tarjeta de Identidad
                </MenuItem>
                <MenuItem value="cedulaExtranjeria" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                  Cédula de Extranjería
                </MenuItem>
                <MenuItem value="pasaporte" sx={{ '&:hover': { backgroundColor: '#757575' } }}>Pasaporte</MenuItem>
                <MenuItem value="registroCivil" sx={{ '&:hover': { backgroundColor: '#757575' } }}>Registro Civil</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h3">
              Lugar de Exp del Doc. Beneficiario
            </Typography>
            <TextField type="date" />
            <Typography variant="h3">
              Correo Electrónico Beneficiario
            </Typography>
            <TextField />
          </Grid>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Nombre Completo Beneficiario</Typography>
            <TextField />
            <Typography variant="h3">No Documento Beneficiario</Typography>
            <TextField type="number" />
            <Typography variant="h3">
              Ciudad y País de Residencia Beneficiario
            </Typography>
            <TextField />
            <Typography variant="h3">
              Teléfono de Contacto Beneficiario
            </Typography>
            <TextField type="number" />
          </Grid>
        </Box>
        <Typography variant="h3" textAlign="start" marginRight={68}>
          Banco Beneficiario
        </Typography>
        <FormControl variant="outlined" >
                
                <Select
                  
                  id="bancoBeneficiario"
                  defaultValue="bancoAgrario"
                  sx={{width:'100vh'}}
                >
                  <MenuItem value="" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Selecciona una Opcion
                  </MenuItem>
                  <MenuItem value="bancoAgrario" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Agrario de Colombia
                  </MenuItem>
                  <MenuItem value="bancoBogota" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco de Bogotá
                  </MenuItem>
                  <MenuItem value="bancoCajaSocial" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Caja Social
                  </MenuItem>
                  <MenuItem value="bancoColpatria" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Colpatria
                  </MenuItem>
                  <MenuItem value="bancoDavivienda" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Davivienda
                  </MenuItem>
                  <MenuItem value="bancoOccidente" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco de Occidente
                  </MenuItem>
                  <MenuItem value="bancoPopular" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Popular
                  </MenuItem>
                  <MenuItem value="bancoProcredit" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Procredit
                  </MenuItem>
                  <MenuItem value="bancoSantander" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Santander
                  </MenuItem>
                  <MenuItem value="bancoScotiabank" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Scotiabank Colpatria
                  </MenuItem>
                  <MenuItem value="bancoAVVillas" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco AV Villas
                  </MenuItem>
                  <MenuItem value="bancoGNB" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco GNB Sudameris
                  </MenuItem>
                  <MenuItem value="bancoItau" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Itaú
                  </MenuItem>
                  <MenuItem value="bancoPichincha" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco Pichincha
                  </MenuItem>
                  <MenuItem value="bancoWWB" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Banco WWB
                  </MenuItem>
                  <MenuItem value="bancamia" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                    Bancamía
                  </MenuItem>
                </Select>
              </FormControl>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Fecha de pago</Typography>
            <TextField type="date" />
            <Typography variant="h3">Tipo de Documento Beneficiario</Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                label="Tipo de Documento Beneficiario"
                id="tipoDocumentoBeneficiario"
                defaultValue="Selecciona el tipo de documento"
              >
                <MenuItem value="cedula" sx={{ '&:hover': { backgroundColor: '#757575' } }}>Cédula de Ciudadanía</MenuItem>
                <MenuItem value="tarjetaIdentidad" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                  Tarjeta de Identidad
                </MenuItem>
                <MenuItem value="cedulaExtranjeria" sx={{ '&:hover': { backgroundColor: '#757575' } }}>
                  Cédula de Extranjería
                </MenuItem>
                <MenuItem value="pasaporte" sx={{ '&:hover': { backgroundColor: '#757575' } }}>Pasaporte</MenuItem>
                <MenuItem value="registroCivil" sx={{ '&:hover': { backgroundColor: '#757575' } }}>Registro Civil</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h3">
              Lugar de Exp del Doc. Beneficiario
            </Typography>
            <TextField type="date" />
            <Typography variant="h3">
              Correo Electrónico Beneficiario
            </Typography>
            <TextField />
          </Grid>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Nombre Completo Beneficiario</Typography>
            <TextField />
            <Typography variant="h3">No Documento Beneficiario</Typography>
            <TextField type="number" />
            <Typography variant="h3">
              Ciudad y País de Residencia Beneficiario
            </Typography>
            <TextField />
            <Typography variant="h3">
              Teléfono de Contacto Beneficiario
            </Typography>
            <TextField type="number" />
          </Grid>
        </Box>
        <Typography variant="h3" marginRight={44}>
          Lugar de Expedición del Documento Pagador
        </Typography>

        <TextField sx={{ width: "76%" }} />
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default Formulario;
