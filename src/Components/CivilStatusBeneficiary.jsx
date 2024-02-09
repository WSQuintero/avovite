import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function CivilStatusBeneficiary({ handleInputChange }) {
  const options = ['Casado(a)', 'Viudo(a)', 'Soltero(a)', 'Union Libre', 'Separado(a)'];



  return (
    <FormControl fullWidth >
      <InputLabel id="beneficiary-id-type-label" >Seleccione su estado civil</InputLabel>
      <Select
        labelId="beneficiary-id-type-label"
        id="beneficiary-id-type-select"
        onChange={handleInputChange}
        name="civilStatus"
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

export default CivilStatusBeneficiary;
