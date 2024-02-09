import React, { useState } from 'react';
import { Button, Grid, Modal, Typography } from "@mui/material";

function IsChangeInformationBank({ isChangeInformationBank, handleFileChange }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isChangeInformationBank && (
        <>
          <Button onClick={handleOpen} variant="outlined" >Subir archivos correspondientes</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container
              style={{
                width: '80%',
                height: '80%',
                backgroundColor: '#fff',
                boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius:"30px"
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2" style={{ marginBottom: '20px' }}>
                Subir fotos
              </Typography>
              <input
                accept="image/*"
                id="front-photo-button"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={(event) => handleFileChange(event, 0)}
              />
              <Button variant="contained" component="label" htmlFor="front-photo-button" style={{ marginBottom: '20px' }}>
                Cargar foto frontal
              </Button>
              <input
                accept="image/*"
                id="back-photo-button"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={(event) => handleFileChange(event, 1)}
              />
              <Button variant="contained" component="label" htmlFor="back-photo-button">
                Cargar foto trasera
              </Button>
            </Grid>
          </Modal>
        </>
      )}
    </>
  );
}

export default IsChangeInformationBank;
