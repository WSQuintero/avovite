import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  InputAdornment,
  Link,
  Paper,
  Card,
  CardActionArea,
  Divider,
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
  Person,
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import logoInformacion from "../assets/img/informacion/logoInformacion.svg";
import { useFinalContext } from "../Context/FinalContext";
import { transacciones } from "../utilities/myCards";
import map from "../assets/img/asesor/Map.svg";
import pin from "../assets/img/asesor/Pin.svg";
import contcat from "../assets/img/asesor/contcat.svg";
import clock from "../assets/img/asesor/clock.svg";

function Asesor() {
  const theme = useTheme();
  const { asesorComponent, setAsesorComponent } = useFinalContext();
  const route = useNavigate();

  return (
    <Box
      position="absolute"
      height="100%"
      width="100%"
      display="flex"
      bgcolor="white"
      flexDirection="column"
    >
      <Header />

      <Box
        width="100%"
        paddingX={1}
        height={40}
        bgcolor="primary.main"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={() => setAsesorComponent(false)}
          sx={{
            marginLeft: 1,
            color: "secondary.body",
            textTransform: "none",
          }}
          startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
        >
          Mis VITES
        </Button>
        <Button
          onClick={() => route("/checkout")}
          variant="contained"
          sx={{ height: "100%", bgcolor: "#498A19" }}
        >
          <ShoppingCartIcon sx={{ color: "secondary.body" }} />
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        alignItems="center"
      >
        <img src={map} width="100%" height="100%" alt="photo" />
        <img
          src={pin}
          width="50%"
          height="50%"
          alt="photo"
          style={{ position: "absolute" }}
        />
      </Box>

      {/* the filter of image */}

      <Grid
        paddingX={4}
        paddingY={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={4}
      >
        <Typography color="#214820" fontSize={25}>
          Contáctenos Llamanos o escríbenos para despejar tus dudas.
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          width="100%"
          gap={3}
        >
          <Box
            bgcolor="primary.main"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 60,
              height: 50,
            }}
          >
            <img src={logoInformacion} width="60%" height="60%" alt="logo" />
          </Box>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Grid>
              <Typography color="text.cards">locación</Typography>
            </Grid>
            <Grid>
              <Typography color="text.cards">
                Montebello, Antioquia Colombia Finca Las Cascadas{" "}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          gap={3}
        >
          <Box
            bgcolor="primary.main"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 50,
              height: 50,
            }}
          >
            <img src={contcat} width="60%" height="60%" alt="logo" />
          </Box>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Grid>
              <Typography color="text.cards">locación</Typography>
            </Grid>
            <Grid>
              <Typography color="text.cards">
                +57 (314) 885 5345 info@avovite.co
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          width="100%"
          gap={3}
        >
          <Box
            bgcolor="primary.main"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: 80,
              height: 50,
            }}
          >
            <img src={clock} width="60%" height="60%" alt="logo" />
          </Box>
          <Grid display="flex" flexDirection="column" gap={1}>
            <Grid>
              <Typography color="text.cards">Hours</Typography>
            </Grid>
            <Grid>
              <Typography color="text.cards">
                Lunes A Sabado: 9:00AM to 5:00PM Domingos/ Festivos : 8:00AM to
                12:00PM
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}

export default Asesor;
