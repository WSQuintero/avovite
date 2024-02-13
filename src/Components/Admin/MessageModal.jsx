import { useState, useMemo } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box, Alert, Snackbar } from "@mui/material";
import TicketService from "../../Services/ticket.service";
import useSession from "../../Hooks/useSession";

function MessageModal({ open, onClose, actualTicketId, setActualTicketId }) {
  const [session] = useSession();
  const $Ticket = useMemo(() => (session?.token ? new TicketService(session?.token) : null), [session?.token]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });

  const resetFeedback = () => {
    setFeedback({ ...feedback, open: false });
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleCancel = () => {
    setMessage(""); // Reset message input
    onClose();
    setActualTicketId("");
  };

  const handleSend = async () => {
    try {
      const { status, data } = await $Ticket.sendMessage({ message: String(message), ticketsId: actualTicketId });
      if (status) {
        setFeedback({ open: true, message: "Mensaje enviado correctamente", status: "success" });
        setMessages((prevMessages) => [...prevMessages, { sender: "You", text: message }]);
        setMessage(""); // Reset message input
   // Cerrar el modal después de enviar el mensaje
      } else {
        setFeedback({ open: true, message: "Error al enviar el mensaje", status: "error" });
      }
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
      setFeedback({ open: true, message: "Error al enviar el mensaje", status: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Enviar mensaje</DialogTitle>
      <DialogContent>
        {/* Chat area for displaying previous messages */}
        <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {/*Aquí se debe iterar los mensajes que llegan */}
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: msg.sender === "You" ? "flex-start" : "flex-end",
              }}
            >
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {msg.sender}:
              </Typography>
              <Typography variant="body1">{msg.text}</Typography>
            </Box>
          ))}
        </Box>
        {/* Input field for typing new message */}
        <TextField
          autoFocus
          margin="dense"
          id="message"
          label="Mensaje"
          type="text"
          fullWidth
          value={message}
          onChange={handleMessageChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancelar</Button>
        <Button onClick={handleSend} color="primary">
          Enviar
        </Button>
      </DialogActions>
      <Snackbar
        open={feedback.open}
        autoHideDuration={3000}
        onClose={resetFeedback}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
          {feedback.message}
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

export default MessageModal;
