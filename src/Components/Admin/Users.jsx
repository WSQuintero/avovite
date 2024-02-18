import { useEffect, useMemo, useRef, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
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
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { DOCUMENT_TYPES } from "../../utilities/constants";
import DialogSendEmailAndSMS from "../Dialogs/SendEmailAndSMS";
import DialogImportContacts from "../Dialogs/ImportContacts";
import { useSnackbar } from "notistack";

function Users() {
  const [{ token }] = useSession();
  const { enqueueSnackbar } = useSnackbar();
  const $User = useUser();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    id: null,
    fullname: "",
    email: "",
    cellphone: "",
    rol: "-1",
    email_validated: "",
    birthdate: "",
    id_type: "-1",
    id_number: "",
    id_location_expedition: "",
  });
  const [loading, setLoading] = useState({ fetching: true, importing: false, sending: false });
  const [modal, setModal] = useState(null);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const [selectedContacts, setSelectedContacts] = useState({});
  const selectedContactsValues = useMemo(() => Object.keys(selectedContacts), [selectedContacts]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "fullname",
        id: "fullname",
        header: "Nombre completo",
      },{
        accessorKey: "id_type",
        id: "id_type",
        header: "Tipo de documento",
      },
      {
        accessorKey: "id_number",
        id: "id_number",
        header: "Número de documento",
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
          <Grid display="flex" justifyContent="flex-end">
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
      email_validated: "",
      birthdate: "",
      id_type: "",
      id_number: "",
      id_location_expedition: "",
    });
  };

  const validate = (values = null) => {
    if (values) {
      return values.reduce((a, c) => a && !(user[c] === "" || user[c] === "-1" || user[c] === null), true);
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
      setFeedback({ open: true, message: "Todos los campos son obligatorios.", status: "error" });
      return;
    }

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $User.add(user);

    if (status) {
      setFeedback({ open: true, message: "Usuario creado con exito.", status: "success" });
      clear();
      setModal(null);
      setUsers((prev) => [...prev, data]);
    } else {
      setFeedback({ open: true, message: "Error al crear el usuario.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

    if (!validate(["fullname", "email", "cellphone",  "id_type", "id_number", "id_location_expedition"])) {
      setFeedback({ open: true, message: "Todos los campos son obligatorios.", status: "error" });
      return;
    }

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status } = await $User.update({
      id: user.id,
      fullname: user.fullname,
      cellphone: user.cellphone,
      email: user.email,
      // email_validated: user.email_validated,
      // birthdate: dayjs(user.birthdate).format("YYYY-MM-DD"),
      id_type: user.id_type,
      id_number: user.id_number,
      id_location_expedition: user.id_location_expedition,
    });

    if (status) {
      clear();
      setModal(null);
      setUsers((prev) => prev.map((u) => (user.id === u.id ? user : u)));
      setFeedback({ open: true, message: "Usuario actualizado con exito.", status: "success" });
    } else {
      setFeedback({ open: true, message: "Error al actualizar el usuario.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  const handleUpdateUserRole = async (event) => {
    event.preventDefault();

    if (!validate(["rol"])) {
      setFeedback({ open: true, message: "Todos los campos son obligatorios.", status: "error" });
      return;
    }

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status } = await $User.updateRole({ id: user.id, role: String(user.rol) });

    if (status) {
      setFeedback({ open: true, message: "Rol actualizado con exito.", status: "success" });
      clear();
      setModal(null);
      setUsers((prev) => prev.map((u) => (user.id === u.id ? user : u)));
    } else {
      setFeedback({ open: true, message: "Error al actualizar el usuario.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  const handleDeleteUser = async () => {
    if (!user.id) {
      return;
    }

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status } = await $User.delete({ id: user.id });

    if (status) {
      setFeedback({ open: true, message: "Usuario eliminado con exito.", status: "success" });
      clear();
      setModal(null);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } else {
      setFeedback({ open: true, message: "Error al eliminar el usuario.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  const handleImportUsers = async ({ file, massive }) => {
    setLoading((prev) => ({ ...prev, importing: true }));

    const { status } = await $User.import({ file, sendemails: massive });

    if (status) {
      setFeedback({ open: true, message: "Usuarios importados exitosamente.", status: "success" });
      await fetchData();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoading((prev) => ({ ...prev, importing: false }));
  };

  const handleSendEmailAndSMS = async ({ form, statuses }) => {
    setLoading((prev) => ({ ...prev, sending: true }));

    let success = { email: false, sms: false };

    const selectedUsers = selectedContactsValues.map((index) => users[index]);

    if (statuses.sms) {
      const { status } = await $User.sendSMS({
        massive: statuses.massive,
        tpoa: form.sms.subject,
        message: form.sms.template,
        phoneNumbers: selectedUsers.map((u) => u.cellphone),
      });

      if (status) {
        enqueueSnackbar("SMS enviados con exito.", { variant: "success" });
      } else {
        enqueueSnackbar("Ha ocurrido un error inesperado enviando SMS.", { variant: "error" });
      }

      success.sms = status;
    }

    if (statuses.email) {
      const { status } = await $User.sendEmail({
        massive: statuses.massive,
        subject: form.email.subject,
        html: form.email.template,
        to: selectedUsers.map((u) => ({ email: u.email, name: u.fullname })),
      });

      if (status) {
        enqueueSnackbar("Correos enviados con exito.", { variant: "success" });
      } else {
        enqueueSnackbar("Ha ocurrido un error inesperado enviando correos.", { variant: "error" });
      }

      success.email = status;
    }

    setLoading((prev) => ({ ...prev, sending: false }));

    if (success.email || success.sms) {
      setModal(null);
    }

    return success.email || success.sms;
  };

  const fetchData = async () => {
    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $User.get();

    if (status) {
      setUsers(data.data);
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchData();
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
        enableRowSelection
        localization={MRT_Localization_ES}
        muiTablePaperProps={{ elevation: 0 }}
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        state={{ showSkeletons: loading.fetching, rowSelection: selectedContacts }}
        renderTopToolbarCustomActions={() => (
          <Stack direction="row" spacing={1}>
            <LoadingButton loading={loading.importing} variant="contained" size="small" onClick={() => setModal("users-import")}>
              Importar usuarios
            </LoadingButton>
            <Button variant="contained" size="small" color="primary" onClick={handleExportData}>
              Exportar usuarios
            </Button>
            <Button
              disabled={selectedContactsValues.length === 0}
              variant="contained"
              size="small"
              sx={{ gap: 1 }}
              onClick={() => setModal("users-send-email-sms")}
            >
              Enviar email o sms
            </Button>
          </Stack>
        )}
        onRowSelectionChange={setSelectedContacts}
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
          <Box id="form-create-user" component="form" paddingY={2} onSubmit={modal === "user-create" ? handleCreateUser : handleUpdateUser}>
            <Stack spacing={2}>
              <TextField fullWidth label="Nombre" name="fullname" value={user.fullname} onChange={handleInputChange} />
              <TextField
                fullWidth
                disabled={modal === "user-update"}
                label="Correo"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
                {/* <FormControl fullWidth>
                  <FormLabel id="user_email_validated">Correo validado</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="user_email_validated"
                    name="email_validated"
                    value={user.email_validated}
                    onChange={handleInputChange}
                  >
                    <FormControlLabel value={0} control={<Radio />} label="No" />
                    <FormControlLabel value={1} control={<Radio />} label="Si" />
                  </RadioGroup>
                </FormControl> */}
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
              {/* <FormControl fullWidth>
                <DatePicker
                  disableFuture
                  label="Fecha de nacimiento"
                  name="birthdate"
                  slotProps={{
                    textField: {
                      error: false,
                    },
                  }}
                  value={dayjs(user.birthdate)}
                  onChange={(value) => handleInputChange({ target: { name: "birthdate", value: value.toDate() } })}
                />
              </FormControl> */}
              <TextField
                select
                required
                fullWidth
                label="Tipo de documento"
                name="id_type"
                value={user.id_type}
                onChange={handleInputChange}
              >
                <MenuItem value="-" selected disabled>
                  Seleccione una opción
                </MenuItem>
                {Object.keys(DOCUMENT_TYPES).map((key) => (
                  <MenuItem key={key} value={key}>
                    {DOCUMENT_TYPES[key]}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                required
                fullWidth
                label="Número de documento"
                name="id_number"
                value={user.id_number}
                onChange={handleInputChange}
              />
              <TextField
                required
                fullWidth
                label="Lugar de expedición del documento"
                name="id_location_expedition"
                value={user.id_location_expedition}
                onChange={handleInputChange}
              />
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
          <LoadingButton variant="contained" type="submit" form="form-create-user" loading={loading.fetching}>
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
                  <MenuItem value={"1"}>Admin</MenuItem>
                  <MenuItem value={"0"}>Miembro</MenuItem>
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
          <LoadingButton variant="contained" type="submit" form="form-update-role-user" loading={loading.fetching}>
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
          <DialogContentText>¿Estás seguro que deseas eliminar este usuario? Esta acción no podrá revertirse.</DialogContentText>
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
          <LoadingButton variant="contained" loading={loading.fetching} onClick={handleDeleteUser}>
            Eliminar
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <DialogSendEmailAndSMS
        open={modal === "users-send-email-sms"}
        loading={loading.sending}
        onClose={() => setModal(null)}
        onSubmit={handleSendEmailAndSMS}
      />

      <DialogImportContacts
        open={modal === "users-import"}
        loading={loading.importing}
        onClose={() => setModal(null)}
        onSubmit={handleImportUsers}
      />

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setFeedback((prev) => ({ ...prev, open: false }))}
      >
        <Alert onClose={() => setFeedback((prev) => ({ ...prev, open: false }))} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Users;
