import { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import CardMenu from "../Components/CardMenu";
import { useNavigate, useParams } from "react-router-dom";

function TransferMoney() {
  const navigate = useNavigate();
  const { bank } = useParams();
  const [transfer, setTransfer] = useState({
    name: "",
    company: "",
    country: "",
    value: "",
    bank_account: "",
    details: "",
  });
  const [isTransferSent, setIsTransferSent] = useState(false);

  const onInputChange = (event) => {
    const { name, value } = event.target;
    setTransfer((prev) => ({ ...prev, [name]: value }));
  };

  return !bank ? (
    <Grid display="flex" flexWrap="wrap" gap={2}>
      <Box width="100%">
        <CardMenu title="Bancolombia" mobile icon={<ShoppingCartIcon />} onClick={() => navigate("bancolombia")} />
      </Box>
      <Box width="100%">
        <CardMenu title="Davivienda" mobile icon={<ShoppingCartIcon />} />
      </Box>
      <Box width="100%">
        <CardMenu title="BBVA" mobile icon={<ShoppingCartIcon />} />
      </Box>
      <Box width="100%">
        <CardMenu title="Bancamia" mobile icon={<ShoppingCartIcon />} />
      </Box>
    </Grid>
  ) : !isTransferSent ? (
    <Grid display="flex" flexDirection="column" gap={4}>
      <Typography variant="h2">Datos de tranferencia</Typography>
      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid
          display="flex"
          gap={2}
          sx={(t) => ({
            [t.breakpoints.down("lg")]: {
              flexDirection: "column",
            },
          })}
        >
          <TextField
            name="name"
            label="Nombre completo"
            value={transfer.name}
            required
            fullWidth
            onChange={onInputChange}
          />
          <TextField
            name="company"
            label="Nombre de la Compañía (opcional)"
            value={transfer.company}
            fullWidth
            onChange={onInputChange}
          />
        </Grid>
        <Grid
          display="flex"
          gap={2}
          sx={(t) => ({
            [t.breakpoints.down("lg")]: {
              flexDirection: "column",
            },
          })}
        >
          <TextField name="country" label="País" value={transfer.country} required fullWidth onChange={onInputChange} />
          <TextField
            name="value"
            label="Valor de Transferencia"
            value={transfer.value}
            required
            fullWidth
            onChange={onInputChange}
          />
        </Grid>
        <Grid
          display="flex"
          gap={2}
          sx={(t) => ({
            [t.breakpoints.down("lg")]: {
              flexDirection: "column",
            },
          })}
        >
          <TextField
            name="bank_account"
            label="Cuenta Bancaria"
            value={transfer.bank_account}
            required
            fullWidth
            onChange={onInputChange}
          />
          <TextField
            name="details"
            label="Detalles"
            value={transfer.details}
            required
            fullWidth
            onChange={onInputChange}
          />
        </Grid>
        <Button variant="contained" size="large" onClick={() => setIsTransferSent(true)}>
          Aceptar
        </Button>
      </Grid>
    </Grid>
  ) : (
    <Grid display="flex" margin="auto">
      <Box display="flex" flexDirection="column" gap={3} padding={8} border={1} borderRadius={4}>
        <Typography variant="h2">Detalles de la transacción</Typography>
        <Grid>
          <Typography color="primary">Fecha y hora de transacción</Typography>
          <Typography>Transacción a {bank}</Typography>
          <Typography>{new Date().toDateString()}</Typography>
        </Grid>
        <Grid>
          <Typography color="primary">Origen</Typography>
          <Typography>Cuenta Avovite</Typography>
          <Typography>N*******0413</Typography>
        </Grid>
        <Grid>
          <Typography color="primary">Valor de Transacción</Typography>
          <Typography>$1,000,000</Typography>
        </Grid>
        <Grid>
          <Typography color="primary">Numero de autorización</Typography>
          <Typography>008473</Typography>
        </Grid>
        <Button variant="contained" size="large" fullWidth>
          Aceptar
        </Button>
      </Box>
    </Grid>
  );
}

export default TransferMoney;
