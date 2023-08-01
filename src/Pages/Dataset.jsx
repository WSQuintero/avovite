import { useEffect, useMemo, useState } from "react";
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
} from "@mui/material";
import {
  DeleteOutlined as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import ContractService from "../Services/contract.service";

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
      <TableRow sx={{ width: "100%", "& > *": { borderBottom: "unset"} }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell
          sx={{
            padding: "8px",
          }}
        >
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
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          {contract.payer_fullname}
        </TableCell>
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          $
          <NumericFormat
            displayType="text"
            value={contract.contract_amount}
            thousandSeparator
          ></NumericFormat>
        </TableCell>
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          {contract.percentage_discount}%
        </TableCell>
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          $
          <NumericFormat
            displayType="text"
            value={contract.contract_discount}
            thousandSeparator
          ></NumericFormat>
        </TableCell>
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          $
          <NumericFormat
            displayType="text"
            value={contract.total_contract_with_discount}
            thousandSeparator
          ></NumericFormat>
        </TableCell>
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          $
          <NumericFormat
            displayType="text"
            value={contract.total_financed}
            thousandSeparator
          ></NumericFormat>
        </TableCell>
        <TableCell
          sx={{
            border: "1px solid #C0C0C0",
            padding: "8px",
            color: "#757575",
          }}
        >
          {contract.payment_numbers}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases" sx={{borderRadius:50}}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: "white" }}>Nombre</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Tipo Documento
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>Documento</TableCell>
                    <TableCell sx={{ color: "white" }}>Lugar de Expedición</TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Cuenta de Banco
                    </TableCell>
                    <TableCell sx={{ color: "white" }}>
                      Monto del Contrato
                    </TableCell>
                    {contract.contract_signature_date !== null && (
                      <TableCell sx={{ color: "white" }}>
                        Fecha Del Contrato
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{contract.payer_fullname}</TableCell>
                    <TableCell>{contract.payer_id_type}</TableCell>
                    <TableCell>{contract.payer_id_number}</TableCell>
                    <TableCell>
                      {contract.payer_id_location_expedition}
                    </TableCell>
                    <TableCell>
                      {contract.beneficiary_bank_account_number}
                    </TableCell>
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
    vites: 0,
    service: 1,
    total: 0,
    discount: 0,
    firstPaymentValue: 0,
    firstPaymentDate: new Date(),
    financing: false,
  });
  const subTotalValue = useMemo(
    () =>
      parseFloat(
        contract.vites * services.find((p) => p.id === contract.service).value
      ).toFixed(2),
    [contract.vites, contract.service, services]
  );
  const discountValue = useMemo(
    () => parseFloat(subTotalValue * (contract.discount / 100)).toFixed(2),
    [subTotalValue, contract.discount]
  );
  const totalValue = useMemo(
    () => Math.round(parseFloat(subTotalValue - discountValue).toFixed(2)),
    [subTotalValue, discountValue]
  );
  const totalFinancingValue = useMemo(
    () => parseFloat(totalValue - contract.firstPaymentValue).toFixed(2),
    [contract.firstPaymentValue, totalValue]
  );
  const totalDuesValue = useMemo(
    () =>
     parseFloat(dues.reduce((a, c) => a + parseInt(c.value), 0)).toFixed(2),
    [dues]
  );

  const totalSubDuesValue = useMemo(
    () => parseFloat(totalFinancingValue - (totalDuesValue || 0)).toFixed(2),
    [totalDuesValue, totalFinancingValue]
  );

  const $Contract = useMemo(() => new ContractService(), []);

  useEffect(() => {
    (async () => {
      await fetchContracts();
    })();
  }, [$Contract]);

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
      vites: 0,
      service: 1,
      total: 0,
      discount: 0,
      firstPaymentValue: 0,
      firstPaymentDate: new Date(),
      financing: false,
    });
  };
  console.log(contracts);
  const onCreateContract = async () => {
    const { status } = await $Contract.complete({
      id: selectedContract.id,
      body:
        totalFinancingValue !== 0
          ? {
              // Financing
              financed: 1,
              with_guarantee: 0,
              contract_vites: contract.vites,
              contract_amount: subTotalValue,
              id_services: contract.service,
              percentage_discount: contract.discount,
              
              contract_discount: Math.round(discountValue,2),
              total_contract_with_discount: Math.round(totalValue,3),
              first_payment: contract.firstPaymentValue,
              first_payment_date: contract.firstPaymentDate,
              total_financed: totalDuesValue,
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
              contract_vites: contract.vites,
              contract_amount: subTotalValue,
              id_services: contract.service,
            

              percentage_discount: contract.discount,
              contract_discount: Math.round(discountValue,3),
              total_contract_with_discount:  Math.round(totalValue,3),
              first_payment: contract.firstPaymentValue,
              first_payment_date: contract.firstPaymentDate,
            },
    });

    if (status) {
      onCancelCreateContract();
      await fetchContracts();
    }
  };
  console.log(contracts);
  return (
    <Box padding={2}>
      <Typography variant="h2" color="primary" marginTop={14}>
        Contratos
      </Typography>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ margin: "auto", marginTop: 2 }}
      >
        <Table>
          <TableHead >
            <TableRow >
              {columnasVisibles.map((columna, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "white",
                    padding: 1,
                  }}
                >
                  {columna}
                </TableCell>
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
                  window.open(
                    `https://avovite-api-dev.concilbot.com/api/v1/contracts/files/${contract.id}`,
                    "_blank"
                  )
                }
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={!!selectedContract}
        onClose={onCancelCreateContract}
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle color="primary.main">Crear contrato</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={3}
            padding={1}
            onSubmit={onCreateContract}
          >
            <Grid display="flex" gap={2}>
              <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
                <TextField
                  label="Vites"
                  type="number"
                  variant="outlined"
                  value={contract.vites}
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
                <TextField
                  label="Fecha del primer abono"
                  variant="outlined"
                  type="date"
                  value={contract.firstPaymentDate}
                  required
                  sx={{ width: "100%" }}
                  
                />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
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
                <FormControlLabel
                  label="Financiamiento"
                  checked={totalFinancingValue !== 0}
                  control={<Checkbox />}
                  disabled
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
                    <Grid
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                    >
                      <Typography
                        fontSize={18}
                        fontWeight={500}
                        color="primary"
                      >
                        Total: $
                        <NumericFormat
                          displayType="text"
                          value={totalDuesValue}
                          thousandSeparator
                        ></NumericFormat>
                      </Typography>
                      {totalSubDuesValue > 0 && (
                        <Typography sx={{ color: "red", fontSize: 12 }}>
                          Faltante: $
                          <NumericFormat
                            displayType="text"
                            value={totalSubDuesValue}
                            thousandSeparator
                          ></NumericFormat>
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
                      <TextField
                        label="Fecha"
                        type="date"
                        variant="outlined"
                        required
                        value={due.date}
                        onChange={(event) =>
                          setDues((prev) =>
                            prev.map((d) =>
                              d.id === due.id
                                ? { ...due, date: event.target.value }
                                : d
                            )
                          )
                        }
                        sx={{ width: "100%" }}
                      />
                      <NumericFormat
                        customInput={TextField}
                        label="Valor"
                        variant="outlined"
                        value={due.value}
                        sx={{ width: "100%" }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Typography>$</Typography>
                            </InputAdornment>
                          ),
                        }}
                        onValueChange={({ floatValue }) =>
                          setDues((prev) =>
                            prev.map((d) =>
                              d.id === due.id
                                ? { ...due, value: floatValue }
                                : d
                            )
                          )
                        }
                        thousandSeparator
                      />
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <IconButton
                          color="error"
                          onClick={() =>
                            setDues((prev) =>
                              prev.filter((d) => d.id !== due.id)
                            )
                          }
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
                          { id: uuid(), date: new Date(), value: 0 },
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
          <Grid display='flex' justifyContent='space-between' alignItems='center' width='98%' height='100%' >
              
            <Grid display='flex' flexDirection='column' width='100%'>
            <TextField
                 label='Fecha de Contrato'
                  variant="outlined"
                  type="date"
                  sx={{width:'60%'}}
                  value={contract.firstPaymentDate}
                 
                  onChange={(event) =>
                    setContract((prev) => ({
                      ...prev,
                      firstPaymentDate: new Date(
                        event.target.value
                      ).toLocaleDateString("en-CA"),
                    }))
                  }
                />
            </Grid>
            <Grid display='flex' justifyContent='end'  width='50%' height='50%'>
            <Button onClick={onCancelCreateContract}sx={{width:'100%', height:'100%'}}>Cancelar</Button>
          <Button
            onClick={onCreateContract}
            variant="contained"
            sx={{width:'100%', height:'100%'}}
            disabled={totalDuesValue !== totalFinancingValue || !contract.vites}
          >
            Crear contrato
          </Button>
            </Grid>
          </Grid>
        
         
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dataset;
