import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Stack } from "@mui/material";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { MuiFileInput } from "mui-file-input";

const initialFormData = {
  file: null,
  massive: false,
};

function ImportContacts({ open, loading, onClose, onSubmit }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.file) {
      enqueueSnackbar("Debe seleccionar un archivo.", { variant: "error" });
      return;
    }

    const success = await onSubmit(formData);

    if (success) {
      setFormData(initialFormData);
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Importar contactos</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={2}>
          <MuiFileInput fullWidth label="Archivo" value={formData.file} onChange={(value) => setFormData({ ...formData, file: value })} />
          <FormControlLabel
            control={
              <Checkbox checked={formData.massive} onChange={({ target }) => setFormData({ ...formData, massive: target.checked })} />
            }
            label="Enviar correos de reestablecimiento de contraseña"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton loading={loading} variant="contained" onClick={handleSubmit}>
          Importar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default ImportContacts;
