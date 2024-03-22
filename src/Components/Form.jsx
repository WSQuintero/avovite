import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  Zoom,
  alpha,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Clear as ClearIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useMemo, useState } from "react";
import PhoneField from "react-phone-input-2";
import useConfig from "../Hooks/useConfig";
import UtilsService from "../Services/utils.service";
import LogoImage from "../assets/img/common/logo.svg";
import { CIVIL_STATUS, DOCUMENT_TYPES, EDUCATIONAL_LEVEL, HOW_DID_YOU_HEAR_ABOUT_US, OCCUPATION } from "../utilities/constants";
import { validateJSON } from "../utilities";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import { useSnackbar } from "notistack";
import useSession from "../Hooks/useSession";
import DialogKYC from "./Dialogs/KYC";
import useUser from "../Hooks/useUser";
import { useLocation } from "react-router-dom";

const InitialState = {
  fullname: "",
  id_type: "-",
  id_number: "",
  id_location_expedition: "",
  birthdate: "",
  email: "",
  cellphone: "",
  nationality: "-",
  country_of_residence: "-",
  cod_municipio: "-",
  residence_neighborhood: "",
  address_residence: "",
  civil_status: "-",
  education_level: "-",
  he_has_children: "No",
  he_has_children_count: "1",
  occupation: "-",
  profession: "",
  economy_activity: "",
  monthly_income: "",
  how_did_you_hear_about_us: "-",

  user_id_bank: "-",
  user_bank_account_type: "-",
  user_bank_account_number: "",
  does_account_belong_to_holder: "Yes",
  full_name_of_account_holder: "",
  account_holder_document_type: "-",
  document_number_of_the_account_holder: "",

  beneficiary_fullname: "",
  email_beneficiary: "",
  beneficiary_id_number: "",
  beneficiary_id_type: "-",
  cellphone_beneficiary: "",
  beneficiary_id_location_expedition: "",
  country_of_residence_beneficiary: "-",
  cod_municipio_beneficiary: "-",
  address_residence_beneficiary: "",
  civil_status_beneficiary: "-",
  economy_activity_beneficiary: "",
};

const InitialStateErrors = {
  fullname: false,
  id_type: false,
  id_number: false,
  id_location_expedition: false,
  birthdate: false,
  email: false,
  cellphone: false,
  nationality: false,
  country_of_residence: false,
  cod_municipio: false,
  residence_neighborhood: false,
  address_residence: false,
  civil_status: false,
  education_level: false,
  he_has_children: false,
  he_has_children_count: false,
  occupation: false,
  profession: false,
  economy_activity: false,
  monthly_income: false,

  user_id_bank: false,
  user_bank_account_type: false,
  user_bank_account_number: false,
  does_account_belong_to_holder: false,
  full_name_of_account_holder: false,
  account_holder_document_type: false,
  document_number_of_the_account_holder: false,

  beneficiary_fullname: false,
  email_beneficiary: false,
  beneficiary_id_number: false,
  beneficiary_id_type: false,
  cellphone_beneficiary: false,
  beneficiary_id_location_expedition: false,
  country_of_residence_beneficiary: false,
  cod_municipio_beneficiary: false,
  address_residence_beneficiary: false,
  civil_status_beneficiary: false,
  economy_activity_beneficiary: false,

  how_did_you_hear_about_us: false,
};

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

