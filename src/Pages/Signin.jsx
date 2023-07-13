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
  KeyboardBackspace as KeyboardBackspaceIcon
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
    <Grid display="flex" flexDirection="column">
      <Box position="relative" height="50vh">
        <img
          src={BackgroundPhoto}
          alt="photo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <Box
        position='absolute'
        left={0}
        top={0}
        width='100%'
       
        height={40}
        bgcolor='#214820'
      
        
        >
        <Button
        
        sx={{
          marginLeft:1,
          color:"secondary.body",
          textTransform: "none",
        }}
        
        startIcon={<KeyboardBackspaceIcon sx={{color:'secondary.body'}}/>}
        >Ingreso</Button>
        </Box>

        {/* the filter of imge */}
          
        <Box
          position="absolute"
          left={0}
          top={0}
          width="100%"
          height="100%"
          bgcolor="filter.main"
          sx={{ opacity: 0.25 }}
        ></Box>
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
          sx={{ transform: "translate(-50%,50%)" }}
        >
          <img
            src={logo}
            alt="logos"
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <Grid
          flexGrow={1}
          paddingX={4}
          paddingY={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <Box height={40}></Box>
          <TextField
            name="email"
            placeholder="Correo electronico"
            required
            fullWidth
            style={{
              borderRadius: "10px",
            }}
            InputProps={{
              style: {
                color: "black",
                fontSize: "25px",
                fontWeight: 500,
                borderRadius: "15px",
                borderColor: "primary.main",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
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
              borderRadius: "10px",
            }}
            InputProps={{
              style: {
                color: "black",
                fontSize: "25px",
                fontWeight: 500,
                borderRadius: "15px",
                borderColor: "primary.main",
              },
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <Grid display="flex" flexDirection="column" alignItems="center">
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
                fontSize: "23px",
                transition: "color 0.2s ease-in-out",
                textDecoration: "none",
                "&:hover": {
                  color: "#FFFF", 
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
                fontSize: "23px",
                transition: "color 0.2s ease-in-out",
                textDecoration: "none",
                "&:hover": {
                  color: "#FFFF", 
                },
              }}
            >
              ¿Has olvidado tu contraseña?
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default Signin;
