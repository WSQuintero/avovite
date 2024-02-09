import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function BeneficiaryIdTypeSelector({ handleInputChange }) {
  const options = ['Cedula', 'Tarjeta Identidad', 'Cedula Extranjeria', 'Pasaporte', 'Registro Civil', 'DNI'];



  return (
    <FormControl fullWidth >
      <InputLabel id="beneficiary-id-type-label" marginTop="20px">Seleccione Tipo de Identificación</InputLabel>
      <Select
        labelId="beneficiary-id-type-label"
        id="beneficiary-id-type-select"
        onChange={handleInputChange}
        name="idType"
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default BeneficiaryIdTypeSelector;
