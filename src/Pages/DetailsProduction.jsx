import React, { useMemo, useState } from "react";
import { Box, Container, Grid, IconButton, Stack, Typography, Button } from "@mui/material";
import { AddOutlined as AddIcon, RemoveOutlined as RemoveIcon } from "@mui/icons-material";
import EnhancedTable from "../Components/EnhancedTable";
import { AvoviteWhiteIcon } from "../Components/Icons";
import PageWrapper from "../Components/PageWrapper";
import useAsyncEffect from "../Hooks/useAsyncEffect";
import useSession from "../Hooks/useSession";
import ProductionService from "../Services/production.service";

const LABELS = {
  estimatedTreeProductionKg: "Produccion Estimada x Arbol (KG Año)",
  avocadoValue: "Valor Aguacate",
  totalProduction: "Total Produccion",
  totalAnnualSalesValue: "Valor Total Venta Anual",
  avovitePayment: "Cobro 30% Avovite",
  netIncome: "Ingreso Neto 70% Inversor",
};

const CELL_SIZE = 128;

function transposeObject(obj) {
  const transposedObject = {};

  for (const year in obj) {
    for (const prop in obj[year]) {
      if (!transposedObject[prop]) {
        transposedObject[prop] = {};
      }
      transposedObject[prop][year] = obj[year][prop];
    }
  }

  return transposedObject;
}

function DetailsProduction() {
  const [{ token }] = useSession();
  const [production, setProduction] = useState([]);
  const [loading, setLoading] = useState({ fetching: true });
  const [quantity, setQuantity] = useState(1);
  const $Production = useMemo(() => (token ? new ProductionService(token) : null), [token]);
  const columns = useMemo(
    () => [
      {
        id: "name",
        label: (
          <Grid display="flex" alignItems="center" gap={2}>
            <Typography>Vites:</Typography>
            <Box display="flex" alignItems="center" border={1} borderRadius={10} borderColor="primary.main">
              <IconButton color="primary" size="small" onClick={() => updateQuantity(-1)}>
                <RemoveIcon />
              </IconButton>
              <Box display="flex" justifyContent="center" paddingX={0.5} color="primary.main" width={32}>
                {quantity}
              </Box>
              <IconButton color="primary" size="small" onClick={() => updateQuantity(1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Grid>
        ),
        format: (value) => LABELS[value],
        width: CELL_SIZE * 2,
      },
      { id: "Year1", label: "AÑO 1", width: CELL_SIZE },
      { id: "Year2", label: "AÑO 2", width: CELL_SIZE },
      { id: "Year3", label: "AÑO 3", width: CELL_SIZE },
      { id: "Year4", label: "AÑO 4", width: CELL_SIZE },
      { id: "Year5", label: "AÑO 5", width: CELL_SIZE },
      { id: "Year6", label: "AÑO 6", width: CELL_SIZE },
      { id: "Year7", label: "AÑO 7", width: CELL_SIZE },
      { id: "Year8", label: "AÑO 8", width: CELL_SIZE },
      { id: "Year9", label: "AÑO 9", width: CELL_SIZE },
      { id: "Year10", label: "AÑO 10", width: CELL_SIZE },
      { id: "Year11", label: "AÑO 11", width: CELL_SIZE },
      { id: "Year12", label: "AÑO 12", width: CELL_SIZE },
      { id: "Year13", label: "AÑO 13", width: CELL_SIZE },
      { id: "Year14", label: "AÑO 14", width: CELL_SIZE },
      { id: "Year15", label: "AÑO 15", width: CELL_SIZE },
      { id: "Year16", label: "AÑO 16", width: CELL_SIZE },
      { id: "Year17", label: "AÑO 17", width: CELL_SIZE },
      { id: "Year18", label: "AÑO 18", width: CELL_SIZE },
      { id: "Year19", label: "AÑO 19", width: CELL_SIZE },
      { id: "Year20", label: "AÑO 20", width: CELL_SIZE },
    ],
    [quantity]
  );

  const updateQuantity = async (action) => {
    setQuantity((prev) => (prev + action === -1 ? 0 : prev + action));
  };

  const fetchProductions = async () => {
    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $Production.get({ vites: quantity });

    if (status) {
      const transposed = transposeObject(data.data);
      setProduction(Object.entries(transposed).map((entry) => ({ ...entry[1], name: entry[0] })));
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  useAsyncEffect(async () => {
    await fetchProductions();
  }, [quantity]);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Kilogramos
          </Typography>
        </Stack>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={production} />
      </Container>
    </PageWrapper>
  );
}

export default DetailsProduction;
