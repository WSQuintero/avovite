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
       
        display="flex"
        flexDirection="column"
        sx={(theme)=>({
            backgroundColor:'white',
            height:"100%",
            width:360,
            [theme.breakpoints.up('lg')]:{
              backgroundColor:'#FFFFFF',
              
              height:'2000vh',
              width:'200vh',
             marginLeft:-20,
              marginTop:10,
            }
        })}
      >
        <Header />

        <Box   bgcolor="#67AA36" sx={(theme)=>({
              display:'flex',
              width:'100%',
              height:40,
              marginTop:7,
              [theme.breakpoints.up('lg')]:{
                display:'none'

              }
          
        })}>
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
            <Typography variant='h3' sx={(theme)=>({
              display:'none',
              [theme.breakpoints.up('lg')]:{
                display:'flex',
                marginLeft:15,
                marginTop:10,
                
              }
          
        })}>{filterBanck.banco}</Typography>
        <Grid  display="flex" flexDirection="column" sx={(theme)=>({
          justifyContent:'center',
          alignItems:'center',
          
        })}>
        <Grid
          flexGrow={1}
          paddingX={0}
          paddingY={4}
          display="flex"
          flexDirection="column"
          gap={2}
          sx={(theme)=>({
            alignItems:'center',
            justifyContent:'center',
            [theme.breakpoints.up('lg')]:{
              marginTop:10,
            }
          })}
        >
            <Typography variant="h2" color='primary.main' fontWeight={549}>Datos de trasferencia </Typography>
          

          <TextField
            name="nombreyapellido"
            placeholder="Nombre Completo"
            required
            sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
          <TextField
            name="Compañia"
            placeholder="Nombre de Compañia (opcional)"
            required
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
         
          <TextField
            name="pais"
            type="Pais"
            placeholder="Pais"
            required
           
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
          <TextField
            name="valorTransferencia"
            type="text"
            placeholder="Valor de Transferencia"
            required
           
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
          <TextField
            name="CuentaBancaria"
            type="text"
            placeholder="Cuenta Bancaria"
            required
           
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
          <TextField
            name="Detalles"
            type="text"
            placeholder="Detalles"
            required
            fullWidth
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
          <TextField
            name="Telefono"
            type="number"
            placeholder="Telefono"
            required
            fullWidth
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
          <TextField
            name="cuentaBancaria"
            type="number"
            placeholder="Cuenta bancaria"
            required
            fullWidth
             sx={(theme)=>({
              width:'90vw',
              [theme.breakpoints.up('lg')]:{
                width:'35vw'
              }
            })}
           
          />
         
          
        </Grid>

          <Grid paddingX={4} display="flex" gap={2}>
            <Button variant="contained" sx={(theme)=>({
              color:'white',
              [theme.breakpoints.up('lg')]:{
                color:'white',
                width:'45vw',
                height:50,
              }
            })} onClick={handleModalCheck} fullWidth >
              Aceptar
            </Button>
            
          </Grid>
        </Grid>
      </Box>
      

  );
}

export default FormCountBank;
