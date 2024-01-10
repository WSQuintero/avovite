import React, { useState, useMemo, useEffect } from "react";
import { Collapse, Stack, TextField, MenuItem, Typography, Button } from "@mui/material";
import useSession from "../../Hooks/useSession";
import ContractService from "../../Services/contract.service";
import UtilsService from "../../Services/utils.service";
import { formatCurrency } from "../../utilities";
import { LoadingButton } from "@mui/lab";

const FormDataState = {
  contractId: "-",
  fullname: "",
  document: "",
  receiveAtDoor: false,
  country: "-",
  city: "",
  address: "",
};

function RequestAvocados({ onSubmit, onCancel }) {
  const [{ token }] = useSession();
  const [formData, setFormData] = useState(FormDataState);
  const [contracts, setContracts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState({ submiting: true });
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const $Utils = useMemo(() => new UtilsService(), []);
  const isValidForm = useMemo(
    () =>
      formData.contractId !== "-" &&
      formData.fullname &&
      formData.document &&
      (formData.receiveAtDoor === false ? formData.country !== "-" && formData.city && formData.address : true),
    [formData]
  );

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);

    setLoading((prev) => ({ ...prev, submiting: true }));

    setTimeout(() => {
      setLoading((prev) => ({ ...prev, submiting: false }));
    }, 3000);
  };

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({ harvest: true });

    if (status) {
      setContracts(data.data);
    }
  };

  const fetchCountries = async () => {
    const { status, data } = await $Utils.getLocation();

    if (status) {
      setCountries(data.data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchContracts();
      await fetchCountries();
    })();
  }, [token]);

  return (
    <Stack component="form" spacing={2} onSubmit={handleSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField required select fullWidth label="Contrato" name="contractId" value={formData.contractId} onChange={handleInputChange}>
          <MenuItem disabled value="-">
            Selecciona el contrato
          </MenuItem>
          {contracts.map((contract) => (
            <MenuItem key={contract.contract_number} value={contract.contract_number}>
              AV-{contract.contract_number}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField required fullWidth label="Nombre completo" name="fullname" value={formData.fullname} onChange={handleInputChange} />
        <TextField required fullWidth label="Documento" name="document" value={formData.document} onChange={handleInputChange} />
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

      <Collapse unmountOnExit in={!formData.receiveAtDoor}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField required fullWidth select label="Pais" name="country" value={formData.country} onChange={handleInputChange}>
              <MenuItem disabled value="-">
                Selecciona el pais
              </MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.codigoPais} value={country.codigoPais}>
                  {country.nombrePais}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField required fullWidth label="Ciudad" name="city" value={formData.city} onChange={handleInputChange} />
            <TextField required fullWidth label="Dirección" name="address" value={formData.address} onChange={handleInputChange} />
          </Stack>
        </Stack>
      </Collapse>

      <Collapse unmountOnExit in={formData.contractId !== "-"}>
        <Stack direction="row" justifyContent="space-between" padding={2} borderRadius={0.5} bgcolor="primary.main">
          <Typography color="white">Total de kilogramos</Typography>
          <Typography color="white" fontWeight={600}>
            {formatCurrency(
              Number(contracts.find((contract) => contract.contract_number === formData.contractId)?.kg_correspondence || 0).toFixed(2)
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

export default RequestAvocados;
