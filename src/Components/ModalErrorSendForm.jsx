import { Button, Modal, Typography } from "@mui/material";

function ModalErrorSendForm({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgb(0,0,0,0.7)" }}
    >
      <div>
        <Typography variant="h6" id="modal-title" sx={{ color: "white", marginBottom: 2 }}>
          Ha ocurrido un error al enviar el formulario
        </Typography>
        <Typography variant="body1" id="simple-modal-description" sx={{ color: "white", marginBottom: 2 }}>
          Por favor revisa que hayas cargado los documentos y que la información sea correcta.
        </Typography>
        <Button variant="contained" color="primary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
}

export default ModalErrorSendForm;
