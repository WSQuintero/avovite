import React, { useMemo } from "react";
import { Typography, Container, Box, Stack } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";

const data = [
  {
    vites_quantity: 30,
    id: "AV-155",
    purchased_at: new Date(),
    sown_at: new Date(),
    status: "Estado óptimo",
  },
  {
    vites_quantity: 10,
    id: "AV-174",
    purchased_at: new Date(),
    sown_at: new Date(),
    status: "Estado óptimo",
  },
  {
    vites_quantity: 1,
    id: "AV-305",
    purchased_at: new Date(),
    sown_at: new Date(),
    status: "Estado óptimo",
  },
];

function Vites() {
  const columns = useMemo(
    () => [
      {
        accessorKey: "vites_quantity",
        header: "Número de vites",
      },
      {
        accessorKey: "id",
        header: "Número de contrato",
      },
      {
        accessorKey: "purchased_at",
        header: "Fecha de compra",
        Cell: ({ renderedCellValue }) => <>{dayjs(new Date(renderedCellValue)).format("DD-MM-YYYY")}</>,
      },
      {
        accessorKey: "sown_at",
        header: "Fecha de siembra",
        Cell: ({ renderedCellValue }) => <>{dayjs(new Date(renderedCellValue)).format("DD-MM-YYYY")}</>,
      },
      {
        accessorKey: "status",
        header: "Estado",
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
            VITES
          </Typography>
        </Stack>
        <Table columns={columns} data={data} />
      </Container>
    </PageWrapper>
  );
}

export default Vites;
