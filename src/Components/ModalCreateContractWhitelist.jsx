import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Switch, TextField, Typography } from "@mui/material";
import useSession from "../Hooks/useSession";
import useUser from "../Hooks/useUser";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
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
  payment_numbers: "",
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
  const [id, setId] = useState(0);
  const handleOpen = () => {
    resetData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchUser = async () => {
    console.log(values);
    setUserInfoLoaded(true);
    // Lógica para buscar y mostrar los textos
  };

  const handleGenerateCuotas = () => {
    // Lógica para generar las cuotas
  };

  const handleCaptureData = () => {
    // Lógica para capturar los datos del modal
  };

  const resetData = () => {
    setUserInfoLoaded(false);
    setNumCuotas(0);
    setValues(initialState);
    setId(0);
  };

  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Crear contrato
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear contrato financiado</DialogTitle>
        <DialogContent sx={{ padding: "100px" }}>
          <TextField
            label="Id usuario a buscar"
            type="text"
            fullWidth
            value={id}
            onChange={({ target: { value } }) => setId(value)}
            sx={{ marginTop: "20px" }}
          />
          <Button variant="contained" onClick={handleSearchUser} sx={{ marginTop: "20px" }}>
            Buscar
          </Button>
          {userInfoLoaded && (
            <Box sx={{ marginTop: 2 }}>
              {Object.keys(initialState).map((prop) => (
                <div key={prop}>
                  {prop === "enable_to_pay_epayco" || prop === "mortgage_contract" || prop === "financed" || prop === "with_guarantee" ? (
                    <>
                      <Typography>{translate[prop]}</Typography>
                      <Switch
                        checked={values.prop}
                        onChange={({ target: { value } }) => setValues((prev) => ({ ...prev, [prop]: value }))}
                      />
                    </>
                  ) : prop === "first_payment_date" ? (
                    <DatePicker
                      label="Fecha de pago"
                      value={dayjs(values["first_payment_date"])}
                      format="DD/MM/YYYY"
                      slotProps={{ textField: { error: false } }}
                      onChange={(value) => setValues((prev) => ({ ...prev, [prop]: value.toDate() }))}
                      sx={{ width: "100%", marginTop: 2 }}
                    />
                  ) : (
                    <TextField
                      key={prop}
                      label={translate[prop]}
                      type="number"
                      fullWidth
                      value={prop === "id_user" ? id : values.prop}
                      disbled={prop === "id_user"}
                      onChange={({ target: { value } }) => setValues((prev) => ({ ...prev, [prop]: value }))}
                      sx={{ marginTop: "20px" }}
                    />
                  )}
                </div>
              ))}

              <TextField
                label="Número de cuotas"
                type="number"
                value={numCuotas}
                onChange={(e) => setNumCuotas(e.target.value)}
                fullWidth
                sx={{ marginTop: 2 }}
              />
              <Button variant="contained" onClick={handleGenerateCuotas} sx={{ marginTop: 2 }}>
                Generar Cuotas
              </Button>
            </Box>
          )}

          {/* Aquí van los contenedores de cuotas */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={handleCaptureData} variant="contained">
            Capturar Datos
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalCreateContractWhitelist;
