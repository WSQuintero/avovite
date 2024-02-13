import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect } from "react";

function CivilStatusBeneficiary({ handleInputChange, value ,setStatusCivil,statusCivil}) {
  const options = ["Casado(a)", "Viudo(a)", "Soltero(a)", "Union Libre", "Separado(a)"];

  useEffect(() => {
    setStatusCivil(value);
  }, [value]);

  return (
    <FormControl fullWidth>
      <InputLabel id="beneficiary-id-type-label">Seleccione su estado civil</InputLabel>
      <Select
        labelId="beneficiary-id-type-label"
        id="beneficiary-id-type-select"
        onChange={(event) => {
          handleInputChange(event);
          setStatusCivil(event.target.value);
        }}
        name="civilStatus"
        value={statusCivil}
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
