import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import useSession from "../Hooks/useSession";
import useShop from "../Hooks/useShop";
import EnhancedTable from "../Components/EnhancedTable";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";
import DetailsProduction from "./DetailsProduction";

function Production() {
  const [{ token }] = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState({ fetching: true });
  const $Shop = useShop();


  const columns = useMemo(
    () => [
      {
        id: "quantity",
        label: "Número de VITE",
        align: "left",
        disablePadding: false,
      },
      {
        id: "percent_discount",
        label: "Descuento",
        align: "left",
        disablePadding: false,
        format: (value) => <>{value}%</>,
      },
      {
        id: "unitary_price",
        label: "Inversión",
        align: "left",
        disablePadding: false,
        format: (value, row) => formatCurrency(value * row.quantity * (1 - row.percent_discount / 100), "$"),
      },
      {
        id: "tir",
        label: "Tir",
        align: "left",
        disablePadding: false,
        format: (value) => <>{value}%</>,
      },
      {
        id: "production_in_kilograms",
        label: "Producción en kilos",
        align: "left",
        disablePadding: false,
        format: (value) => <>{value} kg</>,
      },
      {
        id: "contract_vites",
        label: "",
        align: "left",
        disablePadding: false,
        format: () => (
          <Stack direction="row" spacing={1}>
            <Button component={RouterLink} to="/details-production "size="small" variant="contained">
              Ver detalles
            </Button>
          </Stack>
        ),
      },
    ],
    [history]
  );

  const fetchProducts = async () => {
    const { status, data } = await $Shop.shop.get();

    if (status) {
      setProducts(data.data);
    }
  };

  useEffect(() => {
    if ($Shop) {
      (async () => {
        await fetchProducts();
        setLoading((prev) => ({ ...prev, fetching: false }));
      })();
    }
  }, [$Shop]);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Producción
          </Typography>
        </Stack>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={products} />
      </Container>
    </PageWrapper>
  );
}

export default Production;
