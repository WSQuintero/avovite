import React, { useState } from "react";
import { Collapse, Stack, TextField, MenuItem, Typography, Button } from "@mui/material";

const Companies = [
  {
    id: 0,
    name: "Avovite",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic eos quisquam animi obcaecati quaerat illum vitae, dolorem quibusdam? Commodi aliquid dolore perferendis assumenda atque reiciendis accusamus quia iusto delectus tempore, quod earum, eaque at et, sit quis possimus hic harum blanditiis saepe omnis non facilis nobis. Nihil architecto suscipit neque?",
  },
  {
    id: 1,
    name: "Company 1",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic eos quisquam animi obcaecati quaerat illum vitae, dolorem quibusdam? Commodi aliquid dolore perferendis assumenda atque reiciendis accusamus quia iusto delectus tempore, quod earum, eaque at et, sit quis possimus hic harum blanditiis saepe omnis non facilis nobis. Nihil architecto suscipit neque?",
  },
  {
    id: 2,
    name: "Company 2",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic eos quisquam animi obcaecati quaerat illum vitae, dolorem quibusdam? Commodi aliquid dolore perferendis assumenda atque reiciendis accusamus quia iusto delectus tempore, quod earum, eaque at et, sit quis possimus hic harum blanditiis saepe omnis non facilis nobis. Nihil architecto suscipit neque?",
  },
  {
    id: 3,
    name: "Company 3",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic eos quisquam animi obcaecati quaerat illum vitae, dolorem quibusdam? Commodi aliquid dolore perferendis assumenda atque reiciendis accusamus quia iusto delectus tempore, quod earum, eaque at et, sit quis possimus hic harum blanditiis saepe omnis non facilis nobis. Nihil architecto suscipit neque?",
  },
];

const Contracts = [
  {
    id: 0,
    name: "Contrato 1",
    weight: 100,
  },
  {
    id: 1,
    name: "Contrato 2",
    weight: 20,
  },
  {
    id: 2,
    name: "Contrato 3",
    weight: 50,
  },
];

function SellAvocados({ onSubmit }) {
  const [formData, setFormData] = useState({ contractId: "-", companyId: "-" });

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
        {Contracts.map((contract) => (
          <MenuItem key={contract.id} value={contract.id}>
            {contract.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        required
        select
        fullWidth
        label="Terceros disponibles"
        name="companyId"
        value={formData.companyId}
        onChange={handleInputChange}
      >
        <MenuItem disabled value="-">
          Selecciona un tercero
        </MenuItem>
        {Companies.map((company) => (
          <MenuItem key={company.id} value={company.id}>
            {company.name}
          </MenuItem>
        ))}
      </TextField>

      <Collapse unmountOnExit in={formData.companyId !== "-"}>
        <TextField
          multiline
          fullWidth
          disabled
          rows={6}
          label="Datos de los terceros o de avovite"
          value={Companies.find((company) => company.id === formData.companyId)?.description}
        />
      </Collapse>

      <Collapse unmountOnExit in={formData.contractId !== "-"}>
        <Stack direction="row" justifyContent="space-between" padding={2} borderRadius={0.5} bgcolor="primary.main">
          <Typography color="white">Total de kilogramos</Typography>
          <Typography color="white" fontWeight={600}>
            {Contracts.find((contract) => contract.id === formData.contractId)?.weight}kg
          </Typography>
        </Stack>
      </Collapse>

      <Button variant="outlined" type="submit">
        Solicitar
      </Button>
    </Stack>
  );
}

export default SellAvocados;
