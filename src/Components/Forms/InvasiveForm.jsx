import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
  Zoom,
  alpha,
} from "@mui/material";
import { DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { HighlightOff as ErrorIcon, CheckCircle as CheckIcon } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Clear as ClearIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useMemo } from "react";
import PhoneField from "react-phone-input-2";
import LogoImage from "../../assets/img/common/logo.svg";
import { CIVIL_STATUS, DOCUMENT_TYPES, EDUCATIONAL_LEVEL, HOW_DID_YOU_HEAR_ABOUT_US, OCCUPATION } from "../../utilities/constants";
import { validateJSON } from "../../utilities";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
import ContractService from "../../Services/contract.service";
import useSession from "../../Hooks/useSession";
import { useNavigate } from "react-router-dom";
import useLastContract from "../../Hooks/useLastContract";
import DocumentUploadModal from "./DocumentUploadModal ";
import useUser from "../../Hooks/useUser";
import ModalExistForm from "../ModalExistForm";
import ModalErrorSendForm from "../ModalErrorSendForm";

const initialState = {
  idContract: "",
  firstName: "",
  lastName: "",
  names: "",
  identificationNumber: "",
  issuePlaceAndDate: "",
  birthDate: "",
  birthCountryAndCity: "",
  nationality: "",
  maritalStatus: "",
  occupation: "",
  residenceAddressAndCity: "",
  email: "",
  cellPhone: "",
  hasPermanentResidencyInAnotherCountry: false,
  hasPermanentResidencyInAnotherCountryTexto: "",
  hasTaxObligationsInAnotherCountry: false,
  hasTaxObligationsInAnotherCountryTexto: "",
  usStayDetails: {
    dueToContract183Days: false,
    consecutive31DaysCurrentYear: false,
    previousYear121Days: false,
    secondYear60Days: false,
  },
  occupation2PersonalNatural: "",
  companyName: "",
  jobTitle: "",
  address: "",
  ciiuCode: "", //tener en cuenta que esto no lo llena el cliente
  economicActivityDescription: "",
  nit: "",
  businessName: "",
  mainOfficeAddress: "",
  branchOfficeAddress: "",
  citymainOfficeAddress: "",
  phonemainOfficeAddress: "",
  citybranchOfficeAddress: "",
  phonebranchOfficeAddress: "",
  companyType: "",
  companyTypeTexto: "",
  shareholdersIdentification: [
    {
      identificationText: "",
      identificationNumber: "",
      fullName: "",
      nationality: "",
      otherNationality: "",
      permanentResidenceInOtherCountry: false,
      permanentResidenceInOtherCountryTexto: "",
      usStayDetails: {
        dueToContract183Days: false,
        consecutive31DaysCurrentYear: false,
        previousYear121Days: false,
        secondYear60Days: false,
      },
    },
    //   percentageParticipation: "",
    // },
    // {
    //   identificationText: "",
    //   identificationNumber: "",
    //   fullName: "",
    //   nationality: "",
    //   otherNationality: "",
    //   permanentResidenceInOtherCountry: false,
    //   permanentResidenceInOtherCountryTexto: "",
    //   usStayDetails: {
    //     dueToContract183Days: false,
    //     consecutive31DaysCurrentYear: false,
    //     previousYear121Days: false,
    //     secondYear60Days: false,
    //   },
    //   percentageParticipation: "",
    // },
  ],
  politicallyExposedPerson: false,
  InternationalOrgLegalRep: false,
  AdministratorPEPStatus: false,
  AffirmativeResponseDetails: "",
  assets: "",
  liabilities: "",
  monthlyIncome: "",
  monthlyExpenses: "",
  equity: "",
  otherIncome: "",
  otherIncomeDetails: "",
  numberOfShareholders: 0, //esto no va
  bankAccounts: [
    {
      accountNumber: "",
      bankName: "",
      branchOffice: "",
      accountType: "",
    },
    // {
    //   accountNumber: "",
    //   bankName: "",
    //   branchOffice: "",
    //   accountType: "",
    // },
  ],
  numberOfInternationalOperations: 0, //no va
  conductsForeignCurrencyTransactions: false,
  usesFinancialProductsAbroad: false,
  conductsForeignCurrencyTransactionsType: {
    imports: false,
    exports: false,
  },
  internationalOperationsType: {
    transfers: false,
    other: "",
  },
  internationalOperationsTypeText: "",
  internationalOperationsDetails: [
    {
      identificationType: "",
      entity: "",
      countryCity: "",
      amountCurrency: "",
    },
  ],
  fullNameDeclarations: "",
  identificationTypeDeclarations: "",
  identificationNumberDeclarations: "",
  ResourceSourceDetails: "",
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

function InvasiveForm({ contractId }) {
  const [{ token }] = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const [actualContract, setActualContract] = useState(null);
  const lastContract = useLastContract();
  const navigate = useNavigate();
  const [frontDoc, setFrontDoc] = useState(null);
  const [backDoc, setBackDoc] = useState(null);
  const [bankCert, setBankCert] = useState(null);
  const [rut, setRut] = useState(null);
  const $User = useUser();
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  const onCloseError = () => {
    setOpenError(false);
  };
  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, checked, value } = event.target;

    if (name in formData.usStayDetails) {
      setFormData({
        ...formData,
        usStayDetails: {
          ...formData.usStayDetails,
          [name]: checked,
        },
      });
    } else if (
      name === "politicallyExposedPerson" ||
      name === "InternationalOrgLegalRep" ||
      name === "AdministratorPEPStatus" ||
      name === "conductsForeignCurrencyTransactions" ||
      name === "usesFinancialProductsAbroad" ||
      name === "hasPermanentResidencyInAnotherCountry" ||
      name === "hasTaxObligationsInAnotherCountry"
    ) {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "internationalOperationsType_transfers" || name === "internationalOperationsType_other") {
      setFormData({
        ...formData,
        internationalOperationsType: {
          ...formData.internationalOperationsType,
          [name.split("_")[1]]: checked,
        },
      });
    } else if (name === "identificationTypeDeclarations") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (name === "conductsForeignCurrencyTransactionsType_imports" || name === "conductsForeignCurrencyTransactionsType_exports") {
      setFormData({
        ...formData,
        conductsForeignCurrencyTransactionsType: {
          ...formData.conductsForeignCurrencyTransactionsType,
          [name.split("_")[1]]: checked,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const Label = ({ error = false, children }) => <Typography color={error ? "error" : "primary"}>{children}</Typography>;

  const handleBankAccountChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData };

    if (name.startsWith(`bankAccount_${index}`)) {
      const fieldName = name.split("_")[2];
      updatedFormData.bankAccounts[index][fieldName] = value;
    }

    setFormData(updatedFormData);
  };

  const handleInputChangeAccionist = (event, index) => {
    const { name, value, checked } = event.target;
    const updatedFormData = { ...formData };

    if (name === `shareholder_permanentResidenceInOtherCountry_${index}`) {
      updatedFormData.shareholdersIdentification[index].permanentResidenceInOtherCountry = checked;
    } else if (
      name.startsWith(`shareholder_dueToContract183Days_`) ||
      name.startsWith(`shareholder_consecutive31DaysCurrentYear_`) ||
      name.startsWith(`shareholder_previousYear121Days_`) ||
      name.startsWith(`shareholder_secondYear60Days_`)
    ) {
      const detailName = name.split(`_`)[1];
      updatedFormData.shareholdersIdentification[index].usStayDetails[detailName] = checked;
    } else if (name.startsWith(`shareholder_`)) {
      const fieldName = name.split(`_`)[1];
      updatedFormData.shareholdersIdentification[index][fieldName] = value;
    } else if (name === "identificationTypeDeclarations") {
      // Manejar el campo identificationTypeDeclarations
      updatedFormData.shareholdersIdentification[index].identificationText = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };
  const handleInternationalOperationsChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFormData = { ...formData };

    if (name === `internationalOperationsDetails_${index}_identificationType`) {
      updatedFormData.internationalOperationsDetails[index].identificationType = value;
    } else if (name === `internationalOperationsDetails_${index}_entity`) {
      updatedFormData.internationalOperationsDetails[index].entity = value;
    } else if (name === `internationalOperationsDetails_${index}_countryCity`) {
      updatedFormData.internationalOperationsDetails[index].countryCity = value;
    } else if (name === `internationalOperationsDetails_${index}_amountCurrency`) {
      updatedFormData.internationalOperationsDetails[index].amountCurrency = value;
    }

    setFormData(updatedFormData);
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };
  const handleSubmit = async () => {
    setLoading(true);
    setOpen(false);
    setOpenError(false);

    const formDataToSend = new FormData();
    const { numberOfShareholders, numberOfInternationalOperations, numberOfBankAccounts, ...restFormData } = formData;

    Object.entries(restFormData).forEach(([key, value]) => {
      if (
        [
          "usStayDetails",
          "shareholdersIdentification",
          "bankAccounts",
          "conductsForeignCurrencyTransactionsType",
          "internationalOperationsType",
          "internationalOperationsDetails",
        ].includes(key)
      ) {
        formDataToSend.append(key, JSON.stringify(value)); // Serializar como JSON
      } else {
        formDataToSend.append(key, value); // Agregar como está
      }
    });
    // formDataToSend.append("files", frontDoc);
    // formDataToSend.append("files", backDoc);
    // formDataToSend.append("files", bankCert);
    // formDataToSend.append("files", rut);

    const files = [frontDoc, backDoc, bankCert, rut];
    files.forEach((file, index) => {
      formDataToSend.append(`files`, file);
    });
    try {
      const { data, status } = await $Contract.sendInvasiveForm(formDataToSend);

      if (status) {
        setFeedback({ open: true, message: "Formulario completado exitosamente, por favor verifica tu correo.", status: "success" });
      } else {
        if (data?.response?.data.success === "you already have an associated contract") {
          setOpen(true);
          setLoading(false);
          navigate("/validation/confirmation");
          return;
        }
        if (data?.name === "AxiosError") {
          setFeedback({
            open: true,
            message: "Ha ocurrido un error inesperado. Por favor revisa que hayas cargado los documentos",
            status: "error",
          });
          setLoading(false);
          setOpenError(true);
          return;
        }
      }

      setLoading(false);

      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      setLoading(false);

      console.error("Error:", error);
      setFeedback({
        open: true,
        message: "Ha ocurrido un error inesperado. Por favor revisa que hayas cargado los documentos.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchContracts();
      })();
    }
    setFormData({
      ...formData,
      idContract: contractId,
    });
  }, [token]);

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get();

    if (status) {
      setActualContract(data.data[data.data.length - 1]);
    }
  };

  useEffect(() => {
    if (feedback.open && feedback.status !== "error") {
      setTimeout(() => {
        resetFeedback();
        window.location.reload();
      }, 3000);
    }
  }, [feedback.open]);

  useEffect(() => {
    if (lastContract) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        firstName: prevFormData.firstName || lastContract?.fullname?.split(" ")[0] || "",
        lastName: prevFormData.lastName || lastContract?.fullname?.split(" ")[1] || "",
        identificationTypeDeclarations: prevFormData?.identificationTypeDeclarations || lastContract?.id_type || "",
        identificationNumber: prevFormData?.identificationNumber || lastContract?.id_number || "",
        maritalStatus: lastContract?.civil_status || "",
        occupation2PersonalNatural: lastContract?.economy_activity || "",
        residenceAddressAndCity: lastContract?.country_of_residence || "",
        cellPhone: lastContract?.cellphone || "",
        email: lastContract?.email || "",
      }));
    }
  }, [lastContract]);

  return (
    <Container maxWidth="xxl" sx={{ marginY: 4, padding: 4, border: 1, borderRadius: 2, borderColor: "primary.main" }}>
      <Stack>
        <Grid display="flex" justifyContent="center">
          <Grid display="flex" flexDirection="column" alignItems="center">
            <img src={LogoImage} width={160} height={160} alt="photo" />
            <Typography variant="h2" fontSize={24}></Typography>
            <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
              Formulario de vinculación
            </Typography>
          </Grid>
        </Grid>
        <Box />
        <Grid display="flex" flexDirection="column" gap={3}>
          {/* Datos personales */}
          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Información persona natural
          </Typography>
          <Row>
            <Column>
              <Label>Nombre</Label>
              <TextField required fullWidth name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Apellidos</Label>
              <TextField required fullWidth name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Nombres completos</Label>
              <TextField required fullWidth name="names" value={`${formData?.firstName} ${formData?.lastName}`} disabled />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Tipo de Documento</Label>
              <FormControl variant="outlined" fullWidth>
                <Select
                  name="identificationTypeDeclarations"
                  id="tipoDocumento"
                  value={formData.identificationTypeDeclarations}
                  onChange={handleInputChange}
                >
                  <MenuItem value="" disabled>
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

          <Row>
            <Column>
              <Label>Número de Identificación</Label>
              <TextField
                required
                fullWidth
                name="identificationNumber"
                value={formData.identificationNumber}
                onChange={handleInputChange}
              />
            </Column>
            <Column>
              <Label>Lugar y Fecha de Expedición</Label>
              <TextField required fullWidth name="issuePlaceAndDate" value={formData.issuePlaceAndDate} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>País y ciudad de nacimiento</Label>
              <TextField required fullWidth name="birthCountryAndCity" value={formData.birthCountryAndCity} onChange={handleInputChange} />
            </Column>

            <Column>
              <Label>Fecha de nacimiento</Label>
              <DatePicker
                // slotProps={{ textField: { error: errors.birthdate } }}
                value={dayjs(formData.birthDate)}
                format="DD MMMM YYYY"
                onChange={(value) => handleInputChange({ target: { name: "birthDate", value: value.toDate() } })}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Nacionalidad</Label>
              <TextField required fullWidth name="nationality" value={formData.nationality} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Estado Civil</Label>
              <TextField required fullWidth name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Ocupación</Label>
              <TextField
                required
                fullWidth
                name="occupation2PersonalNatural"
                value={formData.occupation2PersonalNatural}
                onChange={handleInputChange}
              />
            </Column>
            <Column>
              <Label>Nombre de la Empresa</Label>
              <TextField required fullWidth name="companyName" value={formData.companyName} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Dirección de Residencia y Ciudad</Label>
              <TextField
                required
                fullWidth
                name="residenceAddressAndCity"
                value={formData.residenceAddressAndCity}
                onChange={handleInputChange}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Número de Teléfono</Label>
              <TextField required fullWidth name="cellPhone" value={formData.cellPhone} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Correo Electrónico</Label>
              <TextField required fullWidth name="email" value={formData.email} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>¿Tiene Residencia Permanente en Otro País? no o si</Label>
              <Switch
                name="hasPermanentResidencyInAnotherCountry"
                checked={Boolean(formData.hasPermanentResidencyInAnotherCountry)}
                onChange={handleInputChange}
              />
            </Column>
            {Boolean(formData.hasPermanentResidencyInAnotherCountry) && (
              <Column>
                <Label>País de Residencia Permanente</Label>
                <TextField
                  fullWidth
                  name="hasPermanentResidencyInAnotherCountryTexto"
                  value={formData.hasPermanentResidencyInAnotherCountryTexto}
                  onChange={handleInputChange}
                />
              </Column>
            )}
          </Row>
          <Row>
            <Column>
              <Label>¿Tiene Obligaciones Fiscales en Otro País? no o si</Label>
              <Switch
                name="hasTaxObligationsInAnotherCountry"
                checked={Boolean(formData.hasTaxObligationsInAnotherCountry)}
                onChange={handleInputChange}
              />
            </Column>
            {Boolean(formData.hasTaxObligationsInAnotherCountry) && (
              <Column>
                <Label>¿Cuál?</Label>
                <TextField
                  fullWidth
                  name="hasTaxObligationsInAnotherCountryTexto"
                  value={formData.hasTaxObligationsInAnotherCountryTexto}
                  onChange={handleInputChange}
                />
              </Column>
            )}
          </Row>

          <Row>
            <Column>
              <Label>Detalle de Residencia en EE. UU.</Label>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="dueToContract183Days"
                        onChange={handleInputChange}
                        checked={formData.usStayDetails.dueToContract183Days || false}
                      />
                    }
                    label="Debido a contrato (183 días)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="consecutive31DaysCurrentYear"
                        onChange={handleInputChange}
                        checked={formData.usStayDetails.consecutive31DaysCurrentYear || false}
                      />
                    }
                    label="31 días consecutivos en el año actual"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="previousYear121Days"
                        onChange={handleInputChange}
                        checked={formData.usStayDetails.previousYear121Days || false}
                      />
                    }
                    label="Año anterior: 121 días"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="secondYear60Days"
                        onChange={handleInputChange}
                        checked={formData.usStayDetails.secondYear60Days || false}
                      />
                    }
                    label="Segundo año inmediatamente anterior: 60 días"
                  />
                </FormGroup>
              </FormControl>
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>¿Persona Expuesta Políticamente? no o si</Label>
              <Switch name="politicallyExposedPerson" checked={Boolean(formData.politicallyExposedPerson)} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>¿Representante Legal de Organización Internacional? no o si</Label>
              <Switch name="InternationalOrgLegalRep" checked={Boolean(formData.InternationalOrgLegalRep)} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>¿Estatus de Administrador PEP? no o si</Label>
              <Switch name="AdministratorPEPStatus" checked={Boolean(formData.AdministratorPEPStatus)} onChange={handleInputChange} />
            </Column>
          </Row>

          {/* Actividad económica */}
          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Actividad económica
          </Typography>

          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Persona natural
          </Typography>
          <Row>
            <Column>
              <Label>Cargo</Label>
              <TextField required fullWidth name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Dirección</Label>
              <TextField required fullWidth name="address" value={formData.address} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Nombre de la empresa donde trabaja</Label>
              <TextField required fullWidth name="businessName" value={formData.businessName} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Descripción de Actividad Económica</Label>
              <TextField
                required
                fullWidth
                name="economicActivityDescription"
                value={formData.economicActivityDescription}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Persona jurídica (solo si aplica)
          </Typography>

          <Row>
            <Column>
              <Label>Razón social</Label>
              <TextField required fullWidth name="businessName" value={formData.businessName} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>NIT</Label>
              <TextField required fullWidth name="nit" value={formData.nit} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Descripción de Actividad Económica</Label>
              <TextField
                required
                fullWidth
                name="economicActivityDescription"
                value={formData.economicActivityDescription}
                onChange={handleInputChange}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Dirección de la Oficina Principal</Label>
              <TextField required fullWidth name="mainOfficeAddress" value={formData.mainOfficeAddress} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Ciudad de la Oficina Principal</Label>
              <TextField
                required
                fullWidth
                name="citymainOfficeAddress"
                value={formData.citymainOfficeAddress}
                onChange={handleInputChange}
              />
            </Column>
            <Column>
              <Label>Teléfono de la Oficina Principal</Label>
              <TextField
                required
                fullWidth
                name="phonemainOfficeAddress"
                value={formData.phonemainOfficeAddress}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Dirección de la Sucursal</Label>
              <TextField required fullWidth name="branchOfficeAddress" value={formData.branchOfficeAddress} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Ciudad de la Sucursal</Label>
              <TextField
                required
                fullWidth
                name="citybranchOfficeAddress"
                value={formData.citybranchOfficeAddress}
                onChange={handleInputChange}
              />
            </Column>
            <Column>
              <Label>Teléfono de la Sucursal</Label>
              <TextField
                required
                fullWidth
                name="phonebranchOfficeAddress"
                value={formData.phonebranchOfficeAddress}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Tipo de Empresa</Label>
              <Select required fullWidth name="companyType" value={formData.companyType} onChange={handleInputChange}>
                <MenuItem value="pública">Pública</MenuItem>
                <MenuItem value="privada">Privada</MenuItem>
                <MenuItem value="mixta">Mixta</MenuItem>
              </Select>
            </Column>
          </Row>

          {/* Información de accionistas */}
          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Información de accionistas
          </Typography>
          <Row>
            <Column>
              <Label>Número de Accionistas</Label>
              <TextField
                type="number"
                fullWidth
                name="numberOfShareholders"
                value={formData.numberOfShareholders}
                onChange={handleInputChange}
                inputProps={{
                  min: 0,
                  max: 10,
                }}
              />
            </Column>
          </Row>

          {Array.from({ length: formData.numberOfShareholders }, (_, index) => (
            <div key={index}>
              <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
                Accionista {index + 1}
              </Typography>
              <Row>
                <Column>
                  <Label>Tipo de Documento</Label>
                  <FormControl variant="outlined" fullWidth>
                    <Select
                      name="identificationTypeDeclarations"
                      id="tipoDocumento"
                      value={formData?.shareholdersIdentification[index]?.identificationText}
                      onChange={(e) => handleInputChangeAccionist(e, index)}
                    >
                      <MenuItem value="" disabled>
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
              <Row>
                <Column>
                  <Label>Número de Identificación</Label>
                  <TextField
                    fullWidth
                    name={`shareholder_identificationNumber_${index}`}
                    onChange={(e) => handleInputChangeAccionist(e, index)}
                    value={formData.shareholdersIdentification[index]?.identificationNumber}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>Nombre Completo</Label>
                  <TextField
                    fullWidth
                    name={`shareholder_fullName_${index}`}
                    onChange={(e) => handleInputChangeAccionist(e, index)}
                    value={formData.shareholdersIdentification[index]?.fullName}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>Nacionalidad</Label>
                  <TextField
                    fullWidth
                    name={`shareholder_nationality_${index}`}
                    onChange={(e) => handleInputChangeAccionist(e, index)}
                    value={formData.shareholdersIdentification[index]?.nationality}
                  />
                </Column>
                <Column>
                  <Label>Otra Nacionalidad</Label>
                  <TextField
                    fullWidth
                    name={`shareholder_otherNationality_${index}`}
                    onChange={(e) => handleInputChangeAccionist(e, index)}
                    value={formData.shareholdersIdentification[index]?.otherNationality}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>¿Residencia Permanente en Otro País? no o si</Label>
                  <Switch
                    name={`shareholder_permanentResidenceInOtherCountry_${index}`}
                    onChange={(e) => handleInputChangeAccionist(e, index)}
                    checked={formData.shareholdersIdentification[index]?.permanentResidenceInOtherCountry}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>Detalle de Residencia en EE. UU.</Label>
                  <FormControl component="fieldset">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`shareholder_dueToContract183Days_${index}`}
                            onChange={(e) => handleInputChangeAccionist(e, index)}
                            checked={formData.shareholdersIdentification[index]?.usStayDetails.dueToContract183Days}
                          />
                        }
                        label="Debido a contrato (183 days)"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`shareholder_consecutive31DaysCurrentYear_${index}`}
                            onChange={(e) => handleInputChangeAccionist(e, index)}
                            checked={formData.shareholdersIdentification[index]?.usStayDetails.consecutive31DaysCurrentYear}
                          />
                        }
                        label="31 días consecutivos en el año actual"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`shareholder_previousYear121Days_${index}`}
                            onChange={(e) => handleInputChangeAccionist(e, index)}
                            checked={formData.shareholdersIdentification[index]?.usStayDetails.previousYear121Days}
                          />
                        }
                        label="Año anterior: 121 días"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`shareholder_secondYear60Days_${index}`}
                            onChange={(e) => handleInputChangeAccionist(e, index)}
                            checked={formData.shareholdersIdentification[index]?.usStayDetails.secondYear60Days}
                          />
                        }
                        label="Segundo año inmediatamente anterior: 60 días"
                      />
                    </FormGroup>
                  </FormControl>
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>Porcentaje de Participación</Label>
                  <TextField
                    fullWidth
                    name={`shareholder_percentageParticipation_${index}`}
                    onChange={(e) => handleInputChangeAccionist(e, index)}
                    value={formData.shareholdersIdentification[index]?.percentageParticipation}
                  />
                </Column>
              </Row>
            </div>
          ))}

          {/* Información Bancaria */}
          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Información Financiera
          </Typography>
          <Row>
            <Column>
              <Label>Activos</Label>
              <TextField fullWidth name="assets" value={formData.assets} onChange={handleInputChange} inputProps={{ pattern: "[0-9]*" }} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Deudas</Label>
              <TextField
                fullWidth
                name="liabilities"
                value={formData.liabilities}
                onChange={handleInputChange}
                inputProps={{ pattern: "[0-9]*" }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Ingreso Mensual</Label>
              <TextField
                fullWidth
                name="monthlyIncome"
                value={formData.monthlyIncome}
                onChange={handleInputChange}
                inputProps={{ pattern: "[0-9]*" }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Gastos Mensuales</Label>
              <TextField
                fullWidth
                name="monthlyExpenses"
                value={formData.monthlyExpenses}
                onChange={handleInputChange}
                inputProps={{ pattern: "[0-9]*" }}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Capital</Label>
              <TextField fullWidth name="equity" value={formData.equity} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Otros Ingresos</Label>
              <TextField fullWidth name="otherIncome" value={formData.otherIncome} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Detalles de Otros Ingresos</Label>
              <TextField fullWidth name="otherIncomeDetails" value={formData.otherIncomeDetails} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Cantidad de Cuentas Bancarias</Label>
              <TextField
                type="number"
                fullWidth
                name="numberOfBankAccounts"
                value={formData.numberOfBankAccounts}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Typography fontSize={24} textAlign="center" fontWeight={600} color="primary" paddingY={1} marginX={-3}>
            Actividad en operaciones internacionales
          </Typography>
          <Row>
            <Column>
              <Label>¿Realiza Transacciones en Moneda Extranjera?</Label>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="conductsForeignCurrencyTransactionsType_imports"
                        onChange={handleInputChange}
                        checked={formData.conductsForeignCurrencyTransactionsType.imports}
                      />
                    }
                    label="Importaciones"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="conductsForeignCurrencyTransactionsType_exports"
                        onChange={handleInputChange}
                        checked={formData.conductsForeignCurrencyTransactionsType.exports}
                      />
                    }
                    label="Exportaciones"
                  />
                </FormGroup>
              </FormControl>
            </Column>
          </Row>
          {Array.from({ length: formData.numberOfBankAccounts }, (_, index) => (
            <div key={index}>
              <Typography fontSize={20} fontWeight={600} color="primary" paddingY={1}>
                Cuenta Bancaria {index + 1}
              </Typography>
              <Row>
                <Column>
                  <Label>Número de Cuenta</Label>
                  <TextField fullWidth name={`bankAccount_${index}_accountNumber`} onChange={(e) => handleBankAccountChange(e, index)} />
                </Column>
                <Column>
                  <Label>Nombre del Banco</Label>
                  <TextField fullWidth name={`bankAccount_${index}_bankName`} onChange={(e) => handleBankAccountChange(e, index)} />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>Sucursal</Label>
                  <TextField fullWidth name={`bankAccount_${index}_branchOffice`} onChange={(e) => handleBankAccountChange(e, index)} />
                </Column>
                <Column>
                  <Label>Tipo de Cuenta</Label>
                  <TextField fullWidth name={`bankAccount_${index}_accountType`} onChange={(e) => handleBankAccountChange(e, index)} />
                </Column>
              </Row>
            </div>
          ))}

          <Row>
            <Column>
              <Label>¿Realiza Transacciones en Moneda Extranjera? no o si</Label>
              <Switch
                name="conductsForeignCurrencyTransactions"
                onChange={handleInputChange}
                checked={Boolean(formData.conductsForeignCurrencyTransactions)}
              />
            </Column>
            <Column>
              <Label>¿Usa Productos Financieros en el Extranjero? no o si</Label>
              <Switch
                name="usesFinancialProductsAbroad"
                onChange={handleInputChange}
                checked={Boolean(formData.usesFinancialProductsAbroad)}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Cantidad de Transferencias Internacionales</Label>
              <TextField
                type="number"
                name="numberOfInternationalOperations"
                value={formData.numberOfInternationalOperations}
                onChange={handleInputChange}
              />
            </Column>
          </Row>

          {Array.from({ length: formData.numberOfInternationalOperations }, (_, index) => (
            <div key={index}>
              <Typography fontSize={20} fontWeight={600} color="primary" paddingY={1}>
                Detalles de la Transferencia Internacional {index + 1}
              </Typography>
              <Row>
                <Column>
                  <Label>Tipo de Identificación</Label>
                  <TextField
                    fullWidth
                    name={`internationalOperationsDetails_${index}_identificationType`}
                    value={formData.internationalOperationsDetails[index]?.identificationType || ""}
                    onChange={(e) => handleInternationalOperationsChange(e, index)}
                  />
                </Column>
                <Column>
                  <Label>Entidad</Label>
                  <TextField
                    fullWidth
                    name={`internationalOperationsDetails_${index}_entity`}
                    value={formData.internationalOperationsDetails[index]?.entity || ""}
                    onChange={(e) => handleInternationalOperationsChange(e, index)}
                  />
                </Column>
              </Row>
              <Row>
                <Column>
                  <Label>País/Ciudad</Label>
                  <TextField
                    fullWidth
                    name={`internationalOperationsDetails_${index}_countryCity`}
                    value={formData.internationalOperationsDetails[index]?.countryCity || ""}
                    onChange={(e) => handleInternationalOperationsChange(e, index)}
                  />
                </Column>
                <Column>
                  <Label>Monto/Currency</Label>
                  <TextField
                    fullWidth
                    name={`internationalOperationsDetails_${index}_amountCurrency`}
                    value={formData.internationalOperationsDetails[index]?.amountCurrency || ""}
                    onChange={(e) => handleInternationalOperationsChange(e, index)}
                  />
                </Column>
              </Row>
            </div>
          ))}

          <Row>
            <Column>
              <Label>Tipo de Operaciones Internacionales</Label>
              <FormControlLabel
                control={
                  <Checkbox
                    name="internationalOperationsType_transfers"
                    onChange={handleInputChange}
                    checked={Boolean(formData.internationalOperationsType.transfers)}
                  />
                }
                label="Transferencias"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="internationalOperationsType_other"
                    onChange={handleInputChange}
                    checked={Boolean(formData.internationalOperationsType.other)}
                  />
                }
                label="Otro (Especificar)"
              />
              {formData.internationalOperationsType.other && (
                <TextField
                  fullWidth
                  name="internationalOperationsTypeText"
                  value={formData.internationalOperationsTypeText}
                  onChange={handleInputChange}
                />
              )}
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Nombre Completo Declaraciones</Label>
              <TextField fullWidth name="fullNameDeclarations" value={formData.fullNameDeclarations} onChange={handleInputChange} />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Tipo de Identificación para Declaraciones</Label>
              <TextField
                fullWidth
                name="identificationTypeDeclarations"
                value={formData.identificationTypeDeclarations}
                onChange={handleInputChange}
              />
            </Column>
            <Column>
              <Label>Número de Identificación para Declaraciones</Label>
              <TextField
                fullWidth
                name="identificationNumberDeclarations"
                value={formData.identificationNumberDeclarations}
                onChange={handleInputChange}
              />
            </Column>
          </Row>

          <Row>
            <Column>
              <Label>Detalles de la Fuente de Recursos</Label>
              <TextField fullWidth name="ResourceSourceDetails" value={formData.ResourceSourceDetails} onChange={handleInputChange} />
            </Column>
          </Row>
          <DocumentUploadModal
            frontDoc={frontDoc}
            setFrontDoc={setFrontDoc}
            backDoc={backDoc}
            setBackDoc={setBackDoc}
            bankCert={bankCert}
            setBankCert={setBankCert}
            rut={rut}
            setRut={setRut}
          />

          <LoadingButton fullWidth type="submit" size="large" variant="contained" onClick={handleSubmit} loading={loading}>
            Enviar
          </LoadingButton>
        </Grid>
      </Stack>

      <Dialog open={feedback.open && feedback.status === "success"} onClose={resetFeedback}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <CheckIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Formulario completado exitosamente.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={18} textAlign="center">
            Por favor, diríjase a su correo para la respectiva firma.{" "}
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => navigate("/")} fullWidth>
            No
          </Button>
          <Button variant="contained" onClick={resetFeedback} fullWidth>
            Si
          </Button>
        </DialogActions> */}
      </Dialog>
      <ModalExistForm open={open} onClose={onClose} />
      <ModalErrorSendForm open={openError} onClose={onCloseError} />
    </Container>
  );
}

export default InvasiveForm;
