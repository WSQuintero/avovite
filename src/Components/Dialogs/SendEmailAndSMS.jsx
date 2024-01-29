import {
  Button,
  Checkbox,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import TiptapEditor from "../TiptapEditor";
import { LoadingButton } from "@mui/lab";

function SendEmailAndSMS({ open, loading, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ email: "", sms: "" });
  const [status, setStatus] = useState({ email: false, sms: false });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const status = await onSubmit(formData);

    if (status) {
      setFormData({ email: "", sms: "" });
      setStatus({ email: false, sms: false });
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Enviar correo y SMS</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <FormControlLabel
            control={<Checkbox checked={status.email} onChange={({ target }) => setStatus({ ...status, email: target.checked })} />}
            label="Enviar correo electrónico"
          />
          <Collapse in={status.email}>
            <TiptapEditor
              placeholder="Correo"
              value={formData.email}
              onChange={({ html }) => setFormData((prev) => ({ ...prev, email: html }))}
            />
          </Collapse>
          <FormControlLabel
            control={<Checkbox checked={status.sms} onChange={({ target }) => setStatus({ ...status, sms: target.checked })} />}
            label="Enviar SMS"
          />
          <Collapse in={status.sms}>
            <TextField
              multiline
              fullWidth
              minRows={6}
              maxRows={12}
              placeholder="SMS"
              value={formData.sms}
              helperText={`${160 - formData.sms.length} caracteres restantes`}
              onChange={({ target }) => setFormData((prev) => ({ ...prev, sms: target.value.length <= 160 ? target.value : prev.sms }))}
            />
          </Collapse>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton loading={loading} variant="contained" onClick={handleSubmit}>
          Enviar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default SendEmailAndSMS;
