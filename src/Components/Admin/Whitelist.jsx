import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { DeleteOutlined as DeleteIcon, EditOutlined as EditIcon } from "@mui/icons-material";
import WHiteListService from "../../Services/whitelist.service";
import useSession from "../../Hooks/useSession";
import EnhancedTable from "../EnhancedTable";
import { CONTRACT_TYPES } from "../../utilities/constants";
import BackButton from "../BackButton";
import ModalCreateContractWhitelist from "../ModalCreateContractWhitelist";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { formatDate } from "../../utilities";
import ContractService from "../../Services/contract.service";
import { NumericFormat } from "react-number-format";
import Pagination from "./Pagination";

function Whitelist() {
  const [session] = useSession();
  const $Contract = useMemo(() => new ContractService(session.token), [session.token]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ id: null, email: "", mortgage: "-" });
  const [modal, setModal] = useState(null);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const isValidUser = useMemo(() => user.email && user.mortgage !== "-", [user]);
  const $Whitelist = useMemo(() => (session.token ? new WHiteListService(session.token) : null), [session.token]);
  const [modalCreateContractWhitelistIsOpen, setModalCreateContractWhitelistIsOpen] = useState(false);
  const productsHeadCells = useMemo(
    () => [
      {
        id: "email",
        label: "Correo",
        align: "left",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "mortgage",
        label: "Tipo de contrato",
        align: "left",
        disablePadding: false,
        format: (value) => (value === 1 ? CONTRACT_TYPES.mortgage : CONTRACT_TYPES.standard),
      },
      {
        id: "",
        label: "",
        align: "left",
        disablePadding: false,
        format: (value, row) => (
          <Grid display="flex" justifyContent="flex-end" gap={1}>
            <IconButton
              onClick={() => {
                setUser({ id: row.id, email: row.email, mortgage: row.mortgage === 1 ? "mortgage" : "standard" });
                setModal("update");
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => {
                setUser({ id: row.id, email: row.email, mortgage: row.mortgage === 1 ? "mortgage" : "standard" });
                setModal("delete");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        ),
      },
    ],
    []
  );
  const [actualPage, setActualPage] = useState(1);
  const [actualSize, setActualSize] = useState(10);
  const [contracts, setContracts] = useState([]);
  const fetchContracts = async () => {
    try {
      const {
        status,
        data: { data },
      } = await $Contract.get({ awaitlist: 1, pageNumber: actualPage, pageSize: actualSize });

      if (status) {
        setContracts(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error al obtener contratos:", error);
    }
  };
  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const onPageChange = (newPage) => {
    setActualPage(newPage);
  };
  const fetchWhitelist = async () => {
    const { status, data } = await $Whitelist.get();

    if (status) {
      setUsers(data.data);
    }
  };
  useEffect(() => {
    if (session.token) {
      (async () => {
        await fetchContracts();
      })();
    }
  }, [$Contract, session, actualPage, actualSize]);
  useEffect(() => {
    if ($Whitelist) {
      (async () => {
        await fetchWhitelist();
      })();
    }
  }, [$Whitelist]);
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
      accessorKey: "Total pagado",
      header: "Deuda actual",
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
    {
      accessorKey: "payment_numbers",
      id: "payment_numbers",
      header: "Cuotas",
    },
    {
      accessorKey: "overdue_quotas",
      id: "overdue_quotas",
      header: "Cuotas en mora",
    },
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
  ];
  return (
    <>
      <BackButton />

      <Grid display="flex" flexDirection="column" gap={2}>
        <Grid display="flex" justifyContent="flex-end">
          <ModalCreateContractWhitelist setFeedback={setFeedback} />
        </Grid>
        <MaterialReactTable
          columns={columns}
          data={contracts}
          enableColumnFilterModes
          enableColumnOrdering
          enableRowActions
          muiTablePaperProps={{ elevation: 0 }}
          initialState={{ density: "compact" }}
          muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
          localization={MRT_Localization_ES}
          enablePagination={false}
        />
        <Pagination onPageChange={onPageChange} currentPage={actualPage} />
      </Grid>

      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={resetFeedback}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Whitelist;
