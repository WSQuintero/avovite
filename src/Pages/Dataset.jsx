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
} from "@mui/material";
import { DeleteOutlined as DeleteIcon } from "@mui/icons-material";
import { NumericFormat } from "react-number-format";
import { v4 as uuid } from "uuid";
import ContractService from "../Services/contract.service";

const columnasVisibles = [
  "Contrato",
  "Fecha de Pago",
  "Nombre Beneficiario",
  "Tipo Documento Beneficiario",
  "Número Documento Beneficiario",
  "Lugar de Expedición del Documento Beneficiario",
  "Ciudad y País de Residencia Beneficiario",
  "Correo Electrónico Beneficiario",
  "Teléfono de Contacto Beneficiario",
  "Banco Beneficiario",
  "Tipo de Cuenta Beneficiario",
  "Número de Cuenta Beneficiario",
  "Nombre Pagador",
  "Tipo Documento Pagador",
  "Número Documento Pagador",
  "Lugar de Expedición del Documento Pagador",
];

const datosFalsos = [
  [
    "2023-07-01",
    "John Doe",
    "DNI",
    "12345678",
    "Ciudad1",
    "País1",
    "john.doe@example.com",
    "123456789",
    "Banco1",
    "Cuenta1",
    "987654321",
    "John Smith",
    "DNI",
    "87654321",
    "Ciudad2",
  ],
  [
    "2023-07-02",
    "Jane Doe",
    "Pasaporte",
    "ABC123",
    "Ciudad3",
    "País2",
    "jane.doe@example.com",
    "987654321",
    "Banco2",
    "Cuenta2",
    "123456789",
    "Jane Smith",
    "DNI",
    "654321",
    "Ciudad4",
  ],
  // Agregar más datos de ejemplo aquí...
];

const Dataset = () => {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Standard",
      value: 2200000,
    },
    {
      id: "2",
      name: "Premium",
      value: 2200000,
    },
  ]);

  const [selectedContract, setSelectedContract] = useState(null);
  const [dues, setDues] = useState([]);
  const [firstPayment, setFirstPayment] = useState({ date: new Date() });
  const [contract, setContract] = useState({
    vites: 0,
    product: "1",
    total: 0,
    discount: 0,
    firstPayment: 0,
    financing: false,
  });
  const subTotalValue = useMemo(
    () => contract.vites * products.find((p) => p.id === contract.product).value,
    [contract.vites, contract.product, products]
  );
  const discountValue = useMemo(() => subTotalValue * (contract.discount / 100), [subTotalValue, contract.discount]);
  const totalValue = useMemo(() => subTotalValue - discountValue, [subTotalValue, discountValue]);
  const totalFinancingValue = useMemo(() => totalValue - contract.firstPayment, [contract.firstPayment, totalValue]);
  const totalDuesValue = useMemo(() => dues.reduce((a, c) => a + parseInt(c.value), 0), [dues]);
  const $Contract = useMemo(() => new ContractService(), []);

  const onCancelCreateContract = (event) => {
    setSelectedContract(null);
    setContract({
      vites: 0,
      product: "1",
      total: 0,
      discount: 0,
      firstPayment: 0,
      financing: false,
    });
    setFirstPayment({
      date: new Date(),
    });
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        console.log(data);
      }
    })();
  }, [$Contract]);

  const onCreateContract = () => {
    // Aquí puedes hacer lo que desees con el valor de "cuotas"
    // Por ejemplo, enviarlo a una API o realizar alguna acción
    // Puedes agregar tu lógica aquí...
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ margin: "auto", marginTop: 20 }}>
        <Table stickyHeader sx={{ overflowX: "auto" }}>
          <TableHead>
            <TableRow>
              {columnasVisibles.map((columna, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "green",
                    whiteSpace: "nowrap",
                    border: "1px solid #C0C0C0",
                    padding: "8px",
                  }}
                >
                  {columna}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datosFalsos.map((fila, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    border: "1px solid #C0C0C0",
                    padding: "8px",
                  }}
                >
                  <Button variant="contained" onClick={() => setSelectedContract(fila)} sx={{ width: 104 }}>
                    Ver PDF
                  </Button>
                </TableCell>
                {fila.map((valor, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      border: "1px solid #C0C0C0",
                      padding: "8px",
                      color: "#c0c0c0",
                    }}
                  >
                    {valor}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={!!selectedContract} onClose={onCancelCreateContract} maxWidth="xl" fullWidth>
        <DialogTitle color="primary.main">Crear contrato</DialogTitle>
        <DialogContent>
          <Box component="form" display="flex" flexDirection="column" gap={3} padding={1} onSubmit={onCreateContract}>
            <Grid display="flex" gap={2}>
              <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
                <TextField
                  label="Vites"
                  type="number"
                  variant="outlined"
                  value={contract.vites}
                  onInput={(event) => setContract((prev) => ({ ...prev, vites: event.target.value }))}
                  sx={{ width: "100%" }}
                />
                <TextField
                  select
                  label="Producto"
                  value={contract.product}
                  onChange={(event) => setContract((prev) => ({ ...prev, product: event.target.value }))}
                  sx={{ width: "100%" }}
                >
                  {products.map((option) => (
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
                  onInput={(event) => setContract((prev) => ({ ...prev, discount: event.target.value }))}
                />
                <NumericFormat
                  customInput={TextField}
                  label="Primer abono"
                  variant="outlined"
                  value={contract.firstPayment}
                  sx={{ width: "100%" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Typography>$</Typography>
                      </InputAdornment>
                    ),
                  }}
                  thousandSeparator
                  onValueChange={({ floatValue }) => setContract((prev) => ({ ...prev, firstPayment: floatValue }))}
                />
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
                <TextField label="Subtotal" variant="outlined" value={subTotalValue} disabled sx={{ width: "100%" }} />
                <TextField label="Descuento" variant="outlined" value={discountValue} disabled sx={{ width: "100%" }} />
                <TextField label="Total" variant="outlined" value={totalValue} disabled sx={{ width: "100%" }} />
                <TextField
                  label="Fecha del primer abono"
                  variant="outlined"
                  value={firstPayment.date.toLocaleDateString()}
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
                    <Typography variant="h2" fontSize={18} fontWeight={500}>
                      Total: $
                      <NumericFormat displayType="text" value={totalDuesValue} thousandSeparator></NumericFormat>
                    </Typography>
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
                        value={due.date}
                        onChange={(event) =>
                          setDues((prev) =>
                            prev.map((d) => (d.id === due.id ? { ...due, date: event.target.value } : d))
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
                          setDues((prev) => prev.map((d) => (d.id === due.id ? { ...due, value: floatValue } : d)))
                        }
                        thousandSeparator
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
                  <Button
                    variant="contained"
                    onClick={() => setDues((prev) => [...prev, { id: uuid(), date: new Date(), value: 0 }])}
                  >
                    Agregar
                  </Button>
                </Grid>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancelCreateContract}>Cancelar</Button>
          <Button
            onClick={onCreateContract}
            variant="contained"
            disabled={totalDuesValue !== totalFinancingValue || !contract.vites}
          >
            Crear contrato
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dataset;
