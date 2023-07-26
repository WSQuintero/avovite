import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link as RouterLink, useParams } from "react-router-dom";
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
  ShoppingCart as ShoppingCartIcon,
  LightbulbOutlined as LightbulbOutlinedIcon,
  WhatsApp as WhatsAppIcon,
} from "@mui/icons-material";

import { useTheme } from "@emotion/react";
import { useFinalContext } from "../Context/FinalContext";
import Header from "../Components/Header/Header";
import logoInformacion from '../assets/img/informacion/logoInformacion.svg'

function DatePlantation() {
  const { id } = useParams();
  // console.log(id)
  const theme = useTheme();
  const route = useNavigate();
  const { vites } = useFinalContext();
  // console.log(vites)

  const filterViteId = vites.find((e) => e.id == id);
  // console.log(filterViteId)

  return (
    <Grid display="flex" flexDirection="column" sx={(theme)=>({
      [theme.breakpoints.up('lg')]:{
        marginTop:5,
        marginLeft:24,
        justifyContent:'center',
        alignItems:'center',
        width:'40vw'
      }
    })}>
      <Box
        position="relative"
        height="10vh"
        display="flex"
        flexDirection="column"
        sx={(theme)=>({
          [theme.breakpoints.up('lg')]:{
            
           display:'none'
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
        >
          <Button
           onClick={()=>route('/vites')}
            sx={{
              marginLeft: 1,
              color: "secondary.body",
              textTransform: "none",
            }}
            startIcon={
              <KeyboardBackspaceIcon sx={{ color: "secondary.body" }} />
            }
          >
            Vite {filterViteId.numeral}
          </Button>
          <Button
          
          onClick={()=>route('/checkout')}
            variant="contained"
            sx={{ height: "80%", bgcolor: "#498A19" }}
          >
            <ShoppingCartIcon sx={{ color: "secondary.body" }} />
          </Button>
        </Box>

        {/* the filter of image */}
        </Box>
        <Grid
          
          display="flex"
          flexDirection="column"
          alignItems="center"
         sx={(theme)=>({
          paddingX:2,
          paddingY:2,
          [theme.breakpoints.up('lg')]:{
            paddingX:0,
            marginTop:10,
            border:1,
            borderRadius:5,
            borderColor:'primary.main',
            width:'80%'
          }
         })}
        >
          <Box
            bgcolor="primary.main"
            borderRadius="50%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={(theme)=>({
              width: 60,
              height: 60,
          
            })}
          >
            <img src={logoInformacion} alt="logo" />
          </Box>

          <Typography
            sx={{ color: "primary.main", fontSize: 25, fontWeight: 500 }}
          >
            Vites {filterViteId.numeral}
          </Typography>
          <Typography sx={{ color: "text.cards" }}>
            Estado {filterViteId.estado}
          </Typography>
          <Typography sx={{color:'text.secondary'}}>
            {filterViteId.estado}
          </Typography>

        <Grid paddingY={10} marginRight={4}>
        <Typography  sx={{color:'text.secondary', fontSize:23, fontWeight:600}}>
            {filterViteId.siembra}
          </Typography> 
          <Typography sx={{color:'text.disabled', fontSize:23, fontWeight:600}}>
            {filterViteId.lote}
          </Typography> 
          <Typography sx={{color:'text.secondary', fontSize:23, fontWeight:600}}>
            {filterViteId.dateAlistamiento}
          </Typography> 
          <Typography sx={{color:'text.disabled', fontSize:23, fontWeight:600}}>
            {filterViteId.statusAlistamiento}
          </Typography>
        </Grid>
        


          <Box
            
            marginTop='60%'
            marginLeft="85%"
            bgcolor="secondary.body"
            border={1}
            borderRadius="50%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            width={50}
            height={50}
            sx={(theme)=>({
              
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              [theme.breakpoints.up('lg')]:{
                display:'none',
              }
            })}
          >
            <WhatsAppIcon
              sx={{ color: "primary.main", width: 35, height: 35 }}
            />
          </Box>
      
        </Grid>
      
    </Grid>
  );
}

export default DatePlantation;
