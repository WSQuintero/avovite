import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";

function DocumentUploadModal({ frontDoc, backDoc, bankCert, rut, setFrontDoc, setBackDoc, setBankCert, setRut }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFrontDocChange = (event) => {
    setFrontDoc(event.target.files[0]);
  };

  const handleBackDocChange = (event) => {
    setBackDoc(event.target.files[0]);
  };

  const handleBankCertChange = (event) => {
    setBankCert(event.target.files[0]);
  };

  const handleRutChange = (event) => {
    setRut(event.target.files[0]);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined">
        Cargar documentos
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            width: 400,
            bgcolor: "background.paper",
            p: 4,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <label htmlFor="front-doc-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{ border: "1px solid #ccc", borderRadius: "4px", marginBottom: "8px", width: "100%" }}
            >
              {frontDoc ? frontDoc.name : "Foto frontal de documento"}
            </Button>
            <input id="front-doc-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFrontDocChange} />
          </label>
          <label htmlFor="back-doc-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{ border: "1px solid #ccc", borderRadius: "4px", marginBottom: "8px", width: "100%" }}
            >
              {backDoc ? backDoc.name : "Foto trasera de documento"}
            </Button>
            <input id="back-doc-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleBackDocChange} />
          </label>
          <label htmlFor="bank-cert-upload">
            <Button
              variant="outlined"
              component="span"
              sx={{ border: "1px solid #ccc", borderRadius: "4px", marginBottom: "8px", width: "100%" }}
            >
              {bankCert ? bankCert.name : "Certificación bancaria"}
            </Button>
            <input id="bank-cert-upload" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleBankCertChange} />
          </label>
          <label htmlFor="rut-upload">
            <Button variant="outlined" component="span" sx={{ border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}>
              {rut ? rut.name : "RUT"}
            </Button>
            <input id="rut-upload" type="file" accept=".pdf" style={{ display: "none" }} onChange={handleRutChange} />
          </label>
          <Button onClick={handleClose} variant="contained" color="primary" sx={{ marginTop: "16px", width: "100%" }}>
            Cerrar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default DocumentUploadModal;
