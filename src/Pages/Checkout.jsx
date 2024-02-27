import { useEffect, useState } from "react";
import { Container, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import PageWrapper from "../Components/PageWrapper";
import useCart from "../Hooks/useCart";
import { useSearchParams } from "react-router-dom";
import BackButton from "../Components/BackButton";

function Checkout() {
  const [params, setSearchParams] = useSearchParams();
  const [, { remove }] = useCart();
  const [refPayco, setRefPayco] = useState(null);

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(refPayco);
  };

  useEffect(() => {
    setRefPayco(params.get("ref_payco"));

    if (params.get("products") && params.get("ref_payco") !== "undefined") {
      const products = JSON.parse(params.get("products"));

      products.length && products.forEach((p) => remove(p.id));

      setSearchParams((params) => {
        params.delete("products");
        return params;
      });
    }
  }, [params]);

  return (
    <PageWrapper>
    <BackButton/>
      <Container maxWidth="xxl">
        <Grid display="flex" flexDirection="column" gap={2}>
          <Typography variant="h2">{!refPayco ? "Error al procesar pago" : "Pago realizado con éxito"}</Typography>
          {refPayco && (
            <>
              <Typography>Referencia de pago:</Typography>
              <TextField
                disabled
                value={refPayco}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={onCopyToClipboard}>
                        <CopyIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </>
          )}
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Checkout;
