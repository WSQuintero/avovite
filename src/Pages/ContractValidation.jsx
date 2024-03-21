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
import BackButton from "../Components/BackButton";
import InvasiveForm from "../Components/Forms/InvasiveForm";
import DialogKYC from "../Components/Dialogs/KYC";
import useUser from "../Hooks/useUser";

function ContractValidation() {
  const navigate = useNavigate();
  const [session, { setUser, logout }] = useSession();
  const initialFormData = useLastContract();
  const [contracts, setContracts] = useState([]);
  const [contract, setContract] = useState({});
  const [modal, setModal] = useState("warning");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [resetForm, setResetForm] = useState(() => () => {});
  const $Contract = useMemo(() => (session.token ? new ContractService(session.token) : null), [session.token]);
  const [openInvasiveForm, setOpenInvasiveForm] = useState(false);
  const [contractsPendingSecondForm, setContractsPendingSecondForm] = useState([]);
  const [whiteListContracts, setWhiteListContracts] = useState();
  const [isKyc, setIsKyc] = useState(true);
  const $User = useUser();
  const fetchContractsWhitelist = async () => {
    setOpenInvasiveForm(false);

    const { status, data } = await $Contract.get();

    if (status) {
      if (data.data.some((contract) => contract.state_second_form === 1 && contract.status_contracts === 0) && session.user.KYC === 0) {
        setIsKyc(false);
      }
      if (data.data.some((contract) => contract.state_second_form === 0 || contract.status_contracts === 0)) {
        setContracts(data.data.filter((contract) => contract.state_second_form === 0 || contract.status_contracts === 0));
      }
    }
  };
  const handleSelectContract = ({ id }) => {
    setModal("contract-complete");
    setContract({ id });
    setOpenInvasiveForm(true);
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
  const handleSubmitKYC = async (form) => {
    const body = new FormData();
    body.append("faces", form.document);
    body.append("faces", form.face1);
    body.append("faces", form.face2);

    const { status } = await $User.sendKYC(body);

    if (status) {
      setUser({ ...session?.user, KYC: 1 });
      setIsKyc(true);
    }

    return status;
  };

  useEffect(() => {
    if (session.token) {
      (async () => {
        await fetchContractsWhitelist();
      })();
    }
  }, [session.token]);

  return (
    <>
      {!isKyc && <DialogKYC open={true} logout={() => logout()} onSubmit={handleSubmitKYC} />}
      {!openInvasiveForm ? (
        <PageWrapper isInvalidSession>
          <BackButton />

          <Container maxWidth="xxl" disableGutters>
            <Grid display="flex" flexDirection="column" gap={2}>
              <Typography variant="h2">Contratos pendientes:</Typography>
              <List>
                {contracts?.map((contract) => (
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
                {/* {whiteListContracts?.map((contract) => (
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
                ))} */}
              </List>
            </Grid>
          </Container>

          <Dialog open={modal === "warning"} onClose={() => setModal(null)}>
            <DialogTitle color="error" display="flex" alignItems="center" gap={1}>
              <WarningIcon /> Tienes contratos pendientes
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
      ) : (
        <InvasiveForm contractId={contract.id} />
      )}
    </>
  );
}

export default ContractValidation;
