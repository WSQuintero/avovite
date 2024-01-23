import React, { useMemo, useState } from "react";
import { Box, Container, Grid, IconButton, Input, Stack, Typography, Button } from "@mui/material";
import { AddOutlined as AddIcon, RemoveOutlined as RemoveIcon } from "@mui/icons-material";
import EnhancedTable from "../Components/EnhancedTable";
import { AvoviteWhiteIcon } from "../Components/Icons";
import PageWrapper from "../Components/PageWrapper";
import useAsyncEffect from "../Hooks/useAsyncEffect";
import useSession from "../Hooks/useSession";
import ProductionService from "../Services/production.service";
import * as XLSX from "xlsx";

function DetailsProduction() {
  const [{ token }] = useSession();
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState({ fetching: true });
  const [quantity, setQuantity] = useState(0);
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const $Production = useMemo(() => (token ? new ProductionService(token) : null), [token]);

  const handleImportClick = () => {
    document.getElementById("xlsx-input").click();
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const importXLSX = async () => {
    if (file) {
      handleFileUpload(true);
      setImporting(true);

      try {
        const { status: postStatus, data: xlsxData } = await $Production.post(file);

        if (postStatus) {
          const workbook = XLSX.read(new Uint8Array(xlsxData), { type: "array" });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const newContracts = jsonData.map((row) => ({
            total_vite: row[0],
            year1: row[1],
            year2: row[2],
            year3: row[3],
            year4: row[4],
            year5: row[5],
          }));

          setContracts(newContracts);
        }
      } catch (error) {
        console.error("Error importing XLSX:", error);
      } finally {
        setImporting(false);
      }
    }
  };

  const updateQuantity = async (action) => {
    if (action === "increase") {
      setQuantity((prevQuantity) => prevQuantity + 1);
      const { status, data } = await $Production.get(prevQuantity + 1);
      if (status) {
        setContracts(Array.isArray(data.data) ? data.data : []);
      }
    } else if (action === "decrease") {
      setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
      if (quantity > 0) {
        const { status, data } = await $Production.get(quantity - 1);
        if (status) {
          setContracts(Array.isArray(data.data) ? data.data : []);
        }
      }
    }
  };

  const columns = useMemo(
    () => [
      { id: "total_vite", label: "VITES" },
      { id: "year1", label: "AÑO 1" },
      { id: "year2", label: "AÑO 2" },
      { id: "year3", label: "AÑO 3" },
      { id: "year4", label: "AÑO 4" },
      { id: "year5", label: "AÑO 5" },
    ],
    []
  );

  const fetchProductions = async () => {
    const { status: postStatus, data: xlsxData } = await $Production.post({ harvest: true });

    if (postStatus) {
      const workbook = XLSX.read(new Uint8Array(xlsxData), { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const newContracts = jsonData.map((row) => ({
        total_vite: row[0],
        year1: row[1],
        year2: row[2],
        year3: row[3],
        year4: row[4],
        year5: row[5],
      }));

      setContracts(newContracts);
    }
  };

  useAsyncEffect(async () => {
    console.log("Fetching");
    await fetchProductions();

    setLoading((prev) => ({ ...prev, fetching: false }));
  }, []);

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack direction="row" alignItems="center" spacing={2} mb={6}>
          <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
            <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
          </Box>
          <Typography fontWeight={600} color="primary.main">
            Kilogramos
          </Typography>
        </Stack>
        <Grid display="flex" alignItems="center" gap={2}>
          <Typography>Vites:</Typography>
          <Box display="flex" alignItems="center" border={1} borderRadius={10} borderColor="primary.main">
            <IconButton color="primary" size="small" onClick={() => updateQuantity("decrease")}>
              <RemoveIcon />
            </IconButton>
            <Box display="flex" justifyContent="center" paddingX={0.5} color="primary.main" width={32}>
              {quantity}
            </Box>
            <IconButton color="primary" size="small" onClick={() => updateQuantity("increase")}>
              <AddIcon />
            </IconButton>
          </Box>
          <input type="file" id="xlsx-input" style={{ display: "none" }} accept=".xlsx" onChange={handleFileUpload} />
          <Button variant="contained" color="primary" onClick={handleImportClick} disabled={importing}>
            {importing ? "Importando..." : "Importar"}
          </Button>
        </Grid>
        <EnhancedTable loading={loading.fetching} headCells={columns} rows={contracts} />
      </Container>
    </PageWrapper>
  );
}

export default DetailsProduction;
