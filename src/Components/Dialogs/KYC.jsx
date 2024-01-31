import { LoadingButton } from "@mui/lab";
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useMemo, useState } from "react";
import DropzoneImage from "../DropzoneImage";
import FacePlaceholderImage from "../../assets/img/form/face_placeholder.jpg";
import IdDocumentPlaceholderImage from "../../assets/img/form/id_document_placeholder.png";

const initialFormData = {
  document: null,
  face1: null,
  face2: null,
};

function DialogKYC({ open, initialData, onSubmit }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFormValid = useMemo(() => formData.document && formData.face1 && formData.face2, [formData]);

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
    }
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
          {currentStep === 0 && (
            <Stack spacing={2} alignItems="center">
              <Typography color="primary.main">Documento de identidad</Typography>
              <DropzoneImage
                width="50%"
                placeholder={IdDocumentPlaceholderImage}
                value={formData.document}
                onChange={(value) => setFormData({ ...formData, document: value })}
              />
            </Stack>
          )}
          {currentStep === 1 && (
            <Stack spacing={2} alignItems="center">
              <Typography color="primary.main">Cara</Typography>
              <DropzoneImage
                width="50%"
                placeholder={FacePlaceholderImage}
                value={formData.face1}
                onChange={(value) => setFormData({ ...formData, face1: value })}
              />
            </Stack>
          )}
          {currentStep === 2 && (
            <Stack spacing={2} alignItems="center">
              <Typography color="primary.main">Cara</Typography>
              <DropzoneImage
                width="50%"
                placeholder={FacePlaceholderImage}
                value={formData.face2}
                onChange={(value) => setFormData({ ...formData, face2: value })}
              />
            </Stack>
          )}
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
    </Dialog>
  );
}

export default DialogKYC;
