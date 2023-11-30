import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Stack, Box, Link } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import { AnnualIcon, AvoviteWhiteIcon } from "../Components/Icons";
import IconWhite from "../assets/img/common/icon_white.svg";
import Flex from "../utilities/Flex";
import Theme from "../Theme";

const data = [
  {
    id: 1,
    name: "Contrato",
    url: "https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf",
  },
  {
    id: 2,
    name: "Recibo de compra",
    url: "https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf",
  },
  {
    id: 2,
    name: "Certificado de cosecha",
    url: "https://sccrtc.org/wp-content/uploads/2010/09/SampleContract-Shuttle.pdf",
  },
];

function HarvestCertificates() {
  const { contractId } = useParams();

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Stack spacing={6}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box width={48} height={48} padding={1} bgcolor="primary.main" borderRadius={4}>
              <AvoviteWhiteIcon color="transparent" sx={{ fontSize: 32 }} />
            </Box>
            <Typography fontWeight={600} color="primary.main">
              Certificados del contrato {contractId}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={4} flexWrap="wrap">
            {data.map((item) => (
              <Stack
                key={item.id}
                component={Link}
                href={item.url}
                target="_blank"
                underline="none"
                position="relative"
                alignItems="flex-start"
                justifyContent="flex-end"
                width={{ xsm: "100%", lg: Flex.getWrapWidth(2, 32), xl: Flex.getWrapWidth(3, 32) }}
                padding={3}
                bgcolor="primary.main"
                borderRadius={2}
                sx={{ aspectRatio: 2 }}
              >
                <Box width={64} height={64} bgcolor="white" borderRadius={1} mb={1} p={1}>
                  <AnnualIcon color={Theme.palette.primary.main} sx={{ fontSize: 48 }}></AnnualIcon>
                </Box>
                <Typography fontWeight={600} color="white" maxWidth="calc(100% - 64px)">
                  {item.name}
                </Typography>
                <Typography variant="caption" color="white" maxWidth="calc(100% - 64px)">
                  Haz clic para descargar Contrato
                </Typography>
                <img src={IconWhite} alt="Logo" width={64} style={{ position: "absolute", bottom: 16, right: 16 }} />
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </PageWrapper>
  );
}

export default HarvestCertificates;
