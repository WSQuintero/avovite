import * as React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const columnasVisibles = [
  "Fecha de Pago",
  "Nombre Beneficiario",
  "Tipo Documento Beneficiario",
  "Número Documento Beneficiario",
  "Lugar de Expedición del Documento Beneficiario",
  "Ciudad y País de Residencia Beneficiario",
  // Resto de las columnas no visibles inicialmente
  "Correo Electrónico Beneficiario",
  "Teléfono de Contacto Beneficiario",
  "Banco Beneficiario",
  "Tipo de Cuenta Beneficiario",
  "Número de Cuenta Beneficiario",
  "Nombre Pagador",
  "Tipo Documento Pagador",
  "Número Documento Pagador",
  "Lugar de Expedición del Documento Pagador",
  "Descargar", // Columna adicional para el botón "Descargar"
];

const datosFalsos = [
  // Datos de ejemplo, asegúrate de mantener el mismo orden que las columnas
  ["2023-07-01", "John Doe", "DNI", "12345678", "Ciudad1", "País1", "john.doe@example.com", "123456789", "Banco1", "Cuenta1", "987654321", "John Smith", "DNI", "87654321", "Ciudad2"],
  ["2023-07-02", "Jane Doe", "Pasaporte", "ABC123", "Ciudad3", "País2", "jane.doe@example.com", "987654321", "Banco2", "Cuenta2", "123456789", "Jane Smith", "DNI", "654321", "Ciudad4"],
  // Agregar más datos de ejemplo aquí...
];

const Dataset = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const [cuotas, setCuotas] = React.useState('');

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCuotasChange = (event) => {
    setCuotas(event.target.value);
  };

  const handleDescargarClick = () => {
    // Aquí puedes hacer lo que desees con el valor de "cuotas"
    // Por ejemplo, enviarlo a una API o realizar alguna acción
    // Puedes agregar tu lógica aquí...
    console.log(`Valor de número de cuotas: ${cuotas}`);
    handleCloseModal();
  };

  return (
    <Box sx={{ paddingX: 1, marginRight:10 }}>
      <TableContainer component={Paper} sx={{ margin: 'auto', marginTop: 20 }}>
        <Table stickyHeader sx={{ overflowX: 'auto' }}>
          <TableHead>
            <TableRow>
              {columnasVisibles.map((columna, index) => (
                <TableCell
                  key={index}
                  sx={{
                    color: "green",
                    whiteSpace: "nowrap",
                    border: '1px solid #C0C0C0',
                    padding: '8px',
                  }}
                >
                  {columna}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datosFalsos.map((fila, index) => (
              <TableRow key={index}>
                {fila.map((valor, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      border: '1px solid #C0C0C0',
                      padding: '8px',
                      color: '#c0c0c0',
                    }}
                  >
                    {valor}
                  </TableCell>
                ))}
                {/* Agregar botón "Descargar" con evento onClick */}
                <TableCell>
                  <Button variant="contained" onClick={handleOpenModal}>
                    Descargar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal con el formulario */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle color='primary.main'>Descargar</DialogTitle>
        <DialogContent>
          <TextField
           
            type="number"
            value={cuotas}
            onChange={handleCuotasChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleDescargarClick} variant="contained">
            Descargar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dataset;
