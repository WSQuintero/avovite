import  { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const DateRangeModal = ({ open, onClose,contract }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = () => {
    const getExportedExcel=async()=>{
      await contract.exportByDate({ initDate:startDate, finalDate:endDate });
    }
    getExportedExcel()
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: 400 }}>
        <Typography variant="h6" gutterBottom>
          Seleccionar rango de fechas
        </Typography>
        <TextField
          label="Fecha inicial"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Fecha final"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={handleSubmit}>Aceptar</Button>
      </Box>
    </Modal>
  );
};

export default DateRangeModal;
