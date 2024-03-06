import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

function CustomContractRangeFilter({ setCurrentSize, setCurrentPage }) {
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(10);

  const handleApplyFilter = () => {
    setCurrentPage(startIndex);
    setCurrentSize(endIndex);
  };

  const handleResetFilter = () => {
    setCurrentPage(1);
    setCurrentSize(10);
    setStartIndex(1);
    setEndIndex(10);
  };
  return (
    <Box display="flex" gap={2} sx={{ width: "100%", height: 100, justifyContent: "end", alignItems: "center" }}>
      <TextField
        label="Número de página"
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
        label="Resultados por página"
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
