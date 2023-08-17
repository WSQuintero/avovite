import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { NumericFormat } from "react-number-format";
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
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
  alpha,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon, AddOutlined as AddIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import EnhancedTable from "../Components/EnhancedTable";
import DateRangeService from "../Services/daterange.service";
import ProfitService from "../Services/profit.service";
import useSession from "../Hooks/useSession";
import { formatCurrency, formatDate } from "../utilities";
import Contracts from "../Components/Admin/Contracts";
import Blog from "../Components/Admin/Blog";
import useConfig from "../Hooks/useConfig";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box role="tabpanel" hidden={value !== index} {...other}>
      <Box display={value === index ? "initial" : "none"} padding={2}>
        {children}
      </Box>
    </Box>
  );
}

function Admin() {
  const navigate = useNavigate();
  const [session] = useSession();
  const [, { setLoading }] = useConfig();
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

  // PROFITS
  const [profits, setProfits] = useState([]);
  const [currentProfit, setCurrentProfit] = useState({
    id: null,
    id_contract_date_range: "",
    amount_profit: "",
  });
  const [billSplitting, setBillSplitting] = useState({
    dateRangeId: null,
    profitId: null,
  });
  const $Profit = useMemo(() => new ProfitService(session.token), [session.token]);

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
        format: (value, row, onCollapse) => (
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <IconButton onClick={onCollapse}>
              <AddIcon />
            </IconButton>
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
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                setBillSplitting((prev) => ({ ...prev, dateRangeId: row.id }));
                setShowModal("bill-splitting");
              }}
            >
              Split
            </Button>
          </Grid>
        ),
      },
    ],
    []
  );

  const dateRangeCollapse = useCallback(
    (row) => (
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={2}>
        <Grid display="flex" justifyContent="space-between">
          <Typography variant="h4">Rentabilidades</Typography>
          <Button
            variant="contained"
            onClick={() => {
              setCurrentProfit((prev) => ({ ...prev, id_contract_date_range: row.id }));
              setShowModal("create-profit");
            }}
          >
            Crear
          </Button>
        </Grid>
        <List>
          {profits
            .filter((p) => p.id_contract_date_range === row.id)
            .map((p) => (
              <ListItem
                key={p.id}
                secondaryAction={
                  <Grid display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton
                      onClick={() => {
                        setCurrentProfit(p);
                        setShowModal("create-profit");
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setCurrentProfit(p);
                        setShowModal("delete-profit");
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                }
                sx={(t) => ({
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: alpha(t.palette.primary.main, 0.1),
                  },
                })}
              >
                <ListItemText primary={formatCurrency(p.amount_profit, "$")} />
              </ListItem>
            ))}
        </List>
      </Grid>
    ),
    [profits]
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
    } else if (target === "BillSplitting") {
      setBillSplitting({
        dateRangeId: null,
        profitId: null,
      });
    }
  };

  const onCreateDateRange = async (event) => {
    event.preventDefault();

    const body = {
      date_start_inscription: newDateRange.date_start_inscription,
      date_end_inscription: newDateRange.date_end_inscription,
      months_duration: parseInt(newDateRange.months_duration),
      date_start_profit: newDateRange.date_start_profit,
    };

    const { status, data } = await $DateRange.add({ body });

    if (status) {
      setFeedback({ show: true, status: "success", message: "Lapso creado con éxito." });
      setDateRanges((prev) => [...prev, { id: data.data, ...body }]);
      setShowModal(null);
      clearFields("DateRange");
      // Add to the list
    } else {
      setFeedback({ show: true, status: "error", message: "Error al crear lapso." });
    }
  };

  const onUpdateDateRange = async (event) => {
    event.preventDefault();

    const body = {
      date_start_inscription: newDateRange.date_start_inscription,
      date_end_inscription: newDateRange.date_end_inscription,
      months_duration: parseInt(newDateRange.months_duration),
      date_start_profit: newDateRange.date_start_profit,
    };

    const { status } = await $DateRange.update({
      id: newDateRange.id,
      body,
    });

    if (status) {
      setFeedback({ show: true, status: "success", message: "Lapso actualizado con éxito." });
      setDateRanges((prev) => prev.map((d) => (d.id === newDateRange.id ? { ...d, ...body } : d)));
      setShowModal(null);
      clearFields("DateRange");
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

    const body = {
      id_contract_date_range: currentProfit.id_contract_date_range,
      amount_profit: currentProfit.amount_profit,
    };

    const { status, data } = await $Profit.add({ body });

    if (status) {
      setFeedback({ show: true, status: "success", message: "Rentabilidad creada con éxito." });
      setProfits((prev) => [...prev, { id: data.data, ...body }]);
      setShowModal(null);
      clearFields("Profit");
      // Add to the list
    } else {
      setFeedback({ show: true, status: "error", message: "Error al crear rentabilidad." });
    }
  };

  const onUpdateProfit = async (event) => {
    event.preventDefault();

    const body = {
      id_contract_date_range: currentProfit.id_contract_date_range,
      amount_profit: currentProfit.amount_profit,
    };

    const { status } = await $Profit.update({
      id: currentProfit.id,
      body,
    });

    if (status) {
      setFeedback({ show: true, status: "success", message: "Rentabilidad actualizada con éxito." });
      setProfits((prev) => prev.map((p) => (p.id === currentProfit.id ? { ...p, ...body } : p)));
      setShowModal(null);
      clearFields("Profit");
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

  const onGenerateBillSplitting = async () => {
    if (!billSplitting.profitId) {
      setFeedback({ show: true, status: "error", message: "Debe seleccionar primero una rentabilidad." });
      return;
    }

    const { status } = await $Profit.split({ id: billSplitting.profitId });

    if (status) {
      setShowModal(null);
      setFeedback({ show: true, status: "success", message: "Split de pagos completado correctamente." });
      clearFields("BillSplitting");
    } else {
      setFeedback({ show: true, status: "error", message: "Hubo un error al generar split de pagos." });
    }
  };

  useEffect(() => {
    if (session.token) {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 500);

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

  useEffect(() => {
    if (session.user && !session.user.isAdmin()) {
      navigate("/");
    }
  }, [session.user]);

  return (
    <PageWrapper>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
        >
          <Tab label="Contratos" />
          <Tab label="Lapsos" />
          <Tab label="Blog" />
        </Tabs>
      </Box>
      <CustomTabPanel value={currentTab} index={0}>
        <Contracts />
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={1}>
        <Grid display="flex" flexDirection="column" gap={2}>
          <Grid display="flex" justifyContent="flex-end">
            <Button variant="contained" onClick={() => setShowModal("create-date-range")}>
              Crear
            </Button>
          </Grid>
          <EnhancedTable headCells={dateRangeHeadCells} rows={dateRanges} collapse={dateRangeCollapse} />
        </Grid>
      </CustomTabPanel>
      <CustomTabPanel value={currentTab} index={2}>
        <Blog />
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
                label="Duración de contrato (meses)"
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

      <Dialog
        maxWidth="sm"
        open={showModal === "bill-splitting"}
        onClose={() => {
          clearFields("BillSplitting");
          setShowModal(null);
        }}
        fullWidth
      >
        <DialogTitle>Generar split de pagos</DialogTitle>
        <DialogContent>
          <Grid paddingY={1}>
            <FormControl fullWidth>
              <InputLabel id="label-bill-splitting-select">Rentabilidad</InputLabel>
              <Select
                label="Rentabilidad"
                labelId="label-bill-splitting-select"
                id="demo-simple-select-helper"
                value={billSplitting.profitId}
                fullWidth
                onChange={(event) => setBillSplitting((prev) => ({ ...prev, profitId: event.target.value }))}
              >
                <MenuItem value={-1} disabled>
                  Seleccione una opción
                </MenuItem>
                {profits
                  .filter((p) => p.id_contract_date_range === billSplitting.dateRangeId)
                  .map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {formatCurrency(e.amount_profit, "$")}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              clearFields("BillSplitting");
              setShowModal(null);
            }}
          >
            Cancelar
          </Button>
          <Button variant="contained" onClick={onGenerateBillSplitting} disabled={!billSplitting.profitId}>
            Aceptar
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
