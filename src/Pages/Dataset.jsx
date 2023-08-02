import { useEffect, useMemo, useState } from "react";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
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
  FormControlLabel,
  Checkbox,
  Collapse,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  DeleteOutlined as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ContractService from "../Services/contract.service";
import PageWrapper from "../Components/PageWrapper";
import { isToday } from "../utilities/index";

const columnasVisibles = [
  "",
  "Contrato",
  "Nombre del pagador",
  "Valor de contrato",
  "Porcentaje de descuento",
  "Valor de descuento",
  "Valor de contrato con descuento",
  "Financiamiento total",
  "Cantidad de cuotas",
];

function CustomTableRow({ contract, index, onCreate, onPDF }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>
          {contract.status_contracts === 0 ? (
            <Button variant="contained" onClick={onCreate} sx={{ width: 104 }}>
              Crear
            </Button>
          ) : (
            <Button variant="outlined" onClick={onPDF} sx={{ width: 104 }}>
              Ver
            </Button>
          )}
        </TableCell>
        <TableCell>{contract.payer_fullname}</TableCell>
        <TableCell>
          $<NumericFormat displayType="text" value={contract.contract_amount} thousandSeparator></NumericFormat>
        </TableCell>
        <TableCell>{contract.percentage_discount}%</TableCell>
        <TableCell>
          $<NumericFormat displayType="text" value={contract.contract_discount} thousandSeparator></NumericFormat>
        </TableCell>
        <TableCell>
          $
          <NumericFormat
            displayType="text"
            value={contract.total_contract_with_discount}
            thousandSeparator
          ></NumericFormat>
        </TableCell>
        <TableCell>
          $<NumericFormat displayType="text" value={contract.total_financed} thousandSeparator></NumericFormat>
        </TableCell>
        <TableCell>{contract.payment_numbers}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Tipo Documento</TableCell>
                    <TableCell>Documento</TableCell>
                    <TableCell>Lugar de Expedición</TableCell>
                    <TableCell>Cuenta de Banco</TableCell>
                    <TableCell>Monto del Contrato</TableCell>
                    {contract.contract_signature_date !== null && <TableCell>Fecha Del Contrato</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{contract.payer_fullname}</TableCell>
                    <TableCell>{contract.payer_id_type}</TableCell>
                    <TableCell>{contract.payer_id_number}</TableCell>
                    <TableCell>{contract.payer_id_location_expedition}</TableCell>
                    <TableCell>{contract.beneficiary_bank_account_number}</TableCell>
                    <TableCell>{contract.contract_amount}</TableCell>
                    {contract.created_at !== null && (
                      <TableCell>{new Date(contract.created_at).toLocaleDateString()}</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const Dataset = () => {
  const [contracts, setContracts] = useState([]);

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Standard",
      value: 2200000,
    },
  ]);

  const [selectedContract, setSelectedContract] = useState(null);
  const [dues, setDues] = useState([]);
  const [contract, setContract] = useState({
    vites: "",
    service: 1,
    total: "",
    discount: "",
    firstPaymentValue: "",
    firstPaymentDate: new Date(),
    signatureDate: new Date(),
    financing: false,
  });
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const unitValue = useMemo(() => services.find((p) => p.id === contract.service).value, [contract.service, services]);
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
  const $Contract = useMemo(() => new ContractService(), []);

  const fetchContracts = async () => {
    const {
      status,
      data: { data },
    } = await $Contract.get();

    if (status) {
      setContracts(data);
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
      signatureDate: new Date(),
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
              id_services: contract.service,
              percentage_discount: parseFloat(contract.discount),
              contract_discount: parseFloat(discountValue),
              total_contract_with_discount: parseFloat(totalValue),
              first_payment: parseFloat(contract.firstPaymentValue),
              first_payment_date: contract.firstPaymentDate,
              contract_signature_date: contract.signatureDate,
              total_financed: parseFloat(totalDuesValue),
              payment_numbers: dues.length,
              financed_contracts: dues.map((d, index) => ({
                quota_number: index + 1,
                payment_amount: d.value,
                date_payment: d.date,
              })),
            }
          : {
              //  Financing't
              financed: 0,
              with_guarantee: 0,
              contract_vites: parseFloat(contract.vites),
              contract_amount: parseFloat(subTotalValue),
              id_services: contract.service,
              percentage_discount: parseFloat(contract.discount),
              contract_discount: parseFloat(discountValue),
              total_contract_with_discount: parseFloat(totalValue),
              first_payment: parseFloat(contract.firstPaymentValue),
              first_payment_date: contract.firstPaymentDate,
              contract_signature_date: contract.signatureDate,
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

  useEffect(() => {
    (async () => {
      await fetchContracts();
    })();
  }, [$Contract]);

  return (
    <PageWrapper>
      <Typography variant="h2" color="primary" marginBottom={4}>
        Contratos
      </Typography>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              {columnasVisibles.map((columna, index) => (
                <TableCell key={index}>{columna}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((contract, index) => (
              <CustomTableRow
                key={index}
                contract={contract}
                index={index}
                onCreate={() => setSelectedContract(contract)}
                onPDF={() =>
                  window.open(`https://avovite-api-dev.concilbot.com/api/v1/contracts/files/${contract.id}`, "_blank")
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                  {services.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
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
                <DatePicker
                  label="Fecha de Contrato"
                  value={dayjs(contract.signatureDate)}
                  format="DD/MM/YYYY"
                  onChange={(value) =>
                    setContract((prev) => ({
                      ...prev,
                      signatureDate: value.toDate(),
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
    </PageWrapper>
  );
};

export default Dataset;
