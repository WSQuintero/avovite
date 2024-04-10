import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Typography } from "@mui/material";

function ConfirmCancelModal({ open, handleClose, handleConfirm }) {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFile1Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile1(selectedFile);
  };
  const handleFile2Change = (event) => {
    const selectedFile = event.target.files[0];
    setFile2(selectedFile);
  };
  const handleSend = () => {
    if (file1 && file2) {
      handleConfirm(file1, file2);
    } else {
      alert("Por favor, seleccione ambos archivos.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"¿Está seguro de cancelar el contrato?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Esta acción cancelará el contrato. ¿Está seguro de que desea continuar?</DialogContentText>
        <DialogContentText sx={{ marginTop: 2 }}>
          <Typography>Si es así, por favor sube:</Typography>
          <br />
          <label htmlFor="file1">
            <Typography component="span" variant="h4">
              1. Documento de Cesión o de Transacción
            </Typography>
            <Input type="file" id={"file1"} onChange={handleFile1Change} />
          </label>
          <br />
          <br />
          <label htmlFor="file2">
            <Typography component="span" variant="h4">
              2. Desprendible de pago de Avovite
            </Typography>
            <Input type="file" id={"file2"} onChange={handleFile2Change} />
          </label>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={handleSend} color="primary">
          Confirmar cancelación
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmCancelModal;
