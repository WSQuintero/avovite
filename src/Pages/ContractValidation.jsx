import { useEffect, useMemo, useState } from "react";
import PhoneField from "react-phone-input-2";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import {
  Warning as WarningIcon,
  Clear as ClearIcon,
  CheckCircle as CheckIcon,
  HistoryEdu as ContractIcon,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useSession from "../Hooks/useSession";
import useConfig from "../Hooks/useConfig";
import ContractService from "../Services/contract.service";
import UtilsService from "../Services/utils.service";
import PageWrapper from "../Components/PageWrapper";
import { formatDate, validateJSON } from "../utilities";

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

function ContractValidation() {
  const [{ token }] = useSession();
  const [{ constants }] = useConfig();
  const [contracts, setContracts] = useState({});
  const [contract, setContract] = useState({
    id: null,
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
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [modal, setModal] = useState("warning");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const $Utils = useMemo(() => new UtilsService(), []);
  const isValidContract = useMemo(() => Object.values(errors).reduce((a, c) => a || c, false), [errors]);

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({ pending: true });

    console.log(data.data);

    if (status) {
      setContracts(data.data);
    }
  };

  const fetchCountries = async () => {
    const { status, data } = await $Utils.getLocation();

    if (status) {
      setCountries(data.data);
    }
  };

  const onSelectContract = ({ id }) => {
    setModal("contract-complete");

    const newContract = {};

    contracts?.lastContract[0] &&
      Object.keys(contract).forEach((key) => {
        if (contracts.lastContract[0][key]) {
          newContract[key] = contracts.lastContract[0][key];
        }
      });

    setContract((prev) => ({ ...prev, ...newContract, id }));
  };

  const onClearFields = () => {
    setContract({
      id: null,
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
    });
  };

  const onInputChange = async (event) => {
    const { name, value } = event.target;

    setContract((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }

    if (name === "country") {
      setContract((prevFormData) => ({
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
        setContract((prevFormData) => ({
          ...prevFormData,
          city: "",
        }));
      }
    }

    if (name === "state") {
      setContract((prevFormData) => ({
        ...prevFormData,
        city: "-",
      }));
      setCities([]);

      const { status, data } = await $Utils.getLocation({ stateCode: value });

      if (status) {
        setCities(data.data);
      }
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const validation = validateJSON(contract, [
      "id",
      ...(contract.country !== "169" ? ["state"] : []),
      ...(contract.user_id_bank !== "-1" ? ["bank_name"] : []),
    ]);

    if (validation.length) {
      validation.forEach((error) => setErrors((prev) => ({ ...prev, [error]: true })));
      return;
    }

    const body = {
      id_type: contract.id_type,
      id_location_expedition: contract.id_location_expedition,
      email: contract.email,
      fullname: contract.fullname,
      id_number: contract.id_number,
      cod_municipio: contract.city,
      cellphone: contract.cellphone,
      user_id_bank: contract.user_id_bank === "-1" ? contract.bank_name : contract.user_id_bank,
      user_bank_account_type: contract.user_bank_account_type,
      user_bank_account_number: contract.user_bank_account_number,
      beneficiary_fullname: contract.beneficiary_fullname,
      beneficiary_id_type: contract.beneficiary_id_type,
      beneficiary_id_number: contract.beneficiary_id_number,
      beneficiary_id_location_expedition: contract.beneficiary_id_location_expedition,
    };

    setLoadingSubmit(true);

    const { status } = await $Contract.complete({ id: contract.id, body, pending: true });

    if (status) {
      setContracts((prev) => ({ ...prev, pendings: prev.pendings.filter((c) => c.id !== contract.id) }));
      setModal("contract-success");
      onClearFields();
    } else {
      console.log("Error");
    }

    setLoadingSubmit(false);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchContracts();
        await fetchCountries();
      })();
    }
  }, [token]);

  return (
    <PageWrapper isInvalidSession>
      <Container maxWidth="xxl" disableGutters>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography variant="h2">Contratos pendientes:</Typography>
          <List>
            {(contracts.pendings || []).map((contract, index) => (
              <ListItem
                key={contract.id}
                onClick={() => onSelectContract(contract)}
                secondaryAction={<Button edge="end">Completar</Button>}
                disablePadding
              >
                <ListItemButton role={undefined} onClick={() => {}}>
                  <ListItemIcon>
                    <ContractIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Contrato ${index + 1}`}
                    secondary={`válido hasta el ${formatDate(contract.payment_deadline)}`}
                    primaryTypographyProps={{ fontSize: 20, color: "primary" }}
                    secondaryTypographyProps={{ color: "text.main" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Container>

      <Dialog open={modal === "warning"} onClose={() => setModal(null)}>
        <DialogTitle color="error" display="flex" alignItems="center" gap={1}>
          <WarningIcon /> Tienes contratos pendientes
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Para poder continuar debes de efectuar pagos todos tus contratos.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setModal(null)}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        fullWidth
        PaperProps={{ sx: { backgroundColor: "white" } }}
        open={modal === "contract-complete"}
        onClose={() => {
          setModal(null);
          onClearFields();
        }}
      >
        <DialogContent>
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
                  value={contract.fullname}
                  required
                  error={errors.fullname}
                  sx={{ width: "100%" }}
                  onChange={onInputChange}
                />
              </Column>
              <Column>
                <Label error={errors.email}>Correo Electrónico</Label>
                <TextField
                  name="email"
                  value={contract.email}
                  required
                  sx={{ width: "100%" }}
                  error={errors.email}
                  onChange={onInputChange}
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label error={errors.id_type}>Tipo de Documento</Label>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Select
                    name="id_type"
                    value={contract.id_type}
                    required
                    error={errors.id_type}
                    onChange={onInputChange}
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
                  value={contract.id_number}
                  onChange={onInputChange}
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
                  value={contract.id_location_expedition}
                  error={errors.id_location_expedition}
                  required
                  fullWidth
                  onChange={onInputChange}
                />
              </Column>
              <Column>
                <Label error={errors.cellphone}>Teléfono de Contacto</Label>
                <PhoneField
                  enableSearch={true}
                  value={contract.cellphone}
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
                  onChange={(value) => onInputChange({ target: { name: "cellphone", value } })}
                />
              </Column>
            </Row>

            <Row>
              <Column>
                <Label error={errors.country}>País</Label>
                <FormControl variant="outlined">
                  <Select name="country" value={contract.country} onChange={onInputChange} error={errors.country}>
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
              {contract.country === "-" ||
                (contract.country === "169" && (
                  <Column>
                    <Label error={errors.city}>Departamento</Label>
                    <FormControl variant="outlined">
                      <Select name="state" value={contract.state} onChange={onInputChange} error={errors.state}>
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
                <Label error={errors.city}>Ciudad</Label>
                {contract.country === "-" || contract.country === "169" ? (
                  <FormControl variant="outlined">
                    <Select name="city" value={contract.city} onChange={onInputChange} error={errors.city}>
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
                  <TextField name="city" value={contract.city} onChange={onInputChange} error={errors.city} />
                )}
              </Column>
              <Column>
                <Label error={errors.user_id_bank}>Banco</Label>
                {contract.user_id_bank !== "-1" ? (
                  <FormControl variant="outlined">
                    <Select
                      name="user_id_bank"
                      value={contract.user_id_bank}
                      onChange={onInputChange}
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
                ) : (
                  <TextField
                    name="bank_name"
                    value={contract.bank_name}
                    onChange={onInputChange}
                    error={errors.user_id_bank}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => onInputChange({ target: { name: "user_id_bank", value: "-" } })}>
                            <ClearIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              </Column>
            </Row>

            <Row>
              <Column>
                <Label error={errors.user_bank_account_type}>Tipo de Cuenta</Label>
                <FormControl variant="outlined" sx={{ width: "100%" }}>
                  <Select
                    name="user_bank_account_type"
                    id="tipoDeCuentaBeneficiaria"
                    value={contract.user_bank_account_type}
                    onChange={onInputChange}
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
                  value={contract.user_bank_account_number}
                  onChange={onInputChange}
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
                  value={contract.beneficiary_fullname}
                  onChange={onInputChange}
                  sx={{ width: "100%" }}
                  error={errors.beneficiary_fullname}
                />
              </Column>
              <Column>
                <Label error={errors.beneficiary_id_number}>Número de Documento</Label>
                <TextField
                  name="beneficiary_id_number"
                  value={contract.beneficiary_id_number}
                  onChange={onInputChange}
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
                    value={contract.beneficiary_id_type}
                    onChange={onInputChange}
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
              <Column>
                <Label error={errors.beneficiary_id_location_expedition}>Lugar de Expedición del Documento</Label>
                <TextField
                  name="beneficiary_id_location_expedition"
                  value={contract.beneficiary_id_location_expedition}
                  sx={{ width: "100%" }}
                  error={errors.beneficiary_id_location_expedition}
                  onChange={onInputChange}
                />
              </Column>
            </Row>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setModal(null);
              onClearFields();
            }}
          >
            Cancel
          </Button>
          <LoadingButton variant="contained" onClick={onFormSubmit} disabled={isValidContract} loading={loadingSubmit}>
            Continuar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={modal === "contract-success"} onClose={() => setModal(null)}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <CheckIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Formulario completado exitosamente.
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={() => setModal(null)}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

export default ContractValidation;
