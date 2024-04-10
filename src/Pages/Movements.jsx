import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import { Refresh as RefreshIcon, FileDownload as DownloadIcon } from "@mui/icons-material";
import EnhancedTable from "../Components/EnhancedTable";
import PageWrapper from "../Components/PageWrapper";
import MovementService from "../Services/movement.service";
import useSession from "../Hooks/useSession";
import DateRangeModalMovements from "../Components/Admin/DateRangeModalMovements";
import { Button } from "@mui/material";
import DateRangeModal from "../Components/Admin/DateRangeModal";
import DateRangeModalMovementsTwo from "../Components/Admin/DateRangeModalMovementsTwo";
import DateRangeModalMovementsThree from "../Components/Admin/DateRangeModalMovementsThree";
import { formatDate } from "../utilities";
import { NumericFormat } from "react-number-format";
import BackButton from "../Components/BackButton";
import Pagination from "../Components/Admin/Pagination";
import CustomContractRangeFilter from "../Components/Admin/CustomContractRangeFilter";

function Movements({ handleClick }) {
  const [rows, setRows] = useState([]);
  const [session] = useSession();
  const [loading, setLoading] = useState({ fetching: true });
  const $Movement = useMemo(() => new MovementService(session.token), [session.token]);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);

  const tableHeadCells = useMemo(
    () => [
      {
        id: "id",
        label: "Id movimiento",
        align: "center",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "contract_id",
        label: "ID del Contrato",
        disablePadding: false,
        align: "center",
        format: (value) => value,
      },
      {
        id: "dateAproveed",
        label: "Fecha de Aprobación",
        align: "center",
        disablePadding: false,
        format: (value) => {
          if (!value) return;
          const date = new Date(value);
          return formatDate(date);
        },
      },
      {
        id: "dateCreate",
        label: "Fecha de Creación",
        align: "center",
        width: "200px",
        disablePadding: false,
        format: (value) => {
          const date = new Date(value);
          return formatDate(date);
        },
      },
      {
        id: "fullname",
        label: "Nombre Completo",
        align: "center",
        disablePadding: false,
        width: "500px",
        format: (value) => value,
      },

      {
        id: "email",
        label: "Correo Electrónico",
        align: "center",
        disablePadding: false,
        format: (value) => value,
      },

      {
        id: "id_number",
        label: "Número de Identificación",
        align: "center",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "id_type",
        label: "Tipo de Identificación",
        align: "center",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "id_user",
        label: "ID de Usuario",
        align: "center",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "nombre_banco",
        label: "Nombre del Banco",
        align: "center",
        width: "300px",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "tipo_cuenta",
        label: "Tipo de Cuenta",
        align: "center",
        width: "200px",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "transaction",
        label: "Transacción",
        align: "center",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "transaction_value",
        label: "Valor de la Transacción",
        align: "center",
        disablePadding: false,
        format: (value) => (
          <>
            $<NumericFormat displayType="text" value={parseInt(value)} thousandSeparator></NumericFormat>
          </>
        ),
      },
      {
        id: "user_bank_account_number",
        label: "Número de Cuenta del Usuario",
        align: "center",
        width: "300px",
        disablePadding: false,
        format: (value) => value,
      },
      {
        id: "user_bank_account_type",
        label: "Tipo de Cuenta del Usuario",
        align: "center",
        width: "200px",
        disablePadding: false,
        format: (value) => value,
      },
      // {
      //   id: "user_id_bank",
      //   label: "ID del Banco del Usuario",
      //   align: "center",
      //   width: "200px",
      //   disablePadding: false,
      //   format: (value) => value,
      // },
      {
        id: "withdrawal",
        label: "¿Retirado?",
        align: "center",
        disablePadding: false,
        format: (value) => (value === 1 ? "Si" : "No"),
      },
      {
        id: "reset",
        label: "Resetear",
        align: "center",
        disablePadding: false,
        format: (value, row) => (
          <IconButton color="primary" onClick={() => handleReset(row)}>
            <RefreshIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  const handleReset = (row) => {
    if (row.withdrawal === 1) {
      const { status } = $Movement.reset(row.id);
      if (status) {
        setFeedback({ open: true, message: "Movimiento reseteado con éxito", status: "success" });
      }
    } else {
      setFeedback({ open: true, message: "El withdrawal debe ser 1", status: "error" });
    }
  };

  const fetchData = async () => {
    try {
      const { status, data } = await $Movement.get({ page: currentPage, pagezise: currentSize });
      if ((status, data)) {
        setRows(
          data.data.map((movement) => ({
            contract_id: movement.contract_id,
            dateAproveed: movement.dateAproveed,
            dateCreate: movement.dateCreate,
            email: movement.email,
            fullname: movement.fullname,
            id: movement.id,
            id_number: movement.id_number,
            id_type: movement.id_type,
            id_user: movement.id_user,
            nombre_banco: movement.nombre_banco,
            tipo_cuenta: movement.tipo_cuenta,
            transaction: movement.transaction,
            transaction_value: movement.transaction_value,
            user_bank_account_number: movement.user_bank_account_number,
            // user_bank_account_type: movement.user_bank_account_type,
            // user_id_bank: movement.user_id_bank,
            withdrawal: movement.withdrawal,
          }))
        );
        setLoading((prev) => ({ ...prev, fetching: false }));
      }
    } catch (error) {
      console.error("Error al obtener los movimientos:", error);
    }
  };

  useEffect(() => {
    if ($Movement) {
      fetchData();
    }
  }, [$Movement, session, currentSize, currentPage]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleCloseModalTwo = () => {
    setModalOpenTwo(false);
  };
  const handleCloseModalThree = () => {
    setModalOpenThree(false);
  };
  const handleExportDataByDate = () => {
    setModalOpen(true);
  };
  const handleExportDataByDateTwo = () => {
    setModalOpenTwo(true);
  };
  const handleExportDataByDateThree = () => {
    setModalOpenThree(true);
  };
  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <PageWrapper>
        <BackButton />
        <CustomContractRangeFilter setCurrentSize={setCurrentSize} setCurrentPage={setCurrentPage} />
        <Typography fontWeight={600} color="primary.main" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          Movimientos
          <Grid display="flex" gap={2} marginTop="20px">
            <Button
              variant="contained"
              sx={{ width: "200px", height: "50px", fontSize: "12px" }}
              onClick={handleExportDataByDate}
              startIcon={<DownloadIcon />}
            >
              Pagos transaccionales
            </Button>
            <Button
              variant="contained"
              sx={{ width: "200px", height: "50px", fontSize: "12px" }}
              onClick={handleExportDataByDateTwo}
              startIcon={<DownloadIcon />}
            >
              Movimientos
            </Button>
            <Button
              variant="contained"
              sx={{ width: "200px", height: "50px", fontSize: "12px" }}
              onClick={handleExportDataByDateThree}
              startIcon={<DownloadIcon />}
            >
              Movimientos Epayco
            </Button>
          </Grid>
        </Typography>

        <Grid display="flex" flexDirection="column" gap={2} marginTop="20px">
          <EnhancedTable
            loading={loading.fetching}
            headCells={tableHeadCells}
            rows={rows}
            initialOrder="desc"
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
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
        <DateRangeModalMovements open={modalOpen} onClose={handleCloseModal} contract={$Movement} />
        <DateRangeModalMovementsTwo open={modalOpenTwo} onClose={handleCloseModalTwo} contract={$Movement} />
        <DateRangeModalMovementsThree open={modalOpenThree} onClose={handleCloseModalThree} contract={$Movement} />
      </PageWrapper>
      {/* Modal para seleccionar el rango de fechas */}
    </>
  );
}

export default Movements;
