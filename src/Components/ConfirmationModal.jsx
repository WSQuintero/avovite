import { Modal, Button, Typography } from "@mui/material";

function ConfirmationModal({ open, onClose }) {
  return (
    <Modal m open={open} onClose={onClose} aria-labelledby="confirmation-modal-title" aria-describedby="confirmation-modal-description">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "400px",
          textAlign: "center",
          width: "80%",
        }}
      >
        <Typography variant={"h2"} marginBottom={5} id="confirmation-modal-title">
          ¡Registro exitoso!
        </Typography>
        <p id="confirmation-modal-description">Por favor, dirígete a tu correo electrónico para confirmar tu cuenta.</p>
        <Button variant="contained" color="primary" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
