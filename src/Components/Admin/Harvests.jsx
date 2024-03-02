import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon, KeyboardArrowDown as CollapseIcon } from "@mui/icons-material";
import HarvestService from "../../Services/harvest.service";
import useSession from "../../Hooks/useSession";
import EnhancedTable from "../EnhancedTable";
import { DatePicker } from "@mui/x-date-pickers";
import { LoadingButton } from "@mui/lab";
import { NumericFormat } from "react-number-format";
import DialogContractDetail from "../Dialogs/ContractDetail";
import ContractSelector from "../ContractSelector";
import { parseString } from "xml2js";
import { formatCurrency } from "../../utilities";
import BackButton from "../BackButton";

const RowState = { id: null, total_kilograms: "", harvest_date: "", sowing_date: "", harvest_state: "" };
const CollapseState = { id: null, contract_number: "", harvest_id: "" };
const PaymentState = { harvest_profitability_id: null, harvest_id: null, contract_id: null, value: "" };

function Harvests() {
  const [session] = useSession();
  const [rows, setRows] = useState([]);
  const [collapse, setCollapse] = useState({});
  const [newRow, setNewRow] = useState(RowState);
  const [newCollapse, setNewCollapse] = useState(CollapseState);
  const [multiple, setMultiple] = useState([]);
  const [payment, setPayment] = useState(PaymentState);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({ fetching: true, collapse: null, split: null, importing: false, payment: false });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const isValidForm = useMemo(() => newRow.total_kilograms && newRow.harvest_state && newRow.sowing_date && newRow.harvest_date, [newRow]);
  const isValidFormCollapse = useMemo(() => newCollapse.contract_number, [newCollapse]);

  const $Harvest = useMemo(() => (session?.token ? new HarvestService(session?.token) : null), [session?.token]);

  const tableHeadCells = useMemo(
    () => [
      {
        id: "id",
        label: "ID",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "total_kilograms",
        label: "Kilogramos",
        align: "left",
        disablePadding: false,
        format: (value) => formatCurrency(value, "", " Kg"),
      },
      {
        id: "sowing_date",
        label: "Fecha de siembra",
        align: "left",
        disablePadding: false,
        format: (value) => dayjs(value).format("DD MMMM YYYY"),
      },
      {
        id: "harvest_date",
        label: "Fecha de cosecha",
        align: "left",
        disablePadding: false,
        format: (value) => dayjs(value).format("DD MMMM YYYY"),
      },
      {
        id: "harvest_state",
        label: "Estado",
        align: "left",
        disablePadding: false,
      },
      {
        id: "",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row, onCollapse) => (
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <IconButton
              onClick={async () => {
                onCollapse();

                if (!collapse[row.id]) {
                  fetchCollapse(row.id);
                }
              }}
            >
              <CollapseIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setNewRow({
                  id: row.id,
                  total_kilograms: row.total_kilograms,
                  harvest_date: row.harvest_date,
                  harvest_state: row.harvest_state,
                  sowing_date: row.sowing_date,
                });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setNewRow({
                  id: row.id,
                  total_kilograms: row.total_kilograms,
                  harvest_date: row.harvest_date,
                  harvest_state: row.harvest_state,
                  sowing_date: row.sowing_date,
                });
                setModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
            <LoadingButton
              loading={loading.split === row.id}
              disabled={!row.can_split}
              size="small"
              variant="contained"
              onClick={() => {
                setModal("split");
                setNewRow((prev) => ({ ...prev, id: row.id }));
              }}
            >
              Split
            </LoadingButton>
            <Button variant="outlined" size="small" onClick={() => handleDownload(row.id)}>
              Exportar
            </Button>
          </Grid>
        ),
      },
    ],
    [collapse, loading.split]
  );

  const handleDownload = async (id) => {
    await $Harvest.download({ id: id });
  };

  const tableCollapse = useCallback(
    (row) => (
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={2}>
        <Grid display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setNewCollapse((prev) => ({ ...prev, harvest_id: row.id }));
              setModal("collapse.create");
            }}
          >
            Asignar contratos
          </Button>
        </Grid>
        {loading.collapse === row.id ? (
          <LinearProgress />
        ) : (collapse[row.id] || []).length === 0 ? (
          <Typography fontWeight={600} textAlign="center" color="success.main">
            No tiene contratos asignados
          </Typography>
        ) : (
          <Table size="small" sx={{ mb: 6, "& th, & td": { paddingY: 0, border: "none" } }}>
            <TableHead>
              <TableRow>
                <TableCell>Contrato</TableCell>
                <TableCell>Vites</TableCell>
                <TableCell>Correspondencia Vites</TableCell>
                <TableCell>Kilogramos</TableCell>
                <TableCell>Pago</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(collapse[row.id] || []).map((row) => (
                <TableRow hover key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => {
                        setModal("collapse.contract.details");
                        setNewCollapse((prev) => ({ ...prev, contract_number: row.contract_number }));
                      }}
                    >
                      AV-{row.contract_number}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Typography
                      fontSize={row.total_vite ? 16 : 12}
                      color={row.total_vite ? "text.main" : "error.main"}
                      sx={{ opacity: row.total_vite ? 1 : 0.5 }}
                    >
                      {row.total_vite || "No ha pagado"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.vite_correspondence || "0"}</Typography>
                  </TableCell>
                  <TableCell>
                    {row.kg_correspondence ? formatCurrency(Number(row.kg_correspondence).toFixed(2) || 0, "", " Kg") : "0"}
                  </TableCell>
                  <TableCell>{row.payment_correspondence ? formatCurrency(row.payment_correspondence, "$") : "0"}</TableCell>
                  <TableCell>{row.payment_status}</TableCell>
                  <TableCell>
                    <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
                      {/* <IconButton
                        onClick={() => {
                          setNewCollapse(row);
                          setModal("collapse.update");
                        }}
                      >
                        <EditIcon />
                      </IconButton> */}
                      <IconButton
                        color="error"
                        onClick={() => {
                          setNewCollapse(row);
                          setModal("collapse.delete");
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <Button
                        disabled={!row.vite_correspondence}
                        variant="contained"
                        size="small"
                        onClick={() => {
                          setPayment({
                            harvest_profitability_id: row.id,
                            contract_id: row.contract_number,
                            harvest_id: row.harvest_id,
                            value: "",
                          });
                          setModal("collapse.payment");
                        }}
                      >
                        Pagar
                      </Button>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    ),
    [collapse, loading.collapse]
  );

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const onChangeFields = ({ target }) => {
    const { name, value } = target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setNewRow(RowState);
    setNewCollapse(CollapseState);
    setPayment(PaymentState);

    if (multiple.length) {
      setMultiple([]);
    }
  };

  const onCreate = async (event) => {
    event.preventDefault();

    if (!isValidForm) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status, data } = await $Harvest.add(newRow);

    if (status) {
      setRows((prev) => [...prev, { ...newRow, id: data.data }]);
      setFeedback({ open: true, message: "Cosecha creada exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdate = async (event) => {
    event.preventDefault();

    if (!isValidForm) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Harvest.update(newRow);

    if (status) {
      setRows((prev) => prev.map((p) => (p.id === newRow.id ? newRow : p)));
      setFeedback({ open: true, message: "Cosecha actualizada exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDelete = async () => {
    const { status } = await $Harvest.delete(newRow);

    if (status) {
      setRows((prev) => prev.filter((p) => p.id !== newRow.id));
      setFeedback({ open: true, message: "Cosecha eliminada exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onCreateCollapse = async (event) => {
    event.preventDefault();

    if (!multiple.length) {
      setFeedback({ open: true, message: "Seleccione al menos un contrato.", status: "error" });
      return;
    }

    const { status } = await $Harvest.profitability.add({ harvest_id: newCollapse.harvest_id, contract_numbers: multiple });

    if (status) {
      setFeedback({ open: true, message: "Se asignaron los contratos a la cosecha exitosamente.", status: "success" });
      fetchCollapse(newCollapse.harvest_id);
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdateCollapse = async (event) => {
    event.preventDefault();

    if (!isValidFormCollapse) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Harvest.profitability.update({
      id: newCollapse.id,
      contract_number: newCollapse.contract_number,
      harvest_id: newCollapse.harvest_id,
    });

    if (status) {
      setFeedback({ open: true, message: "Rentabilidad de cosecha actualizada exitosamente.", status: "success" });
      fetchCollapse(newCollapse.harvest_id);
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDeleteCollapse = async () => {
    const { status } = await $Harvest.profitability.delete(newCollapse);

    if (status) {
      setFeedback({ open: true, message: "Rentabilidad de cosecha eliminada exitosamente.", status: "success" });
      fetchCollapse(newCollapse.harvest_id);
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onSplit = async () => {
    setLoading((prev) => ({ ...prev, split: newRow.id }));

    const { status } = await $Harvest.split({ id: newRow.id });

    if (status) {
      setFeedback({ open: true, message: "Split generado exitosamente.", status: "success" });
      onClearFields();
      fetchCollapse(newRow.id);
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, split: null }));
  };

  const onImport = async (file) => {
    setLoading((prev) => ({ ...prev, importing: true }));

    const { status } = await $Harvest.import(file);

    if (status) {
      setFeedback({ open: true, message: "Cosechas importadas exitosamente.", status: "success" });
      fetchData();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, importing: false }));
  };

  const onPayment = async () => {
    setLoading((prev) => ({ ...prev, payment: true }));

    const { status } = await $Harvest.payment({ id: payment.harvest_profitability_id, payment_correspondence: payment.value });

    if (status) {
      setFeedback({ open: true, message: "Cosecha pagada exitosamente.", status: "success" });
      fetchCollapse(payment.harvest_id);
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, payment: false }));
  };

  const fetchData = () => {
    const updateHarvests = async () => {
      if (session.user.isAdmin()) {
        const { status, data } = await $Harvest.get();

        if (status) {
          setRows(data?.data);
        }
      } else {
        const { status, data } = await $Harvest.get({ id: session?.user?.id });

        if (status) {
          setRows(data?.data);
        }
      }
    };
    updateHarvests();
    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  const fetchCollapse = async (id_harvest) => {
    setLoading((prev) => ({ ...prev, collapse: id_harvest }));

    const { status, data } = await $Harvest.profitability.get({ id_harvest });

    if (status) {
      setCollapse((prev) => ({ ...prev, [id_harvest]: data.data }));
    }

    setLoading((prev) => ({ ...prev, collapse: null }));
  };

  useEffect(() => {
    if ($Harvest && session?.user?.id) {
      (async () => {
        await fetchData();
      })();
    }
  }, [$Harvest, session]);

  return (
    <>
      <BackButton />
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" gap={1} justifyContent="flex-end">
          <Box position="relative">
            <LoadingButton loading={loading.importing} variant="contained" size="small">
              Importar
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
              onChange={({ target }) => onImport(target.files[0])}
            />
          </Box>
          <Button variant="contained" size="small" onClick={() => setModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable loading={loading.fetching} headCells={tableHeadCells} rows={rows} collapse={tableCollapse} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} cosecha</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={modal === "create" ? onCreate : onUpdate}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Kilogramos"
                  name="total_kilograms"
                  type="number"
                  value={newRow.total_kilograms}
                  onChange={onChangeFields}
                  fullWidth
                />
                <TextField label="Estado" name="harvest_state" value={newRow.harvest_state} onChange={onChangeFields} fullWidth />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                {/* <DatePicker
                  label="Fecha de siembra"
                  value={dayjs(newRow.sowing_date)}
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { error: false } }}
                  onChange={(value) =>
                    onChangeFields({
                      target: {
                        name: "sowing_date",
                        value: value.toDate(),
                      },
                    })
                  }
                  sx={{ width: "100%" }}
                /> */}
                <DatePicker
                  label="Fecha de cosecha"
                  value={dayjs(newRow.harvest_date)}
                  format="DD/MM/YYYY"
                  slotProps={{ textField: { error: false } }}
                  onChange={(value) =>
                    onChangeFields({
                      target: {
                        name: "harvest_date",
                        value: value.toDate(),
                      },
                    })
                  }
                  sx={{ width: "100%" }}
                />
              </Stack>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button onClick={modal === "create" ? onCreate : onUpdate} variant="contained" disabled={!isValidForm}>
              {modal === "create" ? "Crear" : "Editar"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar cosecha de la lista</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar esta cosecha de la lista?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDelete}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "split"} onClose={onClearFields} fullWidth>
        <DialogTitle>Split de la cosecha</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que desea hacer split de la cosecha?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <LoadingButton loading={loading.split} variant="contained" onClick={onSplit}>
            Split
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog open={modal === "collapse.create" || modal === "collapse.update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">Asignar contratos</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={modal === "collapse.create" ? onCreateCollapse : onUpdateCollapse}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <ContractSelector initialValue={multiple} onChange={(value) => setMultiple(value)} />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button
              onClick={modal === "collapse.create" ? onCreateCollapse : onUpdateCollapse}
              variant="contained"
              disabled={!multiple.length}
            >
              Asignar
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "collapse.delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar rentabilidad de la cosecha de la lista</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar esta rentabilidad de la cosecha de la lista?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteCollapse}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "collapse.payment"} onClose={onClearFields} fullWidth>
        <DialogTitle>Pago de la cosecha para el contrato AV-{payment.contract_id}</DialogTitle>
        <DialogContent>
          <Stack pt={1}>
            <NumericFormat
              customInput={TextField}
              label="Valor"
              variant="outlined"
              value={payment.value}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography>$</Typography>
                  </InputAdornment>
                ),
              }}
              thousandSeparator
              sx={{ width: "100%" }}
              onValueChange={({ floatValue }) =>
                setPayment((prev) => ({
                  ...prev,
                  value: floatValue,
                }))
              }
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <LoadingButton loading={loading.payment} variant="contained" onClick={onPayment}>
            Pagar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <DialogContractDetail open={modal === "collapse.contract.details"} contractId={newCollapse.contract_number} onClose={onClearFields} />

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetFeedback}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Harvests;
