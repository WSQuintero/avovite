import { useEffect, useMemo, useState } from "react";
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
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AvoviteWhiteIcon } from "../Components/Icons";
import EnhancedTable from "../Components/EnhancedTable";
import PageWrapper from "../Components/PageWrapper";
import TicketService from "../Services/ticket.service";
import useSession from "../Hooks/useSession";
import TicketModal from "../Components/Admin/TicketDetailModal";
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

function TicketList({ handleClick }) {
  const [session] = useSession();
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState(InitialState);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({ fetching: true });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const $Ticket = useMemo(() => (session.token ? new TicketService(session.token) : null), [session.token]);
  const [actualTicket, setActualTicket] = useState(null);
  const [actualTicketId, setActualTicketId] = useState(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false); // State to control the message modal
  const [messages, setMessages] = useState([]);

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
        width: 400,
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
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Select
            value={row.state}
            onChange={(event) => handleChangeState(event, row)}
            sx={{ minWidth: 100, height: "40px", fontSize: "15px" }}
          >
            <MenuItem value="Created">Created</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        ),
      },
      {
        id: "actions",
        label: "Archivos adjuntos",
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
      // Se agrega botón para enviar mensajes
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

  const closeMessages = () => {
    setMessageModalOpen(false);
  };

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

  const handleChangeState = async (event, row) => {
    const newTicketStatus = event.target.value;
    try {
      const { status } = await $Ticket.changeTicketStatus({ id: row.id, ticketStatus: newTicketStatus });
      if (status) {
        setRows((prevRows) => prevRows.map((prevRow) => (prevRow.id === row.id ? { ...prevRow, state: newTicketStatus } : prevRow)));
        setFeedback({ open: true, message: "Estado de ticket actualizado exitosamente.", status: "success" });
      } else {
        setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
      }
    } catch (error) {
      console.error("Error al cambiar el estado del ticket:", error);
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const handleSeeDetail = async (ticket) => {
    try {
      const { status, data } = await $Ticket.getById({ id: ticket.id });
      if (status) {
        setActualTicket(data.data?.tiket);
        setModal("detail");
      }
    } catch (error) {
      console.error("Error al obtener detalles del ticket:", error);
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
    setFeedback({ ...feedback, open: false });
  };

  const fetchData = async () => {
    try {
      const { status, data } = await $Ticket.getAll();
      if (status) {
        setRows(
          data.data.map((ticket) => ({
            id: ticket.id,
            name: ticket.title,
            created_at:ticket.created_at,
            asWork: ticket.description,
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
    } catch (error) {
      console.error("Error al obtener los tickets:", error);
    }
  };

  useEffect(() => {
    if ($Ticket) {
      fetchData();
    }
  }, [$Ticket]);

  return (
    <>
      <PageWrapper>
    <BackButton/>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Solicitudes de actualización de datos
          </Typography>
        </Stack>
        <Grid display="flex" flexDirection="column" gap={2} marginTop="20px">
          <EnhancedTable loading={loading.fetching} headCells={tableHeadCells} rows={rows} initialOrder="desc" />
        </Grid>

        {actualTicket && (
          <TicketModal
            ticket={actualTicket[0]}
            open={modal === "detail"}
            onClose={() => setModal(null)}
            actualTicketId={actualTicketId}
            setActualTicketId={setActualTicketId}
          />
        )}
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

        <MessageModal
          onClose={closeMessages}
          open={messageModalOpen}
          actualTicketId={actualTicketId}
          setActualTicketId={setActualTicketId}
          messages={messages}
          setMessages={setMessages}
        />
      </PageWrapper>
    </>
  );
}

export default TicketList;
