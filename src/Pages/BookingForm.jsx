import { useState, useMemo, useEffect } from "react";
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
  Snackbar,
  Alert,
  alpha,
  Paper,
  Autocomplete,
} from "@mui/material";
import PhoneField from "react-phone-input-2";
import ContractService from "../Services/contract.service";
import { validateJSON } from "../utilities";
import LogoImage from "../assets/img/common/logo.svg";
import useConfig from "../Hooks/useConfig";
import UtilsService from "../Services/utils.service";

const Row = ({ children }) => (
  <Grid
    display="flex"
    alignItems="center"
    justifyItems="center"
    gap={3}
    sx={(theme) => ({
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
      },
    })}
  >
    {children}
  </Grid>
);

const Column = ({ children }) => (
  <Grid
    width="0"
    flexGrow={1}
    display="flex"
    flexDirection="column"
    gap={1}
    sx={(theme) => ({
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    })}
  >
    {children}
  </Grid>
);

const Label = ({ error = false, children }) => <Typography color={error ? "error" : "primary"}>{children}</Typography>;

const BookingForm = () => {
  const [{ constants }] = useConfig();
  const $Utils = useMemo(() => new UtilsService(), []);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    id_type: "-",
    id_location_expedition: "",
    email: "",
    fullname: "",
    id_number: "",
    codeDepto: "-",
    codMupio: "-",
    cellphone: "",
    user_id_bank: "-",
    user_bank_account_type: "-",
    user_bank_account_number: "",
    beneficiary_fullname: "",
    beneficiary_id_type: "-",
    beneficiary_id_number: "",
    beneficiary_id_location_expedition: "",
  });
  const [errors, setErrors] = useState({
    id_type: false,
    id_location_expedition: false,
    email: false,
    fullname: false,
    id_number: false,
    codeDepto: false,
    codMupio: false,
    cellphone: false,
    user_id_bank: false,
    user_bank_account_type: false,
    user_bank_account_number: false,
    beneficiary_fullname: false,
    beneficiary_id_type: false,
    beneficiary_id_number: false,
    beneficiary_id_location_expedition: false,
  });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateJSON(formData);

    if (validation.length) {
      validation.forEach((error) => setErrors((prev) => ({ ...prev, [error]: true })));
      setFeedback({ open: true, message: "Todos los campos son obligatorios.", status: "error" });
      return;
    }

    const contractService = new ContractService("YOUR_AUTH_TOKEN");

    const postData = {
      id_type: formData.id_type,
      id_location_expedition: formData.id_location_expedition,
      email: formData.email,
      fullname: formData.fullname,
      id_number: formData.id_number,
      cod_municipio: formData.codMupio,
      cellphone: formData.cellphone,
      user_id_bank: formData.user_id_bank,
      user_bank_account_type: formData.user_bank_account_type,
      user_bank_account_number: formData.user_bank_account_number,
      beneficiary_fullname: formData.beneficiary_fullname,
      beneficiary_id_type: formData.beneficiary_id_type,
      beneficiary_id_number: formData.beneficiary_id_number,
      beneficiary_id_location_expedition: formData.beneficiary_id_location_expedition,
    };

    const { status } = await contractService.add({ body: postData });

    if (status) {
      setFormData({
        id_type: "",
        id_location_expedition: "",
        email: "",
        fullname: "",
        id_number: "",
        codeDepto: "-",
        codMupio: "-",
        cellphone: "",
        user_id_bank: "",
        user_bank_account_type: "",
        user_bank_account_number: "",
        beneficiary_fullname: "",
        beneficiary_id_type: "",
        beneficiary_id_number: "",
        beneficiary_id_location_expedition: "",
      });
      setFeedback({ open: true, message: "Formulario completado exitosamente.", status: "success" });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    if (name === "codeDepto") {
      const { status, data } = await $Utils.getLocation({ stateCode: value });

      if (status) {
        setCities(data.data);
      }
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await $Utils.getLocation();

      if (status) {
        setStates(data.data);
      }
    })();
  }, []);

  return (
    <Container maxWidth="xxl" sx={{ marginY: 4, padding: 4, border: 1, borderRadius: 2, borderColor: "primary.main" }}>
      <Grid display="flex" justifyContent="center">
        <Grid display="flex" flexDirection="column" alignItems="center">
          <img src={LogoImage} width={160} height={160} alt="photo" />
          <Typography variant="h2" fontSize={25}>
            Aplicación Standard
          </Typography>
        </Grid>
      </Grid>
      <Box height={64} />
      <Grid display="flex" flexDirection="column" gap={3}>
        <Typography
          fontSize={24}
          textAlign="center"
          fontWeight={600}
          color="primary"
          paddingY={1}
          marginX={-3}
          sx={(t) => ({ backgroundColor: alpha(t.palette.primary.main, 0.1) })}
        >
          Titular
        </Typography>

        <Row>
          <Column>
            <Label error={errors.fullname}>Nombre Completo</Label>
            <TextField
              name="fullname"
              value={formData.fullname}
              required
              fullname
              error={errors.fullname}
              sx={{ width: "100%" }}
              onChange={handleInputChange}
            />
          </Column>
          <Column>
            <Label error={errors.email}>Correo Electrónico</Label>
            <TextField
              name="email"
              value={formData.email}
              required
              sx={{ width: "100%" }}
              error={errors.email}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.id_type}>Tipo de Documento</Label>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Select
                id="tipoDocumentoBeneficiario"
                name="id_type"
                value={formData.id_type}
                required
                error={errors.id_type}
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
          </Column>
          <Column>
            <Label error={errors.id_number}>Número de Documento</Label>
            <TextField
              name="id_number"
              type="number"
              required
              value={formData.id_number}
              onChange={handleInputChange}
              error={errors.id_number}
              sx={{ width: "100%" }}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.id_location_expedition}>Fecha de Exp del Documento</Label>
            <TextField
              name="id_location_expedition"
              type="date"
              value={formData.id_location_expedition}
              required
              error={errors.id_location_expedition}
              sx={{ width: "100%" }}
              onChange={handleInputChange}
            />
          </Column>
          <Column>
            <Label error={errors.cellphone}>Teléfono de Contacto</Label>
            <PhoneField
              enableSearch={true}
              value={formData.cellphone}
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
                if (value.match(/12345/) || errors.cellphone) {
                  return "Invalid value:" + value + ", " + country.name;
                } else {
                  return true;
                }
              }}
              onChange={(value) => handleInputChange({ target: { name: "cellphone", value } })}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.codeDepto}>Departamento</Label>
            <FormControl variant="outlined">
              <Select name="codeDepto" value={formData.codeDepto} onChange={handleInputChange} error={errors.codeDepto}>
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {states.map((e) => (
                  <MenuItem key={e.codigoDepto} value={e.codigoDepto}>
                    {e.nombreDepto}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.codMupio}>Municipio</Label>
            <FormControl variant="outlined">
              <Select name="codMupio" value={formData.codMupio} onChange={handleInputChange} error={errors.codMupio}>
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {cities.map((e) => (
                  <MenuItem key={e.codMupio} value={e.codMupio}>
                    {e.nombreMupio}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.user_id_bank}>Banco</Label>
            <FormControl variant="outlined">
              <Select
                id="bancoBeneficiario"
                name="user_id_bank"
                value={formData.user_id_bank}
                onChange={handleInputChange}
                error={errors.user_id_bank}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {constants?.banks.map((bank) => (
                  <MenuItem key={bank.id} value={bank.id}>
                    {bank.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.user_bank_account_type}>Tipo de Cuenta</Label>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Select
                name="user_bank_account_type"
                id="tipoDeCuentaBeneficiaria"
                value={formData.user_bank_account_type}
                onChange={handleInputChange}
                error={errors.user_bank_account_type}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {constants?.account_type.map((accountType) => (
                  <MenuItem key={accountType.id} value={accountType.id}>
                    {accountType.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.user_bank_account_number}>Número de Cuenta</Label>
            <TextField
              type="number"
              name="user_bank_account_number"
              value={formData.user_bank_account_number}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={errors.user_bank_account_number}
            />
          </Column>
        </Row>

        <Typography
          fontSize={24}
          textAlign="center"
          fontWeight={600}
          color="primary"
          paddingY={1}
          marginX={-3}
          sx={(t) => ({ backgroundColor: alpha(t.palette.primary.main, 0.1) })}
        >
          Beneficiario
          <Typography variant="caption" display="block">
            Designa un beneficiario en tu contrato que pueda recibir los beneficios en caso de fuerza mayor o evento
            fortuito.
          </Typography>
        </Typography>

        <Row>
          <Column>
            <Label error={errors.beneficiary_fullname}>Nombre Completo</Label>
            <TextField
              name="beneficiary_fullname"
              value={formData.beneficiary_fullname}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={errors.beneficiary_fullname}
            />
          </Column>
          <Column>
            <Label error={errors.beneficiary_id_number}>Número de Documento</Label>
            <TextField
              name="beneficiary_id_number"
              type="number"
              value={formData.beneficiary_id_number}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={errors.beneficiary_id_number}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.beneficiary_id_type}>Tipo de Documento</Label>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Select
                name="beneficiary_id_type"
                id="tipoDocumentoBeneficiario"
                value={formData.beneficiary_id_type}
                onChange={handleInputChange}
                error={errors.beneficiary_id_type}
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
          </Column>
          <Column>
            <Label error={errors.beneficiary_id_location_expedition}>Lugar de Expedición del Documento</Label>
            <TextField
              name="beneficiary_id_location_expedition"
              value={formData.beneficiary_id_location_expedition}
              sx={{ width: "100%" }}
              error={errors.beneficiary_id_location_expedition}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Button
          type="submit"
          size="large"
          variant="contained"
          disabled={Object.values(errors).reduce((a, c) => a || c, false)}
          onClick={handleSubmit}
        >
          Enviar
        </Button>
      </Grid>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetFeedback}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BookingForm;
