import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink, Route } from "react-router-dom";
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
import { bancos } from "../utilities/myCards";
function FormCountBank() {

  const theme = useTheme();
  const {
    formBanck, 
    setDetailTransaction,
    setformBanck
   
  } = useFinalContext();
  const route = useNavigate()
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log(data);
//   };
// console.log(formBanck)
  const handleModalCheck=()=>{
    setDetailTransaction(true)
  }
  const handleCloseForm=()=>{
    setformBanck(null)
}
  const filterBanck = bancos.find(e=>e.id==formBanck)

  return (
   
      <Box
        position="absolute"
        height="100%"
        width='100%'
        display="flex"
        flexDirection="column"
        sx={{
            backgroundColor:'white'
        }}
      >
        <Header />

        <Box width="100%" height={40} bgcolor="#67AA36">
          <Button
          onClick={()=>setformBanck(null)}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            {filterBanck.banco}
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
            <Typography variant="h2" color='primary.main' fontWeight={549}>Datos de trasferencia </Typography>
          

          <TextField
            name="nombreyapellido"
            placeholder="Nombre Completo"
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
            name="Compañia"
            placeholder="Nombre de Compañia (opcional)"
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
            name="valorTransferencia"
            type="text"
            placeholder="Valor de Transferencia"
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
            name="CuentaBancaria"
            type="text"
            placeholder="Cuenta Bancaria"
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
            name="Detalles"
            type="text"
            placeholder="Detalles"
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
              Aceptar
            </Button>
            
          </Grid>
        </Grid>
      </Box>
      

  );
}

export default FormCountBank;
