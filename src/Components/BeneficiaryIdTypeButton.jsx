import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';

function BeneficiaryIdTypeSelector({ handleInputChange, value,selectedIdType,setSelectedIdType }) {

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const options = ['Cedula', 'Tarjeta Identidad', 'Cedula Extranjeria', 'Pasaporte', 'Registro Civil', 'DNI'];

  useEffect(() => {
    setSelectedIdType(capitalizeFirstLetter(String(value))||"");
  }, [value]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedIdType(selectedValue);
    handleInputChange(event);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="beneficiary-id-type-label" marginTop="20px">Seleccione Tipo de Identificación</InputLabel>
      <Select
        labelId="beneficiary-id-type-label"
        id="beneficiary-id-type-select"
        onChange={handleChange}
        name="idType"
        value={selectedIdType}
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
