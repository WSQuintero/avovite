import React from "react";
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
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";

function Welcome() {
  const theme = useTheme();
  const route = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Grid
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      gap={5}
      sx={(theme) => ({
        flexDirection: "row",
        [theme.breakpoints.down("md")]: {
          flexDirection: "column",
          position: "relative",
        },
      })}
    >
      <Grid sx={{ marginLeft: 15 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={(theme) => ({
            height: "730px",
            width: "630px",
            borderRadius: "35px",
            background: "#D9D9D9",
            position: "relative", 

            [theme.breakpoints.down("md")]: {
              width:'100%',
              
              position: "absolute",
            },
          })}
          gap={7}
        >
          <Grid>
            <img src={logo} alt="log" />
          </Grid>

          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography sx={{ color: "#67AA36", fontSize: "25px" }}>
              Las ganancias del aguacate
            </Typography>
            <Typography sx={{ color: "#67AA36", fontSize: "25px" }}>
              HASS Colombiano son para
            </Typography>
            <Typography sx={{ color: "#67AA36", fontSize: "25px" }}>
              todos
            </Typography>
          </Grid>

          <Grid display="flex" flexDirection="column" alignItems="center">
            <Button
              color="secondary"
              variant="text"
              sx={{
                width: "472.01px",
                height: "57.63px",
                backgroundImage: "linear-gradient(to top, #60A033, #7DCF43)", // Combina los colores de abajo hacia arriba
                fontSize: "25px",
                "&:hover": {
                  backgroundImage: "linear-gradient(to top, #60A033, #7DCF43)", // Mantiene la combinación de colores al pasar el mouse
                },
                textTransform: "none",
              }}
              fullWidth
              onClick={() => route("/signin")}
            >
              Iniciar sesión
            </Button>

            <Button
              type="submit"
              color="primary"
              size="large"
              sx={{
                mt: 2,
                width: "472.01px",
                height: "57.63px",
                border: 2,
                borderColor: "white",
                fontSize: "25px",
                fontWeight: 540,
                fontColor: theme.palette.text.secondary,
                textTransform: "none",
              }}
              fullWidth
              onClick={() => route("/signup")}
            >
              Inscribirse
            </Button>
          </Grid>
        </Box>
      </Grid>
      <Grid>
      </Grid>
      <img
      src={BackgroundPhoto}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: 0.9,
      }}
      alt="photo"
    />
    </Grid>
  );
}

export default Welcome;
