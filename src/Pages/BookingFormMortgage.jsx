import { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { HighlightOff as ErrorIcon, CheckCircle as CheckIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Form from "../Components/Form";

const BookingFormMortgage = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });

  const handleSubmit = async ({ status }) => {
    if (status === "success") {
      setFeedback({ open: true, message: "Formulario completado exitosamente.", status: "success" });
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } else {
      setFeedback({ open: true, message: "Ha ocurrido un error inesperado.", status: "error" });
    }
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ show: false, message: prev.message, status: prev.status }));
  };

  return (
    <Container maxWidth="xxl" sx={{ marginY: 4, padding: 4, border: 1, borderRadius: 2, borderColor: "primary.main" }}>
      <Form isMortgage title="Aplicación con garantía hipotecaria" onSubmit={handleSubmit} />

      <Dialog open={feedback.open && feedback.status === "success"} onClose={resetFeedback}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <CheckIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Formulario completado exitosamente.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={18} textAlign="center">
            ¿Desea rellenarlo una vez más?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => navigate("/")} fullWidth>
            No
          </Button>
          <Button variant="contained" onClick={resetFeedback} fullWidth>
            Si
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={feedback.open && feedback.status === "error"} onClose={resetFeedback}>
        <DialogTitle component={Grid} display="flex" flexDirection="column" alignItems="center">
          <ErrorIcon fontSize="large" />
          <Typography textAlign="center" fontSize={22} fontWeight={500}>
            Ha ocurrido un error.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText fontSize={18} textAlign="center">
            Verifica los campos e inténtalo nuevamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={resetFeedback} fullWidth>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookingFormMortgage;
