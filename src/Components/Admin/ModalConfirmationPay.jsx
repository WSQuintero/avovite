import { Modal, Typography, Button, Box } from "@mui/material";

function ModalConfirmationPay({ open, onClose, handlePayment }) {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Mensaje Importante
        </Typography>
        <Typography id="modal-description" variant="body1" gutterBottom>
          1. Asegúrate de contar con el capital necesario para el pago.
        </Typography>
        <Typography variant="body1" gutterBottom>
          2. Verifica que el monto a pagar no exceda los límites establecidos para compras en internet con tarjeta débito, PSE o tarjeta de
          crédito.
        </Typography>
        <Typography variant="body1" gutterBottom>
          3. Confirma con tu banco la aprobación de compras y montos.
        </Typography>
        <Typography variant="body1" gutterBottom>
          4. Si pagas con tarjeta de crédito, confirma la posible verificación por SMS, llamada o correo electrónico para aprobación.
        </Typography>
        <Typography variant="body1" gutterBottom>
          5. En caso de rechazo o pendiente de pago, revisa nuevamente con el banco según los puntos mencionados.
        </Typography>
        <Typography variant="body1" gutterBottom>
          6. Si el problema persiste después de las verificaciones anteriores, contáctanos.
        </Typography>
        <Button onClick={handlePayment} variant="contained" color="primary" sx={{ mt: 2 }}>
          Confirmar
        </Button>
      </Box>
    </Modal>
  );
}

export default ModalConfirmationPay;
