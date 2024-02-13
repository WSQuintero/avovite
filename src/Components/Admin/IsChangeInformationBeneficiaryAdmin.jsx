import { useEffect, useMemo, useState } from "react";
import { Grid, TextField, Typography, Button, Alert, Snackbar } from "@mui/material";
import BeneficiaryIdTypeButton from "../BeneficiaryIdTypeButton";
import CivilStatusBeneficiary from "../CivilStatusBeneficiary";
import ContractService from "../../Services/contract.service";
import useSession from "../../Hooks/useSession";
import { useNavigate } from "react-router-dom";

function IsChangeInformationBeneficiaryAdmin({ isChangeInformationBeneficiary, handleInputChange, informationContract }) {
  const session = useSession();
  const $Contract = useMemo(() => new ContractService(session[0].token), [session[0].token]);
  const navigate=useNavigate()
  const [alert, setAlert] = useState({ show: false, message: "", status: "success" });
  const [beneficiaryFullname, setBeneficiaryFullname] = useState("");
  const [beneficiaryIdNumber, setBeneficiaryIdNumber] = useState("");
  const [beneficiaryIdLocationExpedition, setBeneficiaryIdLocationExpedition] = useState("");
  const [cellphoneBeneficiary, setCellphoneBeneficiary] = useState("");
  const [codMunicipioBeneficiary, setCodMunicipioBeneficiary] = useState("");
  const [addressResidenceBeneficiary, setAddressResidenceBeneficiary] = useState("");
  const [emailBeneficiary, setEmailBeneficiary] = useState("");
  const [economyActivityBeneficiary, setEconomyActivityBeneficiary] = useState("");
  const [countryOfResidenceBeneficiary, setCountryOfResidenceBeneficiary] = useState("");
  const [selectedIdType, setSelectedIdType] = useState("");
  const [statusCivil, setStatusCivil] = useState("");
  const [beneficiaryNacionality, setBeneficiarynacionality] = useState("");
  const [residenceNeighborhoodBeneficiary, setResidenceNeighborhoodBeneficiary] = useState("");


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    if (isChangeInformationBeneficiary) {
      setBeneficiaryFullname(informationContract?.beneficiary_fullname || "");
      setBeneficiaryIdNumber(informationContract?.beneficiary_id_number || "");
      setBeneficiaryIdLocationExpedition(informationContract?.beneficiary_id_location_expedition || "");
      setCellphoneBeneficiary(informationContract?.cellphone_beneficiary || "");
      setCodMunicipioBeneficiary(informationContract?.cod_municipio_beneficiary || "");
      setAddressResidenceBeneficiary(informationContract?.address_residence_beneficiary || "");
      setEmailBeneficiary(informationContract?.email_beneficiary || "");
      setEconomyActivityBeneficiary(informationContract?.economy_activity_beneficiary || "");
      setCountryOfResidenceBeneficiary(informationContract?.country_of_residence_beneficiary || "");
      setSelectedIdType(capitalizeFirstLetter(informationContract?.id_type));
      setStatusCivil(informationContract?.civil_status_beneficiary);
      setBeneficiarynacionality(informationContract?.nationality);
      setResidenceNeighborhoodBeneficiary(informationContract?.residence_neighborhood);

    }
  }, [ informationContract]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      beneficiary_fullname: beneficiaryFullname,
      beneficiary_id_number: beneficiaryIdNumber,
      beneficiary_id_location_expedition: beneficiaryIdLocationExpedition,
      cellphone_beneficiary: cellphoneBeneficiary,
      cod_municipio_beneficiary: codMunicipioBeneficiary,
      address_residence_beneficiary: addressResidenceBeneficiary,
      email_beneficiary: emailBeneficiary,
      economy_activity_beneficiary: economyActivityBeneficiary,
      country_of_residence_beneficiary: countryOfResidenceBeneficiary,
      // id_type: selectedIdType,
      civil_status_beneficiary: statusCivil,
      nationality: beneficiaryNacionality || "",
      residence_neighborhood:residenceNeighborhoodBeneficiary,
      country_of_residence:countryOfResidenceBeneficiary
    };

    const emptyFields = Object.values(formData).some((field) => field === "");
    if (emptyFields) {
      setAlert({ show: true, message: "Todos los campos deben estar llenos", status: "error" });
    } else {
      const changeInformationBeneficiary = async () => {
        const { status, data } = await $Contract.change({ id: informationContract.id, body: formData });
        if (status) {
          setAlert({ show: true, message: "Datos de beneficiario actualizados correctamente", status: "success" });
        }
        // handleFormSubmit(formData);
      };
      changeInformationBeneficiary();
    }
  };

  const resetAlert = () => {
    setAlert((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };
  return (
    <>
      {isChangeInformationBeneficiary && (
        <>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Nombre completo del Beneficiario</Typography>
                <TextField
                  name="beneficiaryFullname"
                  fullWidth
                  onChange={(e) => setBeneficiaryFullname(e.target.value)}
                  value={beneficiaryFullname}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Tipo de identificación Beneficiario</Typography>
                <BeneficiaryIdTypeButton
                  handleInputChange={handleInputChange}
                  value={informationContract.beneficiary_id_type}
                  selectedIdType={selectedIdType}
                  setSelectedIdType={setSelectedIdType}
                  disabled={true}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Número de identificación del Beneficiario</Typography>
                <TextField
                  name="beneficiaryIdNumber"
                  type="number"
                  fullWidth
                  onChange={(e) => setBeneficiaryIdNumber(e.target.value)}
                  value={beneficiaryIdNumber}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Lugar de expedición del documento</Typography>
                <TextField
                  name="beneficiaryIdLocationExpedition"
                  fullWidth
                  onChange={(e) => setBeneficiaryIdLocationExpedition(e.target.value)}
                  value={beneficiaryIdLocationExpedition}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Nacionalidad</Typography>
                <TextField
                  name="beneficiaryNacionality"
                  fullWidth
                  onChange={(e) => setBeneficiarynacionality(e.target.value)}
                  value={beneficiaryNacionality}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Teléfono</Typography>
                <TextField
                  name="cellphoneBeneficiary"
                  fullWidth
                  onChange={(e) => setCellphoneBeneficiary(e.target.value)}
                  value={cellphoneBeneficiary}
                  required
                  type="tel"
                />
              </Grid>
              {/* Cod Municipio Beneficiary cambiar a selected con todos los códigos*/}
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Código Municipio Beneficiario</Typography>
                <TextField
                  name="codMunicipioBeneficiary"
                  fullWidth
                  onChange={(e) => setCodMunicipioBeneficiary(e.target.value)}
                  value={codMunicipioBeneficiary}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Dirección de residencia del beneficiario</Typography>
                <TextField
                  name="addressResidenceBeneficiary"
                  fullWidth
                  onChange={(e) => setAddressResidenceBeneficiary(e.target.value)}
                  value={addressResidenceBeneficiary}
                  required
                />
                <Grid item xs={12} sm={12}>
                  <Typography variant="subtitle1">Barrio de residencia del beneficiario</Typography>
                  <TextField
                    name="residenceNeighborhoodBeneficiary"
                    fullWidth
                    onChange={(e) => setResidenceNeighborhoodBeneficiary(e.target.value)}
                    value={residenceNeighborhoodBeneficiary}
                    required // Marcar como requerido
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Email del beneficiario</Typography>
                <TextField
                  name="emailBeneficiary"
                  fullWidth
                  onChange={(e) => setEmailBeneficiary(e.target.value)}
                  value={emailBeneficiary}
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Estado civil Beneficiario</Typography>
                <CivilStatusBeneficiary
                  handleInputChange={handleInputChange}
                  statusCivil={statusCivil}
                  setStatusCivil={setStatusCivil}
                  value={informationContract.civil_status_beneficiary}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">Actividad del beneficiario</Typography>
                <TextField
                  name="economyActivityBeneficiary"
                  fullWidth
                  onChange={(e) => setEconomyActivityBeneficiary(e.target.value)}
                  value={economyActivityBeneficiary}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography variant="subtitle1">País de residencia del beneficiario</Typography>
                <TextField
                  name="countryOfResidenceBeneficiary"
                  fullWidth
                  onChange={(e) => setCountryOfResidenceBeneficiary(e.target.value)}
                  value={countryOfResidenceBeneficiary}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <Button type="submit" variant="contained" color="primary">
                  Enviar
                </Button>
                <Button type="button" variant="contained" color="primary" sx={{marginLeft:"20px"}} onClick={()=>navigate("/admin/contracts")}>
                  Volver
                </Button>
              </Grid>
            </Grid>
          </form>
          <Snackbar open={alert.show} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} onClose={resetAlert}>
            <Alert severity={alert.status} sx={{ width: "100%" }}>
              {alert.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </>
  );
}

export default IsChangeInformationBeneficiaryAdmin;
