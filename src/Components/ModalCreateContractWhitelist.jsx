import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import useSession from "../Hooks/useSession";
import useUser from "../Hooks/useUser";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ContractService from "../Services/contract.service";
const initialState = {
  enable_to_pay_epayco: "",
  mortgage_contract: "",
  financed: "",
  with_guarantee: "",
  contract_amount: "",
  contract_vites: "",
  id_user: "",
  id_services: "",
  percentage_discount: "",
  contract_discount: "",
  total_contract_with_discount: "",
  first_payment: "",
  first_payment_date: "",
  total_financed: "",
  payment_numbers: 0,
};
const translate = {
  enable_to_pay_epayco: "Habilitado para pagar con Epayco",
  mortgage_contract: "¿Contrato de hipoteca'",
  financed: "¿Financiado'",
  with_guarantee: "¿Con garantía'",
  contract_amount: "Monto del contrato",
  contract_vites: "Vites del contrato",
  id_user: "ID del usuario",
  id_services: "ID de los servicios",
  percentage_discount: "Porcentaje de descuento",
  contract_discount: "Descuento del contrato",
  total_contract_with_discount: "Total del contrato con descuento",
  first_payment: "Primer pago",
  first_payment_date: "Fecha del primer pago",
  total_financed: "Total financiado",
  payment_numbers: "Número de pagos",
};

