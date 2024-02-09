import { Grid, TextField } from "@mui/material";
import BeneficiaryIdTypeButton from "../Components/BeneficiaryIdTypeButton"

function IsChangeInformationUser({ isChangeInformationUser, handleInputChange }) {
  return (
    <>
      {isChangeInformationUser && (
        <Grid item xs={12} sm={12} marginTop="20px" display="flex" flexDirection={"column"} gap={"10px"} >
          <Grid item xs={12} sm={12}>
            <TextField name="fullname" label="Nombre completo" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}  >
            <TextField name="email" label="Correo electrónico" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}  >
            <TextField name="cellphone" type="number" label="Teléfono celular" fullWidth onChange={handleInputChange} required />
          </Grid>
          <BeneficiaryIdTypeButton handleInputChange={handleInputChange} />
          <Grid item xs={12} sm={12}  >
            <TextField name="idNumber" type="number" label="Número de identificación" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}  >
            <TextField
              name="idLocExpedition"
              label="Lugar de expedición de la identificación"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default IsChangeInformationUser;
