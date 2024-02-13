import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Box } from "@mui/material";

function MessageModal({ open, onClose }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleCancel = () => {
    setMessage(""); // Reset message input
    onClose();
  };

  const handleSend = () => {
    // Implement logic to send message here
    setMessage(""); // Reset message input
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Enviar mensaje</DialogTitle>
      <DialogContent>
        {/* Chat area for displaying previous messages */}
        <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
          {/* User messages */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-start" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              You:
            </Typography>
            <Typography variant="body1">Message 1 from user</Typography>
            <Typography variant="body1">Message 2 from user</Typography>
            {/* Add more user messages here */}
          </Box>
          {/* Admin messages */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Admin:
            </Typography>
            <Typography variant="body1">Message 1 from admin</Typography>
            <Typography variant="body1">Message 2 from admin</Typography>
            {/* Add more admin messages here */}
          </Box>
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
    </Dialog>
  );
}

export default MessageModal;
