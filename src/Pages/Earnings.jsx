import React from "react";
import PageWrapper from "../Components/PageWrapper";
import { AndroidOutlined as SampleIcon, Refresh as RefreshIcon } from "@mui/icons-material";

import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Earnings() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Container maxWidth="xsm">
        <Grid display="flex" flexDirection="column" alignItems="center">
          <Typography fontWeight={600} color="primary">
            Dinero Invertido
          </Typography>
          <Typography fontSize={24} color="primary" lineHeight={1}>
            $2.200.000
          </Typography>
          <SampleIcon sx={{ width: 96, height: 96 }} color="primary" />
          <Typography fontWeight={600} color="primary">
            Ganancias
          </Typography>
          <Typography fontSize={24} color="primary" lineHeight={1}>
            $5.000.000
          </Typography>
          <IconButton color="primary">
            <RefreshIcon />
          </IconButton>
          <Box height={16} />
          <Button variant="contained" fullWidth onClick={() => navigate('/budget')}>
            Tu dinero
          </Button>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Earnings;
