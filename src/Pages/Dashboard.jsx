import React from "react";
import PageWrapper from "../Components/PageWrapper";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { AndroidOutlined as SampleIcon } from "@mui/icons-material";
import useConfig from "../Hooks/useConfig";
import CardMenu from "../Components/CardMenu";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [config, { setOnboarding }] = useConfig();

  return (
    <PageWrapper>
      <Container maxWidth="xxl">
        {!config.onboarding ? (
          <Grid display="flex" flexDirection="column" gap={2} width="100%">
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("lg")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Grid
                display="flex"
                flexDirection="column"
                gap={2}
                width="50%"
                sx={(t) => ({
                  [t.breakpoints.down("lg")]: {
                    width: "100%",
                  },
                })}
              >
                <Grid
                  display="flex"
                  gap={2}
                  sx={(t) => ({
                    [t.breakpoints.down("lg")]: {
                      flexDirection: "column",
                    },
                  })}
                >
                  <CardMenu
                    title="Información"
                    sx={{ width: "50%" }}
                    icon={<SampleIcon sx={{ color: "primary.main" }} />}
                  />
                  <CardMenu
                    title="Cosechas"
                    sx={{ width: "50%" }}
                    icon={<SampleIcon sx={{ color: "primary.main" }} />}
                  />
                </Grid>
                <Grid
                  display="flex"
                  gap={2}
                  sx={(t) => ({
                    [t.breakpoints.down("lg")]: {
                      flexDirection: "column",
                    },
                  })}
                >
                  <CardMenu
                    title="Otros Datos"
                    sx={{ width: "50%" }}
                    icon={<SampleIcon sx={{ color: "primary.main" }} />}
                    onClick={() => navigate("info")}
                  />
                  <CardMenu
                    title="Certificados"
                    sx={{ width: "50%" }}
                    icon={<SampleIcon sx={{ color: "primary.main" }} />}
                  />
                </Grid>
              </Grid>
              <Box
                width="50%"
                padding={2}
                borderRadius={2}
                sx={(t) => ({
                  backgroundColor: "secondary.main",
                  [t.breakpoints.down("lg")]: {
                    width: "100%",
                  },
                })}
              ></Box>
            </Grid>
            <Grid
              display="flex"
              gap={2}
              sx={(t) => ({
                [t.breakpoints.down("lg")]: {
                  flexDirection: "column",
                },
              })}
            >
              <Box
                width="50%"
                padding={2}
                borderRadius={2}
                sx={(t) => ({
                  backgroundColor: "secondary.main",
                  [t.breakpoints.down("lg")]: {
                    width: "100%",
                  },
                })}
              ></Box>
              <Grid
                display="flex"
                gap={2}
                width="50%"
                sx={(t) => ({
                  [t.breakpoints.down("lg")]: {
                    flexDirection: "column",
                    width: "100%",
                  },
                })}
              >
                <Box
                  width="50%"
                  padding={2}
                  borderRadius={2}
                  sx={(t) => ({
                    backgroundColor: "secondary.main",
                    [t.breakpoints.down("lg")]: {
                      width: "100%",
                    },
                  })}
                ></Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={2}
                  width="50%"
                  padding={2}
                  borderRadius={2}
                  sx={(t) => ({
                    backgroundColor: "primary.main",
                    [t.breakpoints.down("lg")]: {
                      width: "100%",
                    },
                  })}
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
        ) : (
          <Grid display="flex" flexDirection="column" gap={2} width="100%">
            <Typography variant="h2" textAlign="center">
              Términos y Condiciones
            </Typography>
            <Typography textAlign="justify">
              Términos y Condiciones de Uso de la Aplicación Avovite app Por favor, lea detenidamente los siguientes
              términos y condiciones antes de utilizar la aplicación (&quot; Avovite app&quot;). Estos Términos
              constituyen un acuerdo legalmente vinculante entre usted (&quot;el Usuario&quot;) y [Avovite S.A.S] Al
              utilizar la Aplicación, usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con
              alguno de los términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación.
              Aplicación, usted acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de
              los términos o condiciones aquí establecidos, le pedimos que no utilice la Aplicación. Aplicación, usted
              acepta cumplir con estos Términos en su totalidad. Si no está de acuerdo con alguno de los términos o
              condiciones aquí establecidos, le pedimos que no utilice la Aplicación.
            </Typography>
            <Grid display="flex" gap={2}>
              <Button variant="contained" size="large" fullWidth onClick={() => setOnboarding(false)}>
                Aceptar
              </Button>
              <Button variant="outlined" size="large" fullWidth>
                Cancelar
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
}

export default Dashboard;
