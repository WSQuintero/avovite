import React, { useEffect, useMemo, useState } from "react";
import { Collapse, Stack, TextField, MenuItem, Typography, Button } from "@mui/material";
import useSession from "../../Hooks/useSession";
import SupplierService from "../../Services/supplier.service";
import ContractService from "../../Services/contract.service";
import { formatCurrency } from "../../utilities";
import { LoadingButton } from "@mui/lab";

function SellAvocados({ onSubmit, onCancel }) {
  const [{ token }] = useSession();
  const [formData, setFormData] = useState({ id_contract: "-", id_suppliers: "-", id_harvest: null, id_harvest_profitability: null });
  const [suppliers, setSuppliers] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState({ submiting: false });
  const $Supplier = useMemo(() => (token ? new SupplierService(token) : null), [token]);
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const isValidForm = useMemo(() => {
    return formData.id_contract !== "-" && formData.id_suppliers !== "-";
  }, [formData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "id_contract") {
      const contract = contracts.find((contract) => contract.contract_number === value);

      if (contract) {
        setFormData((prev) => ({ ...prev, id_harvest: contract.harvest_id, id_harvest_profitability: contract.id }));
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);

    setLoading((prev) => ({ ...prev, submiting: true }));

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, submiting: false }));
    }, 3000);
  };

  const fetchSuppliers = async () => {
    const { status, data } = await $Supplier.get();

    if (status) {
      setSuppliers(data.data);
    }
  };

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({ harvest: true });

    if (status) {
      setContracts(data.data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchSuppliers();
      await fetchContracts();
    })();
  }, [token]);

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <TextField required select fullWidth label="Contrato" name="id_contract" value={formData.id_contract} onChange={handleInputChange}>
        <MenuItem disabled value="-">
          Selecciona el contrato
        </MenuItem>
        {contracts.map((contract) => (
          <MenuItem key={contract.contract_number} value={contract.contract_number}>
            AV-{contract.contract_number}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        required
        select
        fullWidth
        label="Terceros disponibles"
        name="id_suppliers"
        value={formData.id_suppliers}
        onChange={handleInputChange}
      >
        <MenuItem disabled value="-">
          Selecciona un tercero
        </MenuItem>
        {suppliers.map((supplier) => (
          <MenuItem key={supplier.id} value={supplier.id}>
            {supplier.name}
          </MenuItem>
        ))}
      </TextField>

      <Collapse unmountOnExit in={formData.id_suppliers !== "-"}>
        <TextField
          multiline
          fullWidth
          disabled
          rows={8}
          label="Datos de los terceros o de avovite"
          value={suppliers.find((supplier) => supplier.id === formData.id_suppliers)?.asWork}
        />
      </Collapse>

      <Collapse unmountOnExit in={formData.id_contract !== "-"}>
        <Stack direction="row" justifyContent="space-between" padding={2} borderRadius={0.5} bgcolor="primary.main">
          <Typography color="white">Total de kilogramos</Typography>
          <Typography color="white" fontWeight={600}>
            {formatCurrency(
              Number(contracts.find((contract) => contract.contract_number === formData.id_contract)?.kg_correspondence || 0).toFixed(2)
            )}{" "}
            Kg
          </Typography>
        </Stack>
      </Collapse>

      <Stack direction="row" spacing={2} justifyContent="flex-end" mt={1}>
        <Button variant="outlined" onClick={onCancel}>
          Cancelar
        </Button>
        <LoadingButton loading={loading.submiting} disabled={!isValidForm} variant="contained" type="submit">
          Solicitar
        </LoadingButton>
      </Stack>
    </Stack>
  );
}

export default SellAvocados;
