import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";



function BancoSelect({  setNameBank, nameBank ,banks}) {
  const handleChange = (event) => {
    setNameBank(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-banco-label">Seleccionar Banco</InputLabel>
      <Select
        labelId="select-banco-label"
        id="select-banco"
        value={nameBank}
        onChange={handleChange}
        label="Seleccionar Banco"
      >
        {Object.entries(banks).map(([codigo, nombre]) => (
          <MenuItem key={codigo} value={nombre}>
            {nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default BancoSelect;
