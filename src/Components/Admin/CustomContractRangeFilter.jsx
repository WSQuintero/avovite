import { useState, useEffect, useRef } from "react";
import { TextField, Box, Button } from "@mui/material";

function CustomContractRangeFilter({ onApplyFilter, contracts, setContracts }) {
  const [startIndex, setStartIndex] = useState("");
  const [endIndex, setEndIndex] = useState("");
  const initialContracts = useRef(contracts);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized && contracts && contracts.length) {
      initialContracts.current = contracts;
      setInitialized(true);
    }
  }, [contracts, initialized]);

  const handleApplyFilter = () => {
    const start = parseInt(startIndex);
    const end = parseInt(endIndex);
    if (!isNaN(start) && !isNaN(end) && start <= end && end <= initialContracts.current.length) {
      const newFilteredContracts = initialContracts.current.slice(start - 1, end);
      setContracts(newFilteredContracts);
      onApplyFilter(start, end);
    }
  };

  const handleResetFilter = () => {
    setStartIndex("");
    setEndIndex("");
    setContracts(initialContracts.current);
    onApplyFilter(0, initialContracts.current.length);
  };

  return (
    <Box display="flex" gap={2} sx={{ width: "100%", height: 100, justifyContent: "end", alignItems: "center" }}>
      <TextField
        label="Posición contrato inicial"
        variant="outlined"
        value={startIndex}
        onChange={(e) => setStartIndex(e.target.value)}
        type="number"
        sx={{ width: "fit-content", fontSize: 10 }}
        height={10}
      />
      <TextField
        label="Posición contrato final"
        variant="outlined"
        value={endIndex}
        onChange={(e) => setEndIndex(e.target.value)}
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
