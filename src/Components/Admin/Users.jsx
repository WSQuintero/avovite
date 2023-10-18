import { useEffect, useMemo, useState } from "react";
import { MaterialReactTable } from "material-react-table";
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
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  FileDownload as DownloadIcon,
  DeleteOutlined as DeleteIcon,
  EditOutlined as EditIcon,
  AdminPanelSettingsOutlined as SettingsIcon,
} from "@mui/icons-material";
import useUser from "../../Hooks/useUser";
import useSession from "../../Hooks/useSession";
import { exportWorksheet } from "../../utilities";
import { LoadingButton } from "@mui/lab";
import PhoneField from "react-phone-input-2";

function Users() {
  const [{ token }] = useSession();
  const $User = useUser();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: null,
    fullname: "",
    email: "",
    cellphone: "",
    rol: "-1",
  });
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullname",
        id: "fullname",
        header: "Nombre completo",
      },
      {
        accessorKey: "email",
        id: "email",
        header: "Correo",
      },
      {
        accessorKey: "cellphone",
        id: "cellphone",
        header: "Teléfono",
      },
      {
        accessorKey: "id",
        id: "id",
        header: "Acciones",
        Cell: ({ row: { original } }) => (
          <Grid display="flex">
            <Tooltip title="Editar rol" arrow>
              <IconButton
                onClick={() => {
                  setUser(original);
                  setModal("user-update-role");
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar" arrow>
              <IconButton
                onClick={() => {
                  setUser(original);
                  setModal("user-update");
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar" arrow>
              <IconButton
                color="error"
                onClick={() => {
                  setUser(original);
                  setModal("user-delete");
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        ),
      },
    ],
    []
  );

  const clear = () => {
    setUser({
      id: null,
      fullname: "",
      email: "",
      cellphone: "",
      rol: "-1",
    });
  };

  const validate = (values = null) => {
    if (values) {
      return values.reduce((a, c) => a && !(user[c] === "" || user[c] === "-1"), true);
    }
    return user.fullname && user.email && user.cellphone && user.rol !== "-1";
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleExportData = () => {
    exportWorksheet(
      users.map((u) => ({ Nombre: u.fullname, Correo: u.email, Telefono: u.cellphone })),
      "users.xlsx"
    );
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    if (!validate()) {
      feedback.set("error", "Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    const { status, data } = await $User.add(user);

    if (status) {
      feedback.set("success", "Usuario creado con exito.");
      clear();
      setModal(null);
      setUsers((prev) => [...prev, data]);
    } else {
      feedback.set("error", "Error al crear el usuario.");
    }

    setLoading(false);
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    if (!validate()) {
      feedback.set("error", "Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    const { status } = await $User.update(user);

    if (status) {
      feedback.set("success", "Usuario actualizado con exito.");
      clear();
      setModal(null);
      setUsers((prev) => prev.map((u) => (user.id === u.id ? user : u)));
    } else {
      feedback.set("error", "Error al actualizar el usuario.");
    }

    setLoading(false);
  };

  const handleUpdateUserRole = async (event) => {
    event.preventDefault();

    if (!validate(["rol"])) {
      feedback.set("error", "Todos los campos son obligatorios.");
      return;
    }

    setLoading(true);

    const { status } = await $User.updateRole({ id: user.id, role: user.rol });

    if (status) {
      feedback.set("success", "Rol actualizado con exito.");
      clear();
      setModal(null);
      setUsers((prev) => prev.map((u) => (user.id === u.id ? user : u)));
    } else {
      feedback.set("error", "Error al actualizar el usuario.");
    }

    setLoading(false);
  };

  const handleDeleteUser = async () => {
    if (!user.id) {
      return;
    }

    setLoading(true);

    const { status } = await $User.delete({ id: user.id });

    if (status) {
      feedback.set("success", "Usuario eliminado con exito.");
      clear();
      setModal(null);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } else {
      feedback.set("error", "Error al eliminar el usuario.");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        const { status, data } = await $User.get();

        if (status) {
          setUsers(data.data);
          setLoading(false);
        }
      })();
    }
  }, [token]);

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={users}
        enableColumnFilterModes
        enableColumnOrdering
        muiTablePaperProps={{ elevation: 0 }}
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        state={{ showSkeletons: loading }}
        renderBottomToolbarCustomActions={() => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="text" color="primary" onClick={handleExportData} startIcon={<DownloadIcon />}>
              Exportar a Excel
            </Button>
          </Box>
        )}
      />

      <Dialog
        fullWidth
        maxWidth="sm"
        open={modal === "user-create" || modal === "user-update"}
        PaperProps={{ elevation: 1 }}
        onClose={() => {
          setModal(null);
          clear();
        }}
      >
        <DialogTitle>{modal === "user-create" ? "Agregar" : "Editar"} usuario</DialogTitle>
        <DialogContent>
          <Box
            id="form-create-user"
            component="form"
            paddingY={2}
            onSubmit={modal === "user-create" ? handleCreateUser : handleUpdateUser}
          >
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="fullname"
                  value={user.fullname}
                  onChange={handleInputChange}
                />
                <TextField fullWidth label="Correo" name="email" value={user.email} onChange={handleInputChange} />
              </Stack>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <PhoneField
                  enableSearch={true}
                  value={user.cellphone}
                  country="co"
                  specialLabel="Teléfono de Contacto"
                  autoFormat={true}
                  inputStyle={{
                    width: "100%",
                  }}
                  inputProps={{
                    name: "cellphone",
                    required: true,
                  }}
                  isValid={(value, country) => {
                    if (value.match(/12345/)) {
                      return "Invalid value:" + value + ", " + country.name;
                    } else {
                      return true;
                    }
                  }}
                  onChange={(value) => handleInputChange({ target: { name: "cellphone", value } })}
                />
                <TextField fullWidth select label="Rol" name="rol" value={user.rol} onChange={handleInputChange}>
                  <MenuItem value="-1" disabled>
                    Seleccionar opción
                  </MenuItem>
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>Miembro</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setModal(null);
              clear();
            }}
          >
            Cancelar
          </Button>
          <LoadingButton variant="contained" type="submit" form="form-create-user" loading={loading}>
            {modal === "user-create" ? "Crear" : "Editar"}
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={modal === "user-update-role"}
        PaperProps={{ elevation: 1 }}
        onClose={() => {
          setModal(null);
          clear();
        }}
      >
        <DialogTitle>Editar rol del usuario</DialogTitle>
        <DialogContent>
          <Box id="form-update-role-user" component="form" paddingY={2} onSubmit={handleUpdateUserRole}>
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
                <TextField fullWidth select label="Rol" name="rol" value={user.rol} onChange={handleInputChange}>
                  <MenuItem value="-1" disabled>
                    Seleccionar opción
                  </MenuItem>
                  <MenuItem value={1}>Admin</MenuItem>
                  <MenuItem value={0}>Miembro</MenuItem>
                </TextField>
              </Stack>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setModal(null);
              clear();
            }}
          >
            Cancelar
          </Button>
          <LoadingButton variant="contained" type="submit" form="form-update-role-user" loading={loading}>
            Editar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={modal === "user-delete"}
        PaperProps={{ elevation: 1 }}
        onClose={() => {
          setModal(null);
          clear();
        }}
      >
        <DialogTitle>Eliminar usuario</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que deseas eliminar este usuario? Esta acción no podrá revertirse.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setModal(null);
              clear();
            }}
          >
            Cancelar
          </Button>
          <LoadingButton variant="contained" loading={loading} onClick={handleDeleteUser}>
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
          severity={feedback.status}
          sx={{ width: "100%" }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Users;
