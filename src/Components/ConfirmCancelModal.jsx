import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

function ConfirmCancelModal({ open, handleClose, handleConfirm }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"¿Está seguro de cancelar el contrato?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>Esta acción cancelará el contrato. ¿Está seguro de que desea continuar?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cerrar
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Confirmar cancelación
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmCancelModal;
