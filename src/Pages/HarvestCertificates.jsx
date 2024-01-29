import { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Container, Stack, Box, Link, CircularProgress } from "@mui/material";
import PageWrapper from "../Components/PageWrapper";
import { AnnualIcon, AvoviteWhiteIcon } from "../Components/Icons";
import IconWhite from "../assets/img/common/icon_white.svg";
import Flex from "../utilities/Flex";
import Theme from "../Theme";
import { useSnackbar } from "notistack";

function HarvestCertificates() {
  const { enqueueSnackbar } = useSnackbar();
  const { contractId } = useParams();
  const [loading, setLoading] = useState({ fetching: null });

  const certificates = [
    {
      id: 1,
      name: "Contrato",
      url: `${import.meta.env.VITE_API_URL}/contracts/files/${contractId}`,
    },
    {
      id: 2,
      name: "Certificado de cosecha",
      async onClick({ id }) {
        try {
          setLoading((prev) => ({ ...prev, fetching: id }));

          const { data } = await (await fetch(`${import.meta.env.VITE_API_URL}/contracts/certificado/depropiedad/${contractId}`)).json();

          setLoading((prev) => ({ ...prev, fetching: null }));

          window.open(data.datapdf, "_blank");
        } catch (e) {
          enqueueSnackbar("Error al obtener el certificado", { variant: "error" });
        } finally {
          setLoading((prev) => ({ ...prev, fetching: null }));
        }
      },
    },
  ];

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
            {certificates.map((certificate) => {
              const props = certificate.onClick
                ? { onClick: () => certificate.onClick(certificate) }
                : { component: Link, href: certificate.url, target: "_blank", underline: "none" };

              return (
                <Stack
                  {...props}
                  key={certificate.id}
                  position="relative"
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  width={{ xsm: "100%", lg: Flex.getWrapWidth(2, 32), xl: Flex.getWrapWidth(3, 32) }}
                  padding={3}
                  bgcolor="primary.main"
                  borderRadius={2}
                  sx={{ aspectRatio: 2, cursor: "pointer" }}
                >
                  <Box width={64} height={64} bgcolor="white" borderRadius={1} mb={1} p={1}>
                    {loading.fetching === certificate.id ? (
                      <CircularProgress size={48} />
                    ) : (
                      <AnnualIcon color={Theme.palette.primary.main} sx={{ fontSize: 48 }}></AnnualIcon>
                    )}
                  </Box>
                  <Typography fontWeight={600} color="white" maxWidth="calc(100% - 64px)">
                    {certificate.name}
                  </Typography>
                  <Typography variant="caption" color="white" maxWidth="calc(100% - 64px)">
                    Haz clic para descargar Contrato
                  </Typography>
                  <img src={IconWhite} alt="Logo" width={64} style={{ position: "absolute", bottom: 16, right: 16 }} />
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </PageWrapper>
  );
}

export default HarvestCertificates;
