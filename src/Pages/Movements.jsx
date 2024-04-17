import { useEffect, useMemo, useState } from "react";
import { Alert, Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
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
import FilterIdContract from "../Components/Admin/FilterIdContract";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import MaterialReactTable from "material-react-table";

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
  const [selectedFilter, setSelectedFilter] = useState("-");
  const [filterContract, setFilterContract] = useState([]);
  const [email, setEmail] = useState();
  const tableHeadCells = useMemo(
    () => [
      {
        header: "Id movimiento",
        accessorKey: "id",
        id: "id",
        align: "center",
      },
      {
        header: "ID del Contrato",
        accessorKey: "contract_id",
        id: "contract_id",
        align: "center",
      },
      {
        header: "Fecha de Aprobación",
        accessorKey: "dateAproveed",
        id: "dateAproveed",
        align: "center",
        Cell: ({ renderedCellValue }) => (renderedCellValue ? formatDate(new Date(renderedCellValue)) : ""),
      },
      {
        header: "Fecha de Creación",
        accessorKey: "dateCreate",
        id: "dateCreate",
        align: "center",
        width: "200px",
        Cell: ({ renderedCellValue }) => formatDate(new Date(renderedCellValue)),
      },
      {
        header: "Nombre Completo",
        accessorKey: "fullname",
        id: "fullname",
        align: "center",
        width: "500px",
      },
      {
        header: "Correo Electrónico",
        accessorKey: "email",
        id: "email",
        align: "center",
      },
      {
        header: "Número de Identificación",
        accessorKey: "id_number",
        id: "id_number",
        align: "center",
      },
      {
        header: "Tipo de Identificación",
        accessorKey: "id_type",
        id: "id_type",
        align: "center",
      },
      {
        header: "ID de Usuario",
        accessorKey: "id_user",
        id: "id_user",
        align: "center",
      },
      {
        header: "Nombre del Banco",
        accessorKey: "nombre_banco",
        id: "nombre_banco",
        align: "center",
        width: "300px",
      },
      {
        header: "Tipo de Cuenta",
        accessorKey: "tipo_cuenta",
        id: "tipo_cuenta",
        align: "center",
        width: "200px",
      },
      {
        header: "Transacción",
        accessorKey: "transaction",
        id: "transaction",
        align: "center",
      },
      {
        header: "Valor de la Transacción",
        accessorKey: "transaction_value",
        id: "transaction_value",
        align: "center",
        Cell: ({ renderedCellValue }) => (
          <>
            $<NumericFormat displayType="text" value={parseInt(renderedCellValue)} thousandSeparator></NumericFormat>
          </>
        ),
      },
      {
        header: "Número de Cuenta del Usuario",
        accessorKey: "user_bank_account_number",
        id: "user_bank_account_number",
        align: "center",
        width: "300px",
      },
      {
        header: "Tipo de Cuenta del Usuario",
        accessorKey: "user_bank_account_type",
        id: "user_bank_account_type",
        align: "center",
        width: "200px",
      },
      {
        header: "¿Retirado?",
        accessorKey: "withdrawal",
        id: "withdrawal",
        align: "center",
        Cell: ({ renderedCellValue }) => (renderedCellValue === 1 ? "Si" : "No"),
      },
      {
        header: "Resetear",
        accessorKey: "reset",
        id: "reset",
        align: "center",
        Cell: ({ row }) => (
          <IconButton color="primary" onClick={() => handleReset(row.original)}>
            <RefreshIcon />
          </IconButton>
        ),
      },
    ],
    []
  );

  const handleResetFilter = () => {
    setCurrentPage(1);
    setCurrentSize(10);
    setFilterContract([]);
  };
  const handleChange = (event) => {
    setSelectedFilter(event.target.value);
  };
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
  const handleExportPending = () => {
    const getExportedExcel = async () => {
      await $Movement.exportOutstandingPayments();
    };
    getExportedExcel();
  };
  const handleSearchId = async (id) => {
    try {
      const { status, data } = await $Movement.getId({ id });
      if ((status, data)) {
        setFilterContract(
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
  const handleSearchIdNumber = async (id) => {
    try {
      const { status, data } = await $Movement.getIdNumber({ id });
      if ((status, data)) {
        setFilterContract(
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
  const handleSearchEmail = async () => {
    try {
      const { status, data } = await $Movement.getEmail({ email });
      if ((status, data)) {
        setFilterContract(
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
  return (
    <>
      <PageWrapper>
        <BackButton />
        {/* <CustomContractRangeFilter setCurrentSize={setCurrentSize} setCurrentPage={setCurrentPage} /> */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%", marginBottom: 2 }}>
          <FormControl variant="outlined" sx={{ minWidth: "150px" }}>
            <InputLabel id="filter-select-label">Filtrar</InputLabel>
            <Select
              labelId="filter-select-label"
              value={selectedFilter}
              onChange={handleChange}
              label="Filtrar"
              sx={{ width: "230px", height: "30px" }}
              inputProps={{ sx: { height: "30px" } }}
            >
              <MenuItem value="" disabled>
                Seleccione una opción
              </MenuItem>
              <MenuItem value="contractId">Filtrar por ID de contrato</MenuItem>
              <MenuItem value="page">Filtrar por página</MenuItem>
              <MenuItem value="idNumber">Filtrar por documento de id.</MenuItem>
              <MenuItem value="email">Filtrar por email.</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {selectedFilter === "contractId" && (
          <FilterIdContract
            setFilterContract={setFilterContract}
            handleSearchId={handleSearchId}
            setCurrentSize={setCurrentSize}
            setCurrentPage={setCurrentPage}
          />
        )}
        {selectedFilter === "idNumber" && (
          <FilterIdContract
            setFilterContract={setFilterContract}
            handleSearchId={handleSearchIdNumber}
            setCurrentSize={setCurrentSize}
            setCurrentPage={setCurrentPage}
          />
        )}
        {selectedFilter === "email" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              gap: 0.5,
              height: 30,
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <TextField onChange={(event) => setEmail(event.target.value)} sx={{ minWidth: "30%" }}></TextField>
            <Button variant="contained" onClick={() => handleSearchEmail()}>
              Aplicar
            </Button>
            <Button variant="outlined" onClick={handleResetFilter} sx={{ padding: 0.5, fontSize: 13 }}>
              Restablecer
            </Button>
          </Box>
        )}
        {selectedFilter === "page" && <CustomContractRangeFilter setCurrentSize={setCurrentSize} setCurrentPage={setCurrentPage} />}
        <Typography fontWeight={600} color="primary.main" sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          Movimientos
          <Grid display="flex" gap={2} marginTop="20px">
            <Button
              variant="contained"
              sx={{ width: "200px", height: "50px", fontSize: "12px" }}
              onClick={handleExportPending}
              startIcon={<DownloadIcon />}
            >
              Pendientes de pago
            </Button>
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
          {/* <EnhancedTable
            loading={loading.fetching}
            headCells={tableHeadCells}
            rows={filterContract.length ? filterContract : rows}
            initialOrder="desc"
            currentPage={currentPage}
            onPageChange={onPageChange}
          /> */}
          <MaterialReactTable
            columns={tableHeadCells}
            data={filterContract?.length ? filterContract : rows}
            enableColumnFilterModes
            enableColumnOrdering
            // enableRowActions
            muiTablePaperProps={{ elevation: 0 }}
            initialState={{ density: "compact" }}
            muiTableDetailPanelProps={{ sx: { backgroundColor: "white" } }}
            state={{ showSkeletons: loading.fetching }}
            localization={MRT_Localization_ES}
            enablePagination={false}
            renderBottomToolbarCustomActions={({ table }) => (
              <Box fullWidth sx={{ display: "flex", gap: 1, justifyContent: "space-around", width: "100%" }}>
                <DateRangeModal open={modalOpen} onClose={handleCloseModal} contract={$Movement} />

                <Pagination currentPage={currentPage} onPageChange={onPageChange} />
              </Box>
            )}
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
