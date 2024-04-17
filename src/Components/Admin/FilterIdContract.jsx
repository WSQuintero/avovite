import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

function FilterIdContract({ setFilterContract, handleSearchId, setCurrentSize, setCurrentPage }) {
  const [startIndex, setStartIndex] = useState(0);

  const handleResetFilter = () => {
    setCurrentPage(1);
    setCurrentSize(10);
    setStartIndex(0);
    setFilterContract([]);
  };
  return (
    <Box sx={{ width: "auto", display: "flex", gap: 2, alignItems: "center", justifyContent: "center" }}>
      <Box gap={2} sx={{ display: "flex", width: "100%", justifyContent: "end", alignItems: "center", padding: 0, margin: 0 }}>
        <TextField
          label="Id"
          variant="outlined"
          value={startIndex}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setStartIndex(value >= 1 ? value : 1);
          }}
          type="number"
          style={{ maxWidth: "100px", minHeight: "40px", padding: "0", margin: "0" }}
          InputProps={{ sx: { fontSize: "14px", padding: 0, margin: 0, height: 30 } }} // Ajustar el tamaño de la fuente
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 0.5,
          height: 30,
          marginBottom: 1,
        }}
      >
        <Button variant="contained" onClick={() => startIndex > 0 && handleSearchId(startIndex)} sx={{ padding: 0.5, fontSize: 13 }}>
          Aplicar
        </Button>
        <Button variant="outlined" onClick={handleResetFilter} sx={{ padding: 0.5, fontSize: 13 }}>
          Restablecer
        </Button>
      </Box>
    </Box>
  );
}

export default FilterIdContract;
