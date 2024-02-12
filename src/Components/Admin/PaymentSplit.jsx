import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  ListItemText,
  MenuItem,
  Snackbar,
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
import SplitService from "../../Services/split.service";
import ContractService from "../../Services/contract.service";
import useSession from "../../Hooks/useSession";
import EnhancedTable from "../EnhancedTable";
import { DatePicker } from "@mui/x-date-pickers";
import { formatCurrency } from "../../utilities";
import { LoadingButton } from "@mui/lab";
import { NumericFormat } from "react-number-format";
import DialogContractDetail from "../Dialogs/ContractDetail";
import ContractSelector from "../ContractSelector";
import { GetApp as DownloadIcon } from "@mui/icons-material";
import { saveAs } from 'file-saver';
import JSZip from "jszip";

const RowState = { id: null, total_money: "", payment_date: "", is_Cronjob: false };
const CollapseState = { id: null, contract_number: "", split_payment_id: "" };

function PaymentSplit() {
  const [session] = useSession();
  const [contracts, setContracts] = useState({});
  const [rows, setRows] = useState([]);
  const [collapse, setCollapse] = useState({});
  const [multiple, setMultiple] = useState([]);
  const [newRow, setNewRow] = useState(RowState);
  const [newCollapse, setNewCollapse] = useState(CollapseState);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({ fetching: true, collapse: null, split: null });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const isValidForm = useMemo(() => newRow.total_money && newRow.payment_date, [newRow]);
  const isValidFormCollapse = useMemo(() => newCollapse.contract_number, [newCollapse]);

  const $Split = useMemo(() => (session.token ? new SplitService(session.token) : null), [session.token]);
  const $Contract = useMemo(() => (session.token ? new ContractService(session.token) : null), [session.token]);

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
        id: "total_money",
        label: "Dinero Total",
        align: "left",
        disablePadding: false,
        format: (value) => formatCurrency(value, "$"),
      },
      {
        id: "payment_date",
        label: "Fecha de pago",
        align: "left",
        disablePadding: false,
        format: (value) => dayjs(value).format("DD MMMM YYYY"),
      },
      {
        id: "paid",
        label: "Pagado",
        align: "left",
        disablePadding: false,
        format: (value) => (value === 0 ? "No" : "Si"),
      },
      {
        id: "is_Cronjob",
        label: "Pago automático",
        align: "left",
        disablePadding: false,
        format: (value) => (value === 0 ? "No" : "Si"),
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
                setNewRow({ id: row.id, total_money: row.total_money, payment_date: row.payment_date, is_Cronjob: row.is_Cronjob === 1 });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setNewRow({ id: row.id, total_money: row.total_money, payment_date: row.payment_date, is_Cronjob: row.is_Cronjob === 1 });
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
                setNewRow((prev) => ({ ...prev, id: row.id }));
                setModal("split");
              }}
            >
              Split
            </LoadingButton>
            <Button variant="outlined" size="small" onClick={() => handleDownloadExcel(Number(row.id))}>
              Exportar
            </Button>
          </Grid>
        ),
      }
    ],
    [collapse, loading.split]
  );

  const handleDownloadExcel = async (id) => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_APP_URL}/SplitPayment/generate-xlsx:${id}`;
    link.download = `archivo_${id}.xlsx`;
    link.click()

  }

  const tableCollapse = useCallback(
    (row) => (
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={2}>
        <Grid display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setNewCollapse((prev) => ({ ...prev, split_payment_id: row.id }));
              setModal("collapse.create");
              setMultiple(collapse[row.id].map((c) => c.contract_number) || []);
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
                <TableCell>Correspondencia</TableCell>
                <TableCell>Vites</TableCell>
                <TableCell>Correspondencia Vites</TableCell>
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
                    {row.payment_correspondence ? formatCurrency(Number(row.payment_correspondence).toFixed(2) || 0, "$") : "0"}
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={row.total_vite ? 16 : 12} color={row.total_vite ? "text.main" : "error.main"}>
                      {row.total_vite || "No ha pagado"}
                    </Typography>
                  </TableCell>
                  <TableCell>{row.vite_correspondence || "0"}</TableCell>
                  <TableCell>
                    <Grid display="flex" justifyContent="flex-end" gap={1}>
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

    const { status, data } = await $Split.add(newRow);

    if (status) {
      setRows((prev) => [...prev, { ...newRow, id: data.data }]);
      setFeedback({ open: true, message: "Split de pagos creado exitosamente.", status: "success" });
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

    const { status } = await $Split.update(newRow);

    if (status) {
      setRows((prev) => prev.map((p) => (p.id === newRow.id ? newRow : p)));
      setFeedback({ open: true, message: "Split de pagos actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDelete = async () => {
    const { status } = await $Split.delete(newRow);

    if (status) {
      setRows((prev) => prev.filter((p) => p.id !== newRow.id));
      setFeedback({ open: true, message: "Split de pagos eliminado exitosamente.", status: "success" });
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

    const { status } = await $Split.approved.add({ split_payment_id: newCollapse.split_payment_id, contract_numbers: multiple });

    if (status) {
      setFeedback({ open: true, message: "Se asignaron los contratos al split de pagos exitosamente.", status: "success" });
      fetchCollapse(newCollapse.split_payment_id);
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

    const { status } = await $Split.approved.update({
      id: newCollapse.id,
      contract_number: newCollapse.contract_number,
      split_payment_id: newCollapse.split_payment_id,
    });

    if (status) {
      setFeedback({ open: true, message: "Split de pagos aprobados actualizado exitosamente.", status: "success" });
      fetchCollapse(newCollapse.split_payment_id);
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDeleteCollapse = async () => {
    const { status } = await $Split.approved.delete(newCollapse);

    if (status) {
      setFeedback({ open: true, message: "Split de pagos aprobados eliminado exitosamente.", status: "success" });
      fetchCollapse(newCollapse.split_payment_id);
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onSplit = async () => {
    setLoading((prev) => ({ ...prev, split: newRow.id }));

    const { status } = await $Split.generate({ id: newRow.id });

    if (status) {
      setFeedback({ open: true, message: "Split generado exitosamente.", status: "success" });
      onClearFields();
      fetchCollapse(newRow.id);
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, split: null }));
  };

  const fetchData = async () => {
    await (async () => {
      const { status, data } = await $Split.get();

      if (status) {
        setRows(data.data);
      }
    })();
    await (async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        setContracts(data.data.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}));
      }
    })();

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  const fetchCollapse = async (split_payment_id) => {
    setLoading((prev) => ({ ...prev, collapse: split_payment_id }));

    const { status, data } = await $Split.approved.get({ split_payment_id });

    if (status) {
      setCollapse((prev) => ({ ...prev, [split_payment_id]: data.data }));
    }

    setLoading((prev) => ({ ...prev, collapse: null }));
  };

  useEffect(() => {
    if ($Split) {
      (async () => {
        await fetchData();
      })();
    }
  }, [$Split]);


  return (
    <>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable loading={loading.fetching} headCells={tableHeadCells} rows={rows} collapse={tableCollapse} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} split de pagos</DialogTitle>
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
              <NumericFormat
                customInput={TextField}
                label="Dinero total"
                variant="outlined"
                value={newRow.total_money}
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography>$</Typography>
                    </InputAdornment>
                  ),
                }}
                thousandSeparator
                onValueChange={({ floatValue }) =>
                  onChangeFields({
                    target: {
                      name: "total_money",
                      value: floatValue,
                    },
                  })
                }
              />
              <DatePicker
                label="Fecha de pago"
                value={dayjs(newRow.payment_date)}
                format="DD/MM/YYYY"
                slotProps={{ textField: { error: false } }}
                onChange={(value) =>
                  onChangeFields({
                    target: {
                      name: "payment_date",
                      value: value.toDate(),
                    },
                  })
                }
                sx={{ width: "100%" }}
              />
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newRow.is_Cronjob}
                      onChange={({ target }) => onChangeFields({ target: { name: "is_Cronjob", value: target.checked } })}
                    />
                  }
                  label="Pago automático"
                />
              </FormGroup>
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
        <DialogTitle>Eliminar split de pagos de la lista</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este split de pagos de la lista?</DialogContentText>
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
        <DialogTitle>Split de pagos</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que desea hacer split de pagos?</DialogContentText>
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
        <DialogTitle>Eliminar split de pagos aprobados de la lista</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este split de pagos aprobados de la lista?</DialogContentText>
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

export default PaymentSplit;
