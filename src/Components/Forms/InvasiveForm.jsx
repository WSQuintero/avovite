import { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
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
  TextField,
  Typography,
  Zoom,
  alpha,
} from "@mui/material";
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
// import DialogKYC from "./Dialogs/KYC";

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
  ciiuCode: "",
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
      percentageParticipation: "",
    },
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
      percentageParticipation: "",
    },
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
  bankAccounts: [
    {
      accountNumber: "",
      bankName: "",
      branchOffice: "",
      accountType: "",
    },
    {
      accountNumber: "",
      bankName: "",
      branchOffice: "",
      accountType: "",
    },
  ],
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

function InvasiveForm() {
  const [formData, setFormData] = useState(initialState);

  const handleUsStayDetailsChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      usStayDetails: {
        ...prevState.usStayDetails,
        [event.target.name]: event.target.checked,
      },
    }));
  };

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Actualiza el estado con el nuevo valor del campo que cambió
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const Label = ({ error = false, children }) => <Typography color={error ? "error" : "primary"}>{children}</Typography>;

  return (
    <Container maxWidth="xxl" sx={{ marginY: 4, padding: 4, border: 1, borderRadius: 2, borderColor: "primary.main" }}>
      <Stack>
        <Grid display="flex" justifyContent="center">
          <Grid display="flex" flexDirection="column" alignItems="center">
            <img src={LogoImage} width={160} height={160} alt="photo" />
            <Typography variant="h2" fontSize={24}></Typography>
          </Grid>
        </Grid>
        <Box />
        <Grid display="flex" flexDirection="column" gap={3}>
          <Typography
            fontSize={24}
            textAlign="center"
            fontWeight={600}
            color="primary"
            paddingY={1}
            marginX={-3}
            // sx={(t) => ({ backgroundColor: alpha(t.palette.primary.main, 0.1) })}
          >
            Información pesona natural
          </Typography>
          <Row>
            <Column>
              <Label>Primer Nombre</Label>
              <TextField required fullWidth name="firstName" value={formData.firstName} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Apellido</Label>
              <TextField required fullWidth name="lastName" value={formData.lastName} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Nombres completos</Label>
              <TextField required fullWidth name="names" value={formData.names} onChange={handleInputChange} />
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
          {/* <Column>
            <label>Tipo de Documento</label>
            <FormControl variant="outlined" fullWidth>
              <Select name="id_type" value={formData.id_type} onChange={handleInputChange}>
                <MenuItem value="-" disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.keys(DOCUMENT_TYPES).map((key) => (
                  <MenuItem key={key} value={key}>
                    {DOCUMENT_TYPES[key]}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Column> */}
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
              <Label>Cargo</Label>
              <TextField required fullWidth name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Dirección</Label>
              <TextField required fullWidth name="address" value={formData.address} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            {/* <Column>
              <Label>Código CIIU</Label>
              <TextField required fullWidth name="ciiuCode" value={formData.ciiuCode} onChange={handleInputChange} />
            </Column> */}
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
              <Label>NIT</Label>
              <TextField required fullWidth name="nit" value={formData.nit} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Nombre Comercial</Label>
              <TextField required fullWidth name="businessName" value={formData.businessName} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Dirección de la Oficina Principal</Label>
              <TextField required fullWidth name="mainOfficeAddress" value={formData.mainOfficeAddress} onChange={handleInputChange} />
            </Column>
            <Column>
              <Label>Dirección de la Sucursal</Label>
              <TextField required fullWidth name="branchOfficeAddress" value={formData.branchOfficeAddress} onChange={handleInputChange} />
            </Column>
          </Row>
          <Row>
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
              <TextField required fullWidth name="companyType" value={formData.companyType} onChange={handleInputChange} />
            </Column>
            {/* <Column>
              <Label>Texto Tipo de Empresa</Label>
              <TextField required fullWidth name="companyTypeTexto" value={formData.companyTypeTexto} onChange={handleInputChange} />
            </Column> */}
          </Row>
          <Row>
            <Column>
              <Label>Tipo de Identificación</Label>
              <TextField
                fullWidth
                name="shareholder_identificationText"
                value={formData.shareholdersIdentification[0]?.identificationText}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Número de Identificación</Label>
              <TextField
                fullWidth
                name="shareholder_identificationNumber"
                value={formData.shareholdersIdentification[0]?.identificationNumber}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Nombre Completo</Label>
              <TextField
                fullWidth
                name="shareholder_fullName"
                value={formData.shareholdersIdentification[0]?.fullName}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Nacionalidad</Label>
              <TextField
                fullWidth
                name="shareholder_nationality"
                value={formData.shareholdersIdentification[0]?.nationality}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Otra Nacionalidad</Label>
              <TextField
                fullWidth
                name="shareholder_otherNationality"
                value={formData.shareholdersIdentification[0]?.otherNationality}
                onChange={handleInputChange}
              />
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Residencia Permanente en Otro País</Label>
              <Stack direction="row" spacing={1}>
                <RadioGroup
                  row
                  name="shareholder_permanentResidenceInOtherCountry"
                  value={formData.shareholdersIdentification[0]?.permanentResidenceInOtherCountry.toString()}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                  <FormControlLabel value="true" control={<Radio />} label="Sí" />
                </RadioGroup>
                <Zoom in={formData.shareholdersIdentification[0]?.permanentResidenceInOtherCountry}>
                  <TextField
                    size="small"
                    type="text"
                    placeholder="Detalle"
                    name="shareholder_permanentResidenceInOtherCountryTexto"
                    value={formData.shareholdersIdentification[0]?.permanentResidenceInOtherCountryTexto}
                    onChange={handleInputChange}
                  />
                </Zoom>
              </Stack>
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Detalles de Estancia</Label>
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.usStayDetails.dueToContract183Days}
                        onChange={handleUsStayDetailsChange}
                        name="dueToContract183Days"
                      />
                    }
                    label="Debido a un contrato de al menos 183 días"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.usStayDetails.consecutive31DaysCurrentYear}
                        onChange={handleUsStayDetailsChange}
                        name="consecutive31DaysCurrentYear"
                      />
                    }
                    label="Por tener 31 días consecutivos en el año actual"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.usStayDetails.previousYear121Days}
                        onChange={handleUsStayDetailsChange}
                        name="previousYear121Days"
                      />
                    }
                    label="Por tener 121 días en el año anterior"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.usStayDetails.secondYear60Days}
                        onChange={handleUsStayDetailsChange}
                        name="secondYear60Days"
                      />
                    }
                    label="Por tener 60 días en el segundo año"
                  />
                </FormGroup>
              </FormControl>
            </Column>
          </Row>
          <Row>
            <Column>
              <Label>Participación Porcentual</Label>
              <TextField
                fullWidth
                name="shareholder_percentageParticipation"
                value={formData.shareholdersIdentification[0]?.percentageParticipation}
                onChange={handleInputChange}
              />
            </Column>
          </Row>

          <LoadingButton fullWidth type="submit" size="large" variant="contained">
            Enviar
          </LoadingButton>
        </Grid>

        {/* <DialogKYC open={modal.kyc} onClose={() => setModal({ ...modal, kyc: false })} onSubmit={handleSubmitKYC} /> */}
      </Stack>
    </Container>
  );
}

export default InvasiveForm;
