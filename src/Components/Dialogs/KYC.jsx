import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import DropzoneImage from "../DropzoneImage";
import FacePlaceholderImage from "../../assets/img/form/face_placeholder.jpg";
import IdDocumentPlaceholderImage from "../../assets/img/form/id_document_placeholder.png";
import { useNavigate } from "react-router-dom";

const initialFormData = {
  document: null,
  face1: null,
  face2: null,
};

function DialogKYC({ open, initialData, onSubmit,logout }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialData || initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const isFormValid = useMemo(() => formData.document && formData.face1 && formData.face2, [formData]);
const navigate=useNavigate()

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

  const handleLogout=()=>{
    logout()
    navigate("/signin")
  }
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
              <Stack spacing={2} alignItems="center">
                <Typography color="primary.main">Cara</Typography>
                <DropzoneImage
                  placeholder={FacePlaceholderImage}
                  value={formData.face1}
                  onChange={(value) => setFormData({ ...formData, face1: value })}
                />
              </Stack>
            )}
            {currentStep === 2 && (
              <Stack
                position="relative"
                spacing={2}
                alignItems="center"
                sx={{
                  "&::after": {
                    content: "'Verificando'",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "#18c89b",
                    fontSize: "1.5rem",
                    fontWeight: "semibold",
                    pointerEvents: "none",
                    opacity: loading ? 1 : 0,
                    transition: "opacity 0.5s",
                  },
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    width: 20,
                    background: "#18c89b",
                    boxShadow: "0 0 140px 40px #18c89b",
                    clipPath: "inset(0)",
                    pointerEvents: "none",
                    mixBlendMode: "color",
                    opacity: loading ? 1 : 0,
                    transition: "opacity 0.5s",
                    animation: "x 1s ease-in-out infinite alternate, y 2s ease-in-out infinite",
                  },
                  "@keyframes x": {
                    to: {
                      transform: "translateX(-100%)",
                      left: "100%",
                    },
                  },
                  "@keyframes y": {
                    "33%": {
                      clipPath: "inset(0 0 0 -200px)",
                    },
                    "50%": {
                      clipPath: "inset(0 0 0 0)",
                    },
                    "83%": {
                      clipPath: "inset(0 -200px 0 0)",
                    },
                  },
                }}
              >
                <Stack
                  position="relative"
                  spacing={2}
                  alignItems="center"
                  width='100%'
                  sx={{
                    // borderRadius: 1,

                    // animation: "pulse 1s ease-in-out infinite alternate",
                    // "@keyframes pulse": {
                    //   to: {
                    //     opacity: 0.5,
                    //   },
                    // },
                  }}
                >
                  <Typography color="primary.main">Cara</Typography>
                  <DropzoneImage
                    placeholder={FacePlaceholderImage}
                    value={formData.face2}
                    onChange={(value) => setFormData({ ...formData, face2: value })}
                  />
                </Stack>
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
