import {
  Box,
  Collapse,
  Container,
  MenuItem,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import TabPanel from "../TabPanel";
import { LoadingButton } from "@mui/lab";
import VerifikService from "../../Services/verifik.service";
import useSession from "../../Hooks/useSession";
import { VERIFIK_DOCUMENTS, VERIFIK_INTERNATIONAL } from "../../utilities/constants";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import BackButton from "../BackButton";

function Tab1({ $, service }) {
  const $Verifik = $;
  const [formData, setFormData] = useState({
    document: "",
    tipe_Document: "-",
  });
  const [loading, setLoading] = useState({ fetching: false });
  const [results, setResults] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $Verifik.search({ service, ...formData });

    if (status) {
      setResults(data.data);
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  return (
    <>
    <Container maxWidth="xxl">

      <Stack spacing={4}>
        <Typography fontWeight={600}>Registro Disciplinario en Colombia (Procuraduria)</Typography>
        <Stack spacing={2} component="form" onSubmit={handleSearch}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Tipo de documento"
              value={formData.tipe_Document}
              onChange={(event) => setFormData((prev) => ({ ...prev, tipe_Document: event.target.value }))}
            >
              <MenuItem disabled value="-">Selecciona una opción</MenuItem>
              {Object.keys(VERIFIK_DOCUMENTS).map(
                (document) =>
                  VERIFIK_DOCUMENTS[document].for.includes(service) && (
                    <MenuItem key={document} value={document}>
                      {VERIFIK_DOCUMENTS[document].label}
                    </MenuItem>
                  )
              )}
            </TextField>

            <TextField
              fullWidth
              label="Número de documento"
              value={formData.document}
              onChange={(event) => setFormData((prev) => ({ ...prev, document: event.target.value }))}
            />
          </Stack>
          <LoadingButton loading={loading.fetching} variant="contained" type="submit">
            Buscar
          </LoadingButton>
        </Stack>
        <Collapse in={!!results}>
          <Stack spacing={2}>
            <Typography fontWeight={600}>Resultados:</Typography>
            <Table>
              <TableBody>
                <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell variant="head">Nombre</TableCell>
                  <TableCell>{results?.data.data.fullName}</TableCell>
                </TableRow>
                <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell variant="head">Detalles</TableCell>
                  <TableCell>{results?.data.data.legend}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Collapse>
      </Stack>
    </Container>
    </>
  );
}
function Tab2({ $, service }) {
  const $Verifik = $;
  const [formData, setFormData] = useState({
    document: "",
    tipe_Document: "-",
  });
  const [loading, setLoading] = useState({ fetching: false });
  const [results, setResults] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $Verifik.search({ service, ...formData });

    if (status) {
      setResults(data.data);
    }

    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  return (
    <Container maxWidth="xxl">
      <Stack spacing={4}>
        <Typography fontWeight={600}>Verificación de Antecedentes Policiales en Colombia</Typography>
        <Stack spacing={2} component="form" onSubmit={handleSearch}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Tipo de documento"
              value={formData.tipe_Document}
              onChange={(event) => setFormData((prev) => ({ ...prev, tipe_Document: event.target.value }))}
            >
              <MenuItem disabled value="-">Selecciona una opción</MenuItem>
              {Object.keys(VERIFIK_DOCUMENTS).map(
                (document) =>
                  VERIFIK_DOCUMENTS[document].for.includes(service) && (
                    <MenuItem key={document} value={document}>
                      {VERIFIK_DOCUMENTS[document].label}
                    </MenuItem>
                  )
              )}
            </TextField>
            <TextField
              fullWidth
              label="Número de documento"
              value={formData.document}
              onChange={(event) => setFormData((prev) => ({ ...prev, document: event.target.value }))}
            />
          </Stack>
          <LoadingButton loading={loading.fetching} variant="contained" type="submit">
            Buscar
          </LoadingButton>
        </Stack>
        <Collapse in={!!results}>
          <Stack spacing={2}>
            <Typography fontWeight={600}>Resultados:</Typography>
            <Table>
              <TableBody>
                <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell variant="head">Nombre</TableCell>
                  <TableCell>{results?.data.data.fullName}</TableCell>
                </TableRow>
                <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell variant="head">Detalles</TableCell>
                  <TableCell>{results?.data.data.details}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Collapse>
      </Stack>
    </Container>
  );
}
function Tab3({ $, service }) {
  const $Verifik = $;
  const [formData, setFormData] = useState({
    document: "",
    tipe_Document: "-",
    date: "",
  });
  const [loading, setLoading] = useState({ fetching: false });
  const [results, setResults] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $Verifik.search({ service, ...formData });



    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  return (
    <Container maxWidth="xxl">
      <Stack spacing={4}>
        <Typography fontWeight={600}>Verificación del Cumplimiento Policial de Medidas Correctivas</Typography>
        <Stack spacing={2} component="form" onSubmit={handleSearch}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Tipo de documento"
              value={formData.tipe_Document}
              onChange={(event) => setFormData((prev) => ({ ...prev, tipe_Document: event.target.value }))}
            >
              <MenuItem disabled value="-">Selecciona una opción</MenuItem>
              {Object.keys(VERIFIK_DOCUMENTS).map(
                (document) =>
                  VERIFIK_DOCUMENTS[document].for.includes(service) && (
                    <MenuItem key={document} value={document}>
                      {VERIFIK_DOCUMENTS[document].label}
                    </MenuItem>
                  )
              )}
            </TextField>
            <TextField
              fullWidth
              label="Número de documento"
              value={formData.document}
              onChange={(event) => setFormData((prev) => ({ ...prev, document: event.target.value }))}
            />
          </Stack>
          <DatePicker
            disableFuture
            slotProps={{ textField: { error: false } }}
            value={dayjs(formData.date)}
            label="Fecha de expedición del documento"
            format="DD MMMM YYYY"
            onChange={(value) => setFormData((prev) => ({ ...prev, date: value.toDate() }))}
          />
          <LoadingButton loading={loading.fetching} variant="contained" type="submit">
            Buscar
          </LoadingButton>
        </Stack>
        <Collapse in={!!results}>
          <Stack spacing={2}>
            <Typography fontWeight={600}>Resultados:</Typography>
            <Table>
              <TableBody>
                <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell variant="head">Nombre</TableCell>
                  <TableCell>{results?.data.data.person.fullName}</TableCell>
                </TableRow>
                <TableRow hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell variant="head">Detalles</TableCell>
                  <TableCell>{results?.data.data.cards.length}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </Collapse>
      </Stack>
    </Container>
  );
}
function Tab4({ $, service }) {
  const $Verifik = $;
  const [formData, setFormData] = useState({
    document: "",
    tipe_Document: "-",
    international: "-",
  });
  const [loading, setLoading] = useState({ fetching: false });
  const [results, setResults] = useState(null);

  const handleSearch = async (event) => {
    event.preventDefault();

    setLoading((prev) => ({ ...prev, fetching: true }));

    const { status, data } = await $Verifik.search({ service, ...formData });



    setLoading((prev) => ({ ...prev, fetching: false }));
  };

  return (
    <Container maxWidth="xxl">
      <Stack spacing={4}>
        <Typography fontWeight={600}>Verificación en la DEA - Búsqueda en Interpol</Typography>
        <Stack spacing={2} component="form" onSubmit={handleSearch}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              fullWidth
              label="Tipo de documento"
              value={formData.tipe_Document}
              onChange={(event) => setFormData((prev) => ({ ...prev, tipe_Document: event.target.value }))}
            >
              <MenuItem disabled value="-">Selecciona una opción</MenuItem>
              {Object.keys(VERIFIK_DOCUMENTS).map(
                (document) =>
                  VERIFIK_DOCUMENTS[document].for.includes(service) && (
                    <MenuItem key={document} value={document}>
                      {VERIFIK_DOCUMENTS[document].label}
                    </MenuItem>
                  )
              )}
            </TextField>
            <TextField
              fullWidth
              label="Número de documento"
              value={formData.document}
              onChange={(event) => setFormData((prev) => ({ ...prev, document: event.target.value }))}
            />
          </Stack>
          <TextField
            select
            fullWidth
            label="Entidad"
            value={formData.international}
            onChange={(event) => setFormData((prev) => ({ ...prev, international: event.target.value }))}
          >
            <MenuItem disabled value="-">Selecciona una opción</MenuItem>
            {Object.keys(VERIFIK_INTERNATIONAL).map((entity) => (
              <MenuItem key={entity} value={entity}>
                {VERIFIK_INTERNATIONAL[entity]}
              </MenuItem>
            ))}
          </TextField>
          <LoadingButton loading={loading.fetching} variant="contained" type="submit">
            Buscar
          </LoadingButton>
        </Stack>
      </Stack>
    </Container>
  );
}

function Verifik() {
  const [{ token }] = useSession();
  const [currentTab, setCurrentTab] = useState(0);
  const $Verifik = useMemo(() => (token ? new VerifikService(token) : null), []);

  return (
    <>
    <BackButton/>

    <Stack>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 6 }}>
        <Tabs value={currentTab} onChange={(event, value) => setCurrentTab(value)}>
          <Tab label="Registros Disciplinarios" />
          <Tab label="Antecedentes Policiales" />
          {/* <Tab label="Cumplimiento Policial de Medidas Correctivas" />
          <Tab label="Búsqueda DEA e Interpol" /> */}
        </Tabs>
      </Box>
      <TabPanel unmountOnExit value={currentTab} index={0}>
        <Tab1 $={$Verifik} service="disciplinary-records-procuraduria" />
      </TabPanel>
      <TabPanel unmountOnExit value={currentTab} index={1}>
        <Tab2 $={$Verifik} service="police-background-check" />
      </TabPanel>
      {/* <TabPanel unmountOnExit value={currentTab} index={2}>
        <Tab3 $={$Verifik} service="police-enforcement-corrective-measures" />
      </TabPanel> */}
      {/* <TabPanel unmountOnExit value={currentTab} index={3}>
        <Tab4 $={$Verifik} service="international-criminal-records" />
      </TabPanel> */}
    </Stack>
    </>
  );
}

export default Verifik;
