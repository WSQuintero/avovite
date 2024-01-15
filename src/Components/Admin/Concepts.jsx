import { useEffect, useMemo, useState } from "react";
import EnhancedTable from "../EnhancedTable";

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
  Snackbar,
  TextField,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import { formatDate } from "../../utilities";
import useConcept from "../../Hooks/useConcept";

function Concepts() {
  const $Concept = useConcept();
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const [concepts, setConcepts] = useState([]);
  const [selectedConcept, setSelectedConcept] = useState({ id: null, title: "", description: "" });
  const [currentModal, setCurrentModal] = useState(null);
  const isValidConcept = useMemo(() => selectedConcept.title && selectedConcept.description, [selectedConcept]);

  const conceptsHeadCells = useMemo(
    () => [
      {
        id: "id",
        label: "ID",
        align: "left",
        disablePadding: false,
      },
      {
        id: "title",
        label: "Título",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Box sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>{value}</Box>
        ),
      },
      {
        id: "description",
        label: "Descripción",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <Box sx={{ display: "-webkit-box", overflow: "hidden", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>{value}</Box>
        ),
      },
      {
        id: "actions",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" gap={1}>
            <IconButton
              onClick={() => {
                setSelectedConcept(row);
                setCurrentModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setSelectedConcept(row);
                setCurrentModal("delete");
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

  const fetchConcepts = async () => {
    const { status, data } = await $Concept.get();

    if (status) {
      setConcepts(data.data);
    }
  };

  const onChangeFields = ({ target }) => {
    const { name, value } = target;
    setSelectedConcept((prev) => ({ ...prev, [name]: value }));
  };

  const onClearFields = () => {
    setCurrentModal(null);
    setSelectedConcept({ id: null, title: "", description: "" });
  };

  const onCreateConcept = async (event) => {
    event.preventDefault();

    if (!isValidConcept) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status, data } = await $Concept.add(selectedConcept);

    if (status) {
      setConcepts((prev) => [...prev, { ...selectedConcept, id: data.data, created_at: new Date().toDateString() }]);
      setFeedback({ open: true, message: "Concepto creado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onUpdateConcept = async (event) => {
    event.preventDefault();

    if (!isValidConcept) {
      setFeedback({ open: true, message: "Todos los campos son requeridos.", status: "error" });
      return;
    }

    const { status } = await $Concept.update(selectedConcept);

    if (status) {
      setConcepts((prev) => prev.map((p) => (p.id === selectedConcept.id ? selectedConcept : p)));
      setFeedback({ open: true, message: "Concepto actualizado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const onDeleteConcept = async () => {
    const { status } = await $Concept.delete(selectedConcept);

    if (status) {
      setConcepts((prev) => prev.filter((p) => p.id !== selectedConcept.id));
      setFeedback({ open: true, message: "Concepto eliminado exitosamente.", status: "success" });
      onClearFields();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if ($Concept) {
      (async () => {
        await fetchConcepts();
      })();
    }
  }, [$Concept]);

  return (
    <>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" justifyContent="flex-end">
          <Button variant="contained" size="small" onClick={() => setCurrentModal("create")}>
            Crear
          </Button>
        </Grid>
        <EnhancedTable headCells={conceptsHeadCells} rows={concepts} />
      </Grid>

      <Dialog open={currentModal === "create" || currentModal === "update"} onClose={onClearFields} maxWidth="xl" fullWidth>
        <DialogTitle color="primary.main">{currentModal === "create" ? "Crear" : "Editar"} concepto</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={currentModal === "create" ? onCreateConcept : onUpdateConcept}
          >
            <Grid display="flex" flexDirection="column" gap={2}>
              <Grid display="flex" gap={2}>
                <TextField label="Título" name="title" value={selectedConcept.title} onChange={onChangeFields} fullWidth />
              </Grid>
              <Grid display="flex" gap={2}>
                <TextField
                  label="Descripción"
                  name="description"
                  rows={4}
                  value={selectedConcept.description}
                  onChange={onChangeFields}
                  multiline
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onClearFields}>Cancelar</Button>
            <Button onClick={currentModal === "create" ? onCreateConcept : onUpdateConcept} variant="contained" disabled={!isValidConcept}>
              {currentModal === "create" ? "Crear" : "Editar"}
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={currentModal === "delete"} onClose={onClearFields} fullWidth>
        <DialogTitle>Eliminar concepto</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este concepto?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClearFields}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteConcept}>
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

export default Concepts;
