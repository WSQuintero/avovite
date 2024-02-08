import {
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import SupplierService from "../Services/supplier.service";
import useSession from "../Hooks/useSession";
import EnhancedTable from "../Components/EnhancedTable";
import PageWrapper from "../Components/PageWrapper";
import { AvoviteWhiteIcon } from "../Components/Icons";

const InitialState = { id: null, name: "", asWork: "" };

function TicketList() {
  const [session] = useSession();
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState(InitialState);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({ fetching: true });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const isValidForm = useMemo(() => newRow.name && newRow.asWork && newRow.asWork.length >= 10, [newRow]);
  const $Supplier = useMemo(() => (session.token ? new SupplierService(session.token) : null), [session.token]);
  const tableHeadCells = useMemo(
    () => [
      {
        id: "name",
        label: "Título",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "asWork",
        label: "Descripción",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" gap={1}>
            <IconButton
              onClick={() => {
                setNewRow({ id: row.id, name: row.name, asWork: row.asWork });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setNewRow({ id: row.id, name: row.name, asWork: row.asWork });
                setModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
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
    setNewRow(InitialState);
  };

  const onCreate = async (event) => {
    event.preventDefault();

    if (!isValidForm) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status, data } = await $Supplier.add(newRow);

    if (status) {
      setRows((prev) => [...prev, { ...newRow, id: data.data }]);
      setFeedback({ open: true, message: "Proveedor creado exitosamente.", status: "success" });
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

    const { status } = await $Supplier.update(newRow);

    if (status) {
      setRows((prev) => prev.map((p) => (p.id === newRow.id ? newRow : p)));
      setFeedback({ open: true, message: "Proveedor actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDelete = async () => {
    const { status } = await $Supplier.delete(newRow);

    if (status) {
      setRows((prev) => prev.filter((p) => p.id !== newRow.id));
      setFeedback({ open: true, message: "Proveedor eliminado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const fetchData = async () => {
    const { status, data } = await $Supplier.get();

    if (status) {
      setRows([
        { id: 1, name: "Ticket 001", asWork: "Requerimiento de cambio de información para el ticket 001" },
        { id: 2, name: "Ticket 002", asWork: "Requerimiento de cambio de información para el ticket 002" },
        { id: 3, name: "Ticket 003", asWork: "Requerimiento de cambio de información para el ticket 003" },
        { id: 4, name: "Ticket 004", asWork: "Requerimiento de cambio de información para el ticket 004" },
        { id: 5, name: "Ticket 005", asWork: "Requerimiento de cambio de información para el ticket 005" },
      ]);
      setLoading((prev) => ({ ...prev, fetching: false }));
    }
  };

  useEffect(() => {
    if ($Supplier) {
      (async () => {
        await fetchData();
      })();
    }
  }, [$Supplier]);

  return (
    <PageWrapper>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
          <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
        </Box>
        <Typography fontWeight={600} color="primary.main">
          Solicitudes de actualización de datos
        </Typography>
      </Stack>
      <Grid display="flex" flexDirection="column" gap={2} marginTop="20px">
        <EnhancedTable loading={loading.fetching} headCells={tableHeadCells} rows={rows} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} proveedor</DialogTitle>
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
              <TextField label="Nombre" name="name" value={newRow.name} onChange={onChangeFields} fullWidth />
              <TextField
                multiline
                fullWidth
                rows={12}
                label="Descripción"
                name="asWork"
                value={newRow.asWork}
                onChange={onChangeFields}
                helperText="Mínimo 10 caracteres"
              />
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
        <DialogTitle>Eliminar proveedor de la lista</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este proveedor de la lista?</DialogContentText>
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
    </PageWrapper>
  );
}

export default TicketList;
