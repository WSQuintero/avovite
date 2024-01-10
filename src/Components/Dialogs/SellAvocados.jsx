import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, Stack, Typography } from "@mui/material";
import FormSellAvocados from "../Forms/SellAvocados";

function SellAvocados({ open, onClose, onSubmit }) {
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      {!termsAndConditions ? (
        <>
          <DialogTitle>Terminos y condiciones para venta de aguacates por terceros</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <Stack>
                <Typography fontWeight={600}>1. Registro como vendedor externo</Typography>
                <Typography>
                  Las empresas interesadas en vender aguacates a través de nuestra plataforma deben registrarse como vendedores externos.
                  Este registro implica proporcionar información detallada y precisa sobre la empresa, la calidad de los aguacates
                  ofrecidos, los detalles de contacto y los métodos de envío.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>2. Calidad de los aguacates</Typography>
                <Typography>
                  Las empresas vendedoras externas se comprometen a ofrecer aguacates de alta calidad y frescura a los usuarios de la
                  plataforma. Asimismo, se espera que proporcionen descripciones precisas y verídicas de los productos ofrecidos, incluyendo
                  su estado, tamaño, calidad y cualquier otra característica relevante.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>3. Responsabilidades del vendedor externo</Typography>
                <Typography>
                  Las empresas vendedoras externas son responsables de garantizar la precisión de la información sobre precios, métodos de
                  envío, plazos de entrega y políticas de devolución. Además, deben cumplir con todas las leyes y regulaciones aplicables
                  relacionadas con la venta de productos agrícolas.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>4. Comisiones y pagos</Typography>
                <Typography>
                  Se pueden aplicar comisiones por las ventas realizadas a través de la plataforma. Los detalles sobre las tarifas y los
                  métodos de pago se especificarán en un acuerdo separado entre la plataforma y la empresa vendedora externa.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>5. Envío y entregas</Typography>
                <Typography>
                  Las empresas vendedoras externas son responsables de la correcta preparación y envío de los aguacates vendidos a través de
                  la plataforma. Los costos de envío y cualquier problema relacionado con la entrega serán responsabilidad de la empresa
                  vendedora externa, a menos que se acuerde lo contrario con los compradores.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>6. Cancelaciones y devoluciones</Typography>
                <Typography>
                  Las empresas vendedoras externas deben establecer claramente sus políticas de cancelación, devolución y reembolso. Las
                  disputas entre vendedores externos y compradores se resolverán de manera independiente, aunque la plataforma puede
                  intervenir según sea necesario para facilitar una solución.
                </Typography>
              </Stack>
              <Stack>
                <Typography fontWeight={600}>7. Modificaciones en los términos y condiciones</Typography>
                <Typography>
                  La plataforma se reserva el derecho de realizar cambios en estos términos y condiciones en cualquier momento sin previo
                  aviso. Se recomienda a las empresas vendedoras externas revisar periódicamente esta sección para estar al tanto de
                  cualquier actualización.
                </Typography>
              </Stack>
              <Stack>
                <Typography>
                  Al utilizar esta plataforma para vender aguacates, las empresas vendedoras externas aceptan y comprenden estos términos y
                  condiciones en su totalidad.
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
          <DialogTitle>Autorización vender mis frutos por un tercero</DialogTitle>
          <DialogContent>
            <Stack spacing={2} py={1}>
              <FormSellAvocados onSubmit={onSubmit} onCancel={onClose} />
            </Stack>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}

export default SellAvocados;
