import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

function TermsConditions() {
  return (
    <Container maxWidth="xxl">
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={4}>
        <Typography variant="h2" textAlign="center">
        ¡Bienvenido a la app de Avovite! 
        </Typography>
        <Typography textAlign="justify">
        Aquí, te sumergirás en una experiencia de usuario excepcional. 
Estamos emocionados de tenerte con nosotros, estamos trabajando en actualizaciones para hacer tu experiencia aún mejor. Pronto, disfrutarás de servicios mejorados que harán que cada interacción sea más fluida y satisfactoria. 
En Avovite, queremos que tu tiempo con nosotros sea inolvidable.
        </Typography>
      </Grid>
    </Container>
  );
}

export default TermsConditions;
