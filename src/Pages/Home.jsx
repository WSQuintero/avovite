import { useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography, Container } from "@mui/material";

import BackgroundPhoto from "../assets/img/backgroundphotoImg.png";
import logo from "../assets/img/logo.svg";

function Home() {
  const route = useNavigate();

  return (
    <Grid
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
        },
      })}
    >
      <Box
        borderRadius={4}
        display="flex"
        height="100vh"
        width="50vw"
        order={1}
        sx={(theme) => ({
          overflow: "hidden",
          backgroundImage: `url(${BackgroundPhoto})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "-5px",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          [theme.breakpoints.down("md")]: {
            borderRadius: 0,
            order: 0,
            width: "100vw",
            height: "50vh",
          },
        })}
      ></Box>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        padding={4}
        height="100vh"
        width="50vw"
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            width: "100vw",
            height: "50vh",
          },
        })}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius="50%"
          backgroundColor="white"
          overflow="hidden"
          width={160}
          height={160}
          padding={2}
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translate(-50%,-50%)",
            },
          })}
        >
          <img src={logo} alt="logos" style={{ width: "100%", height: "100%" }} />
        </Box>
        <Grid display='flex' flexDirection='column' gap={2} maxWidth={550}>
          <Typography color="primary" textAlign="center">
            Las ganancias del aguacate HASS Colombiano son para todos
          </Typography>
          <Grid display="flex" flexDirection="column" gap={2} width="100%">
            <Button onClick={() => route("/signin")} variant="contained" fullWidth>
              Iniciar sesión
            </Button>
            <Button onClick={() => route("/signup")} variant="outlined" fullWidth>
              Inscribirse
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Home;
