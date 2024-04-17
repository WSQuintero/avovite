import { useMemo, useState, useEffect } from "react";
import {
  Typography,
  Container,
  Stack,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PageWrapper from "../Components/PageWrapper";
import dayjs from "dayjs";
import useConfig from "../Hooks/useConfig";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";
import useSession from "../Hooks/useSession";
import MovementService from "../Services/movement.service";
import useAsyncEffect from "../Hooks/useAsyncEffect";
import EnhancedTable from "../Components/EnhancedTable";
import { TRANSACTION_TYPES } from "../utilities/constants";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../Components/BackButton";

function Transactions() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [{ user, token }] = useSession();
  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState([]);
  const [filesUser, setFilesUser] = useState({ cedula: null, certificado: null });
  const [withdrawalMovId, setWithdrawalMovId] = useState(null);

  const [{ loading }, { setLoading }] = useConfig();
  const [loadingTransactions, setLoadingTransactions] = useState({ fetching: true });
  const $Movement = useMemo(() => (token ? new MovementService(token) : null), [token]);
  const columns = useMemo(
    () => [
      {
        id: "id",
        label: "ID",
      },
      {
        id: "contract_id",
        label: "ID Contrato",
        format: (value) => `AV-${value}`,
      },
      {
        id: "transaction",
        label: "Transacción",
        format: (value) => TRANSACTION_TYPES[value],
      },
      {
        id: "dateCreate",
        label: "Fecha de Transacción",
        format: (value) => (value ? dayjs(new Date(value)).format("DD MMMM YYYY") : "-"),
      },
      {
        id: "transaction_value",
        label: "Valor de Transacción",
        format: (value) => formatCurrency(value, "$"),
      },
      {
        id: "concept",
        label: "Concepto",
        format: (value) => value,
      },
      {
        id: "id",
        label: "",
        format: (mov, data) => {
          return (
            <Stack direction="row" spacing={1}>
              <Button disabled size="small" variant="contained">
                Ver detalles
              </Button>

              {data.withdrawal == 0 && (
                <Button
                  size="small"
                  onClick={() => {
                    setWithdrawalMovId(data);
                    setModal("modal-withdrawal");
                  }}
                  disabled={data?.transaction === "pay"}
                  variant="contained"
                >
                  Retirar
                </Button>
              )}
            </Stack>
          );
        },
      },
    ],
    []
  );

  const loadMovs = async () => {
    const { status, data } = await $Movement.get({ page: 1, pagezise: 10 });

    if (status) {
      setRows(data.data);
    } else {
      console.log(data);
    }

    setLoadingTransactions((prev) => ({ ...prev, fetching: false }));
  };

  useAsyncEffect(async () => {
    if ($Movement) {
      loadMovs();
    }
  }, [$Movement]);

  useEffect(() => {
    if (user) {
      if (user.status_terms_and_conditions == 0 || !user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      }
    }
  }, [user]);

  const cancelWithdrawalMov = async () => {
    setModal("");
    setWithdrawalMovId(null);
    setFilesUser({ cedula: null, certificado: null });
  };

  const withdrawalMov = async () => {
    setLoading(true);

    await $Movement.withdrawal(withdrawalMovId?.id);

    await loadMovs();

    setLoading(false);

    enqueueSnackbar(`Felicidades su retiro se procesara de inmediato y en un lapso de 1 a 5 días hábiles estará en su cuenta bancaria.`, {
      variant: "success",
    });

    setModal("modal-withdrawal-success");
  };

  const onImport = async (file, type) => {
    setModal("");

    let alter = filesUser;
    alter[type] = file;

    setFilesUser(alter);

    setTimeout(() => setModal("modal-update-payment-docs"), 1);
  };

  const updateDocsUser = async () => {
    setLoading(true);

    const body = new FormData();

    body.append("info", filesUser.cedula);
    body.append("info", filesUser.certificado);

    await $Movement.changeInformationBank(body, withdrawalMovId?.id);

    await loadMovs();

    setLoading(false);

    enqueueSnackbar(`Se han enviado los documentos exitosamente.`, {
      variant: "success",
    });

    cancelWithdrawalMov();
  };

  return (
    <PageWrapper>
      <BackButton />
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Transacciones
          </Typography>
        </Stack>
        <EnhancedTable loading={loadingTransactions.fetching} headCells={columns} rows={rows} />
      </Container>

      <Dialog open={modal === "modal-update-payment-docs"} onClose={() => cancelWithdrawalMov()} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">Actualizar datos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cargue su Documento de identidad y certificación bancaria para actualizar sus datos. En 1-3 días habiles, su información estará
            actualizada, permitiéndole realizar solicitudes de retiro sin inconvenientes. <br />
            <br />
            <u>
              "<b>RECUERDE:</b> el documento de identidad y la certificación bancaria deben estar a nombre del titular del contrato, de lo
              contrario sus datos NO se actualizarán y NO se podrá realizar el procesamiento de sus retiros”
            </u>
            <br />
            <br />
            ¡Apreciamos su cooperación para agilizar el proceso y mejorar su experiencia!
          </DialogContentText>
          <br />

          <Grid display="flex" gap={1}>
            <Box position="relative">
              <LoadingButton loading={loading.importing} variant={filesUser.cedula ? "contained" : ""} size="small">
                {filesUser.cedula ? "Cambiar cédula cargada" : "Anexar Cédula"}
              </LoadingButton>

              <input
                type="file"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  aspectRatio: 1,
                  opacity: 0,
                }}
                onChange={({ target }) => onImport(target.files[0], "cedula")}
              />
            </Box>

            <Box position="relative">
              <LoadingButton loading={loading.importing} variant={filesUser.certificado ? "contained" : ""} size="small">
                {filesUser.certificado ? "Cambiar certificación bancaria cargada" : "Anexar certificación bancaria"}
              </LoadingButton>
              <input
                type="file"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  aspectRatio: 1,
                  opacity: 0,
                }}
                onChange={({ target }) => onImport(target.files[0], "certificado")}
              />
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant={filesUser.cedula && filesUser.certificado ? "contained" : ""}
            onClick={() => {
              if (filesUser.cedula && filesUser.certificado) {
                updateDocsUser();
              }
            }}
          >
            Actualizar
          </Button>{" "}
          <Button variant="warning" onClick={() => cancelWithdrawalMov()}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modal === "modal-withdrawal"} onClose={() => cancelWithdrawalMov()}>
        <DialogTitle color="primary.main">¡Confirmación de retiro!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Seguro de proceder?, Al aceptar, asume responsabilidad por los datos proporcionados y confirma su exactitud.
            <br />
            <b>RECUERDE:</b> el documento de identidad y la cuenta bancaria deben estar a nombre del titular del contrato y los datos deben
            estar correctos, de lo contrario puede sufrir una pérdida del valor retirado, la cual usted asume la responsabilidad.
            <br />
            <br />
            <hr />
            <b>Valor Retiro:</b> $ {withdrawalMovId?.transaction_value.toLocaleString("es-ES")}
            <br />
            <hr />
            <b>Nombre:</b> {withdrawalMovId?.fullname}
            <br />
            <b>Tipo de Documento:</b> {withdrawalMovId?.id_type}
            <br />
            <b>Número de Documento:</b> {withdrawalMovId?.id_number}
            <br />
            <hr />
            <b>Banco:</b> {withdrawalMovId?.nombre_banco}
            <br />
            <b>Tipo de Cuenta:</b> {withdrawalMovId?.tipo_cuenta}
            <br />
            <b>Número de Cuenta:</b> {withdrawalMovId?.user_bank_account_number}
            <hr />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => withdrawalMov()}>
            RETIRAR
          </Button>{" "}
          <Button onClick={() => setModal("modal-update-payment-docs")}>No, Actualizar Datos</Button>{" "}
          <Button variant="warning" onClick={() => cancelWithdrawalMov()}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={modal === "modal-withdrawal-success"} onClose={() => cancelWithdrawalMov()}>
        <DialogTitle color="primary.main">¡Confirmación de retiro!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Felicidades su retiro se procesara de inmediato y en un lapso de 1 a 5 días hábiles estará en su cuenta bancaria.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => cancelWithdrawalMov()}>
            !Gracias!
          </Button>
        </DialogActions>
      </Dialog>
    </PageWrapper>
  );
}

export default Transactions;
