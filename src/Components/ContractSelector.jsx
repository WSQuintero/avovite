import { Alert, Box, Checkbox, Icon, InputAdornment, ListItemText, MenuItem, Snackbar, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import useAsyncEffect from "../Hooks/useAsyncEffect";
import useSession from "../Hooks/useSession";
import ContractService from "../Services/contract.service";
import PaginationComponent from "./PaginationComponent";
import CustomContractRangeFilter from "./Admin/CustomContractRangeFilter";
import CustomContractRangeFilterTwo from "./Admin/CustomContractRangeFilterTwo";

function ContractSelector({ allContracts, initialValue = [], onChange }) {
  const [session] = useSession();
  const [selected, setSelected] = useState(initialValue);
  const [contracts, setContracts] = useState({});
  const [searchText, setSearchText] = useState("");
  const [order, setOrder] = useState("desc");
  const $Contract = useMemo(() => (session.token ? new ContractService(session.token) : null), [session.token]);
  const [totalPages, setTotalPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialContract, setInitialContract] = useState(undefined);
  const [finalContract, setFinalContract] = useState(1);
  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(10);
  const [rangeContracts, setRangeContracts] = useState(undefined);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });

  const onPageChange = async (value) => {
    setCurrentPage(value);
    const { status, data } = await $Contract.get({ pageNumber: value, pageSize: 10 });

    if (status) {
      setContracts(data.data.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}));
    }
  };
  const filterContracts = async (page, size) => {
    const { status, data } = await $Contract.get({ pageNumber: page, pageSize: size });

    if (status) {
      setContracts(data.data.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}));
    }
  };
  const filteredContracts = useMemo(() => {
    const searched = searchText
      ? Object.values(allContracts || contracts).filter((c) => `AV-${c.id}`.toLowerCase().includes(searchText.toLowerCase()))
      : Object.values(contracts);

    if (order === "asc") return searched;
    else {
      return searched.reverse();
    }
  }, [contracts, searchText, order]);

  const handleChange = (value) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  useAsyncEffect(async () => {
    const { status, data } = await $Contract.get();

    if (status) {
      setContracts(data.data.reduce((acc, c) => ({ ...acc, [c.id]: c }), {}));
    }
  }, []);
  const handleApplyFilter = async () => {
    if (endIndex > allContracts.length) {
      setFeedback({ open: true, message: `Solo hay ${allContracts.length} contratos`, status: "error" });
      return;
    }
    const filteredContracts = allContracts
      .sort((a, b) => a.id - b.id)
      .filter((contract) => contract.id >= startIndex && contract.id <= endIndex);

    setRangeContracts(filteredContracts);
  };
  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };
  return (
    <>
      <TextField
        select
        fullWidth
        label="Seleccionar contrato"
        name="contract_number"
        MenuProps={{ autoFocus: false }}
        SelectProps={{ multiple: true, renderValue: (selected) => selected.map((v) => `AV-${v}`).join(", ") }}
        value={selected}
        onClose={() => setSearchText("")}
        onChange={({ target }) => handleChange(target.value)}
      >
        <Stack direction="row" spacing={2} mb={1} px={1}>
          <TextField
            autoFocus
            fullWidth
            size="small"
            placeholder="Buscar contrato"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon baseClassName="fal" className="fa-search" sx={{ fontSize: 16 }} />
                </InputAdornment>
              ),
            }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                e.stopPropagation();
              }
            }}
          />
          {/* <Tooltip title={`Orden ${order === "asc" ? "ascendente" : "descendente"}`}>
          <IconButton>
            <Icon
              baseClassName="far"
              className={order === "asc" ? "fa-sort-alpha-up" : "fa-sort-alpha-down"}
              onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
            />
          </IconButton>
        </Tooltip> */}
        </Stack>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", padding: 2, flexDirection: "column" }}>
          <CustomContractRangeFilter setCurrentSize={setTotalPages} setCurrentPage={setCurrentPage} filterContracts={filterContracts} />
          <CustomContractRangeFilterTwo
            handleApplyFilter={handleApplyFilter}
            setInitialContract={setInitialContract}
            setFinalContract={setFinalContract}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            endIndex={endIndex}
            setEndIndex={setEndIndex}
            setRangeContracts={setRangeContracts}
          />
        </Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
            setTotalPages={setTotalPages}
          />
        </Box>

        {(rangeContracts || filteredContracts).map((c) => {
          return (
            <MenuItem key={c.id} value={c.id} autoFocus={false}>
              <Checkbox checked={selected.indexOf(c.id) > -1} />
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1}>
                    <Typography noWrap width={{ xs: "100%", sm: "20%" }}>{`AV-${c.id}`}</Typography>
                    <Typography noWrap width={{ xs: "100%", sm: "10%" }}>
                      {Number(c.contract_vites)}
                    </Typography>
                    <Typography noWrap width={{ xs: "100%", sm: "40%" }}>
                      {c.fullname}
                    </Typography>
                    <Typography noWrap width={{ xs: "100%", sm: "30%" }}>
                      {c.id_number}
                    </Typography>
                  </Stack>
                }
              />
            </MenuItem>
          );
        })}
        {filteredContracts.length === 0 && (
          <MenuItem disabled value={-1}>
            No hay resultados para {searchText}
          </MenuItem>
        )}
      </TextField>
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

export default ContractSelector;
