import React, { useState } from "react";
import { Stack, TextField, MenuItem, Typography, Button } from "@mui/material";

function RequestAvocados({ onSubmit }) {
  const [formData, setFormData] = useState({
    contractId: "-",
    fullname: "",
    document: "",
    receiveAtDoor: false,
    country: "-",
    city: "-",
    address: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          required
          select
          fullWidth
          label="Contrato"
          name="contractId"
          value={formData.contractId}
          onChange={handleInputChange}
        >
          <MenuItem disabled value="-">
            Selecciona el contrato
          </MenuItem>
        </TextField>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          required
          fullWidth
          label="Nombre completo"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
        />
        <TextField
          required
          fullWidth
          label="Documento"
          name="document"
          value={formData.document}
          onChange={handleInputChange}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          required
          fullWidth
          select
          label="Recibir puerta de finca"
          name="receiveAtDoor"
          value={formData.receiveAtDoor}
          onChange={handleInputChange}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Si</MenuItem>
        </TextField>
      </Stack>

      {!formData.receiveAtDoor && (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            required
            fullWidth
            select
            label="Pais"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          >
            <MenuItem disabled value="-">
              Selecciona el pais
            </MenuItem>
          </TextField>
        </Stack>
      )}

      {!formData.receiveAtDoor && (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            required
            fullWidth
            select
            label="Ciudad"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          >
            <MenuItem disabled value="-">
              Selecciona la ciudad
            </MenuItem>
          </TextField>
          <TextField
            required
            fullWidth
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </Stack>
      )}

      <Stack direction="row" justifyContent="space-between" padding={2} borderRadius={0.5} bgcolor="primary.main">
        <Typography color='white'>Total de kilogramos</Typography>
        <Typography color='white' fontWeight={600}>50kg</Typography>
      </Stack>

      <Button variant="outlined" type="submit">Solicitar</Button>
    </Stack>
  );
}

export default RequestAvocados;
