import React, { useEffect, useMemo, useState } from "react";
import { Typography, Container, Stack, Box, Button, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";
import useAsyncEffect from "../Hooks/useAsyncEffect";
import EnhancedTable from "../Components/EnhancedTable";

function Harvests() {
  const [{ token }] = useSession();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState({ fetching: true });
  const $Contract = useMemo(() => (token ? new ContractService(token) : null), [token]);
  const columns = useMemo(
    () => [
      {
        id: "contract_number",
        label: "Numero de contrato",
        format: (value) => `AV-${value}`,
      },
      {
        id: "total_vite",
        label: "Numero de VITE",
      },
      {
        id: "dateCreate",
        label: "Fecha de Cosecha",
        format: (value) => dayjs(new Date(new Date())).format("DD MMMM YYYY"),
      },
      {
        id: "kg_correspondence",
        label: "Kg Cosechados",
        format: (value) => formatCurrency(Number(value || 0).toFixed(2)),
      },
      {
        id: "payment_correspondence",
        label: "Valor de Cosecha",
        format: (value) => (value ? formatCurrency(Number(value || 0), "$") : "-"),
      },
      {
        id: "id",
        label: "",
        format: (value) => (
          <Stack direction="row" spacing={1}>
            {/* <Button
              component={RouterLink}
              to="https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf"
              target="_blank"
              size="small"
              variant="contained"
              sx={{ flexShrink: 0 }}
            >
              Descargar factura
            </Button> */}
            <Button component={RouterLink} to={`/harvests/${value}/certificates`} size="small" variant="contained" sx={{ flexShrink: 0 }}>
              Certificados
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );

  const fetchContracts = async () => {
    const { status, data } = await $Contract.get({ harvest: true });

    if (status) {
      setContracts(data.data);
    }
  };

  useAsyncEffect(async () => {
    console.log("Fetching");
    await fetchContracts();

    setLoading((prev) => ({ ...prev, fetching: false }));
  }, []);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Cosechas
          </Typography>
        </Stack>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={contracts} />
      </Container>
    </PageWrapper>
  );
}

export default Harvests;
