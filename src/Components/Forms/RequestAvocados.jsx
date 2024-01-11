import { useState, useMemo, useEffect } from "react";
import { Collapse, Stack, TextField, MenuItem, Typography, Button } from "@mui/material";
import useSession from "../../Hooks/useSession";
import ContractService from "../../Services/contract.service";
import UtilsService from "../../Services/utils.service";
import { formatCurrency } from "../../utilities";
import { LoadingButton } from "@mui/lab";
import { DOCUMENT_TYPES } from "../../utilities/constants";

const FormDataState = {
  id_contract: "-",
  id_harvest: null,
  id_harvest_profitability: null,
  full_name: "",
  document_type: "-",
  Document_number: "",
  reside_farm_door: false,
  delivery_country: "-",
  delivery_city: "",
  delivery_address: "",
};

function RequestAvocados({ onSubmit, onCancel }) {
  const [{ token }] = useSession();
  const [formData, setFormData] = useState(FormDataState);
  const [contracts, setContracts] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState({ submiting: false });
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const $Utils = useMemo(() => new UtilsService(), []);
  const isValidForm = useMemo(
    () =>
      formData.id_contract !== "-" &&
      formData.full_name &&
      formData.Document_number &&
      (formData.reside_farm_door === false
        ? formData.delivery_country !== "-" && formData.delivery_city && formData.delivery_address
        : true),
    [formData]
  );

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
      </Stack>

      <TextField required fullWidth label="Nombre completo" name="full_name" value={formData.full_name} onChange={handleInputChange} />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          required
          select
          fullWidth
          label="Tipo de documento"
          name="document_type"
          value={formData.document_type}
          onChange={handleInputChange}
        >
          <MenuItem disabled value="-">
            Selecciona una opción
          </MenuItem>
          {Object.keys(DOCUMENT_TYPES).map((key) => (
            <MenuItem key={key} value={key}>
              {DOCUMENT_TYPES[key]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          fullWidth
          label="Documento"
          name="Document_number"
          value={formData.Document_number}
          onChange={handleInputChange}
        />
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          required
          fullWidth
          select
          label="Recibir puerta de finca"
          name="reside_farm_door"
          value={formData.reside_farm_door}
          onChange={handleInputChange}
        >
          <MenuItem value={false}>No</MenuItem>
          <MenuItem value={true}>Si</MenuItem>
        </TextField>
      </Stack>

      <Collapse unmountOnExit in={!formData.reside_farm_door}>
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              required
              fullWidth
              select
              label="Pais"
              name="delivery_country"
              value={formData.delivery_country}
              onChange={handleInputChange}
            >
              <MenuItem disabled value="-">
                Selecciona el pais
              </MenuItem>
              {countries.map((delivery_country) => (
                <MenuItem key={delivery_country.codigoPais} value={delivery_country.codigoPais}>
                  {delivery_country.nombrePais}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField required fullWidth label="Ciudad" name="delivery_city" value={formData.delivery_city} onChange={handleInputChange} />
            <TextField
              required
              fullWidth
              label="Dirección"
              name="delivery_address"
              value={formData.delivery_address}
              onChange={handleInputChange}
            />
          </Stack>
        </Stack>
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

export default RequestAvocados;
