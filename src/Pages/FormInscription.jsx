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
} from "@mui/material";
import {
  Https as HttpsIcon,
  LockOutlined as LockOutlinedIcon,
  MailOutline as MailOutlineIcon,
  Person,
  KeyboardBackspace as KeyboardBackspaceIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import BackgroundPhoto from "../assets/img/backgroundphoto.svg";
import logo from "../assets/img/logo.svg";



import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
function FormInscription() {
  const theme = useTheme();
  const {
    modalCheck,
    setModalCheck
  } = useFinalContext();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
  };

  const handleModalCheck=()=>{
    setModalCheck(true);
  }

  return (
    <Grid display="flex" flexDirection="column">
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
      >
        <Header />

        <Box width="100%" height={40} bgcolor="#67AA36">
          <Button
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Datos de inscripcion
          </Button>
        </Box>

        {/* the filter of image */}

        <Grid  display="flex" flexDirection="column">
        <Grid
          flexGrow={1}
          paddingX={4}
          paddingY={4}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          

          <TextField
            name="nombreyapellido"
            placeholder="Nombre Y Apellido"
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
              }
            }}
          />
          <TextField
            name="Cedula"
            placeholder="Cedula"
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
              }
            }}
          />
          <TextField
            name="compañia"
            type="text"
            placeholder="Nombre de la compaña (opcional)"
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
            }}
          />
          <TextField
            name="pais"
            type="Pais"
            placeholder="Pais"
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
              }
            }}
          />
          <TextField
            name="ciudad"
            type="text"
            placeholder="ciudad"
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
              
            }}
          />
          <TextField
            name="codePostal"
            type="text"
            placeholder="Codigo postal"
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
              
            }}
          />
          <TextField
            name="direccion"
            type="text"
            placeholder="Dirección"
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
              }
            }}
          />
          <TextField
            name="Telefono"
            type="number"
            placeholder="Telefono"
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
             
            }}
          />
          <TextField
            name="cuentaBancaria"
            type="number"
            placeholder="Cuenta bancaria"
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
              
            }}
          />
         
          
        </Grid>

          <Grid paddingX={4} display="flex" gap={2}>
            <Button variant="contained" onClick={handleModalCheck} fullWidth sx={{ color: "white" }}>
              Inscripción
            </Button>
            
          </Grid>
        </Grid>
      </Box>
      {
        modalCheck && (
          <Grid>
            <ModalCheckout onCloseModal={()=>setModalCheck(false)}/>
          </Grid>
        )
      }
    </Grid>
  );
}

export default FormInscription;
