import { useEffect, useState } from "react";
import { Button, Grid, Modal, Typography } from "@mui/material";

function UploadInformationOther({ setFilesOther, filesOther,valueOption }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event) => {
    setFilesOther(event.target.files[0]);
  };

  useEffect(() => {}, []);
  return (
    <>
      <Button onClick={handleOpen} variant="outlined" sx={{marginTop:"20px",marginLeft:"10px"}} disabled={!valueOption && true}>
        Subir documento
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
            id="document-button"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={(event) => handleFileChange(event)}
            name="document"
          />
          <Button variant="contained" component="label" htmlFor="document-button" style={{ marginBottom: "20px" }}>
            Cargar
          </Button>
          {filesOther && (
            <Typography variant="body1" style={{ marginBottom: "20px" }}>
              Archivo seleccionado: {filesOther.name}
            </Typography>
          )}

          <Button onClick={handleClose} variant="contained" style={{ position: "absolute", bottom: "10px" }}>
            Cerrar
          </Button>
        </Grid>
      </Modal>
    </>
  );
}

export default UploadInformationOther;
