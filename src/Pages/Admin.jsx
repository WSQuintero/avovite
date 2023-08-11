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
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import EnhancedTable from "../Components/EnhancedTable";
import DateRangeService from "../Services/daterange.service";
import ProfitService from "../Services/profit.service";
import useSession from "../Hooks/useSession";
import { formatDate } from "../utilities";
import { NumericFormat } from "react-number-format";

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

  // CONTRACTS
  

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

  // PROFITS
  const [profits, setProfits] = useState([]);
  const [currentProfit, setCurrentProfit] = useState({
    id: null,
    id_contract_date_range: "",
    amount_profit: "",
  });
  const $Profit = useMemo(() => new ProfitService(session.token), [session.token]);
  const profitHeadCells = useMemo(
    () => [
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
        format: (value) => (
          <>
            $<NumericFormat displayType="text" value={value} thousandSeparator></NumericFormat>
          </>
        ),
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
                setCurrentProfit(row);
                setShowModal("create-profit");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setCurrentProfit(row);
                setShowModal("delete-profit");
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

  const clearFields = (target) => {
    if (target === "DateRange") {
      setNewDateRange({
        id: null,
        date_start_inscription: null,
        date_end_inscription: null,
        months_duration: "",
        date_start_profit: null,
      });
    } else if (target === "Profit") {
      setCurrentProfit({
        id: null,
        id_contract_date_range: "",
        amount_profit: "",
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
      clearFields("DateRange");
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
      clearFields("DateRange");
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

  const onCreateProfit = async (event) => {
    event.preventDefault();

    const { status, data } = await $Profit.add({
      body: {
        id_contract_date_range: currentProfit.id_contract_date_range,
        amount_profit: currentProfit.amount_profit,
      },
    });

    console.log(data);

    if (status) {
      setFeedback({ show: true, status: "success", message: "Rentabilidad creada con éxito." });
      setShowModal(null);
      clearFields("Profit");
      // Add to the list
    } else {
      setFeedback({ show: true, status: "error", message: "Error al crear rentabilidad." });
    }
  };

  const onUpdateProfit = async (event) => {
    event.preventDefault();

    const { status, data } = await $Profit.update({
      id: currentProfit.id,
      body: {
        id_contract_date_range: currentProfit.id_contract_date_range,
        amount_profit: currentProfit.amount_profit,
      },
    });

    console.log(data);

    if (status) {
      setFeedback({ show: true, status: "success", message: "Rentabilidad actualizada con éxito." });
      setShowModal(null);
      clearFields("Profit");
      // Add to the list
    } else {
      setFeedback({ show: true, status: "error", message: "Error al actualizar rentabilidad." });
    }
  };

  const onDeleteProfit = async () => {
    const { status } = await $Profit.delete({ id: currentProfit.id });

    if (status) {
      setFeedback({ show: true, status: "success", message: "Rentabilidad eliminada con éxito." });
      setProfits((prev) => prev.filter((e) => e.id !== currentProfit.id));
      clearFields("Profit");
      setShowModal(null);
    } else {
      setFeedback({ show: true, status: "error", message: "Error al eliminar la rentabilidad." });
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
      (async () => {
        const { status, data } = await $Profit.get();

        if (status) {
          setProfits(data.data);
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
          {/* <Tab label="Contratos" /> */}
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
          <EnhancedTable headCells={dateRangeHeadCells} rows={dateRanges} />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Grid display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={() => setShowModal("create-profit")}>
              Crear
            </Button>
          </Grid>
          <EnhancedTable headCells={profitHeadCells} rows={profits} />
        </Grid>
      </CustomTabPanel>

      {/* DATE RANGES */}

      <Dialog
        maxWidth="sm"
        open={showModal === "create-date-range"}
        onClose={() => {
          clearFields("DateRange");
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
              clearFields("DateRange");
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

      {/* PROFIT */}

      <Dialog
        maxWidth="sm"
        open={showModal === "create-profit"}
        onClose={() => {
          clearFields("Profit");
          setShowModal(null);
        }}
        fullWidth
      >
        <DialogTitle>{currentProfit.id ? "Actualizar" : "Crear"} rentabilidad</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            paddingY={1}
            component="form"
            onSubmit={currentProfit.id ? onUpdateProfit : onCreateProfit}
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Lapso</InputLabel>
                <Select
                  label="Lapso"
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={currentProfit.id_contract_date_range}
                  onChange={(event) =>
                    setCurrentProfit((prev) => ({ ...prev, id_contract_date_range: event.target.value }))
                  }
                  fullWidth
                >
                  <MenuItem value={-1} disabled>
                    Seleccionar opción
                  </MenuItem>
                  {dateRanges.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <NumericFormat
                customInput={TextField}
                label="Valor"
                variant="outlined"
                value={currentProfit.amount_profit}
                sx={{ width: "100%" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography>$</Typography>
                    </InputAdornment>
                  ),
                }}
                thousandSeparator
                onValueChange={({ floatValue }) =>
                  setCurrentProfit((prev) => ({
                    ...prev,
                    amount_profit: String(floatValue),
                  }))
                }
              />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              clearFields("Profit");
              setShowModal(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={currentProfit.id ? onUpdateProfit : onCreateProfit}>
            {currentProfit.id ? "Actualizar" : "Crear"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        maxWidth="sm"
        open={showModal === "delete-profit"}
        onClose={() => {
          clearFields("Profit");
          setShowModal(null);
        }}
        fullWidth
      >
        <DialogTitle>Eliminar rentabilidad</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que quieres eliminar esta rentabilidad?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              clearFields("Profit");
              setShowModal(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={onDeleteProfit}>
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
