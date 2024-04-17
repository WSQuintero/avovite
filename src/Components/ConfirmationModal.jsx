import { Modal, Button, Typography } from "@mui/material";

function ConfirmationModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
      aria-describedby="confirmation-modal-description"
      BackdropProps={{
        onClick: (event) => event.stopPropagation(),
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()} // Evita que el clic se propague al modal
        style={{
          position: "relative",
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
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ position: "absolute", top: -20, right: -20, padding: 0, paddingX: 0 }}
        >
          X
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
