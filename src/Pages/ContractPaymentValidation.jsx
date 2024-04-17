import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Warning as WarningIcon, HistoryEdu as ContractIcon } from "@mui/icons-material";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";
import PageWrapper from "../Components/PageWrapper";
import { formatCurrency, formatDate } from "../utilities";
import { TESTING_EPAYCO } from "../utilities/constants";
import BackButton from "../Components/BackButton";
import ModalFirstTry from "../Components/ModalFirstTry";

function ContractPaymentValidation() {
  const navigate = useNavigate();
  const [{ user, token }] = useSession();
  const [contracts, setContracts] = useState([]);
  const [modal, setModal] = useState("warning");
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const [openFirstTime, setOpenFirstTime] = useState(false);
  const [message, setMessage] = useState("");
  const onCloseFirstTime = () => {
    setOpenFirstTime(false);
    setMessage("");
  };

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({ pendingToPay: true });

    if (status) {
      if (!data.data?.payment?.length) {
        navigate("/");
      }
      setContracts(data.data.payment);
    }
  };

  const handlePayment = async (contract) => {
    if (contract?.rejectedCounter === 1) {
      setMessage("Intentaste pagar, pero tu pago fue rechazado, entonces hemos recalculado el pago inicial para que puedas proceder.");
      setOpenFirstTime(true);
      setTimeout(() => {
        onCloseFirstTime();
        const mandatory = {
          name: "Pago del contrato pendiente",
          description: contract.dues ? "Cuota del contrato pendiente" : "Primer pago del contrato pendiente",
          invoice: `AV-${uuid()}`,
          currency: "cop",
          amount: contract.payment,
          tax_base: "4000",
          tax: "500",
          tax_ico: "500",
          country: "co",
          lang: "es",
        };

        const aditional = {
          extra1: null,
          extra2: token,
          extra3: contract.idcontrato,
          extra4: null,
          extra5: contract.dues,
          confirmation: `${import.meta.env.VITE_API_URL}/contract-transactional-payments/financed`,
          response: `${import.meta.env.VITE_APP_URL}/validation/payment`,
        };

        const handler = window.ePayco.checkout.configure({
          key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
          test: TESTING_EPAYCO,
        });

        handler.open({ ...mandatory, ...aditional });
      }, 10000);

      return;
    }
    if (contract?.rejectedCounter >= 2) {
      setMessage("Intentaste pagar dos veces sin éxito, Por favor contacta a tu banco para verificar el motivo del rechazo");
      setOpenFirstTime(true);
      setTimeout(() => {
        onCloseFirstTime();
      }, 5000);
      return;
    }

    const mandatory = {
      name: "Pago del contrato pendiente",
      description: contract.dues ? "Cuota del contrato pendiente" : "Primer pago del contrato pendiente",
      invoice: `AV-${uuid()}`,
      currency: "cop",
      amount: contract.payment,
      tax_base: "4000",
      tax: "500",
      tax_ico: "500",
      country: "co",
      lang: "es",
    };

    const aditional = {
      extra1: null,
      extra2: token,
      extra3: contract.idcontrato,
      extra4: null,
      extra5: contract.dues,
      confirmation: `${import.meta.env.VITE_API_URL}/contract-transactional-payments/financed`,
      response: `${import.meta.env.VITE_APP_URL}/validation/payment`,
    };

    const handler = window.ePayco.checkout.configure({
      key: import.meta.env.VITE_EPAYCO_PUBLIC_KEY,
      test: TESTING_EPAYCO,
    });

    handler.open(
      { ...mandatory, ...aditional },
      {
        onApproved: () => {
          // Acciones después de un pago aprobado
          window.location.reload(); // Refresca la página
        },
        onRejected: () => {
          // Acciones después de un pago rechazado
          window.location.reload(); // Refresca la página
        },
        onPending: () => {
          // Acciones después de un pago pendiente
          window.location.reload(); // Refresca la página
        },
        onError: () => {
          // Acciones después de un error en el pago
          window.location.reload(); // Refresca la página
        },
      }
    );

    handler.on("payment_error", function (error) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

    handler.on("payment_success", function (response) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchContracts();
      })();
    }
  }, [token]);

  return (
    <PageWrapper isInvalidSession>
      <BackButton />

      <Container maxWidth="xxl" disableGutters>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography variant="h2">Pagos pendientes:</Typography>
          <List>
            {contracts?.map((contract, index) => (
              <ListItem
                key={index}
                onClick={() => handlePayment(contract)}
                secondaryAction={
                  <Button
                    edge="end"
                    variant="outlined"
                    color="warning"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    // disabled={user?.rejectedCounter.length === 2}
                  >
                    Pagar con
                    <img src="https://www.drupal.org/files/project-images/ePayco-logo.png" alt="" width="50" />
                  </Button>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={() => {}}>
                  <ListItemIcon>
                    <ContractIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      contract.dues
                        ? `Cuota del contrato AV-${contract.idcontrato} pendiente`
                        : `Primer pago del contrato AV-${contract.idcontrato} pendiente`
                    }
                    secondary={formatCurrency(contract.payment, "Valor: $")}
                    primaryTypographyProps={{ fontSize: 20, color: "primary" }}
                    secondaryTypographyProps={{ color: "text.main" }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Container>

      <Dialog open={modal === "warning"} onClose={() => setModal(null)}>
        <DialogTitle color="error" display="flex" alignItems="center" gap={1}>
          <WarningIcon /> Tienes pagos pendientes
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Para poder continuar debes diligenciar los datos de tu contrato.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setModal(null)}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
      <ModalFirstTry open={openFirstTime} onClose={onCloseFirstTime} message={message} />
    </PageWrapper>
  );
}

export default ContractPaymentValidation;
