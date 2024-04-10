import React, { useEffect, useState } from "react";
import { Button, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { NumericFormat } from "react-number-format";
import { formatDate } from "../../utilities";
import { MRT_Localization_ES } from "material-react-table/locales/es";

const ContractButton = ({ renderedCellValue, actual }) => {
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
      id: "total_quotes",
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
      header: "¿WhiteList?",
      Cell: ({ renderedCellValue }) => <Typography>{renderedCellValue === 0 ? "No" : "Si"}</Typography>,
    },
    {
      accessorKey: "cancel_contract",
      id: "cancel_contract",
      header: "¿Contrato cancelado?",
      Cell: ({ renderedCellValue }) => (
        <Typography sx={{ backgroundColor: renderedCellValue === 0 ? "green" : "red", color: "white", textAlign: "center" }}>
          {renderedCellValue === 0 ? "No" : "Si"}
        </Typography>
      ),
    },
  ];
  const columnsFinanced = [
    {
      accessorKey: "id",
      id: "id",
      header: "Número",
      Cell: ({ renderedCellValue }) => <Typography>AV-{renderedCellValue}</Typography>,
    },
  ];
  const [openModal, setOpenModal] = useState(false);
  const [snapshotData, setSnapshotData] = useState(null);
  const [SnapshotFinanced, setSnapshotFinanced] = useState();

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (actual === "snapshotContract" && renderedCellValue?.row?.original.snapshotContract) {
      const snaptshot = JSON.parse(renderedCellValue?.row?.original.snapshotContract);
      console.log(snaptshot[0]);
      setSnapshotData(snaptshot[0]);
    }
    if (actual === "snapshotFinanced" && renderedCellValue?.row?.original.snapshotFinanced) {
      const snaptshot = JSON.parse(renderedCellValue?.row?.original.snapshotFinanced);
      console.log(snaptshot[0]);
      setSnapshotFinanced(snaptshot[0]);
    }
  }, [renderedCellValue]);

  return (
    <>
      <Button variant="contained" onClick={handleModalOpen}>
        Abrir
      </Button>
      <Modal open={openModal} onClose={handleModalClose}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: "80%",
          }}
        >
          <Typography variant="h2" sx={{ padding: 2, backgroundColor: "white", textAlign: "center" }}>
            Histórico
          </Typography>
          {snapshotData && actual === "snapshotContract" && (
            <MaterialReactTable
              columns={columns}
              data={[snapshotData]}
              muiTablePaperProps={{ elevation: 0 }}
              initialState={{ density: "compact" }}
              muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
              // state={{ showSkeletons: loading }}
              localization={MRT_Localization_ES}
              enablePagination={false}
            />
          )}
          {SnapshotFinanced && actual === "snapshotFinanced" && (
            <MaterialReactTable
              columns={columnsFinanced}
              data={[SnapshotFinanced]}
              muiTablePaperProps={{ elevation: 0 }}
              initialState={{ density: "compact" }}
              muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
              // state={{ showSkeletons: loading }}
              localization={MRT_Localization_ES}
              enablePagination={false}
            />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ContractButton;
