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
import { useTheme } from "@emotion/react";
import Header from "../Components/Header/Header";
import { useFinalContext } from "../Context/FinalContext";
import ModalCheckout from "../Components/Modals/ModalCheckout";
function FormInscription() {
  const theme = useTheme();
  const route = useNavigate()

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
    <Grid display="flex" flexDirection="column" sx={(theme)=>({
      [theme.breakpoints.up('lg')]:{
        alignItems:'center',
        justifyContent:'center'
      }
    })}>
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
        sx={(theme)=>({
          [theme.breakpoints.up('lg')]:{
            marginTop:50,
            alignItems:'center',
            justifyContent:'center'
          }
        })}
      >
        <Header />

        <Box width="100%" height={40} bgcolor="#67AA36">
          <Button
            sx={(theme) => ({
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
              [theme.breakpoints.up("lg")]: {
                display: "none",
              },
            })}
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
          
          display="flex"
          flexDirection="column"
          gap={2}
          sx={(theme) => ({
            alignItems:'center',
            paddingX:4,
            paddingY:3,
            [theme.breakpoints.up("lg")]: {
              width:'50vw'
            },
          })}
        >
        <Typography variant="h2">INSCRIPCIÓN</Typography>
          

          <TextField
            name="nombreyapellido"
            placeholder="Nombre Y Apellido"
            
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
            
          />
          <TextField
            name="Cedula"
            placeholder="Cedula"
            required
            fullWidth
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="compañia"
            type="text"
            placeholder="Nombre de la compaña (opcional)"
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="pais"
            type="Pais"
            placeholder="Pais"
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="ciudad"
            type="text"
            placeholder="ciudad"
            required
            
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="codePostal"
            type="text"
            placeholder="Codigo postal"
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="direccion"
            type="text"
            placeholder="Dirección"
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="Telefono"
            type="number"
            placeholder="Telefono"
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
          <TextField
            name="cuentaBancaria"
            type="number"
            placeholder="Cuenta bancaria"
            required
            sx={(theme)=>({
              width:'100%',
              [theme.breakpoints.up('lg')]:{

                width:'100%'
              }
            })}
          />
         
          
        </Grid>

          <Grid paddingX={4} display="flex" gap={2}>
            <Button 
            
            variant="contained" onClick={handleModalCheck} fullWidth sx={{ color: "white" }}>
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
