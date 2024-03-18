import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

function CustomContractRangeFilter({
  startIndex,
  endIndex,
  setStartIndex,
  setEndIndex,
  handleApplyFilter,
  setInitialContract,
  setFinalContract,
  setRangeContracts,
}) {
  const handleResetFilter = () => {
    setInitialContract(1);
    setFinalContract(undefined);
    setStartIndex(1);
    setEndIndex(10);
    setRangeContracts(undefined);
  };

  return (
    <Box display="flex" gap={2} sx={{ width: "100%", height: 100, justifyContent: "end", alignItems: "center" }}>
      <TextField
        label="Contrato inicial"
        variant="outlined"
        value={startIndex}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setStartIndex(value >= 1 ? value : 1);
        }}
        type="number"
        sx={{ width: "fit-content", fontSize: 10 }}
        height={10}
      />
      <TextField
        label="Contrato Final"
        variant="outlined"
        value={endIndex}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setEndIndex(value >= 1 ? value : 1);
        }}
        type="number"
        sx={{ width: "fit-content", fontSize: 10 }}
        height={10}
      />
      <Button variant="contained" onClick={handleApplyFilter}>
        Aplicar
      </Button>
      <Button variant="outlined" onClick={handleResetFilter}>
        Restablecer
      </Button>
    </Box>
  );
}

export default CustomContractRangeFilter;
