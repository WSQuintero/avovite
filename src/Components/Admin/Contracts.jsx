import { useCallback, useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import {
  Box,
  Button,
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
  Paper,
} from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { ExportToCsv } from "export-to-csv";
import {
  AddOutlined as AddIcon,
  DeleteOutlined as DeleteIcon,
  FileDownload as DownloadIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ContractService from "../../Services/contract.service";
import { isToday, formatCurrency, formatDate as formatLongDate } from "../../utilities/index";
import useSession from "../../Hooks/useSession";
import EnhancedTable from "../EnhancedTable";
import useConfig from "../../Hooks/useConfig";
import useShop from "../../Hooks/useShop";

const columns = [
  {
    accessorKey: "fullname",
    id: "fullname",
    header: "Nombre del pagador",
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
        $<NumericFormat displayType="text" value={renderedCellValue} thousandSeparator></NumericFormat>
      </>
    ),
  },
  {
    accessorKey: "payment_numbers",
    id: "payment_numbers",
    header: "Cantidad de cuotas",
  },
  {
    accessorKey: "total_financed",
    id: "total_financed",
    header: "Financiamiento total",

    Cell: ({ renderedCellValue }) => (
      <>
        $<NumericFormat displayType="text" value={renderedCellValue} thousandSeparator></NumericFormat>
      </>
    ),
  },
];

const csvExporter = new ExportToCsv({
  fieldSeparator: ",",
  quoteStrings: '"',
  decimalSeparator: ".",
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

const Contracts = () => {
  const [{ constants }] = useConfig();
  const [{ token }] = useSession();
  const $Shop = useShop();
  const [contracts, setContracts] = useState([]);

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
  });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const unitValue = useMemo(() => services[contract.service]?.unitary_price, [contract.service, services]);
  const subTotalValue = useMemo(() => Math.round(contract.vites * unitValue), [contract.vites, unitValue]);
  const discountValue = useMemo(
    () => Math.round(subTotalValue * (contract.discount / 100)),
    [subTotalValue, contract.discount]
  );
  const totalValue = useMemo(() => subTotalValue - discountValue, [subTotalValue, discountValue]);
  const totalFinancingValue = useMemo(
    () => Math.round(totalValue - (contract.firstPaymentValue || 0)),
    [contract.firstPaymentValue, totalValue]
  );
  const totalDuesValue = useMemo(() => dues.reduce((a, c) => a + parseInt(c.value || 0), 0), [dues]);
  const totalSubDuesValue = useMemo(
    () => totalFinancingValue - (totalDuesValue || 0),
    [totalDuesValue, totalFinancingValue]
  );
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

  const fetchContracts = async () => {
    const {
      status,
      data: { data },
    } = await $Contract.get();

    if (status) {
      setContracts(data);
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
    });
    setDues([]);
  };

  const onCreateContract = async () => {
    const { status } = await $Contract.complete({
      id: selectedContract.id,
      body:
        totalFinancingValue !== 0
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
            },
    });

    if (status) {
      onCancelCreateContract();
      setFeedback({ open: true, message: "Formulario completado exitosamente.", status: "success" });
      await fetchContracts();
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(contracts);
  };

  useEffect(() => {
    if (token) {
      (async () => {
        await fetchContracts();
        await fetchProducts();
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
        renderRowActionMenuItems={({ closeMenu, row: { original } }) => [
          <MenuItem
            key={0}
            onClick={() => {
              closeMenu();
              original.status_contracts === 0
                ? setSelectedContract(original)
                : window.open(`${import.meta.env.VITE_API_URL}/contracts/files/${original.id}`, "_blank");
            }}
            sx={{ m: 0 }}
          >
            {original.status_contracts === 0 ? "Crear" : " Ver"} contrato
          </MenuItem>,
        ]}
        renderDetailPanel={({ row: { original: row } }) => (
          <Grid display="flex" flexDirection="column" gap={2} width="100%" padding={2}>
            <Grid display="flex" flexDirection="column" gap={1}>
              <Typography variant="h4">Información financiera</Typography>
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

              <Typography variant="h4">Información de primer pago</Typography>
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

              <Typography variant="h4">Información del titular</Typography>
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
                {row.beneficiary_id_number}
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
              <Typography>
                <Typography component="span" fontWeight={600}>
                  Número de contrato:{" "}
                </Typography>
                {row.contract_number}
              </Typography>
            </Grid>
          </Grid>
        )}
        renderBottomToolbarCustomActions={({ table }) => (
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="text" color="primary" onClick={handleExportData} startIcon={<DownloadIcon />}>
              Exportar a csv
            </Button>
          </Box>
        )}
      />

      <Dialog open={!!selectedContract} onClose={onCancelCreateContract} maxWidth="xl" fullWidth>
        <DialogTitle color="primary.main">Crear contrato</DialogTitle>
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
                        Total: $
                        <NumericFormat displayType="text" value={totalDuesValue} thousandSeparator></NumericFormat>
                      </Typography>
                      {totalSubDuesValue !== 0 && (
                        <Typography fontSize={12} color="error">
                          Faltante: $
                          <NumericFormat displayType="text" value={totalSubDuesValue} thousandSeparator></NumericFormat>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  {dues.map((due, index) => (
                    <Grid key={due.id} display="flex" gap={1}>
                      <TextField
                        label="ID"
                        variant="outlined"
                        defaultValue={index + 1}
                        disabled
                        sx={{ width: "100%" }}
                      />
                      <DatePicker
                        label="Fecha"
                        value={dayjs(due.date)}
                        format="DD/MM/YYYY"
                        sx={{ width: "100%" }}
                        disablePast
                        onChange={(value) =>
                          setDues((prev) => prev.map((d) => (d.id === due.id ? { ...due, date: value.toDate() } : d)))
                        }
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
                        <IconButton
                          color="error"
                          onClick={() => setDues((prev) => prev.filter((d) => d.id !== due.id))}
                        >
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
            <Button onClick={onCreateContract} variant="contained" disabled={contractIsDisabledToCreate}>
              Crear contrato
            </Button>
          </Grid>
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

export default Contracts;
