import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
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
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import EnhancedTable from "../Components/EnhancedTable";
import DateRangeService from "../Services/daterange.service";
import useSession from "../Hooks/useSession";
import { formatDate } from "../utilities";

const earningsHeadCells = [
  {
    id: "id_contract_date_range",
    label: "ID de Lapso",
    align: "left",
    width: "50%",
    disablePadding: false,
    format: (value) => value,
  },
  {
    id: "amount_profit",
    label: "Valor de rentabilidad",
    align: "left",
    width: "50%",
    disablePadding: false,
    format: (value) => value,
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box padding={2}>{children}</Box>}
    </Box>
  );
}

function Admin() {
  const [session] = useSession();
  const [currentTab, setCurrentTab] = useState(0);
  const [showModal, setShowModal] = useState(null);
  const [feedback, setFeedback] = useState({ show: false, message: "", status: "success" });

  // DATE RANGE
  const [dateRanges, setDateRanges] = useState([]);
  const [newDateRange, setNewDateRange] = useState({
    id: null,
    date_start_inscription: null,
    date_end_inscription: null,
    months_duration: "",
    date_start_profit: null,
  });
  const [rangeToDelete, setRangeToDelete] = useState(null);
  const $DateRange = useMemo(() => new DateRangeService(session.token), [session.token]);
  const dateRangeHeadCells = useMemo(
    () => [
      {
        id: "id",
        label: "ID",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "date_start_inscription",
        label: "Fecha inicial",
        align: "left",
        disablePadding: false,
        format: (value) => formatDate(value),
      },
      {
        id: "date_end_inscription",
        label: "Fecha final",
        align: "left",
        disablePadding: false,
        format: (value) => formatDate(value),
      },
      {
        id: "months_duration",
        label: "Duración (meses)",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "date_start_profit",
        label: "Fecha primera rentabilidad",
        align: "left",
        disablePadding: false,
        format: (value) => formatDate(value),
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
                setNewDateRange(row);
                setShowModal("create-date-range");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => setRangeToDelete(row.id)}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
  );

  const clearFields = (target) => {
    if (target === "newDateRange") {
      setNewDateRange({
        id: null,
        date_start_inscription: null,
        date_end_inscription: null,
        months_duration: "",
        date_start_profit: null,
      });
    }
  };

  const onCreateDateRange = async (event) => {
    event.preventDefault();

    const { status, data } = await $DateRange.add({
      body: {
        date_start_inscription: newDateRange.date_start_inscription,
        date_end_inscription: newDateRange.date_end_inscription,
        months_duration: parseInt(newDateRange.months_duration),
        date_start_profit: newDateRange.date_start_profit,
      },
    });

    console.log(data);

    if (status) {
      setFeedback({ show: true, status: "success", message: "Lapso creado con éxito." });
      setShowModal(null);
      clearFields("newDateRange");
      // Add to the list
    } else {
      setFeedback({ show: true, status: "error", message: "Error al crear lapso." });
    }
  };

  const onUpdateDateRange = async (event) => {
    event.preventDefault();

    const { status, data } = await $DateRange.update({
      id: newDateRange.id,
      body: {
        date_start_inscription: newDateRange.date_start_inscription,
        date_end_inscription: newDateRange.date_end_inscription,
        months_duration: parseInt(newDateRange.months_duration),
        date_start_profit: newDateRange.date_start_profit,
      },
    });

    console.log(data);

    if (status) {
      setFeedback({ show: true, status: "success", message: "Lapso actualizado con éxito." });
      setShowModal(null);
      clearFields("newDateRange");
      // Add to the list
    } else {
      setFeedback({ show: true, status: "error", message: "Error al actualizar lapso." });
    }
  };

  const onDeleteDateRange = async () => {
    const { status } = await $DateRange.delete({ id: rangeToDelete });

    if (status) {
      setFeedback({ show: true, status: "success", message: "Lapso eliminado con éxito." });
      setDateRanges((prev) => prev.filter((e) => e.id !== rangeToDelete));
      setRangeToDelete(null);
    } else {
      setFeedback({ show: true, status: "error", message: "Error al eliminar lapso." });
    }
  };

  useEffect(() => {
    if (session.token) {
      (async () => {
        const { status, data } = await $DateRange.get();

        if (status) {
          setDateRanges(data.data);
        }
      })();
    }
  }, [session.token]);

  return (
    <PageWrapper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
        >
          <Tab label="Lapsos" />
          <Tab label="Rentabilidad" />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Grid display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={() => setShowModal("create-date-range")}>
              Crear
            </Button>
          </Grid>
          <EnhancedTable
            headCells={dateRangeHeadCells}
            rows={dateRanges}
            footer={<Grid display="flex" gap={1}></Grid>}
          />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <EnhancedTable headCells={earningsHeadCells} rows={[]} footer={<Grid display="flex" gap={1}></Grid>} />
      </CustomTabPanel>

      <Dialog
        maxWidth="sm"
        open={showModal === "create-date-range"}
        onClose={() => {
          clearFields("newDateRange");
          setShowModal(null);
        }}
        fullWidth
      >
        <DialogTitle>{newDateRange.id ? "Actualizar" : "Crear"} lapso</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            paddingY={1}
            component="form"
            onSubmit={newDateRange.id ? onUpdateDateRange : onCreateDateRange}
          >
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              })}
            >
              <DatePicker
                label="Fecha inicial"
                value={dayjs(newDateRange.date_start_inscription)}
                format="DD/MM/YYYY"
                onChange={(value) =>
                  setNewDateRange((prev) => ({
                    ...prev,
                    date_start_inscription: value.toDate(),
                  }))
                }
                sx={{ width: "100%" }}
              />
              <DatePicker
                label="Fecha final"
                value={dayjs(newDateRange.date_end_inscription)}
                format="DD/MM/YYYY"
                onChange={(value) =>
                  setNewDateRange((prev) => ({
                    ...prev,
                    date_end_inscription: value.toDate(),
                  }))
                }
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("md")]: {
                  flexDirection: "column",
                },
              })}
            >
              <TextField
                label="Duración (meses)"
                type="number"
                value={newDateRange.months_duration}
                onChange={(event) =>
                  setNewDateRange((prev) => ({
                    ...prev,
                    months_duration: event.target.value,
                  }))
                }
                error={parseInt(newDateRange.months_duration) <= 0 || newDateRange.months_duration === ""}
                sx={{ width: "100%" }}
              />
              <DatePicker
                label="Fecha de primera rentabilidad"
                value={dayjs(newDateRange.date_start_profit)}
                format="DD/MM/YYYY"
                onChange={(value) =>
                  setNewDateRange((prev) => ({
                    ...prev,
                    date_start_profit: value.toDate(),
                  }))
                }
                sx={{ width: "100%" }}
              />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              clearFields("newDateRange");
              setShowModal(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={newDateRange.id ? onUpdateDateRange : onCreateDateRange}>
            {newDateRange.id ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog maxWidth="sm" open={!!rangeToDelete} onClose={() => setRangeToDelete(null)} fullWidth>
        <DialogTitle>Eliminar lapso</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar este lapso?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={() => setRangeToDelete(null)}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteDateRange}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={feedback.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }))}
      >
        <Alert severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </PageWrapper>
  );
}

export default Admin;
