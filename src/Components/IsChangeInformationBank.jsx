import  { useEffect, useState } from 'react';
import { Button, Grid, Modal, Typography } from "@mui/material";

function IsChangeInformationBank({ isChangeInformationBank, setFrontalImage, setTraseraImage, frontalImage, traseraImage }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (event, index) => {
    const files = event.target.files;
    const selectedFile = files && files[0]; // Obtener el primer archivo seleccionado

    // Si index es 0, es el archivo frontal, de lo contrario, es el archivo trasero
    if (index === 0) {
      setFrontalImage(selectedFile);
    } else {
      setTraseraImage(selectedFile);
    }
  };

  useEffect(()=>{

  },[])
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
                borderRadius:"30px",
                position:"relative"
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
                name='frontImage'
              />
              <Button variant="contained" component="label" htmlFor="front-photo-button" style={{ marginBottom: '20px' }}>
                Cargar foto frontal
              </Button>
              {frontalImage && (
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                  Archivo frontal seleccionado: {frontalImage.name}
                </Typography>
              )}
              <input
                accept="image/*"
                id="back-photo-button"
                multiple
                type="file"
                style={{ display: 'none' }}
                onChange={(event) => handleFileChange(event, 1)}
                name='backImage'
              />
              <Button variant="contained" component="label" htmlFor="back-photo-button">
                Cargar foto trasera
              </Button>
              {traseraImage && (
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                  Archivo trasero seleccionado: {traseraImage.name}
                </Typography>
              )}
              <Button onClick={handleClose} variant="contained" style={{position:"absolute", bottom:"10px"}}>
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
