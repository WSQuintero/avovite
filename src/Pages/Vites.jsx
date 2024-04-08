import { useEffect, useMemo, useState } from "react";
import { Typography, Container, Box, Stack, MenuItem, Divider, Grid } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import Table from "../Components/Table";
import { AvoviteWhiteIcon } from "../Components/Icons";
import ContractService from "../Services/contract.service";
import useSession from "../Hooks/useSession";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import BackButton from "../Components/BackButton";
import SelectorCell from "../Components/SelectorCell";
import ModalFirmContract from "../Components/ModalFirmContract";
import { formatCurrency, formatDate, formatDate as formatLongDate } from "../utilities";
import useConfig from "../Hooks/useConfig";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";

function Vites() {
  const navigate = useNavigate();
  const [{ constants }] = useConfig();
  const [informationContractFilter, setInformationContractFilter] = useState([]);
  const [{ user, token }] = useSession();
  const [rows, setRows] = useState([]);
  const $Contract = useMemo(() => new ContractService(token), [token]);
  const [openSignedModal, setOpenSignedModal] = useState(false);
  const [contractsWithMortgageSigned, setContractsWithMortgageSigned] = useState();
  const [loading, setLoading] = useState(true);

  // const columns = useMemo(
  //   () => [
  //     {
  //       accessorKey: "contract_vites",
  //       header: "Número de vites",
  //       Cell: ({ renderedCellValue }) =>
  //         Number(renderedCellValue) !== 0 ? (
  //           renderedCellValue
  //         ) : (
  //           <Typography fontSize={12} color="warning.light">
  //             En proceso
  //           </Typography>
  //         ),
  //     },
  //     {
  //       accessorKey: "id",
  //       header: "ID Contrato",
  //       Cell: ({ renderedCellValue }) => <>AV-{renderedCellValue}</>,
  //     },
  //     {
  //       accessorKey: "contract_label",
  //       header: "Número de contrato",
  //       size: 210,
  //     },
  //     {
  //       accessorKey: "paidVite",
  //       header: "vites pagos",
  //       size: 210,
  //     },
  //     {
  //       accessorKey: "debt",
  //       header: "Total pagado",
  //       size: 210,
  //       Cell: ({ renderedCellValue }) => (
  //         <>
  //           $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
  //         </>
  //       ),
  //     },
  //     {
  //       accessorKey: "overdue_quotas",
  //       id: "overdue_quotas",
  //       header: "Cuotas en mora",
  //     },
  //     {
  //       accessorKey: "pay_quotas",
  //       id: "pay_quotas",
  //       header: "Cuotas pagadas",
  //     },
  //     {
  //       accessorKey: "pending_quotas",
  //       id: "pay_quotas",
  //       header: "Cuotas pendientes",
  //     },
  //     {
  //       accessorKey: "total_quotas",
  //       id: "total_quotes",
  //       header: "Total de cuotas",
  //     },
  //     {
  //       accessorKey: "Total pagado",
  //       header: "Deuda actual",
  //       size: 210,
  //       Cell: ({ renderedCellValue }) => (
  //         <>
  //           $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
  //         </>
  //       ),
  //     },
  //     {
  //       accessorKey: "total_contract_with_discount",
  //       header: "Total contrato",
  //       size: 210,
  //       Cell: ({ renderedCellValue }) => (
  //         <>
  //           $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
  //         </>
  //       ),
  //     },
  //     {
  //       accessorKey: "contract_vites",
  //       header: "Vites contratados",
  //       size: 210,
  //     },
  //     {
  //       accessorKey: "first_payment_date",
  //       header: "Fecha de compra",
  //       Cell: ({ renderedCellValue }) =>
  //         renderedCellValue ? (
  //           <>{dayjs(new Date(renderedCellValue)).format("DD MMMM YYYY")}</>
  //         ) : (
  //           <Typography fontSize={12} color="warning.light">
  //             En proceso
  //           </Typography>
  //         ),
  //     },
  //     {
  //       accessorKey: "sowing_date",
  //       header: "Fecha de siembra",
  //       Cell: ({ renderedCellValue }) =>
  //         renderedCellValue ? (
  //           <>{dayjs(new Date(renderedCellValue)).format("DD MMMM YYYY")}</>
  //         ) : (
  //           <Typography fontSize={12} color="warning.light">
  //             No se ha sembrado
  //           </Typography>
  //         ),
  //     },
  //     {
  //       accessorKey: "harvest_state",
  //       header: "Estado de Cosecha",
  //       Cell: (value) => (value ? "Maduros" : "En crecimiento"),
  //     },
  //     {
  //       accessorKey: "stateFignature",
  //       header: "Estado firma",
  //       Cell: ({ renderedCellValue, row: { original } }) =>
  //         original.urlValidocus ? (
  //           <Button component={RouterLink} to={original.urlValidocus} target="_blank" size="small" variant="contained">
  //             Ver firma
  //           </Button>
  //         ) : (
  //           renderedCellValue || (
  //             <Typography fontSize={12} color="warning.light">
  //               No firmado
  //             </Typography>
  //           )
  //         ),
  //     },

  //     // {
  //     //   accessorKey: "download_contract",
  //     //   header: "Contrato",
  //     //   size: 100,
  //     //   Cell: ({ row }) => (
  //     //     <Button
  //     //       onClick={() => handleDownloadContract(row.original.id)}
  //     //       size="small"
  //     //       variant="contained"
  //     //       color="primary"
  //     //       sx={{ fontSize: 1, minWidth: 5 }}
  //     //     >
  //     //       <DownloadSharpIcon />
  //     //     </Button>
  //     //   ),
  //     // },
  //     // {
  //     //   accessorKey: "download_property_certificate",
  //     //   header: "Certificado Propiedad",
  //     //   size: 100,
  //     //   Cell: ({ row }) => (
  //     //     <Button
  //     //       onClick={() => handleDownloadPropertyCertificate(row.original.id)}
  //     //       size="small"
  //     //       variant="contained"
  //     //       color="primary"
  //     //       sx={{ fontSize: 1, minWidth: 5 }}
  //     //     >
  //     //       <DownloadSharpIcon />
  //     //     </Button>
  //     //   ),
  //     // },
  //     // {
  //     //   accessorKey: "download_bonding_form",
  //     //   header: "Formulario Vinculación",
  //     //   size: 100,
  //     //   Cell: ({ row }) => (
  //     //     <Button
  //     //       onClick={() => handleDownloadbondingForm(row.original.id)}
  //     //       size="small"
  //     //       variant="contained"
  //     //       color="primary"
  //     //       sx={{ fontSize: 1, minWidth: 5 }}
  //     //     >
  //     //       <DownloadSharpIcon />
  //     //     </Button>
  //     //   ),
  //     // },
  //     {
  //       accessorKey: "selector",
  //       header: "Descargar",
  //       size: 100,
  //       Cell: SelectorCell,
  //     },
  //   ],
  //   []
  // );
  const columns = [
    {
      accessorKey: "id",
      id: "id",
      header: "Número",
      Cell: ({ renderedCellValue }) => <Typography>AV-{renderedCellValue}</Typography>,
    },
    {
      accessorKey: "created_at",
      id: "contract_date",
      header: "Fecha del contrato",
      Cell: ({ renderedCellValue }) => {
        return <Typography>{formatDate(renderedCellValue)}</Typography>;
      },
    },
    {
      accessorKey: "contract_label",
      id: "contract_label",
      header: "Etiqueta",
    },
    {
      accessorKey: "fullname",
      id: "fullname",
      header: "Pagador",
      Cell: ({ renderedCellValue, row: { original } }) => (
        <Stack>
          <Typography>{renderedCellValue}</Typography>
          <Typography fontSize={12}>{original.email}</Typography>
        </Stack>
      ),
    },
    {
      accessorKey: "harvest_state",
      header: "Estado de Cosecha",
      // Cell: (value) => value,
    },
    {
      accessorKey: "id_type",
      id: "id_type",
      header: "Tipo de documento",
      Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue}</Typography>,
    },
    {
      accessorKey: "id_number",
      id: "id_number",
      header: "Número de documento",
      Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue}</Typography>,
    },
    {
      accessorKey: "id_location_expedition",
      id: "id_location_expedition",
      header: "Lugar de expedición",
      Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue}</Typography>,
    },
    {
      accessorKey: "mortgage_contract",
      id: "mortgage_contract",
      header: "Hipotecado",
      size: 50,
      Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue === 0 ? "No" : "Si"}</Typography>,
    },
    {
      accessorKey: "contract_vites",
      id: "contract_vites",
      header: "Vites",
    },
    {
      accessorKey: "paidVite",
      header: "vites pagos",
      size: 210,
    },
    {
      accessorKey: "overdue_quotas",
      id: "overdue_quotas",
      header: "Cuotas en mora",
    },
    {
      accessorKey: "pay_quotas",
      id: "pay_quotas",
      header: "Cuotas pagadas",
    },
    {
      accessorKey: "pending_quotas",
      id: "pay_quotas",
      header: "Cuotas pendientes",
    },
    {
      accessorKey: "total_quotas",
      id: "total_quotas",
      header: "Total de cuotas",
    },
    {
      accessorKey: "debt",
      header: "Total pagado",
      size: 210,
      Cell: ({ renderedCellValue }) => (
        <>
          $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
        </>
      ),
    },
    {
      accessorKey: "contract_amount",
      id: "contract_amount",
      header: "Valor de contrato",
      Cell: ({ renderedCellValue }) => (
        <>
          $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
        </>
      ),
    },
    {
      accessorKey: "total_contract_with_discount",
      id: "total_contract_with_discount",
      header: "Valor contrato con descuento",
      size: 300,

      Cell: ({ renderedCellValue }) => (
        <>
          $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
        </>
      ),
    },
    // {
    //   accessorKey: "payment_numbers",
    //   id: "payment_numbers",
    //   header: "Número de cuotas",
    // },

    {
      accessorKey: "stateFignature",
      id: "stateFignature",
      header: "Estado de la firma",
    },
    {
      accessorKey: "whiteList",
      id: "whiteList",
      header: "¿Contrato financiado?",
      Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue === 0 ? "No" : "Si"}</Typography>,
    },
    {
      accessorKey: "selector",
      header: "Descargar",
      size: 100,
      Cell: SelectorCell,
    },
  ];
  const handleCloseModal = () => {
    setOpenSignedModal(false);
  };

  useEffect(() => {
    (async () => {
      const { status, data } = await $Contract.get();

      if (status) {
        setRows(data.data);
        console.log(data.data);
        const formattedData = data.data.map((contract) => ({
          id: contract.id,
          isSigned: contract.stateFignature === "Firmado",
          hasMortgage: contract.mortgage_contract === 1,
        }));
        const noSignedContract = formattedData?.filter((contract) => !contract.isSigned);
        const signedContractWithMortgage = formattedData?.filter((contract) => contract.isSigned && contract.hasMortgage);
        if (noSignedContract.length > 0) {
          setOpenSignedModal(true);
          setInformationContractFilter(noSignedContract);
        }
        if (signedContractWithMortgage.length > 0) {
          setContractsWithMortgageSigned(signedContractWithMortgage);
        }
        setLoading(false);
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

  useEffect(() => {
    if (openSignedModal) {
      setTimeout(() => {
        handleCloseModal();
      }, 5000);
    }
  }, [openSignedModal]);

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
        <MaterialReactTable
          columns={columns}
          data={rows}
          enableColumnFilterModes
          enableColumnOrdering
          muiTablePaperProps={{ elevation: 0 }}
          initialState={{ density: "compact" }}
          muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
          state={{ showSkeletons: loading }}
          localization={MRT_Localization_ES}
          enablePagination={true}
          renderDetailPanel={({ row: { original: row } }) => (
            <Grid display="flex" flexDirection="column" gap={2} width="100%" padding={2}>
              <Grid display="flex" flexDirection="column" gap={1}>
                <Typography variant="h4" mt={4}>
                  Información financiera
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Financiado:{" "}
                  </Typography>
                  {row.financed ? "Si" : "No"}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Descuento:{" "}
                  </Typography>
                  {row.percentage_discount}%
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Valor descontado:{" "}
                  </Typography>
                  ${formatCurrency(row.contract_discount)}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Total con descuento:{" "}
                  </Typography>
                  ${formatCurrency(row.total_contract_with_discount)}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Fecha de contrato:{" "}
                  </Typography>
                  {formatDate(row.created_at)}
                </Typography>
                <Typography variant="h4" mt={4}>
                  Información de primer pago
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Valor:{" "}
                  </Typography>
                  ${formatCurrency(row.first_payment)}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Fecha:{" "}
                  </Typography>
                  {formatLongDate(row.first_payment_date)}
                </Typography>

                <Typography variant="h4" mt={4}>
                  Información del titular
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Nombre:{" "}
                  </Typography>
                  {row.fullname}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Teléfono:{" "}
                  </Typography>
                  {row.cellphone}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Correo:{" "}
                  </Typography>
                  {row.email}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Tipo de documento:{" "}
                  </Typography>
                  {row.id_type}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Número de documento:{" "}
                  </Typography>
                  {row.id_number}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Lugar de expedición documento:{" "}
                  </Typography>
                  {row.id_location_expedition}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Número de cuenta:{" "}
                  </Typography>
                  {row.user_bank_account_number}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Tipo de cuenta:{" "}
                  </Typography>
                  {constants?.account_type?.find((a) => String(a.id) === String(row.user_bank_account_type))?.name}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Banco:{" "}
                  </Typography>
                  {constants?.banks?.find((a) => String(a.id) === String(row.user_id_bank))?.name}
                </Typography>

                <Typography variant="h4" mt={4}>
                  Información del beneficiario
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Nombre:{" "}
                  </Typography>
                  {row.beneficiary_fullname}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Tipo de documento:{" "}
                  </Typography>
                  {row.beneficiary_id_type}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Número de documento:{" "}
                  </Typography>
                  {row.beneficiary_id_number}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Lugar de expedición del documento:{" "}
                  </Typography>
                  {row.beneficiary_id_location_expedition}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Teléfono:{" "}
                  </Typography>
                  {row.cellphone_beneficiary}
                </Typography>
                <Typography>
                  <Typography component="span" fontWeight={600}>
                    Correo electrónico:{" "}
                  </Typography>
                  {row.email_beneficiary}
                </Typography>
              </Grid>
            </Grid>
          )}
        />
      </Container>
      {informationContractFilter.length > 0 && (
        <ModalFirmContract
          open={openSignedModal}
          handleClose={handleCloseModal}
          informationContractFilter={informationContractFilter}
          contractsWithMortgageSigned={contractsWithMortgageSigned}
        />
      )}
    </PageWrapper>
  );
}

export default Vites;
