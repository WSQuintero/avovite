import { LoadingButton } from "@mui/lab";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import DropzoneImage from "../DropzoneImage";
import FacePlaceholderImage from "../../assets/img/form/face_placeholder.jpg";
import camera_placeholder from "../../assets/img/form/camera_placeholder.jpg";
import IdDocumentPlaceholderImage from "../../assets/img/form/id_document_placeholder.png";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  document: null,
  face1: null,
  face2: null,
};

function DialogKYC({ open, initialData, onSubmit, logout }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFormValid = useMemo(() => formData.document && formData.face1 && formData.face2, [formData]);
  const [showCamera, setShowCamera] = useState(false);
  const [takePhoto, setTakePhoto] = useState(false);
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const [takePhotoTwo, setTakePhotoTwo] = useState(false);
  const [uploadPhotoTwo, setUploadPhotoTwo] = useState(false);

  const camera = true;
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) {
      enqueueSnackbar("Todos los campos son requeridos.", { variant: "error" });
      return;
    }

    setLoading(true);

    const success = await onSubmit(formData);

    setLoading(false);

    if (success) {
      setFormData(initialFormData);
    } else {
      enqueueSnackbar(
        "No se ha podido validar su identidad, por favor intente nuevamente con imágenes suyas más legibles. Es importante que el documento de identidad sea la misma persona.",
        {
          variant: "error",
          autoHideDuration: 7000,
        }
      );
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open}>
      <DialogTitle>Primero tenemos que verificar tu identidad</DialogTitle>
      <DialogContent>
        <Stack spacing={4}>
          {currentStep === 0 ? (
            <Typography>
              Por favor suba una foto de su documento de identidad donde sea visible el rostro. Asegúrese que la foto sea legible.
            </Typography>
          ) : (
            <Typography>Por favor suba una foto de su cara donde sea visible el rostro. Asegúrese que la foto sea legible.</Typography>
          )}
          <Stack spacing={2} width={{ xs: "100%", md: "50%" }} alignSelf="center">
            {currentStep === 0 && (
              <Stack spacing={2} alignItems="center">
                <Typography color="primary.main">Documento de identidad</Typography>
                <DropzoneImage
                  placeholder={IdDocumentPlaceholderImage}
                  value={formData.document}
                  onChange={(value) => setFormData({ ...formData, document: value })}
                />
              </Stack>
            )}
            {currentStep === 1 && (
              <Stack spacing={2} alignItems="center" direction="row" justifyContent="center">
                {takePhoto === false && (
                  <Box>
                    <Typography color="primary.main">{!formData.face1 ? "Cargar archivo" : "Foto cargada"}</Typography>
                    <DropzoneImage
                      placeholder={FacePlaceholderImage}
                      value={formData.face1}
                      onChange={(value) => setFormData({ ...formData, face1: value })}
                      showCamera={showCamera}
                      setShowCamera={setShowCamera}
                      setUploadPhoto={setUploadPhoto}
                      setTakePhoto={setTakePhoto}
                    />
                  </Box>
                )}
                {!uploadPhoto && (
                  <Box>
                    <Typography color="primary.main">Tomar foto</Typography>
                    <DropzoneImage
                      placeholder={camera_placeholder}
                      value={formData.face1}
                      onChange={(value) => setFormData({ ...formData, face1: value })}
                      camera={camera}
                      showCamera={showCamera}
                      setShowCamera={setShowCamera}
                      setUploadPhoto={setUploadPhoto}
                      setTakePhoto={setTakePhoto}
                    />
                  </Box>
                )}
              </Stack>
            )}
            {currentStep === 2 && (
              <Stack spacing={2} alignItems="center" direction="row" justifyContent="center">
                {takePhotoTwo === false && (
                  <Box>
                    <Typography color="primary.main">{!formData.face2 ? "Cargar archivo" : "Foto cargada"}</Typography>
                    <DropzoneImage
                      placeholder={FacePlaceholderImage}
                      value={formData.face2}
                      onChange={(value) => setFormData({ ...formData, face2: value })}
                      showCamera={showCamera}
                      setShowCamera={setShowCamera}
                      setUploadPhoto={setUploadPhoto}
                      setTakePhoto={setTakePhoto}
                    />
                  </Box>
                )}
                {!uploadPhotoTwo && (
                  <Box>
                    <Typography color="primary.main">Tomar foto</Typography>
                    <DropzoneImage
                      placeholder={camera_placeholder}
                      value={formData.face2}
                      onChange={(value) => setFormData({ ...formData, face2: value })}
                      camera={camera}
                      showCamera={showCamera}
                      setShowCamera={setShowCamera}
                      setUploadPhoto={setUploadPhotoTwo}
                      setTakePhoto={setTakePhotoTwo}
                    />
                  </Box>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        {currentStep > 0 && (
          <Button variant="outlined" onClick={() => setCurrentStep(currentStep - 1)}>
            Atrás
          </Button>
        )}
        {currentStep === 2 ? (
          <LoadingButton loading={loading} disabled={!isFormValid} variant="contained" onClick={handleSubmit}>
            Verificar mi identidad
          </LoadingButton>
        ) : (
          <Button
            disabled={currentStep === 0 ? !formData.document : currentStep === 1 ? !formData.face1 : false}
            variant="contained"
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Siguiente
          </Button>
        )}
      </DialogActions>
      <Button variant="contained" color="primary" onClick={handleLogout}>
        Logout
      </Button>
    </Dialog>
  );
}

export default DialogKYC;
