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
  ListItemSecondaryAction,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { KeyboardArrowDown as CollapseIcon, Style } from "@mui/icons-material";
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
import $Epayco from "../Services/epayco.service";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import BackButton from "../Components/BackButton";
import TablePayments from "../Components/TablePayments";

function Payments() {
  const navigate = useNavigate();

  const [{ token, user }] = useSession();
  const [contracts, setContracts] = useState([]);
  const [history, setHistory] = useState({});
  const [loading, setLoading] = useState({ fetching: true, collapse: null });
  const $Contract = useMemo(() => new ContractService(token), [token]);
  const $Due = useMemo(() => new DueService(token), [token]);

  const columns = useMemo(
    () => [
      {
        id: "id",
        label: "ID Contrato",
        align: "left",
        disablePadding: false,
        format: (value) => `AV-${value}`,
      },
      {
        id: "contract_vites",
        label: "Vites",
        align: "left",
        disablePadding: false,
        format: (value) => Number(value),
      },
      {
        id: "fullname",
        label: "Pagador",
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
        <TableHead>
          <TableHead>
            <TableRow>
              {Object.keys({
                Cuota: null,
                Monto: null,
                "Referencia Epayco": null,
                Fecha: null,
                "Estado de pago": null,
              }).map((key, index) => (
                <TableCell key={index} sx={{ width: "21%", border: "1px solid rgba(128, 128, 128, 0.5)" }}>
                  {key}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </TableHead>

        {loading.collapse === row.id ? (
          <LinearProgress />
        ) : (
          <List sx={{ mb: 2 }}>
            {(history[row.id] || []).map((payment) => (
              <TablePayments
                key={row.id}
                data={{
                  Cuota: payment.quota_number === 0 ? "Cuota inicial" : `#${payment.quota_number}`,
                  Monto: formatCurrency(payment.payment_amount, "$"),
                  "Referencia Epayco": payment.idtransacional[0]?.x_ref_payco || "N/A",
                  Fecha: payment.idtransacional[0]?.x_transaction_date || "N/A",
                }}
                status={payment.status}
                handlePlayment={handlePlayment}
                p={payment}
              />
            ))}
          </List>
        )}
      </Grid>
    ),
    [history, loading.collapse]
  );

  const handlePlayment = async (due) => {
    await $Epayco.pay({
      name: `Pago del contrato AV-${due.id_contracts}`,
      description: due.quota_number !== 0 ? "Cuota del contrato" : "Primer pago del contrato",
      invoice: `AV-${uuid()}`,
      amount: due.payment_amount,
      extra1: null,
      extra2: token,
      extra3: due.id_contracts,
      extra4: null,
      extra5: due.id,
      confirmationUrl: `contract-transactional-payments/financed`,
      redirectionUrl: `transactions`,
    });
  };

  const fetchContractDues = async (contractId) => {
    setLoading((prev) => ({ ...prev, collapse: contractId }));

    const { status, data } = await $Due.get({ contractId });

    if (status) {
      setHistory((prev) => ({ ...prev, [contractId]: data.data }));
      console.log(data);
    }

    setLoading((prev) => ({ ...prev, collapse: null }));
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await $Contract.get(user?.id);

      if (status) {
        setContracts(data.data);
      }

      setLoading((prev) => ({ ...prev, fetching: false }));
    })();
  }, [$Contract, user]);

  useEffect(() => {
    if (user) {
      if (user.status_terms_and_conditions == 0 || !user.status_terms_and_conditions_date) {
        navigate("/dashboard");
      }
    }
  }, [user]);

  return (
    <PageWrapper>
      <BackButton />
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Pagos
          </Typography>
        </Stack>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={contracts} collapse={tableCollapse} initialOrder="desc" />
      </Container>
    </PageWrapper>
  );
}

export default Payments;
