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

const InitialState = {
  id: "",
  name: "",
  asWork: "",
  state: "",
  actions: [
    { label: 'Front Document', url: null },
    { label: 'Back Document', url: null },
    { label: 'Bank Document', url: null }
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
  const [actualTicket,setActualTicket]=useState(null)
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
        id: "state",
        label: "Estado",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Select
            value={row.state}
            onChange={(event) => handleChangeState(event, row)}
            sx={{ minWidth: 100,height:"40px",fontSize:"15px" }}
          >
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        ),
      },
      {
        id: 'actions',
        label: 'Archivos adjuntos',
        align: 'left',
        disablePadding: false,
        format: (value, row) => (
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100px", fontSize: "12px" }}
            onClick={() => handleDownload(row)}
          >
            Descargar
          </Button>
        ),
      },
      {
        id: 'detail_ticket',
        label: 'Detalle',
        align: 'left',
        disablePadding: false,
        format: (value, row) => (
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "100px", fontSize: "12px" }}
            onClick={() => handleSeeDetail(row)}
          >
            Ver detalle
          </Button>
        ),
      },
    ],
    []
  );

  const handleChangeState = async (event, row) => {
    const newTicketStatus = event.target.value;
    try {
      const { status } = await $Ticket.changeTicketStatus({ id: row.id, ticketStatus: newTicketStatus });
      if (status) {
        setRows(prevRows => prevRows.map(prevRow => prevRow.id === row.id ? { ...prevRow, state: newTicketStatus } : prevRow));
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
      const {status,data} = await $Ticket.getById({id:ticket.id}); // Replace 'your_api_endpoint' with the actual endpoint
      if(status){
        setActualTicket(data.data?.tiket); // Set the modal state to display
        setModal("detail"); // Show the modal for ticket detail
      }
    } catch (error) {
      console.error("Error fetching ticket details:", error);
    }
  };

  const handleDownload = (row) => {
    const fileUrl = row.fileUrl;
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'archivo';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const resetFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  const fetchData = async () => {
    try {
      const { status, data } = await $Ticket.getAll();
      if (status) {
        setRows(data.data.map(ticket => ({
          id: ticket.id,
          name: ticket.title,
          asWork: ticket.description,
          state: ticket.ticketStatus,
          actions: [
            { label: 'Front Document', url: ticket.frontDocumentUrl },
            { label: 'Back Document', url: ticket.backDocumentUrl },
            { label: 'Bank Document', url: ticket.bankUrl }
          ]
        })));
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

        {actualTicket&&(
        <TicketModal ticket={actualTicket[0]} open={modal === "detail"} onClose={() => setModal(null)} />
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

      </PageWrapper>
    </>
  );
}

export default TicketList;
