import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography, TextField } from "@mui/material";
import FormRequestAvocados from "../Forms/RequestAvocados";

function RequestAvocados({ open, onClose, onSubmit }) {
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      {!termsAndConditions ? (
        <>
          <DialogTitle>Terminos y condiciones para solicitud de aguacates</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Stack>
                <Typography fontWeight={600}>1. Solicitud de aguacates</Typography>
                <Typography>
                  Al realizar una solicitud de aguacates para consumo propio a través de nuestra aplicación, te
                  comprometes a proporcionar información precisa y veraz sobre la cantidad requerida y la dirección de
                  envío. La empresa se reserva el derecho de cancelar solicitudes incompletas o inexactas.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>2. Costos y envío</Typography>
                <Typography>
                  El usuario asume todos los costos asociados con el envío de los aguacates solicitados. La empresa de
                  inversiones en aguacates no se hace responsable de los costos de envío ni de cualquier problema que
                  surja durante el proceso de entrega.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>3. Calidad y garantía</Typography>
                <Typography>
                  Nos esforzamos por ofrecer aguacates de la mejor calidad. Sin embargo, debido a la naturaleza
                  perecedera del producto, no podemos garantizar la calidad o frescura de los aguacates una vez
                  entregados. El usuario comprende y acepta esta condición al realizar la solicitud.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>4. Responsabilidad del usuario</Typography>
                <Typography>
                  El usuario es responsable de inspeccionar los aguacates entregados y comunicar cualquier problema o
                  discrepancia en un plazo de tiempo razonable tras la recepción. La empresa no se hace responsable de
                  reclamaciones realizadas después de este período.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>6. Cancelaciones y reembolsos</Typography>
                <Typography>
                  Las solicitudes de cancelación deben realizarse antes del procesamiento del envío. No se garantizan
                  reembolsos una vez que la solicitud ha sido procesada y los aguacates han sido enviados.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>6. Modificaciones en los términos y condiciones</Typography>
                <Typography>
                  La empresa se reserva el derecho de realizar cambios en estos términos y condiciones en cualquier
                  momento sin previo aviso. Se recomienda revisar periódicamente esta sección para estar al tanto de
                  cualquier actualización.
                </Typography>
              </Stack>
              <Stack>
                <Typography>
                  Al utilizar esta aplicación para solicitar aguacates para consumo propio, aceptas y comprendes estos
                  términos y condiciones en su totalidad.
                </Typography>
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={() => setTermsAndConditions(true)}>
              Aceptar
            </Button>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle>Formulario de solicitud</DialogTitle>
          <DialogContent>
            <Stack py={1}>
              <FormRequestAvocados onSubmit={onSubmit} />
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export default RequestAvocados;