const ModalCreateContractWhitelist = ({ setFeedback }) => {
  const [open, setOpen] = useState(false);
  const [numCuotas, setNumCuotas] = useState(0);
  const [userInfoLoaded, setUserInfoLoaded] = useState(false);
  const [values, setValues] = useState(initialState);
  const [financedContracts, setFinancedContracts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [session] = useSession();
  const $Contract = useMemo(() => (session.token ? new ContractService(session.token) : null), [session.token]);

  const [id, setId] = useState(0);
  const handleOpen = () => {
    resetData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchUser = async () => {
    setUserInfoLoaded(true);
    // Lógica para buscar y mostrar los textos
  };
  function formatDateToYYYYMMDD(dateString) {
    const fecha = new Date(dateString);

    // Obtener año, mes y día de la fecha
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // Los meses son indexados desde 0, por lo que necesitamos sumar 1
    const dia = fecha.getDate();

    // Formatear la fecha en el formato deseado (YYYY-MM-DD)
    const fechaFormateada = `${año}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`;

    return fechaFormateada;
  }

  const handleCaptureData = async () => {
    const toSend = {
      ...values,
      financed: values.financed ? 1 : 0,
      with_guarantee: values.with_guarantee ? 1 : 0,
      enable_to_pay_epayco: values.enable_to_pay_epayco ? 1 : 0,
      mortgage_contract: values.mortgage_contract ? 1 : 0,
      financed_contracts: quotes,
      id_user: Number(id),
    };
    if (
      Object.keys(toSend).some((key) => {
        if (
          key !== "financed" ||
          key !== "with_guarantee" ||
          key !== "enable_to_pay_epayco" ||
          key !== "mortgage_contract" ||
          key !== "financed_contracts"
        ) {
          return initialState[key] === toSend[key];
        }
      })
    ) {
      setFeedback({ open: true, message: "Debes diligenciar todos los campos", status: "error" });
      return;
    }

    const { status, data } = await $Contract.createContract(toSend);
    if (status) {
      setFeedback({ open: true, message: "Contrato creado correctamente", status: "success" });
      setOpen(false);
    } else {
      setFeedback({ open: true, message: "Hubo un error al crear el contrato", status: "error" });
    }
  };

  const resetData = () => {
    setUserInfoLoaded(false);
    setNumCuotas(0);
    setValues(initialState);
    setId(0);
  };

  const handleGetCharge = ({ name, value }) => {
    const existingQuoteIndex = quotes.findIndex((quote) => quote.quota_number === Number(name.charAt(name.length - 1)));
    const quote = existingQuoteIndex !== -1 ? quotes[existingQuoteIndex] : {};
    if (name.slice(0, -1) === "payment_amount") {
      quote.payment_amount = value;
    }
    if (name.slice(0, -1) === "date_payment") {
      quote.date_payment = value;
    }
    if (existingQuoteIndex === -1) {
      quote.quota_number = Number(name.charAt(name.length - 1));
    }

    const updatedQuotes = [...quotes];
    if (existingQuoteIndex !== -1) {
      updatedQuotes[existingQuoteIndex] = quote;
    } else {
      updatedQuotes.push(quote);
    }

    setQuotes(updatedQuotes);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Crear contrato
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Crear contrato financiado</DialogTitle>
        <DialogContent>
          <TextField
            label="Id usuario a buscar"
            type="number"
            fullWidth
            value={id}
            onChange={({ target: { value } }) => setId(Number(value))}
            sx={{ marginTop: "20px" }}
            required
          />
          <Button variant="contained" onClick={handleSearchUser} sx={{ marginTop: "20px" }}>
            Buscar
          </Button>
          {userInfoLoaded && (
            <Box sx={{ marginTop: 2 }}>
              <Grid container spacing={2}>
                {Object.keys(initialState).map((prop, index) => (
                  <Grid item xs={12} sm={6} key={prop}>
                    {prop === "enable_to_pay_epayco" || prop === "mortgage_contract" || prop === "financed" || prop === "with_guarantee" ? (
                      <>
                        <Typography>{translate[prop]}</Typography>
                        <Switch
                          checked={values[prop]}
                          onChange={({ target: { checked } }) => setValues((prev) => ({ ...prev, [prop]: checked }))}
                        />
                      </>
                    ) : prop === "first_payment_date" ? (
                      <DatePicker
                        label="Fecha de pago"
                        value={dayjs(values["first_payment_date"])}
                        format="DD/MM/YYYY"
                        slotProps={{ textField: { error: false } }}
                        onChange={(value) => setValues((prev) => ({ ...prev, [prop]: formatDateToYYYYMMDD(value.toDate()) }))}
                        sx={{ width: "100%", marginTop: 2 }}
                        required
                      />
                    ) : (
                      <TextField
                        key={prop}
                        label={translate[prop]}
                        type="number"
                        fullWidth
                        value={prop === "id_user" ? id : values[prop]}
                        disabled={prop === "id_user"}
                        onChange={({ target: { value } }) => setValues((prev) => ({ ...prev, [prop]: Number(value) }))}
                        sx={{ marginTop: "20px" }}
                        required
                      />
                    )}
                  </Grid>
                ))}
              </Grid>

              {/* <TextField
              label="Número de cuotas"
              type="number"
              value={numCuotas}
              onChange={(e) => setNumCuotas(e.target.value)}
              fullWidth
              sx={{ marginTop: 2 }}
            /> */}
            </Box>
          )}
        </DialogContent>
        <Box sx={{ maxHeight: "500px", overflow: "scroll" }}>
          {Array.from({ length: values.payment_numbers }).map((_, index) => (
            <React.Fragment key={index}>
              <Paper elevation={3} style={{ padding: 20 }}>
                <Typography variant="h6" gutterBottom>
                  Cuota {index + 1}
                </Typography>
                <TextField
                  name={`quota_number${index + 1}`}
                  id={`quota_number${index + 1}`}
                  fullWidth
                  label="Número de cuota"
                  value={index + 1}
                  disabled={index !== undefined}
                  onChange={(event) => handleGetCharge({ name: event.target.name, value: event.target.value })}
                  required
                />
              </Paper>
              <Paper elevation={3} style={{ padding: 20, marginTop: 10 }}>
                <TextField
                  onChange={(event) => handleGetCharge({ name: event.target.name, value: event.target.value })}
                  name={`payment_amount${index + 1}`}
                  id={`payment_amount${index + 1}`}
                  fullWidth
                  label="Cantidad de pago"
                  required
                />
                <DatePicker
                  label="Fecha de pago"
                  // value={dayjs(values["first_payment_date"])}
                  format="DD/MM/YYYY"
                  id={`date_payment${index + 1}`}
                  slotProps={{ textField: { error: false } }}
                  sx={{ width: "100%", marginTop: 2 }}
                  onChange={(value) => handleGetCharge({ name: `date_payment${index + 1}`, value: formatDateToYYYYMMDD(value.toDate()) })}
                  required
                />
              </Paper>
            </React.Fragment>
          ))}
        </Box>

        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={handleCaptureData} variant="contained">
            Crear
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalCreateContractWhitelist;
