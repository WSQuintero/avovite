import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Typography,
  Container,
  Stack,
  Box,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  alpha,
  ListItemIcon,
} from "@mui/material";
import { KeyboardArrowDown as CollapseIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";
import EnhancedTable from "../Components/EnhancedTable";
import DueService from "../Services/due.service";
import { NumericFormat } from "react-number-format";

const data = [
  {
    id: "2924",
    type: "Pago",
    created_at: new Date(),
    value: 2200000,
  },
  {
    id: "4728",
    type: "Ganancia",
    created_at: new Date(),
    value: 2200000,
  },
  {
    id: "5497",
    type: "Retiro",
    created_at: new Date(),
    value: 2200000,
  },
];

function Payments() {
  const [{ token }] = useSession();
  const [contracts, setContracts] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState({ fetching: true, collapse: null });
  const $Contract = useMemo(() => new ContractService(token), [token]);
  const $Due = useMemo(() => new DueService(token), [token]);

  const columns = useMemo(
    () => [
      {
        id: "id",
        label: "Número",
        align: "left",
        disablePadding: false,
        format: (value) => `AV-${value}`,
      },
      {
        id: "contract_vites",
        label: "Vites",
        align: "left",
        disablePadding: false,
      },
      {
        id: "fullname",
        label: "Nombre del pagador",
        align: "left",
        disablePadding: false,
      },
      {
        id: "mortgage_contract",
        label: "Hipotecado",
        align: "left",
        disablePadding: false,
        format: (value) => <Typography>{value === 0 ? "No" : "Si"}</Typography>,
      },
      {
        id: "contract_amount",
        label: "Valor de contrato",
        align: "left",
        disablePadding: false,
        format: (value) => (
          <>
            $<NumericFormat displayType="text" value={parseInt(value)} thousandSeparator></NumericFormat>
          </>
        ),
      },
      {
        id: "total_contract_with_discount",
        label: "Valor contrato con descuento",
        align: "left",
        disablePadding: false,

        format: (value) => (
          <>
            $<NumericFormat displayType="text" value={parseInt(value)} thousandSeparator></NumericFormat>
          </>
        ),
      },
      {
        id: "contract_vites",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row, onCollapse) => (
          <Stack direction="row" spacing={1}>
            {value !== "0" && (
              <Button
                size="small"
                variant="contained"
                sx={{ flexShrink: 0 }}
                onClick={async () => {
                  onCollapse();

                  if (!history[row.id]) {
                    fetchContractDues(row.id);
                  }
                }}
                startIcon={<CollapseIcon />}
              >
                Ver pagos
              </Button>
            )}
          </Stack>
        ),
      },
    ],
    [history]
  );

  const tableCollapse = useCallback(
    (row) => (
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={2}>
        <Typography variant="h4">Pagos del contrato</Typography>
        {loading.collapse === row.id ? (
          <LinearProgress />
        ) : (
          <List>
            {(history[row.id] || []).map((p) => (
              <ListItem
                key={p.id}
                secondaryAction={
                  <Grid display="flex" justifyContent="flex-end" gap={1}>
                    <Button disabled={p.status === 1}>{p.status === 0 ? "Pagar" : "Pagado"}</Button>
                  </Grid>
                }
                sx={(t) => ({
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: alpha(t.palette.primary.main, 0.1),
                  },
                })}
              >
                <ListItemIcon sx={{ minWidth: 128 + 8 }}>
                  <Typography color="text.primary" fontWeight={600}>
                    {p.quota_number === 0 ? "Cuota inicial" : `#${p.quota_number}`}
                  </Typography>{" "}
                </ListItemIcon>
                <ListItemText primary={formatCurrency(p.payment_amount, "$")} />
              </ListItem>
            ))}
          </List>
        )}
      </Grid>
    ),
    [history, loading.collapse]
  );

  const fetchContractDues = async (contractId) => {
    setLoading((prev) => ({ ...prev, collapse: contractId }));

    const { status, data } = await $Due.get({ contractId });

    if (status) {
      setHistory((prev) => ({ ...prev, [contractId]: data.data }));
    }

    setLoading((prev) => ({ ...prev, collapse: null }));
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        setContracts(data.data);
      }

      setLoading((prev) => ({ ...prev, fetching: false }));
    })();
  }, [$Contract]);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Pagos
          </Typography>
        </Stack>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={contracts} collapse={tableCollapse} />
      </Container>
    </PageWrapper>
  );
}

export default Payments;
