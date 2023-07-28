import React from "react";
import { TextField, Button, Container, Grid, Typography, FormControl, Select, MenuItem, Box } from "@mui/material";
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
    nombreCompletoBeneficiario: "",
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
        payment_deadline: formData.payment_deadline,
        id_type: formData.id_type,
        id_location_expedition: formData.id_location_expedition,
        email: formData.email,
        nombreCompletoBeneficiario: formData.nombreCompletoBeneficiario,
        id_number: formData.id_number,
        location_residence: formData.location_residence,
        cellphone: formData.cellphone,
        id_bank_beneficiary: formData.id_bank_beneficiary,
        beneficiary_bank_account_type: formData.beneficiary_bank_account_type,
        beneficiary_bank_account_number: formData.beneficiary_bank_account_number,
        payer_fullname: formData.payer_fullname,
        payer_id_type: formData.payer_id_type,
        payer_id_number: formData.payer_id_number,
        payer_id_location_expedition: formData.payer_id_location_expedition,
      };

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
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 4,
              },
            })}
          >
            <Grid display="flex" flexDirection="column" justifyContent="space-between" width="100%" gap={2}>
              <Typography variant="h3">Fecha de pago</Typography>
              <TextField type="date" sx={{ width: "100%" }} />
              <Typography variant="h3">Tipo de Documento Beneficiario</Typography>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Select id="tipoDocumentoBeneficiario" defaultValue="Selecciona el tipo de documento">
                  <MenuItem value="cedula">Cédula de Ciudadanía</MenuItem>
                  <MenuItem value="tarjetaIdentidad">Tarjeta de Identidad</MenuItem>
                  <MenuItem value="cedulaExtranjeria">Cédula de Extranjería</MenuItem>
                  <MenuItem value="pasaporte">Pasaporte</MenuItem>
                  <MenuItem value="registroCivil">Registro Civil</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="h3">Lugar de Exp del Doc. Beneficiario</Typography>
              <TextField type="date" sx={{ width: "100%" }} />
              <Typography variant="h3">Correo Electrónico Beneficiario</Typography>
              <TextField sx={{ width: "100%" }} />
            </Grid>
            <Grid display="flex" flexDirection="column" justifyContent="space-between" width="100%" gap={2}>
              <Typography variant="h3">Nombre Completo Beneficiario</Typography>
              <TextField sx={{ width: "100%" }} />
              <Typography variant="h3">No Documento Beneficiario</Typography>
              <TextField type="number" sx={{ width: "100%" }} />
              <Typography variant="h3">Ciudad y País de Residencia Beneficiario</Typography>
              <TextField sx={{ width: "100%" }} />
              <Typography variant="h3">Teléfono de Contacto Beneficiario</Typography>
              <TextField type="number" sx={{ width: "100%" }} />
            </Grid>
          </Box>

          <Box
            sx={(theme) => ({
              display: "flex",
              flexDirection: "column",
              width: "100%",
              [theme.breakpoints.up("lg")]: {},
            })}
          >
            <Typography
              variant="h3"
              textAlign="start"
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
                defaultValue="bancoAgrario"
                sx={(theme) => ({
                  width: "100%",
                })}
              >
                <MenuItem value="">Selecciona una Opcion</MenuItem>
                <MenuItem value="bancoAgrario">Banco Agrario de Colombia</MenuItem>
                <MenuItem value="bancoBogota">Banco de Bogotá</MenuItem>
                <MenuItem value="bancoCajaSocial">Banco Caja Social</MenuItem>
                <MenuItem value="bancoColpatria">Banco Colpatria</MenuItem>
                <MenuItem value="bancoDavivienda">Banco Davivienda</MenuItem>
                <MenuItem value="bancoOccidente">Banco de Occidente</MenuItem>
                <MenuItem value="bancoPopular">Banco Popular</MenuItem>
                <MenuItem value="bancoProcredit">Banco Procredit</MenuItem>
                <MenuItem value="bancoSantander">Banco Santander</MenuItem>
                <MenuItem value="bancoScotiabank">Banco Scotiabank Colpatria</MenuItem>
                <MenuItem value="bancoAVVillas">Banco AV Villas</MenuItem>
                <MenuItem value="bancoGNB">Banco GNB Sudameris</MenuItem>
                <MenuItem value="bancoItau">Banco Itaú</MenuItem>
                <MenuItem value="bancoPichincha">Banco Pichincha</MenuItem>
                <MenuItem value="bancoWWB">Banco WWB</MenuItem>
                <MenuItem value="bancamia">Bancamía</MenuItem>
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
                <Select id="tipoDeCuentaBeneficiaria" defaultValue="Selecciona el tipo de documento">
                  <MenuItem value="">Seleccione una Opción</MenuItem>
                  <MenuItem value="cedula">Cuenta Corriente</MenuItem>
                  <MenuItem value="tarjetaIdentidad">Cuenta de Ahorros</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid display="flex" flexDirection="column" gap={2} sx={{ width: "100%" }}>
              <Typography variant="h3">Número de Cuenta Beneficiario</Typography>
              <TextField type="number" sx={{ width: "100%" }} />
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
            <Grid display="flex" flexDirection="column" gap={2} sx={{ width: "100%" }}>
              <Typography variant="h3" sx={{ width: "100%" }}>
                Tipo de documento Pagador
              </Typography>
              <FormControl variant="outlined" sx={{ width: "100%" }}>
                <Select id="tipoDocumentoBeneficiario" defaultValue="Selecciona el tipo de documento">
                  <MenuItem value="cedula">Cédula de Ciudadanía</MenuItem>
                  <MenuItem value="tarjetaIdentidad">Tarjeta de Identidad</MenuItem>
                  <MenuItem value="cedulaExtranjeria">Cédula de Extranjería</MenuItem>
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
              <TextField type="number" sx={{ width: "100%" }} />
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
          <Button type="submit" variant="contained">
            Enviar
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default Formulario;
