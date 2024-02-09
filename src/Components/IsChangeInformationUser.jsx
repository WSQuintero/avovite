import { Grid, TextField } from "@mui/material";

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
            <TextField name="cellphone" label="Teléfono celular" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}  >
            <TextField name="id_type" label="Tipo de identificación" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}  >
            <TextField name="id_number" label="Número de identificación" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}  >
            <TextField
              name="id_location_expedition"
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
