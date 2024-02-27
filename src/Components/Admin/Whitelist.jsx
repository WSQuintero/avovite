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
  MenuItem,
  Snackbar,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import WHiteListService from "../../Services/whitelist.service";
import useSession from "../../Hooks/useSession";
import EnhancedTable from "../EnhancedTable";
import { CONTRACT_TYPES } from "../../utilities/constants";
import BackButton from "../BackButton";

function Whitelist() {
  const [session] = useSession();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ id: null, email: "", mortgage: "-" });
  const [modal, setModal] = useState(null);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const isValidUser = useMemo(() => user.email && user.mortgage !== "-", [user]);
  const $Whitelist = useMemo(() => (session.token ? new WHiteListService(session.token) : null), [session.token]);

  const productsHeadCells = useMemo(
    () => [
      {
        id: "email",
        label: "Correo",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "mortgage",
        label: "Tipo de contrato",
        align: "left",
        disablePadding: false,
        format: (value) => (value === 1 ? CONTRACT_TYPES.mortgage : CONTRACT_TYPES.standard),
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
                setUser({ id: row.id, email: row.email, mortgage: row.mortgage === 1 ? "mortgage" : "standard" });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setUser({ id: row.id, email: row.email, mortgage: row.mortgage === 1 ? "mortgage" : "standard" });
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
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setUser({ id: null, email: "", mortgage: "-" });
  };

  const onCreateProduct = async (event) => {
    event.preventDefault();

    if (!isValidUser) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status, data } = await $Whitelist.add({ email: user.email, mortgage: user.mortgage === "mortgage" });

    if (status) {
      setUsers((prev) => [...prev, { ...user, id: data.data }]);
      setFeedback({ open: true, message: "Usuario creado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdateProduct = async (event) => {
    event.preventDefault();

    if (!isValidUser) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Whitelist.update({ id: user.id, email: user.email, mortgage: user.mortgage === "mortgage" });

    if (status) {
      setUsers((prev) => prev.map((p) => (p.id === user.id ? { ...user, mortgage: user.mortgage === "mortgage" ? 1 : 0 } : p)));
      setFeedback({ open: true, message: "Usuario actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDeleteProduct = async () => {
    const { status } = await $Whitelist.delete(user);

    if (status) {
      setUsers((prev) => prev.filter((p) => p.id !== user.id));
      setFeedback({ open: true, message: "Usuario eliminado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const fetchWhitelist = async () => {
    const { status, data } = await $Whitelist.get();

    if (status) {
      setUsers(data.data);
    }
  };

  useEffect(() => {
    if ($Whitelist) {
      (async () => {
        await fetchWhitelist();
      })();
    }
  }, [$Whitelist]);

  return (
    <>
    <BackButton/>

      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={productsHeadCells} rows={users} />
      </Grid>

      <Dialog open={modal === "create" || modal === "update"} onClose={onClearFields} maxWidth="md" fullWidth>
        <DialogTitle color="primary.main">{modal === "create" ? "Crear" : "Editar"} producto</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={modal === "create" ? onCreateProduct : onUpdateProduct}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <TextField label="Correo" name="email" value={user.email} onChange={onChangeFields} fullWidth />
              <TextField select label="Tipo de contrato" name="mortgage" value={user.mortgage} onChange={onChangeFields} fullWidth>
                <MenuItem disabled value="-">
                  Seleccionar opción
                </MenuItem>
                {Object.keys(CONTRACT_TYPES).map((key) => (
                  <MenuItem key={key} value={key}>
                    {CONTRACT_TYPES[key]}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button onClick={modal === "create" ? onCreateProduct : onUpdateProduct} variant="contained" disabled={!isValidUser}>
              {modal === "create" ? "Crear" : "Editar"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={modal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar usuario de la lista</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este usuario de la lista?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteProduct}>
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

export default Whitelist;
