import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";

function TermsConditions() {
  return (
    <Container maxWidth="xxl">
      <Grid display="flex" flexDirection="column" gap={2} width="100%" paddingY={4}>
        <Typography variant="h2" textAlign="center">
          Términos y Condiciones Avovite
        </Typography>
        <Typography textAlign="justify">
          Términos y Condiciones de Uso de la Aplicación Avovite app Por favor, lea detenidamente los siguientes
          términos y condiciones antes de utilizar la aplicación (&quot; Avovite app&quot;). Estos Términos constituyen
          un acuerdo legalmente vinculante entre usted (&quot;el Usuario&quot;) y [Avovite S.A.S] Al utilizar la
          Aplicación, usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los
          términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted acepta
          cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los términos o condiciones
          aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted acepta cumplir con estos
          Términos en su totalidad. Si no está de acuerdo con alguno de los términos o condiciones aquí establecidos, le
          pedimos que no utilice la Aplicación.
        </Typography>
      </Grid>
    </Container>
  );
}

export default TermsConditions;
