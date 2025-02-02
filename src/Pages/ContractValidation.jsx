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
import DialogKYC from "../Components/Dialogs/KYC";
import useUser from "../Hooks/useUser";
import InvasiveForm from "../Components/Forms/InvasiveForm";

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
  const [actualCont, setActualCont] = useState(null);
  const $User = useUser();

  useEffect(() => {
    const get = async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        if (
          !data.data.some(
            (contract) =>
              contract.state_second_form === 0 ||
              (contract.status_contracts === 0 &&
                contract.stateFignature !== "Pendiente de firma" &&
                contract.state_second_form_validocus !== "Pendiente de firma")
          )
        ) {
          navigate("/");
        }
      }
    };
    get();
  }, []);

  const fetchContractsWhitelist = async () => {
    setOpenInvasiveForm(false);

    const { status, data } = await $Contract.get();

    if (status) {
      if (
        data.data.some(
          (contract) =>
            contract.state_second_form === 0 ||
            (contract.status_contracts === 0 &&
              contract.stateFignature !== "Pendiente de firma" &&
              contract.state_second_form_validocus !== "Pendiente de firma")
        )
      ) {
        setContracts(data.data.filter((contract) => contract.state_second_form === 0 || contract.status_contracts === 0));
      } else {
        navigate("/");
      }
    }
  };
  const handleSelectContract = ({ id }) => {
    setIsKyc(true);
    const actualContract = contracts.find((contract) => contract.id === id);
    setActualCont(actualContract);

    if (actualContract.state_second_form === 0 && actualContract.status_contracts === 1 && session.user.KYC === 0) {
      setIsKyc(false);
      setContract({ id });
      return;
    }
    if (actualContract.status_contracts === 0) {
      setModal("contract-complete");
      setContract({ id });
      return;
    }
    if (actualContract.state_second_form === 0) {
      setOpenInvasiveForm(true);
      setContract({ id });
    }
  };
  const handleFormSubmit = async (body) => {
    setLoadingSubmit(true);
    const { mortgage_contract, ...rest } = body.body;

    const { status } = await $Contract.complete({ id: contract.id, body: rest });

    if (status) {
      setContracts((prev) => prev.filter((c) => c.id !== contract.id));
      setModal("contract-success");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
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
      {!isKyc && <DialogKYC open={true} logout={() => logout()} onSubmit={handleSubmitKYC} contractId={contract?.id} />}
      {!openInvasiveForm ? (
        <PageWrapper isInvalidSession>
          <BackButton />

          <Container maxWidth="xxl" disableGutters>
            <Grid display="flex" flexDirection="column" gap={2}>
              <Typography variant="h2">Contratos pendientes:</Typography>
              <List>
                {contracts.length > 0 &&
                  contracts?.map((contract) => (
                    <>
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
                            tertiary={contract.stateFignature}
                            primaryTypographyProps={{ fontSize: 20, color: "primary" }}
                            secondaryTypographyProps={{ color: "text.main" }}
                          />
                        </ListItemButton>
                        <Typography variant="h4" sx={{ marginRight: 50 }}>
                          {contract.stateFignature}
                        </Typography>
                      </ListItem>
                    </>
                  ))}
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
              <Button variant="contained" onClick={() => setModal(null)} disabled={contracts.length < 1}>
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
                  isMortgage={actualCont?.mortgage_contract === 1 ? true : false}
                />
              </Container>
            </DialogContent>
          </Dialog>

          <Dialog open={modal === "contract-success"} onClose={() => setModal(null)}>
            <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
              <CheckIcon fontSize="large" />
              <Typography textAlign="center" fontSize={22} fontWeight={500}>
                Formulario completado exitosamente. <br />
                {actualCont?.mortgage_contract === 1
                  ? "El contrato se está verificando con el área encargada para colocar el predio de la hipoteca. En un lapso máximo de 24 horas hábiles, estará en tu correo."
                  : "El contrato ya fue enviado a tu correo para su respectiva firma."}
              </Typography>
            </DialogTitle>
            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  setModal(null);
                  navigate("/");
                }}
              >
                Continuar
              </Button>
            </DialogActions>
          </Dialog>
        </PageWrapper>
      ) : (
        <InvasiveForm contractId={contract?.id} />
      )}
    </>
  );
}

export default ContractValidation;
