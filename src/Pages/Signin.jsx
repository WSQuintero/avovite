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
  KeyboardBackspace as KeyboardBackspaceIcon,
} from "@mui/icons-material";

import siginphoto from "../assets/img/backgroundOfLogin/signinImg.png";
import logo from "../assets/img/logo.svg";
import { useTheme } from "@emotion/react";

function Signin() {
  const theme = useTheme();
  const route = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  return (
    <Grid
      display="flex"
      flexDirection="column"
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
            src={siginphoto}
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
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Ingreso
          </Button>
        </Box>

        {/* the filter of imge */}

        {/* <Box
            position="absolute"
            left={0}
            top={40}
            width="100%"
            height="calc(100%-40px)"
            bgcolor="filter.main"
            sx={(theme)=>({
              opacity: 0.25,
              [theme.breakpoints.up('lg')]:{
               height:'100%',
                top:0,
                borderRadius:4,
              }
            })}
          ></Box> */}
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
        paddingY={1}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={(theme) => ({
          [theme.breakpoints.up("lg")]: {
            order: 0,
            paddingX: 8,
            marginTop:-20
          },
        })}
      >
        <Box  
        sx={(theme) => ({
          height:40,
          [theme.breakpoints.up("lg")]: {
            height:0
          },
        })}
        
        ></Box>

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
          Ingresar
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

              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineIcon />
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
              // fontSize: 12,
              // fontWeight: 650,
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

              borderRadius: "10px",
            },
            startAdornment: (
              <InputAdornment position="start">
                <LockOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />

        <Grid display="flex" flexDirection="column" alignItems="center" gap={2}>
          <Link
            component={RouterLink}
            to="/signup"
            onClick={() => setIsClicked(true)}
            sx={(theme) => ({
              display: "none",

              [theme.breakpoints.up("lg")]: {
                display: "flex",
                cursor: "pointer",
                color: isClicked ? "#67AA36" : "#7DCF43",

                transition: "color 0.2s ease-in-out",
                textDecoration: "none",
                "&:hover": {
                  color: "#67AA36",
                },
              },
            })}
          >
            ¿Has olvidado tu contraseña?
          </Link>
          <Button
            fullWidth
            sx={{
              color: "secondary.body",
              backgroundImage: "linear-gradient(to top, #7DCF43, #60A033)",

              textTransform: "none",
              "&:hover": {
                backgroundImage: "linear-gradient(to top, #60A033, #7DCF43)",
              },
            }}
            onClick={() => route("/dashTable")}
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
              color: isClicked ? "#67AA36" : "#7DCF43",

              transition: "color 0.2s ease-in-out",
              textDecoration: "none",
              "&:hover": {
                color: "#67AA36",
              },
            }}
          >
            Inscribite en Avovite
          </Link>
          <Link
            component={RouterLink}
            to="/signup"
            onClick={() => setIsClicked(true)}
            sx={(theme) => ({
              display: "flex",
              cursor: "pointer",
              color: isClicked ? "#FFFF" : "#67AA36",
              fontSize: "23px",
              transition: "color 0.2s ease-in-out",
              textDecoration: "none",
              "&:hover": {
                color: "#FFFF",
              },
              [theme.breakpoints.up("lg")]: {
                display: "none",
                color: "text.disabled",
                fontSize: 12,
                fontWeight: 650,
              },
            })}
          >
            ¿Has olvidado tu contraseña?
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Signin;
