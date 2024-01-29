import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Warning as WarningIcon, CheckCircle as CheckIcon, HistoryEdu as ContractIcon } from "@mui/icons-material";
import useSession from "../Hooks/useSession";
import ContractService from "../Services/contract.service";
import PageWrapper from "../Components/PageWrapper";
import { formatDate } from "../utilities";
import Form from "../Components/Form";
import useLastContract from "../Hooks/useLastContract";

function ContractValidation() {
  const navigate = useNavigate();
  const [{ token }] = useSession();
  const initialFormData = useLastContract();
  const [contracts, setContracts] = useState({});
  const [contract, setContract] = useState({});
  const [modal, setModal] = useState("warning");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [resetForm, setResetForm] = useState(() => () => {});
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({ pending: true });

    if (status) {
      if (!data.data?.pendings?.length) {
        navigate("/");
      }

      setContracts(data.data);
    }
  };

  const handleSelectContract = ({ id }) => {
    setModal("contract-complete");
    setContract({ id });

    /* const newContract = {};

    contracts?.lastContract[0] &&
      Object.keys(contract).forEach((key) => {
        if (contracts.lastContract[0][key]) {
          newContract[key] = contracts.lastContract[0][key];
        }
      });

    setContract((prev) => ({ ...prev, ...newContract, id })); */
  };

  const handleFormSubmit = async (body) => {
    setLoadingSubmit(true);

    const { status } = await $Contract.complete({ id: contract.id, pending: true, ...body });

    if (status) {
      setContracts((prev) => ({ ...prev, pendings: prev.pendings.filter((c) => c.id !== contract.id) }));
      setModal("contract-success");
      location.reload();
    } else {
      console.log("Error");
    }

    setLoadingSubmit(false);
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
      <Container maxWidth="xxl" disableGutters>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography variant="h2">Contratos pendientes:</Typography>
          <List>
            {(contracts.pendings || []).map((contract, index) => (
              <ListItem
                key={contract.id}
                onClick={() => handleSelectContract(contract)}
                secondaryAction={
                  <Button variant="contained" edge="end">
                    Completar
                  </Button>
                }
                disablePadding
              >
                <ListItemButton role={undefined} onClick={() => {}}>
                  <ListItemIcon>
                    <ContractIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`Contrato AV-${contract.id}`}
                    secondary={`Pago realizado el ${formatDate(contract.first_payment_date)}`}
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
          <WarningIcon /> Tienes contratos pendientes
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Para poder continuar debes de efectuar pagos todos tus contratos.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setModal(null)}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        fullWidth
        PaperProps={{ sx: { backgroundColor: "white" } }}
        open={modal === "contract-complete"}
        onClose={() => setModal(null)}
      >
        <DialogContent>
          <Container maxWidth="xxl" sx={{ padding: 4, border: 1, borderRadius: 2, borderColor: "primary.main" }}>
            <Form
              loading={loadingSubmit}
              initialState={initialFormData}
              onSubmit={handleFormSubmit}
              onLoad={({ reset }) => setResetForm(reset)}
            />
          </Container>
        </DialogContent>
      </Dialog>

      <Dialog open={modal === "contract-success"} onClose={() => setModal(null)}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <CheckIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Formulario completado exitosamente.
          </Typography>
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={() => setModal(null)}>
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

export default ContractValidation;
