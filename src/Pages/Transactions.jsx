import React, { useMemo, useState } from "react";
import { Typography, Container, Stack, Box, Button } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import { formatCurrency } from "../utilities";

function Transactions() {
  const [rows, setRows] = useState([]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "type",
        header: "Transacción",
      },
      {
        accessorKey: "created_at",
        header: "Fecha de Transacción",
        Cell: ({ renderedCellValue }) => <>{dayjs(new Date(renderedCellValue)).format("DD-MM-YYYY")}</>,
      },
      {
        accessorKey: "value",
        header: "Valor de Transacción",
        Cell: ({ renderedCellValue }) => <>${formatCurrency(renderedCellValue)} COP</>,
      },
      {
        accessorKey: "id",
        header: "",
        Cell: ({ renderedCellValue }) => (
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="contained">
              Ver detalles
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
            Transacciones
          </Typography>
        </Stack>
        <Table columns={columns} data={rows} />
      </Container>
    </PageWrapper>
  );
}

export default Transactions;
