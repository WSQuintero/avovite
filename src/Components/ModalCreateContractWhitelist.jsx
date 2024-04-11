import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import useSession from "../Hooks/useSession";
import useUser from "../Hooks/useUser";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import ContractService from "../Services/contract.service";
import WhitelistFinal from "./Admin/WhitelistFinal";
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
  const [value, setValue] = useState("");
  const [contracts, setContracts] = useState([]);
  const [id, setId] = useState(0);
  const [email, setEmail] = useState();
  const handleOpen = () => {
    resetData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearchUser = async () => {
    const idContract = contracts?.find((em) => String(em.email) === String(email))?.id_user;
    setId(Number(idContract));
    setUserInfoLoaded(true);
    // Lógica para buscar y mostrar los textos
  };
  function formatDateToYYYYMMDD(dateString) {
    const fecha = new Date(dateString);

    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();

    const fechaFormateada = `${año}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`;

    return fechaFormateada;
  }

  const handleCaptureData = async (toSend) => {
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
    const finalToSend = { ...toSend, first_payment_date: formatDateToYYYYMMDD(toSend.first_payment_date) };
    const { status, data } = await $Contract.createContract(finalToSend);
    if (status) {
      setFeedback({ open: true, message: "Contrato creado correctamente", status: "success" });
      setOpen(false);
      setId(null);
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

  useEffect(() => {
    const getContracts = async () => {
      const { status, data } = await $Contract.get({ pageNumber: 1, pageSize: 50000 });

      if (status) {
        setContracts(data.data);
      }
    };
    getContracts();
  }, []);
  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Crear contrato
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle>Crear contrato financiado</DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "left" }}>
            <TextField
              id="email-input"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              autoComplete="email"
              value={email}
              sx={{ marginTop: 5, width: "500px" }}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Button variant="contained" onClick={handleSearchUser} sx={{ marginTop: 5 }}>
              Buscar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <WhitelistFinal openTwo={id} id={id} send={handleCaptureData} setid={setId} />
    </div>
  );
};

export default ModalCreateContractWhitelist;
