import { Grid, TextField } from "@mui/material";
import BeneficiaryIdTypeButton from "../Components/BeneficiaryIdTypeButton";
import { useState } from "react";
import UploadPhotosButton from "./UploadPhotosButton";

function IsChangeInformationUser({
  isChangeInformationUser,
  handleInputChange,
  setFrontalImage,
  setTraseraImage,
  frontalImage,
  traseraImage,
}) {
  const [selectedIdType, setSelectedIdType] = useState();
  return (
    <>
      {isChangeInformationUser && (
        <Grid item xs={12} sm={12} marginTop="20px" display="flex" flexDirection={"column"} gap={"10px"}>
          <Grid item xs={12} sm={12}>
            <TextField name="fullname" label="Nombre completo" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="email" label="Correo electrónico" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField name="cellphone" type="number" label="Teléfono celular" fullWidth onChange={handleInputChange} required />
          </Grid>
          <BeneficiaryIdTypeButton
            handleInputChange={handleInputChange}
            selectedIdType={selectedIdType}
            setSelectedIdType={setSelectedIdType}
          />
          <Grid item xs={12} sm={12}>
            <TextField name="idNumber" type="number" label="Número de identificación" fullWidth onChange={handleInputChange} required />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="idLocExpedition"
              label="Lugar de expedición de la identificación"
              fullWidth
              onChange={handleInputChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <UploadPhotosButton
              setFrontalImage={setFrontalImage}
              setTraseraImage={setTraseraImage}
              frontalImage={frontalImage}
              traseraImage={traseraImage}
              isChangeInformationUser={isChangeInformationUser}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default IsChangeInformationUser;

