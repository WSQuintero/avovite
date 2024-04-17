import React from "react";
import { Modal, Typography, Button } from "@mui/material";

const ModalFirstTry = ({ open, onClose, message, actualContract }) => {
  console.log(actualContract);
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <div
        style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", backgroundColor: "white", padding: 20 }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Mensaje
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}{" "}
          {actualContract >= 2 && (
            <Button
              onClick={() => {
                window.open("https://wa.me/573227348601");
              }}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Ir a WhatsApp
            </Button>
          )}
        </Typography>
        <Button onClick={onClose} variant="contained" color="primary" sx={{ mt: 2 }}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ModalFirstTry;
