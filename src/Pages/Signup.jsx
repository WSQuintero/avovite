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
  Person,
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import siginup from "../assets/img/backgroundOfLogin/signupImg.png";

import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";

function Signup() {
  const theme = useTheme();
  const route = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [PasswordClic, setPasswordClic] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Grid display="flex" flexDirection="column"
    sx={(theme) => ({
      [theme.breakpoints.up("lg")]: {
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
    })}

    >
      <Box
        display="flex"
        flexDirection="column"
        position="relative"
        height="50vh"
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            order: 1,

            height: "50%",
            width: "50%",
            borderRadius:'50%'

          },
        })}
      >
        <Box
          sx={(theme) => ({
            height: "55vh",
            [theme.breakpoints.up("lg")]: {
              height:"100%",

              borderRadius:'50%'
            },
          })}
        >
          <img
            src={siginup}
            alt="photo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </Box>
        <Box
          position="absolute"
          left={0}
          top={0}
          width="100%"
          height={40}
          bgcolor="#214820"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              height: 0,
              display: "none",
            },
          })}
        >
          <Button
            onClick={() => route("/")}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
              cursor: "poinet",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Registro
          </Button>
        </Box>

        {/* the filter of image */}
       
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="absolute"
          borderRadius="50%"
          backgroundColor="white"
          overflow="hidden"
          bottom={0}
          left="50%"
          width={160}
          height={160}
          padding={2}
          sx={(theme) => ({
            transform: "translate(-50%,50%)",
            [theme.breakpoints.up("lg")]: {
              width: "20vh",
              height: "20vh",
              left: "-50%",
              top:-20,
            },
          })}
        >
          <img
            src={logo}
            alt="logos"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </Box>
      <Grid
        flexGrow={1}
        paddingX={4}
        paddingY={2}
        display="flex"
        flexDirection="column"
        gap={1}
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            order: 0,
            paddingX: 8,
            marginTop:-20
          },
        })}
      >
        <Box  sx={(theme) => ({
          height:80,
          [theme.breakpoints.up("lg")]: {
            height:80
          },
        })}></Box>
        <Typography
          display="none"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              color: "primary.main",
              fontSize: 24,
              fontWeight: 650,
            },
          })}
        >
          Crear Cuenta
        </Typography>
        <Box height={20}></Box>
        <Typography
          display="none"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              color: "text.disabled",
            },
          })}
        >
          Nombre de Usuario
        </Typography>

        <TextField
          name="email"
          placeholder="Nombre de usuario"
          required
          style={{
            borderRadius: "10px",
            backgroundColor: "rgba(192,192,192,0.4 )",
            border: "none",
          }}
          InputProps={{
            style: {
              color: "black",
              height: "40px",
              fontSize: "20px",
              fontWeight: 500,
              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <Person sx={{ color: theme.palette.primary.main }} />
              </InputAdornment>
            ),
          }}
        />
<Typography
          display="none"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              color: "text.disabled",
            },
          })}
        >
          Correo Electrónico
        </Typography>


        <TextField
          name="email"
          placeholder="Correo electronico"
          required
          fullWidth
          style={{
            borderRadius: "10px",
            backgroundColor: "rgba(192,192,192,0.4 )",
            border: "none",
          }}
          InputProps={{
            style: {
              color: "black",
              height: "40px",
              fontSize: "20px",
              fontWeight: 500,
              borderRadius: "10px",
              border: "none",
            },
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />
<Typography
          display="none"
          sx={(theme) => ({
            [theme.breakpoints.up("lg")]: {
              display: "flex",
              color: "text.disabled",
            },
          })}
        >
          Contraseña
        </Typography>

        <TextField
          name="password"
          type="password"
          placeholder="Contraseña"
          required
          fullWidth
          style={{
            borderRadius: "10px",
            backgroundColor: "rgba(192,192,192,0.4 )",
            border: "none",
          }}
          InputProps={{
            style: {
              color: "black",
              height: "40px",
              fontSize: "20px",
              fontWeight: 500,
              borderRadius: "10px",
              border: "none",
            },
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon sx={{ color: "primary.main" }} />
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              value="allowExtraEmails"
              color="primary"
              sx={{
                "& .MuiSvgIcon-root": {
                  borderRadius: 20,
                },
              }}
            />
          }
          label={
            <>
              <Link
                component={RouterLink}
                to="/termsandConditions"
                onClick={() => setPasswordClic(!PasswordClic)}
                sx={{
                  cursor: "pointer",
                  color: PasswordClic ? "secondary.main" : "#67AA36",
                  fontSize: "18px",
                  transition: "color 0.2s ease-in-out",
                  textDecoration: "none",
                  "&:hover": {
                    color: "secondary.main", // Cambia el color al puntero estar encima del enlace
                  },
                }}
              >
                Acepto los términos y condiciones
              </Link>
            </>
          }
        />

        <Button
          color="secondary"
          fullWidth
          sx={{
            backgroundImage: "linear-gradient(to top, #7DCF43, #60A033)",
            fontSize: "25px",
            textTransform: "none",
            "&:hover": {
              backgroundImage: "linear-gradient(to top, #60A033, #7DCF43)",
            },
          }}
          onClick={() => route("/termsandConditions")}
        >
          Iniciar sesión
        </Button>
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
              fontSize: "17px",
              transition: "color 0.2s ease-in-out",
              textDecoration: "none",
              "&:hover": {
                color: "#FFFF",
              },
            }}
          >
           ¿Ya tienes cuenta?
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Signup;
