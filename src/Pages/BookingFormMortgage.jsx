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
  alpha,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { HighlightOff as ErrorIcon, Clear as ClearIcon, CheckCircle as CheckIcon } from "@mui/icons-material";
import PhoneField from "react-phone-input-2";
import ContractService from "../Services/contract.service";
import { validateJSON } from "../utilities";
import LogoImage from "../assets/img/common/logo.svg";
import useConfig from "../Hooks/useConfig";
import UtilsService from "../Services/utils.service";
import { useNavigate } from "react-router-dom";
import { CIVIL_STATUS } from "../utilities/constants";

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

const BookingFormMortgage = () => {
  const navigate = useNavigate();
  const [{ constants }] = useConfig();
  const $Utils = useMemo(() => new UtilsService(), []);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statesBeneficiary, setStatesBeneficiary] = useState([]);
  const [citiesBeneficiary, setCitiesBeneficiary] = useState([]);

  const [formData, setFormData] = useState({
    id_type: "-",
    id_location_expedition: "",
    email: "",
    fullname: "",
    id_number: "",
    country: "-",
    state: "-",
    city: "-",
    cellphone: "",
    user_id_bank: "-",
    bank_name: "",
    user_bank_account_type: "-",
    user_bank_account_number: "",
    beneficiary_fullname: "",
    beneficiary_id_type: "-",
    beneficiary_id_number: "",
    beneficiary_id_location_expedition: "",

    address_residence: "",
    civil_status: "-",
    economy_activity: "",
    address_residence_beneficiary: "",
    civil_status_beneficiary: "",
    economy_activity_beneficiary: "",
    email_beneficiary: "",
    cellphone_beneficiary: "",
    country_beneficiary: "-",
    state_beneficiary: "-",
    city_beneficiary: "-",
  });
  const [errors, setErrors] = useState({
    id_type: false,
    id_location_expedition: false,
    email: false,
    fullname: false,
    id_number: false,
    country: false,
    state: false,
    city: false,
    cellphone: false,
    user_id_bank: false,
    user_bank_account_type: false,
    user_bank_account_number: false,
    beneficiary_fullname: false,
    beneficiary_id_type: false,
    beneficiary_id_number: false,
    beneficiary_id_location_expedition: false,

    address_residence: false,
    civil_status: false,
    economy_activity: false,
    address_residence_beneficiary: false,
    civil_status_beneficiary: false,
    economy_activity_beneficiary: false,
    email_beneficiary: false,
    cellphone_beneficiary: false,
    country_beneficiary: false,
    state_beneficiary: false,
    city_beneficiary: false,
  });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateJSON(formData, [
      ...(formData.country !== "169" ? ["state"] : []),
      ...(formData.country_beneficiary !== "169" ? ["state_beneficiary"] : []),
      ...(formData.user_id_bank !== "-1" ? ["bank_name"] : []),
    ]);

    if (validation.length) {
      validation.forEach((error) => setErrors((prev) => ({ ...prev, [error]: true })));
      return;
    }

    const contractService = new ContractService("YOUR_AUTH_TOKEN");

    const postData = {
      id_type: formData.id_type,
      id_location_expedition: formData.id_location_expedition,
      email: formData.email,
      fullname: formData.fullname,
      id_number: formData.id_number,
      cod_municipio: formData.city,
      cellphone: formData.cellphone,
      user_id_bank: formData.user_id_bank === "-1" ? formData.bank_name : formData.user_id_bank,
      user_bank_account_type: formData.user_bank_account_type,
      user_bank_account_number: formData.user_bank_account_number,
      beneficiary_fullname: formData.beneficiary_fullname,
      beneficiary_id_type: formData.beneficiary_id_type,
      beneficiary_id_number: formData.beneficiary_id_number,
      beneficiary_id_location_expedition: formData.beneficiary_id_location_expedition,
      mortgage_contract: 1,
      address_residence: formData.address_residence,
      civil_status: CIVIL_STATUS[formData.civil_status],
      economy_activity: formData.economy_activity,
      address_residence_beneficiary: formData.address_residence_beneficiary,
      civil_status_beneficiary: CIVIL_STATUS[formData.civil_status_beneficiary],
      economy_activity_beneficiary: formData.economy_activity_beneficiary,
      email_beneficiary: formData.email_beneficiary,
      cellphone_beneficiary: formData.cellphone_beneficiary,
      cod_municipio_beneficiary: formData.city_beneficiary,
    };

    const { status } = await contractService.add({ body: postData, mortgage: true });

    if (status) {
      setFormData({
        id_type: "",
        id_location_expedition: "",
        email: "",
        fullname: "",
        id_number: "",
        country: "-",
        state: "-",
        city: "-",
        cellphone: "",
        user_id_bank: "",
        bank_name: "",
        user_bank_account_type: "",
        user_bank_account_number: "",
        beneficiary_fullname: "",
        beneficiary_id_type: "",
        beneficiary_id_number: "",
        beneficiary_id_location_expedition: "",
        address_residence: "",
        civil_status: "-",
        economy_activity: "",
        address_residence_beneficiary: "",
        civil_status_beneficiary: "",
        economy_activity_beneficiary: "",
        email_beneficiary: "",
        cellphone_beneficiary: "",
        country_beneficiary: "-",
        state_beneficiary: "-",
        city_beneficiary: "-",
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

    if (name === "country") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        state: "-",
        city: "-",
      }));
      setCities([]);
      setStates([]);

      if (value === "169") {
        const { status, data } = await $Utils.getLocation({ countryCode: value });

        if (status) {
          setStates(data.data);
        }
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          city: "",
        }));
      }
    }

    if (name === "state") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        city: "-",
      }));
      setCities([]);

      const { status, data } = await $Utils.getLocation({ stateCode: value });

      if (status) {
        setCities(data.data);
      }
    }

    if (name === "country_beneficiary") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        state_beneficiary: "-",
        city_beneficiary: "-",
      }));
      setCitiesBeneficiary([]);
      setStatesBeneficiary([]);

      if (value === "169") {
        const { status, data } = await $Utils.getLocation({ countryCode: value });

        if (status) {
          setStatesBeneficiary(data.data);
        }
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          city_beneficiary: "",
        }));
      }
    }

    if (name === "state_beneficiary") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        city_beneficiary: "-",
      }));
      setCitiesBeneficiary([]);

      const { status, data } = await $Utils.getLocation({ stateCode: value });

      if (status) {
        setCitiesBeneficiary(data.data);
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
        setCountries(data.data);
      }
    })();
  }, []);

  return (
    <Container maxWidth="xxl" sx={{ marginY: 4, padding: 4, border: 1, borderRadius: 2, borderColor: "primary.main" }}>
      <Grid display="flex" justifyContent="center">
        <Grid display="flex" flexDirection="column" alignItems="center">
          <img src={LogoImage} width={160} height={160} alt="photo" />
          <Typography variant="h2" fontSize={25}>
            Aplicación con garantía hipotecaria
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
                <MenuItem value="dni">DNI</MenuItem>
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.id_number}>Número de Documento</Label>
            <TextField
              required
              name="id_number"
              value={formData.id_number}
              onChange={handleInputChange}
              error={errors.id_number}
              sx={{ width: "100%" }}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.id_location_expedition}>Lugar de Exp del Documento</Label>
            <TextField
              name="id_location_expedition"
              value={formData.id_location_expedition}
              error={errors.id_location_expedition}
              required
              fullWidth
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
            <Label error={errors.civil_status}>Estado civil</Label>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Select
                name="civil_status"
                value={formData.civil_status}
                required
                error={errors.civil_status}
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.keys(CIVIL_STATUS).map((key) => (
                  <MenuItem key={key.id} value={key}>
                    {CIVIL_STATUS[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.economy_activity}>Actividad económica</Label>
            <TextField
              name="economy_activity"
              value={formData.economy_activity}
              error={errors.economy_activity}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.address_residence}>Dirección de residencia</Label>
            <TextField
              name="address_residence"
              value={formData.address_residence}
              error={errors.address_residence}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.country}>País de residencia</Label>
            <FormControl variant="outlined">
              <Select name="country" value={formData.country} onChange={handleInputChange} error={errors.country}>
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.codigoPais} value={country.codigoPais}>
                    {country.nombrePais}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          {formData.country === "-" ||
            (formData.country === "169" && (
              <Column>
                <Label error={errors.city}>Departamento de residencia</Label>
                <FormControl variant="outlined">
                  <Select name="state" value={formData.state} onChange={handleInputChange} error={errors.state}>
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
            ))}
        </Row>

        <Row>
          <Column>
            <Label error={errors.city}>Ciudad de residencia</Label>
            {formData.country === "-" || formData.country === "169" ? (
              <FormControl variant="outlined">
                <Select name="city" value={formData.city} onChange={handleInputChange} error={errors.city}>
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
            ) : (
              <TextField name="city" value={formData.city} onChange={handleInputChange} error={errors.city} />
            )}
          </Column>
          <Column>
            <Label error={errors.user_id_bank}>Banco</Label>
            <FormControl variant="outlined">
              <Select
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
                <MenuItem value="-1">Otro</MenuItem>
              </Select>
            </FormControl>
          </Column>
        </Row>
        {formData.user_id_bank === "-1" && (
          <Row>
            <Column>
              <Label error={errors.user_id_bank}>Especifique Cuál Banco</Label>
              <TextField
                name="bank_name"
                value={formData.bank_name}
                onChange={handleInputChange}
                error={errors.user_id_bank}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleInputChange({ target: { name: "user_id_bank", value: "-" } })}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Column>
          </Row>
        )}
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
            <Label error={errors.email_beneficiary}>Correo Electrónico</Label>
            <TextField
              name="email_beneficiary"
              value={formData.email_beneficiary}
              required
              sx={{ width: "100%" }}
              error={errors.email_beneficiary}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.beneficiary_id_number}>Número de Documento</Label>
            <TextField
              name="beneficiary_id_number"
              value={formData.beneficiary_id_number}
              onChange={handleInputChange}
              sx={{ width: "100%" }}
              error={errors.beneficiary_id_number}
            />
          </Column>
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
                <MenuItem value="dni">DNI</MenuItem>
              </Select>
            </FormControl>
          </Column>
        </Row>

        <Row>
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
          <Column>
            <Label error={errors.cellphone}>Teléfono de Contacto</Label>
            <PhoneField
              enableSearch={true}
              value={formData.cellphone_beneficiary}
              country="co"
              specialLabel=""
              autoFormat={true}
              inputStyle={{
                width: "100%",
              }}
              inputProps={{
                name: "cellphone_beneficiary",
                required: true,
              }}
              isValid={(value, country) => {
                if (value.match(/12345/) || errors.cellphone_beneficiary) {
                  return "Invalid value:" + value + ", " + country.name;
                } else {
                  return true;
                }
              }}
              onChange={(value) => handleInputChange({ target: { name: "cellphone_beneficiary", value } })}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.address_residence_beneficiary}>Dirección de residencia</Label>
            <TextField
              name="address_residence_beneficiary"
              value={formData.address_residence_beneficiary}
              error={errors.address_residence_beneficiary}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.country_beneficiary}>País de residencia</Label>
            <FormControl variant="outlined">
              <Select
                name="country_beneficiary"
                value={formData.country_beneficiary}
                onChange={handleInputChange}
                error={errors.country_beneficiary}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.codigoPais} value={country.codigoPais}>
                    {country.nombrePais}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          {formData.country_beneficiary === "-" ||
            (formData.country_beneficiary === "169" && (
              <Column>
                <Label error={errors.state_beneficiary}>Departamento de residencia</Label>
                <FormControl variant="outlined">
                  <Select
                    name="state_beneficiary"
                    value={formData.state_beneficiary}
                    onChange={handleInputChange}
                    error={errors.state_beneficiary}
                  >
                    <MenuItem value="-" selected disabled>
                      Seleccione una opción
                    </MenuItem>
                    {statesBeneficiary.map((e) => (
                      <MenuItem key={e.codigoDepto} value={e.codigoDepto}>
                        {e.nombreDepto}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Column>
            ))}
        </Row>

        <Row>
          <Column>
            <Label error={errors.city_beneficiary}>Ciudad de residencia</Label>
            {formData.country_beneficiary === "-" || formData.country_beneficiary === "169" ? (
              <FormControl variant="outlined">
                <Select
                  name="city_beneficiary"
                  value={formData.city_beneficiary}
                  onChange={handleInputChange}
                  error={errors.city_beneficiary}
                >
                  <MenuItem value="-" selected disabled>
                    Seleccione una opción
                  </MenuItem>
                  {citiesBeneficiary.map((e) => (
                    <MenuItem key={e.codMupio} value={e.codMupio}>
                      {e.nombreMupio}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                name="city_beneficiary"
                value={formData.city_beneficiary}
                onChange={handleInputChange}
                error={errors.city_beneficiary}
              />
            )}
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.civil_status_beneficiary}>Estado civil</Label>
            <FormControl variant="outlined" sx={{ width: "100%" }}>
              <Select
                name="civil_status_beneficiary"
                value={formData.civil_status_beneficiary}
                required
                error={errors.civil_status_beneficiary}
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.keys(CIVIL_STATUS).map((key) => (
                  <MenuItem key={key.id} value={key}>
                    {CIVIL_STATUS[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.economy_activity_beneficiary}>Actividad económica</Label>
            <TextField
              name="economy_activity_beneficiary"
              value={formData.economy_activity_beneficiary}
              error={errors.economy_activity_beneficiary}
              required
              fullWidth
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

      <Dialog open={feedback.open && feedback.status === "success"} onClose={resetFeedback}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <CheckIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Formulario completado exitosamente.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={18} textAlign="center">
            ¿Desea rellenarlo una vez más?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => navigate("/")} fullWidth>
            No
          </Button>
          <Button variant="contained" onClick={resetFeedback} fullWidth>
            Si
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={feedback.open && feedback.status === "error"} onClose={resetFeedback}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <ErrorIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Ha ocurrido un error.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={18} textAlign="center">
            Verifica los campos e inténtalo nuevamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={resetFeedback} fullWidth>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingFormMortgage;
