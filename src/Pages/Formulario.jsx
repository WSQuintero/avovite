import React from "react";
import {
  TextField,
  Button,
  Container,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";

const Formulario = () => {
  const theme = useTheme();
  return (
    <Container
      maxWidth="lg"
      sx={(theme) => ({
        paddingY: 4,
        [theme.breakpoints.up("lg")]: {
          marginTop: 24,
        },
      })}
    >
      <Box
        display="flex"
        sx={(theme) => ({
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          [theme.breakpoints.up("lg")]: {
            paddingY: 3,
            gap: 2,
            border: 1,
            borderColor: "primary.main",
            borderRadius: 2,
          },
        })}
      >
        <img src={logo} alt="photo" />
        <Typography variant="h2">Aplicación Standard</Typography>
        <Box
          display="flex"
          sx={(theme) => ({
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingY: 3,
            [theme.breakpoints.up("lg")]: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              gap: 4,
            },
          })}
        >
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Fecha de pago</Typography>
            <TextField type="date" />
            <Typography variant="h3">Tipo de Documento Beneficiario</Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                id="tipoDocumentoBeneficiario"
                defaultValue="Selecciona el tipo de documento"
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
            <Typography variant="h3">
              Lugar de Exp del Doc. Beneficiario
            </Typography>
            <TextField type="date" />
            <Typography variant="h3">
              Correo Electrónico Beneficiario
            </Typography>
            <TextField />
          </Grid>
          <Box
            sx={(theme) => ({
              height: 1,
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
          ></Box>
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
        <Typography
          variant="h3"
          textAlign="start"
          sx={(theme) => ({
            paddingY: 1,
            marginRight: 25,
            [theme.breakpoints.up("lg")]: {
              marginRight: 70,
              paddingY: 0,
            },
          })}
        >
          Banco Beneficiario
        </Typography>
        <FormControl variant="outlined">
          <Select
            id="bancoBeneficiario"
            defaultValue="bancoAgrario"
            sx={(theme) => ({
              width: "40vh",

              [theme.breakpoints.up("lg")]: {
                width: "104vh",
              },
            })}
          >
            <MenuItem
              value=""
              sx={(theme) => ({
                "&:hover": { backgroundColor: "#757575" },
              })}
            >
              Selecciona una Opcion
            </MenuItem>
            <MenuItem value="bancoAgrario">Banco Agrario de Colombia</MenuItem>
            <MenuItem value="bancoBogota">Banco de Bogotá</MenuItem>
            <MenuItem value="bancoCajaSocial">Banco Caja Social</MenuItem>
            <MenuItem value="bancoColpatria">Banco Colpatria</MenuItem>
            <MenuItem value="bancoDavivienda">Banco Davivienda</MenuItem>
            <MenuItem value="bancoOccidente">Banco de Occidente</MenuItem>
            <MenuItem value="bancoPopular">Banco Popular</MenuItem>
            <MenuItem value="bancoProcredit">Banco Procredit</MenuItem>
            <MenuItem value="bancoSantander">Banco Santander</MenuItem>
            <MenuItem value="bancoScotiabank">
              Banco Scotiabank Colpatria
            </MenuItem>
            <MenuItem value="bancoAVVillas">Banco AV Villas</MenuItem>
            <MenuItem value="bancoGNB">Banco GNB Sudameris</MenuItem>
            <MenuItem value="bancoItau">Banco Itaú</MenuItem>
            <MenuItem value="bancoPichincha">Banco Pichincha</MenuItem>
            <MenuItem value="bancoWWB">Banco WWB</MenuItem>
            <MenuItem value="bancamia">Bancamía</MenuItem>
          </Select>
        </FormControl>
        <Box
          display="flex"
          sx={(theme) => ({
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            [theme.breakpoints.up("lg")]: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

              gap: 4,
            },
          })}
        >
          <Grid
            display="flex"
            flexDirection="column"
            gap={2}
            sx={(theme) => ({
              paddingY: 1,
             
              [theme.breakpoints.up("lg")]: {
               
                paddingY: 0,
              },
            })}
          >
            <Typography variant="h3">Tipo de Cuenta Beneficiario</Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                id="tipoDeCuentaBeneficiaria"
                defaultValue="Selecciona el tipo de documento"
              >
                <MenuItem value="">Seleccione una Opción</MenuItem>
                <MenuItem value="cedula">Cuenta Corriente</MenuItem>
                <MenuItem value="tarjetaIdentidad">Cuenta de Ahorros</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Número de Cuenta Beneficiario</Typography>
            <TextField type="number" />
          </Grid>
        </Box>
        <Typography
          variant="h3"
          sx={(theme) => ({
            marginRight:16,
            paddingY:1,
            [theme.breakpoints.up("lg")]: {
              marginRight: 62,
            },
          })}
        >
          Nombre Completo Pagador
        </Typography>

        <TextField
          sx={(theme) => ({
            width: "40vh",

            [theme.breakpoints.up("lg")]: {
              width: "104vh",
            },
          })}
        />
        <Box
          display="flex"
          sx={(theme) => ({
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            paddingY:1,
            [theme.breakpoints.up("lg")]: {
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY:0,

              gap: 4,
            },
          })}
        >
          <Grid display="flex" flexDirection="column" gap={2}>
            <Typography variant="h3">Tipo de documento Pagador</Typography>
            <FormControl fullWidth variant="outlined">
              <Select
                id="tipoDocumentoBeneficiario"
                defaultValue="Selecciona el tipo de documento"
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
          <Grid display="flex" flexDirection="column" gap={2} sx={(theme) => ({
              paddingY: 1,
             
              [theme.breakpoints.up("lg")]: {
               
                paddingY: 0,
              },
            })}>
            <Typography variant="h3">No Documento Pagador</Typography>
            <TextField type="number" />
          </Grid>
        </Box>
        <Box
          sx={(theme) => ({
           
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        ></Box>
        <Typography
          variant="h3"
          sx={(theme) => ({
            paddingY: 1,
            [theme.breakpoints.up("lg")]: {
              marginRight: 44,
            },
          })}
        >
          Lugar de Expedición del Documento Pagador
        </Typography>

        <TextField
          sx={(theme) => ({
            width: "40vh",

            [theme.breakpoints.up("lg")]: {
              width: "104vh",
            },
          })}
        />
        <Box
          sx={(theme) => ({
            height: 9,
            [theme.breakpoints.up("lg")]: {
              display: "none",
            },
          })}
        ></Box>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </Box>
    </Container>
  );
};

export default Formulario;
