import { Grid, TextField, Typography } from "@mui/material"

function IsChangeInformationBeneficiary({isChangeInformationBeneficiary,handleInputChange}) {
  return (
    <>{isChangeInformationBeneficiary && (
      <Grid item xs={12} sm={12} marginTop="20px">
        {/* Cod Municipio Beneficiary */}
        <Grid item spacing={2} fullWidth>
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Código Municipio Beneficiario</Typography>
            <TextField
              name="cod_municipio_beneficiary"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Beneficiary Fullname */}
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Nombre completo del Beneficiario</Typography>
            <TextField
              name="beneficiary_fullname"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Beneficiary ID Number */}
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Número de identificación del Beneficiario</Typography>
            <TextField
              name="beneficiary_id_number"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Beneficiary ID Type */}
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle1">Tipo de identificación del Beneficiario</Typography>
            <TextField
              name="beneficiary_id_type"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Otros campos similares... */}
        </Grid>
      </Grid>
    )}</>
  )
}

export default IsChangeInformationBeneficiary