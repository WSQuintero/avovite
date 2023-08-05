import React from "react";
import PageWrapper from "../Components/PageWrapper";
import { Container, Grid, Typography } from "@mui/material";
import { AndroidOutlined as SampleIcon } from "@mui/icons-material";
import { formatDate } from "../utilities";

function Budget() {
  return (
    <PageWrapper>
      <Container maxWidth="sm">
        <Grid display="flex" flexDirection="column" gap={4}>
          <Grid display="flex" flexDirection="column" alignItems="center">
            <SampleIcon color="primary" fontSize="large" />
            <Typography color="primary" fontWeight={700}>
              $1.500.000 COP
            </Typography>
            <Typography>Fecha de Recolección</Typography>
            <Typography color="primary">{formatDate("11/23/2023")}</Typography>
          </Grid>
          <Grid display="flex" flexDirection="column" gap={2}>
            <Grid>
              <Typography color="primary">Fecha de venta</Typography>
              <Typography lineHeight={1}>{formatDate("11/23/2023")}</Typography>
            </Grid>
            <Grid>
              <Typography color="primary">Valor de venta</Typography>
              <Typography lineHeight={1}>$1.500.000</Typography>
            </Grid>
            <Grid>
              <Typography color="primary">Poliza de seguro</Typography>
              <Typography lineHeight={1}>-$500.000</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Budget;
