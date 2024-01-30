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
import { useSnackbar } from "notistack";

const initialFormData = {
  email: {
    subject: "",
    template: "",
  },
  sms: {
    subject: "",
    template: "",
  },
};

function SendEmailAndSMS({ open, loading, onClose, onSubmit }) {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ email: false, sms: false, massive: false });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (status.email && !formData.email.subject) {
      enqueueSnackbar("Debe agregar un asunto para email.", { variant: "error" });
      return;
    }

    if (status.email && !formData.email.template) {
      enqueueSnackbar("Debe agregar una plantilla para email.", { variant: "error" });
      return;
    }

    if (status.sms && !formData.sms.subject) {
      enqueueSnackbar("Debe agregar un asunto para SMS.", { variant: "error" });
      return;
    }

    if (status.sms && !formData.sms.template) {
      enqueueSnackbar("Debe agregar una plantilla para SMS.", { variant: "error" });
      return;
    }

    const success = await onSubmit({ form: formData, statuses: status });

    if (success) {
      setFormData(initialFormData);
      setStatus({ email: false, sms: false, massive: false });
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
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Asunto"
                value={formData.email.subject}
                onChange={({ target }) => setFormData((prev) => ({ ...prev, email: { ...prev.email, subject: target.value } }))}
              />
              <TiptapEditor
                placeholder="Correo"
                value={formData.email.template}
                onChange={({ html }) => setFormData((prev) => ({ ...prev, email: { ...prev.email, template: html } }))}
              />
            </Stack>
          </Collapse>
          <FormControlLabel
            control={<Checkbox checked={status.sms} onChange={({ target }) => setStatus({ ...status, sms: target.checked })} />}
            label="Enviar SMS"
          />
          <Collapse in={status.sms}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Asunto"
                value={formData.sms.subject}
                onChange={({ target }) => setFormData((prev) => ({ ...prev, sms: { ...prev.sms, subject: target.value } }))}
              />
              <TextField
                multiline
                fullWidth
                minRows={6}
                maxRows={12}
                placeholder="SMS"
                value={formData.sms.template}
                helperText={`${160 - formData.sms.template.length} caracteres restantes`}
                onChange={({ target }) =>
                  setFormData((prev) => ({
                    ...prev,
                    sms: { ...prev.sms, template: target.value.length <= 160 ? target.value : prev.sms.template },
                  }))
                }
              />
            </Stack>
          </Collapse>
          <FormControlLabel
            control={<Checkbox checked={status.massive} onChange={({ target }) => setStatus({ ...status, massive: target.checked })} />}
            label="Envío masivo"
          />
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
