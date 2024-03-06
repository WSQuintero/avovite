import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, Container, Box, Stack, Button, Select, MenuItem } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import dayjs from "dayjs";
import { AvoviteWhiteIcon } from "../Components/Icons";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import AuthService from "../Services/user.service";
import BackButton from "../Components/BackButton";
import DownloadSharpIcon from "@mui/icons-material/DownloadSharp";
import SelectorCell from "../Components/SelectorCell";

function Vites() {
  const navigate = useNavigate();

  const [{ user, token }] = useSession();
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
        header: "ID Contrato",
        Cell: ({ renderedCellValue }) => <>AV-{renderedCellValue}</>,
      },
      {
        accessorKey: "contract_label",
        header: "Número de contrato",
        size: 210,
      },
      {
        accessorKey: "paidVite",
        header: "vites pagos",
        size: 210,
      },
      {
        accessorKey: "debt",
        header: "Deuda actual",
        size: 210,
        Cell: ({ renderedCellValue }) => (
          <>
            $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
          </>
        ),
      },
      {
        accessorKey: "total_contract_with_discount",
        header: "Total contrato",
        size: 210,
        Cell: ({ renderedCellValue }) => (
          <>
            $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
          </>
        ),
      },
      {
        accessorKey: "contract_vites",
        header: "Vites contratados",
        size: 210,
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
        accessorKey: "sowing_date",
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
        header: "Estado de Cosecha",
        Cell: (value) => (value ? "Maduros" : "En crecimiento"),
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

      // {
      //   accessorKey: "download_contract",
      //   header: "Contrato",
      //   size: 100,
      //   Cell: ({ row }) => (
      //     <Button
      //       onClick={() => handleDownloadContract(row.original.id)}
      //       size="small"
      //       variant="contained"
      //       color="primary"
      //       sx={{ fontSize: 1, minWidth: 5 }}
      //     >
      //       <DownloadSharpIcon />
      //     </Button>
      //   ),
      // },
      // {
      //   accessorKey: "download_property_certificate",
      //   header: "Certificado Propiedad",
      //   size: 100,
      //   Cell: ({ row }) => (
      //     <Button
      //       onClick={() => handleDownloadPropertyCertificate(row.original.id)}
      //       size="small"
      //       variant="contained"
      //       color="primary"
      //       sx={{ fontSize: 1, minWidth: 5 }}
      //     >
      //       <DownloadSharpIcon />
      //     </Button>
      //   ),
      // },
      // {
      //   accessorKey: "download_bonding_form",
      //   header: "Formulario Vinculación",
      //   size: 100,
      //   Cell: ({ row }) => (
      //     <Button
      //       onClick={() => handleDownloadbondingForm(row.original.id)}
      //       size="small"
      //       variant="contained"
      //       color="primary"
      //       sx={{ fontSize: 1, minWidth: 5 }}
      //     >
      //       <DownloadSharpIcon />
      //     </Button>
      //   ),
      // },
      {
        accessorKey: "selector",
        header: "Descargar",
        size: 100,
        Cell: SelectorCell,
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        setRows(data.data);
        console.log(data);
      }
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
