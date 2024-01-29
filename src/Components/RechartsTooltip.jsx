import { Box, Stack, Typography } from "@mui/material";
import { formatCurrency } from "../utilities";

function RechartsTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <Stack direction="row" spacing={1} alignItems="center" padding={2} borderRadius={1} bgcolor="white" minWidth={180}>
        <Box width={16} height={16} borderRadius={4} bgcolor="success.light" />
        <Stack>
          {/* <Typography color="black" lineHeight={1}>
            Subiendo
          </Typography> */}
          <Typography color="black">
            Fecha:{" "}
            <Typography component="span" fontWeight={600} color="primary.main">
              {payload[0].payload.x}
            </Typography>
          </Typography>
          <Typography color="black">
            Kilogramos:{" "}
            <Typography component="span" fontWeight={600} color="primary.main">
              {payload[0].payload.y} kg
            </Typography>
          </Typography>
          <Typography color="black">
            Ganancias:{" "}
            <Typography component="span" fontWeight={600} color="primary.main">
              ${formatCurrency(payload[0].payload.tooltip)}
            </Typography>
          </Typography>
        </Stack>
      </Stack>
    );
  }

  return null;
}

export default RechartsTooltip;
