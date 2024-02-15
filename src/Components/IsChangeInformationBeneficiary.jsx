import { Grid, TextField, Typography } from "@mui/material";
import BeneficiaryIdTypeButton from "./BeneficiaryIdTypeButton";
import CivilStatusBeneficiary from "./CivilStatusBeneficiary";
import { useState } from "react";
import PhoneField from "react-phone-input-2";

function IsChangeInformationBeneficiary({ isChangeInformationBeneficiary, handleInputChange }) {
  const [selectedIdType, setSelectedIdType] = useState();
  const [statusCivil, setStatusCivil] = useState();
  const [selectedCell, setSelectedCell] = useState();

  return (
    <>
      {isChangeInformationBeneficiary && (
        <Grid item xs={12} sm={12} marginTop="20px">
          {/* Beneficiary Fullname */}
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Nombre completo del Beneficiario</Typography>
            <TextField name="beneficiaryFullname" fullWidth onChange={handleInputChange} required />
          </Grid>

          {/* Beneficiary ID Number */}
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Tipo de identificación Beneficiario</Typography>
            <BeneficiaryIdTypeButton
              handleInputChange={handleInputChange}
              selectedIdType={selectedIdType}
              setSelectedIdType={setSelectedIdType}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Número de identificación del Beneficiario</Typography>
            <TextField name="beneficiaryIdNumber" type="number" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Lugar de expedición del documento</Typography>
            <TextField name="beneficiaryIdLocationExpedition" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Teléfono</Typography>
            <PhoneField
              label="Teléfono celular"
              required
              fullWidth
              value={selectedCell}
              onChange={(value) => {
                setSelectedCell(value);
                handleInputChange({ target: { name: "cellphone", value } });
              }}
              name="cellphoneBeneficiary"
              enableSearch={true}
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
            />
          </Grid>
          {/* Cod Municipio Beneficiary cambiar a selected con todos los códigos*/}
          <Grid item spacing={2} fullWidth>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Código Municipio Beneficiario</Typography>
              <TextField name="codMunicipioBeneficiary" fullWidth onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Dirección de residencia del beneficiario</Typography>
              <TextField name="addressResidenceBeneficiary" fullWidth onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Email del beneficiario</Typography>
              <TextField name="emailBeneficiary" fullWidth onChange={handleInputChange} required type="email" />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Estado civil Beneficiario</Typography>
              <CivilStatusBeneficiary handleInputChange={handleInputChange} statusCivil={statusCivil} setStatusCivil={setStatusCivil} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">Actividad del beneficiario</Typography>
              <TextField name="economyActivityBeneficiary" fullWidth onChange={handleInputChange} required />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="subtitle1">País de residencia del beneficiario</Typography>
              <TextField name="countryOfResidenceBeneficiary" fullWidth onChange={handleInputChange} required />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default IsChangeInformationBeneficiary;
