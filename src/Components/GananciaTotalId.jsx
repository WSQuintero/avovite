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
  ShoppingCart as ShoppingCartIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import logoCheck from "../assets/img/logoChecktou.svg";
import { useFinalContext } from "../Context/FinalContext";
import Header from "./Header/Header";
import { paquages } from "../utilities/myCards";
import vector from "../assets/img/totalGanancia/Vector.svg";

function GananciaTotalId() {
  const theme = useTheme();
  const route = useNavigate();
  const {
    setTotalGananciaId,
    totalGananciaId,
    setGananciaList,
    setComponentCargaCuenta,
  } = useFinalContext();

  const handleCoseModal = () => {
    setTotalGananciaId(null);
   
  };

  const handleCargaCuenta = () => {
    setComponentCargaCuenta(true);
    setTotalGananciaId(null);
  };

  const filtertotalid = paquages.find((e) => e.id == totalGananciaId);

  return (
    <Box
      position="absolute"
     
      display="flex"
      flexDirection="column"
      height="100%"
        width="100%"
      sx={(t)=>({
        backgroundColor: "white",
       
        [t.breakpoints.up('lg')]:{
          backgroundColor: "white",
          height:'400vh',
          marginTop:200,
          paddingTop:30,
        
        }
      })}
    >
      <Header />

      <Box
        width="100%"
        paddingX={1}
        height={40}
        bgcolor="primary.main"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        sx={(t)=>({
         
          [t.breakpoints.up('lg')]:{
            display:'none'
        
          }
        })}
      >
        <Button
          onClick={() => handleCoseModal()}
          sx={{
            marginLeft: 1,
            color: "secondary.body",
            textTransform: "none",
          }}
          startIcon={<KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />}
        >
          total ganancia
        </Button>
        <Button
          onClick={() => route("/checkout")}
          variant="contained"
          sx={{ height: "80%", bgcolor: "#498A19" }}
        >
          <ShoppingCartIcon sx={{ color: "secondary.body" }} />
        </Button>
      </Box>

      {/* the filter of image */}

    
        <Grid
         
          display="flex"
          flexDirection="column"
          justifyContent="center"
          sx={(t)=>({
            paddingY:7,

            paddingX:5,
            [t.breakpoints.up('lg')]:{
              border:1,
              borderColor:'primary.main',
              borderRadius:4,
            width:'40%',
            paddingX:0,
          justifyContent:"center",
          alignItems:'center',
            marginLeft:50,
            marginTop:20,
            }
          })}
        >
          <Box>
            <Grid
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap={1}
              sx={(t)=>({
       
                [t.breakpoints.up('lg')]:{
                 
                 
                  
                
                }
              })}
            >
              <Typography
                color="primary.main"
                textAlign="center"
                sx={{ fontSize: 25, fontWeight: 600 }}
              >
                Dinero Invertido
              </Typography>

              <Typography
                color="primary.main"
                textAlign="center"
                paddingX={5}
                sx={{ fontSize: "18px", fontWeight: 400 }}
              >
                $ {filtertotalid.precio}
              </Typography>
              <img src={logoCheck} width={140} height={140} alt="logocheck" />
              <Typography
                color="primary.main"
                textAlign="center"
                sx={{ fontSize: 25, fontWeight: 600 }}
              >
                Ganancia
              </Typography>

              <Typography
                color="primary.main"
                textAlign="center"
                paddingX={5}
                sx={{ fontSize: "18px", fontWeight: 400 }}
              >
                $ {filtertotalid.precio}
              </Typography>
              <img src={vector} atl="photo" />
              <Button
                variant="contained"
                onClick={() => handleCargaCuenta()}
                fullWidth
                sx={(t)=>({ 
                  color: "white",
                [t.breakpoints.up('lg')]:{
                  width:'35vw'
                } 
              
              })}
              >
                Tu dinero
              </Button>
            </Grid>
          </Box>
        </Grid>
       
      
    </Box>
  );
}

export default GananciaTotalId;
