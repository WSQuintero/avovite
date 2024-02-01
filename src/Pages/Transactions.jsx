import { useMemo, useState, useEffect } from "react";
import { Typography, Container, Stack, Box, Button } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";
import useSession from "../Hooks/useSession";
import MovementService from "../Services/movement.service";
import useAsyncEffect from "../Hooks/useAsyncEffect";
import EnhancedTable from "../Components/EnhancedTable";
import { TRANSACTION_TYPES } from "../utilities/constants";
import { useNavigate } from 'react-router-dom';

function Transactions() {
  const navigate = useNavigate();
  
  const [{ user, token }] = useSession();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState({ fetching: true });
  const $Movement = useMemo(() => (token ? new MovementService(token) : null), [token]);
  const columns = useMemo(
    () => [
      {
        id: "id",
        label: "ID",
      },
      {
        id: "contract_id",
        label: "Contrato",
        format: (value) => `AV-${value}`,
      },
      {
        id: "transaction",
        label: "Transacción",
        format: (value) => TRANSACTION_TYPES[value],
      },
      {
        id: "dateCreate",
        label: "Fecha de Transacción",
        format: (value) => (value ? dayjs(new Date(value)).format("DD MMMM YYYY") : "-"),
      },
      {
        id: "transaction_value",
        label: "Valor de Transacción",
        format: (value) => formatCurrency(value, "$"),
      },
      {
        id: "id",
        label: "",
        format: (value) => (
          <Stack direction="row" spacing={1}>
            <Button disabled size="small" variant="contained">
              Ver detalles
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  useAsyncEffect(async () => {
    if ($Movement) {
      const { status, data } = await $Movement.get();

      if (status) {
        setRows(data.data);
      }

      setLoading((prev) => ({ ...prev, fetching: false }));
    }
  }, [$Movement]);

  useEffect(() => {
    if(user){
      if(user.status_terms_and_conditions==0){
        navigate('/dashboard');
      }
    }
  }, [user]);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Transacciones
          </Typography>
        </Stack>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={rows} />
      </Container>
    </PageWrapper>
  );
}

export default Transactions;
