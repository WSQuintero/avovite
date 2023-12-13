import React, { useEffect, useMemo, useState } from "react";
import { Typography, Container, Box, Stack } from "@mui/material";
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
      },
      {
        accessorKey: "contract_number",
        header: "Número de contrato",
      },
      {
        accessorKey: "first_payment_date",
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
