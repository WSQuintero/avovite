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

function TermsConditions() {
  const theme = useTheme();
  const route = useNavigate()


  return (
    <Grid display="flex"  
    flexDirection='column'
     sx={(t)=>({
      [t.breakpoints.up('lg')]:{
        marginTop:10,
      }
    })}>
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

        <Box width="100%" height={40} bgcolor="#67AA36" 
       
        >
          <Button
              onClick={()=>route('/menu')}
           
            sx={(t)=>({
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
              [t.breakpoints.up('lg')]:{
               
              }
             })}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
           Tu perfil
          </Button>
        </Box>
        </Box>
        {/* the filter of image */}

        <Grid
          paddingX={5}
          paddingY={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={(t)=>({
           
           [t.breakpoints.up('lg')]:{
            flexDirection:'row',
           
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
          
           }
          })}>

          <img src={photoDefault} width="50%" height="50%" alt="photo" />

          <Typography bottom={10} color="primary.main"
          
          sx={(t)=>({
           
           [t.breakpoints.up('lg')]:{
            display:'none',
           
           }
          })} >
            Nombre
          </Typography>
          <Button onClick={()=>route('/editPerfil')}
          
          >Editar Perfil</Button>
          </Box>
          <Grid
            display="flex"
            paddingY={2}
            flexDirection="column"
            width="95%"
            gap={2}
            
          >
            <Typography variant="h2" color='primary.main' sx={(t)=>({
           
           [t.breakpoints.up('lg')]:{
             marginBottom:10,
             marginLeft:-35
           }
          })}
         >Tu perfil</Typography>
            <TextField
              name="Nombre completo,"
              placeholder="Nombre completo,"
              required
              fullWidth
              InputProps={{
                readOnly: true,
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
              name="Correo electronico"
              placeholder="Correo electronico"
              required
              fullWidth
              InputProps={{
                readOnly: true,
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
              name="Telefono"
              type="text"
              placeholder="Telefono"
              required
              fullWidth
              InputProps={{
                readOnly: true,
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
              name="Numero de cuenta bancaria"
              type="Pais"
              placeholder="Numero de cuenta bancaria"
              required
              fullWidth
              InputProps={{
                readOnly: true,
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
              name="Pais"
              type="text"
              placeholder="Pais"
              required
              fullWidth
              InputProps={{
                readOnly: true,
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
                  fontSize: "20px",
                  fontWeight: 500,
                  borderRadius: "10px",
                  border: "none",
                },
              }}
            />
           
            
          </Grid>
        </Grid>
      
    </Grid>
  );
}

export default TermsConditions;
