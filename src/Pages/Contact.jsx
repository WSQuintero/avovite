import { Box, Grid, Typography, Container } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PageWrapper from "../Components/PageWrapper";
import MapImage from "../assets/img/contact/MapPlaceholder.png";
import { AvoviteIcon, ClockIcon, MessageChat } from "../Components/Icons";
function Contact() {
  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid display="flex" flexDirection="column" gap={5}>
          <Typography
            variant="h2"
            sx={(t) => ({
              [t.breakpoints.down("md")]: {
                display: "none",
              },
            })}
          >
            Contactanos
          </Typography>
          <Grid display="flex" gap={2}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              width="100%"
            >
              <Box position="absolute" width={70} height={70}>
                <PlaceIcon
                  color="primary"
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>

              <img src={MapImage} alt="photo" />
            </Box>
            <Box display="flex" height="100%" flexDirection="column" gap={2}>
              <Typography variant="h3" fontWeight={600}>
                Contáctenos Llamanos o escríbenos para despejar tus dudas.
              </Typography>

              <Grid display="flex" alignItems="center" gap={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={64}
                  height={48}
                  borderRadius="50%"
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <AvoviteIcon sx={(t) => ({ width: "60%", height: "60%" })} />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography fontWeight={800}>Locación</Typography>
                  <Typography>
                    Montebello, Antioquia Colombia Finca Las Cascadas
                  </Typography>
                </Box>
              </Grid>
              <Grid display="flex" alignItems="center" gap={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={48}
                  height={48}
                  borderRadius="50%"
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <MessageChat />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography fontWeight={800}>Contactos</Typography>
                  <Typography>
                    <span style={{ textDecoration: "underline" }}>
                      +57(314)8855345 <br />
                      info@gmail.com
                    </span>
                  </Typography>
                </Box>
              </Grid>
              <Grid display="flex" alignItems="center" gap={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={88}
                  height={48}
                  borderRadius="50%"
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <ClockIcon />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography fontWeight={800}>Horas</Typography>
                  <Typography>
                    Lunes A Sabado: 9:00AM to 5:00PM Domingos/Festivos: 8:00AM
                    to 12:00PM
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
}

export default Contact;