function Form({ title, isMortgage = false, loading = false, initialState = null, onSubmit, onLoad = () => {} }) {
  const { enqueueSnackbar } = useSnackbar();
  const [{ constants }] = useConfig();
  const [{ user }, { setUser }] = useSession();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statesBeneficiary, setStatesBeneficiary] = useState([]);
  const [citiesBeneficiary, setCitiesBeneficiary] = useState([]);
  const [formData, setFormData] = useState(InitialState);
  const [errors, setErrors] = useState(InitialStateErrors);
  const [modal, setModal] = useState({ kyc: false });
  const location = useLocation();
  const [controlFormData, setControlFormData] = useState({
    state: "-",
    bank_name: "",
    state_beneficiary: "-",
  });
  const [errorControlFormData, setErrorControlFormData] = useState({
    state: false,
    bank_name: false,
    state_beneficiary: false,
  });
  const $Utils = useMemo(() => new UtilsService(), []);
  const $User = useUser();

  const handleInputChange = async (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    if (name === "country_of_residence") {
      setControlFormData((prev) => ({ ...prev, state: "-" }));
      setCities([]);
      setStates([]);
      //aquí
      if (value === "169") {
        setFormData((prev) => ({ ...prev, cod_municipio: "-" }));
        const { status, data } = await $Utils.getLocation({ countryCode: value });

        if (status) {
          setStates(data.data);
        }
      } else {
        setFormData((prev) => ({ ...prev, cod_municipio: "" }));
      }
    }

    if (name === "country_of_residence_beneficiary") {
      setControlFormData((prev) => ({ ...prev, state_beneficiary: "-" }));
      setCitiesBeneficiary([]);
      setStatesBeneficiary([]);

      if (value === "169") {
        setFormData((prev) => ({ ...prev, cod_municipio_beneficiary: "-" }));
        const { status, data } = await $Utils.getLocation({ countryCode: value });

        if (status) {
          setStatesBeneficiary(data.data);
        }
      } else {
        setFormData((prev) => ({ ...prev, cod_municipio_beneficiary: "" }));
      }
    }
  };

  const handleControlInputChange = async (event) => {
    const { name, value } = event.target;

    setControlFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrorControlFormData((prev) => ({ ...prev, [name]: false }));
    }

    if (name === "state") {
      setFormData((prev) => ({ ...prev, cod_municipio: "-" }));
      setCities([]);

      const fetchData = async () => {
        const { status, data } = await $Utils.getLocation({ stateCode: value });
        if (status) {
          setCities(data.data);
        }
      };

      fetchData();
    }

    if (name === "state_beneficiary") {
      setFormData((prev) => ({ ...prev, cod_municipio_beneficiary: "-" }));
      setCitiesBeneficiary([]);

      const fetchData = async () => {
        const { status, data } = await $Utils.getLocation({ stateCode: value });
        if (status) {
          setCitiesBeneficiary(data.data);
        }
      };

      fetchData();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validation = validateJSON(formData, [
      "how_did_you_hear_about_us",
      ...(formData.he_has_children === "No" ? ["he_has_children_count"] : []),
      ...(formData.does_account_belong_to_holder === "Yes"
        ? ["full_name_of_account_holder", "account_holder_document_type", "document_number_of_the_account_holder"]
        : []),
    ]);

    if (validation.length) {
      const fails = {};
      validation.forEach((key) => (fails[key] = true));
      setErrors((prev) => ({ ...prev, ...fails }));
      enqueueSnackbar("Por favor complete todos los campos requeridos.", { variant: "error" });
      return;
    }

    const body = {
      ...formData,
      he_has_children: formData.he_has_children === "Yes",
      does_account_belong_to_holder: formData.does_account_belong_to_holder === "Yes",
      birthdate: dayjs(formData.birthdate).format("YYYY-MM-DD"),
      ...(isMortgage ? { mortgage_contract: 1 } : {}),
    };

    onSubmit({ body, mortgage: isMortgage });
  };

  const handleSubmitKYC = async (form) => {
    const body = new FormData();

    body.append("faces", form.document);
    body.append("faces", form.face1);
    body.append("faces", form.face2);

    const { status } = await $User.sendKYC(body);

    if (status) {
      setUser({ ...user, KYC: 1 });
    }

    return status;
  };

  useEffect(() => {
    const fetchStates = async () => {
      if (initialState?.country_of_residence === "169") {
        const { status, data } = await $Utils.getLocation({ countryCode: "169" });

        if (status) {
          setStates(data.data);
        }
      } else {
        setFormData((prev) => ({ ...prev, cod_municipio: "" }));
      }
    };

    fetchStates();
  }, [initialState]);

  useEffect(() => {
    (async () => {
      const { status, data } = await $Utils.getLocation();

      if (status) {
        setCountries(data.data);
      }
    })();

    onLoad({
      reset() {
        setFormData({ ...InitialState, ...(initialState || {}) });
      },
    });
  }, []);

  useEffect(() => {
    if (initialState) {
      setFormData((prev) => ({ ...prev, ...initialState }));
    }
  }, [initialState]);

  useEffect(() => {
    if (user) {
      setModal((prev) => ({ ...prev, kyc: user.KYC === 0 }));
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setModal((prev) => ({ ...prev, kyc: user.KYC === 0 }));
      setFormData({ ...InitialState, cellphone: user?.cellphone, email: user.email, fullname: user.fullname });
    }
  }, [user]);

  return (
    <Stack>
      <Grid display="flex" justifyContent="center">
        <Grid display="flex" flexDirection="column" alignItems="center">
          <img src={LogoImage} width={160} height={160} alt="photo" />
          {title && (
            <Typography variant="h2" fontSize={24}>
              {title}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box height={title ? 64 : 32} />
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
          Información del titular
        </Typography>

        <Row>
          <Column>
            <Label error={errors.fullname}>Nombre Completo</Label>
            <TextField
              required
              fullWidth
              name="fullname"
              value={formData.fullname || user?.fullname}
              error={errors.fullname}
              onChange={handleInputChange}
              disabled={user?.fullname ? true : false}
            />
          </Column>
          <Row>
            <Column>
              <Label error={errors.id_type} disabled={errors.id_type !== undefined}>
                Tipo de Documento
              </Label>
              <FormControl variant="outlined" fullWidth>
                <Select
                  name="id_type"
                  id="tipoDocumento"
                  value={formData.id_type}
                  disabled={
                    initialState?.id_type !== undefined &&
                    initialState?.id_type !== null &&
                    location.pathname !== "/validation/confirmation"
                  }
                  onChange={(event) => handleInputChange(event)}
                  error={errors.id_type}
                >
                  <MenuItem value="-" disabled>
                    Seleccione una opción
                  </MenuItem>
                  {Object.keys(DOCUMENT_TYPES).map((key) => (
                    <MenuItem key={key} value={key}>
                      {key !== "tarjetaIdentidad" && <>{DOCUMENT_TYPES[key]}</>}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Column>
          </Row>
        </Row>

        <Row>
          <Column>
            <Label error={errors.id_number}>Número de Documento</Label>
            <TextField
              required
              fullWidth
              name="id_number"
              value={formData.id_number}
              onChange={handleInputChange}
              error={errors.id_number}
              disabled={
                initialState?.id_number !== "" && initialState?.id_number !== undefined && location.pathname !== "/validation/confirmation"
              }
            />
          </Column>
          <Column>
            <Label error={errors.id_location_expedition}>Lugar de Exp del Documento</Label>
            <TextField
              required
              fullWidth
              name="id_location_expedition"
              value={formData.id_location_expedition}
              error={errors.id_location_expedition}
              onChange={handleInputChange}
              disabled={
                initialState?.id_location_expedition !== "" &&
                initialState?.id_location_expedition !== undefined &&
                location.pathname !== "/validation/confirmation"
              }
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.birthdate}>Fecha de Nacimiento</Label>
            <DatePicker
              disableFuture
              slotProps={{ textField: { error: errors.birthdate } }}
              value={dayjs(formData.birthdate)}
              format="DD MMMM YYYY"
              onChange={(value) => handleInputChange({ target: { name: "birthdate", value: value.toDate() } })}
              disabled={initialState?.birthdate !== undefined && location.pathname !== "/validation/confirmation"}
            />
          </Column>

          <Column>
            <Label error={errors.email} disabled={errors.email !== undefined}>
              Correo Electrónico
            </Label>
            <TextField
              required
              fullWidth
              name="email"
              value={formData.email || user?.email}
              error={errors.email}
              onChange={handleInputChange}
              disabled={user?.email ? true : false}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.cellphone} disabled={user?.cellphone}>
              Teléfono de Contacto
            </Label>
            <PhoneField
              enableSearch={true}
              value={user?.cellphone}
              disabled={user?.cellphone}
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
                  return false;
                } else {
                  return true;
                }
              }}
              onChange={(value) => handleInputChange({ target: { name: "cellphone", value } })}
            />
          </Column>
          <Column>
            <Label
              error={errors.nationality}
              disabled={errors.nationality !== undefined && location.pathname !== "/validation/confirmation"}
            >
              Nacionalidad
            </Label>
            <FormControl variant="outlined">
              <Select
                required
                fullWidth
                name="nationality"
                value={
                  countries?.find((country) => country?.nombrePais === (formData?.nationality || "").toUpperCase())?.codigoPais ||
                  formData?.nationality
                }
                onChange={handleInputChange}
                disabled={initialState?.nationality !== undefined && location.pathname !== "/validation/confirmation"}
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
        </Row>

        <Row>
          <Column>
            <Label
              error={errors.country_of_residence}
              disabled={errorControlFormData.country_of_residence !== undefined && location.pathname !== "/validation/confirmation"}
            >
              País de residencia
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                name="country_of_residence"
                value={
                  countries?.find((country) => country?.nombrePais === (formData?.country_of_residence || "").toUpperCase())?.codigoPais ||
                  formData?.country_of_residence
                }
                onChange={handleInputChange}
                error={errors.country_of_residence}
                disabled={initialState.country_of_residence !== undefined && location.pathname !== "/validation/confirmation"}
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
          {formData.country_of_residence === "169" && (
            <Column>
              <Label error={errorControlFormData.state} disabled={errorControlFormData.state !== undefined}>
                Departamento de residencia
              </Label>
              <FormControl variant="outlined" fullWidth>
                <Select
                  name="state"
                  value={controlFormData?.state}
                  // disabled={initialState.state !== undefined}
                  onChange={handleControlInputChange}
                  error={errorControlFormData.state}
                >
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
          )}
        </Row>

        <Row>
          <Column>
            <Label
              error={errors.cod_municipio}
              disabled={errors.cod_municipio !== undefined && location.pathname !== "/validation/confirmation"}
            >
              Ciudad de residencia
            </Label>
            {formData?.country_of_residence === "-" || formData?.country_of_residence === "169" ? (
              <FormControl variant="outlined" fullWidth>
                <Select
                  name="cod_municipio"
                  value={formData.cod_municipio}
                  // disabled={formData?.cod_municipio ? true:false}
                  onChange={handleInputChange}
                  error={errors.cod_municipio}
                >
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
              <TextField
                name="cod_municipio"
                value={formData.cod_municipio}
                // disabled={formData?.cod_municipio && location.pathname !== "/validation/confirmation" ? true : false}
                onChange={handleInputChange}
                error={errors.cod_municipio}
              />
            )}
          </Column>
          <Column>
            <Label error={errors.residence_neighborhood} disabled={errors.residence_neighborhood !== undefined}>
              Barrio de residencia (nombre)
            </Label>
            <TextField
              required
              fullWidth
              name="residence_neighborhood"
              value={formData.residence_neighborhood}
              disabled={initialState?.residence_neighborhood !== undefined && location.pathname !== "/validation/confirmation"}
              onChange={handleInputChange}
              error={errors.residence_neighborhood}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.address_residence} disabled={errors.address_residence !== undefined}>
              Dirección de residencia
            </Label>
            <TextField
              required
              fullWidth
              name="address_residence"
              value={formData.address_residence}
              disabled={initialState?.address_residence !== undefined && location.pathname !== "/validation/confirmation"}
              error={errors.address_residence}
              onChange={handleInputChange}
            />
          </Column>
          <Column>
            <Label error={errors.civil_status} disabled={errors.civil_status !== undefined}>
              Estado civil
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                name="civil_status"
                value={formData.civil_status}
                disabled={initialState?.civil_status !== undefined && location.pathname !== "/validation/confirmation"}
                error={errors.civil_status}
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.keys(CIVIL_STATUS).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.education_level} disabled={errors.education_level !== ""}>
              Nivel Educativo
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                required
                name="education_level"
                value={formData.education_level}
                disabled={initialState.education_level && location.pathname !== "/validation/confirmation"}
                onChange={handleInputChange}
                error={errors.education_level}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.values(EDUCATIONAL_LEVEL).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label
              error={errors.he_has_children || errors.he_has_children_count}
              disabled={
                errors.he_has_children || (errors.he_has_children_count !== undefined && location.pathname !== "/validation/confirmation")
              }
            >
              ¿Actualmente tiene hijos?
            </Label>
            <Stack direction="row" spacing={1}>
              <RadioGroup
                row
                name="he_has_children"
                value={formData.he_has_children}
                // disabled={initialState?.he_has_children  true&&initialState?.he_has_children !== false}
                onChange={handleInputChange}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Si" />
              </RadioGroup>
              <Zoom in={formData.he_has_children === "Yes"}>
                <TextField
                  size="small"
                  type="number"
                  placeholder="¿Cuantos?"
                  name="he_has_children_count"
                  error={errors.he_has_children_count}
                  value={formData.he_has_children_count}
                  // disabled={initialState?.he_has_children_count !== undefined}
                  onChange={handleInputChange}
                />
              </Zoom>
            </Stack>
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.occupation} disabled={errors.occupation !== undefined}>
              Usted es - Ocupación
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                name="occupation"
                value={formData.occupation}
                disabled={initialState?.occupation !== undefined && location.pathname !== "/validation/confirmation"}
                error={errors.occupation}
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.values(OCCUPATION).map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.profession} disabled={errors.profession !== undefined}>
              Profesión - ¿Qué estudió?
            </Label>
            <TextField
              required
              fullWidth
              name="profession"
              value={formData.profession}
              disabled={initialState?.profession !== undefined && location.pathname !== "/validation/confirmation"}
              error={errors.profession}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.economy_activity} disabled={errors.economy_activity !== undefined}>
              Actividad económica
            </Label>
            <TextField
              required
              fullWidth
              name="economy_activity"
              value={formData.economy_activity}
              disabled={initialState?.economy_activity !== undefined && location.pathname !== "/validation/confirmation"}
              error={errors.economy_activity}
              onChange={handleInputChange}
            />
          </Column>
          <Column>
            <Label error={errors.monthly_income} disabled={errors.monthly_income !== undefined}>
              Ingreso Mensual
            </Label>
            <NumericFormat
              thousandSeparator
              fullWidth
              customInput={TextField}
              variant="outlined"
              name="monthly_income"
              error={errors.monthly_income}
              value={formData.monthly_income}
              disabled={initialState?.monthly_income !== undefined && location.pathname !== "/validation/confirmation"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography>$</Typography>
                  </InputAdornment>
                ),
              }}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.how_did_you_hear_about_us}>¿Cómo te enteraste de nosotros?</Label>
            <TextField
              select
              fullWidth
              name="how_did_you_hear_about_us"
              value={formData?.how_did_you_hear_about_us}
              disabled={initialState?.how_did_you_hear_about_us !== undefined && location.pathname !== "/validation/confirmation"}
              onChange={handleInputChange}
            >
              <MenuItem disabled value="-">
                Seleccione una opción
              </MenuItem>
              {Object.values(HOW_DID_YOU_HEAR_ABOUT_US).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
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
          Información bancaria
          <Typography variant="caption" display="block">
            Cuenta bancaria donde deseas recibir tus transferencias.
          </Typography>
        </Typography>

        <Row>
          <Column>
            <Label error={errors.user_id_bank} disabled={errors.user_id_bank !== undefined}>
              Banco
            </Label>
            <FormControl variant="outlined">
              <Select
                name="user_id_bank"
                value={formData.user_id_bank}
                disabled={initialState?.user_id_bank !== undefined && location.pathname !== "/validation/confirmation"}
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
          {formData.user_id_bank === "-1" && (
            <Column>
              <Label
                error={errorControlFormData.bank_name}
                disabled={errorControlFormData.bank_name !== undefined && location.pathname !== "/validation/confirmation"}
              >
                Especifique Cuál Banco
              </Label>
              <TextField
                name="bank_name"
                value={controlFormData.bank_name}
                disabled={controlFormData.bank_name !== undefined && location.pathname !== "/validation/confirmation"}
                onChange={handleControlInputChange}
                error={errorControlFormData.bank_name}
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
          )}
        </Row>

        <Row>
          <Column>
            <Label error={errors.user_bank_account_type} disabled={errors.user_bank_account_type !== undefined}>
              Tipo de Cuenta
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                name="user_bank_account_type"
                id="tipoDeCuentaBeneficiaria"
                value={formData.user_bank_account_type}
                disabled={initialState?.user_bank_account_type !== undefined && location.pathname !== "/validation/confirmation"}
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
            <Label error={errors.user_bank_account_number} disabled={errors.user_bank_account_number !== undefined}>
              Número de Cuenta
            </Label>
            <TextField
              name="user_bank_account_number"
              value={formData.user_bank_account_number}
              disabled={initialState?.user_bank_account_number !== undefined && location.pathname !== "/validation/confirmation"}
              onChange={handleInputChange}
              fullWidth
              error={errors.user_bank_account_number}
            />
          </Column>
        </Row>

        {/* <Row>
          <Column>
            <Label error={errors.does_account_belong_to_holder} disabled={errors.does_account_belong_to_holder !== undefined}>
              ¿La cuenta le pertenece al titular del contrato?
            </Label>
            <RadioGroup
              row
              name="does_account_belong_to_holder"
              value={formData.does_account_belong_to_holder}
              // disabled={initialState?.does_account_belong_to_holder !== undefined}
              onChange={handleInputChange}
            >
              <FormControlLabel value="Yes" control={<Radio />} label="Si" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Column>
        </Row> */}

        {formData.does_account_belong_to_holder === "No" && (
          <>
            <Row>
              <Column>
                <Label error={errors.full_name_of_account_holder} disabled={errors.full_name_of_account_holder !== undefined}>
                  Nombre Completo del titular de la cuenta
                </Label>
                <TextField
                  required
                  fullWidth
                  name="full_name_of_account_holder"
                  value={formData.full_name_of_account_holder}
                  // disabled={initialState?.full_name_of_account_holder !== undefined}
                  error={errors.full_name_of_account_holder}
                  onChange={handleInputChange}
                />
              </Column>
              <Column>
                <Label error={errors.account_holder_document_type} disabled={errors.account_holder_document_type !== undefined}>
                  Tipo de Documento del titular de la cuenta
                </Label>
                <FormControl variant="outlined" fullWidth>
                  <Select
                    required
                    name="account_holder_document_type"
                    value={formData.account_holder_document_type}
                    // disabled={initialState?.account_holder_document_type !== undefined}
                    error={errors.account_holder_document_type}
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
              </Column>
            </Row>

            <Row>
              <Column>
                <Label
                  error={errors.document_number_of_the_account_holder}
                  disabled={errors.document_number_of_the_account_holder !== undefined}
                >
                  Número de Documento del titular de la cuenta
                </Label>
                <TextField
                  required
                  fullWidth
                  name="document_number_of_the_account_holder"
                  value={formData.document_number_of_the_account_holder}
                  // disabled={initialState?.document_number_of_the_account_holder !== undefined}
                  onChange={handleInputChange}
                  error={errors.document_number_of_the_account_holder}
                />
              </Column>
            </Row>
          </>
        )}

        <Typography
          fontSize={24}
          textAlign="center"
          fontWeight={600}
          color="primary"
          paddingY={1}
          marginX={-3}
          sx={(t) => ({ backgroundColor: alpha(t.palette.primary.main, 0.1) })}
        >
          Información del beneficiario
          <Typography variant="caption" display="block">
            Designa un beneficiario en tu contrato que pueda recibir los frutos en caso de fuerza mayor o evento fortuito.
          </Typography>
        </Typography>

        <Row>
          <Column>
            <Label error={errors.beneficiary_fullname}>Nombre Completo</Label>
            <TextField
              name="beneficiary_fullname"
              value={formData.beneficiary_fullname}
              // disabled={initialState?.beneficiary_fullname !== undefined}
              onChange={handleInputChange}
              fullWidth
              error={errors.beneficiary_fullname}
            />
          </Column>
          <Column>
            <Label error={errors.email_beneficiary}>Correo Electrónico</Label>
            <TextField
              name="email_beneficiary"
              value={formData.email_beneficiary}
              // disabled={initialState?.email_beneficiary !== undefined}
              required
              fullWidth
              error={errors.email_beneficiary}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.beneficiary_id_type} disabled={errors.beneficiary_id_type !== undefined}>
              Tipo de Documento
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                name="beneficiary_id_type"
                id="tipoDocumentoBeneficiario"
                value={formData.beneficiary_id_type}
                // disabled={initialState?.beneficiary_id_type !== undefined}
                onChange={handleInputChange}
                error={errors.beneficiary_id_type}
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
          </Column>
          <Column>
            <Label error={errors.beneficiary_id_number} disabled={errors.beneficiary_id_number !== undefined}>
              Número de Documento
            </Label>
            <TextField
              name="beneficiary_id_number"
              value={formData.beneficiary_id_number}
              // disabled={initialState?.beneficiary_id_number !== undefined}
              onChange={handleInputChange}
              fullWidth
              error={errors.beneficiary_id_number}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.beneficiary_id_location_expedition} disabled={errors.beneficiary_id_location_expedition !== undefined}>
              Lugar de Expedición del Documento
            </Label>
            <TextField
              name="beneficiary_id_location_expedition"
              value={formData.beneficiary_id_location_expedition}
              // disabled={initialState?.beneficiary_id_location_expedition !== undefined}
              fullWidth
              error={errors.beneficiary_id_location_expedition}
              onChange={handleInputChange}
            />
          </Column>
          <Column>
            <Label error={errors.cellphone} disabled={errors.cellphone !== undefined}>
              Teléfono de Contacto
            </Label>
            <PhoneField
              enableSearch={true}
              value={formData.cellphone_beneficiary}
              // disabled={initialState?.cellphone_beneficiary !== undefined}
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
            <Label error={errors.country_of_residence_beneficiary} disabled={errors.country_of_residence_beneficiary !== undefined}>
              País de residencia
            </Label>
            <FormControl variant="outlined">
              <Select
                name="country_of_residence_beneficiary"
                value={formData.country_of_residence_beneficiary}
                // disabled={initialState?.country_of_residence_beneficiary !== undefined}
                onChange={handleInputChange}
                error={errors.country_of_residence_beneficiary}
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
          {formData.country_of_residence_beneficiary === "169" && (
            <Column>
              <Label error={errorControlFormData.state_beneficiary} disabled={errorControlFormData.state_beneficiary !== undefined}>
                Departamento de residencia
              </Label>
              <FormControl variant="outlined">
                <Select
                  name="state_beneficiary"
                  value={controlFormData.state_beneficiary}
                  // disabled={controlFormData.state_beneficiary !== undefined}
                  error={errorControlFormData.state_beneficiary}
                  onChange={handleControlInputChange}
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
          )}
        </Row>

        <Row>
          <Column>
            <Label error={errors.cod_municipio_beneficiary} disabled={errors.cod_municipio_beneficiary !== undefined}>
              Ciudad de residencia
            </Label>
            {formData.country_of_residence_beneficiary === "-" || formData.country_of_residence_beneficiary === "169" ? (
              <FormControl variant="outlined">
                <Select
                  name="cod_municipio_beneficiary"
                  value={formData.cod_municipio_beneficiary}
                  // disabled={initialState?.cod_municipio_beneficiary !== undefined}
                  onChange={handleInputChange}
                  error={errors.cod_municipio_beneficiary}
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
                name="cod_municipio_beneficiary"
                value={formData.cod_municipio_beneficiary}
                // disabled={initialState?.cod_municipio_beneficiary !== undefined}
                onChange={handleInputChange}
                error={errors.cod_municipio_beneficiary}
              />
            )}
          </Column>
          <Column>
            <Label error={errors.address_residence_beneficiary} disabled={errors.address_residence_beneficiary !== undefined}>
              Dirección de residencia
            </Label>
            <TextField
              required
              fullWidth
              name="address_residence_beneficiary"
              value={formData.address_residence_beneficiary}
              // disabled={initialState?.address_residence_beneficiary !== undefined}
              error={errors.address_residence_beneficiary}
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <Row>
          <Column>
            <Label error={errors.civil_status_beneficiary} disabled={errors.civil_status_beneficiary !== undefined}>
              Estado civil
            </Label>
            <FormControl variant="outlined" fullWidth>
              <Select
                required
                name="civil_status_beneficiary"
                value={formData.civil_status_beneficiary}
                // disabled={initialState?.civil_status_beneficiary !== undefined}
                error={errors.civil_status_beneficiary}
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.keys(CIVIL_STATUS).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column>
          <Column>
            <Label error={errors.economy_activity_beneficiary} disabled={errors.economy_activity_beneficiary !== undefined}>
              Ocupación
            </Label>
            <TextField
              name="economy_activity_beneficiary"
              value={formData.economy_activity_beneficiary}
              // disabled={initialState?.economy_activity_beneficiary !== undefined}
              error={errors.economy_activity_beneficiary}
              required
              fullWidth
              onChange={handleInputChange}
            />
          </Column>
        </Row>

        <LoadingButton
          fullWidth
          type="submit"
          size="large"
          variant="contained"
          loading={loading}
          // disabled={Object.values(errors).reduce((a, c) => a || c, false)}
          onClick={handleSubmit}
        >
          Enviar
        </LoadingButton>
      </Grid>

      <DialogKYC open={modal.kyc} onClose={() => setModal({ ...modal, kyc: false })} onSubmit={handleSubmitKYC} />
    </Stack>
  );
}

export default Form;
