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
  Hidden,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import useSession from "../Hooks/useSession";
import EnhancedTable from "../Components/EnhancedTable";
import PageWrapper from "../Components/PageWrapper";
import { AvoviteWhiteIcon } from "../Components/Icons";
import TicketService from "../Services/ticket.service";
import TicketModalUser from "../Components/TicketDetailModalUser";
import MessageModal from "../Components/Admin/MessageModal";
import { formatDate } from "../utilities";
import BackButton from "../Components/BackButton";

const InitialState = {
  id: "",
  name: "",
  asWork: "",
  created_at:"",
  state: "",
  actions: [
    { label: "Front Document", url: null },
    { label: "Back Document", url: null },
    { label: "Bank Document", url: null },
  ],
};

function TicketListUser({ handleClick }) {
  const [session] = useSession();
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState(InitialState);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({ fetching: true });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const $Ticket = useMemo(() => (session.token ? new TicketService(session.token) : null), [session.token]);
  const [actualTicket, setActualTicket] = useState(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false); // State to control the message modal
  const [actualTicketId, setActualTicketId] = useState(null);
  const [messages, setMessages] = useState([]);

  const tableHeadCells = useMemo(
    () => [
      {
        id: "name",
        label: "Título",
        align: "left",
        width:200,
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "asWork",
        label: "Descripción",
        align: "left",
        width:400,
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "created_at",
        label: "Creación",
        align: "left",
        disablePadding: false,
        width: 200,
        format: (value) => formatDate(value),
      },
      {
        id: "state",
        label: "Estado",
        align: "center",
        disablePadding: false,
        width:160,
        format: (value) => (
          <span style={{
            backgroundColor: value === "Completed" ? "#4CAF50" : value === "In Progress" ? "#FFEB3B" : "inherit",
            color: value === "Completed" ? "white" : value === "In Progress" ? "green" : "inherit",
            padding: "10px",
            borderRadius: "10px",
            fontSize:"12px"
          }}>
            {value}
          </span>
        ),
      },
      {
        id: "actions",
        label: "Acciones",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Button variant="contained" color="primary" sx={{ width: "100px", fontSize: "12px" }} onClick={() => handleDownload(row)} disabled={!row.actions.some((a)=>a.url!==null)}>
            Descargar
          </Button>
        ),
      },
      {
        id: "detail_ticket",
        label: "Detalle",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Button variant="contained" color="primary" sx={{ width: "100px", fontSize: "12px" }} onClick={() => handleSeeDetail(row)}>
            Ver detalle
          </Button>
        ),
      },
      {
        id: "send_message", // New column for sending message
        label: "Enviar mensaje",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Button
            variant="contained"
            color="primary"
            sx={{
              width: "150px",
              fontSize: "12px",
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                color: "#ffffff", // Cambiar a blanco al hacer hover
              },
            }}
            onClick={() => handleSendMessage(row)}
          >
            Enviar mensaje
          </Button>
        ),
      },
    ],
    []
  );

  const handleSendMessage = async (row) => {
    setActualTicketId(row.id);
    setMessageModalOpen(true);
    try {
      const { status, data } = await $Ticket.getById({ id: row.id });
      if (status) {
        // setActualTicket(data.data?.ticket); // Corregir 'tiket' a 'ticket'
        // setModal("detail");
        setMessages(data.data.messages);
      }
    } catch (error) {
      console.error("Error al obtener detalles del ticket:", error);
    }
  };

  const handleSeeDetail = async (ticket) => {
    try {
      const { status, data } = await $Ticket.getById({ id: ticket.id });

      if (status) {
        setActualTicket(data?.data?.tiket[0]);
        setModal("detail");
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  };

  const handleDownload = (row) => {
    const document=row.actions.find((a)=>a.url!==null)
    if(document){
      window.open(row.actions.find((a)=>a.url!==null).url)
    }else{
      setFeedback({ open: true, message: "No hay archivos que descargar", status: "error" });
    }
  };


  const resetFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  const closeMessages = () => {
    setMessageModalOpen(false);
  };
  const onChangeFields = ({ target }) => {
    const { name, value } = target;
    setNewRow((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setModal(null);
    setNewRow(InitialState);
  };

  const fetchData = async () => {
    const { status, data } = await $Ticket.getAll();

    if (status) {
      setRows(
        data.data
          .filter((tick) => tick.idUser === session?.user?.id)
          .map((ticket) => ({
            id: ticket.id,
            name: ticket.title,
            asWork: ticket.description,
            created_at:ticket.created_at,
            state: ticket.ticketStatus,
            actions: [
              { label: "Front Document", url: ticket.frontDocumentUrl },
              { label: "Back Document", url: ticket.backDocumentUrl },
              { label: "Bank Document", url: ticket.bankUrl },
            ],
          }))
      );

      setLoading((prev) => ({ ...prev, fetching: false }));
    }
  };

  useEffect(() => {
    if ($Ticket) {
      fetchData();
    }
  }, [$Ticket, session.user]);

  return (
    <>
      <PageWrapper>
    <BackButton/>

        <Button variant="contained" color="primary" sx={{ position: "absolute", right: "100px", margin: "auto" }} onClick={handleClick}>
          Crear ticket
        </Button>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Hidden smDown>
            <Typography fontWeight={600} color="primary.main" sm={{ display: "hidden" }}>
              Solicitudes de actualización de datos
            </Typography>
          </Hidden>
        </Stack>
        <Grid display="flex" flexDirection="column" gap={2} marginTop="20px">
          <EnhancedTable
            loading={loading.fetching}
            headCells={tableHeadCells}
            rows={rows}
            initialOrder="desc"
            initialOrderBy="creationDate"
          />
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
              // onSubmit={modal === "create" ? onCreate : onUpdate}
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
          </DialogActions>
        </Dialog>
        <TicketModalUser ticket={actualTicket} open={modal === "detail"} onClose={() => setModal(null)} />
        <MessageModal
          onClose={closeMessages}
          open={messageModalOpen}
          actualTicketId={actualTicketId}
          setActualTicketId={setActualTicketId}
          messages={messages}
          setMessages={setMessages}
        />
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

        {/* Message modal */}
      </PageWrapper>
    </>
  );
}

export default TicketListUser;
