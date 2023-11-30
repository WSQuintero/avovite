import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "../utilities";

function RechartsTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <Stack direction='row' spacing={1} padding={2} borderRadius={1} bgcolor="white" minWidth={180}>
        <Box width={16} height={16} borderRadius={4} bgcolor="success.light" />
        <Stack>
          <Typography color="black" lineHeight={1}>Subiendo</Typography>
          <Typography fontWeight={600} color="black">${formatCurrency(payload[0].value)}</Typography>
        </Stack>
      </Stack>
    );
  }

  return null;
}

export default RechartsTooltip;
