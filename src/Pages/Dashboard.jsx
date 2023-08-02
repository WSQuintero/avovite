import React from "react";
import PageWrapper from "../Components/PageWrapper";
import { Box, Grid, Typography } from "@mui/material";
import { AndroidOutlined as SampleIcon } from "@mui/icons-material";

const CardMenu = ({ icon, title }) => (
  <Box
    position="relative"
    width="50%"
    paddingX={3}
    paddingY={4}
    borderRadius={2}
    sx={{ backgroundColor: "primary.main" }}
  >
    <Grid display="flex" flexDirection="column" alignItems="flex-start" gap={1}>
      <Box display="flex" padding={1} borderRadius={1} sx={{ backgroundColor: "white" }}>
        {icon}
      </Box>
      <Typography fontWeight={600} color="common.white">
        {title}
      </Typography>
      <Box position="absolute" right={16} bottom={0}>
        <SampleIcon sx={{ color: "white", fontSize: 48 }} />
      </Box>
    </Grid>
  </Box>
);

function Dashboard() {
  return (
    <PageWrapper>
      <Grid display="flex" flexDirection="column" gap={2} width="100%">
        <Grid display="flex" gap={2}>
          <Grid display="flex" flexDirection="column" gap={2} width="50%">
            <Grid display="flex" gap={2}>
              <CardMenu title="Información" icon={<SampleIcon sx={{ color: "primary.main" }} />} />
              <CardMenu title="Cosechas" icon={<SampleIcon sx={{ color: "primary.main" }} />} />
            </Grid>
            <Grid display="flex" gap={2}>
              <CardMenu title="Otros Datos" icon={<SampleIcon sx={{ color: "primary.main" }} />} />
              <CardMenu title="Certificados" icon={<SampleIcon sx={{ color: "primary.main" }} />} />
            </Grid>
          </Grid>
          <Box width="50%" padding={2} borderRadius={2} sx={{ backgroundColor: "secondary.main" }}></Box>
        </Grid>
        <Grid display="flex" gap={2}>
          <Box width="50%" padding={2} borderRadius={2} sx={{ backgroundColor: "secondary.main" }}></Box>
          <Grid display="flex" gap={2} width="50%">
            <Box width="50%" padding={2} borderRadius={2} sx={{ backgroundColor: "secondary.main" }}></Box>
            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              width="50%"
              padding={2}
              borderRadius={2}
              sx={{ backgroundColor: "primary.main" }}
            >
              <Typography fontWeight={600} textAlign="center" color="common.white">
                Datos
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRadius={2}
                padding={2}
                sx={{ backgroundColor: "white" }}
              >
                <Typography fontWeight={600} color="primary">
                  Maduros
                </Typography>
                <Typography color="primary">50</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                borderRadius={2}
                padding={2}
                sx={{ backgroundColor: "white" }}
              >
                <Typography fontWeight={600} color="primary">
                  En crecimiento
                </Typography>
                <Typography color="primary">17</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
}

export default Dashboard;
