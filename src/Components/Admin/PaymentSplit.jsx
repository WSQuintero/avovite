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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Snackbar,
  TextField,
  Typography,
  alpha,
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

const RowState = { id: null, total_money: "", payment_date: "", is_Cronjob: false };
const CollapseState = { id: null, contract_number: "", split_payment_id: "" };

function PaymentSplit() {
  const [session] = useSession();
  const [contracts, setContracts] = useState({});
  const [rows, setRows] = useState([]);
  const [collapse, setCollapse] = useState({});
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
            <LoadingButton loading={loading.split === row.id} size="small" variant="contained" onClick={() => onSplit(row.id)}>
              Split
            </LoadingButton>
          </Grid>
        ),
      },
    ],
    [collapse, loading.split]
  );
  const tableCollapse = useCallback(
    (row) => (
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={2}>
        <Grid display="flex" justifyContent="space-between">
          <Typography variant="h4">Split de pagos aprobados</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              setNewCollapse((prev) => ({ ...prev, split_payment_id: row.id }));
              setModal("collapse.create");
            }}
          >
            Crear
          </Button>
        </Grid>
        {loading.collapse === row.id ? (
          <LinearProgress />
        ) : (
          <List>
            <ListItem>
              <ListItemIcon sx={{ minWidth: 128 + 8 }}>
                <Typography color="primary.main" fontWeight={600}>
                  Contrato
                </Typography>
              </ListItemIcon>
              <ListItemText primary="Correspondencia" primaryTypographyProps={{ color: "primary.main", fontWeight: 600 }} />
            </ListItem>
            {(collapse[row.id] || []).map((p) => (
              <ListItem
                key={p.id}
                secondaryAction={
                  <Grid display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton
                      onClick={() => {
                        setNewCollapse(p);
                        setModal("collapse.update");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setNewCollapse(p);
                        setModal("collapse.delete");
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                }
                sx={(t) => ({
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: alpha(t.palette.primary.main, 0.1),
                  },
                })}
              >
                <ListItemIcon sx={{ minWidth: 128 + 8 }}>
                  <Typography color="text.primary">AV-{p.contract_number}</Typography>
                </ListItemIcon>
                <ListItemText primary={formatCurrency(p.payment_correspondence, "$")} />
              </ListItem>
            ))}
          </List>
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

  const onChangeFieldsCollapse = ({ target }) => {
    const { name, value } = target;
    setNewCollapse((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setNewRow(RowState);
    setNewCollapse(CollapseState);
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

    if (!isValidFormCollapse) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Split.approved.add(newCollapse);

    if (status) {
      setFeedback({ open: true, message: "Split de pagos aprobados creado exitosamente.", status: "success" });
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

  const onSplit = async (id) => {
    setLoading((prev) => ({ ...prev, split: id }));

    const { status } = await $Split.generate({ id });

    if (status) {
      setFeedback({ open: true, message: "Split generado exitosamente.", status: "success" });
      fetchCollapse(id);
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
                  label="Cronjob"
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

      <Dialog open={modal === "collapse.create" || modal === "collapse.update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} split de pagos aprobados</DialogTitle>
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
              <TextField
                select
                fullWidth
                label="Contrato"
                name="contract_number"
                value={newCollapse.contract_number}
                onChange={onChangeFieldsCollapse}
              >
                {Object.values(contracts).map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    AV-{c.id}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button
              onClick={modal === "collapse.create" ? onCreateCollapse : onUpdateCollapse}
              variant="contained"
              disabled={!isValidFormCollapse}
            >
              {modal === "collapse.create" ? "Crear" : "Editar"}
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
