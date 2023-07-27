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
import photoDefault from "../assets/img/photoDefault.svg";

function EditProfile() {
  const theme = useTheme();
  const route = useNavigate()

  return (
    <Grid display="flex" flexDirection="column"
    sx={(t)=>({
      [t.breakpoints.up('lg')]:{
        marginTop:20,
      }
    })}
    >
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
        sx={(t)=>({
          flexDirection:'column',
         [t.breakpoints.up('lg')]:{
           display:'none',
         
         }
        })}
      >
        <Header />

        <Box width="100%" height={40} bgcolor="#67AA36">
          <Button
              onClick={()=>route('/menu')}

            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
           Editar Perfil 
          </Button>
        </Box>
        </Box>
        {/* the filter of image */}

        <Typography fontWeight={700} color='primary.main'>Editar Perfil</Typography>
        <Typography fontWeight={700} color='primary.main' textAlign='center'>Editar Perfil</Typography>
        <Grid
          paddingX={2}
          paddingY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={(t)=>({
           
            [t.breakpoints.up('lg')]:{
             flexDirection:'row',
            marginTop:5,
            }
           })}
        >
           <Box  
          sx={(t)=>({
           
           [t.breakpoints.up('lg')]:{
            
           display:'flex',
           flexDirection:'column',
           justifyContent:'center',
           alignItems:'center',
          marginBottom:30,
           }
          })}>

          <img src={photoDefault} width="50%" height="50%" alt="photo" />

          <Typography bottom={10} color="primary.main">
            Nombre
          </Typography>
          </Box>

          <Grid
            display="flex"
            paddingY={2}
            flexDirection="column"
            
            gap={2}
          >
            
            <TextField
              name="email,"
              placeholder="Cambiar Correo electronico,"
              required
              fullWidth
              InputProps={{
                
                style: {
                  color: "black",
                  height: "40px",
                  fontSize: "20px",
                  fontWeight: 500,
                  backgroundColor: "rgba(192,192,192,0.4 )",
                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
            <TextField
              name="Contraseña"
              placeholder="Cambiar Contraseña"
              required
              fullWidth
              InputProps={{
       
                style: {
                  color: "black",
                  height: "40px",
                  fontSize: "20px",
                  backgroundColor: "rgba(192,192,192,0.4 )",
                  fontWeight: 500,
                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
            <TextField
              name="Nombre"
              type="text"
              placeholder="Cambiar Nombre  de usuario"
              required
              fullWidth
              InputProps={{
              
                style: {
                  color: "black",
                  height: "40px",
                  fontSize: "20px",
                  fontWeight: 500,
                  backgroundColor: "rgba(192,192,192,0.4 )",
                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
            <TextField
              name="telefono"
              type="text"
              placeholder="Cambiar Numero de telefono"
              required
              fullWidth
              InputProps={{
             
                style: {
                  color: "black",
                  height: "40px",
                  fontSize: "20px",
                  fontWeight: 500,
                  backgroundColor: "rgba(192,192,192,0.4 )",

                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
            <TextField
              name="Pais"
              type="text"
              placeholder="Pais"
              required
              fullWidth
              InputProps={{
                style: {
                  color: "black",
                  height: "40px",
                  fontSize: "20px",
                  fontWeight: 500,
                  backgroundColor: "rgba(192,192,192,0.4 )",

                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
            <TextField
              name="Ciudad"
              type="text"
              placeholder="Ciudad"
              required
              fullWidth
              InputProps={{
                readOnly: true,
                style: {
                  color: "black",
                  height: "40px",
                  backgroundColor: "rgba(192,192,192,0.4 )",

                  fontSize: "20px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
           
            <Button variant="contained" fullWidth sx={{color:'secondary.body', textTransform:'none', fontSize:'24px'}}>Actualizar</Button>
          </Grid>
        </Grid>
     
    </Grid>
  );
}

export default EditProfile;
