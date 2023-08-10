import { Box, Grid, Typography, Container } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PageWrapper from "../Components/PageWrapper";
import map from "../assets/img/contact/Bitmap.png";
import avovite from "../assets/img/contact/avovite.png";
import message from "../assets/img/contact/message.png";
import clock from "../assets/img/contact/clock.png";
function Contact() {
  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        <Grid display="flex" flexDirection="column"   gap={5}>
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
              width='100%'
            >
              <Box position="absolute" width={70} height={70}>
                <PlaceIcon
                  color="primary"
                  sx={{ width: "100%", height: "100%" }}
                />
              </Box>

              <img src={map} alt="photo" />
            </Box>
            <Box display="flex"  height="100%" flexDirection="column" gap={2}>
              <Typography variant="h3"  fontWeight={600}>
                Contáctenos Llamanos o escríbenos para despejar tus dudas.
              </Typography>

              <Grid display="flex" alignItems="center" gap={1}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width={60}
                  height={48}
                  borderRadius="50%"
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <img src={avovite} alt="avovite" />
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
                  width={60}
                  height={48}
                  borderRadius="50%"
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <img src={message} alt="avovite" />
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
                  width={60}
                  height={48}
                  borderRadius="50%"
                  sx={{ backgroundColor: "primary.main" }}
                >
                  <img src={clock} alt="avovite" />
                </Box>
                <Box display="flex" flexDirection="column">
                  <Typography fontWeight={800}>Horas</Typography>
                  <Typography>
                    Montebello, Antioquia Colombia Finca Las Cascadas
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
