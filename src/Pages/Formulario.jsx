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
} from '@mui/material';

const Formulario = () => {
  return (
    <Container maxWidth="lg" sx={{marginTop:10}} >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h4" align="center" color='primary.main'>
          Aplicación Standard
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Fecha de Pago"
                type="date"
                id="fechaDePago"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre Completo Beneficiario"
                id="nombreCompletoBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="tipoDocumentoBeneficiario">
                  Tipo de Documento Beneficiario
                </InputLabel>
                <Select
                  label="Tipo de Documento Beneficiario"
                  id="tipoDocumentoBeneficiario"
                  defaultValue=""
                >
                  <MenuItem value="cedula">Cédula de Ciudadanía</MenuItem>
                  <MenuItem value="tarjetaIdentidad">
                    Tarjeta de Identidad
                  </MenuItem>
                  <MenuItem value="cedulaExtranjeria">
                    Cédula de Extranjería
                  </MenuItem>
                  <MenuItem value="pasaporte">Pasaporte</MenuItem>
                  <MenuItem value="registroCivil">Registro Civil</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="No Documento Beneficiario"
                id="numeroDocumentoBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Lugar de Exp del Doc. Beneficiario"
                id="lugarExpedicionDocumentoBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Ciudad y País de Residencia Beneficiario"
                id="ciudadPaisResidenciaBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Correo Electrónico Beneficiario"
                type="email"
                id="correoElectronicoBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Teléfono de Contacto Beneficiario"
                id="telefonoContactoBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="bancoBeneficiario">
                  Banco Beneficiario
                </InputLabel>
                <Select
                  label="Banco Beneficiario"
                  id="bancoBeneficiario"
                  defaultValue="bancoAgrario"
                >
                  <MenuItem value="bancoAgrario">
                    Banco Agrario de Colombia
                  </MenuItem>
                  <MenuItem value="bancoBogota">Banco de Bogotá</MenuItem>
                  {/* Otras opciones de bancos aquí */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="tipoCuentaBeneficiario">
                  Tipo de Cuenta Beneficiario
                </InputLabel>
                <Select
                  label="Tipo de Cuenta Beneficiario"
                  id="tipoCuentaBeneficiario"
                  defaultValue="cuentaAhorros"
                >
                  <MenuItem value="cuentaAhorros">Cuenta de Ahorros</MenuItem>
                  <MenuItem value="cuentaCorriente">Cuenta Corriente</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Cuenta Beneficiario"
                id="numeroCuentaBeneficiario"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nombre Completo Pagador"
                id="nombreCompletoPagador"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
             
                
                <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="tipoCuentaBeneficiario">
                Tipo de Documento Pagador
                </InputLabel>
                <Select
                  label="Tipo de Documento"
                  id="tipoDocumentoPagador"
                  defaultValue="cuentaAhorros"
                >
                  <MenuItem value="CedulaDeCiudadania">Cédula de Ciudadanía</MenuItem>
                  <MenuItem value="tarjetaIdentidad">Tarjeta de Identidad</MenuItem>
                  <MenuItem value="cedulaExtranjeria">Pasaporte</MenuItem>
                  <MenuItem value="registroCivil">Registro Civil</MenuItem>
                </Select>
              </FormControl>
          
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Número de Documento Pagador"
                id="numeroDocumentoPagador"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Lugar de Expedición del Documento Pagador"
                id="lugarExpedicionDocumentoPagador"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default Formulario;
