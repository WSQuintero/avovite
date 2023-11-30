import React, { useMemo } from "react";
import { Typography, Container, Stack, Box, Button, Link } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";
import { Link as RouterLink, useParams } from "react-router-dom";

const Harvests = [
  {
    id: "7159",
    date: new Date(),
    weight: 280,
    value: 2200000,
    contract_id: "4010",
    contract_vites: 50,
  },
  {
    id: "3122",
    date: new Date(),
    weight: 300,
    value: 2200000,
    contract_id: "7616",
    contract_vites: 20,
  },
  {
    id: "3880",
    date: new Date(),
    weight: 750,
    value: 2200000,
    contract_id: "4578",
    contract_vites: 1,
  },
];

function HarvestDetail() {
  const { contractId } = useParams();

  const columns = useMemo(
    () => [
      {
        accessorKey: "contract_id",
        header: "Numero de contrato",
      },
      {
        accessorKey: "contract_vites",
        header: "Numero de VITE",
      },
      {
        accessorKey: "date",
        header: "Fecha de Cosecha",
        Cell: ({ renderedCellValue }) => <>{dayjs(new Date(renderedCellValue)).format("DD-MM-YYYY")}</>,
      },
      {
        accessorKey: "weight",
        header: "Kg Cosechados",
        Cell: ({ renderedCellValue }) => <>{renderedCellValue} Kg</>,
      },
      {
        accessorKey: "value",
        header: "Valor de Cosecha",
        Cell: ({ renderedCellValue }) => <>${formatCurrency(renderedCellValue)} COP</>,
      },
      {
        accessorKey: "id",
        header: "",
        Cell: ({ renderedCellValue }) => (
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="contained">
              Descargar factura
            </Button>
          </Stack>
        ),
      },
    ],
    []
  );
  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Historial de cosechas
          </Typography>
        </Stack>
        <Table columns={columns} data={[Harvests.find((h) => h.contract_id === contractId)]} />
      </Container>
    </PageWrapper>
  );
}

export default HarvestDetail;
