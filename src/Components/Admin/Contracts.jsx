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
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { DeleteOutlined as DeleteIcon, FileDownload as DownloadIcon, SyncOutlined as RefreshIcon } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ContractService from "../../Services/contract.service";
import TiptapEditor from "../TiptapEditor";
import { isToday, formatCurrency, formatDate as formatLongDate, exportWorksheet } from "../../utilities/index";
import useSession from "../../Hooks/useSession";
import useConfig from "../../Hooks/useConfig";
import useShop from "../../Hooks/useShop";
import DueService from "../../Services/due.service";
import Image from "../Image";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";

const columns = [
  {
    accessorKey: "id",
    id: "id",
    header: "Número de contrato",
    Cell: ({ renderedCellValue }) => <Typography>AV-{renderedCellValue}</Typography>,
  },
  {
    accessorKey: "fullname",
    id: "fullname",
    header: "Nombre del pagador",
  },
  {
    accessorKey: "mortgage_contract",
    id: "mortgage_contract",
    header: "Hipotecado",
    size: 50,
    Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue === 0 ? "No" : "Si"}</Typography>,
  },
  {
    accessorKey: "contract_vites",
    id: "contract_vites",
    header: "Vites",
  },
  {
    accessorKey: "contract_amount",
    id: "contract_amount",
    header: "Valor de contrato",
    Cell: ({ renderedCellValue }) => (
      <>
        $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
      </>
    ),
  },
  {
    accessorKey: "total_contract_with_discount",
    id: "total_contract_with_discount",
    header: "Valor contrato con descuento",
    size: 300,

    Cell: ({ renderedCellValue }) => (
      <>
        $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
      </>
    ),
  },
  {
    accessorKey: "payment_numbers",
    id: "payment_numbers",
    header: "Cuotas",
  },
  {
    accessorKey: "overdue_quotas",
    id: "overdue_quotas",
    header: "Cuotas en mora",
  },
  {
    accessorKey: "stateFignature",
    id: "stateFignature",
    header: "Estado de la firma",
  },
];

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const Contracts = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [{ constants }] = useConfig();
  const [{ token }] = useSession();
  const $Shop = useShop();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCreating, setLoadingCreating] = useState(false);
  const [loadingSigning, setLoadingSigning] = useState(false);
  const [loadingRefreshing, setLoadingRefreshing] = useState(false);
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
    () =>
      totalDuesValue !== totalFinancingValue ||
      !contract.vites ||
      contract.discount === "" ||
      contract.firstPaymentValue === "" ||
      dues.reduce((a, c) => a || isToday(new Date(c.date)), false),
    [contract.discount, contract.firstPaymentValue, contract.vites, dues, totalDuesValue, totalFinancingValue]
  );
  const $Contract = useMemo(() => new ContractService(token), [token]);

  // DUES
  const [contractDues, setContractDues] = useState({ id: null, dues: [] });
  const $Due = useMemo(() => new DueService(token), [token]);
  const [loadingDue, setLoadingDue] = useState(false);

  const fetchContracts = async () => {
    const {
      status,
      data: { data },
    } = await $Contract.get();

    if (status) {
      setContracts(data);
    }
  };

  const fetchContractDues = async (contractId) => {
    const { status, data } = await $Due.get({ contractId });

    if (status) {
      setContractDues({ id: contractId, dues: data.data });
    }
  };

  const fetchProducts = async () => {
    const { status, data } = await $Shop.shop.get();

    if (status) {
      setServices(data.data);
    }
  };

  const onCancelCreateContract = () => {
    setSelectedContract(null);
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
    const body = {
      ...(totalFinancingValue !== 0
        ? {
            // Financing
            financed: 1,
            with_guarantee: 0,
            contract_vites: parseFloat(contract.vites),
            contract_amount: parseFloat(subTotalValue),
            id_services: services[contract.service].id_product,
            percentage_discount: parseFloat(contract.discount),
            contract_discount: parseFloat(discountValue),
            total_contract_with_discount: parseFloat(totalValue),
            first_payment: parseFloat(contract.firstPaymentValue),
            first_payment_date: formatDate(contract.firstPaymentDate),
            total_financed: parseFloat(totalDuesValue),
            payment_numbers: dues.length,
            financed_contracts: dues.map((d, index) => ({
              quota_number: index + 1,
              payment_amount: d.value,
              date_payment: formatDate(d.date),
            })),
            enable_to_pay_epayco: contract.enable_to_pay_epayco ? 1 : 0,
          }
        : {
            //  Financingn't
            financed: 0,
            with_guarantee: 0,
            contract_vites: parseFloat(contract.vites),
            contract_amount: parseFloat(subTotalValue),
            id_services: services[contract.service].id_product,
            percentage_discount: parseFloat(contract.discount),
            contract_discount: parseFloat(discountValue),
            total_contract_with_discount: parseFloat(totalValue),
            first_payment: parseFloat(contract.firstPaymentValue),
            first_payment_date: formatDate(contract.firstPaymentDate),
            enable_to_pay_epayco: contract.enable_to_pay_epayco ? 1 : 0,
          }),
      ...{
        mortgage_contract_aditional_text: contract.mortgage_contract === 1 ? contract.mortgage_contract_aditional_text : "",
        mortgage_contract: contract.mortgage_contract,
      },
    };

    setLoadingCreating(true);

    const { status } = await $Contract.complete({
      id: selectedContract.id,
      mortgage: contract.mortgage_contract === 1,
      body: body,
    });

    if (status) {
      onCancelCreateContract();
      setFeedback({ open: true, message: "Formulario completado exitosamente.", status: "success" });
      await fetchContracts();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }

    setLoadingCreating(false);
  };

  const onDeleteContract = async (contractId, permanently) => {
    if (permanently) {
      const { status } = await $Contract.delete({ id: contractId });

      if (status) {
        enqueueSnackbar("Contrato eliminado exitosamente.", { variant: "success" });
        setContracts((prev) => prev.filter((c) => c.id !== contractId));
      } else {
        enqueueSnackbar("Error al eliminar contrato.", { variant: "error" });
      }
    } else {
      const { status } = await $Contract.requestDelete({ id: contractId });

      if (status) {
        enqueueSnackbar("Se ha notificado al usuario para eliminar el contrato.", { variant: "success" });
      } else {
        enqueueSnackbar("Error al eliminar contrato.", { variant: "error" });
      }
    }
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

  const onSendSignature = async ({ id }) => {
    setLoadingSigning(true);

    const { status } = await $Contract.sendSignature({ id });

    if (status) {
      enqueueSnackbar("Se ha notificado al usuario para firmar el contrato.", { variant: "success" });
    } else {
      enqueueSnackbar("Error al notificar al usuario para firmar el contrato.", { variant: "error" });
    }

    setLoadingSigning(false);
  };

  const onRefreshSignatures = async () => {
    setLoadingRefreshing(true);

    const { status } = await $Contract.refreshSignatures();

    if (status) {
      enqueueSnackbar("El estado de las firmas ha sido refrescado.", { variant: "success" });
    } else {
      enqueueSnackbar("Error al refrescar el estado de las firmas.", { variant: "error" });
    }

    setLoadingRefreshing(false);
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const handleExportData = async () => {
    const { status, data } = await $Contract.export();

    if (status) {
      exportWorksheet(data.data, `${formatDate(new Date())} Datos_Form & Excel.xlsx`);
    }
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchContracts();
        await fetchProducts();
        setLoading(false);
      })();
    }
  }, [token]);

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={contracts}
        enableColumnFilterModes
        enableColumnOrdering
        enableRowActions
        muiTablePaperProps={{ elevation: 0 }}
        initialState={{ density: "compact" }}
        muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
        state={{ showSkeletons: loading }}
        localization={MRT_Localization_ES}
        renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
          <MenuItem
            key={0}
            disabled={original.status_contracts === 0}
            onClick={() => {
              closeMenu();
              window.open(`${import.meta.env.VITE_API_URL}/contracts/files/${original.id}`, "_blank");
            }}
          >
            Ver contrato
          </MenuItem>,
          <MenuItem
            key={1}
            disabled={original.status_contracts !== 0}
            onClick={() => {
              closeMenu();
              setSelectedContract(original), setContract((prev) => ({ ...prev, mortgage_contract: original.mortgage_contract || 0 }));
            }}
          >
            Completar contrato
          </MenuItem>,
          <MenuItem
            key={2}
            disabled={original.status_contracts === 0}
            onClick={async () => {
              closeMenu();
              await fetchContractDues(original.id);
              setModal("open-contract-dues");
            }}
          >
            Ver cuotas
          </MenuItem>,
          <Divider key="divider-1" />,
          <MenuItem
            key={1.5}
            disabled={loadingSigning}
            onClick={() => {
              closeMenu();
              onSendSignature(original);
            }}
            sx={{ gap: 1, alignItems: "center" }}
          >
            {loadingSigning && <CircularProgress size={16} />} Envia firma
          </MenuItem>,
          <MenuItem
            key={1.75}
            disabled={!original.urlValidocus}
            onClick={() => {
              closeMenu();
              window.open(original.urlValidocus, "_blank");
            }}
            sx={{ gap: 1, alignItems: "center" }}
          >
            Ver firma
          </MenuItem>,
          <Divider key="divider-2" />,
          original.status_contracts !== 0 ? (
            <MenuItem
              key={3}
              sx={{ color: "error.main" }}
              onClick={async () => {
                closeMenu();
                await onDeleteContract(original.id);
              }}
            >
              Solicitar eliminar
            </MenuItem>
          ) : (
            <MenuItem
              key={4}
              sx={{ color: "error.main" }}
              onClick={async () => {
                closeMenu();
                await onDeleteContract(original.id, true);
              }}
            >
              Eliminar contrato
            </MenuItem>
          ),
        ]}
        renderDetailPanel={({ row: { original: row } }) => (
          <Grid display="flex" flexDirection="column" gap={2} width="100%" padding={2}>
            <Grid display="flex" flexDirection="column" gap={1}>
              <Typography variant="h4" mt={4}>
                Información financiera
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Financiado:{" "}
                </Typography>
                {row.financed ? "Si" : "No"}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Descuento:{" "}
                </Typography>
                {row.percentage_discount}%
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Valor descontado:{" "}
                </Typography>
                ${formatCurrency(row.contract_discount)}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Total con descuento:{" "}
                </Typography>
                ${formatCurrency(row.total_contract_with_discount)}
              </Typography>

              <Typography variant="h4" mt={4}>
                Información de primer pago
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Valor:{" "}
                </Typography>
                ${formatCurrency(row.first_payment)}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Fecha:{" "}
                </Typography>
                {formatLongDate(row.first_payment_date)}
              </Typography>

              <Typography variant="h4" mt={4}>
                Información del titular
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Teléfono:{" "}
                </Typography>
                {row.cellphone}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Correo:{" "}
                </Typography>
                {row.email}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Número de documento:{" "}
                </Typography>
                {row.id_number}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Número de cuenta:{" "}
                </Typography>
                {row.user_bank_account_number}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Tipo de cuenta:{" "}
                </Typography>
                {constants?.account_type?.find((a) => String(a.id) === String(row.user_bank_account_type))?.name}
              </Typography>
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Banco:{" "}
                </Typography>
                {constants?.banks?.find((a) => String(a.id) === String(row.user_id_bank))?.name}
              </Typography>
            </Grid>
          </Grid>
        )}
        renderBottomToolbarCustomActions={({ table }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="text" color="primary" onClick={handleExportData} startIcon={<DownloadIcon />}>
              Exportar a Excel
            </Button>
            <LoadingButton
              loading={loadingRefreshing}
              variant={loadingRefreshing ? "contained" : "text"}
              color="primary"
              onClick={onRefreshSignatures}
              startIcon={<RefreshIcon />}
            >
              Refrescar firmas
            </LoadingButton>
          </Box>
        )}
      />

      <Dialog open={!!selectedContract} onClose={onCancelCreateContract} maxWidth="xl" fullWidth>
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
                        value={dayjs(due.date)}
                        format="DD/MM/YYYY"
                        sx={{ width: "100%" }}
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
            {contractDues.dues.map((due) => (
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

export default Contracts;
