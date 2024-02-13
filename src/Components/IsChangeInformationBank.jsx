import { useEffect, useState } from "react";
import { Button, Grid, Modal, Typography } from "@mui/material";

function IsChangeInformationBank({ isChangeInformationBank, setCertificateBank, certificateBank }) {
  const [open, setOpen] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setCertificateBank(event.target.files[0]);
  };

  useEffect(() => {}, []);
  return (
    <>
      {isChangeInformationBank && (
        <>
          <Button onClick={handleOpen} variant="outlined">
            Subir certificación bancaria
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              container
              style={{
                width: "80%",
                height: "80%",
                backgroundColor: "#fff",
                boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "30px",
                position: "relative",
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2" style={{ marginBottom: "20px" }}>
                Subir documento
              </Typography>
              <input
                id="certificate-bank-button"
                multiple
                type="file"
                style={{ display: "none" }}
                onChange={(event) => handleFileChange(event)}
                name="certificateDocument"
              />
              <Button variant="contained" component="label" htmlFor="certificate-bank-button" style={{ marginBottom: "20px" }}>
                Cargar
              </Button>
              {certificateBank && (
                <Typography variant="body1" style={{ marginBottom: "20px" }}>
                  Archivo seleccionado: {certificateBank.name}
                </Typography>
              )}

              <Button onClick={handleClose} variant="contained" style={{ position: "absolute", bottom: "10px" }}>
                Cerrar
              </Button>
            </Grid>
          </Modal>
        </>
      )}
    </>
  );
}

export default IsChangeInformationBank;
