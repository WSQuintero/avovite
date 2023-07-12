import React, { useState } from "react";
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

function Signin() {
  const theme = useTheme();

  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Grid
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={5}
    >
      <Grid sx={{ marginLeft: 15 }}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "730px",
            width: "630px",
            borderRadius: "35px",
            background: "#D9D9D9",
          }}
          gap={7}
        >
          <Grid>
            <img className="logo" src={logo} alt="log" />
          </Grid>

          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            borderRadius="28px"
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              borderRadius="28px"
            >
              <Grid display="flex" flexDirection="column" gap={2}>
                <TextField
                  name="email"
                  placeholder="Correo electronico"
                  required
                  style={{
                    width: "500px",
                    borderColor: "white",
                    borderRadius: "10px",
                  }}
                  InputProps={{
                    style: {
                      color: "#FFFF",
                      height: "88px",
                      fontSize: "25px",
                      fontWeight: 500,
                      borderRadius: "15px",
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutlineIcon
                          style={{ color: "rgba(255, 255, 255, 0.9)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  required
                  fullWidth
                  style={{
                    width: "500px",
                    color: "#FFFF",
                    borderColor: "white",
                    borderRadius: "10px",
                  }}
                  InputProps={{
                    style: {
                      color: "#FFFF",

                      fontWeight: 500,
                      fontSize: "25px",

                      height: "88px",
                      borderRadius: "15px",
                      borderColor: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon
                          style={{ color: "rgba(255, 255, 255, 0.9)" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Box>
          </Grid>
          <Grid display="flex" flexDirection="column" alignItems="center">
            <Button
              color="secondary"
              sx={{
                width: "472.01px",
                height: "57.63px",
                backgroundImage: "linear-gradient(to top, #60A033, #7DCF43)",
                fontSize: "25px",
                textTransform: "none", // Convierte el texto en minúsculas
                "&:hover": {
                  backgroundImage: "linear-gradient(to top, #60A033, #7DCF43)",
                },
              }}
              fullWidth
              onClick={() => route("/home")}
            >
              Iniciar sesión
            </Button>
          </Grid>
          <Grid
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={1}
          >
            <Link
              component={RouterLink}
              to="/signup"
              onClick={() => setIsClicked(true)}
              sx={{
                cursor: "pointer",
                color: isClicked ? "#FFFF" : "#67AA36",
                fontSize: "25px",
                transition: "color 0.2s ease-in-out",
                textDecoration: "none",
                "&:hover": {
                  color: "#FFFF", // Cambia el color al puntero estar encima del enlace
                },
              }}
            >
              Inscribite en Avovite
            </Link>
            <Link
              component={RouterLink}
              to="/signup"
              onClick={() => setIsClicked(true)}
              sx={{
                cursor: "pointer",
                color: isClicked ? "#FFFF" : "#67AA36",
                fontSize: "25px",
                transition: "color 0.2s ease-in-out",
                textDecoration: "none",
                "&:hover": {
                  color: "#FFFF", // Cambia el color al puntero estar encima del enlace
                },
              }}
            >
              ¿Has olvidado tu contraseña?
            </Link>
           
          </Grid>
        </Box>
      </Grid>
      <Grid>
        <img
          src={BackgroundPhoto}
          style={{
            position: "relative",
            backgroundColor: "rgba(96, 160, 51, 0.9)", // Utiliza un color verde con opacidad
          }}
          alt="photo"
        />
      </Grid>
    </Grid>
  );
}

export default Signin;
