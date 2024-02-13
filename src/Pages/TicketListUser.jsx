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

const InitialState = { id: null, name: "", asWork: "" };

function TicketListUser({ handleClick }) {
  const [session] = useSession();
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState(InitialState);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState({ fetching: true });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const $Ticket = useMemo(() => (session.token ? new TicketService(session.token) : null), [session.token]);
  const [actualTicket, setActualTicket] = useState(null);

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
        format: (value) => value,
      },
      {
        id: "actions",
        label: "Acciones",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Button variant="contained" color="primary" sx={{ width: "100px", fontSize: "12px" }} onClick={() => handleDownload(row)}>
            Archivos
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
    ],
    []
  );

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

  function handleDownload(row) {
    const fileUrl = row.fileUrl;
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "archivo";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  const resetFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
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
          .filter((tick) => tick.idUser === session.user.id)
          .map((ticket) => ({
            id: ticket.id,
            name: ticket.title,
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
  };

  useEffect(() => {
    if ($Ticket) {
      fetchData();
    }
  }, [$Ticket]);

  return (
    <>
      <PageWrapper>
      <Button variant="contained" color="primary" sx={{ position:"absolute",right:"100px", margin: "auto" }} onClick={handleClick}>
          Crear ticket
        </Button>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Hidden smDown>
          <Typography fontWeight={600} color="primary.main" sm={{display:"hidden"}}>
            Solicitudes de actualización de datos
          </Typography>

          </Hidden>
        </Stack>
        <Grid display="flex" flexDirection="column" gap={2} marginTop="20px">
          <EnhancedTable loading={loading.fetching} headCells={tableHeadCells} rows={rows} initialOrder="desc" />
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

export default TicketListUser;
