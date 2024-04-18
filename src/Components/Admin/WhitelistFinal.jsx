import { useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Stack,
  DialogContentText,
} from "@mui/material";
import { DeleteOutlined as DeleteIcon, FileDownload as DownloadIcon, SyncOutlined as RefreshIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ContractService from "../../Services/contract.service";
import TiptapEditor from "../TiptapEditor";
import { isToday, formatCurrency, formatDate as formatLongDate, exportWorksheet, formatDate } from "../../utilities/index";
import useSession from "../../Hooks/useSession";
import useShop from "../../Hooks/useShop";
import DueService from "../../Services/due.service";
import Image from "../Image";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import ConfirmCancelModal from "../ConfirmCancelModal";

const WhitelistFinal = ({ setid, openTwo, id, send }) => {
  const navigate = useNavigate();
  const [{ token }] = useSession();
  const $Shop = useShop();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCreating, setLoadingCreating] = useState(false);
  const [modal, setModal] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [dues, setDues] = useState([]);
  const [contract, setContract] = useState({
    vites: "",
    service: 0,
    total: "",
    discount: "",
    firstPaymentValue: "",
    firstPaymentDate: new Date(),
    financing: false,
    mortgage_contract: 0,
    mortgage_contract_aditional_text: "",
    enable_to_pay_epayco: false,
  });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const unitValue = useMemo(() => services[contract.service]?.unitary_price, [contract.service, services]);
  const subTotalValue = useMemo(() => Math.round(contract.vites * unitValue), [contract.vites, unitValue]);
  const discountValue = useMemo(() => Math.round(subTotalValue * (contract.discount / 100)), [subTotalValue, contract.discount]);
  const totalValue = useMemo(() => subTotalValue - discountValue, [subTotalValue, discountValue]);
  const totalFinancingValue = useMemo(
    () => Math.round(totalValue - (contract.firstPaymentValue || 0)),
    [contract.firstPaymentValue, totalValue]
  );

  const totalDuesValue = useMemo(() => dues.reduce((a, c) => a + parseInt(c.value || 0), 0), [dues]);
  const totalSubDuesValue = useMemo(() => totalFinancingValue - (totalDuesValue || 0), [totalDuesValue, totalFinancingValue]);
  const contractIsDisabledToCreate = useMemo(
    () => totalDuesValue !== totalFinancingValue || !contract.vites || contract.discount === "" || contract.firstPaymentValue === ""
    // dues.reduce((a, c) => a || isToday(new Date(c.date)), false)
  );
  const $Contract = useMemo(() => new ContractService(token), [token]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);
  // DUES
  const [contractDues, setContractDues] = useState({ id: null, dues: [] });
  const $Due = useMemo(() => new DueService(token), [token]);
  const [loadingDue, setLoadingDue] = useState(false);
  const [open, setOpen] = useState(false);
  const [actualContractId, setActualContractId] = useState();
  const [isCancelContract, setIsCancelContract] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const fetchContracts = async () => {
    try {
      const {
        status,
        data: { data },
      } = await $Contract.get({ pageNumber: currentPage, pageSize: currentSize });

      if (status) {
        setContracts(data);
      }
    } catch (error) {
      console.error("Error al obtener contratos:", error);
    }
  };

  const fetchProducts = async () => {
    const { status, data } = await $Shop.shop.get();

    if (status) {
      setServices(data.data);
    }
  };
  function convertirFecha(fechaHora) {
    const fecha = new Date(fechaHora);
    const año = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const dia = fecha.getDate().toString().padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  }

  const onCancelCreateContract = () => {
    setSelectedContract(null);
    setid(null);
    setContract({
      vites: "",
      service: 1,
      total: "",
      discount: "",
      firstPaymentValue: "",
      firstPaymentDate: new Date(),
      financing: false,
      mortgage_contract: 0,
      mortgage_contract_aditional_text: "",
      enable_to_pay_epayco: false,
    });
    setDues([]);
  };
  const onCreateContract = async () => {
    const formatDateToISO8601 = (date) => {
      return date.toISOString();
    };
    const body = {
      mortgage_contract: contract.mortgage_contract,
      ...(totalFinancingValue !== 0
        ? {
            // Financing
            id_user: Number(id),
            financed: 1,
            with_guarantee: 0,
            contract_vites: parseFloat(contract.vites),
            contract_amount: parseFloat(subTotalValue),
            id_services: services[contract.service].id_product,
            percentage_discount: parseFloat(contract.discount),
            contract_discount: parseFloat(discountValue),
            total_contract_with_discount: parseFloat(totalValue),
            first_payment: parseFloat(contract.firstPaymentValue),
            first_payment_date: convertirFecha(formatDateToISO8601(contract.firstPaymentDate)), // Modified to use ISO8601 format
            total_financed: parseFloat(totalDuesValue),
            payment_numbers: dues.length,
            financed_contracts: dues.map((d, index) => ({
              quota_number: index + 1,
              payment_amount: d.value,
              date_payment: formatDateToISO8601(d.date), // Modified to use ISO8601 format
            })),
            enable_to_pay_epayco: contract.enable_to_pay_epayco ? 1 : 0,
          }
        : {
            // Financingn't
            id_user: Number(id),

            financed: 0,
            with_guarantee: 0,
            contract_vites: parseFloat(contract.vites),
            contract_amount: parseFloat(subTotalValue),
            id_services: services[contract.service].id_product,
            percentage_discount: parseFloat(contract.discount),
            contract_discount: parseFloat(discountValue),
            total_contract_with_discount: parseFloat(totalValue),
            first_payment: parseFloat(contract.firstPaymentValue),
            first_payment_date: convertirFecha(formatDateToISO8601(contract.firstPaymentDate)), // Modified to use ISO8601 format
            enable_to_pay_epayco: contract.enable_to_pay_epayco ? 1 : 0,
          }),
      ...(contract.mortgage_contract === 1
        ? { mortgage_contract_aditional_text: contract.mortgage_contract === 1 ? contract.mortgage_contract_aditional_text : "" }
        : {}),
    };
    setLoadingCreating(true);

    send(body);

    setLoadingCreating(false);
  };

  const onCheckDue = async ({ id, file, status, id_contracts }) => {
    setLoadingDue(true);

    if (id) {
      const { status: reqStatus } = await $Due.updateStatus({ id, status, url_image: file });

      if (reqStatus) {
        setContractDues((prev) => ({
          ...prev,
          dues: prev.dues.map((d) => (d.id === id ? { ...d, status, url_image: URL.createObjectURL(file) } : d)),
        }));
      }
    } else {
      const { status: reqStatus } = await $Due.updateFirstDue({ contractId: id_contracts, status, url_image: file });

      if (reqStatus) {
        setContractDues((prev) => ({
          ...prev,
          dues: prev.dues.map((d) => (d.id === null ? { ...d, status, url_image: URL.createObjectURL(file) } : d)),
        }));
      }
    }

    setLoadingDue(false);
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchContracts();
        await fetchProducts();
        setLoading(false);
      })();
    }
  }, [token, currentPage, currentSize, isCancelContract]);

  const [contractRangeFilter, setContractRangeFilter] = useState(null);

  const handleCancelContract = async () => {
    setIsCancelContract(false);
    const { status, data } = await $Contract.cancelContract({ id: actualContractId });
    if (status) {
      setFeedback({ open: true, message: "Contrato cancelado correctamente", status: "success" });
      setOpen(false);
      setIsCancelContract(true);
    } else {
      setFeedback({ open: true, message: "Hubo un error al cancelar el contrato", status: "error" });
    }
  };

  return (
    <>
      <ConfirmCancelModal open={open} handleClose={handleClose} handleConfirm={handleCancelContract} />
      <Dialog open={openTwo} onClose={onCancelCreateContract} maxWidth="xl" fullWidth>
        <DialogTitle color="primary.main">Completar contrato</DialogTitle>
        <DialogContent>
          <Box component="form" display="flex" flexDirection="column" gap={3} padding={1} onSubmit={onCreateContract}>
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("lg")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
                <TextField
                  label="Vites"
                  type="number"
                  variant="outlined"
                  value={contract.vites}
                  required
                  onInput={(event) =>
                    setContract((prev) => ({
                      ...prev,
                      vites: event.target.value,
                    }))
                  }
                  sx={{ width: "100%" }}
                />
                <TextField
                  select
                  label="Producto"
                  value={contract.service}
                  required
                  onChange={(event) =>
                    setContract((prev) => ({
                      ...prev,
                      service: event.target.value,
                    }))
                  }
                  sx={{ width: "100%" }}
                >
                  {services.map((option, index) => (
                    <MenuItem key={index} value={index}>
                      {option.discount_name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  label="Descuento"
                  type="number"
                  variant="outlined"
                  value={contract.discount}
                  sx={{ width: "100%" }}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>%</Typography>
                      </InputAdornment>
                    ),
                    inputProps: {
                      max: 100,
                      min: 0.000001,
                    },
                  }}
                  onInput={(event) =>
                    setContract((prev) => ({
                      ...prev,
                      discount: event.target.value,
                    }))
                  }
                />
                <NumericFormat
                  customInput={TextField}
                  label="Primer abono"
                  variant="outlined"
                  value={contract.firstPaymentValue}
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
                    setContract((prev) => ({
                      ...prev,
                      firstPaymentValue: floatValue,
                    }))
                  }
                />
                <DatePicker
                  label="Fecha del primer abono"
                  value={dayjs(contract.firstPaymentDate)}
                  format="DD/MM/YYYY"
                  onChange={(value) =>
                    setContract((prev) => ({
                      ...prev,
                      firstPaymentDate: value.toDate(),
                    }))
                  }
                />
                contract
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
                <NumericFormat
                  customInput={TextField}
                  label="Valor Unitario"
                  variant="outlined"
                  value={unitValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  thousandSeparator
                  disabled
                  sx={{ width: "100%" }}
                />
                <NumericFormat
                  customInput={TextField}
                  label="Subtotal"
                  variant="outlined"
                  value={subTotalValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  thousandSeparator
                  disabled
                  sx={{ width: "100%" }}
                />
                <NumericFormat
                  customInput={TextField}
                  label="Descuento"
                  variant="outlined"
                  value={discountValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  thousandSeparator
                  disabled
                  sx={{ width: "100%" }}
                />
                <NumericFormat
                  customInput={TextField}
                  label="Total"
                  variant="outlined"
                  value={totalValue}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  thousandSeparator
                  disabled
                  sx={{ width: "100%" }}
                />
                <NumericFormat
                  customInput={TextField}
                  label="Total de financimiento"
                  variant="outlined"
                  value={totalFinancingValue}
                  disabled
                  sx={{ width: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  thousandSeparator
                />
              </Grid>
            </Grid>
            {/* <FormControlLabel
              label="Habilitar pago con Epayco"
              control={
                <Checkbox
                  checked={contract.enable_to_pay_epayco}
                  onChange={({ target }) => setContract((prev) => ({ ...prev, enable_to_pay_epayco: target.checked }))}
                />
              }
            /> */}
            <FormControlLabel
              label="Habilitar pago hipotecario"
              control={
                <Checkbox
                  checked={contract.mortgage_contract === 1}
                  onChange={({ target }) => setContract((prev) => ({ ...prev, mortgage_contract: target.checked ? 1 : 0 }))}
                />
              }
            />

            <Collapse in={contract?.mortgage_contract === 1}>
              <TiptapEditor
                placeholder="Texto Adicional"
                value={contract.mortgage_contract_aditional_text}
                onChange={({ html }) =>
                  setContract((prev) => ({
                    ...prev,
                    mortgage_contract_aditional_text: html,
                  }))
                }
              />
            </Collapse>

            {totalFinancingValue !== 0 && (
              <>
                <Divider />
                <Grid display="flex" flexDirection="column" gap={2}>
                  <Grid display="flex" justifyContent="space-between">
                    <Typography variant="h2" fontSize={18} fontWeight={500}>
                      Cuotas
                    </Typography>
                    <Grid display="flex" flexDirection="column" alignItems="flex-end">
                      <Typography fontSize={18} fontWeight={500} color="primary">
                        Total: $<NumericFormat displayType="text" value={totalDuesValue} thousandSeparator></NumericFormat>
                      </Typography>
                      {totalSubDuesValue !== 0 && (
                        <Typography fontSize={12} color="error">
                          Faltante: $<NumericFormat displayType="text" value={totalSubDuesValue} thousandSeparator></NumericFormat>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  {dues.map((due, index) => (
                    <Grid key={due.id} display="flex" gap={1}>
                      <TextField label="ID" variant="outlined" defaultValue={index + 1} disabled sx={{ width: "100%" }} />
                      <DatePicker
                        label="Fecha"
                        value={dayjs(contract.firstPaymentDate).add(1, "day") || dayjs(due.date)}
                        format="DD/MM/YYYY"
                        sx={{ width: "100%" }}
                        minDate={dayjs(contract.firstPaymentDate).add(1, "day")}
                        disablePast
                        onChange={(value) => setDues((prev) => prev.map((d) => (d.id === due.id ? { ...due, date: value.toDate() } : d)))}
                      />
                      <NumericFormat
                        customInput={TextField}
                        label="Valor"
                        variant="outlined"
                        value={due.value}
                        sx={{ width: "100%" }}
                        thousandSeparator
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography>$</Typography>
                            </InputAdornment>
                          ),
                        }}
                        onValueChange={({ floatValue }) =>
                          setDues((prev) => prev.map((d) => (d.id === due.id ? { ...due, value: floatValue } : d)))
                        }
                      />
                      <Box display="flex" justifyContent="center" alignItems="center">
                        <IconButton color="error" onClick={() => setDues((prev) => prev.filter((d) => d.id !== due.id))}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                  <Grid display="flex" justifyContent="flex-end">
                    <Button
                      variant="contained"
                      onClick={() =>
                        setDues((prev) => [
                          ...prev,
                          {
                            id: uuid(),
                            date: new Date(),
                            value: "",
                          },
                        ])
                      }
                    >
                      Agregar
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Grid display="flex" justifyContent="flex-end" alignItems="center" gap={1}>
            <Button onClick={onCancelCreateContract}>Cancelar</Button>
            <LoadingButton loading={loadingCreating} onClick={onCreateContract} variant="contained" disabled={contractIsDisabledToCreate}>
              Crear contrato
            </LoadingButton>
          </Grid>
        </DialogActions>
      </Dialog>

      <Dialog
        open={modal === "open-contract-dues"}
        onClose={() => {
          setModal(null);
          setContractDues({ id: null, dues: [] });
        }}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle color="primary.main">Cuotas del contrato</DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              secondaryAction={
                loadingDue ? (
                  <CircularProgress size={28} />
                ) : (
                  <Typography fontSize={20} fontWeight={600} color="black">
                    Pagado
                  </Typography>
                )
              }
            >
              <Grid display="flex" gap={4} alignItems="center">
                <ListItemText primary="Cuota" primaryTypographyProps={{ fontSize: 20, fontWeight: 600, color: "black" }} />
              </Grid>
            </ListItem>
            {contractDues.dues
              .filter((fd) => fd.id)
              .map((due) => (
                <ListItem
                  key={due.id}
                  secondaryAction={
                    <Stack direction="row" alignItems="center" gap={1}>
                      {due.url_image && <Image src={due.url_image} alt="Due image" height={32} width={32} borderRadius={0.5} />}
                      <Box position="relative">
                        <Checkbox edge="end" disabled={loadingDue || due.status} checked={due.status} sx={{ margin: 0 }} />
                        <input
                          type="file"
                          style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            display: due.status ? "none" : "block",
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                            aspectRatio: 1,
                            opacity: 0,
                          }}
                          onChange={({ target }) =>
                            onCheckDue({ id: due.id, file: target.files[0], status: 1, id_contracts: due.id_contracts })
                          }
                        />
                      </Box>
                    </Stack>
                  }
                >
                  <Grid display="flex" gap={4} alignItems="center">
                    <ListItemText primary={due.quota_number} primaryTypographyProps={{ fontSize: 20, fontWeight: 600, color: "black" }} />
                    <ListItemText
                      primary={formatCurrency(due.payment_amount, "$")}
                      secondary={formatLongDate(due.date_payment)}
                      primaryTypographyProps={{ fontSize: 20, color: "black" }}
                      secondaryTypographyProps={{ color: "text.main" }}
                    />
                  </Grid>
                </ListItem>
              ))}
          </List>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={modal === "edit-contract"}
        onClose={() => {
          setModal(null);
          onCancelCreateContract();
        }}
      >
        <DialogTitle>Editar contrato</DialogTitle>
        <DialogContent>
          <DialogContentText>¿Estás seguro que deseas editar el contrato AV-{contract?.id}?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setModal(null);
              onCancelCreateContract();
            }}
          >
            Cancelar
          </Button>
          <LoadingButton variant="contained" onClick={() => navigate(`/admin/contracts/${contract?.id}?editing=true`)}>
            Editar
          </LoadingButton>
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
};

export default WhitelistFinal;
