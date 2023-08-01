import React, { useState } from "react";
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
import ContractService from "../Services/contract.service";

const Formulario = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    payment_deadline: "",
    id_type: "",
    id_location_expedition: "",
    email: "",
    fullname: "",
    id_number: "",
    location_residence: "",
    cellphone: "",
    id_bank_beneficiary: "",
    beneficiary_bank_account_type: "",
    beneficiary_bank_account_number: "",
    payer_fullname: "",
    payer_id_type: "",
    payer_id_number: "",
    payer_id_location_expedition: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const contractService = new ContractService("YOUR_AUTH_TOKEN");

      const postData = {
        
        id_type: formData.id_type,
        id_location_expedition: formData.id_location_expedition,
        email: formData.email,
        fullname: formData.fullname,
        id_number: formData.id_number,
        location_residence: formData.location_residence,
        cellphone: formData.cellphone,
        id_bank_beneficiary: formData.id_bank_beneficiary,
        beneficiary_bank_account_type: formData.beneficiary_bank_account_type,
        beneficiary_bank_account_number:
          formData.beneficiary_bank_account_number,
        payer_fullname: formData.payer_fullname,
        payer_id_type: formData.payer_id_type,
        payer_id_number: formData.payer_id_number,
        payer_id_location_expedition: formData.payer_id_location_expedition,
      };

      // Aquí puedes agregar validaciones si es necesario antes de enviar los datos

      const response = await contractService.add({ body: postData });
      console.log("Form data sent successfully:", response);
    } catch (error) {
      console.error("Error sending form data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Grid
        sx={(theme) => ({
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          [theme.breakpoints.up("lg")]: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        })}
      >
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingY: 4,
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 10,
              padding: 4,
              gap: 2,
              border: 1,
              borderColor: "primary.main",
              borderRadius: 2,
            },
          })}
        >
          <img src={logo} width={160} height={160} alt="photo" />
          <Typography variant="h2" fontSize={25}>
            Aplicación Standard
          </Typography>
          <Box
            sx={(theme) => ({
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingY: 3,

              [theme.breakpoints.up("lg")]: {
                display: "flex",
                flexDirection: "column",

                justifyContent: "space-between",
                alignItems: "center",
                gap: 4,
              },
            })}
          >
            <Grid
              display="flex"
              width="100%"
              alignItems="center"
              justifyItems="center"
              gap={4}
            >
              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="h3">
                  Tipo de Documento Beneficiario
                </Typography>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Select
                    id="tipoDocumentoBeneficiario"
                    name="id_type"
                    value={formData.id_type}
                    required
                    onChange={handleInputChange}
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
              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
                height='100%'
              >
                <Typography variant="h3" width="100%">
                  Lugar de Exp del Doc. Beneficiario
                </Typography>
                <TextField
                  name="id_location_expedition"
                  type="date"
                  value={formData.id_location_expedition}
                  required
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid display="flex" width="100%" gap={4}>
              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                required
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="h3">
                  Correo Electrónico Beneficiario
                </Typography>
                <TextField
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </Grid>

              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="h3">
                  Nombre Completo Beneficiario
                </Typography>
                <TextField
                  name="fullname"
                  value={formData.fullname}
                  required
                  onChange={handleInputChange}
                  fullname
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid display="flex" width="100%" gap={4}>
              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="h3">No Documento Beneficiario</Typography>
                <TextField
                  name="id_number"
                  type="number"
                  required
                  value={formData.id_number}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="h3">
                  Ciudad y País de Residencia Beneficiario
                </Typography>
                <TextField
                  name="location_residence"
                  required
                  value={formData.location_residence}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
            <Grid display="flex" width="100%" gap={4}>
              <Grid
                width="0"
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                gap={1}
              >
                <Typography variant="h3">
                  Teléfono de Contacto Beneficiario
                </Typography>
                <TextField
                  name="cellphone"
                  type="number"
                  required
                  value={formData.cellphone}
                  onChange={handleInputChange}
                  sx={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              width: "100%",
            })}
          >
            <Typography
              variant="h3"
              sx={(theme) => ({
                paddingY: 1,
                width: "100%",
                [theme.breakpoints.up("lg")]: {
                  paddingY: 0,
                },
              })}
            >
              Banco Beneficiario
            </Typography>
            <FormControl
              variant="outlined"
              sx={(theme) => ({
                width: "100%",
              })}
            >
              <Select
                id="bancoBeneficiario"
                name="id_bank_beneficiary"
                value={formData.id_bank_beneficiary}
                onChange={handleInputChange}
                sx={(theme) => ({
                  width: "100%",
                })}
              >
                <MenuItem value="">Selecciona una Opcion</MenuItem>
                <MenuItem value={0}>Banco Agrario de Colombia</MenuItem>
                <MenuItem value={1}>Banco de Bogotá</MenuItem>
                <MenuItem value={2}>Banco Caja Social</MenuItem>
                <MenuItem value={3}>Banco Colpatria</MenuItem>
                <MenuItem value={4}>Banco Davivienda</MenuItem>
                <MenuItem value={5}>Banco de Occidente</MenuItem>
                <MenuItem value={6}>Banco Popular</MenuItem>
                <MenuItem value={7}>Banco Procredit</MenuItem>
                <MenuItem value={8}>Banco Santander</MenuItem>
                <MenuItem value={9}>Banco Scotiabank Colpatria</MenuItem>
                <MenuItem value={10}>Banco AV Villas</MenuItem>
                <MenuItem value={11}>Banco GNB Sudameris</MenuItem>
                <MenuItem value={12}>Banco Itaú</MenuItem>
                <MenuItem value={13}>Banco Pichincha</MenuItem>
                <MenuItem value={14}>Banco WWB</MenuItem>
                <MenuItem value={15}>Bancamía</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            display="flex"
            sx={(theme) => ({
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
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
                width: "100%",
                [theme.breakpoints.up("lg")]: {
                  paddingY: 0,
                },
              })}
            >
              <Typography variant="h3" sx={{ width: "100%" }}>
                Tipo de Cuenta Beneficiario
              </Typography>

              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Select
                  name="beneficiary_bank_account_type"
                  id="tipoDeCuentaBeneficiaria"
                  value={formData.beneficiary_bank_account_type}
                  onChange={handleInputChange}
                >
                  <MenuItem value="">Seleccione una Opción</MenuItem>
                  <MenuItem value={0}>Cuenta Corriente</MenuItem>
                  <MenuItem value={1}>Cuenta de Ahorros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ width: "100%" }}
            >
              <Typography variant="h3">
                Número de Cuenta Beneficiario
              </Typography>
              <TextField
                type="number"
                name="beneficiary_bank_account_number"
                value={formData.beneficiary_bank_account_number}
                onChange={handleInputChange}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Box>
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              width: "100%",
            })}
          >
            <Typography
              variant="h3"
              sx={(theme) => ({
                paddingY: 1,
                width: "100%",
                [theme.breakpoints.up("lg")]: {},
              })}
            >
              Nombre Completo Pagador
            </Typography>

            <TextField
              name="payer_fullname"
              value={formData.payer_fullname}
              onChange={handleInputChange}
              Fullwidth
              sx={(theme) => ({
                width: "100%",
              })}
            />
          </Box>
          <Box
            display="flex"
            sx={(theme) => ({
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingY: 1,
              width: "100%",
              [theme.breakpoints.up("lg")]: {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingY: 0,
                gap: 4,
              },
            })}
          >
            <Grid
              display="flex"
              flexDirection="column"
              gap={2}
              sx={{ width: "100%" }}
            >
              <Typography variant="h3" sx={{ width: "100%" }}>
                Tipo de documento Pagador
              </Typography>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Select
                  name="payer_id_type"
                  id="tipoDocumentoBeneficiario"
                  value={formData.payer_id_type}
                  onChange={handleInputChange}
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
            <Grid
              display="flex"
              flexDirection="column"
              gap={2}
              sx={(theme) => ({
                paddingY: 1,
                width: "100%",
                [theme.breakpoints.up("lg")]: {
                  paddingY: 0,
                },
              })}
            >
              <Typography variant="h3" sx={{ width: "100%" }}>
                No Documento Pagador
              </Typography>
              <TextField
                name="payer_id_number"
                type="number"
                value={formData.payer_id_number}
                onChange={handleInputChange}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Box>
          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              width: "100%",
            })}
          >
            <Typography
              variant="h3"
              sx={(theme) => ({
                paddingY: 1,
                width: "100%",
                [theme.breakpoints.up("lg")]: {},
              })}
            >
              Lugar de Expedición del Documento Pagador
            </Typography>

            <TextField
              name="payer_id_location_expedition"
              value={formData.payer_id_location_expedition}
              onChange={handleInputChange}
              sx={(theme) => ({
                width: "100%",
              })}
            />
          </Box>

          <Box
            sx={(theme) => ({
              height: 9,
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
          ></Box>
          <Button type="submit" onClick={handleSubmit} variant="contained">
            Enviar
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default Formulario;
