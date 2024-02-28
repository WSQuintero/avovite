import { useState, useRef, useEffect } from "react";
import { Alert, Box, Button, ButtonBase, Icon, Snackbar } from "@mui/material";
import Webcam from "react-webcam";
import ScannerAnimation from "./Dialogs/ScannerAnimation"
function formatColor(hex) {
  return String(hex).split("#")[1];
}

function DropzoneImage({ width = "100%", placeholder, value, onChange, children, camera,showCamera,setShowCamera,setTakePhoto,setUploadPhoto,loading}) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(value);
  const [feedback, setFeedback] = useState({ open: false, message: "", status: "success" });
  const webcamRef = useRef(null);

  const handleDrag = (event, status) => {
    event.preventDefault();
    setDragging(status);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file && file.type.startsWith("image/")) {
      setFile(file);
      onChange(file);

    } else {
      setFeedback({ open: true, message: "El archivo seleccionado no es una imagen.", status: "error" });
    }
    setDragging(false);
  };

  const handlePick = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file && file.type.startsWith("image/")) {
      setFile(file);
      onChange(file);
    } else {
      setFeedback({ open: true, message: "El archivo seleccionado no es una imagen.", status: "error" });
    }
    setDragging(false);
    setUploadPhoto(true)
  };

  const resetFeedback = () => {
    setFeedback((prev) => ({ ...prev, open: false }));
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const file = dataURItoBlob(imageSrc);
    setFile(file);
    onChange(file);
    setShowCamera(false);
    setTakePhoto(true);
  };


  const handleRemoveImage = () => {
    setFile(null);
    onChange(null);
    setTakePhoto(false)
    setUploadPhoto(false)
    setShowCamera(false);
    setDragging(false);

  };

  useEffect(()=>{
    if(setShowCamera){
      setShowCamera(false);
    }

  },[setShowCamera])

  return (
    <>
      <Box
        position="relative"
        display="flex"
        flexShrink={0}
        justifyContent="center"
        alignItems="center"
        width={280}
        height={280}
        padding={2}
        sx={(t) => ({
          aspectRatio: 1,
          borderRadius: 1,
          ...(dragging
            ? {
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23${formatColor(
                  t.palette.primary.main
                )}' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
              }
            : {
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%23${formatColor(
                  t.palette.text.light
                )}' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
              }),
        })}
        onDrop={handleDrop}
        onDragOver={(event) => handleDrag(event, true)}
        onDragLeave={(event) => handleDrag(event, false)}
        onClick={() => camera && !showCamera && setShowCamera(true)} // Abrir la cámara solo cuando camera sea true y no se haya mostrado aún
      >
        {file && !showCamera &&(
          <>
            <img
              src={typeof file === "string" ? file : URL.createObjectURL(file) }
              alt="Previsualización de la imagen"
              style={{
                position: "absolute",
                top: 32,
                left: 32,
                width: "calc(100% - 64px)",
                height: "calc(100% - 64px)",
                objectFit: "contain",
                borderRadius: 16,
              }}
            />

            <Button
              variant="contained"
              color="error"
              onClick={handleRemoveImage}
              sx={{
                position: "absolute",
                top: -15,
                right: 8,
                borderRadius: "50%",
                minWidth: 0, // Asegura que el ancho mínimo sea 0 para que se ajuste al contenido
                width: "30px",
                height: "30px",
              }}
            >
              <Icon className="fal fa-times" sx={{ color: "white", fontSize: 15 }} />
            </Button>
          </>
        )}

        {!file && !showCamera && (!camera||camera)&& (
          <>
            <img
              src={placeholder}
              alt="placeholder"
              style={{
                position: "absolute",
                top: 32,
                left: 32,
                width: "calc(100% - 64px)",
                height: "calc(100% - 64px)",
                objectFit: "contain",
                opacity: 0.25,
                borderRadius: 16,
              }}
            />
            {!camera&&(

            <input
              type="file"
              accept="image/*"
              style={{ position: "absolute", width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
              onChange={handlePick}
            />
            )}
          </>
        )}
        {showCamera && camera && (
          <>
            <Webcam audio={false} screenshotFormat="image/jpeg" width={width} height={width} ref={webcamRef} style={{ borderRadius: 16 }} />
            <Button
              variant="contained"
              onClick={handleCapture}
              sx={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)" }}
            >
              Tomar Foto
            </Button>
          </>
        )}
        <Snackbar
          open={feedback.open}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={resetFeedback}
        >
          <Alert onClose={resetFeedback} severity={feedback.status} sx={{ width: "100%" }}>
            {feedback.message}
          </Alert>
        </Snackbar>
        {children}
      </Box>
      {loading && <ScannerAnimation loading={loading} />} {/* Renderiza la animación de scanner si loading es true */}

    </>
  );
}

export default DropzoneImage;
