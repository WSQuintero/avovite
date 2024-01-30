import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Container, Box, Stack, Button } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";

function Vites() {
  const [{ token }] = useSession();
  const [rows, setRows] = useState([]);
  const $Contract = useMemo(() => new ContractService(token), [token]);
  const columns = useMemo(
    () => [
      {
        accessorKey: "contract_vites",
        header: "Número de vites",
        Cell: ({ renderedCellValue }) =>
          Number(renderedCellValue) !== 0 ? (
            renderedCellValue
          ) : (
            <Typography fontSize={12} color="warning.light">
              En proceso
            </Typography>
          ),
      },
      {
        accessorKey: "id",
        header: "Número de contrato",
        Cell: ({ renderedCellValue }) => <>AV-{renderedCellValue}</>,
      },
      {
        accessorKey: "contract_label",
        header: "Etiqueta de contrato",
        size: 210
      },
      {
        accessorKey: "first_payment_date",
        header: "Fecha de compra",
        Cell: ({ renderedCellValue }) =>
          renderedCellValue ? (
            <>{dayjs(new Date(renderedCellValue)).format("DD MMMM YYYY")}</>
          ) : (
            <Typography fontSize={12} color="warning.light">
              En proceso
            </Typography>
          ),
      },
      {
        accessorKey: "earliest_sowing_date",
        header: "Fecha de siembra",
        Cell: ({ renderedCellValue }) =>
          renderedCellValue ? (
            <>{dayjs(new Date(renderedCellValue)).format("DD MMMM YYYY")}</>
          ) : (
            <Typography fontSize={12} color="warning.light">
              No se ha sembrado
            </Typography>
          ),
      },
      {
        accessorKey: "harvest_state",
        header: "Estado",
        Cell: ({ renderedCellValue }) =>
          renderedCellValue || (
            <Typography fontSize={12} color="warning.light">
              No se ha cosechado
            </Typography>
          ),
      },
      {
        accessorKey: "stateFignature",
        header: "Estado firma",
        Cell: ({ renderedCellValue, row: { original } }) =>
          original.urlValidocus ? (
            <Button component={RouterLink} to={original.urlValidocus} target="_blank" size="small" variant="contained">
              Ver firma
            </Button>
          ) : (
            renderedCellValue || (
              <Typography fontSize={12} color="warning.light">
                No firmado
              </Typography>
            )
          ),
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        setRows(data.data);
      }
    })();
  }, [$Contract]);

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
        <Table columns={columns} data={rows} />
      </Container>
    </PageWrapper>
  );
}

export default Vites;
